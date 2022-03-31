# Use the official lightweight Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:16-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copying this separately prevents re-running npm install on every code change.
COPY package.json yarn.lock ./

# Install production dependencies.
RUN yarn install

# Copy local code to the container image.
COPY . ./

RUN yarn run build

# Run the web service on container startup.
CMD [ "npm", "start" ]