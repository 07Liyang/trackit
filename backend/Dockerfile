# 使用官方 Node.js 18 轻量版镜像
FROM node:18-alpine

# 创建工作目录
WORKDIR /app

# 复制 package 定义并安装生产依赖
COPY package*.json ./
RUN npm install --production

# 复制源码并编译
COPY . .
RUN npm run build

# 暴露服务端口
EXPOSE 4000

# 启动编译后的应用
CMD ["node", "dist/index.js"]