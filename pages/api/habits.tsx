import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

export default async function habits(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let { data: habits, error } = await supabase
      .from("habits")
      .select("id, title, currentStreak, longestStreak");

    if (error) {
      return res.status(Number(error.code)).json({ message: error.message });
    }

    res.status(200).json(habits);
  } catch (e) {
    res.status(500).json(e);
  }
}
