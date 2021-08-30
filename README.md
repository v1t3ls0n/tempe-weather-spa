# Tempe Weather App

    Tempe is a mobile-responsive single page application for weather forecast of cities arround the globe.
    The Home screen/page shows a 5 days weather forecast starting at the current date,
    user can add cities to his saved favorite cities (saved on localStorage) and then
    get the daily weather's forecast of the each of his favorite city in the the Favorite screen/page.

### Web Development by Guy Vitelson

### UX/UI Design by May Vitelson

### This application uses React.js Node.js MongoDB Database and the OpenWeatherMap API

# Requirements:

For development, you will only need Node.js and a node global package, Npm, installed in your environement,
your own MongoDB cluster URI link and your own api key for the OpenWeatherMap API service.

## Using the app (Requirements)

$ To use the app, just browse to the live version of the application at this url address:
$ https://tempe-weather.herokuapp.com/

## Developing the app (Requirements)

$ Node.js and a node global package, Npm, installed in your environement.
$ Your own MongoDB URI link (for your MongoDB database instance which will exist online at your Atlas account)
$ Your own OpenWeatherMap API key (for the weather api service the app is built on)

# Instructions

# Step 1 (Installing requirements)

- Basically step 1 is for installing and generating whats required for running the app

  $ git clone https://github.com/v1t3ls0n/tempe-public.git
  $ cd tempe-public
  $ npm install
  $ cd client
  $ npm install

### Generate :

###### Generate API key for the OpenWeatherMap API :

$ First go and get your own api key for the OpenWeatherMap API, get if from from https://openweathermap.org/api
$ Paste your key string inside the config/default.json as the value of the 'weatherAPIkey' key-value pair.

###### Generate MongoDB cluster and get the URI Link :

$ Go to https://account.mongodb.com/account/login
$ Login to your account, or create one
$ Create new Project
$ Create a Shared Cluster with mongoDB database
$ Connect to the cluster (press connect)
$ Choose 'connect your application' option
$ Set DRIVE to Node.js and VERSION to the latest node version
$ Copy the string of the URI link (start with 'mongodb+srv://username:<password>@ .....')
$ Paste the URI link string inside the config/default.json as the value of the 'mongoURI' key-value pair.

# Step 2 (Running the app)

- Basically step 2 is for i running the app

  $ cd to the root folder
  $ npm run dev
  $ browse to localhost:8080 and you will get the running Weather app in development mode
  $ OR
  $ browse to localhost:3000 for the production mode version (only available if you made the build proccess)

# Build instructions

## First of all

$ go through Step 1 instructions step by step before making any build instruction.

## Then, cd to the root folder and run:

    $ cd client
    $ npm run build
    $ mv build ./../
    $ cd ..
    $ npm start
    $ Finally, go to localhost:3000 for getting the Weather app in production mode runnig locally

# Tips for deployment to a webserver or external reposetories

## .gitignore ()file in the root directory

### In development mode: (in root directory - we must have 'client' folder)

$ while running the app in development mode, in the .gitignore file,
you should include 'build' (folder name) and exclude or comment 'client' (folder name)

### In production mode: (in the root directory - we must have build folder)

$ while running the app in production mode (after you made the build proccess), in the .gitignore file,
you should include 'client' (folder name) and exclude or comment 'build' (folder name)
