FROM node:20-alpine as builder

WORKDIR /opt/app
COPY . .

RUN npm install
RUN npm -v
RUN npm run build


FROM nginx:1.26.2-alpine
# COPY /docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /opt/app/build /usr/share/nginx/html
