package com.analyticsio.service;

import com.analyticsio.model.Pipeline;
import com.analyticsio.model.PipelineStatus;
import com.analyticsio.repository.MongoDBService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.DBCollection;

import org.mongojack.JacksonDBCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;

/**
 * Created by zhassan on 2017-04-04.
 */
public class PipelineService {
    private static final Logger LOGGER = LoggerFactory.getLogger(PipelineService.class);

    public List<Pipeline> getAll() {
        LOGGER.info("getAll Pipeline");

        DBCollection c = MongoDBService.connectFromEnv();
        JacksonDBCollection<Pipeline, String> col = JacksonDBCollection.wrap(c, Pipeline.class,
                String.class);
        List<Pipeline> orderList = col.find().toArray(10);
        return orderList;
    }

    public PipelineStatus savePipeline(Pipeline p){
        LOGGER.info("save Pipeline: " + p);
        //TODO: Implement persistance here
        DBCollection c = MongoDBService.connectFromEnv();
        JacksonDBCollection<Pipeline, String> coll = MongoDBService.persist(c, p);
        return new PipelineStatus(  "saved");
    }

    public PipelineStatus deletePipeline(String pipeId){
        //TODO: Implement persistance here
        LOGGER.info("pipeId: " + pipeId );
        return new PipelineStatus( "deleted");
    }

    public Pipeline getOnePipeline(String pipeId){
        LOGGER.info("getOne Pipeline: "+pipeId);

        return new Pipeline("file:///home/zhassan/Downloads/rocknroll.parquet?dataformat=parquet", "hdfs://localhost:9000/test5/");
    }

}
