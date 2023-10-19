import express from "express";
import db from "../ultils/database";

import { Request, Response } from "express";
import { log } from "console";

const questionRoutes = express.Router();

//get all
questionRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const category_id = +req.query.category_id;
    const level = req.query.level;
    const limit = +req.query.limit;

    let query = "SELECT * FROM question";

    if (category_id) {
      query += ` where category_id = ${category_id}`;
    }
    if (level) {
      let levelInt = 0;
      switch (level) {
        case "easy":
          levelInt = 0;
          break;
        case "medium":
          levelInt = 1;
          break;
        case "hard":
          levelInt = 2;
          break;
        default:
          levelInt = 0;
      }
      query += ` AND level = ${levelInt}`;
    }

    if (limit) {
      query += ` LIMIT ${limit}`;
    }

    console.log(query);
    const questions = await db.execute(query);
    res.json({ questions: questions[0] });
  } catch (error) {
    res.json({ error: error });
  }
});

//get one
questionRoutes.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM question WHERE question_id = ${id}`;
    const question: any = await db.execute(query);
    if (question[0].length > 0) {
      res.json({ question: question[0][0] });
    } else {
      res.json({ error: "question not found" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

//get one by all answer
questionRoutes.get("/:id/answers", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM answer WHERE question_id = ${id}`;
    const question: any = await db.execute(query);
    if (question[0].length > 0) {
      res.json({ answers: question[0] });
    } else {
      res.json({ error: "question not found" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

//post
questionRoutes.post("/", async (req: Request, res: Response) => {
  const { category_id, content, level } = req.body;
  try {
    const create_at = new Date().toISOString().split("T")[0];
    const query = `INSERT INTO question (category_id, create_at, content, level) VALUES (?,?,?,?)`;

    const result: any = await db.execute(query, [
      category_id,
      create_at,
      content,
      level,
    ]);

    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "create todo success", status: 200 });
    } else {
      res.json({ error: "create todo failed", status: 400 });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

export default questionRoutes;
