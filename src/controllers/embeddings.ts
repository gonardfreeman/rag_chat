import type { Request, Response } from "express";
import { MODEL, APPLICATION_JSON, CONTENT_TYPE, OLLAMA_URL } from "../constants";
import { DocumentPayloadSchema, EmbedingPayloadSchema, EmbedingResponseSchema } from "../schemas";
import { findEmbedings, insertDocument } from "../../generated/prisma/sql";
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
    const parsedBody = EmbedingResponseSchema.parse(body);
    if (parsedPayload.insert !== true) {
      return res.json(parsedBody);
    }
    if (!Array.isArray(parsedPayload.input)) {
      await prisma.$queryRawTyped(insertDocument(parsedPayload.input, parsedBody.embeddings[0]));
      return res.json(parsedBody);
    }
    for (let i = 0; i < parsedBody.embeddings.length; i++) {
      await prisma.$queryRawTyped(insertDocument(parsedPayload.input[i], parsedBody.embeddings[i]));
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

export const findSimilar = async (req: Request, res: Response) => {
  const parsedPayload = DocumentPayloadSchema.parse(req.body);
  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ ...parsedPayload, model: MODEL }),
  });
  const body = await response.json();
  console.log(body);
  const parsedBody = EmbedingResponseSchema.parse(body);
  const similarRecords = await prisma.$queryRawTyped(findEmbedings(parsedBody.embeddings[0]));
  res.json(similarRecords);
};
