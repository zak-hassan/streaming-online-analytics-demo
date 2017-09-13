FROM docker.io/radanalyticsio/openshift-spark
MAINTAINER Zak Hassan zak.hassan1010@gmail.com
ENV SPARK_MASTER_URL "local[*]"
ADD ./spark-sql.py   /opt
ADD ./entrypoint.sh   /opt
USER root

RUN yum install python-pip -y 
RUN pip install flask
USER 1001
WORKDIR /opt
EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]