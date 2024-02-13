to build the service 
docker build -t node-app:1.0.2 .

to run the service
docker run -d -p 3000:3000 node-app:1.0.2

Create shared named volumes
docker run -v shardStuff:/app/stuff


generate random image
http://localhost:3000/generate

docker run -d --hostname rmq --name rabbit-server -p 8080:15672 -p 5672:5672 rabbitmq:3-management