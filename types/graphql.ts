export type Variables = {
  [key: string]: unknown;
};

export interface HabitsResponse {
  errors?: { message: string }[];
  data?: {
    habits?: {
      data: {
        _id: string;
        title: string;
        user: {
          _id: string;
          name: string;
          email: string;
        };
        currentSreak: number;
        longestStreak: number;
      }[];
    };
  };
}
