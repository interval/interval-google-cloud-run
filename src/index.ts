import Interval, { io } from "@interval/sdk";
import "dotenv/config";
import express from "express";

// Google Cloud Run requires a process listening on port 8080
const app = express();
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const interval = new Interval({
  apiKey: process.env.INTERVAL_API_KEY,
  actions: {
    hello_world: async () => {
      const name = await io.input.text("Your name");
      return `Hello, ${name}`;
    },
  },
});

interval.listen();
