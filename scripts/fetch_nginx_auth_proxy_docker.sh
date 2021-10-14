#!/usr/bin/env bash

set -e

echo "Fetching Nginx Auth Proxy Docker image on `date`"

REGION=eu-west-2
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
IMAGE_HASH=$(aws ecr describe-images --repository-name nginx-auth-proxy --query "to_string(sort_by(imageDetails,& imagePushedAt)[-1].imageDigest)" --output text | head -1)

aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

docker pull ${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-2.amazonaws.com/nginx-auth-proxy@${IMAGE_HASH}
docker tag ${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-2.amazonaws.com/nginx-auth-proxy@${IMAGE_HASH} nginx-auth-proxy