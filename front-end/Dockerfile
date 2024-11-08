FROM node:16-alpine
# Устанавливаем рабочую директорию
WORKDIR /app
# Копируем package.json и package-lock.json
COPY package*.json ./
# Устанавливаем зависимости
RUN npm install
# Копируем остальные файлы
COPY . .
# Собираем приложение
RUN npm run build
# Устанавливаем сервер для обслуживания статических файлов
RUN npm install -g serve
# Указываем команду для запуска сервера
CMD ["serve", "-s", "build"]