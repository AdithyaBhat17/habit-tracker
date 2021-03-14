export type Habit = {
  id: string;
  title: string;
  lastTrackedDate: string;
  currentStreak: number;
  longestStreak: number;
};

export interface EditHabitProps {
  isOpen: boolean;
  close: () => void;
  size?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "xs"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full";
  habit?: Habit;
  user?: string;
}
