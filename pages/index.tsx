import { Heading } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { Suspense, useEffect } from "react";
import AddHabit from "../components/AddHabit";
import HabitsList from "../components/HabitsList";
import Loading from "../components/Loading";
import { useUser } from "../lib/useUser";
import Head from "next/head";

function getFormattedDate() {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

const isClient = typeof window !== "undefined";

function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/auth");
  }, [user]);

  return (
    <div>
      <Head>
        <title>Track your habits</title>
      </Head>
      <AddHabit user={user?.id} />
      <Heading color="prussianBlue" size="md" mt="5">
        {getFormattedDate()}
      </Heading>
      {isClient ? (
        <Suspense fallback={<Loading />}>
          <HabitsList user={user?.id} />
        </Suspense>
      ) : null}
    </div>
  );
}

export default Home;
