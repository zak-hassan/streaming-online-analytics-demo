package com.radanalytics.structured.streaming;

import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.streaming.ProcessingTime;
import org.apache.spark.sql.streaming.StreamingQuery;
import org.apache.spark.sql.streaming.StreamingQueryException;

import java.util.Arrays;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) throws StreamingQueryException {
        // 1.  Read json file stream
        /*
                // Read JSON continuously from S3
                logsDF = spark.readStream.json("s3://logs")

                // Transform with DataFrame API and save
                logsDF.select("user", "url", "date")
                      .writeStream.parquet("s3://out")
                      .start()
        */
        // 2. select which fields you would like to keep and store inside of parquet
        if (args.length < 3) {
            System.err.println("Usage: JavaStructuredKafkaWordCount <bootstrap-servers> " +
                    "<subscribe-type> <topics>");
            System.exit(1);
        }

        String bootstrapServers = args[0];
        String subscribeType = args[1];
        String topics = args[2];

        SparkSession spark = SparkSession
                .builder()
                .appName("JavaStructuredKafkaWordCount")
                .getOrCreate();

        // Create DataSet representing the stream of input lines from kafka
        Dataset<String> lines = spark
                .readStream()
                .format("kafka")
                .option("kafka.bootstrap.servers", bootstrapServers)
                .option(subscribeType, topics)
                .load()
                .selectExpr("CAST(value AS STRING)")
                .as(Encoders.STRING());
/*
Data Stored as JSON
JSON is another common format for data that is written to Kafka. In this case, we can use the built-in from_json function along with the expected schema to convert a binary value into a Spark SQL struct.

# value schema: { "a": 1, "b": "string" }
schema = StructType().add("a", IntegerType()).add("b", StringType())
df.select( \
  col("key").cast("string"),
  from_json(col("value").cast("string"), schema))

* */

        // Generate running word count
        Dataset<Row> wordCounts = lines.flatMap(
                (FlatMapFunction<String, String>) x -> Arrays.asList(x.split(" ")).iterator(),
                Encoders.STRING()).groupBy("value").count();

        // Start running the query that prints the running counts to the console
        StreamingQuery query = wordCounts.writeStream()
                .outputMode("complete")
                .format("console")
                .start();

        // TODO: Use parquet fault-tolerant storage instead of console output.
//        StreamingQuery q = wordCounts.writeStream()
//                .format("parquet")
//                .option("path","/mnt/sample/data")
        //          .partitionBy("productId")
//                .option("checkpointLocation","/mnt/sample/check")
//                .start();



        query.awaitTermination();

        System.out.println( "Done!" );
    }
}
