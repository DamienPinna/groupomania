# groupomania

## Description
Projet n°7 du parcours "développeur web" d'openclasrooms.

Réalisation d'un réseau social d'entreprise permettant le partage de gif.

## Procédure
### A faire qu'une fois
* Télécharger le projet
* Mettre en place la base de données local en important les fichiers sql fournis dans ./backend/db_groupomania. A noter que l'application se connecte au port 3306 de la base de données.
* créer un fichier .env et le placer dans le répertoire backend.
Ecrire dans ce fichier :

DB_HOST=localhost

DB_USER=renseigner ici le nom de l'utilisateur que vous aurez créé dans votre base de données

DB_PASS=renseigner ici le mot de passe de l'utilisateur que vous aurez créé dans votre base de données

DB_NAME=groupomania

SECRET=renseigner ici le secret pour le TOKEN

* A la racine du projet taper npm install
* Se placer dans le répertoire backend et taper npm install

### Pour démarrer l'application
* Se placer à la racine du projet et taper npm run serve
* Se placer dans le répertoire backend et taper npm start

Lancer l'application sur http://localhost:8080/

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
