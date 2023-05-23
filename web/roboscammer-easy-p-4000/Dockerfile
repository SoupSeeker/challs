FROM node:14-alpine

RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm install graphql

COPY . .

ENV SECRET_MESSAGE="CSUSM{r0b0sc4mm3r_HQ_d3f3at3d_0nc3_again}"

EXPOSE 4000

CMD [ "npm", "start" ]
