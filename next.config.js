/** @type {import('next').NextConfig} */

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});
module.exports = withMDX({
  async redirects() {
    return [
      {
        source: "/books/:slug*",
        destination: "/reading/:slug*",
        permanent: true,
      },
      {
        source: "/deep-dives",
        destination: "/vault/design-inspirations",
        permanent: true,
      },
      {
        source: "/engineering/:slug*",
        destination: "/vault/ai",
        permanent: true,
      },
      {
        source: "/writing/:slug*",
        destination: "/vault/more",
        permanent: true,
      },
      {
        source: "/podcasts",
        destination: "/vault/podcasts",
        permanent: true,
      },
      {
        source: "/videos",
        destination: "/vault/videos",
        permanent: true,
      },
      {
        source: "/ai",
        destination: "/vault/ai",
        permanent: true,
      },
      {
        source: "/design-inspirations",
        destination: "/vault/design-inspirations",
        permanent: true,
      },
      {
        source: "/motivations",
        destination: "/vault/motivations",
        permanent: true,
      },
      {
        source: "/visuals",
        destination: "/vault/visuals",
        permanent: true,
      },
      {
        source: "/motion",
        destination: "/vault/motion",
        permanent: true,
      },
      {
        source: "/tweets",
        destination: "/vault/tweets",
        permanent: true,
      },
      {
        source: "/more",
        destination: "/vault/more",
        permanent: true,
      },
    ];
  },
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});
