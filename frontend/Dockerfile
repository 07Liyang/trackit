# 构建阶段
FROM node:18-alpine AS build
WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm install

# 构建项目
COPY . .
RUN npm run build

# 运行阶段
FROM nginx:alpine
# 将构建产物复制到 Nginx 默认服务目录
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
