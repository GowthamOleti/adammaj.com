import fs from "fs";
import path from "path";

function getVaultSlugs() {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "content", "vault", "categories.json"), "utf8")
  );

  return data.map((item) => `/vault/${item.slug}`);
}

async function main() {
  const vaultSlugs = getVaultSlugs();
  const allSlugs = ["/vault", "/reading", ...vaultSlugs];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allSlugs
  .map((slug) => {
    return `  <url>\n    <loc>${`https://adammaj.com${slug}`}</loc>\n  </url>`;
  })
  .join("\n")}
</urlset>`;

  if (fs.existsSync("public/sitemap.xml")) {
    fs.unlinkSync("public/sitemap.xml");
  }

  fs.writeFileSync("public/sitemap.xml", sitemap);
}

main();
