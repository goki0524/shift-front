# shift-front


## Precondition

・You must have docker installed.
https://docs.docker.com/get-docker/

・You must have git installed.
https://git-scm.com/downloads


## Build Setup

### development for local

``` bash

$ node -v
v12.13.1

$ yarn 

$ yarn dev

```

### development for docker

``` bash
# build docker image
$ docker build -t shift-front-dev -f docker/node/dev.Dockerfile . 

# serve with hot reload at localhost:3000
$ docker run -d -p 3000:3000 shift-front-dev

```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
