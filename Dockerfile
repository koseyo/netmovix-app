# set image
FROM node:14-alpine

# working directory
WORKDIR /app

# copy file
COPY . /app

# install dependencies
RUN npm install

# build production
RUN npm run build

# specified port
EXPOSE 3000

# start node server
ENTRYPOINT npm run start
