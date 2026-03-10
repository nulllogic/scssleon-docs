FROM alpine:latest AS alpine

LABEL version="1.0.0"
LABEL maintainer="Vladimir Lukyanov | vladimir@lukyanov.net"
LABEL description="Docker container for SCSSLeon docs generator"

WORKDIR /app

RUN apk update && apk add nodejs npm curl icu-data-full

ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8
ENV LANGUAGE=en_US.UTF-8

HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost:4321/ || exit 1