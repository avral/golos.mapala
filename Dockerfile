FROM mhart/alpine-node:9.11.1

ADD package.json /app/
WORKDIR /app

RUN yarn install --production

# COPY . .
ADD . /app

RUN yarn run build --production

ENV HOST 0.0.0.0
ARG API_QL_URL
ENV API_QL_URL ${API_QL_URL}

EXPOSE 3000
