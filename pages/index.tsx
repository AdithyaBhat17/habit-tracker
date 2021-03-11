import { Heading } from "@chakra-ui/layout";
import { Suspense } from "react";
import AddHabit from "../components/AddHabit";
import HabitsList from "../components/HabitsList";
import Loading from "../components/Loading";

function getFormattedDate() {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

const isClient = typeof window !== "undefined";

function Home() {
  return (
    <div>
      <AddHabit />
      <Heading color="prussianBlue" size="md" mt="5">
        {getFormattedDate()}
      </Heading>
      {isClient ? (
        <Suspense fallback={<Loading />}>
          <HabitsList />
        </Suspense>
      ) : null}
    </div>
  );
}

export default Home;
