#!/bin/bash

export FOO=bar

workspace_env() {
  DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
  echo $DIR
  if [[ $WORKSPACE && ${WORKSPACE-x} ]]
  then
    echo "Loading in $WORKSPACE environment"
    source ${DIR}/../workspaces/${WORKSPACE}.env
  fi
}

workspace_env

