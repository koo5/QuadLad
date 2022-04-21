#!/bin/sh

HOST_PORT=8080

while getopts "p:" options; do
  case "${options}" in
    p)
      HOST_PORT=${OPTARG}
      ;;
  esac
done

docker build . -t quadlad
docker run -it -p $HOST_PORT:8080 quadlad
