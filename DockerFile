FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
ENV PORT = 8080 \
    MONGO_URL = "mongodb+srv://bra:12345m@cluster0.hbknp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"\
   TOKEN_KEY = "mohamed"
CMD ["npm" , "start"]

