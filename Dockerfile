FROM node:carbon
WORKDIR /usr/src/mySQL_Tester
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
ENV RDS_HOSTNAME='aa19zvqjywe7nol.ceovs74iifmf.eu-central-1.rds.amazonaws.com'
ENV RDS_USERNAME='nandi'
ENV RDS_PASSWORD='nandi111'
ENV RDS_DB_NAME='test'
ENV RDS_PORT='3306'
CMD [ "npm", "start" ]