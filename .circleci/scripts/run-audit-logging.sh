#!/bin/sh

cd ~/bichard7-next-services

# Install Nodejs version in .nvmrc
nvm install

# Install awslocal
pip3 install awscli-local

# Run Audit Logging
make run-all-e2e