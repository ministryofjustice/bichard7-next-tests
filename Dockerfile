ARG BUILD_IMAGE="nodejs"
FROM ${BUILD_IMAGE}

LABEL maintainer="CJSE"

COPY ./google.repo /etc/yum.repos.d/google.repo

RUN yum update -y \
  && yum install -y wget gnupg \
  && yum install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /home/pptruser 

RUN npm init -y &&  \
  npm i puppeteer \
  && groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
  && mkdir -p /home/pptruser/Downloads \
  && chown -R pptruser:pptruser /home/pptruser \
  && chown -R pptruser:pptruser ./node_modules \
  && chown -R pptruser:pptruser ./package.json \
  && chown -R pptruser:pptruser ./package-lock.json

COPY ./package* /src/

RUN yum install -y build-essential python gcc
RUN npm i

COPY ./features/ /src/features
COPY ./fixtures/ /src/fixtures
COPY ./characterisation /src/characterisation
COPY ./helpers/ /src/helpers
COPY ./steps/ /src/steps
COPY ./utils/ /src/utils
COPY ./scripts/run_test_chunk.sh /src/scripts/run_test_chunk.sh
COPY ./tsconfig.json /src

USER pptruser

CMD google-chrome-stable; CI=true npm test

EXPOSE 4000
