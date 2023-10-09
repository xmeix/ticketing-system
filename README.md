Exigences POUR LE SERVEUR :

- Vous devez exécuter le serveur Redis dans un terminal bash : redis-server &.
- Vous devez également exécuter XAMPP pour la base de données MySQL.
- Créez une base de données appelée : ticketing_system

Comment exécuter ?

- Clonez le projet depuis GitHub en utilisant la commande : git clone https://github.com/xmeix/ticketing-system.git.
- Accédez au dossier racine et ouvrez un terminal (cmd) dans ce répertoire.
- Vous devez installer ce fichier : pip install virtualenv -> virtualenv env -> dans bash source env/Scripts/activate.
- Ajoutez un nouvel interpréteur : CTRL + Shift + P => sélectionnez l'interpréteur => ajoutez le chemin du fichier env.


POUR LE SERVEUR :

Ouvrez un nouveau terminal.
pip install -r requirements.txt.
python manage.py migrate.
python manage.py createsuperuser.
Tapez la commande "python manage.py runserver" pour lancer le serveur.
Dans deux nœuds différents : Tapez 'celery -A server worker --pool=solo -l info' et 'celery -A server beat --loglevel=info' pour exécuter le planificateur qui définit les tickets comme expirés.


POUR LE CLIENT :

Tapez dans un autre nœud : cd client.
yarn install  => pour installer les dépendances React et exécuter le client.
yarn run dev 
Connectez-vous à l'application en utilisant l'email et le mot de passe du superutilisateur que vous avez créé, puis ajoutez d'autres utilisateurs.
