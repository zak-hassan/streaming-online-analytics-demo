#!/bin/sh
VERSION="1.0.0-SNAPSHOT"
AUTHOR="Zak Hassan <zak.hassan@redhat.com>"


echo   " Building Spark Streaming Job in Docker "
 docker   build  --rm -t  spark-streaming-job  .

 echo "Pushing containers up to docker hub"
 docker tag  spark-streaming-job docker.io/onlinestreaminganalytics/spark-streaming-job
 docker push  docker.io/onlinestreaminganalytics/spark-streaming-job
