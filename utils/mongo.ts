// analogous to official example
// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

const dbConnect = async () => {
  if (!MONGO_URL) {
    throw new Error(
      "Please define the MONGO_URL environment variable inside .env"
    );
  }

  if (global.mongooseConn) {
    return global.mongooseConn;
  }

  if (!global.mongoosePromise) {
    const opts = {
      bufferCommands: false,
    };

    global.mongoosePromise = mongoose.connect(MONGO_URL, opts);
  }
  global.mongooseConn = await global.mongoosePromise;
  return global.mongooseConn;
};

export default dbConnect;

// TODO: declare 리서치
// TODO: cache 과정 리서치
