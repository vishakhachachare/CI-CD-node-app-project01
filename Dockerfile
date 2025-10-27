# small production image
FROM node:18-alpine

WORKDIR /src

# copy package files first (cache layers)
COPY package*.json ./

# install only production deps for image
RUN npm install --production --silent

# copy app
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
