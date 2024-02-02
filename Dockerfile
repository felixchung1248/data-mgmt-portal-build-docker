FROM dataopennesscommunity/demo-golden

WORKDIR /app
COPY project /app
RUN tree