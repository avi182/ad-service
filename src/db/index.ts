import mongoose from "mongoose";

export const connect = async () => {
  await mongoose.connect("mongodb://127.0.0.1/ads-system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
