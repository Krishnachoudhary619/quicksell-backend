import express, { Express, Request, Response } from "express";
import routes from "./routes";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
