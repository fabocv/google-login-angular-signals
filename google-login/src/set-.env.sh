#!/bin/bash

# Este script sobrescribe el placeholder en el archivo de entorno.

# Nombre de la variable de entorno de tu shell
CLIENT_ID_FROM_SHELL="$GOOGLE_CLIENT_ID" 

# Verifica que la variable exista
if [ -z "$CLIENT_ID_FROM_SHELL" ]; then
  echo "Advertencia: La variable GOOGLE_CLIENT_ID no está definida en el shell."
  exit 1
fi

# Ruta del archivo de entorno
ENV_FILE="./src/environments/environment.ts"

# Usando sed para reemplazar el placeholder con el valor real
# (La sintaxis de sed puede variar ligeramente, esto es común en macOS/Linux)
sed -i '' "s|googleClientId: 'REEMPLAZAR_EN_BUILD',|googleClientId: '$CLIENT_ID_FROM_SHELL',|" $ENV_FILE

echo "CLIENT_ID inyectado en $ENV_FILE. ¡Listo para compilar!"