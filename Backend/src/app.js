import express from "express";
import cors from "cors";
import TareaRoutes from "./routes/TareaRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", TareaRoutes);

export default app;