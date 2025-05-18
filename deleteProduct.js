const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URL } = require("../../config");

exports.handler = async (event) => {
  const client = new MongoClient(MONGO_URL);
  const { id } = JSON.parse(event.body);

  try {
    await client.connect();
    await client.db("store").collection("products").deleteOne({ _id: new ObjectId(id) });
    return { statusCode: 200, body: "Product deleted" };
  } catch {
    return { statusCode: 500, body: "Error deleting product" };
  } finally {
    await client.close();
  }
};
