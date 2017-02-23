package com.radanalyticsio.spark;

import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.api.java.function.Function2;
import org.apache.spark.api.java.function.PairFunction;
import org.apache.spark.streaming.Durations;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaPairDStream;
import org.apache.spark.streaming.api.java.JavaPairReceiverInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.kafka.KafkaUtils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.regex.Pattern;

import scala.Tuple2;

public class App {

    private static final Pattern SPACE = Pattern.compile(" ");

    public static void main(String[] args) throws Exception {
        // Setting up kafka
        String kafkaURL= "localhost:9092";
        String env_uri=System.getenv("KAFKA_URI");
        if(env_uri !=null )
            kafkaURL=env_uri;

        // Setting up zookeeper
        String zookeeperURL= "localhost:2181";
        String zoo_env_uri=System.getenv("ZOOKEEPER_URI");
        if(zoo_env_uri !=null )
            zookeeperURL=zoo_env_uri;

        Map<String, Integer> topicMap = new HashMap<>();
        topicMap.put("topicA", 2);
        SparkConf conf = new SparkConf().setAppName("orderPurchaseService").setMaster("local[*]");
        JavaStreamingContext streamingContext = new JavaStreamingContext(conf, Durations.seconds(10));
        JavaPairReceiverInputDStream<String, String> messages = KafkaUtils.createStream(streamingContext, zookeeperURL, "1", topicMap);
        JavaDStream<String> lines = messages.map(new Function<Tuple2<String, String>, String>() {
            @Override
            public String call(Tuple2<String, String> tuple2) {
                return tuple2._2();
            }
        });
        JavaDStream<String> words = lines.flatMap(new FlatMapFunction<String, String>() {
            @Override
            public Iterator<String> call(String x) {
                return Arrays.asList(SPACE.split(x)).iterator();
            }
        });
        JavaPairDStream<String, Integer> wordCounts = words.mapToPair(
                new PairFunction<String, String, Integer>() {
                    @Override
                    public Tuple2<String, Integer> call(String s) {
                        return new Tuple2<>(s, 1);
                    }
                }).reduceByKey(new Function2<Integer, Integer, Integer>() {
            @Override
            public Integer call(Integer i1, Integer i2) {
                return i1 + i2;
            }
        });
        wordCounts.print();
        streamingContext.start();
        streamingContext.awaitTermination();

    }
}
