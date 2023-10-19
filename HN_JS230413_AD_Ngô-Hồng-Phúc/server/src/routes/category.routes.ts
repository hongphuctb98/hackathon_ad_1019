import express from "express";
import db from "../ultils/database";

import { Request, Response } from "express";

const categoryRoutes = express.Router();

//get all
categoryRoutes.get("/", async (req: Request, res: Response) => {
  const query = "SELECT * FROM category";
  try {
    const catesgories = await db.execute(query);
    res.json({ categories: catesgories[0] });
  } catch (error) {
    res.json({ error: error });
  }
});

//get one
categoryRoutes.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM category WHERE category_id = ${id}`;
    const category: any = await db.execute(query);
    if (category[0].length > 0) {
      res.json({ category: category[0][0] });
    } else {
      res.json({ error: "category not found" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

//post
categoryRoutes.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const query = `INSERT INTO category (name) VALUES (?)`;
    const result: any = await db.execute(query, [name]);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "create category success", status: 200 });
    } else {
      res.json({ error: "create category failed", status: 400 });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

export default categoryRoutes;
