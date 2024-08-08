include .env
export $(shell sed 's/=.*//' .env)

# Docker Compose Commands alternate 
build:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) build

up:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) up -d

down:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) down

logs:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) logs -f

restart:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) down
	@docker-compose -f $(DOCKER_COMPOSE_FILE) up -d

# Docker Commands alternate 
proj-build:
	@docker build -t $(PROJECT_NAME) .

proj-run:
	@docker run -d -p 5000:5000 --name $(PROJECT_NAME) $(PROJECT_NAME)

proj-stop:
	@docker stop $(PROJECT_NAME)
	@docker rm $(PROJECT_NAME)

# Clean up command 
proj-clean:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) down -v --rmi all --remove-orphans
	@docker system prune -f
