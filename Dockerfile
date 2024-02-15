FROM node:21
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .

RUN rm yarn.lock || true
RUN rm package-lock.json || true
RUN npm install 
RUN npm run build 

ENV HOST 0.0.0.0
EXPOSE 3000
CMD [ "node", "dist/main.js" ]