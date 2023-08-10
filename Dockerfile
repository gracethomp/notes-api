# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy all app files to the container
COPY . .

# Start the server using ts-node
CMD ["npx", "ts-node", "src/server.ts"]
