# Makefile para el proyecto calzando-flow

.PHONY: install dev build clean
.PHONY: docker-build docker-run docker-stop docker-up docker-logs docker-up-logs
.PHONY: compose-up compose-down compose-logs

# ... (tus comandos 'install', 'dev', 'build', 'clean' van aquí) ...
install:
	npm install
dev:
	npm run dev
build:
	npm run build
clean:
	rm -rf node_modules dist

# -------- Comandos de Docker (Individual) --------
docker-build:
	docker build -t calzando-flow:latest .
docker-run:
	docker run -p 8080:80 -d --name calzando-app calzando-flow:latest
docker-stop:
	-docker stop calzando-app
	-docker rm calzando-app
docker-up: docker-stop docker-build
	docker run -p 8080:80 -d --name calzando-app calzando-flow:latest
docker-logs:
	docker logs -f calzando-app
docker-up-logs: docker-up
	@echo "Contenedor 'calzando-app' corriendo. Mostrando logs en vivo... (Presiona Ctrl+C para salir)"
	docker logs -f calzando-app

# -------- Comandos de Docker Compose (NUEVOS) --------

# Levanta todo (redis, backend, frontend) en modo demonio y reconstruye
compose-up:
	docker-compose up -d --build

# Detiene y elimina todos los contenedores de compose
compose-down:
	docker-compose down

# Muestra los logs de TODOS los servicios (redis, back, front)
compose-logs:
	docker-compose logs -f