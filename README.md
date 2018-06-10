# How to test
1. Install docker and docker compose
2. Run `docker-compose up --build --abort-on-container-exit`

# Only run web server
1. Run redis at local and expose 6379 port
2. Run `yarn`
3. Run `yarn start`
4. Web server url is `localhost:3000`