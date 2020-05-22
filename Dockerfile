FROM node:12.16.3-alpine AS base

RUN mkdir -p /app/backend
RUN mkdir -p /app/frontend

WORKDIR /app/backend
COPY ./backend/package.json /app/backend/
COPY ./backend/package-lock.json /app/backend/
RUN npm install

WORKDIR /app/frontend
COPY ./frontend/package.json /app/frontend/
COPY ./frontend/package-lock.json /app/frontend/
RUN npm install

FROM base AS release

COPY ./frontend/. /app/frontend/
RUN npm run build

WORKDIR /app/backend/
COPY ./backend/. /app/backend/
COPY ./frontend/build/. /app/backend/public/

CMD ["npm", "start"]
