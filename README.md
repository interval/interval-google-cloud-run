# interval-google-cloud-run

Here's an example project with Interval running on Google Cloud Run.

---

## Before you begin

There are two requirements for running Interval on Google Cloud Run:

- Your instance must use [always allocated CPUs](https://cloud.google.com/blog/products/serverless/cloud-run-gets-always-on-cpu-allocation) with a single allocated instance
- Your entrypoint must listen for connections on port 8080:

```ts
const express = require("express");
const app = express();

// Google Cloud Run requires a process listening on port 8080
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Interval config...

interval.listen();
```

## Installation

Use the following instructions to set up a new instance on Google Cloud Run to run Interval. This guide assumes you'll be setting up continuous deployment from a GitHub repo using a Dockerfile.

For examples of how to set up your project, check out the sample [Dockerfile](https://github.com/interval/interval-google-cloud-run/blob/main/Dockerfile) and [index.ts](https://github.com/interval/interval-google-cloud-run/blob/main/index.ts).

1. In Google Cloud Platform, go to the **Cloud Run** dashboard
2. Click **Create Service**
3. Choose "Continuously deploy new revisions from a source repository", then click the **Set Up With Cloud Build** button
4. Pick your repo from GitHub and click **Next**
5. Under **Build Type**, select the **Dockerfile** option
6. Under **CPU allocation**, pick "CPU is always allocated"
7. Set **minimum and maximum** number of instances to 1
8. Under **Authentication**, choose "Allow unauthenticated invocations"
9. Click **Container, Variables & Secrets, Connections, Security**
10. Under **Variables & Secrets > Environment Variables**, add your API key as `INTERVAL_API_KEY`. You can get your API key from the [dashboard](https://intervalkit.com/dashboard/develop/keys).
11. Click Create

That's it! Cloud Build will build and deploy your app to Cloud Run.
