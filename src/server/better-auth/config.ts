import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { env } from "~/env";

const client = new MongoClient(env.MONGODB_URI);

export const auth = betterAuth({
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
  },
});

export type Session = typeof auth.$Infer.Session;
