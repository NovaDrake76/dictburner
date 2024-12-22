"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Show,
  Input,
} from "@chakra-ui/react";
import FlashCard from "../components/flashcard";
import { IoMdSend } from "react-icons/io";

const words = [
  {
    text: "Haus",
    translation: "House",
    image:
      "https://www.houseplans.net/news/wp-content/uploads/2023/07/57260-768.jpeg",
  },
  {
    text: "Baum",
    translation: "Tree",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrWGnkEWaaNZjJTYAVRWZwi1ehw0muzeOnwg&s",
  },
  {
    text: "Wasser",
    translation: "Water",
    image:
      "https://img.waterworld.com/files/base/ebm/ww/image/2024/03/65e724a21f04ab001e1d8534-dreamstime_xl_32360015.png?auto=format,compress&fit=max&q=45&w=640&width=640",
  },
  {
    text: "Katze",
    translation: "Cat",
    image: "https://farm4.staticflickr.com/3699/10262868265_88682cda36_m.jpg",
  },
  {
    text: "Hund",
    translation: "Dog",
    image: "https://farm8.staticflickr.com/7449/10249219823_7c2d603573_m.jpg",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTranslationMode, setIsTranslationMode] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const handleSubmit = () => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      if (isSubmitDisabled) {
        return;
      }
      const userIsCorrect = isTranslationMode
        ? textInput === words[currentIndex].translation.toLowerCase()
        : textInput === words[currentIndex].text.toLowerCase();

      setIsCorrect(userIsCorrect);
      setShowFeedback(true);

      if (userIsCorrect == true) {
        setShowTranslation(true);
        setIsSubmitDisabled(true);
        setTimeout(() => {
          setShowFeedback(false);
          setShowTranslation(false);
          setTextInput("");
          setIsSubmitDisabled(false);

          setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2000);
      }
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
    setShowFeedback(false);
  };

  const handleFlipCard = () => {
    setShowTranslation((prev) => !prev);
  };

  useEffect(() => {
    if (Math.random() < 0) {
      setIsTranslationMode(true);
      setShowTranslation(false);
    } else {
      setIsTranslationMode(false);
      setShowTranslation(true);
    }
  }, [currentIndex]);

  return (
    <Flex p={8} justify="center" align="center" direction="column">
      <Heading mb={8} textAlign="center">
        German Vocabulary
      </Heading>
      <FlashCard word={words[currentIndex]} showTranslation={showTranslation} />
      <Box>
        <form onSubmit={handleSubmit()}>
          <Flex direction="column" mt={4}>
            <Flex alignItems={"center"} gap={2}>
              <Input
                placeholder={
                  isTranslationMode
                    ? "Type the translation"
                    : "Type the word in German"
                }
                value={textInput}
                onChange={handleInputChange}
              />
              <Button size="sm" type="submit" disabled={!textInput.trim()}>
                <IoMdSend />
              </Button>
            </Flex>
          </Flex>
        </form>

        <Show when={showFeedback}>
          <Text color={isCorrect ? "green.500" : "red.500"} mt={4}>
            {isCorrect ? "Correct!" : "Incorrect!"}
          </Text>
        </Show>

        <Button mt={4} size="sm" onClick={handleFlipCard}>
          Flip Card
        </Button>
      </Box>
    </Flex>
  );
}
