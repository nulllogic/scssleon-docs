FROM node:alpine as astro-watch

LABEL version="1.0.0"
LABEL maintainer="Vladimir Lukyanov | vladimir@liikyanov.com"
LABEL description="Docker container for Astro.build"

WORKDIR /app

COPY package.json .
COPY astro.config.mjs .
COPY tsconfig.json .
COPY src/ .

RUN ["mkdir", "public"]

RUN ["npm", "i"]

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]