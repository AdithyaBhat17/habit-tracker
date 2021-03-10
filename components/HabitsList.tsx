import { Box } from "@chakra-ui/layout";
import useSWR from "swr";
import Habit from "./Habit";
import { fetcher } from "../lib/fetcher";
import { HabitsResponse } from "../types/graphql";
import { HABITS_QUERY } from "../graphql/queries";
import Error from "./Error";

function HabitsList() {
  const { data, error } = useSWR<HabitsResponse>(
    "habits",
    () => fetcher(HABITS_QUERY),
    {
      suspense: true,
    }
  );

  if (error || data?.errors) return <Error error={error || data} />;

  return (
    <Box py="5" borderBottom="1px solid" borderColor="horizon">
      {data?.data?.habits?.data?.map((habit) => (
        <Habit key={habit._id} habit={habit} />
      ))}
    </Box>
  );
}

export default HabitsList;
