FROM node
WORKDIR /app
ENV MONGO_URL=mongodb+srv://bra:12345m@cluster0.hbknp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority \
    PORT=8080 \
    TOKEN_KEY=mohamed
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm" , "start"]
