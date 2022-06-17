import "dotenv/config";
import Interval, { io } from "@interval/sdk";

// Google Cloud Run requires a process listening on port 8080
const http = require("http");
const server = http.createServer(() => {});
server.listen(8080);

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
