package com.radanalyticsio.camel;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.model.ProductOrder;
 import com.redhat.analytics.producer.KafkaMessenger;


import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * Created by zhassan on 14/02/17.
 */
public class OrderService {


    public ProductOrder getOrder(String id) {

        CassandraService service = new CassandraService(getCassandraHost(),9042,null);
        return service.getOrder(id);

    }
    public List<ProductOrder> listOrders() {

        String customerId="6e6172fe-30c8-11e7-ba5f-9801a798fc8f";
        String productId="79161a98-30e0-11e7-b4e8-9801a798fc8f";
        int productQuantity=3;

        return Arrays.asList(new ProductOrder(customerId, productId, productQuantity));
    }

    /*
    public List<Order> listOrders() {

        DBCollection c = MongoDBService.connectFromEnv();
        JacksonDBCollection<Order, String> col = JacksonDBCollection.wrap(c, Order.class,
                String.class);
        List<Order> orderList= col.find().limit(5).toArray();
        return orderList;

     }
*/

    public ProductOrder createOrder(ProductOrder order) {
        //TODO: Place holder need to add mongodb persistence here..
        CassandraService service = new CassandraService(getCassandraHost(),9042,null);

        try {
            ProductOrder o =service.addOrder(order);
            ObjectMapper mapper= new ObjectMapper();
            OrderEventMessage evt= new OrderEventMessage(OrderEvent.ADD_ORDER, o);
            String strOrder=mapper.writeValueAsString(evt);
            sendMsgFromEnv(getTopic(),strOrder);
        }  catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return order;
    }

    private static String getCassandraHost() {
        String url= "localhost";
        try {
            String env_uri = System.getenv("CASSANDRA_HOST");
            if (env_uri != null)
                url = env_uri;
        }catch (Exception ex){
            System.out.println("Errror: cassandra env not set");
        }

        return url;
    }
    private static String getTopic() {
        String url= "topicA";
        try {
            String env_uri = System.getenv("TOPIC");
            if (env_uri != null)
                url = env_uri;
        }catch (Exception ex){
            System.out.println("Errror: topic env not set");
        }

        return url;
    }

    private void sendMsgFromEnv(String topic, String msg) {
        String kafkaURL= "localhost:9092";
        try{
            String env_uri=System.getenv("KAFKA_URI");
            if(env_uri !=null )
                kafkaURL=env_uri;
        }catch(Exception ex){
            System.out.println("KAFKA_URI not set using default localhost");
        }
        System.out.println("Sending kafka message to:" + kafkaURL);
        KafkaMessenger messenger= new KafkaMessenger(kafkaURL);
        try {
            messenger.send(topic , msg).get();
    } catch (InterruptedException e) {
        e.printStackTrace();
    } catch (ExecutionException e) {
        e.printStackTrace();
    }

}
}
