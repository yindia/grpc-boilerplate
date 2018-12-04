# Microservice Mesh


## Component
  - twitter Backend
  - comman NPM package for binddings all comman library like grpc,mysql,logging
  - Exotel client for testing backend 
  - Dockerfile & K8s (Both work independently on platform google/aws/datacenter) 
  - bitbucket-pipelines.yml (yml file for bitbucet pipeline for CI-CD)
  - .Circle CI (yml config for service mess deplyment of microservices)
  - cloudbuild (build file for REST deployment of Google builder)
  - envoy config (service discovvery)
  - sonar.properties (sonar configration for sonar scan)

## prerequest
 - nodejs (8+)
 - npm 
 - docker
 - kubectl 
 
# twitter 

## Get started 
```sh
$ sudo make
```

### How to test functions :
Test getUser Function
```sh
$ docker run -it --rm  twitter-client node client get 1 
```
Test createUser Function
```sh
$ docker run -it --rm  twitter-client node client insert Yuvraj evalsocket hello@123 
```
Test followUser Function
```sh
$ docker run -it --rm  twitter-client node client follow 1 2 
```
Test homeTimeline Function
```sh
$ docker run -it --rm  twitter-client node client home 1  
```
Test userTimeline Function
```sh
$ docker run -it --rm  twitter-client node client timeline 1  
```

Test createTweet Function
```sh
$ docker run -it --rm twitter-client node client tweet 1  hello
```

Configration  :  Change mysql configration (local)

How to start without docker :
```sh
$ #Run backend 
$ npm install (Install npm dependencies)
$ npm run build (Build typescript)
$ npm run serve (start grpc server port 8080)
$ npm run dev (start grpc server on dev mode port 8080)
$ #Run client 
$ cd client
$ export grpc_backend=35.243.198.252:80
$ npm install
$ node cleint get 1

```
How to start with docker :
```sh
$ # Run Docker container
$ docker build -t twitter-backend .
$ docker run -d --name twitter-backend twitter-backend
$ # Run envoy proxy 
$ cd envoy
$ docker build -t front-envoy .
$ docker run -d --name front-envoy --link  twitter-backend:twitter-backend -p 8080:8080 front-envoy
$ # Run exotel client 
$ cd client
$ docker build -t twitter-client .
$ docker run -d --name twitter-client  --env grpc_backend=35.243.198.252:80(APP ENGINE) twitter-client (If you are running backend locally the use 127.0.0.1:8080)
$ docker run -d --name twitter-client  --env grpc_backend=35.221.233.116:80(Kuberneates envoy proxy) twitter-client (If you are running backend locally the use 127.0.0.1:8080)
```

How to start with kubctl : (optional)
```sh
$ # Run Docker container
$ docker build -t twitter-backend .
$ docker run -it --name twitter-backend -p 50051:8080 twitter-backend
$ Replace Variable name manully in k8s/k8s/cloudbuild/deployment.yml
$ kubectl  apply -f k8s/k8s/cloudbuild/deployment.yml
```


To-DO :
   - Logger is created in comman lib (connected to google stackdriver with winston) just need to write log in the backend  (error handling is not done)
   - Test cases are their just for testing demo( someone has to write test cases for all function)
   - Improve proto file by using proto third party like(struct and datetime)
   - For actual service mesh we have to divide backend into two microservice (tweet & user) and decide the envoy config 
   - I think work needed on mysql queries (didn't test for billion entries) but for now i rely on infra 
  
  