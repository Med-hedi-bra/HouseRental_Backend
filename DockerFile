FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
COPY .env /app/.env
CMD ["npm" , "start"]

