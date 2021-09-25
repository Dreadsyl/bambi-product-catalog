FROM node:latest
 
WORKDIR /usr/src/frontend

COPY . /usr/src/frontend/
 
COPY package*.json /usr/src/frontend/

RUN npm install -g --save uuid@8.3.2

RUN npm install -g @angular/cli
 
RUN npm install

RUN npm run build

EXPOSE 4200
 
CMD ng serve --host 0.0.0.0 --port 4200