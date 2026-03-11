import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { VaultCategory } from "../lib/vault";
import VaultCategoryCard from "./VaultCategoryCard";

interface VaultHomeProps {
  categories: VaultCategory[];
}

export default function VaultHome({ categories }: VaultHomeProps) {
  return (
    <Stack spacing={8}>
      <Box
        borderRadius="3xl"
        p={{ base: 6, md: 10 }}
        bg="whiteAlpha.700"
        border="1px solid"
        borderColor="whiteAlpha.700"
        backdropFilter="blur(22px) saturate(160%)"
        boxShadow="0 18px 50px rgba(14, 25, 40, 0.16)"
      >
        <Stack spacing={4} maxW="3xl">
          <Text letterSpacing="0.08em" textTransform="uppercase" fontSize="sm" color="blackAlpha.700">
            District Vault
          </Text>
          <Heading size="2xl">A home for ideas, references, and momentum.</Heading>
          <Text fontSize="lg" color="blackAlpha.800">
            Every section is its own folder and interaction model: shelf, queue,
            storyboard, lab, moodboard, stack, gallery, timeline, feed, and more.
          </Text>
        </Stack>
      </Box>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={5}>
        {categories.map((category) => (
          <VaultCategoryCard key={category.slug} category={category} />
        ))}
      </Grid>
    </Stack>
  );
}
