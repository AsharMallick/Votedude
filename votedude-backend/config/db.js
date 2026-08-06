const mongoose = require("mongoose");

let isConnected = false;

exports.connectDB = async () => {
  if (isConnected) return;

  mongoose.set("strictQuery", false);

  await mongoose.connect(process.env.MONGO_URI, {
    dbName: "VoteDude",
  });

  isConnected = true;

  console.log("DB connected");
};
