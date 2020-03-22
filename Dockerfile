# build stage
FROM node:10 as build-stage
LABEL maintainer=993477833@qq.com
# 创建一个工资目录
WORKDIR /app
COPY . .
RUN yarn install --registry=https://registry.npm.taobao.org
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
