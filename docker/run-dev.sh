export CURRENT_USER_ID=$(id -u)
DOCKER_FILE='docker-compose.yml'

docker-compose -f ${DOCKER_FILE} stop
docker-compose -f ${DOCKER_FILE} build --pull --force-rm
docker-compose -f ${DOCKER_FILE} up -d --force-recreate
