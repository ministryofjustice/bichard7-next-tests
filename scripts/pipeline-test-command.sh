#!/bin/bash

set -x

env

TRIGGER=$(aws codepipeline list-pipeline-executions --pipeline-name cjse-bichard7-path-to-live-deploy-pipeline | jq -r '.[] | .[] | select(.pipelineExecutionId=="2eae8bba-cd4e-4fbe-a306-334ac2691609") | .trigger.triggerDetail')
echo $TRIGGER

if [ $TRIGGER = "application-source" ]
then
  echo "test"
else
  echo "test:must"
fi

exit 0