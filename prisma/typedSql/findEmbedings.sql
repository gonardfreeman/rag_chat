SELECT id, source
FROM "Document"
ORDER BY embedding <=> $1::float8[]::vector 
LIMIT 2
