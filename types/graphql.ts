export type Variables = {
  [key: string]: unknown;
};

export type HabitsResponse = {
  code?: string;
} & {
  id: string;
  title: string;
  lastTrackedDate: string;
  currentStreak: number;
  longestStreak: number;
}[];
