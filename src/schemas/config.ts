import * as z from "zod";
import { envs } from "./index.ts";

export const ConfigSchema = z.object({
  port: z.number(),
  nodeEnv: envs,
});
