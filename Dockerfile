ARG BUILD_IMAGE="buildkite/puppeteer:latest"
FROM ${BUILD_IMAGE}

LABEL maintainer="CJSE"

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
COPY ./scripts/prepare-environment.sh /src/scripts/prepare-environment.sh

CMD CI=true npm test

EXPOSE 4000
