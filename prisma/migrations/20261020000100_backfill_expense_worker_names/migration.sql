-- Snapshot the worker's name onto existing expenses so the payment keeps its name
-- if the Labor row is later deleted (expenses.worker_id is ON DELETE SET NULL)
UPDATE "expenses"
SET "worker_name" = l."worker_name",
    "worker_lastname" = l."worker_lastname",
    "phone_number" = l."phone"
FROM "labor" l
WHERE "expenses"."worker_id" = l."id"
  AND "expenses"."worker_name" IS NULL;
