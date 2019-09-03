FROM node

MAINTAINER Anoop T P

WORKDIR /src

COPY package.json /src

RUN npm install
RUN npm install -g nodemon #hmm idk

COPY . /src

EXPOSE 3000

CMD ["npm", "start"]
