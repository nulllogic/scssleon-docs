FROM node:alpine as build

LABEL version="1.0.0"
LABEL maintainer="Vladimir Lukyanov | vladimir@liikyanov.com"
LABEL description="Docker container for Astro.build"

WORKDIR /app

COPY . .

RUN ["npm", "i"]

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]