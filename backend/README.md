### User guide ###
Navigate to Backend folder in terminal and type in `npm install` - this should load all the dependencies for you.

After that - to use the app - you must have `MongoDB Atlas` username and password. Then visit the `.env-examplefile` to see how to set the Database connection up.

Then - again navigate to Backend folder in terminal - type in `nodemon server.js` which is going to start the server on http://localhost:3000

Keep your eyes on for a `Cross Origin Resource Sharing (CORS)` change in the `App.js`. While this app was in development, I've had CORS issues, because the Frontend was running on 'http://127.0.0.1:8081' and the Backend on 'http://localhost:3000' which triggered the CORS block, so I've manually add these paths - and different version of them - to the `App.js` at line 32 as an `allowedOrigin`. Please edit this according to your requirements.

## About the app ##
The app has been created for the OpenClassrooms 6th Project on the Web Developer path,
which is called: `Build a Secure API for a Review App`. The app called `So Pekocko`.
Its functionality covers:

# SignUp/LogIn #
## Requirement: MongoDB Atlas database userID and password within .env file in Backend root folder - see .env-examplefile ##
### SignUp ###
- Signing up with email and password
    -- When signing up, user can only sign up '1x' (once) with the same email, making each email unique in the database
    -- After the user submitting the email address and password, the email address is being masked with `maskdata`
        (visible only the first 3 and the last 2 characters of the input: 123xxx@xxxxxom)
        and also the password is being hashed with `bycrypt` and this is being saved into the database -
        keeping with this the user data safe and encrypted.
### LogIn ###
- Logging in with the registered email and matching password
    -- When logging in, a `jwt` token being used for user authentication, so every time the user logs in,
        the masked email and the hashed password is being decoded and verified.
        ##### not finished #####



