import { Flex, Text, Show, Box } from "@chakra-ui/react";
import Image from "next/image";

interface FlashCardProps {
  word: {
    text: string;
    translation: string;
    image: string;
  };

  showTranslation: boolean;
}

export default function FlashCard({ word, showTranslation }: FlashCardProps) {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      w={"300px"}
      h={"200px"}
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      p={4}
      boxShadow="md"
      flexDirection={"column"}
      gap={4}
    >
      <Show when={showTranslation}>
        <Box borderRadius={"md"} overflow={"hidden"}>
          <Image
            src={word.image}
            alt={word.text}
            width={200}
            height={200}
            objectFit={"cover"}
          />
        </Box>
      </Show>

      <Text fontSize="xl" fontWeight="bold">
        {showTranslation ? word.translation : word.text}
      </Text>
    </Flex>
  );
}
