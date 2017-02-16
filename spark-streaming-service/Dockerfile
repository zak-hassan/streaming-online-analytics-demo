FROM docker.io/java:8-jdk-alpine

MAINTAINER Zak Hassan zak.hassan1010@gmail.com

# ENVIRONMENT VARIABLES: KAFKA_URI

RUN mkdir -p /app
WORKDIR /app
ADD ./target/spark-streaming-service-1.0-SNAPSHOT-jar-with-dependencies.jar /app
EXPOSE 8181
ENTRYPOINT ["java","-jar", "spark-streaming-service-1.0-SNAPSHOT-jar-with-dependencies.jar"]
