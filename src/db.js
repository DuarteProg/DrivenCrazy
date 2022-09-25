import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config()

const cliente = new MongoClient(process.env.MONGO_URI);
let db;

try {
  await cliente.connect();
  db = cliente.db("api-drivencrazy")
} catch (error) {
  console.log(error)
}

export default db;