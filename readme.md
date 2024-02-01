# feathers-tasks API

> Tasks app

## About

This project uses [Feathers](http://feathersjs.com). An open source framework for building APIs and real-time applications.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/fthrs
    npm install
    ```

3. Start your app

    ```
    npm run compile # Compile TypeScript source
    npm run migrate # Run migrations to set up the database
    npm start
    ```

4. Visit Swagger page http://localhost:[PORT]/docs in browser

   ```
   In order to use tasks API you need to authenticate as admin user
   admin user credentials: 
    email: admin@example.com
    password: 12345
    strategy: local
   
   you can also authenticate as regular user
    regular user credentials:
    email: user@example.com
    password: 12345
    stragety: local
   
   !!!IMPORTANT!!! simple user doesn't have access to Tasks API endpoints

    ```

## Testing

Run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

This app comes with a powerful command line interface for Feathers. Here are a few things it can do:

```
$ npx feathers help                           # Show all commands
$ npx feathers generate service               # Generate a new Service
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
