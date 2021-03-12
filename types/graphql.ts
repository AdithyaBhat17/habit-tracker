export type Variables = {
  [key: string]: unknown;
};

export type HabitsResponse = {
  code?: string;
} & {
  id: string;
  title: string;
  lastTrackedDate: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  currentStreak: number;
  longestStreak: number;
}[];
