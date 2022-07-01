#!/usr/bin/env bash
set -eu

# which jp || npm i -g @jobscale/jp
which jq || sudo apt update && sudo apt install -y jq

update() {
  for NAME in ${LIST[@]}
  do
    LATEST+=(${NAME}@latest)
  done
}

{
  rm -fr node_modules package-lock.json

  # LIST=$(cat package.json | jp -u "keys(dependencies).join(' ', @)")
  LIST=$(cat package.json | jq .dependencies | jq 'keys' | jq --raw-output 'join(" ")')
  LATEST=()
  update
  time npm i ${LATEST[@]}
  echo "UPDATED '${LIST[@]}'"

  # LIST=$(cat package.json | jp -u "keys(devDependencies).join(' ', @)")
  LIST=$(cat package.json | jq .devDependencies | jq 'keys' | jq --raw-output 'join(" ")')
  LATEST=()
  update
  time npm i -D ${LATEST[@]}
  echo "UPDATED '${LIST[@]}'"
}
