# Use an official Node.js runtime as the base image
FROM node:21

# Set the working directory in the container to /app
WORKDIR /usr/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Make port available to the world outside the container
EXPOSE 4000

# Define the command to run the app
CMD [ "npm", "start" ]