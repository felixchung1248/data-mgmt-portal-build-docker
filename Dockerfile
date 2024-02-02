FROM dataopennesscommunity/demo-golden

WORKDIR /app
COPY project /app
RUN npm install --force

CMD ["npm", "start"]