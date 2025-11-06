# Makefile para el proyecto calzando-flow

.PHONY: install dev build clean docker-build docker-run docker-stop docker-up docker-logs docker-up-logs

# Instala todas las dependencias de npm
install:
	npm install

# Inicia el servidor de desarrollo en localhost
dev:
	npm run dev

# Genera la compilación de producción en la carpeta /dist
build:
	npm run build

# Limpia los módulos de node y la carpeta de build
clean:
	rm -rf node_modules dist

# -------- Comandos de Docker --------

# Construye la imagen de Docker
docker-build:
	docker build -t calzando-flow:latest .

# Corre el contenedor de Docker en el puerto 8080
docker-run:
	docker run -p 8080:80 -d --name calzando-app calzando-flow:latest

# --- NUEVAS INSTRUCCIONES ---

# Detiene y elimina el contenedor existente para evitar conflictos
docker-stop:
	-docker stop calzando-app
	-docker rm calzando-app

# (Opción nueva) Construye la imagen Y levanta el contenedor como demonio
docker-up: docker-stop docker-build
	docker run -p 8080:80 -d --name calzando-app calzando-flow:latest

# --- NUEVAS INSTRUCCIONES (Logs) ---

# Muestra los logs (en vivo) del contenedor que está corriendo
docker-logs:
	docker logs -f calzando-app

# (Opción nueva) Construye, levanta el demonio Y muestra los logs
docker-up-logs: docker-up
	@echo "Contenedor 'calzando-app' corriendo. Mostrando logs en vivo... (Presiona Ctrl+C para salir)"
	docker logs -f calzando-app