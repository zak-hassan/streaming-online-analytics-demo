# Contributing to Streaming Online Analytics demo

This project is open source and you can contribute. Here is a high-level
overview of the folders structure for this project.


## Folder Structure

### client-simulator:

    python test client for making requests to backend to trigger add_order event .

### datasets:

    Helper scripts to generate dataset

### kafka-utils:

    Kafka utility library for sending and recieving messages

### messaging-service:

    Camel webservice used to integrate with kafka to deliver new orders from the front end.

### openshift-integration:

    Collection of templates and scripts to deploy datapipeline application to openshift.

### py-structure-streaming:

    Python script to recieve order events from kafka and persist into hadoop file system in parquet file format.

### web:

    Web application that is used to be the front end application for order fullfillment system.


### Scripts:

To build all container images run the following script

```bash

./build-push-docker.sh

```
