package com.radanalyticsio.camel;

import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.Host;
import com.datastax.driver.core.Metadata;
import com.datastax.driver.core.Row;
import com.datastax.driver.core.Session;
import com.datastax.driver.core.utils.UUIDs;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.model.ProductOrder;

import org.joda.time.DateTime;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Created by zhassan on 2017-05-04.
 *
 * CassandraService<br>
 *
 *     For accessing data persisted in cassandra
 *
 */
public class CassandraService {
    String serverUrl;
    int port;
    Map<String,String> properties;
    private Cluster cluster;
    private Session session;

    public CassandraService(String serverUrl, int port,  Map<String, String> properties) {
        this.serverUrl = serverUrl;
        this.port = port;
        this.properties = properties;
    }

    public void addOrder(ProductOrder order) throws JsonMappingException, ClassNotFoundException {
        dbconnect(serverUrl, port);
        System.out.println("order"+order);

        //insert into product.orders (id, productId, customerId, productQuantity, created)
        // values (now(), 7916b318-30e0-11e7-ac7a-9801a798fc8f, 6e6172fe-30c8-11e7-ba5f-9801a798fc8f, '1',now() );
        getSession().execute("INSERT into product.orders (id, productId, customerId, productQuantity, created) VALUES (?, ?, ?, ?, ?)",
                    UUID.randomUUID(), UUID.fromString(order.getProductId()),
                    UUID.fromString(order.getCustomerId()),order.getProductQuantity(),
                    new Timestamp(new Date().getTime()));

        cluster.close();
    }

    public ProductOrder getOrder(String id){
        // select * from product.orders where id=886f3310-30f1-11e7-91b3-6bc80341971c
        dbconnect(serverUrl,port);
        Row row=getSession().execute("SELECT * from product.orders where id="+id).one();
        System.out.println(row.toString());
        cluster.close();
        ProductOrder o = new ProductOrder(row);
        return o;
    }

    public void getProductOrdered(String id){
        //select * from product.inventory where id=7916b318-30e0-11e7-ac7a-9801a798fc8f ;
        dbconnect(serverUrl,port);
        Row row =getSession().execute("SELECT * from product.inventory where id="+id).one();
        System.out.println(row.toString());
        cluster.close();
    }

    public void getCustomerWhoOrdered(String id){
        //select * from product.customers where id=6e6172fe-30c8-11e7-ba5f-9801a798fc8f ;
        dbconnect(serverUrl,port);
        Row row=getSession().execute("SELECT * from product.customers where id="+id).one();
        System.out.println(row.toString());
        cluster.close();
    }

    private void dbconnect(String serverUrl, int port) {
        this.cluster = Cluster.builder().addContactPoint(serverUrl).withPort(9042).build();
        final Metadata metadata = cluster.getMetadata();
        System.out.printf("Connected to cluster: %s\n", metadata.getClusterName());
        for (final Host host : metadata.getAllHosts())
        {
            System.out.printf("Datacenter: %s; Host: %s; Rack: %s\n",
                    host.getDatacenter(), host.getAddress(), host.getRack());
        }
        session = cluster.connect();
    }

    public Session getSession() {
        return session;
    }
}
