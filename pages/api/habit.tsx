import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-admin";

export default async function habit(req: NextApiRequest, res: NextApiResponse) {
  const user_id = req.headers.token as string;

  if (!user_id) {
    return res.status(401).json({
      message: "You are not authorized to perform this action.",
    });
  }

  if (req.method === "POST") {
    const { data, error } = await supabase.from("habits").insert([
      {
        title: req.body.title,
        user_id,
      },
    ]);

    if (error) {
      return res.status(400).json(error);
    }

    let insertedRow = data?.[0] ?? null;

    delete insertedRow?.user_id;

    res.status(200).json(insertedRow);
  } else if (req.method === "DELETE") {
    const { data, error } = await supabase
      .from("habits")
      .delete({
        returning: "representation",
        count: "exact",
      })
      .match({ id: req.body.habit_id, user_id });

    if (error) {
      return res.status(400).json(error);
    }

    if (data == null) {
      return res
        .status(400)
        .json({ message: "The habit you just tried to yeet is not available" });
    }

    const deletedRow = data?.[0] ?? null;

    delete deletedRow?.user_id;

    res.status(200).json(deletedRow);
  } else if (req.method === "PUT") {
    const title = req.body.title;
    // the below streak and date values are only sent when user is
    // manually tracking their habits.
    let currentStreak = req.body.currentStreak;
    let longestStreak = req.body.longestStreak;
    let lastTrackedDate = req.body.lastTrackedDate;
    if (currentStreak !== undefined && longestStreak !== undefined) {
      // check if user failed to track habit within 24 hours.
      let lastTrackedAt = new Date(lastTrackedDate).getTime();
      let currentTime = new Date().getTime();
      const isStreakBroken =
        Math.abs(lastTrackedAt - currentTime) > 24 * 60 * 60 * 1000;

      // reset the current streak if user failed to track a habit within 24 hours.
      if (isStreakBroken) {
        currentStreak = 1;
      } else {
        currentStreak += 1;
        // keep the currentStreak and longestStreak in sync if user's current streak is
        // greater than the longestStreak.
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      }
      // update the lastTrackedDate to current timestamp.
      lastTrackedDate = new Date().toISOString().replace("Z", "");
    }
    const { data, error } = await supabase
      .from("habits")
      .update({
        title,
        currentStreak,
        longestStreak,
        lastTrackedDate,
      })
      .match({
        id: req.body.habit_id,
        user_id,
      });

    if (error) {
      return res.status(400).json(error);
    }

    if (data == null) {
      return res.status(400).json({ message: "Failed to update this habit." });
    }

    const [updatedRow] = data;
    delete updatedRow.user_id;

    res.status(200).json({
      ...updatedRow,
      message: currentStreak === 0 ? "Damn! You blew your streak" : undefined,
    });
  } else {
    res.status(400).json({ code: "INVALID METHOD" });
  }
}
