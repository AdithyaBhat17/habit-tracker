import { Flex, Stack, Text } from "@chakra-ui/react";
import React, { SyntheticEvent, useState } from "react";
import { mutate } from "swr";
import { Habit as HabitType } from "../types/habit";
import { trackHabit } from "../utils/habit";
import PrimaryButton from "./Buttons/PrimaryButton";
import StreakTag from "./StreakTag";

interface HabitProps {
  habit: HabitType;
  onSelect: () => void;
  user?: string;
}

function Habit({ habit, user, onSelect }: HabitProps) {
  const [loading, setLoading] = useState(false);

  async function track(event: SyntheticEvent<HTMLButtonElement>) {
    event.stopPropagation();
    mutate(
      "/api/habits",
      async (habits: HabitType[]) => {
        setLoading(true);
        const updatedHabits = await trackHabit(habit, user, habits);
        setLoading(false);
        return updatedHabits;
      },
      false
    );
  }

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
      <PrimaryButton isLoading={loading} isDisabled={loading} onClick={track}>
        Track
      </PrimaryButton>
    </Flex>
  );
}

export default Habit;
