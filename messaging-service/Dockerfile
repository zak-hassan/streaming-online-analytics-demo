FROM openshift/base-centos7

MAINTAINER Zak Hassan zak.hassan1010@gmail.com

#ENVIRONMENT VARIABLES: MONGODB_URI, KAFKA_URI

RUN mkdir -p /app
WORKDIR /app
ADD ./target/order-processing-service-1.0-SNAPSHOT-jar-with-dependencies.jar /app
RUN chown -Rv 1001:0 /app
ENV JAVA_HOME   /usr/lib/jvm/java-1.8.0
USER 1001

EXPOSE 8181
ENTRYPOINT ["java","-jar", "order-processing-service-1.0-SNAPSHOT-jar-with-dependencies.jar"]
