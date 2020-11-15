# Adding events to RabbitMQ 
The idea here is, we run a web server that will receive events and push those events to rabbitMQ.
In order to mimic sending events, navigate to ./scenarios and run dummy_events.js with node.
The dummy events should now be added to rabbitMQ. 

Techonology stack: Docker-compose, Node.js 8.x, RabbitMQ host.

Endpoints:
  - RabitMQ endpoint, localhost:15672
  - Diagnostic endpoint, localhost:1337/status 
  - The endpoint to post an event, localhost:1337/publish
  
How to run locally:
1. Run the docker compose file.
``` docker-compose up ```  
2. Run the dummy scenarios.  
``` node scenarios/dummy_events.js ```  

You should now see the dummy events are now published by the web server to the RabbitMQ.

# Notifictaion service
The next step is to build a microservice (let's say notification_service, checkout the repo https://github.com/mail4hafij/notification_service) that should consume some events from rabbitMQ. In order for notification_service to consume events from rabbitMQ the container must use the same network that the rabbitMQ is running in.

  1. Given the rabbit_event_stream is already running, deploy (notification_service) similarly with docker-compose. This will also attach the container to the rabbit_event_stream network. 

  ``` docker-compose up --build ```   

or if you don't want to use docker-compose then:  

  1. First build the notification_service from the docker file (Dockerfile.local): 

  ``` docker build -f Dockerfile.local . -t notification_service_src ```  

  2. Then run it with the following mentioned paremeters. This will attach the container to the rabbit_event_stream network:
  
  ``` docker run --name any_name_container --network=rabbit_event_stream notification_service_src ``` 

Debug:
  1. Open notification_service solution in Visual Studio (in order to start fresh, delete the .vs folder and make sure the docker host is running when opening the solution. Then set docker-compose as startup project which will spin up the notification_service_src container). Hit the run button.
  2. Go to the rabbit_event_stream/scenarios and run ``` node dummy_events.js ```
