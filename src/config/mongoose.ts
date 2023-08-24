import mongoose from "mongoose";

const MONGO_ADDR = process.env.MONGO_ADDR || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DB = process.env.MONGO_DB || "express-typescript";
const MONGO_URI = `mongodb://${MONGO_ADDR}:${MONGO_PORT}/${MONGO_DB}`;

export const connect = () => {
  return mongoose
    .connect(MONGO_URI, { })
    .then(() => {
      return console.log(`Successfully connected to ${MONGO_URI}`);
    })
    
}