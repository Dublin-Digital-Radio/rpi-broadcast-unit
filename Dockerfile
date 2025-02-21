FROM node:22-bookworm-slim

WORKDIR /home/node/app

RUN apt-get update && apt-get install -y \
    darkice

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

USER node

COPY darkice.cfg /etc/

COPY . .

EXPOSE 8080

# CMD [ "node", "app.js" ]
CMD [ "darkice" ]
