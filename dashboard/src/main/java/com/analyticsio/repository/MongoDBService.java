package com.analyticsio.repository;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

import org.mongojack.JacksonDBCollection;
import org.mongojack.WriteResult;
import com.analyticsio.model.*;

/**
 * Created by zhassan on 2017-02-15.
 */
public class MongoDBService {

    public static JacksonDBCollection<Pipeline, String> persist(DBCollection c, Pipeline p) {
        JacksonDBCollection<Pipeline, String> coll = JacksonDBCollection.wrap(c, Pipeline.class,
                String.class);
        WriteResult<Pipeline, String> result = coll.insert(p);
        return coll;
    }

    public static DBCollection connect() {
        MongoClient client = new MongoClient( "localhost" , 27017 );
         DB database = client.getDB( "datapipeline" );
        return database.getCollection("pipeline_events");
    }

    public static DBCollection connectFromEnv() {
        String mongo_uri= "mongodb://localhost:27017/datapipeline";
        try{
            String env_uri=System.getenv("MONGODB_URI");
            if(env_uri !=null )
                mongo_uri=env_uri;
        }catch(Exception ex){
            System.out.println("MONGODB_URI not set using default localhost");
        }
        System.out.println("Connected to: "+mongo_uri);
        MongoClient client = new MongoClient(new MongoClientURI(mongo_uri));
        DB database = client.getDB( "datapipeline" );
        return database.getCollection("pipeline_events");
    }

}
