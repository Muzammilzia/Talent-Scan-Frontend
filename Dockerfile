FROM node:20.0.0
WORKDIR /
COPY package*.json ./
COPY tsconfig*.json ./
COPY . ./
RUN npm install

CMD [ "npm", "start" ]
