ARG node_version=18.12-alpine3.15

FROM node:${node_version} as builder
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn

FROM node:${node_version} as base
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY --from=builder /node_modules /opt/epp-client/node_modules
COPY ./ ./

FROM base as dev
CMD [ "yarn", "start:dev" ]

FROM base as storybook
CMD [ "yarn", "storybook" ]

FROM base as prod
RUN yarn build
CMD [ "sh", "-c", "yarn build && yarn start" ]

FROM mcr.microsoft.com/playwright:focal as browser-tests
WORKDIR /opt/tests
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY playwright.config.ts playwright.config.ts
RUN yarn
CMD ["yarn", "test:browser"]
