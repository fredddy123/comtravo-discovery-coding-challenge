# comtravo-discovery

The service gets flights from discovery endpoints, merges them, removes duplicates and sends to the client.

### Project configs

Configuration management is done with the help of https://www.npmjs.com/package/dotenv package. There is file `.test.env` which includes proper application config for running automated tests.

Another config file `.env` is typically used in the local development environment.

For the application deployments, the best practice is to specify the environment variables (related to all the config properties) in your deployment system. The config bootstrapping logic here works in a way that if the certain environment variable is specified, it will be used as the config property avoiding the respective property in `.env` file.


### How to install locally

  1. run `npm install`
  2. run `cp ./.env.example ./.env`
  3. in `.env` set proper `DISCOVERY_AUTH_USERNAME` and `DISCOVERY_AUTH_PASSWORD`

### How to run locally

`npm start`

### How to run tests
  * lint checks: `npm run lint`
  * unit tests: `npm run unit-tests`
  * integration tests: `npm run integration-tests`
  * all tests: `npm test`

### How to deploy
At the moment, not implemented, but the project can be easily converted into a `docker` image and then be deployed on any of the modern deployment infrastructure services like AWS ECS, AWS Beanstalk, Kubernetes, Mesos, etc.