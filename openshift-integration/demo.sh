
curl  https://raw.githubusercontent.com/mattf/openshift-kafka/master/resources.yaml | oc create -f -
oc new-app apache-kafka
oc new-app -f spark-template.yaml
 
