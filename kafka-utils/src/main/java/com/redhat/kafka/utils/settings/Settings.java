package com.redhat.kafka.utils.settings;

import java.util.Properties;

import org.apache.kafka.clients.producer.KafkaProducer;

public class Settings<K,V> {

	private final Properties properties = new Properties();

	public Settings(String servers) {		
		properties.put("bootstrap.servers", servers);
		properties.put("key.serializer",
				"org.apache.kafka.common.serialization.StringSerializer");
		properties.put("value.serializer",
				"org.apache.kafka.common.serialization.StringSerializer");
	}
	public KafkaProducer<K, V> getProducer(){
		 return new KafkaProducer<K,V>(properties);
		 
	}
}
