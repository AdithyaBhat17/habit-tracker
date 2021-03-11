import { IconButton } from "@chakra-ui/button";
import { CloseIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Flex, Grid, Heading, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { ChangeEvent, useEffect, useState } from "react";
import OutlineButton from "./Buttons/OutlineButton";
import PrimaryButton from "./Buttons/PrimaryButton";
import { EditHabitProps } from "../types/habit";

function EditHabit({ isOpen, close, size, habit, editHabit }: EditHabitProps) {
  const [isNotMobile] = useMediaQuery("(min-width:500px)");

  let [title, setTitle] = useState("");

  useEffect(() => {
    if (habit) setTitle(habit.title);
  }, [habit]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const updateHabit = () => editHabit(title);

  return (
    <Modal size={size} isOpen={isOpen} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent width="90%">
        <Flex alignItems="center" justifyContent="space-between" pr="6">
          <ModalHeader>Edit</ModalHeader>
          <IconButton
            aria-label="close"
            border="2px solid"
            color="imperialRed"
            fontSize="sm"
            borderColor="imperialRed"
            size="xs"
            onClick={close}
            icon={<CloseIcon w="2.5" h="2.5" opacity="0.7" />}
          />
        </Flex>
        <ModalBody>
          <Input
            onChange={handleChange}
            background="white"
            defaultValue={title}
          />
          <Grid gap="5" gridTemplateColumns="1fr 1fr" mt="10" mb="5">
            <Flex
              direction="column"
              justifyContent="space-between"
              bg="blue.500"
              color="white"
              borderRadius="10"
              py="5"
              px="5"
            >
              <Heading size="4xl">{habit?.currentStreak}</Heading>
              <Text isTruncated={isNotMobile}>Current Streak</Text>
            </Flex>
            <Flex
              direction="column"
              justifyContent="space-between"
              color="blue.500"
              border="2px solid"
              borderColor="blue.500"
              borderRadius="10"
              p="5"
            >
              <Heading size="4xl">{habit?.longestStreak}</Heading>
              <Text mt="3" isTruncated={isNotMobile}>
                Longest Streak
              </Text>
            </Flex>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Grid gap="5" gridTemplateColumns="1fr 1fr" width="100%">
            <OutlineButton isFullWidth>Delete</OutlineButton>
            <PrimaryButton onClick={updateHabit} isFullWidth bg="blue.500">
              Save
            </PrimaryButton>
          </Grid>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditHabit;
