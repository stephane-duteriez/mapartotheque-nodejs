FROM gcr.io/google.com/cloudsdktool/google-cloud-cli:stable

WORKDIR /app

COPY profile.d/ /etc/profile.d/
COPY profile.d/.bashrc /root/.bashrc

RUN apt-get update && apt-get install -y \
    bash \
    make \
    git \
    nodejs \
    npm

COPY . ./

EXPOSE 3000
EXPOSE 8090