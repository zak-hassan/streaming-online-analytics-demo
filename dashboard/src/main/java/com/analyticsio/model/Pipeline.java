package com.analyticsio.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.mongojack.ObjectId;

/**
 * Created by zhassan on 2017-04-04.
 */
public class Pipeline {

    private static final long serialVersionUID = 2105061907470199595L;
    @JsonProperty("_id")
    private String id;

    @ObjectId
    @JsonProperty("_id")
    public String getId() {
        return id;
    }

    @ObjectId
    @JsonProperty("_id")
    public void setId(String id) {
        this.id = id;
    }

    String source;
    String sink;
    STATUSCONSTANT status;

    @Override
    public String toString() {
        return "Pipeline{" +
                "source='" + source + '\'' +
                ", sink='" + sink + '\'' +
                ", status=" + status +
                '}';
    }

    public Pipeline() {
    }

    public Pipeline(String source, String sink) {
        this.source = source;
        this.sink = sink;
    }

    public void startPipeline() {
        this.status = STATUSCONSTANT.INPROGRESS;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getSink() {
        return sink;
    }

    public void setSink(String sink) {
        this.sink = sink;
    }

    public STATUSCONSTANT getStatus() {
        return status;
    }

    public void setStatus(STATUSCONSTANT status) {
        this.status = status;
    }


}
