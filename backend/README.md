# User guide #
Navigate to Backend folder in terminal and type in `npm install` - this should load all the dependencies for you.

After that - to use the app - you must have `MongoDB Atlas` username, password and cluster collection name. Then visit the `.env-examplefile` to see how to set the Database connection up.

Then - again navigate to Backend folder in terminal - type in `nodemon server.js` which is going to start the server on http://localhost:3000

Keep your eyes on for a `Cross Origin Resource Sharing (CORS)` change in the `App.js`. While this app was in development, I've had CORS issues, because the Frontend was running on 'http://127.0.0.1:8081' and the Backend on 'http://localhost:3000' which triggered the CORS block, so I've manually add these paths - and different version of them - to the `App.js` at line 32 as an `allowedOrigin`. Please edit this according to your requirements (look out for the port you running the Frontend server, then add
it to the `allowedOrigin` in `App.js` on line 32).

# About the app #
The app has been created for the OpenClassrooms 6th Project on the Web Developer path,
which is called: `Build a Secure API for a Review App`. The app called `So Pekocko`.
Its functionality covers:

# SignUp/LogIn #
## Requirement: MongoDB Atlas database userID, password and collection name within .env file in Backend root folder - see .env-examplefile ##
### SignUp ###
- Signing up with email and password
    -- When signing up, user can only sign up '1x' (once) with the same email, making each email unique in the database
    -- After the user submitting the email address and password, the email address is being masked with `maskdata`
        (visible only the first 3 and the last 2 characters of the input: 123xxx@xxxxxom)
        and also the password is being hashed with `bycrypt` and this is being saved into the database -
        keeping the user data safe and encrypted.

### LogIn ###
- Logging in with the registered email and matching password
    -- When logging in, a `jwt` secret random token is being used for a secure user-authentication, so every time the user logs in,
        the masked email and the hashed password is being decoded and verified.

### User logged in ###
- Every user has the same `privilege`: every one of them are `Users`, who can leave Feedbacks (Like or Dislike)
    on each others posts, until a User posting a sauce (`Add sauce` option), then this User (and only this) gets the Admin (Owner of the post) privilege
    for the sauce(s) he/she posted. It means, that he/she can `Delete` or `Modify` the sauce he/she created.

- `Add sauce` option: each user able to add a sauce (use POST method) to the database, which is going to be listed (with GET method) on the `All sauces` page
    -- When a user adds a sauce to the database, he/she fulfills a Sauce model (main array) which contains required objects, - such as `userId`, `name`,
        `manufacturer`,`description`, `mainPepper`, `imageUrl`, `heat`, `usersLiked`, `usersDisliked` - and non required objects - such as `likes`, `dislikes`.
        --- Required objects are for identifying a sauce and its owner - the User who created it. Also contains the userId of a user who liked or disliked it.
        --- Non required objects are the number of likes and/or dislikes left on a sauce.

- `Likes and Dislikes`: every user able to leave feedback on each sauces. Each sauce can take 1 type of feedback from a user: either Like or Dislike.
    -- If a user wants to change the feedback he/she left, he/she must remove the existing feedback and add the opposite.

- `Modifying the post`: only the owner of the sauce (created by) able to modify all the details of the post - such as name, heat, image.

- `Deleting the post`: only the owner of the sauce (created by) able to delete the post



