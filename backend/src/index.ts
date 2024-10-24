import express, { Application } from "express";
import bodyParser from "body-parser";
import alumRoutes from "./routes/alumRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/alumnos", alumRoutes);

// SERVER
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
