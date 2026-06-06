import * as z from "zod";
import { MODEL } from "../constants";

export const envs = z.literal(["development", "production"]);
export const model = z.literal(MODEL);
