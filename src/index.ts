import Interval from "@interval/sdk";
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
    enter_one_number: async (io) => {
      const num = await io.input.number("Enter a number");
      return {
        num,
      };
    },
    enter_two_numbers: async (io) => {
      const first = await io.input.number("Enter a number");
      const second = await io.input.number(
        `Enter a number greater than ${first}`,
        {
          min: first + 1,
        }
      );
      return {
        first,
        second,
      };
    },
  },
});

interval.listen();
