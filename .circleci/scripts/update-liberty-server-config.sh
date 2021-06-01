#!/bin/sh

if [ "$MESSAGE_ENTRY_POINT" != "s3" ]; then
    echo "Not needed! Liberty server configuration needs updating only if MESSAGE_ENTRY_POINT is set to \"s3\"."
    exit 0
fi

# Install xmlstarlet
sudo apt-get update && \
    sudo apt-get install xmlstarlet -y

# Update Liberty server config to disable subscribing to GENERAL_EVENT_QUEUE
cd ~/bichard7-next/scripts/liberty && \
    xmlstarlet ed -d '//jmsActivationSpec[contains(@id,"JMS/GeneralEventActivationSpec")]' server.xml > temp-server.xml && \
    mv temp-server.xml server.xml && \
    cd -
