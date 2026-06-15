const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://muhammedjalal928_db_user:<db_password>@cluster0.r2llth7.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("Connection Error ❌", error);
  }
}

module.exports = connectDB;