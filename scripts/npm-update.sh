#!/usr/bin/env bash
set -eu

LIST=$(grep '\^' package.json | awk -F'"' '{print $2}')
LATEST=()

update() {
  for NAME in ${LIST[@]}
  do
    LATEST+=(${NAME}@latest)
  done
}

{
  update
  time npm i ${LATEST[@]}
  echo "UPDATED"
  echo ${LIST[@]}
}
