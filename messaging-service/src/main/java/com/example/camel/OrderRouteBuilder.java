package com.example.camel;

import org.apache.camel.model.rest.RestBindingMode;
import org.apache.camel.builder.RouteBuilder;

/**
 * Created by zhassan on 14/02/17.
 */
public class OrderRouteBuilder extends RouteBuilder {
    @Override
    public void configure() throws Exception {
        restConfiguration().component("spark-rest").apiContextPath("api-doc").port(8080)
                .bindingMode(RestBindingMode.json)
                .dataFormatProperty("prettyPrint", "true");
        rest("/order").consumes("application/json").produces("application/json")
                .get("/view/{id}").outType(Order.class)
                .to("bean:orderService?method=getOrder(${header.id})")
                .get("/list").outTypeList(Order.class)
                .to("bean:orderService?method=listOrders")
                .put("/create").type(Order.class).outType(Order.class)
                .to("bean:orderService?method=createOrder");
    }
}
