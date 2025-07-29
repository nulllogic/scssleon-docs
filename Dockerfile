FROM alpine:latest AS alpine

LABEL version="1.0.0"
LABEL maintainer="Vladimir Lukyanov | vladimir@lukyanov.net"
LABEL description="Docker container for SCSSLeon docs generator"

WORKDIR /app

RUN apk update && apk add nodejs npm curl icu-data-full
