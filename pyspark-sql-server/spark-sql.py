from random import random
from operator import add
import os
import json
from flask import Flask
from flask import request
from pyspark.sql import SparkSession
from flask_prometheus import monitor


app = Flask(__name__)

@app.route("/")
def index():
    return "Python Flask Spark SQL server running. Add the 'sqlserver' route to this URL to invoke the app."

@app.route("/sqlserver",methods=['GET', 'POST'])
def sqlserver():
    # Setting up hadoop env
    hadoopHost=os.environ.get('HDFS_URI',"hdfs://et10.et.eng.bos.redhat.com:9000")
    hadoopPath=os.environ.get('HDFS_PATH',"/orders/newyork/warehouse")
    # Getting query passed in ex:  {'query': 'select * from orders'}
    data = request.data   
    dataDict = json.loads(data)
    print("QUERY: "+dataDict.get("query"))
    spark = SparkSession.builder.appName("PythonPi").getOrCreate()
    orders=spark.read.load(hadoopHost + hadoopPath )
    orders.createOrReplaceTempView("orders")
    values=spark.sql(dataDict.get("query"))
    table={}
    table["table"]=json.loads(json.dumps(values.toJSON().collect()).replace('\\"',"\"").replace("}\"","}").replace("\"{","{"))
    return json.dumps(table)

 

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 9999))
    monitor(app, port=18081)
    app.run(host='0.0.0.0', port=port)
