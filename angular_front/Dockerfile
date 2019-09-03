#FROM nginx

#MAINTAINER Anoop T P

## Remove default nginx website

#RUN rm -rf /usr/share/nginx/html/*

#VOLUME /Users/anooptp/nodeprojects/mean-course/angular_front/dist:/usr/share/nginx/html
#VOLUME ./dist:/usr/share/nginx/html
#COPY ./dist /usr/share/nginx/html

#CMD ["chown", "nginx:nginx", "./*"]

#WORKDIR /usr/share/nginx/html

#COPY ./dist /usr/share/nginx/html

#EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]

# Stage 0, "build-stage", based on Node.js, to build and compile Angular
FROM node as build-stage
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx-custom.conf /etc/nginx/conf.d/default.conf
