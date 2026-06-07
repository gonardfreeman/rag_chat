# RAG Typescript

This is simple example of RAG setup with help of [ollama](https://ollama.com/) + [pgvector](https://github.com/pgvector/pgvector)

Mostly based on [this](https://github.com/dannyblaker/rag-tutorial/blob/main/lessons/02-understanding-embeddings.md)

## Setup

1. Download [ollama](https://ollama.com)
2. Install [qwen3 embedding](https://ollama.com/library/qwen3-embedding) `ollama pull qwen3-embedding`
3. Insall project `npm install` or `pnpm install`
4. Install [PG Vector](https://github.com/pgvector/pgvector)
5. Create DB ([use this guide](https://www.prisma.io/docs/postgres/database/postgres-extensions))
6. Optional tweak queries in `prisma/typedSql` and run `pnpm run prisma:generate:sql` 
7. Create docs
```bash
curl "http://localhost:3000/api/embeding/generate" \
-d '{"insert": true, "input": ["Paris is the capital of France", "The Eiffel Tower is in Paris", "Python is programming language", "Machine learning is a subset of AI"]}' \
-H 'Content-Type: application/json'
```
8. Run query
```bash
curl "http://localhost:3000/api/embeding/find" \
-d '{"input": "where tower in france?"}' \
-H 'Content-Type: application/json'
```
Results will be:
```json
[
    {
        "id": "f47b9ecf-7aa0-482a-be42-ae97617b2aa6",
        "source": "The Eiffel Tower is in Paris"
    },
    {
        "id": "f3cdfd1a-1e7c-4f43-b27a-1ac8dc0c891b",
        "source": "Paris is the capital of France"
    }
]
```
