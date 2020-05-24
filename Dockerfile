FROM node:12.16.3-alpine

RUN mkdir -p /app/backend
RUN mkdir -p /app/frontend

WORKDIR /app/backend
COPY ./backend/. /app/backend/
RUN npm install

WORKDIR /app/frontend
COPY ./frontend/. /app/frontend/
RUN npm install
RUN npm run build
RUN cp -r ./build/. /app/backend/public/

WORKDIR /app/backend

EXPOSE 4900

CMD ["npm", "start"]
