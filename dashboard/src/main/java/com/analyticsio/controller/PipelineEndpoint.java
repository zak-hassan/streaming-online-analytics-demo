package com.analyticsio.controller;

import com.analyticsio.model.Pipeline;
import com.analyticsio.model.PipelineStatus;
import com.analyticsio.service.PipelineService;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

/**
 * Created by zhassan on 2017-04-04.
 */
@Path("/datapipeline")
public class PipelineEndpoint {

    PipelineService service= new PipelineService();

    @GET
    @Produces("application/json")
    public List<Pipeline> getAllPipeline(){
        return service.getAll();
    }

    @POST
    @Produces("application/json")
    public PipelineStatus savePipeline(Pipeline pipe){
        return service.savePipeline(pipe);
    }
    @DELETE
    @Produces("application/json")
    public PipelineStatus deletePipeline(String pipeId){
        return service.deletePipeline(pipeId);
    }
}
