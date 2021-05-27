#!/bin/sh

cd ~/bichard7-next-services

# Installing Nodejs version in .nvmrc
nvm install

# Install awslocal
pip3 install awscli-local

cd -