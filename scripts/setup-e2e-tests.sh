#!/bin/bash

set -e

env_check() {
  if [ -z "$WORKSPACE" ]
  then
    echo "WORKSPACE env var has not been set"
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

mkdir -p workspaces
TEST_ENV_FILE="workspaces/${WORKSPACE}.env"
rm -f $TEST_ENV_FILE

if [ "$WORKSPACE" = 'local' ]
then
  exit 0
fi

AWS_CLI_PATH="$(which aws)"
aws_credential_check
UI_HOST=$($AWS_CLI_PATH elbv2 describe-load-balancers --names cjse-${WORKSPACE}-bichard-7 --query 'LoadBalancers[0].DNSName' --output text)
USERS_HOST=$($AWS_CLI_PATH elbv2 describe-load-balancers --names cjse-${WORKSPACE}-bichard-7-user-ser --query 'LoadBalancers[0].DNSName' --output text)
PNC_HOST=$($AWS_CLI_PATH elbv2 describe-load-balancers --names cjse-${WORKSPACE}-bichard-7-pncemula --query 'LoadBalancers[0].DNSName' --output text)
BROKER_ID=$(aws mq list-brokers --query "BrokerSummaries[?BrokerName=='cjse-${WORKSPACE}-bichard-7-amq'].BrokerId" --output text)
STOMP_BROKER_ENDPOINTS=$(aws mq describe-broker --broker-id ${BROKER_ID} --query "join(',', BrokerInstances[*].Endpoints[2])" --output text)
STOMP_BROKER_URL="failover:(${STOMP_BROKER_ENDPOINTS})"
OPENWIRE_BROKER_ENDPOINTS=$(aws mq describe-broker --broker-id ${BROKER_ID} --query "join(',', BrokerInstances[*].Endpoints[0])" --output text)
OPENWIRE_BROKER_URL="failover:(${OPENWIRE_BROKER_ENDPOINTS})"
DB_HOST=$($AWS_CLI_PATH rds describe-db-clusters --region eu-west-2 --filters Name=db-cluster-id,Values=cjse-${WORKSPACE}-bichard-7-aurora-cluster --query "DBClusters[0].Endpoint" --output text)

if [ "$UI_HOST" = 'null' ] || [ "$UI_HOST" = '' ]
then
  echo "Error fetching UI Host"
  exit 1
fi

if [ "$USERS_HOST" = 'null' ] || [ "$USERS_HOST" = '' ]
then
  echo "Error fetching User Service Host"
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

rm -f $TEST_ENV_FILE

echo "export STACK_TYPE=\"next\"" >> $TEST_ENV_FILE
echo "export DB_HOST=\"${DB_HOST}\"" >> $TEST_ENV_FILE
echo "export UI_HOST=\"${UI_HOST}\""  >> $TEST_ENV_FILE
echo "export UI_PORT=\"443\""  >> $TEST_ENV_FILE
echo "export UI_SCHEME=\"https\""  >> $TEST_ENV_FILE
echo "export PNC_HOST=\"${PNC_HOST}\""  >> $TEST_ENV_FILE
echo "export USERS_HOST=\"${USERS_HOST}\""  >> $TEST_ENV_FILE
echo "export USERS_PORT=\"443\""  >> $TEST_ENV_FILE
echo "export MQ_URL=\"${STOMP_BROKER_URL}\"" >> $TEST_ENV_FILE
echo "export MQ_CONN_STR=\"${OPENWIRE_BROKER_URL}\"" >> $TEST_ENV_FILE
fetchParam "DB_PASSWORD" "/cjse-${WORKSPACE}-bichard-7/rds/db/password"
fetchParam "MQ_PASSWORD" "/cjse-${WORKSPACE}-bichard-7/mq/password"
echo "export MQ_USER=\"bichard\""  >> $TEST_ENV_FILE

echo 'Done'
