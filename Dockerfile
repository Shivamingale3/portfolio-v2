# Use the official Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app's code
COPY . .

# Build the app
RUN npm run build

# Use a lightweight Node.js image for production
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy the built app from the builder stage
COPY --from=builder /app/ ./

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
