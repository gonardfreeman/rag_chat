import * as z from "zod";
import { model } from "./literals.ts";

const stringOrArrayOfStrings = z.union([z.string(), z.array(z.string())]);

export const EmbedingPayloadSchema = z.strictObject({
  model: model,
  input: stringOrArrayOfStrings,
});
