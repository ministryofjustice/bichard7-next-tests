# Configure aws for local testing
if [ "$WORKSPACE" == "local-next" ] || [ "$WORKSPACE" == "local-baseline" ]; then
    aws configure set aws_access_key_id test
    aws configure set aws_secret_access_key test
    aws configure set default.region us-east-1
    echo "Configured AWS for local testing."
fi
