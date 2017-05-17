#!/bin/sh
VERSION="1.0.0-SNAPSHOT"
AUTHOR="Zak Hassan <zak.hassan@redhat.com>"


echo   " Building Order UI WebApp in Docker "
docker   build  --rm -t  order-web-ui  .
echo "Pushing containers up to docker hub "
docker tag  order-web-ui docker.io/onlinestreaminganalytics/order-web-ui
docker push  docker.io/onlinestreaminganalytics/order-web-ui
