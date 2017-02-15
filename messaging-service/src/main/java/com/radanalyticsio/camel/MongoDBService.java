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
        try{
            String uri=System.getenv("MONGODB_URI");
            if(uri !=null )
                mongoURL=uri;
        }catch(Exception ex){
            System.out.println("MONGODB_URI not set using default localhost");
        }
        System.out.println(mongoURL);
        MongoClient client = new MongoClient( mongoURL , 27017 );
        DB database = client.getDB( "onlinestore" );
        return database.getCollection("orders");
    }

}
