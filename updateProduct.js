const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URL } = require("../../config");

exports.handler = async (event) => {
  const client = new MongoClient(MONGO_URL);
  const { id, ...data } = JSON.parse(event.body);

  try {
    await client.connect();
    await client.db("store").collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return { statusCode: 200, body: "Product updated" };
  } catch {
    return { statusCode: 500, body: "Error updating product" };
  } finally {
    await client.close();
  }
};
