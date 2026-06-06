import type { Request, Response } from "express";

export const helloWorld = (req: Request, res: Response) => {
  console.log(req.query);
  res.json({
    hello: "world",
  });
};
