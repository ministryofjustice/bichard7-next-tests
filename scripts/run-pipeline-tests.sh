#!/bin/bash

set -x

TRIGGER=$(aws codepipeline list-pipeline-executions --pipeline-name cjse-bichard7-path-to-live-deploy-pipeline --query "pipelineExecutionSummaries[?pipelineExecutionId=='${CODEPIPELINE_EXECUTION_ID}'] .trigger.triggerDetail" --output text)
echo "Build was triggered by $TRIGGER"

if [ $TRIGGER = "application-semaphore" ]
  CI=true RECORD=true npm run test
  CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:auditlogs
then
else
  CI=true RECORD=true MESSAGE_ENTRY_POINT=s3 npm run test:must
fi
