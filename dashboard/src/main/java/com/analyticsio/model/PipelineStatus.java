package com.analyticsio.model;

/**
 * Created by zhassan on 2017-04-04.
 */
public class PipelineStatus {


    public PipelineStatus( String msg) {
         this.msg = msg;
    }

    String msg;

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
