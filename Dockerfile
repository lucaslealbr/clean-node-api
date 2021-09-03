FROM node:16

WORKDIR /usr/src/clean-node-api

RUN mkdir temp

COPY . temp/

RUN cd temp/ && \
    npm install && \
    npm run build && \
    cd .. && \
    mv temp/node_modules . && \
    mv temp/dist . && \
    mv temp/package.json . && \
    rm -rf temp/
