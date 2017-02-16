FROM docker.io/radanalyticsio/openshift-spark

MAINTAINER Zak Hassan zak.hassan1010@gmail.com

# REQUIRED ENVIRONMENT VARIABLES:
#  - KAFKA_URI
#  - SPARK_MASTER_URL
#  - SPARK_USER

WORKDIR /opt

ADD ./target/spark-streaming-service-1.0-SNAPSHOT-jar-with-dependencies.jar /opt
ADD ./entrypoint.sh   /opt
WORKDIR /opt
EXPOSE 4040

ENTRYPOINT ["./entrypoint.sh"]
