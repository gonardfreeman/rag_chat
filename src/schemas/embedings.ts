import * as z from "zod";

const stringOrArrayOfStrings = z.union([z.string(), z.array(z.string())]);

export const EmbedingPayloadSchema = z.strictObject({
  input: stringOrArrayOfStrings,
  insert: z.boolean().optional(),
});

export const EmbedingsSchema = z.array(z.array(z.float64()));

export const EmbedingResponseSchema = z.object({
  model: z.string(),
  load_duration: z.number().positive(),
  prompt_eval_count: z.number().positive(),
  total_duration: z.number().positive(),
  embeddings: EmbedingsSchema,
});
