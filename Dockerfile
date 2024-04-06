FROM alpine
WORKDIR /usr/src/API_SGU
RUN apk add --no-cache git nodejs-current npm
RUN git clone https://github.com/alexsantos-dev/API_SGU.git .
RUN npm install
EXPOSE 3000