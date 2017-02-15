package com.redhat.analytics.producer;

import java.util.Properties;
import java.util.concurrent.Future;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import com.redhat.kafka.utils.settings.Settings;

public class KafkaMessenger {

	private static KafkaProducer<String, String> producer;
	private final Properties properties = new Properties();

	public KafkaMessenger(String servers) {
		producer = new Settings<String, String>(servers).getProducer();
	}

	public Future<RecordMetadata> send(String topic, String msg) {
		ProducerRecord<String, String> data = new ProducerRecord<>(topic, msg);
		return producer.send(data);
	}

	public Future<RecordMetadata> sendWithCallback(String topic, String msg) {
		ProducerRecord<String, String> data = new ProducerRecord<>(topic, msg);
		return producer.send(data);//, new KafkaMessengerCallback());
	}
	
	// Looks up schema 
	 public static String lookUp(String packageName){
	   StringBuilder sb = new StringBuilder();
	  sb.append("urn:jsonschema:").append(packageName.replace('.', ':'));
	  return sb.toString();
	}

	 // 
	public static void main(String[] args) {
	 if( KafkaMessenger.lookUp("org.jboss.perspicuus.CustomerBean").equalsIgnoreCase("urn:jsonschema:org:jboss:perspicuus:CustomerBean")){
	   System.out.println("match");
	 }
	  
    }
	public void close() {
		producer.close();
	}

}
