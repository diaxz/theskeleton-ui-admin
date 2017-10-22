FROM nginx:1.9
ARG BUILD_DIR
COPY ${BUILD_DIR}/dist/ /usr/share/nginx/html/
