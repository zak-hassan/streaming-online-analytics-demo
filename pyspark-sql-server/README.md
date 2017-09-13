# PySpark SQL Server

This microservice exposes a webservice at '/sqlserver' endpoint which lets you
run queries against parquet data that resides in hdfs.


### Environment variables required:

* HDFS_URI
* HDFS_PATH

### Exposes prometheus endpoint at the following IP
http://localhost:18081/