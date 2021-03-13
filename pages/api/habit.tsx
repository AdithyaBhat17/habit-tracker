import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase";

export default async function habit(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // @todo - Verify user before adding habit using token.
    const { data, error } = await supabase.from("habits").insert([
      {
        title: req.body.title,
        user_id: "62ac2f91-e1a2-40a8-bb40-508f58c41134",
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
      .match({ id: req.body.habit_id });

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
    let currentStreak = req.body.currentStreak;
    let longestStreak = req.body.longestStreak;
    let lastTrackedDate = req.body.lastTrackedDate;
    if (currentStreak && longestStreak) {
      // check if user failed to track habit within 24 hours.
      // reset the current streak if user failed to track a habit within 24 hours.
      if (Date.parse(lastTrackedDate) - 24 * 60 * 60 * 100 > Date.now()) {
        currentStreak = 0;
      } else {
        currentStreak += 1;
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      }
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
      // @todo - Update habit only if user.id === habit.user_id
      .match({
        id: req.body.habit_id,
        user_id: "62ac2f91-e1a2-40a8-bb40-508f58c41134",
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