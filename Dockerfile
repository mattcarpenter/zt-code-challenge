FROM node:12.16.3-alpine

RUN mkdir -p /app/backend
RUN mkdir -p /app/frontend

WORKDIR /app/backend
COPY ./backend/package.json ./backend/package-lock.json /app/backend/
RUN npm install

WORKDIR /app/frontend
COPY ./frontend/package.json ./frontend/package-lock.json /app/frontend/
RUN npm install

COPY ./backend/. /app/backend/

COPY ./frontend/. /app/frontend/
RUN npm run build
RUN cp -r ./build/. /app/backend/public/

WORKDIR /app/backend

EXPOSE 4900

CMD ["npm", "start"]
