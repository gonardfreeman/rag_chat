import * as z from "zod";
import { MODEL } from "../constants/index.ts";

export const envs = z.literal(["development", "production"]);
export const model = z.literal(MODEL);
