#!/usr/bin/env bash

set -e

echo "Setting up files for test $1"

featureDir="features/$1"
mkdir features/$1
mv ./q-solution-import/features/$1.feature $featureDir/test.feature
mv ./q-solution-import/messages/$1* $featureDir/input-message.xml
mv ./q-solution-import/ncm/$1* $featureDir/pnc-data.xml
mv ./q-solution-import/test-steps/$1.pdf $featureDir/test-steps.pdf
cp ./features/001-sexual-offences/mock-pnc-responses.js $featureDir