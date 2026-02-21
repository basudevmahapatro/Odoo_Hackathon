import { MongoClient, ServerApiVersion } from "mongodb";
import type { Db } from "mongodb";
import { env } from "~/env";

declare global {
  var mongodbClient: MongoClient | undefined;
}

const mongoOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: MongoClient;

if (process.env.NODE_ENV === "production") {
  client = new MongoClient(env.MONGODB_URI, mongoOptions);
} else {
  global.mongodbClient ??= new MongoClient(env.MONGODB_URI, mongoOptions);
  client = global.mongodbClient;
}

export const getClient = async (): Promise<MongoClient> => {
  return client.connect();
};

export const getDb = async (): Promise<Db> => {
  const connectedClient = await getClient();
  return connectedClient.db("fleetflow");
};
