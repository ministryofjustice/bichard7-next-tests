#!/bin/bash

set -e

TAGS=$1
CHUNK=${CHUNK:-$(find features -iname '*.feature' | sort | awk "(NR % $TOTAL_CHUNKS == $CHUNK_NUMBER)" | paste -d ' ' -s -)}
NEXTUI=${NEXTUI:-"false"}

if [ "$NEXTUI" == "true" ]; then
  TAGS="${TAGS} and @NextUI"
else
  TAGS="${TAGS} and not @ExcludeOnLegacyUI"
fi

./node_modules/.bin/cucumber-js --require steps/index.js --retry 5 --no-strict --exit --publish-quiet --format @cucumber/pretty-formatter  --format junit:./cucumber/results/test-results.xml --tags "${TAGS}" $CHUNK
