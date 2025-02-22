FROM node:22-bookworm-slim

WORKDIR /home/node/app

# The Pi OS already has killall but here we need to install it from psmisc
RUN apt-get update && apt-get install -y \
    darkice psmisc

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

COPY . .

EXPOSE 8080

CMD [ "node", "server/main.js" ]

