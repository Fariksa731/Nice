const { MongoClient } = require("mongodb");
const { MONGO_URL } = require("../../config");

exports.handler = async (event) => {
  const client = new MongoClient(MONGO_URL);
  const data = JSON.parse(event.body);

  try {
    await client.connect();
    await client.db("store").collection("products").insertOne(data);
    return { statusCode: 200, body: "Product added" };
  } catch {
    return { statusCode: 500, body: "Error adding product" };
  } finally {
    await client.close();
  }
};
