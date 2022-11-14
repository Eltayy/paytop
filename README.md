<h1 align="center">Paytop Test Technique</h1>

## Sujet

> - Il faut un endpoint pour créer une entity "client" (ex de champs : nom/prénom/email/phone number).

> - Sauvegarder la date de création du client en bdd.

> - Sur la création du client, mettre en place une tache de traitement de l'entity en asynchrone. Dans le traitement en asynchrone, envoyer un json (contenant les données du client) sur https://webhook.site/ (visiter le site avant pour avoir une url avec un token).

> - Compartimenter par partenaire (un partenaire est un utilisateur de l'API, il faut des comptes API distincts).

> - Créer 2 partenaires (chacun avec leur credentials) capables de créer des clients et de voir uniquement les leurs.

> - Créer un admin qui peut voir tous les clients.

> - Mais seul l'admin doit voir la date de création dans le GET clients/{clientId}.

## Install

```sh
  docker compose build --pull --no-cache
```

```sh
  docker compose up -d 
```

```sh
  cd /api 
  php bin/console --env=dev doctrine:fixtures:load
```

## Infos
| URL | PATH |
| ------ | ------ |
| https://localhost/docs/ | api/ |
| https://localhost/ | pwa/ |
| https://localhost/admin | pwa/pages/admin/ |


| Protocole | PORT |
| ------ | ------ |
| HTTP | 80 |
| HTTPS | 443 |
| Database (POSTGRES) | 5432 |

## Lien WebHook
> https://webhook.site/f79663c7-cac2-4095-8d8b-1b72a0fdb041

## Users 

| Role | Login | Password |
| ------ | ------ | ------ |
| Admin | admin@test.com  | 0000 |
| User | partner1@test.com  | 0000 |
| User | partner2@test.com  | 0000 |