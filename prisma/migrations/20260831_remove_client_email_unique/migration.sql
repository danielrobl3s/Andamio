-- Make client email addresses non-unique as defined in prisma/schema.prisma.
DROP INDEX "public"."clients_email_key";
