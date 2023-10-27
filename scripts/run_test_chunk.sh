#!/bin/bash

set -e

TAGS=$1
CHUNK=${CHUNK:-$(find features -iname '*.feature' | sort | awk "(NR % $TOTAL_CHUNKS == $CHUNK_NUMBER)" | paste -d ' ' -s -)}
NEXTUI=${NEXTUI:-"false"}
ENABLE_CORE_PHASE1=${ENABLE_CORE_PHASE1:-"false"}

if [ "$NEXTUI" == "true" ]; then
  TAGS="${TAGS} and @NextUI"
fi

if [ "$ENABLE_CORE_PHASE1" == "false" ]; then
  TAGS="${TAGS} and not @CorePhase1"
elif [ "$ENABLE_CORE_PHASE1" == "true" ]; then
  TAGS="${TAGS} or @CorePhase1"
fi

./node_modules/.bin/cucumber-js --require steps --retry 5 --no-strict --exit --publish-quiet --format @cucumber/pretty-formatter  --format junit:./cucumber/results/test-results.xml --tags "${TAGS}" $CHUNK
