const { MongoClient } = require("mongodb");
const { MONGO_URL } = require("../../config");

exports.handler = async () => {
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    const products = await client.db("store").collection("products").find().toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return { statusCode: 500, body: "Error fetching products" };
  } finally {
    await client.close();
  }
};
