# base image
#FROM node:9.4
FROM node:16.14.2-alpine 

# set working directory
WORKDIR /app
COPY . .
# Bundle app source
RUN npm install
RUN npm run tw:build
RUN npm run build

# Specify port
EXPOSE 3000

# start app
CMD ["npm", "start"]
