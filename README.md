# supplyframe-kaustubh-funde
I have developed a weather project that allows a user to view the current weather in various cities around the world. The cities have been hard-coded inside /data/cities/cities.json at the moment. The design inspiration is from Apple's MacOS weather app and displays background videos dynamically depending on the weather, allowing the user to view the forecasted weather as well. Further, the user can view the website in multiple frames. The application contains the logic to display content on various screens dynamically. 
## Clone the project locally.
On your terminal, enter the following command to clone the project:

`git clone git@github.com:fundekaustubh/supplyframe-kaustubh-funde.git`
## Install the required packages.
To download the required packages, enter the cloned directory in your terminal and run the following command:

`npm install`

## Place the .env file.
After completing the package installation process, create a new file `.env` in the main directory and enter the following values in it:

`PORT=3000`

`HOME_URL=http://localhost:3000`

## Start the backend server.
Once done storing the .env file, start the server. This can be done by executing:

`node index.js`

## To start viewing the application, go to the following URL:

`http://localhost:3000`

## For running the jest tests, go to the terminal and execute the following command:

`jest`

Now, you can start viewing the weather statistics across the world. Enjoy! :)
