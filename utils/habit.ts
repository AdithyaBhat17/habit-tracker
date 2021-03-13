import { Dispatch, SetStateAction } from "react";
import { fetcher } from "../lib/fetcher";
import { Habit } from "../types/habit";

export async function deleteHabit(
  habit: Habit,
  habits: Habit[],
  toast: any,
  close: () => void,
  setStatus: Dispatch<
    SetStateAction<"error" | "idle" | "updating" | "deleting">
  >
) {
  const data = await fetcher({
    url: "/api/habit",
    method: "DELETE",
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
  setStatus: Dispatch<
    SetStateAction<"idle" | "updating" | "deleting" | "error">
  >,
  close: () => void
) {
  const data = await fetcher({
    url: "/api/habit",
    method: "PUT",
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
