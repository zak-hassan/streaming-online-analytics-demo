package com.example.camel;

import org.apache.camel.main.Main;

/**
 * Created by zhassan on 14/02/17.
 */
public final class App {
    public static void main(String[] args) throws Exception {

        Main main = new Main();
        main.bind("orderService", new OrderService());
        main.addRouteBuilder(new OrderRouteBuilder());
        main.run();
    }
}
