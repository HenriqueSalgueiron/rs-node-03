// esse arquivo:
//  carrega as variáveis de ambiente do arquivo .env para process.env
//  valida as variáveis de ambiente usando zod

import "dotenv/config"; // só de importar ele já carrega as variáveis de ambiente
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error(
    "❌ Invalid environment variables:",
    z.treeifyError(_env.error),
  );
  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
