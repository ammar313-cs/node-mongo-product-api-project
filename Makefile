include .env
export $(shell sed 's/=.*//' .env)

build:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) build

build-no-cache: 
	@docker-compose -f $(DOCKER_COMPOSE_FILE) build --no-cache

up:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) up -d

down:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) down

logs:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) logs -f

restart:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) down
	@docker-compose -f $(DOCKER_COMPOSE_FILE) up -d

clean:
	@find . -name '._*' -exec rm -rf {} \;

delete-package:
	@rm -rf node_modules package-lock.json

re-npm:
	@npm install
