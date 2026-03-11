import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { GetStaticPropsContext, NextPageWithLayout } from "next";
import { NextSeo } from "next-seo";
import Layout from "../../components/Layout";
import VaultInteraction from "../../components/VaultInteraction";
import {
  getVaultCategory,
  getVaultSlugs,
  VaultCategoryPageData,
} from "../../lib/vault";

interface VaultCategoryPageProps {
  category: VaultCategoryPageData;
}

const VaultCategoryPage: NextPageWithLayout<VaultCategoryPageProps> = ({
  category,
}) => {
  return (
    <>
      <NextSeo
        title={`${category.title} | District Vault`}
        description={category.description}
      />

      <Stack spacing={6}>
        <Breadcrumb fontSize="sm" color="blackAlpha.700">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/vault">
              Vault
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{category.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Box
          borderRadius="3xl"
          p={{ base: 6, md: 8 }}
          bgGradient={`linear(to-br, ${category.palette.from}, ${category.palette.to})`}
          border="1px solid rgba(255,255,255,0.75)"
          backdropFilter="blur(20px) saturate(170%)"
          boxShadow="0 18px 48px rgba(12, 25, 42, 0.18)"
        >
          <Stack spacing={3}>
            <HStack spacing={3} align="baseline" flexWrap="wrap">
              <Heading size="xl" color={category.palette.ink}>
                {category.title}
              </Heading>
              <Text
                px={2}
                py={1}
                borderRadius="full"
                fontSize="xs"
                textTransform="uppercase"
                letterSpacing="0.08em"
                bg="whiteAlpha.700"
              >
                {category.interaction}
              </Text>
            </HStack>
            <Text color="blackAlpha.800" fontSize="lg">
              {category.description}
            </Text>
            <Text color="blackAlpha.700">{category.intro}</Text>
          </Stack>
        </Box>

        <VaultInteraction category={category} />
      </Stack>
    </>
  );
};

VaultCategoryPage.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticPaths() {
  return {
    paths: getVaultSlugs().map((slug) => ({ params: { category: slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  if (!params || typeof params.category !== "string") {
    return {
      redirect: {
        destination: "/vault",
      },
    };
  }

  const category = getVaultCategory(params.category);

  if (!category) {
    return {
      redirect: {
        destination: "/vault",
      },
    };
  }

  return {
    props: {
      category,
    },
  };
}

export default VaultCategoryPage;
