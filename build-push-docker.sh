#!/bin/bash

mvn clean install

echo "Building: Web UI"

./web/make-push.sh
echo "Building: Streaming Service"

./spark-streaming-service/make-push.sh
echo "Building: Messaging Service"
./messaging-service/make-push.sh
echo "Done!"
