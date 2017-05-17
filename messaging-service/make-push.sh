#!/bin/sh
VERSION="1.0.0-SNAPSHOT"
AUTHOR="Zak Hassan <zak.hassan@redhat.com>"


echo   " Building Camel Kafka Messaging Integration Server in Docker "
 docker   build  --rm -t  camel-etl-webservice  .

 echo "Pushing containers up to docker hub"
 docker tag  camel-etl-webservice docker.io/zmhassan/camel-etl-webservice
 docker push  docker.io/zmhassan/camel-etl-webservice
