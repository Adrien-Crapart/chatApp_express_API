FROM node:lts-alpine

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

# Ajoute l'emplacement du dossier node `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY package*.json ./

# installe les dépendances du projet
RUN npm install

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY . .

# construit l'app pour la production en la minifiant
#RUN PATH /frontend/npm run build

EXPOSE 8080
CMD ["npm", "run", "serve", "&&", "backend/", "nodemon", "server"]