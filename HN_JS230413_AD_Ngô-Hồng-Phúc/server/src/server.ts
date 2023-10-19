import express from "express";

//require package

import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
const port = 3000;

import categoryRoutes from "./routes/category.routes";
import questionRoutes from "./routes/question.routes";
import answerRoutes from "./routes/answer.routes";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/answers", answerRoutes);

// use package

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
