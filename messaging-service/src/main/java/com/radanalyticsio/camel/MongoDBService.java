package com.radanalyticsio.camel;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

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
        return database.getCollection("evtorders");
    }

    public static DBCollection connectFromEnv() {
        String mongo_uri= "mongodb://localhost:27017/onlinestore";
        try{
            String env_uri=System.getenv("MONGODB_URI");
            if(env_uri !=null )
                mongo_uri=env_uri;
        }catch(Exception ex){
            System.out.println("MONGODB_URI not set using default localhost");
        }
        System.out.println("Connected to: "+mongo_uri);

        MongoClient client = new MongoClient(new MongoClientURI(mongo_uri));

        DB database = client.getDB( "onlinestore" );
        return database.getCollection("evtorders");
    }

}
