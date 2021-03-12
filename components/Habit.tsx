import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Habit as HabitType } from "../types/habit";
import PrimaryButton from "./Buttons/PrimaryButton";
import StreakTag from "./StreakTag";

interface HabitProps {
  habit: HabitType;
  onSelect: () => void;
}

function Habit({ habit, onSelect }: HabitProps) {
  return (
    <Flex
      cursor="pointer"
      onClick={onSelect}
      key={habit.id}
      py="5"
      borderBottom="1px solid"
      borderColor="horizon"
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
