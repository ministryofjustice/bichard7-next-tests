#!/bin/bash

set -xe

if [ $WORKSPACE = "e2e-test" ]
then
  echo "Build was triggered by $TRIGGER"

  if [ $TRIGGER = "application-semaphore" ]
  then
    echo "Running all tests (old UI)"
    CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test

    echo "Running all tests (next UI)"
    CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:nextUI
  else
    echo "Running must tests (old UI)"
    CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:must

    echo "Running must tests (next UI)"
    CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:nextUI:must
  fi
elif [ $WORKSPACE = "preprod" ]
then
  echo "Running preprod tests (old UI)"
  CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:preprod

  echo "Running preprod tests (next UI)"
  CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:nextUI:preprod
else
  echo "Unknown AWS test workspace"
fi
