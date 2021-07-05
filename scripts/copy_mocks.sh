#!/usr/bin/env bash

set -e

echo "Copying files for test $1"

mv ./q-solution-import/features/$1.feature features/q-solution
mv ./q-solution-import/messages/$1* fixtures/messages/q-solution/$1.xml
mv ./q-solution-import/ncm/$1* fixtures/ncmFiles/$1.xml
cp ./fixtures/pncMocks/q-solution/001.js ./fixtures/pncMocks/q-solution/$1.js
sed -i '' "s/\"001\"/\"$1\"/g" ./fixtures/pncMocks/q-solution/$1.js