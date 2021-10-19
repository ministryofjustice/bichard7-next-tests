#!/usr/bin/env bash

aws ecr get-login-password | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.eu-west-2.amazonaws.com

IMAGE_HASH=$(aws ecr describe-images --repository-name e2etests --query "to_string(sort_by(imageDetails,& imagePushedAt)[-1].imageDigest)" --output text | head -1)
docker pull ${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-2.amazonaws.com/e2etests@${IMAGE_HASH}
docker tag ${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-2.amazonaws.com/e2etests@${IMAGE_HASH} e2etests
