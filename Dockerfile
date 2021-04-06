FROM buildkite/puppeteer:latest

WORKDIR /src

COPY ./package* /src/

RUN npm i

COPY ./features/ /src/features

CMD npm test