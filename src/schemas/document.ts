import * as z from "zod";
import { EmbedingsSchema, EmbedingPayloadSchema } from "./embedings";

export const DocumentPayloadSchema = EmbedingPayloadSchema.omit({
  insert: true,
});

export const DocumentSchema = z.object({
  id: z.uuid(),
  source: z.string(),
  embedding: EmbedingsSchema,
});
