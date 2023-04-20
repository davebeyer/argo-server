# Argo Server



## node.js using port 80

How to allow node.js server to bind to port 80.
See [here](https://stackoverflow.com/questions/6109089/how-do-i-run-node-js-on-port-80).

```
sudo apt-get install libcap2-bin
sudo setcap cap_net_bind_service=+ep /usr/bin/node
```

