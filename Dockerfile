# Используйте образ Node.js для сборки приложения
FROM node:14

# Установите рабочую директорию в контейнере
WORKDIR /app

# Скопируйте package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Установите зависимости
RUN npm install

# Скопируйте остальные файлы приложения
COPY . .

# Команда запуска приложения
CMD ["npm", "start"]
