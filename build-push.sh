#!/bin/bash

mvn clean install

echo "Building: Web UI"

cd web && ./make-push.sh
cd ..
echo "Building: Streaming Service"
cd py-structure-streaming && ./make-push.sh
cd ..
echo "Building: Messaging Service"
cd messaging-service && ./make-push.sh
cd ..
echo "Done!"
