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
    // call the stored procedure that resets broken streaks for a particular user.
    const { data: rpcData, error: rpcError } = await supabase.rpc(
      "reset_current_streak1",
      {
        userid: user_id,
      }
    );

    if (rpcError) {
      console.error("Error running stored procedure", rpcError);
    }

    if (rpcData) {
      console.log(`Woah, someone broke their streak 🤨`);
    }

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
