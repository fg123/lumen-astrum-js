FROM mhart/alpine-node:10

WORKDIR /app
COPY . .

RUN apk add --no-cache bash git
RUN npm install --production

CMD ["npm", "run", "prod"]
