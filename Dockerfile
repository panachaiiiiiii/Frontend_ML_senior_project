# Stage 1: Build stage
FROM node:20-alpine AS build

# กำหนด working directory
WORKDIR /app

# คัดลอกไฟล์ package และ yarn.lock เพื่อทำ caching layer
COPY package.json yarn.lock ./

# ติดตั้ง dependencies
RUN yarn install --frozen-lockfile

# คัดลอกโค้ดทั้งหมด
COPY . .

# Build โปรเจกต์ (จะได้โฟลเดอร์ dist หรือ build)
RUN yarn build

# Stage 2: Production stage (ใช้ Nginx เพื่อ serve static files)
FROM nginx:stable-alpine

# คัดลอกไฟล์ที่ build เสร็จแล้วจาก Stage 1 มายัง Nginx
# หมายเหตุ: React รุ่นใหม่ๆ มัก build ลงโฟลเดอร์ 'dist' (ถ้าเป็น Vite) หรือ 'build' (ถ้าเป็น CRA)
COPY --from=build /app/dist /usr/share/nginx/html

# คัดลอกไฟล์ config ของ Nginx (ถ้ามี)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]