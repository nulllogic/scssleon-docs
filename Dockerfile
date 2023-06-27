FROM node:18 as astro

LABEL version="1.0.0"
LABEL maintainer="Vladimir Lukyanov | vladimir@lukyanov.net"
LABEL description="Docker container for XII/Grid docs generator"

WORKDIR /app

COPY package.json .
COPY astro.config.mjs .
COPY tsconfig.json .

RUN ["mkdir", "public"]
RUN ["mkdir", "src"]

RUN ["npm", "i"]

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# production environment
#FROM nginx:latest
#COPY ./.config/nginx.conf /etc/nginx/nginx.conf
#CMD ["nginx", "-g", "daemon off;"]
