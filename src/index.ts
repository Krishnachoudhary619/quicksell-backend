import dotenv from "dotenv";

dotenv.config();
import express, { Express } from "express";
import routes from "./routes";


const app: Express = express();
const port = process.env.PORT || 3000;

/**
 * ✅ Cloud Workstations + Swagger SAFE CORS
 */
app.use((req, res, next) => {
  const origin = req.headers.origin as string;

  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") {
    console.log("[OPTIONS OK]", req.originalUrl);
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`[server]: Server running on port ${port}`);
});
