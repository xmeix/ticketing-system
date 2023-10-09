Exigences :
Vous devez exécuter le serveur Redis : redis-server &.
Vous devez également exécuter XAMPP pour la base de données MySQL.
Comment exécuter ?

1. Clonez le projet depuis GitHub en utilisant la commande : git clone https://github.com/xmeix/ticketing-system.git.
2. Accédez au dossier racine et ouvrez un terminal (cmd) dans ce répertoire.
3. run virtual environnement
4. Tapez la commande "python manage.py runserver" pour lancer le serveur.
5. Tapez 'celery -A server worker --pool=solo -l info' et 'celery -A server beat --loglevel=info' pour exécuter le planificateur qui définit les tickets comme expirés.
6. Tapez dans un autre noeud : cd client -> yarn install -> yarn run dev pour installer les dépendances React et exécuter le client.