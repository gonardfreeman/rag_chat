import { Router } from "express";
import { generateEmbeding, helloWorld } from "../controllers/index.ts";

const router = Router();

router.get("/", helloWorld);

router.post("/embeding/generate", generateEmbeding);

export default router;
