#!/bin/bash

set -x

echo "Build was triggered by $TRIGGER"

if [ $TRIGGER = "application-semaphore" ]
then
  CI=true RECORD=true npm run test
  CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:auditlogs
else
  CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:must
fi
