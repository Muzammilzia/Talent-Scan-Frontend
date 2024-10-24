FROM node:20.0.0
WORKDIR /operatingpro/
COPY package*.json ./
COPY tsconfig*.json ./
COPY . ./
RUN npm install

CMD [ "npm", "start" ]
