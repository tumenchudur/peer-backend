#FROM node:18.12.1-slim # as builder

# Create app directory
#WORKDIR /usr/src/app

# Install app dependencies
#COPY package.json yarn.lock ./

#RUN yarn install --frozen-lockfile

#COPY . .

#RUN yarn build

FROM node:18.12.1-slim

ENV NODE_ENV development

USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./

RUN yarn install # --production --frozen-lockfile

COPY . .

RUN yarn build

#COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3030

CMD [ "node", "dist/server.js" ]
