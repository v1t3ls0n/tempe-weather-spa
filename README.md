## Tempe Weather App 
Tempe is a mobile-responsive single page application for weather forecast of cities arround the globe.
The Home screen/page shows a 5 days weather forecast starting at the current date,
user can add cities to his saved favorite cities (saved on localStorage) and then 
get the daily weather's forecast of the each of his favorite city in the the Favorite screen/page.

#### Web Development by Guy Vitelson | UX/UI Design by May Vitelson 
#### Built with React.js , Node.js with MongoDB Database and the OpenWeatherMap API 
#### URL link for running and deployed instance of the application (initial loading is a bit slow): 
#### https://tempe-weather.herokuapp.com/



## Install
    $ git clone https://github.com/v1t3ls0n/tempe-public.git
    $ cd tempe-public
    $ npm install 
    $ cd client
    $ npm install
    $ cd ..
    $ npm run dev
    $ go to localhost:8080 for getting the running Weather app in development mode


## Running the project
    $ npm run dev
    $ go to localhost:8080 for getting the running Weather app in development mode


## Simple build for production
    $ in the root directory
    $ edit server.js file
    $ uncomment the code under the titile "for production version (build)"
    $ cd client
    $ npm run build
    $ mv build ./../
    $ npm start
    $ go to localhost:300 for getting the running Weather app in production mode (from build)
    
    
---
## Requirements

For development, you will only need Node.js and a node global package, Npm, installed in your environement.
### 
### Node
- #### Node installation on Windows
 Just go on [official Node.js website](https://nodejs.org/) and download the installer.
 Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).
- #### Node installation on Ubuntu
  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0
