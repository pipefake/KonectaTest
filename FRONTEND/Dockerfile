# Utiliza una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Utiliza una imagen de servidor web para servir los archivos
FROM nginx:alpine

# Copia los archivos construidos en el contenedor de nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Expone el puerto 80 para servir la aplicación
EXPOSE 80

# Inicia nginx
CMD ["nginx", "-g", "daemon off;"]
