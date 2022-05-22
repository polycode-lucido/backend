<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Environment variables :

`REFRESH_PRIVATE_KEY`: Must be defined. Used for refresh token encryption
`REFRESH_PUBLIC_KEY`: Must be defined. Must correspond to the key pair of the refresh token private key.
`ACCESS_PRIVATE_KEY`: Must be defined. Used for access token encryption
`ACCESS_PUBLIC_KEY`: Must be defined. Must correspond to the key pair of the access token private key.

`EMAIL_PROVIDER`: Must be defined. Either `fake` or `SES`. If set to fake, the application will not send any email, but print what it would have sent on stdout. If set to `SES` ( Amazon Simple Email Service ), you must provide `EMAIL_SES_SECRET`, `EMAIL_SES_REGION` and `EMAIL_SES_AKI`.

`RUNNER_PROVIDER`: Must be defined. Either `forkexec` or `docker`. Specifies the strategy to use for running code payloads.
`RUNNER_TIMEOUT`: Optional. Defines the timeout before killing the runner. Default to `15000` ms.
`RUNNER_DOCKER_JAVA_IMAGE`: Optional. When using the `docker` runner strategy, specifies what image to use. Defaults to `openjdk:17-jdk`
`RUNNER_DOCKER_NODE_IMAGE`: Optional. When using the `docker` runner strategy, specifies what image to use. Defaults to `openjdk:17-jdk`
`RUNNER_DOCKER_RUST_IMAGE`: Optional. When using the `docker` runner strategy, specifies what image to use. Defaults to `openjdk:17-jdk`
`RUNNER_DOCKER_PYTHON_IMAGE`: Optional. When using the `docker` runner strategy, specifies what image to use. Defaults to `openjdk:17-jdk`

`MONGO_HOST`: Optional. Mongo url to use to connect to the mongo database. Defaults to `mongodb://localhost/polycode`
`MONGO_USER`: Optional. Mongo user to use to connect to the mongo database. Defaults to `user`
`MONGO_PASSWORD`: Optional. Mongo password to use to connect to the mongo database. Defaults to `password`