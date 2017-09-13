#!/bin/sh
VERSION="1.0.0-SNAPSHOT"
MAINTAINERS="Zak Hassan"
COMPONENT="pyspark-sql-server"


echo " "
echo "Maintainers: $MAINTAINERS"
echo " "
echo "Version: $VERSION"
echo " "
echo "Component: $COMPONENT"
echo " "
echo "Building Containers and pushing docker images to docker registry"
echo " "
docker   build  --rm -t  $COMPONENT  .

docker tag   $COMPONENT   zmhassan/$COMPONENT
docker push  docker.io/zmhassan/$COMPONENT
