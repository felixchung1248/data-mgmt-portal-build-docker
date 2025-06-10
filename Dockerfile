FROM dataopennesscommunity/demo-golden

RUN apt update -y && apt upgrade -y \
    && apt install -y nodejs \
	&& apt install -y npm

WORKDIR /app
COPY project /app