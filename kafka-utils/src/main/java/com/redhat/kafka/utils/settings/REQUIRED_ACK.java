package com.redhat.kafka.utils.settings;

/**
 * Note: Its best to choose REPLICA_ACK if your using replication.
 * @author Zak Hassan
 */
public enum REQUIRED_ACK {

	WAIT_FOR_ACK("0"), SERVER_ACK("1"), REPLICA_ACK("-1");

	String value;

	REQUIRED_ACK(String v) {
		value = v;
	}

}
