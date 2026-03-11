import { Badge, Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { VaultCategory } from "../lib/vault";

interface VaultCategoryCardProps {
  category: VaultCategory;
}

export default function VaultCategoryCard({ category }: VaultCategoryCardProps) {
  return (
    <Box
      as={Link}
      href={`/vault/${category.slug}`}
      borderRadius="2xl"
      p={5}
      display="block"
      bgGradient={`linear(to-br, ${category.palette.from}, ${category.palette.to})`}
      border="1px solid rgba(255,255,255,0.75)"
      backdropFilter="blur(16px) saturate(150%)"
      boxShadow="0 12px 34px rgba(15, 23, 42, 0.14)"
      transition="transform 220ms ease, box-shadow 220ms ease"
      _hover={{
        transform: "translateY(-6px)",
        boxShadow: "0 16px 45px rgba(15, 23, 42, 0.2)",
      }}
    >
      <Stack spacing={3}>
        <HStack justify="space-between" align="center">
          <Heading size="md" color={category.palette.ink}>
            {category.title}
          </Heading>
          <Badge borderRadius="full" px={2} py={1}>
            {category.interaction}
          </Badge>
        </HStack>
        <Text color="blackAlpha.800">{category.description}</Text>
        <Text fontSize="sm" color="blackAlpha.700">
          {category.intro}
        </Text>
      </Stack>
    </Box>
  );
}
