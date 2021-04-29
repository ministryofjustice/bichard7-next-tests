FROM buildkite/puppeteer:latest

WORKDIR /src

COPY ./package* /src/

RUN apt-get update
RUN apt-get install -y build-essential python gcc
RUN npm i

COPY ./features/ /src/features
COPY ./fixtures/ /src/fixtures
COPY ./helpers/ /src/helpers
COPY ./steps/ /src/steps
COPY ./utils/ /src/utils

COPY ./jest.config.js ./jest-puppeteer.config.js ./jest.setup.js /src/

CMD CI=true npm test
