package com.radanalyticsio.spark;

import com.radanalyticsio.camel.OrderEvent;
import com.radanalyticsio.camel.OrderEventMessage;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.function.Function2;
import org.apache.spark.storage.StorageLevel;
import org.apache.spark.streaming.Duration;
import org.apache.spark.streaming.Time;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.function.FlatMapFunction;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.api.java.function.Function2;
import org.apache.spark.api.java.function.PairFunction;
import org.apache.spark.api.java.function.VoidFunction;
import org.apache.spark.rdd.RDD;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.RowFactory;
import org.apache.spark.streaming.Durations;
import org.apache.spark.streaming.Time;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaPairDStream;
import org.apache.spark.streaming.api.java.JavaPairReceiverInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.kafka.KafkaUtils;
import org.codehaus.jackson.map.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import jdk.nashorn.internal.parser.JSONParser;
import scala.Tuple2;

public class App {

    private static final Pattern SPACE = Pattern.compile(" ");

 /*
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        OrderEventMessage orderEvt= mapper.readValue(new File("/Users/zhassan/git/streaming-online-analytics-demo/spark-streaming-service/src/main/resources/orderEvent.json"), OrderEventMessage.class);
        System.out.println("Customer: "+orderEvt.getOrder().getCustomerId()+" ordered "+orderEvt.getOrder().getProductQuantity()+
        " items of "+orderEvt.getOrder().getProductId());
    }
*/
    public static void main(String[] args) throws Exception {
        // Setting up kafka
        Map<String, Integer> topicMap = new HashMap<>();
        topicMap.put("topicA", 2);
        SparkConf conf = new SparkConf().setAppName("orderPurchaseService").setMaster("local[*]");
        JavaStreamingContext streamingContext = new JavaStreamingContext(conf, Durations.seconds(10));
        JavaPairReceiverInputDStream<String, String> messages = KafkaUtils.createStream(streamingContext, getZookeeperURI(), "1", topicMap);
        JavaDStream<OrderEventMessage> events = messages.map(new Function<Tuple2<String, String>, OrderEventMessage>() {
            @Override
            public OrderEventMessage call(Tuple2<String, String> tuple2) {

                OrderEventMessage orderEvt=null;
                try {
                    ObjectMapper mapper = new ObjectMapper();
                      orderEvt = mapper.readValue(tuple2._2(), OrderEventMessage.class);
                    System.out.println(" Customer: " + orderEvt.getOrder().getCustomerId() +
                            " ordered " + orderEvt.getOrder().getProductQuantity() +
                            " items of " + orderEvt.getOrder().getProductId());
                }catch(IOException ex){
                    System.out.println(" Error parsing OrderEvent: " + ex );
                }finally{
                    System.out.println(" OrderEvent:" + tuple2._2() );
                }
                    return orderEvt;
            }
        });
        System.out.println( "Stats: Recieved "+   events.count()+" orders");
        events.print();
        events.foreachRDD(new Function2<JavaRDD<OrderEventMessage>,Time, Void>(){

            @Override
            public Void call(JavaRDD<OrderEventMessage> orderEventMessageJavaRDD, Time time) throws Exception {
                orderEventMessageJavaRDD.collect();
                System.out.println("Stats: Recieved "+ orderEventMessageJavaRDD.count()+ "orders ");
                return null;
            }
        });

//        events.dstream().foreachRDD( new VoidFunction<JavaRDD<OrderEventMessage>>(){
//
//            @Override
//            public void call(JavaRDD<OrderEventMessage> evtRdd) throws Exception {
////                JavaRDD<Row> rowRDD = evtRdd.map(new Function<OrderEventMessage, Row>(){
////
////                    @Override
////                    public Row call(OrderEventMessage o) throws Exception {
////                        Row row =
////                        return row;
////                    }
////                });
//
//
//            }
//        });
        //TODO: Add sparkSQL to find the most expensive order

//        JavaDStream<String> words = lines.flatMap(new FlatMapFunction<String, String>() {
//            @Override
//            public Iterator<String> call(String x) {
//                return Arrays.asList(SPACE.split(x)).iterator();
//            }
//        });
//        JavaPairDStream<String, Integer> wordCounts = words.mapToPair(
//                new PairFunction<String, String, Integer>() {
//                    @Override
//                    public Tuple2<String, Integer> call(String s) {
//                        try {
//
//                        }catch(IOException ex){
//                            System.out.println("Unable to parse json");
//                        }finally{
//                            System.out.println("Smoke: "+s);
//                        }
//                            //TODO: Convert {"event":"ADD_ORDER","order":{"id":"b58a0ca3-5644-4f3f-9c89-c5f934577abb","created":null,"customerId":"6db0b23e-30c8-11e7-95e1-9801a798fc8f","productId":"79161a98-30e0-11e7-b4e8-9801a798fc8f","productQuantity":61}}
//                        //      to json and get productQuantity
//                        //  1. Convert input string into orderEvent JSON
//                        //  2. Look up customer
//                        //  2. Look up product
//                        //  3.
//
//                        return new Tuple2<>(s, 1);
//                    }
//                }).reduceByKey(new Function2<Integer, Integer, Integer>() {
//            @Override
//            public Integer call(Integer i1, Integer i2) {
//
//                return i1 + i2;
//            }
//        });
//    System.out.println("PRINTING: "+ wordCounts.toString());
//        wordCounts.print();
        streamingContext.start();
        streamingContext.awaitTermination();

    }

    private static String getKafkaURI() {
        String kafkaURL= "localhost:9092";
        try {
            String env_uri=System.getenv("KAFKA_URI");
        if(env_uri !=null )
            kafkaURL=env_uri;
        }catch (Exception ex){
            System.out.println("Errror kafka url not set");
        }
        return kafkaURL;
    }
    private static String getZookeeperURI() {
        String url= "localhost:2181";
        try {
            String env_uri = System.getenv("ZOOKEEPER_URI");
            if (env_uri != null)
                url = env_uri;
        }catch (Exception ex){
            System.out.println("Errror: zookeeper env not set");
        }

        return url;
    }


}
