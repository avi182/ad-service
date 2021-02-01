import mongoose from "mongoose";
const { DB_URL } = require("../../db.json");

export const connect = async () => {
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
