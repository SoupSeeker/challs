FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install graphql
RUN npm install express-graphql

COPY index.js /app

ENV SECRET_MESSAGE="CSUSM{l00k_1nw4rd_4lw4y5_29fa01cd}"

EXPOSE 4001

# Start the application
CMD [ "npm", "start" ]
