
from __future__ import print_function

import sys
import os
from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *

# To run example
# spark-submit --packages org.apache.spark:spark-sql-kafka-0-10_2.11:2.1.0 pyorder-processing.py

# New way to run it with checkpointing: 1000040000
# spark-submit --conf spark.sql.streaming.checkpointLocation=/tmp/check --packages org.apache.spark:spark-sql-kafka-0-10_2.11:2.1.0    pyorder-processing.py
# Note: You can use --conf spark.sql.streaming.checkpointLocation=/tmp/check inside of the writeStream.option('checkpointLocation','/tmp/check')


if __name__ == "__main__":

    spark = SparkSession\
        .builder\
        .appName("streamingOrders")\
        .getOrCreate()
    kafkaURI=os.environ.get('KAFKA_URI',"localhost:9092")
    kafkaTopic=os.environ.get('KAFKA_TOPIC',"topicA")

    print("KAFKA CONNECTION: "+ kafkaURI)
    # Create DataSet representing the stream of input lines from kafka
    lines = spark\
        .readStream\
        .format("kafka")\
        .option("kafka.bootstrap.servers", kafkaURI)\
        .option("subscribe", kafkaTopic)\
        .load()\
        .selectExpr("CAST(value AS STRING)")

    #df= spark.createDataFrame(lines, (value))

    #parsed= lines.selectExpr("CAST(value AS string) as json")
    df=lines.select(get_json_object(lines.value, '$.event').alias("event"),\
    get_json_object(lines.value, '$.order.id').alias("id"),\
    get_json_object(lines.value, '$.order.created').alias("created"),\
    get_json_object(lines.value, '$.order.customerId').alias("customerId"),\
    get_json_object(lines.value, '$.order.productId').alias("productId"),\
    get_json_object(lines.value, '$.order.productQuantity').alias("productQuantity"))


    # query = df\
    #     .writeStream\
    #     .format('console')\
    #     .start()
    query = df\
        .writeStream\
        .option('path','hdfs://192.168.33.40:54310/orders/sanfrancisco/warehouse')\
        .option('checkpointLocation','hdfs://192.168.33.40:54310/orders/sanfrancisco/check')\
        .format('parquet')\
        .start()

    query.awaitTermination()
    #
    # Split the lines into words
    # words = lines.select(
    #     # explode turns each item in an array into a separate row
    #     explode(
    #         split(lines.value, ' ')
    #     ).alias('word')
    # )

    # # Generate running word count
    # wordCounts = words.groupBy('word').count()

    # # Start running the query that prints the running counts to the console
