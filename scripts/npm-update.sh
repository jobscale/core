#!/usr/bin/env bash
set -eu

which jp || npm i -g @jobscale/jp

update() {
  for NAME in ${LIST[@]}
  do
    LATEST+=(${NAME}@latest)
  done
}

{
  rm -fr node_modules package-lock.json

  LIST=$(cat package.json | jp -u "keys(dependencies).join(' ', @)")
  LATEST=()
  update
  time npm i ${LATEST[@]}
  echo "UPDATED '${LIST[@]}'"

  LIST=$(cat package.json | jp -u "keys(devDependencies).join(' ', @)")
  LATEST=()
  update
  time npm i -D ${LATEST[@]}
  echo "UPDATED '${LIST[@]}'"
}
