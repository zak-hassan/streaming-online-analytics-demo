#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
SPARK_HOME=/opt/spark
export PY_PROGRAM="spark-sql.py" 
export HDFS_URI="et10.et.eng.bos.redhat.com:9000"
cat /etc/passwd > /tmp/passwd
echo "$(id -u):x:$(id -u):$(id -g):dynamic uid:$SPARK_HOME:/bin/false" >> /tmp/passwd
export NSS_WRAPPER_PASSWD=/tmp/passwd
# NSS_WRAPPER_GROUP must be set for NSS_WRAPPER_PASSWD to be used
export NSS_WRAPPER_GROUP=/etc/group
export LD_PRELOAD=libnss_wrapper.so
$SPARK_HOME/bin/spark-submit  --master  $SPARK_MASTER_URL --conf spark.hadoop.fs.defaultFS=hdfs://$HDFS_URI   spark-sql.py 
