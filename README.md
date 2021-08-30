# Tempe Weather App

#### Web Development by Guy Vitelson | UX/UI Design by May Vitelson

#### built with React.js Node.js MongoDB Database and the OpenWeatherMap API

## About

Tempe is a mobile-responsive single page application for weather forecast of cities arround the globe.
The Home screen/page shows a 5 days weather forecast starting at the current date,
user can add cities to his saved favorite cities (saved on localStorage) and then
get the daily weather's forecast of the each of his favorite city in the the Favorite screen/page.
in order to use the app, just browse to the live version of the application at this url address:
https://tempe-weather.herokuapp.com/

# Requirements:

For development, you need Node.js and NPM (as a node global package resource) installed in your environement
and also you will need to pass through the proccess of generating your own keys (mongoD URI, OpenWeatherMap API key)
and then edit the ./config/default.json file and fill its key value pairs with the keys you generated.

# Instructions

First you must go through Install instructions and then move to the Generate instructions and only after that you can go to run/build instructions

## Install :

            $ git clone https://github.com/v1t3ls0n/tempe-public.git
            $ cd tempe-public
            $ npm install
            $ cd client
            $ npm install

## Generate :

### OpenWeatherMap API key

                $ First go and get your own api key for the OpenWeatherMap API, get if from from https://openweathermap.org/api
                $ Paste your key string inside the config/default.json as the value of the 'weatherAPIkey' key-value pair.

### MongoDB URI Link :

                $ Go to https://account.mongodb.com/account/login
                $ Login to your account, or create one
                $ Create new Project
                $ Create a Shared Cluster with mongoDB database
                $ Connect to the cluster (press connect)
                $ Choose 'connect your application' option
                $ Set DRIVE to Node.js and VERSION to the latest node version
                $ Copy the string of the URI link (start with 'mongodb+srv://username:<password>@ .....')
                $ Paste the URI link string inside the config/default.json as the value of the 'mongoURI' key-value pair.

## Run :

              $ in the command line, cd to the root folder
              $ npm run dev
              $ browse to localhost:8080 and you will get the running Weather app in development mode
              $ OR
              $ browse to localhost:3000 for the production mode version (only available if you made the build proccess)

## Build :

            $ go through Step 1 instructions step by step before making any build instruction.
            $ cd to the root folder
            $ cd client
            $ npm run build
            $ mv build ./../
            $ cd ..
            $ npm start
            $ browse to localhost:3000

# Tips

## .gitignore file in the root directory tips:

#### In development mode: (in root directory - we must have 'client' folder)

        while running the app in development mode, in the .gitignore file,
        you should include 'build' (folder name) and exclude or comment 'client' (folder name)

#### In production mode: (in the root directory - we must have build folder)

        while running the app in production mode (after you made the build proccess), in the .gitignore file,
        you should include 'client' (folder name) and exclude or comment 'build' (folder name)
