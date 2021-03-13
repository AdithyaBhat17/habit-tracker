import { Box, Flex } from "@chakra-ui/layout";
import useSWR from "swr";
import Habit from "./Habit";
import { fetcher } from "../lib/fetcher";
import { HabitsResponse } from "../types/graphql";
import Error from "./Error";
import EditHabit from "./EditHabit";
import { useState } from "react";
import { Habit as HabitType } from "../types/habit";

function HabitsList() {
  const { data, error } = useSWR<HabitsResponse>(
    "/api/habits",
    (url) => fetcher({ url, method: "GET" }),
    {
      suspense: true,
    }
  );

  const [selectedHabit, selectHabit] = useState<HabitType | undefined>(
    undefined
  );

  const close = () => selectHabit(undefined);

  if (error || data?.code) return <Error error={error || data} />;

  const habits = data;

  return (
    <Box>
      {habits
        ?.sort(
          (a, b) =>
            Date.parse(b.lastTrackedDate) - Date.parse(a.lastTrackedDate)
        )
        .map((habit) => (
          <Habit
            key={habit.id}
            onSelect={() => selectHabit(habit)}
            habit={habit}
          />
        ))}
      <EditHabit
        isOpen={Boolean(selectedHabit)}
        close={close}
        habit={selectedHabit}
        size="sm"
      />
      {habits?.length === 0 ? (
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          No habits found
        </Flex>
      ) : null}
    </Box>
  );
}

export default HabitsList;
