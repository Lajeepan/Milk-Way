import { MongoClient, ObjectId } from "mongodb";

export const getProductById = async (id: string) => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  try {
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) }); // Ensure that the id is converted to an ObjectId

    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  } finally {
    client.close();
  }
};
