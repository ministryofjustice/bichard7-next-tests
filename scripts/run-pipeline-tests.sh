#!/bin/bash

set -xe

if [ $WORKSPACE = "e2e-test" ]
then
  echo "Build was triggered by $TRIGGER"

  if [ $TRIGGER = "application-semaphore" ]
  then
    echo "Running all tests (old UI)"
    CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test
    CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:auditlogs

    echo "Running all tests (next UI)"
    CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:nextUI
    CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:nextUI:auditlogs
  else
    echo "Running must tests (old UI)"
    CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:must
    CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:must:auditlogs

    echo "Running must tests (next UI)"
    CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:nextUI:must
    CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:nextUI:must:auditlogs
  fi

  echo "Running characterisation tests"
  npm run test:characterisation:bichard
elif [ $WORKSPACE = "preprod" ]
then
  echo "Running preprod tests (old UI)"
  CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:preprod
  CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:preprodauditlogs

  echo "Running preprod tests (next UI)"
  CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:nextUI:preprod
  CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:nextUI:preprodauditlogs
else
  echo "Unknown AWS test workspace"
fi
