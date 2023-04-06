FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env /app/.env
EXPOSE 8080   
CMD ["npm" , "start"]

