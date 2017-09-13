FROM docker.io/radanalyticsio/openshift-spark
MAINTAINER Zak Hassan zak.hassan1010@gmail.com
ADD ./spark-sql.py   /opt
ADD ./entrypoint.sh   /opt
WORKDIR /opt
EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]