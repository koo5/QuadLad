#!/bin/sh

docker build . -t quadlad
docker run -it -p 8080:8080 quadlad

