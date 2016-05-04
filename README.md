#Feed My Starving Pixels Project
![alt text](https://www.fmsc.org/image/09-template-images/fmsc-logo.png "Feed My Starving Children") 

##Installation Prerequisites

![alt text](http://appv2.asustor.com/uploadIcons/0020_13878_1388394236_mongodb.png "MongoDB") 
![alt text](https://worldvectorlogo.com/logos/nodejs-icon.svg "NodeJS") 

>   The Feed My Starving Pixels project operates on a MEAN stack. You must ensure NodeJS and 
> MongoDB are properly installed on your computer. After each installation, ensure that 
> you have access to the **node** and **mongod** command. If your system doesn't recognize these commands, check your system's 
> enviroment variables!

1. Download and install [NodeJS](https://nodejs.org/en/ "Go to NodeJS.org") installed on your computer. The *Recommended for Most Users* version will do.

2. Download and install [MongoDB](https://www.mongodb.org/downloads#production "Go to MongoDB.com") installed on your computer. 

3. After MongoDB is installed, open terminal/command prompt. Start the Mongo Daemon:

    ###Mac: 
      `sudo mongod`
    
    ###Windows: 
      `mongod`

##Cloning the Project

1. Clone this project on your Mac/PC:

    `git clone https://github.com/jmitch0901/FeedMyStarvingChildren.git`

2. Open another terminal/command prompt window.

3. Navigate to project's main directory within terminal/command prompt.

4. Install Bower:

    ###Mac:
    `sudo npm install -g bower`
        
    ###Windows:
    `npm install -g bower`

5. Install project dependencies:

    ###Mac: 
      `sudo npm install & bower install`
    
    ###Windows: 
      `npm install & bower install`

##(*IMPORTANT!*) OpenSSL and Images
>   This project requires SSL certificates to run. They do not have to be official.
> You can just use OpenSSL to create a quick certificate to run the project. Also,
> we need to ensure we have our pictures named and in the correct folder for this 
> app to run effectively. 

####SSL with OpenSSL

1. Create a directory in the project's root directory name *'certs'*.
 
2. Follow the directions on [OpenSSL's](https://www.openssl.org/) website for creating a **certificate** and **private key**. Create the following files **WITH** exact naming:
    - **certificate.pem**
    - **private.key**
3. Copy these files into the *'certs'* folder you created earlier.

####Creating the Images
>   There must be at least **2** images withing the /img folder.
> (**Not the one in the public folder, but in the root directory**).

Ensure the following 2 image files are in the /img directory: 
 1. **secret-image.png**

 2. **releasable-image.png**

If you are missing picture 2, all you need to do is simply make a copy of image 1, and name it to **releasable-image.png**.

###Initializing the Database
>   Mongo needs the default entries for each pixel value before the app can run. Within the /seeds directory,
> there is a mongo script which will initialize the database.

1. Navigate to the project's /seeds directory.

2. Type `mongo seedPixels.js`

3. **Be Patient.** It is inserting 1,000,000 entries and could take roughly *10 minutes* to complete.

4. Once the cursor for your terminal/command prompt is released, the initialization of the database is complete.

###Running the App
>   Ensure the **mongod** process is still running and in a separate terminal/command window.

1. In a new terminal/command prompt window, navigate to the project's root directory.

2. Type `node app.js`.

3. Open up your browser, and go to **http://localhost:8080** (You can also go to **https://localhost:3000** for https traffic).
    
    
