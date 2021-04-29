#!/usr/bin/env bash

set -e

echo "Building e2e Tests Docker image on `date`"

aws ecr get-login-password --region eu-west-2 | docker login \
  --username AWS \
  --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-2.amazonaws.com

docker build -t e2etests .

docker tag e2etests:latest ${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-2.amazonaws.com/e2etests:${CODEBUILD_RESOLVED_SOURCE_VERSION}-${CODEBUILD_START_TIME}
echo "Push Docker image on `date`"

docker push ${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-2.amazonaws.com/e2etests:${CODEBUILD_RESOLVED_SOURCE_VERSION}-${CODEBUILD_START_TIME}
