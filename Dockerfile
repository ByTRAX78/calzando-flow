# Etapa 1: Construcción (Build)
FROM node:20-alpine AS build

# --- INICIA CORRECCIÓN 1 ---
# Declara el argumento que recibiremos de docker-compose
ARG VITE_IBM_API_KEY
# Expone el argumento como una variable de entorno
# ESTO SOLO AFECTA A ESTA ETAPA (build)
ENV VITE_IBM_API_KEY=$VITE_IBM_API_KEY
# --- FIN CORRECCIÓN 1 ---

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# --- CORRECCIÓN 2 ---
# Verifica que la variable esté presente antes de construir
# Si la variable está vacía, el build fallará con un error claro
RUN test -n "$VITE_IBM_API_KEY" || (echo "Error: VITE_IBM_API_KEY no está definida." && exit 1)
# --- FIN CORRECCIÓN 2 ---

# Al ejecutar 'npm run build', Vite ahora tendrá acceso a VITE_IBM_API_KEY
RUN npm run build

# Etapa 2: Producción (Serve)
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]