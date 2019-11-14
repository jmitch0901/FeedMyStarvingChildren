# Feed My Starving Pixels Project

## Installation Prerequisites

> The Feed My Starving Pixels project operates on a MEAN stack. You must ensure NodeJS and MongoDB are properly installed on your computer. After each installation, ensure that you have access to the **node** and **mongod** command. If your system doesn't recognize these commands, check your system's enviroment variables!

1. Download and install [NodeJS](https://nodejs.org/en/ 'Go to NodeJS.org') (v11.15.0 or below) installed on your computer. The _Recommended for Most Users_ version will do.

2) Download and install [MongoDB](https://www.mongodb.org/downloads#production 'Go to MongoDB.com') installed on your computer.

3. After MongoDB is installed, open terminal/command prompt. Start the Mongo Daemon:

### Mac:

`sudo mongod`

### Windows:

`mongod`

## Cloning the Project

1. Clone this project on your Mac/PC:

`git clone https://github.com/jmitch0901/FeedMyStarvingChildren.git`

2. Open another terminal/command prompt window.

3) Navigate to project's main directory within terminal/command prompt.

## Install Bower and Gulp Globally:

### Mac:

`sudo npm install -g bower gulp`

### Windows:

`npm install -g bower gulp`

## Install project dependencies:

### Mac:

`sudo npm install & bower install`

### Windows:

`npm install & bower install`

## (_IMPORTANT!_) OpenSSL and Images

> This project requires SSL certificates to run. They do not have to be official.

> You can just use OpenSSL to create a quick certificate to run the project. Also, we need to ensure we have our pictures named and in the correct folder for this app to run effectively.

#### Creating the Images

> There must be **2** image files within the /img folder, **exactly 1000x1000px**.

Ensure the following 2 image files are in the /img directory:

1.  **secret-image.png**

2.  **releasable-image.png**

3.  **releasable-image-2.png**

If you are missing pictures, all you need to do is simply make a copy of original, and rename it to **secret-image.png**, **releasable-image.png**, and/or **releasable-image-2.png** .

### Initializing the Database

> Mongo needs the default entries for each pixel value before the app can run. Within the /seeds directory, there is a mongo script which will initialize the database.

1. Navigate to the project's /seeds directory.

2) Type `mongo seedPixels.js`

3.  **Be Patient.** It is inserting 1,000,000 entries and could take roughly _5-10 minutes_ to complete, depending on your system specs.

4) Once the cursor for your terminal/command prompt is released, the initialization of the database is complete.

### Running the App

> Ensure the **mongod** process is still running and in a separate terminal/command window.

1. In a new terminal/command prompt window, navigate to the project's root directory.

2) Type `gulp scripts` to build the Client Javascript code.

3. Type `node app.js`.

4) Open up your browser, and go to **http://localhost:3000**.
