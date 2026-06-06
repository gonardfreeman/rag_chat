-- This is an empty migration.
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE "Document" (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  embedding VECTOR(4096) -- dimensions depend on your embedding model
);
