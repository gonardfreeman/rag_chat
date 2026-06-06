import type { Request, Response } from "express";
import { APPLICATION_JSON, CONTENT_TYPE, OLLAMA_URL } from "../constants/index.ts";
import { EmbedingPayloadSchema } from "../schemas/index.ts";

const HEADERS = {
  [CONTENT_TYPE]: APPLICATION_JSON,
};

export const generateEmbeding = async (req: Request, res: Response) => {
  try {
    const parsedPayload = EmbedingPayloadSchema.parse(req.body);
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(parsedPayload),
    });
    const body = await response.json();
    res.json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      title: "Error generating embedings",
      message: JSON.stringify(error),
    });
  }
};
