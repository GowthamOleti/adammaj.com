import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { NextPageWithLayout } from "next";
import { NextSeo } from "next-seo";
import Layout from "../../components/Layout";

const Reading: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Reading | District Vault" />
      <Box
        borderRadius="3xl"
        p={{ base: 6, md: 8 }}
        bg="whiteAlpha.700"
        border="1px solid"
        borderColor="whiteAlpha.700"
        backdropFilter="blur(20px) saturate(160%)"
        boxShadow="0 16px 45px rgba(15, 23, 42, 0.16)"
      >
        <Stack spacing={4}>
          <Heading size="lg">Reading moved into the Vault.</Heading>
          <Text color="blackAlpha.700">
            This section now lives under category folders with themed interactions.
          </Text>
          <Button as={Link} href="/vault/reading" width="fit-content" colorScheme="blue">
            Open Reading Vault
          </Button>
        </Stack>
      </Box>
    </>
  );
};

Reading.getLayout = (page) => <Layout>{page}</Layout>;

export default Reading;
