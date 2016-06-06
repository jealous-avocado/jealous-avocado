HEROKU DEPLOYMENT

Starting a new deployment:

Updating existing deployment:

1. Create a new branch called `deploy`.
2. Add alchemy.config.js to stage.
3. In db/config.js, comment out local db client and connection, 
   uncomment Heroku Postgres db client and connection.
4. In PublicPage.js, change references to localhost:300 to your Herkou app's address