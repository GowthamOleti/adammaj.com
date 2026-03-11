import type { NextApiRequest, NextApiResponse } from "next";

interface ItunesPodcastResult {
  collectionName?: string;
  feedUrl?: string;
}

interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  link?: string;
  publishedAt?: string;
  duration?: string;
  podcast: string;
  feedUrl: string;
}

interface PodcastSearchResponse {
  podcast: string;
  feedUrl: string;
  episodes: PodcastEpisode[];
}

function readQueryValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return value?.trim() ?? "";
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function decodeHtml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractTagValue(block: string, tagName: string): string | undefined {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = block.match(regex);

  if (!match?.[1]) {
    return undefined;
  }

  return decodeHtml(match[1]);
}

function extractAudioUrl(block: string): string | undefined {
  const enclosureMatch = block.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
  if (enclosureMatch?.[1]) {
    return enclosureMatch[1].trim();
  }

  const mediaMatch = block.match(/<media:content[^>]+url=["']([^"']+)["']/i);
  if (mediaMatch?.[1]) {
    return mediaMatch[1].trim();
  }

  return undefined;
}

function scorePodcastMatch(candidate: string, query: string): number {
  const normalizedCandidate = normalize(candidate);
  const normalizedQuery = normalize(query);

  if (!normalizedCandidate || !normalizedQuery) {
    return 0;
  }

  if (normalizedCandidate === normalizedQuery) {
    return 1000;
  }

  if (normalizedCandidate.startsWith(normalizedQuery)) {
    return 700;
  }

  if (normalizedCandidate.includes(normalizedQuery)) {
    return 500;
  }

  const queryTokens = normalizedQuery.split(" ").filter(Boolean);
  const candidateTokens = new Set(normalizedCandidate.split(" ").filter(Boolean));
  const overlap = queryTokens.filter((token) => candidateTokens.has(token)).length;

  return overlap * 100;
}

async function resolvePodcastFeed(
  podcastQuery: string
): Promise<{ podcast: string; feedUrl: string }> {
  if (/^https?:\/\//i.test(podcastQuery)) {
    return {
      podcast: podcastQuery,
      feedUrl: podcastQuery,
    };
  }

  const lookupUrl = `https://itunes.apple.com/search?media=podcast&entity=podcast&limit=12&term=${encodeURIComponent(
    podcastQuery
  )}`;

  const lookupResponse = await fetch(lookupUrl, {
    headers: {
      accept: "application/json",
    },
  });

  if (!lookupResponse.ok) {
    throw new Error("Could not resolve podcast feed.");
  }

  const payload = (await lookupResponse.json()) as { results?: ItunesPodcastResult[] };
  const candidates = (payload.results ?? []).filter(
    (result): result is Required<Pick<ItunesPodcastResult, "collectionName" | "feedUrl">> =>
      Boolean(result.collectionName) && Boolean(result.feedUrl)
  );

  if (!candidates.length) {
    throw new Error("Podcast not found.");
  }

  const [bestMatch] = [...candidates].sort((left, right) => {
    const leftScore = scorePodcastMatch(left.collectionName, podcastQuery);
    const rightScore = scorePodcastMatch(right.collectionName, podcastQuery);
    return rightScore - leftScore;
  });

  return {
    podcast: bestMatch.collectionName,
    feedUrl: bestMatch.feedUrl,
  };
}

function parseEpisodes(xml: string, feedUrl: string, podcast: string): PodcastEpisode[] {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];

  return items
    .map((item, index) => {
      const title = extractTagValue(item, "title");
      const descriptionRaw =
        extractTagValue(item, "description") ?? extractTagValue(item, "content:encoded") ?? "";
      const audioUrl = extractAudioUrl(item);

      if (!title || !audioUrl) {
        return null;
      }

      const guid = extractTagValue(item, "guid");
      const link = extractTagValue(item, "link");
      const publishedAt = extractTagValue(item, "pubDate");
      const duration = extractTagValue(item, "itunes:duration");

      return {
        id: guid || `${feedUrl}#${index}`,
        title,
        description: stripHtml(descriptionRaw),
        audioUrl,
        link,
        publishedAt,
        duration,
        podcast,
        feedUrl,
      };
    })
    .filter((episode): episode is PodcastEpisode => Boolean(episode));
}

function episodeMatchesQuery(episodeTitle: string, episodeQuery: string): boolean {
  if (!episodeQuery.trim()) {
    return true;
  }

  const normalizedTitle = normalize(episodeTitle);
  const queryTokens = normalize(episodeQuery).split(" ").filter(Boolean);

  if (!queryTokens.length) {
    return true;
  }

  return queryTokens.every((token) => normalizedTitle.includes(token));
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<PodcastSearchResponse | { error: string }>
) {
  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed." });
    return;
  }

  const podcastQuery = readQueryValue(request.query.podcast);
  const episodeQuery = readQueryValue(request.query.episode);

  if (!podcastQuery) {
    response.status(400).json({ error: "Podcast name is required." });
    return;
  }

  try {
    const { podcast, feedUrl } = await resolvePodcastFeed(podcastQuery);
    const rssResponse = await fetch(feedUrl, {
      headers: {
        accept: "application/rss+xml,application/xml,text/xml;q=0.9,*/*;q=0.8",
        "user-agent": "DistrictVaultPodcastBot/1.0",
      },
    });

    if (!rssResponse.ok) {
      throw new Error("Could not fetch RSS feed.");
    }

    const xml = await rssResponse.text();
    const episodes = parseEpisodes(xml, feedUrl, podcast)
      .filter((episode) => episodeMatchesQuery(episode.title, episodeQuery))
      .slice(0, 24);

    response.status(200).json({
      podcast,
      feedUrl,
      episodes,
    });
  } catch (error) {
    const message =
      error instanceof Error && error.message ? error.message : "Failed to fetch podcast episodes.";

    response.status(500).json({ error: message });
  }
}
