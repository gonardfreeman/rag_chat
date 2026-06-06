import * as z from "zod";
import dotenv from "dotenv";
import { ConfigSchema, envs } from "../schemas";

dotenv.config();

type Config = z.infer<typeof ConfigSchema>;
const nodeEnv = envs.parse(process.env.NODE_ENV || "development");

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL || "",
  nodeEnv,
};

export default config;
