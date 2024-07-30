#!/bin/bash

set -e

TAGS=$1
CHUNK=${CHUNK:-$(find features -iname '*.feature' | sort | awk "(NR % $TOTAL_CHUNKS == $CHUNK_NUMBER)" | paste -d ' ' -s -)}
NEXTUI=${NEXTUI:-"false"}

if [ "${NEXTUI}x" == "truex" ]; then
  TAGS="${TAGS} and @NextUI"
else
  TAGS="${TAGS} and not @ExcludeOnLegacyUI"
fi

if [ "${PHASE2_CORE_CANARY_RATIO}x" == "1.0x" ] || [ "${PHASE2_CORE_CANARY_RATIO}x" == "1x" ]; then
  TAGS="${TAGS} and @Phase2Core"
fi

echo "Running tests using the following tags: ${TAGS}\n"

./node_modules/.bin/cucumber-js --require steps/index.js --retry 5 --no-strict --exit --publish-quiet --format @cucumber/pretty-formatter  --format junit:./cucumber/results/test-results.xml --tags "${TAGS}" $CHUNK
