import { Box } from "@chakra-ui/layout";
import useSWR from "swr";
import Habit from "./Habit";
import { fetcher } from "../lib/fetcher";
import { HabitsResponse } from "../types/graphql";
import Error from "./Error";
import EditHabit from "./EditHabit";
import { useCallback, useState } from "react";
import { Habit as HabitType } from "../types/habit";

function HabitsList() {
  const { data, error } = useSWR<HabitsResponse>("/api/habits", fetcher, {
    suspense: true,
  });

  const [selectedHabit, selectHabit] = useState<HabitType | undefined>(
    undefined
  );

  const close = () => selectHabit(undefined);

  const editHabit = useCallback((title) => {
    console.log(title);
  }, []);

  if (error || data?.code) return <Error error={error || data} />;

  const habits = data;

  return (
    <Box py="5" borderBottom="1px solid" borderColor="horizon">
      {habits?.map((habit) => (
        <Habit
          key={habit.id}
          onSelect={() => selectHabit(habit)}
          habit={habit}
        />
      ))}
      <EditHabit
        editHabit={editHabit}
        isOpen={Boolean(selectedHabit)}
        close={close}
        habit={selectedHabit}
        size="sm"
      />
    </Box>
  );
}

export default HabitsList;
