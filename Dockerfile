FROM node:alpine

LABEL version="1.0.0"
LABEL maintainer="Vladimir Lukyanov | vladimir@liikyanov.com"
LABEL description="Docker container for Astro.build"

WORKDIR /app

RUN npm install astro
EXPOSE 3000

ENTRYPOINT ["npx", "astro"]