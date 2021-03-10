import { Flex, Stack, Text, Button } from "@chakra-ui/react";
import React from "react";
import { primaryButtonStates } from "../styles/theme";
import { Habit as HabitType } from "../types/habit";
import StreakTag from "./StreakTag";

interface HabitProps {
  habit: HabitType;
}

function Habit({ habit }: HabitProps) {
  return (
    <Flex
      cursor="pointer"
      key={habit._id}
      justifyContent="space-between"
      alignItems="center"
    >
      <Stack spacing="1">
        <Text
          cursor="text"
          fontWeight="medium"
          fontSize="md"
          noOfLines={[1, 2, 2]}
        >
          {habit.title}
        </Text>
        <StreakTag currentStreak={habit.currentSreak} />
      </Stack>
      <Button
        _hover={primaryButtonStates}
        _focus={primaryButtonStates}
        _active={primaryButtonStates}
        color="white"
        bg="prussianBlue"
      >
        Track
      </Button>
    </Flex>
  );
}

export default Habit;
