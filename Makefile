# Makefile para el proyecto calzando-flow

.PHONY: install dev build clean docker-build docker-run

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