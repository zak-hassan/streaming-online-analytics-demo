package com.radanalyticsio.camel;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;

import org.mongojack.JacksonDBCollection;
import org.mongojack.WriteResult;

/**
 * Created by zhassan on 2017-02-15.
 */
public class MongoDBService {


    public static JacksonDBCollection<Order, String> persist(DBCollection c, Order order) {
        JacksonDBCollection<Order, String> coll = JacksonDBCollection.wrap(c, Order.class,
                String.class);
        WriteResult<Order, String> result = coll.insert(order);
        return coll;
    }

    public static DBCollection connect() {
        MongoClient client = new MongoClient( "localhost" , 27017 );
        DB database = client.getDB( "onlinestore" );
        return database.getCollection("orders");
    }

    public static DBCollection connectFromEnv() {
        String mongoURL= "localhost";
        int port=27017;
        try{
            String env_uri=System.getenv("MONGODB_HOST");
          //  int env_port=System.getenv("MONGODB_PORT");
            if(env_uri !=null )
                mongoURL=env_uri;
//            if(env_port !=null)
//                port=env_port;

        }catch(Exception ex){
            System.out.println("MONGODB_URI not set using default localhost");
        }
        System.out.println(mongoURL);
        MongoClient client = new MongoClient( mongoURL , port );
        DB database = client.getDB( "onlinestore" );
        return database.getCollection("orders");
    }

}
