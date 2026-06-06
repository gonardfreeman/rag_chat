import * as z from "zod";
import dotenv from "dotenv";
import { ConfigSchema, envs } from "../schemas/index.ts";

dotenv.config();

type Config = z.infer<typeof ConfigSchema>;
const nodeEnv = envs.parse(process.env.NODE_ENV || "development");

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv,
};

export default config;
