FROM dataopennesscommunity/demo-golden

WORKDIR /app
COPY project /app
RUN cd project && npm install --force