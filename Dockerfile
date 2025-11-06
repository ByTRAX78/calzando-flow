# Etapa 1: Construcción (Build)
# Usamos una imagen de Node ligera
FROM node:20-alpine AS build

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación de producción
# Esto crea la carpeta 'dist'
RUN npm run build

# Etapa 2: Producción (Serve)
# Usamos una imagen de Nginx ligera
FROM nginx:stable-alpine AS production

# Copiamos los archivos estáticos construidos desde la etapa 'build'
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos nuestro archivo de configuración personalizado de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80 (el que usa Nginx por defecto)
EXPOSE 80

# Comando para iniciar el servidor Nginx
CMD ["nginx", "-g", "daemon off;"]