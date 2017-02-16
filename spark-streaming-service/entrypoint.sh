
BASEDIR=$(dirname "$0")
SPARK_HOME=/opt/spark
#SPARK_MASTER_URL=spark://localhost:7077

cat /etc/passwd > /tmp/passwd
echo "$(id -u):x:$(id -u):$(id -g):dynamic uid:$SPARK_HOME:/bin/false" >> /tmp/passwd

export NSS_WRAPPER_PASSWD=/tmp/passwd
# NSS_WRAPPER_GROUP must be set for NSS_WRAPPER_PASSWD to be used
export NSS_WRAPPER_GROUP=/etc/group

export LD_PRELOAD=libnss_wrapper.so

$SPARK_HOME/bin/spark-submit  --master  $SPARK_MASTER_URL --class com.radanalyticsio.spark.App $BASEDIR/target/spark-streaming-service-1.0-SNAPSHOT-jar-with-dependencies.jar
