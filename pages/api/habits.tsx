import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-admin";

export default async function habits(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user_id = req.headers.token as string;
  if (!user_id) {
    return res.status(401).json({ message: "Failed to fetch habits" });
  }
  try {
    let { data: habits, error } = await supabase
      .from("habits")
      .select("id, title, currentStreak, longestStreak, lastTrackedDate")
      .match({ user_id });

    if (error) {
      return res.status(Number(error.code)).json({ message: error.message });
    }

    res.status(200).json(habits);
  } catch (e) {
    res.status(500).json(e);
  }
}
