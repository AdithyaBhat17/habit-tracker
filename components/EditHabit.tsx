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
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import OutlineButton from "./Buttons/OutlineButton";
import PrimaryButton from "./Buttons/PrimaryButton";
import { EditHabitProps, Habit } from "../types/habit";
import { useToast } from "@chakra-ui/toast";
import { mutate } from "swr";
import { deleteHabit, editHabitTitle } from "../utils/habit";
import { FormControl, FormHelperText } from "@chakra-ui/form-control";

function EditHabit({ isOpen, close, size, habit, user = "" }: EditHabitProps) {
  const [error, setError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "updating" | "deleting" | "error"
  >("idle");
  const [isNotMobile] = useMediaQuery("(min-width:500px)");
  const outlineButton = useRef<HTMLButtonElement>();

  let [title, setTitle] = useState("");

  const toast = useToast();

  useEffect(() => {
    if (habit) setTitle(habit.title);
  }, [habit]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (error) setError(""); // reset error once the user starts typing.
    setTitle(event.target.value);
  };

  const updateHabit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!title.trim().length) {
      setError("Nice try, genius 😒");
      return;
    }
    mutate(
      "/api/habits",
      async (habits: Habit[]) => {
        setStatus("updating");
        return await editHabitTitle(
          title,
          habit,
          habits,
          toast,
          user,
          setStatus,
          close
        );
      },
      false
    );
  };

  const handleDelete = () => {
    if (!habit) return;
    mutate(
      "/api/habits",
      async (habits: Habit[]) => {
        setStatus("deleting");
        return await deleteHabit(habit, habits, toast, user, close, setStatus);
      },
      false
    );
  };

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
          <form action="POST" onSubmit={updateHabit}>
            <FormControl>
              <Input
                onChange={handleChange}
                background="white"
                isRequired
                disabled={status !== "idle"}
                defaultValue={title}
              />
              <FormHelperText color="imperialRed">{error}</FormHelperText>
            </FormControl>
          </form>
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
            <OutlineButton
              ref={outlineButton}
              onClick={handleDelete}
              isDisabled={status !== "idle"}
              isLoading={status === "deleting"}
              isFullWidth
            >
              Delete
            </OutlineButton>
            <PrimaryButton
              isDisabled={status !== "idle"}
              isLoading={status === "updating"}
              onClick={updateHabit}
              isFullWidth
              bg="blue.500"
            >
              Save
            </PrimaryButton>
          </Grid>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditHabit;
