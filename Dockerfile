FROM node:12-alpine

# Working dir
WORKDIR /usr/src/app

# Copy files from Build
COPY package*.json ./

# Install Files
RUN npm install 

# Copy SRC
COPY . .

# Build
#RUN npm run build

# Open Port
EXPOSE 3001

# Docker Command to Start Service
CMD [ "node", "server.js" ]