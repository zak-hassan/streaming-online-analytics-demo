#!/bin/bash

oc delete all -l app=order-data-pipeline
 oc new-app -f OrderDataPipeline.json

