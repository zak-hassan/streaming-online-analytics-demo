package com.redhat.analytics.producer;

import org.apache.kafka.clients.producer.Callback;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class KafkaMessengerCallback implements Callback {
	private static final Logger LOGGER = LoggerFactory
			.getLogger(KafkaMessengerCallback.class);

	@Override
	public void onCompletion(RecordMetadata rMeta, Exception ex) {

		if (ex != null) {
			LOGGER.error("ERROR: Message failed");
		} else {
			LOGGER.info("Message delivered successfully");
		}
	}

}
