package com.radanalyticsio.camel;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.model.ProductOrder;
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
        //CassandraService(String serverUrl, int port,  Map<String, String> properties)
        CassandraService service = new CassandraService("localhost",9042,null);
        //Order(String productName, double productPrice, int productCategory, int productQuantity)
       //Date created, String customerId, String productId, int productQuantity)



//        ProductOrder o=service.getOrder("e6a2a76a-485f-479f-83dd-58894cec214a");
//        System.out.println(o);

//        //INFO: Code Works
//        String customerId="6e6172fe-30c8-11e7-ba5f-9801a798fc8f";
//        String productId="79161a98-30e0-11e7-b4e8-9801a798fc8f";
//        int productQuantity=3;
//        ProductOrder o= service.addOrder(new ProductOrder(customerId, productId, productQuantity));
//        System.out.println("O"+o);
//        service.getOrder("886f3310-30f1-11e7-91b3-6bc80341971c");
//        service.getProductOrdered("7916b318-30e0-11e7-ac7a-9801a798fc8f");
     //   service.getCustomerWhoOrdered("6e6172fe-30c8-11e7-ba5f-9801a798fc8f");

        Main main = new Main();
        main.bind("orderService", new OrderService());
        main.addRouteBuilder(new OrderRouteBuilder());
        main.run();
     }




//
//    private static void getOrderById(String id) {
//        OrderService service= new OrderService();
//        Order o=service.getOrder(id);
//        ObjectMapper mapper= new ObjectMapper();
//        OrderEventMessage evt= new OrderEventMessage(OrderEvent.ADD_ORDER, o);
//        try {
//            System.out.println(mapper.writeValueAsString(evt));
//        }
//        catch( JsonProcessingException  ex){
//
//           }
//            finally{
//
//            }
//    }


//    private static void sendKafkaMessage() throws JsonProcessingException {
//
//        KafkaMessenger messenger= new KafkaMessenger("0.0.0.0:9092");
//        try {
//            Order o=new Order("Kitchen Table", 45.99, 1, 1);
//
//            ObjectMapper mapper= new ObjectMapper();
//             OrderEventMessage evt= new OrderEventMessage(OrderEvent.ADD_ORDER, o);
//            String strOrder=mapper.writeValueAsString(evt);
//            messenger.send("topicA",strOrder).get();
//        }
//        catch (InterruptedException e) {
//            System.out.println("Error");
//            e.printStackTrace();
//        } catch (ExecutionException e) {
//            e.printStackTrace();
//        }
//        System.out.println("DONE");
//
//    }


}
