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

# Copia los scripts SQL al contenedor 
COPY script /app/script

# Expon el puerto en el que corre tu aplicación
EXPOSE 3001

# Define el comando para ejecutar la aplicación
CMD ["npm", "start"]
