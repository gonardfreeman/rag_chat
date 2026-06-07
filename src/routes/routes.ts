import { Router } from "express";
import { generateEmbeding, helloWorld } from "../controllers";
import { findSimilar } from "../controllers/embeddings";

const router = Router();

router.get("/", helloWorld);

router.post("/embeding/generate", generateEmbeding);
router.post("/embeding/find", findSimilar);

export default router;
