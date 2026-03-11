import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";
import Layout from "../components/Layout";
import { ReactElement } from "react";
import { DefaultSeo } from "next-seo";
import posthog from "posthog-js";
import React from "react";
import { useRouter } from "next/router";

const theme = extendTheme(
  {
    fonts: {
      heading: "\"Iowan Old Style\", \"Palatino Linotype\", serif",
      body: "\"Avenir Next\", \"Segoe UI\", sans-serif",
    },
    styles: {
      global: {
        body: {
          bgGradient: "linear(to-b, #f9f6f0, #eef4fb 65%, #edf5f1)",
          color: "#1f2937",
        },
        "::selection": {
          bg: "blackAlpha.800",
          color: "white",
        },
      },
    },
  },
  withProse({
    baseStyle: {
      "h1, h2, h3, h4, h5, h6": {
        mt: 4,
        mb: 4,
      },
      p: {
        my: 3,
      },
      a: {
        color: "blue.600",
        _focus: {
          boxShadow: "none !important",
        },
      },
    },
  })
);

const getDefaultLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const getLayout = Component.getLayout || getDefaultLayout;

  React.useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_API_KEY) {
      return;
    }

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
      api_host: "https://app.posthog.com",
    });

    const handleRouteChange = () => posthog.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo
        title="District Vault"
        description="A personal vault for reading, podcasts, videos, AI, design inspirations, motivations, visuals, motion, tweets, and more."
        openGraph={{
          title: "District Vault",
          description:
            "A personal vault for reading, podcasts, videos, AI, design inspirations, motivations, visuals, motion, tweets, and more.",
          images: [
            {
              url: "https://adammaj.com/og-image-dark.jpg",
              type: "image/jpeg",
            },
          ],
          siteName: "District Vault",
        }}
      />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}
