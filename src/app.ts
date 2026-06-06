import express from "express";
import router from "./routes/routes.ts";
import { errorHandler } from "./middlewares/index.ts";

const app = express();
app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

export default app;
