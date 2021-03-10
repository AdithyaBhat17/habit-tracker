export type Habit = {
  _id: string;
  title: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  currentSreak: number;
  longestStreak: number;
};
