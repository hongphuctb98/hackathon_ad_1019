import express from "express";
import db from "../ultils/database";

import { Request, Response } from "express";
import { log } from "console";

const answerRoutes = express.Router();

//get all
answerRoutes.get("/", async (req: Request, res: Response) => {
  const query = "SELECT * FROM answer";

  try {
    const answers = await db.execute(query);
    res.json({ answers: answers[0] });
  } catch (error) {
    res.json({ error: error });
  }
});

//get one
answerRoutes.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM answer WHERE answer_id = ${id}`;
    const answer: any = await db.execute(query);
    if (answer[0].length > 0) {
      res.json({ answer: answer[0][0] });
    } else {
      res.json({ error: "answer not found" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

//post
answerRoutes.post("/", async (req: Request, res: Response) => {
  const { question_id, content, is_answer } = req.body;
  console.log(req.body);
  try {
    const create_at = new Date().toISOString().split("T")[0];
    const query = `INSERT INTO answer (question_id, is_answer, content, create_at) VALUES (?,?,?,?)`;

    const result: any = await db.execute(query, [
      question_id,
      is_answer,
      content,
      create_at,
    ]);

    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "create answer success", status: 200 });
    } else {
      res.json({ error: "create answer failed", status: 400 });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

export default answerRoutes;
