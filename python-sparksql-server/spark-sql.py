from random import random
from operator import add
import os
import json
from flask import Flask
from flask import request
from pyspark.sql import SparkSession


app = Flask(__name__)


@app.route("/")
def index():
    return "Python Flask Spark SQL server running. Add the 'sqlserver' route to this URL to invoke the app."

@app.route("/sqlserver",methods=['GET', 'POST'])
def sqlserver():
    hadoopHost=os.environ.get('HADOOP_HOST',"hdfs://localhost:9000")
    hadoopPath=os.environ.get('HDFS_PATH',"/orders/boston/warehouse")
    spark = SparkSession.builder.appName("PythonPi").getOrCreate()
    orders=spark.read.load(hadoopHost + hadoopPath )
    orders.createOrReplaceTempView(dataDict.get("tempTableName"))
    values=spark.sql(dataDict.get("query"))
    data = request.data
    dataDict = json.loads(data)
    return "SQL: "+ values



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 9999))
    app.run(host='0.0.0.0', port=port)
