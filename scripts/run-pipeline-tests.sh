#!/bin/bash

set -x

if [ $WORKSPACE = "e2e-test" ]
then
  echo "Build was triggered by $TRIGGER"
  if [ $TRIGGER = "application-semaphore" ]
  then
    echo "Running all tests"
    CI=true RECORD=true npm run test
    CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:auditlogs
  else
    echo "Running must tests"
    CI=true RECORD=true npm run test:must
    CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:must:auditlogs
  fi
elif [ $WORKSPACE = "preprod" ]
then
  echo "Running preprod tests"
  CI=true RECORD=true npm run test:preprod
  CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:preprodauditlogs
else
  echo "Unknown AWS test workspace"
fi

