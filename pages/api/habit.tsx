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
  } else {
    res.status(400).json({ code: "INVALID METHOD" });
  }
}
