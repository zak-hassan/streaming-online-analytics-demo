
"""
{"price":"0.92","type":"fruit","name":"zucchini"}
INSERT INTO product.inventory( id, pname, pprice, ptype )
VALUES(now(), )
"""

from cassandra.cluster import Cluster
import uuid

print("Connecting!")
cluster = Cluster()
session = cluster.connect()



import json
#http://maps.googleapis.com/maps/api/geocode/json?address=V8V2C4,+CA&sensor=false

input= open('fruits_vegetables.json','r')
count=0
for line in input:
    json_data=json.loads(line)
    #print(line)
    #print(uuid.uuid1(),json_data['name'],json_data['price'],json_data['type'])
    session.execute("""
    INSERT INTO product.inventory( id, pname, pprice, ptype )
    VALUES (%s, %s, %s, %s)
    """,(uuid.uuid1(),json_data['name'],json_data['price'],json_data['type']));


session.set_keyspace('product')
rows = session.execute("select * from inventory")

for r in rows:
    print( r.id, r.pname, r.pprice, r.ptype )

print("Done!")
