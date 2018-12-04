.PHONY: build-client build-backend build-envoy-proxy 

build-client:
				docker build -t twitter-client ./client/.
				docker run --rm --name twitter-client --env grpc_backend=35.243.198.252:80 twitter-client 

build-backend: 
				docker build -t twitter-backend .
				docker run -d --name twitter-backend twitter-backend
				docker build -t front-envoy ./envoy/.
				docker run -d --name front-envoy --link  twitter-backend:twitter-backend -p 8080:8080 front-envoy
