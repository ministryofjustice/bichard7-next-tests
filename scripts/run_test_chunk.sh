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

if [[ "$PHASE2_CORE_CANARY_RATIO" -eq 1 ]]; then
  TAGS="${TAGS} and @Phase2Core"
fi

echo "Tags: ${TAGS}"

./node_modules/.bin/cucumber-js --require steps/index.js --retry 5 --no-strict --exit --publish-quiet --format @cucumber/pretty-formatter  --format junit:./cucumber/results/test-results.xml --tags "${TAGS}" $CHUNK
