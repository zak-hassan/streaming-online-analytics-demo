#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
SPARK_HOME=/opt/spark

cat /etc/passwd > /tmp/passwd
echo "$(id -u):x:$(id -u):$(id -g):dynamic uid:$SPARK_HOME:/bin/false" >> /tmp/passwd

export NSS_WRAPPER_PASSWD=/tmp/passwd
# NSS_WRAPPER_GROUP must be set for NSS_WRAPPER_PASSWD to be used
export NSS_WRAPPER_GROUP=/etc/group

export LD_PRELOAD=libnss_wrapper.so

$SPARK_HOME/bin/spark-submit  --master  $SPARK_MASTER_URL --conf spark.hadoop.fs.defaultFS=hdfs://192.168.33.40:54310 --packages org.apache.spark:spark-sql-kafka-0-10_2.11:2.1.0 pyorder-processing.py
