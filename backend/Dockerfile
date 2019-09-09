FROM node:alpine
WORKDIR /app
COPY package*.json /app/
RUN apk update && apk upgrade \
	&& apk --no-cache add --virtual builds-deps build-base python \
	&& npm install -g node-gyp node-pre-gyp && npm ci --only=production\
	&& npm rebuild bcrypt --build-from-source
ADD ./dist /app/src
ADD .env /app
EXPOSE 1234
CMD node /app/src/app.js
