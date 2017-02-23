#!/bin/sh
VERSION="1.0.0-SNAPSHOT"
AUTHOR="Zak Hassan <zak.hassan@redhat.com>"


echo   " Building Camel Kafka Messaging Integration Server in Docker "
 docker   build  --rm -t  etl-integration-webservice  .

 echo "Pushing containers up to docker hub"
 docker tag  etl-integration-webservice docker.io/onlinestreaminganalytics/etl-integration-webservice
 docker push  docker.io/onlinestreaminganalytics/etl-integration-webservice
