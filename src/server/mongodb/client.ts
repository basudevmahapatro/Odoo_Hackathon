import { MongoClient } from "mongodb";
import type { Db } from "mongodb";
import { env } from "~/env";

declare global {
  var mongodbClient: MongoClient | undefined;
}

let client: MongoClient;

if (process.env.NODE_ENV === "production") {
  client = new MongoClient(env.MONGODB_URI);
} else {
  global.mongodbClient ??= new MongoClient(env.MONGODB_URI);
  client = global.mongodbClient;
}

export const getClient = async (): Promise<MongoClient> => {
  return client.connect();
};

export const getDb = async (): Promise<Db> => {
  const connectedClient = await getClient();
  return connectedClient.db();
};
