import { Flex, Stack, Text, Button } from "@chakra-ui/react";
import React from "react";
import { primaryButtonStates } from "../styles/theme";
import { Habit as HabitType } from "../types/habit";
import PrimaryButton from "./Buttons/PrimaryButton";
import StreakTag from "./StreakTag";

interface HabitProps {
  habit: HabitType;
  onSelect: () => void;
}

function Habit({ habit, onSelect }: HabitProps) {
  console.log(habit.currentStreak);

  return (
    <Flex
      cursor="pointer"
      onClick={onSelect}
      key={habit.id}
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
        <StreakTag currentStreak={habit.currentStreak} />
      </Stack>
      <PrimaryButton>Track</PrimaryButton>
    </Flex>
  );
}

export default Habit;
