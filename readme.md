# Express Auth Boilerplate

* create a node app
* .gitignore
* install and set up express
* stubbed out GET auth/login, GET auth/signup, POST auth/login, POST auth/signup
* configured auth controller
* set up ejs, express-ejs-layouts, verified that it's working
* set up the signup and login forms, tested post routes

## How to set up:
1. Fork & Clone

2. Install dependencies ---> npm i

3. Creae a `config.json` with the following code:
{
  "development": {
    "username": "postgres",
    "password": "Tdadon96",
    "database": "db name",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "password",
    "database": "db name_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username":" ",
    "password":" ",
    "database": "db name_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

4. Create a database --> sequelize db:create dbName

5. Migrate the `user` model to your database ---> sequelize db:migrate

6. Add `SESSION_SECRET` and `PORT` environment variables in a `.env` file

7. Run `nodemon` to start up app