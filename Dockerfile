FROM mhart/alpine-node:9

WORKDIR /app
COPY . .

RUN yarn install --production
RUN yarn run build --production

EXPOSE 3000

ENV HOST 0.0.0.0
