FROM mhart/alpine-node:9

WORKDIR /app
COPY . .

ENV HOST 0.0.0.0
ARG API_QL_URL
ENV API_QL_URL ${API_QL_URL}

RUN yarn install --production
RUN yarn run build --production

EXPOSE 3000
