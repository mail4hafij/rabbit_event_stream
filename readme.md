# prerequisites 
* Docker with compose (included in Docker for Windows..)  
* Node.js 8.x  
* Navigate to ./scenarios and run ``` npm install ```

The idea here is, we run a web server that will receive events and push it to rabbitMQ.
In order to mimic events, navigate to ./scenarios and run dummy_events.js with node.
The dummy events should be now added to rabbitMQ. You can login to rabbitMQ at localhost:15672 


1. (in ./local-event-stream) run the docker compose file.
``` docker-compose up ```  
2. (in ./local-event_stream) run your scenario, for example:  
``` node scenarios/dummy_events.js ```  


We can now build a microservice (let's say my_first_microservice) that can consume specific 
events from rabbitMQ and do something. In order to my_first_microservice to consume events from rabbitMQ
the container must use the same network that the rabbitMQ is running in.

1. (in ./my_first_microservice) start the service you are developing with docker-compose and attach it to the rabbit_event_stream network.  
``` docker-compose up --build ```   

or for a service that is not run via compose:  

first build it from the docker file:  
``` docker build . -t my_first_microservice_image ```  

then run it with the following mentioned paremeters:  This will attach the docker container (of my_first_microservice) to use the rabbit_event_stream network.
``` docker run --name my_first_microservice_container --network=rabbit_event_stream my_first_microservice_image ``` 

2. Add to scenarios/dummy_events.js file whatever kind of event you want to emmit so that we can test if my_first_microservice is able to 
get these dummy events from rabbitMQ.
