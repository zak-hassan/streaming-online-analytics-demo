import json
import requests

entry={'productName': 'PySpark',
'productPrice': '22.12',
'productCategory': '1',
'productQuantity': '2'}




print(json.dumps(entry))

r = requests.post('http://localhost:8181/orderService',data=entry)

