var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const client = new MongoClient("mongodb://localhost:27017/"), users = client.db("test").collection("users");
app.use(express.json());
app.get("/", (request, response) => __awaiter(this, void 0, void 0, function* () {
    console.log("Get-anrop");
}));
