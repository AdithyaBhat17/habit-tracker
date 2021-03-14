import { createStandaloneToast } from "@chakra-ui/toast";
import { Dispatch, SetStateAction } from "react";
import { fetcher } from "../lib/fetcher";
import { Habit } from "../types/habit";

const standaloneToast = createStandaloneToast();

// @todo - replace toast with standaloneToast for all mutate callbacks.

export async function deleteHabit(
  habit: Habit,
  habits: Habit[],
  toast: any,
  token: string,
  close: () => void,
  setStatus: Dispatch<
    SetStateAction<"error" | "idle" | "updating" | "deleting">
  >
) {
  const data = await fetcher({
    url: "/api/habit",
    method: "DELETE",
    token,
    body: {
      habit_id: habit.id,
    },
  });
  if (data.id) {
    const findIndex = habits.findIndex((habit) => habit.id === data.id);
    if (findIndex > -1) {
      habits.splice(findIndex, 1);
    }
  }
  // display a toast message
  let title = "";
  if (!data.id) title = data.message || `Failed to delete "${habit.title}"`;
  else title = `Successfully yeeted "${habit.title}"`;
  toast({
    title,
    position: "top-right",
    status: data.id ? "success" : "error",
  });

  // close the modal and return the habits.
  setStatus("idle");
  close();
  return habits;
}

export async function editHabitTitle(
  title: string,
  habit: Habit | undefined,
  habits: Habit[],
  toast: any,
  token: string,
  setStatus: Dispatch<
    SetStateAction<"idle" | "updating" | "deleting" | "error">
  >,
  close: () => void
) {
  const data = await fetcher({
    url: "/api/habit",
    method: "PUT",
    token,
    body: {
      title,
      habit_id: habit?.id,
    },
  });

  if (data.id) {
    const findIndex = habits.findIndex((habit) => habit.id === data.id);
    if (findIndex > -1) {
      habits.splice(findIndex, 1, data);
    }
  }
  // display a toast message
  let toastTitle = "";
  if (!data.id)
    toastTitle = data.message || `Failed to update "${habit?.title}"`;
  else toastTitle = `Successfully updated "${habit?.title}"`;

  toast({
    title: toastTitle,
    position: "top-right",
    status: data.id ? "success" : "error",
  });
  setStatus("idle");
  if (data.id) close();
  return habits;
}

export async function trackHabit(
  habit: Habit,
  user: string | undefined,
  habits: Habit[]
) {
  const { currentStreak, longestStreak, lastTrackedDate } = habit;
  let updatedHabits: Habit[] = [];
  const data = await fetcher({
    url: "/api/habit",
    method: "PUT",
    token: user,
    body: {
      habit_id: habit.id,
      currentStreak,
      longestStreak,
      lastTrackedDate,
    },
  });
  let findIndex = -1;
  if (data.id) {
    findIndex = habits.findIndex((habit) => habit.id === data.id);
    if (findIndex > -1) {
      updatedHabits = [
        ...habits.slice(0, findIndex),
        data,
        ...habits.slice(findIndex + 1),
      ];
    }
  }

  const title = data?.id
    ? data.message || "Yayy! you did it, keep going young padavan."
    : data.message || `Failed to track ${habit.title}`;

  standaloneToast({
    title,
    status: data.id ? "success" : "error",
    position: "top-right",
  });

  return updatedHabits.length ? updatedHabits : habits;
}
