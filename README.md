# Projet d'implémentation du site Kanap. Etapes clés pour le setup:

## I - Installation de "http-server"
<pre>
   Commande : "npm install --global http-server"
   
   Sous windows, si vous rencontrez l'erreur "l’exécution de scripts est désactivée sur ce
   système."
   - ouvrir powershell en mode admin
   - taper la commande suivante : set-executionpolicy unrestricted
   - rendez-vous a la racine du projet depuis votre terminal powershell et executer la commande : http-server front
</pre>

## II - Demarrer le projet back
<pre>
   - cd back
   - npm install
   - node server.js
</pre>

## III - Demarrer le projet front
<pre>
   - ouvrir un autre terminal en vous rendant dans le projet
   - http-server front
</pre>