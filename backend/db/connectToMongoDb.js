import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect to Mongo DB");
  } catch (error) {
    console.log("Error connection to MOngo Db", error.message);
  }
};

export default connectToMongoDb;
