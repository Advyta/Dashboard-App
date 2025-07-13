import mongoose from "mongoose";

//Project: Dashboard APP
// Module: Database Configuration
// Component: dbConfig.ts
// Author: Advyta
// Date: 28/06/2025
// Logic:
// This module is used to connect to the MongoDB database
// It checks if the database is already connected and if not, it connects to the database
// It also logs the connection status and any errors that occur

let isConnected = false;

export async function connect() {
  if (isConnected) return;
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully!");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDb connection error. Please make sure MongoDB is running." + err
      );
      process.exit;
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
