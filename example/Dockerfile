FROM mhart/alpine-node:latest

EXPOSE 3010

RUN mkdir -p /var/apps/pomelo-graceful-shutdown-example
WORKDIR /var/apps/pomelo-graceful-shutdown-example
ADD package.json /var/apps/pomelo-graceful-shutdown-example/package.json
RUN npm install
COPY . /var/apps/pomelo-graceful-shutdown-example

ENV POMELO_REDIS_HOST 127.0.0.1
ENV POMELO_REDIS_PORT 6379
ENV PORT=3150
ENV CLIENT_PORT=3010
ENV FRONTEND=true
ENV SERVER_TYPE=connector
ENV SERVICE_DOMAIN=localhost

CMD ./start.sh
