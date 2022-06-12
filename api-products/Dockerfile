FROM node:12.4.0-alpine
ENV NODE_ENV=production
ENV APP_VERSION=1.0.0-products-api

ENV DB_USERS_IP=1.0.0.0
ENV DB_USERS_USER=admin
ENV DB_USER_PASS=admin

# set working directory
WORKDIR /app
COPY . .

#RUN npm ci --only=production
RUN npm install --production --legacy-peer-deps
RUN npm audit fix

# Specify port
EXPOSE 5000

# start app
CMD ["npm", "start"]
