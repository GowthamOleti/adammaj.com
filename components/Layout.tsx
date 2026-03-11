import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { FiMenu } from "react-icons/fi";

const vaultLinks = [
  { label: "Reading", href: "/vault/reading" },
  { label: "Podcasts", href: "/vault/podcasts" },
  { label: "Videos", href: "/vault/videos" },
  { label: "AI", href: "/vault/ai" },
  { label: "Design", href: "/vault/design-inspirations" },
  { label: "Motion", href: "/vault/motion" },
  { label: "Tweets", href: "/vault/tweets" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link
      as={NextLink}
      href={href}
      px={3}
      py={2}
      borderRadius="full"
      bg={isActive ? "blackAlpha.900" : "transparent"}
      color={isActive ? "white" : "blackAlpha.800"}
      _hover={{ textDecoration: "none", bg: isActive ? "blackAlpha.900" : "blackAlpha.100" }}
      fontSize="sm"
      whiteSpace="nowrap"
    >
      {label}
    </Link>
  );
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box minH="100vh">
      <Box
        position="sticky"
        top={0}
        zIndex={120}
        bg="rgba(255,255,255,0.62)"
        borderBottom="1px solid"
        borderBottomColor="whiteAlpha.700"
        backdropFilter="blur(18px) saturate(165%)"
      >
        <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
          <Flex align="center" justify="space-between" h="74px" gap={3}>
            <Link as={NextLink} href="/vault" _hover={{ textDecoration: "none" }}>
              <Text fontWeight="800" letterSpacing="0.06em" textTransform="uppercase" fontSize="sm">
                District Vault
              </Text>
            </Link>

            <HStack spacing={1} overflowX="auto" display={{ base: "none", md: "flex" }}>
              <NavLink href="/vault" label="Sections" />
              {vaultLinks.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </HStack>

            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Open vault menu"
                icon={<Icon as={FiMenu} />}
                variant="outline"
                display={{ base: "inline-flex", md: "none" }}
              />
              <MenuList>
                <MenuItem as={NextLink} href="/vault">
                  Sections
                </MenuItem>
                {vaultLinks.map((link) => (
                  <MenuItem key={link.href} as={NextLink} href={link.href}>
                    {link.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={{ base: 6, md: 9 }}>
        {children}
      </Container>
    </Box>
  );
}
