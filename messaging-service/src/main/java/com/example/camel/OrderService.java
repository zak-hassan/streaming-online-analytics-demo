package com.example.camel;


import java.util.Collection;
import java.util.Map;
import java.util.TreeMap;

/**
 * Created by zhassan on 14/02/17.
 */
public class OrderService {
    private final Map<String, Order> Orders = new TreeMap<String, Order>();

    public OrderService() {
        Orders.put("123", new Order("Kitchen Table", 45.99, 1, 1));
        Orders.put("124", new Order("BookShelf", 34.99, 2, 1));
        Orders.put("225", new Order("Coffee Table", 9.99, 3, 1));
        Orders.put("135", new Order("Office Chair", 20.99, 3, 1));
    }

    public Order getOrder(String id) {
        return Orders.get(id);
    }

    public Collection<Order> listOrders() {
        return Orders.values();
    }

    public Order createOrder(Order Order) {
        //TODO: Place holder need to add mongodb persistence here..
        return new Order("Kitchen Table", 45.99, 1, 1);
    }
}
