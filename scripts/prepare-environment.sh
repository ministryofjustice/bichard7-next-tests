#!/bin/bash

configure_aws_local() {
    AWS_CONFIG_FILE=~/.aws/config
    AWS_CREDENTIALS_FILE=~/.aws/credentials

    mkdir ~/.aws
    touch $AWS_CONFIG_FILE
    touch $AWS_CREDENTIALS_FILE
    chmod 600 $AWS_CONFIG_FILE
    chmod 600 $AWS_CREDENTIALS_FILE

    cat > $AWS_CREDENTIALS_FILE <<- EOM
[default]
aws_access_key_id=test
aws_secret_access_key=test
EOM

    cat > $AWS_CONFIG_FILE <<- EOM
[default]
aws_access_key_id=test
aws_secret_access_key=test
region=us-east-1
EOM
}

# Configure aws for local testing
if [ "$WORKSPACE" == "local-next" ] || [ "$WORKSPACE" == "local-baseline" ]; then
    configure_aws_local
    echo "Configured AWS for local testing."
fi

