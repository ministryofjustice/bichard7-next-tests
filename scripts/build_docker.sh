#!/usr/bin/env bash

set -e

echo "Building e2e Tests Docker image on `date`"

aws ecr get-login-password --region eu-west-2 | docker login \
  --username AWS \
  --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-2.amazonaws.com

# Get our latest staged puppeteer image
IMAGE_HASH=$(aws ecr describe-images \
  --repository-name puppeteer \
  --query 'to_string(sort_by(imageDetails,& imagePushedAt)[-1].imageDigest)'
)

IMAGE_HASH=$(echo $IMAGE_HASH | tr -d '"')
DOCKER_IMAGE_HASH="${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-2.amazonaws.com/puppeteer@${IMAGE_HASH}"

docker build --build-arg "BUILD_IMAGE=${DOCKER_IMAGE_HASH}" -t e2etests .

docker tag e2etests:latest ${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-2.amazonaws.com/e2etests:${CODEBUILD_RESOLVED_SOURCE_VERSION}-${CODEBUILD_START_TIME}
echo "Push Docker image on `date`"

docker push ${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-2.amazonaws.com/e2etests:${CODEBUILD_RESOLVED_SOURCE_VERSION}-${CODEBUILD_START_TIME}
