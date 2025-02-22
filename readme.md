# lumen-websockets

[Lumen](https://github.com/laravel/lumen) with WS integrated using:

- [Laravel Echo Server](https://github.com/tlaverdure/laravel-echo-server) - for handling WS connections
- [Redis (Predis)](https://github.com/predis/predis) as a queue manager for transferring data between Lumen and NodeJS instance
- [laravel-echo](https://github.com/laravel/echo) + [socket.io-client](https://github.com/socketio/socket.io-client) packages

## Usage

Run:

    ./docker/run-dev.sh

After that go to https://console.cloud.google.com/apis/library and get your YouTube Data API v3 key. More details: https://developers.google.com/youtube/v3/getting-started?hl=ru

Insert the received key into .env.docker:

    YOUTUBE_DATA_API_V3_KEY={YOUR_API_KEY}

Go to http://127.0.0.1:8080/websockets/test/index.html and try to send event

## Source repository

[lumen-websockets](https://bitbucket.org/junsenior/lumen-websockets/src/master/)
