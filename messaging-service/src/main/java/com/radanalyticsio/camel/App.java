package com.radanalyticsio.camel;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.redhat.analytics.producer.KafkaMessenger;

import org.apache.camel.main.Main;
import org.mongojack.JacksonDBCollection;

import java.util.List;
import java.util.concurrent.ExecutionException;


/**
 * Created by zhassan on 14/02/17.
 */
public final class App {
    public static void main(String[] args) throws Exception {
        Main main = new Main();
        main.bind("orderService", new OrderService());
        main.addRouteBuilder(new OrderRouteBuilder());
        main.run();
     }

    private static void mongoURITest() {
       String mongo_uri= "mongodb://localhost:27017/onlinestore";
        try{
            String env_uri=System.getenv("MONGODB_URI");
             if(env_uri !=null )
                 mongo_uri=env_uri;
        }catch(Exception ex){
            System.out.println("MONGODB_URI not set using default localhost");
        }
        System.out.println(mongo_uri);

        MongoClient client = new MongoClient(new MongoClientURI(mongo_uri));
             DB database = client.getDB( "onlinestore" );
       DBCollection c =database.getCollection("orders");
        JacksonDBCollection<Order, String> col = JacksonDBCollection.wrap(c, Order.class,
                String.class);
        List<Order> o= col.find().limit(5).toArray();
        ObjectMapper mapper= new ObjectMapper();

        for (Order order: o ) {
            try {
                System.out.println(mapper.writeValueAsString(order));
            }
            catch( JsonProcessingException  ex){

            }
            finally{

            }
        }
    }

    private static void getOrderList() {
        OrderService service= new OrderService();

        List<Order> o = service.listOrders();
        ObjectMapper mapper= new ObjectMapper();

        for (Order order: o ) {
             try {
                System.out.println(mapper.writeValueAsString(order));
            }
            catch( JsonProcessingException  ex){

            }
            finally{

            }
        }
    }


    private static void getOrderById(String id) {
        OrderService service= new OrderService();
        Order o=service.getOrder(id);
        ObjectMapper mapper= new ObjectMapper();
        OrderEventMessage evt= new OrderEventMessage(OrderEvent.ADD_ORDER, o);
        try {
            System.out.println(mapper.writeValueAsString(evt));
        }
        catch( JsonProcessingException  ex){

           }
            finally{

            }
    }


    private static void sendKafkaMessage() throws JsonProcessingException {

        KafkaMessenger messenger= new KafkaMessenger("0.0.0.0:9092");
        try {
            Order o=new Order("Kitchen Table", 45.99, 1, 1);

            ObjectMapper mapper= new ObjectMapper();
             OrderEventMessage evt= new OrderEventMessage(OrderEvent.ADD_ORDER, o);
            String strOrder=mapper.writeValueAsString(evt);
            messenger.send("topicA",strOrder).get();
        }
        catch (InterruptedException e) {
            System.out.println("Error");
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        System.out.println("DONE");

    }


}
