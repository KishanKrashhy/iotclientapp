FROM node:carbon

RUN mkdir /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

RUN npm install --silent

COPY src /usr/src/app/src/
COPY public /usr/src/app/public/

RUN cd src && ls -a

EXPOSE 4000

CMD ["npm", "start"]