#!/bin/bash

set -ex

env_check() {
  if [ -z "$WORKSPACE" ]
  then
    echo "WORKSPACE env var has not been set"
    exit 1
  fi
  if [ -z "$STACK_TYPE" ]
  then
    echo "STACK_TYPE env var has not been set"
    exit 1
  fi
}

env_check

aws_credential_check () {
  if [ -z "$AWS_ACCESS_KEY_ID" ]
  then
     echo "AWS_ACCESS_KEY_ID env var has not been set"
     exit 1
  fi

  if [ -z "$AWS_SECRET_ACCESS_KEY" ]
  then
    echo "AWS_SECRET_ACCESS_KEY env var has not been set"
    exit 1
  fi
}

function fetchParam() {
  ENVNAME=$1
  SSM_PATH=$2

  VALUE="$($AWS_CLI_PATH ssm get-parameter --name $SSM_PATH --with-decryption --query "Parameter.Value" --output "text")"
  echo "export $ENVNAME=\"$VALUE\"" >> $TEST_ENV_FILE
}

mkdir -p e2e-tests/workspaces
TEST_ENV_FILE="workspaces/${WORKSPACE}.env"
rm -f $TEST_ENV_FILE

if [ "$WORKSPACE" = 'local' ]
then
  exit 0
fi

AWS_CLI_PATH="$(which aws)"
PNC_ELB_NAME=$(echo "cjse-${WORKSPACE}-bichard-7-pncemulator" | cut -c1-32)
aws_credential_check
WAS_IP=$($AWS_CLI_PATH elbv2 describe-load-balancers --names cjse-${WORKSPACE}-bichard-7 --query 'LoadBalancers[0].DNSName' --output text)
PNC_HOST=$($AWS_CLI_PATH elbv2 describe-load-balancers --names ${PNC_ELB_NAME} --query 'LoadBalancers[0].DNSName' --output text)

if [ "$STACK_TYPE" = 'next' ]
then
  BROKER_ID=$(aws mq list-brokers --query "BrokerSummaries[?BrokerName=='cjse-${WORKSPACE}-bichard-7-amq'].BrokerId" --output text)
  BROKER_ENDPOINTS=$(aws mq describe-broker --broker-id ${BROKER_ID} --query "join(',', BrokerInstances[*].Endpoints[2])" --output text)
  BROKER_URL="failover:(${BROKER_ENDPOINTS})"
  DB_HOST=$($AWS_CLI_PATH rds describe-db-clusters --region eu-west-2 --filters Name=db-cluster-id,Values=cjse-${WORKSPACE}-bichard-7-aurora-cluster --query "DBClusters[0].Endpoint" --output text)
else
  MQ_IP=$($AWS_CLI_PATH ec2 describe-instances --region eu-west-2 --filters Name=tag:Name,Values=cjse-${WORKSPACE}-bichard-7-mq  Name=instance-state-name,Values=running --query 'Reservations[0].Instances[0].PrivateIpAddress' --output text)
  DB_HOST=$($AWS_CLI_PATH ec2 describe-instances --region eu-west-2 --filters Name=tag:Name,Values=cjse-${WORKSPACE}-bichard-7-db2  Name=instance-state-name,Values=running --query 'Reservations[0].Instances[0].PrivateIpAddress' --output text)
fi

if [ "$WAS_IP" = 'null' ] || [ "$WAS_IP" = '' ]
then
  echo "Error fetching WAS IP"
  exit 1
fi

if [ "$MQ_IP" = 'null' ]
then
  echo "Error fetching MQ IP"
  exit 1
fi

if [ "$DB_HOST" = 'null' ]
then
  echo "Error fetching DB host"
  exit 1
fi

mkdir -p workspaces
rm -f $TEST_ENV_FILE

echo "export STACK_TYPE=\"${STACK_TYPE}\"" > $TEST_ENV_FILE
echo "export DB_HOST=\"${DB_HOST}\"" >> $TEST_ENV_FILE
echo "export UI_HOST=\"${WAS_IP}\""  >> $TEST_ENV_FILE
echo "export UI_PORT=\"443\""  >> $TEST_ENV_FILE
echo "export UI_SCHEME=\"https\""  >> $TEST_ENV_FILE
echo "export PNC_HOST=\"${PNC_HOST}\""  >> $TEST_ENV_FILE

if [ "$STACK_TYPE" = 'next' ]
then
  echo "export MQ_URL=\"${BROKER_URL}\"" >> $TEST_ENV_FILE
  fetchParam "DB_PASSWORD" "/cjse-${WORKSPACE}-bichard-7/rds/db/password"
  fetchParam "MQ_PASSWORD" "/cjse-${WORKSPACE}-bichard-7/mq/password"
  echo "export MQ_USER=\"bichard\""  >> $TEST_ENV_FILE
else
  echo "export MQ_URL=\"${MQ_IP}\"" >> $TEST_ENV_FILE
  fetchParam "DB_PASSWORD" "/cjse-${WORKSPACE}-bichard-7/ec2/db2/password"
  fetchParam "MQ_PASSWORD" "/cjse-${WORKSPACE}-bichard-7/ec2/mq/password"
fi

echo 'Done'

