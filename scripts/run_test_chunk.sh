#!/bin/bash

set -e

TAGS=$1

CHUNKS=$(find features -iname '*.feature' | sort | awk "(NR % $TOTAL_CHUNKS == $CHUNK_NUMBER)" | paste -d ' ' -s -)

./node_modules/.bin/cucumber-js --require steps --retry 5 --no-strict --exit --publish-quiet --format @cucumber/pretty-formatter --tags "${TAGS}" $CHUNKS
