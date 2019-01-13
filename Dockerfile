FROM node:10-slim

LABEL maintainer="xanthous-tech"

ADD . /opt/server
WORKDIR /opt/server
RUN yarn install

CMD ["yarn", "start"]
