import type { Request, Response } from "express";
import { MODEL, APPLICATION_JSON, CONTENT_TYPE, OLLAMA_URL } from "../constants";
import { EmbedingPayloadSchema, EmbedingResponseSchema } from "../schemas";
import { insertDocument } from "../../generated/prisma/sql";
import { prisma } from "../lib/prisma";

const HEADERS = {
  [CONTENT_TYPE]: APPLICATION_JSON,
};

export const generateEmbeding = async (req: Request, res: Response) => {
  try {
    const parsedPayload = EmbedingPayloadSchema.parse(req.body);
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ ...parsedPayload, model: MODEL }),
    });
    const body = await response.json();
    console.log(body);
    const parsedBody = EmbedingResponseSchema.parse(body);
    if (parsedPayload.insert !== true) {
      return res.json(parsedBody);
    }
    for (const embeding of parsedBody.embeddings) {
      await prisma.$queryRawTyped(insertDocument(embeding));
    }
    return res.json(parsedBody);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      title: "Error generating embedings",
      message: JSON.stringify(error),
    });
  }
};
