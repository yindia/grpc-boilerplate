# Stage 1 - the build process
FROM node:10.11.0-alpine AS base
MAINTAINER evalsocket@protonmail.com
WORKDIR /usr/src/app

# dev image contains  everything needed for testing, development and building
FROM base AS development
COPY package.json yarn.lock ./

# first set aside prod dependencies so we can copy in to the prod image
RUN yarn install --pure-lockfile --production
RUN cp -R node_modules /tmp/node_modules

# install all dependencies and add source code
RUN yarn install --pure-lockfile
COPY . .

# builder runs unit tests and linter, then builds production code 
FROM development as builder
RUN yarn build

# Stage 2 - the production environment
FROM base AS release
COPY --from=builder /tmp/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package.json ./
EXPOSE 8080
CMD ["yarn", "serve"]


