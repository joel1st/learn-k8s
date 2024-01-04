# Docker

## Build

`cd internal && docker build -t joel1st/internal-server:v1 .`
`cd api && docker build -t joel1st/api-server:v1 .`

## Example run

`docker run -p 9001:9001 joel1st/internal-server:v1`
`docker run -p 8080:8080 -e INTERNAL_API_HOST=host.docker.internal joel1st/api-server:v1`

# K8

## Minikube setup

`minikube start`

### For local images

In order for minikube to access the locally built images, we need to make it aware of them:
`minikube image load joel1st/internal-server:v1`
`minikube image load joel1st/api-server:v1`

## Apply conf

`cd base && kubectl apply -f api-deployment.yaml`
`cd base && kubectl apply -f api-service.yaml`
`cd base && kubectl apply -f internal-deployment.yaml`
`cd base && kubectl apply -f ingress.yaml`

## Accessing NodePort Service

Because an external service isn't automatically exposed on non linux environments, we need to explicitly open it:
`minikube service api-service --url`
This will provide a url we can access.

## Accessing Ingress Service

Because ingress isn't automatically enabled and exposed on non linux environments, we need to explicitly do it:
`minikube addons enable ingress && minikube tunnel`
This will provide a url we can access.
