# fullstack demo
This repo is for MERN Stack dev.

# pre requirements

- you need to have docker installed

# how to run

to run local with docker compose
- open cmd console at root folder
- docker-compose up --build
- wait for it to finish creating all the images
- be patient, it takes a while  

the images that will be created are the following:
- xald-app : front-end react
- api-answers: back-end node-express-mongo
- my-prometheus: prometheus board for metrics
- grafana: grafana dashboard to display metrics

# All ready? - go to enjoy
## enter the front-end
open the browser and go to http://localhost:82/

## enter the back-end
open the browser and go to http://localhost:83/

## see the api swagger documentation
open the browser and go to http://localhost:83/api/docs/swagger

# test? yes sure!
api tests
- enter the folder api-answers  (cd api-answers)
- run: npm run test

front tests
- enter the folder xald-app  (cd xald-app)
- run: npm test

#
## thanks for visiting this repository
do things with love and you will always get great satisfaction :heart:
