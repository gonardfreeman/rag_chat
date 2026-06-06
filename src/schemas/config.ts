import * as z from "zod";
import { envs } from "./";

export const ConfigSchema = z.object({
  port: z.number(),
  nodeEnv: envs,
  databaseUrl: z.url(),
});
