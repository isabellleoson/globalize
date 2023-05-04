const { MongoClient, ObjectId } = require("mongodb");
const { Mongoose } = require("mongoose");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(cors());

Mongoose.connect("mongodb://127.0.0.1:27017/test");

const client = new MongoClient("mongodb://localhost:27017/"),
    users = client.db("test").collection("users");

app.use(express.json());

app.get("/", async (request: any, response: any) => {
    console.log("Get-anrop");
});
