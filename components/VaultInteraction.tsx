import {
  Badge,
  Box,
  Circle,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Image,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiFolder,
  FiMic,
  FiPlay,
  FiZap,
} from "react-icons/fi";
import { VaultCategoryPageData, VaultGalleryFolder } from "../lib/vault";

interface VaultInteractionProps {
  category: VaultCategoryPageData;
}

const glassStyles = {
  bg: "whiteAlpha.700",
  border: "1px solid",
  borderColor: "whiteAlpha.700",
  backdropFilter: "blur(20px) saturate(160%)",
  boxShadow: "0 12px 38px rgba(13, 25, 39, 0.14)",
};

function ShelfInteraction({ category }: VaultInteractionProps) {
  return (
    <Flex overflowX="auto" pb={3} gap={4}>
      {category.items.map((item) => (
        <Box
          key={item.title}
          flexShrink={0}
          width={{ base: "140px", md: "170px" }}
          minH={{ base: "220px", md: "260px" }}
          borderRadius="2xl"
          p={4}
          bg={category.palette.ink}
          color="white"
          border="1px solid rgba(255,255,255,0.18)"
          transform="translateY(0px)"
          transition="transform 220ms ease"
          _hover={{ transform: "translateY(-6px)" }}
        >
          <Flex height="100%" justify="space-between" direction="column">
            <Text sx={{ writingMode: "vertical-rl" }} fontWeight="700" letterSpacing="0.08em">
              {item.title}
            </Text>
            <Text fontSize="xs" opacity={0.75}>
              {item.meta}
            </Text>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
}

function QueueInteraction({ category }: VaultInteractionProps) {
  return (
    <Stack spacing={4}>
      {category.items.map((item, index) => (
        <Box key={item.title} borderRadius="2xl" p={4} {...glassStyles}>
          <HStack align="flex-start" spacing={4}>
            <Circle size="42px" bg="blackAlpha.800" color="white">
              <Icon as={FiPlay} boxSize={4} ml="2px" />
            </Circle>
            <Stack flex={1} spacing={2}>
              <HStack justify="space-between" align="center">
                <Text fontWeight="700">{item.title}</Text>
                <Badge borderRadius="full" px={2} py={1}>
                  {item.meta}
                </Badge>
              </HStack>
              <Text color="blackAlpha.700">{item.description}</Text>
              <Progress
                value={30 + ((index + 1) * 17) % 60}
                borderRadius="full"
                size="sm"
                colorScheme="blue"
                bg="blackAlpha.100"
              />
            </Stack>
          </HStack>
        </Box>
      ))}
    </Stack>
  );
}

function StoryboardInteraction({ category }: VaultInteractionProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      {category.items.map((item) => (
        <Box key={item.title} borderRadius="2xl" p={4} {...glassStyles}>
          <Box
            borderRadius="xl"
            mb={4}
            bgGradient={`linear(to-br, ${category.palette.from}, ${category.palette.to})`}
            minH="140px"
            border="1px solid rgba(0,0,0,0.08)"
          />
          <HStack justify="space-between" align="flex-start" mb={2}>
            <Badge borderRadius="full" px={2} py={1}>
              {item.tag}
            </Badge>
            <HStack spacing={1} color="blackAlpha.700">
              <Icon as={FiMic} boxSize={3.5} />
              <Text fontSize="sm">{item.meta}</Text>
            </HStack>
          </HStack>
          <Text fontWeight="700" mb={1}>
            {item.title}
          </Text>
          <Text color="blackAlpha.700">{item.description}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

function LabInteraction({ category }: VaultInteractionProps) {
  return (
    <Stack spacing={4}>
      {category.items.map((item) => (
        <Box key={item.title} borderRadius="2xl" p={4} {...glassStyles}>
          <HStack justify="space-between" align="center" mb={3}>
            <Badge borderRadius="full" px={2} py={1} colorScheme="green">
              {item.tag}
            </Badge>
            <HStack spacing={1} color="blackAlpha.700">
              <Icon as={FiZap} boxSize={3.5} />
              <Text fontSize="sm">{item.meta}</Text>
            </HStack>
          </HStack>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={3}>
            <Box borderRadius="xl" p={3} bg="blackAlpha.50">
              <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.08em" mb={1}>
                Experiment
              </Text>
              <Text fontWeight="700">{item.title}</Text>
            </Box>
            <Box borderRadius="xl" p={3} bg="blackAlpha.50">
              <Text fontSize="xs" textTransform="uppercase" letterSpacing="0.08em" mb={1}>
                Outcome
              </Text>
              <Text>{item.description}</Text>
            </Box>
          </Grid>
        </Box>
      ))}
    </Stack>
  );
}

function MoodboardInteraction({ category }: VaultInteractionProps) {
  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(6, 1fr)" }} gap={4}>
      {category.items.map((item, index) => (
        <Box
          key={item.title}
          borderRadius="2xl"
          p={4}
          {...glassStyles}
          gridColumn={{ base: "span 1", md: index % 3 === 0 ? "span 4" : "span 2" }}
          minH={{ base: "150px", md: index % 2 === 0 ? "170px" : "220px" }}
          bgGradient={`linear(to-b, ${category.palette.from}, white)`}
        >
          <Badge borderRadius="full" px={2} py={1} mb={3}>
            {item.tag}
          </Badge>
          <Text fontWeight="700" mb={1}>
            {item.title}
          </Text>
          <Text color="blackAlpha.700">{item.description}</Text>
          <Text fontSize="xs" mt={3} color="blackAlpha.600">
            {item.meta}
          </Text>
        </Box>
      ))}
    </Grid>
  );
}

function StackInteraction({ category }: VaultInteractionProps) {
  return (
    <Stack spacing={5}>
      {category.items.map((item, index) => (
        <Box
          key={item.title}
          borderRadius="2xl"
          p={5}
          {...glassStyles}
          transform={{ base: "none", md: `rotate(${index % 2 === 0 ? "-1.2" : "1.2"}deg)` }}
          transition="transform 250ms ease"
          _hover={{ transform: "rotate(0deg) translateY(-4px)" }}
        >
          <HStack justify="space-between" align="flex-start" mb={2}>
            <Text fontWeight="700" fontSize="lg">
              {item.title}
            </Text>
            <Badge borderRadius="full" px={2} py={1}>
              {item.meta}
            </Badge>
          </HStack>
          <Text color="blackAlpha.800">{item.description}</Text>
        </Box>
      ))}
    </Stack>
  );
}

function GalleryInteraction({ category }: VaultInteractionProps) {
  const [activeGallery, setActiveGallery] = useState<{
    folder: VaultGalleryFolder;
    index: number;
  } | null>(null);
  const folders = category.galleryFolders ?? [];

  const closeModal = () => setActiveGallery(null);
  const moveImage = (direction: -1 | 1) => {
    if (!activeGallery) {
      return;
    }

    const imageCount = activeGallery.folder.images.length;
    const nextIndex = (activeGallery.index + direction + imageCount) % imageCount;

    setActiveGallery({ ...activeGallery, index: nextIndex });
  };

  if (folders.length === 0) {
    return (
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
        {category.items.map((item) => (
          <Box key={item.title} borderRadius="2xl" p={3} {...glassStyles}>
            <Box
              borderRadius="lg"
              mb={3}
              minH="140px"
              bgGradient={`linear(to-br, ${category.palette.from}, ${category.palette.to})`}
              border="6px solid white"
              boxShadow="inset 0 0 0 1px rgba(0,0,0,0.08)"
            />
            <Text fontWeight="700">{item.title}</Text>
            <Text color="blackAlpha.700" fontSize="sm">
              {item.description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    );
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={5}>
        {folders.map((folder) => (
          <Box
            key={folder.id}
            as="button"
            type="button"
            onClick={() => setActiveGallery({ folder, index: 0 })}
            borderRadius="2xl"
            p={4}
            textAlign="left"
            bg="whiteAlpha.720"
            border="1px solid"
            borderColor="whiteAlpha.800"
            backdropFilter="blur(24px) saturate(165%)"
            boxShadow="0 16px 46px rgba(16, 28, 48, 0.18)"
            transition="transform 240ms ease, box-shadow 240ms ease"
            _hover={{
              transform: "translateY(-6px)",
              boxShadow: "0 20px 54px rgba(16, 28, 48, 0.24)",
            }}
          >
            <Stack spacing={4}>
              <Box position="relative" minH="165px">
                <Box
                  position="absolute"
                  top="18px"
                  left={0}
                  right={0}
                  bottom={0}
                  borderRadius="18px"
                  bgGradient={`linear(to-b, ${category.palette.from}, ${category.palette.to})`}
                  border="1px solid rgba(255,255,255,0.75)"
                />
                <Box
                  position="absolute"
                  top={0}
                  left="22px"
                  width="42%"
                  height="38px"
                  borderTopRadius="16px"
                  borderBottomRadius="10px"
                  bgGradient={`linear(to-b, ${category.palette.from}, rgba(255,255,255,0.66))`}
                  border="1px solid rgba(255,255,255,0.75)"
                  borderBottom="none"
                />

                {folder.images.slice(0, 3).map((image, index) => (
                  <Image
                    key={image}
                    src={image}
                    alt={`${folder.title} preview ${index + 1}`}
                    position="absolute"
                    right={`${14 + index * 10}px`}
                    top={`${42 + index * 7}px`}
                    width={{ base: "56%", md: "60%" }}
                    height={{ base: "105px", md: "110px" }}
                    objectFit="cover"
                    borderRadius="md"
                    border="2px solid rgba(255,255,255,0.85)"
                    boxShadow="0 10px 24px rgba(9, 16, 28, 0.2)"
                    transform={`rotate(${index === 0 ? "-5" : index === 1 ? "2.5" : "7"}deg)`}
                  />
                ))}

                <Circle
                  size="38px"
                  position="absolute"
                  left={4}
                  bottom={4}
                  bg="whiteAlpha.900"
                  color={category.palette.ink}
                  boxShadow="0 6px 18px rgba(15, 23, 42, 0.15)"
                >
                  <Icon as={FiFolder} boxSize={4.5} />
                </Circle>
              </Box>

              <Stack spacing={1}>
                <Text fontWeight="700" fontSize="lg" color={category.palette.ink}>
                  {folder.title}
                </Text>
                <HStack spacing={2}>
                  <Badge borderRadius="full" px={2} py={1}>
                    {folder.images.length} screenshots
                  </Badge>
                  <Text color="blackAlpha.700" fontSize="sm">
                    Tap to open
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={Boolean(activeGallery)} onClose={closeModal} size="6xl" isCentered>
        <ModalOverlay bg="blackAlpha.550" backdropFilter="blur(10px) saturate(120%)" />
        <ModalContent
          bg="whiteAlpha.820"
          border="1px solid"
          borderColor="whiteAlpha.700"
          backdropFilter="blur(30px) saturate(180%)"
          boxShadow="0 25px 80px rgba(10, 20, 36, 0.35)"
        >
          <ModalHeader>
            <HStack justify="space-between" pr={10}>
              <Text>{activeGallery?.folder.title}</Text>
              <Badge borderRadius="full" px={2} py={1}>
                {activeGallery?.index !== undefined ? activeGallery.index + 1 : 0}
                {" / "}
                {activeGallery?.folder.images.length ?? 0}
              </Badge>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {activeGallery && (
              <Stack spacing={4}>
                <Box
                  borderRadius="xl"
                  overflow="hidden"
                  bg="blackAlpha.900"
                  border="1px solid rgba(255,255,255,0.2)"
                  minH={{ base: "260px", md: "420px" }}
                >
                  <Image
                    src={activeGallery.folder.images[activeGallery.index]}
                    alt={`${activeGallery.folder.title} screenshot ${activeGallery.index + 1}`}
                    width="100%"
                    height={{ base: "260px", md: "420px" }}
                    objectFit="contain"
                    bg="black"
                  />
                </Box>

                <HStack justify="space-between">
                  <IconButton
                    aria-label="Previous screenshot"
                    icon={<FiChevronLeft />}
                    onClick={() => moveImage(-1)}
                    isRound
                    variant="solid"
                  />
                  <Text color="blackAlpha.700" fontSize="sm">
                    Browse screenshots
                  </Text>
                  <IconButton
                    aria-label="Next screenshot"
                    icon={<FiChevronRight />}
                    onClick={() => moveImage(1)}
                    isRound
                    variant="solid"
                  />
                </HStack>

                <SimpleGrid columns={{ base: 3, sm: 4, md: 6 }} spacing={2}>
                  {activeGallery.folder.images.map((image, index) => (
                    <Box
                      key={image}
                      as="button"
                      type="button"
                      onClick={() => setActiveGallery({ ...activeGallery, index })}
                      borderRadius="md"
                      overflow="hidden"
                      border="2px solid"
                      borderColor={
                        index === activeGallery.index ? "blackAlpha.900" : "transparent"
                      }
                    >
                      <Image
                        src={image}
                        alt={`${activeGallery.folder.title} thumbnail ${index + 1}`}
                        width="100%"
                        height="74px"
                        objectFit="cover"
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

function TimelineInteraction({ category }: VaultInteractionProps) {
  return (
    <Stack spacing={4} position="relative" pl={5}>
      <Box position="absolute" left="11px" top={1} bottom={1} width="2px" bg="blackAlpha.300" />
      {category.items.map((item) => (
        <HStack key={item.title} align="flex-start" spacing={4}>
          <Circle size="22px" bg={category.palette.ink} color="white" zIndex={1}>
            <Icon as={FiArrowRight} boxSize={3} />
          </Circle>
          <Box borderRadius="2xl" p={4} flex={1} {...glassStyles}>
            <HStack justify="space-between" mb={1}>
              <Text fontWeight="700">{item.title}</Text>
              <Badge borderRadius="full" px={2} py={1}>
                {item.meta}
              </Badge>
            </HStack>
            <Text color="blackAlpha.700">{item.description}</Text>
          </Box>
        </HStack>
      ))}
    </Stack>
  );
}

function FeedInteraction({ category }: VaultInteractionProps) {
  return (
    <Stack spacing={4}>
      {category.items.map((item) => (
        <Box key={item.title} borderRadius="2xl" p={4} {...glassStyles}>
          <HStack justify="space-between" mb={2}>
            <Text fontWeight="700">{item.description}</Text>
            <Text fontSize="sm" color="blackAlpha.600">
              {item.meta}
            </Text>
          </HStack>
          <Text mb={3}>{item.title}</Text>
          <HStack spacing={2} color="blackAlpha.600">
            <Badge borderRadius="full" px={2} py={1}>
              saved
            </Badge>
            <Badge borderRadius="full" px={2} py={1}>
              signal
            </Badge>
          </HStack>
        </Box>
      ))}
    </Stack>
  );
}

function GridInteraction({ category }: VaultInteractionProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      {category.items.map((item) => (
        <Box key={item.title} borderRadius="2xl" p={4} {...glassStyles}>
          <HStack justify="space-between" mb={2}>
            <Text fontWeight="700">{item.title}</Text>
            <Badge borderRadius="full" px={2} py={1}>
              {item.meta}
            </Badge>
          </HStack>
          <Text color="blackAlpha.700">{item.description}</Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default function VaultInteraction({ category }: VaultInteractionProps) {
  switch (category.interaction) {
    case "shelf":
      return <ShelfInteraction category={category} />;
    case "queue":
      return <QueueInteraction category={category} />;
    case "storyboard":
      return <StoryboardInteraction category={category} />;
    case "lab":
      return <LabInteraction category={category} />;
    case "moodboard":
      return <MoodboardInteraction category={category} />;
    case "stack":
      return <StackInteraction category={category} />;
    case "gallery":
      return <GalleryInteraction category={category} />;
    case "timeline":
      return <TimelineInteraction category={category} />;
    case "feed":
      return <FeedInteraction category={category} />;
    case "grid":
      return <GridInteraction category={category} />;
    default:
      return (
        <Box borderRadius="2xl" p={4} {...glassStyles}>
          <Heading size="sm">No interaction configured</Heading>
        </Box>
      );
  }
}
