FROM node:latest

WORKDIR /app

# Copy only package.json and yarn.lock first to leverage Docker cache
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files
COPY . .

# Start your application
CMD ["npm", "start"]
