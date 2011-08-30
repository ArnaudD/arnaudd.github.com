--- 
layout: post
title: "Client riche/Serveur l\xC3\xA9ger - L'architecture client serveur de demain"
published: true
tags: 
- AJAX
- Dojo
- GWT
- SproutCore
- XBL
- XUL
---

L'utilisation intensive du javascript afin d'ajouter des effets visuels où des communications asynchrones avec le serveur a grandement amélioré l'ergonomie de nos sites web; On passe progressivement des documents aux application. En revanche cela n'a aucunement changé l'architecture des sites ni notre manière de coder. Grossièrement le fonctionnement actuel de la plupart des applications web est le suivant : Pour traiter une requête on analyse le contexte (session, paramètres, etc), manipule des données métier, et générons du code HTML. En somme, les trois parties du modèle MVC sont exécutées côté serveur.

Jusqu'à présent, pour des raisons de simplicité, de navigateurs ne respectant pas les standards, et de performances des moteurs javascripts, nous (développeurs) avons été bridés et n'avons pas utilisé tout le potentiel des outils standardisés par le W3C. Mais les choses ont avancé très vite ces derniers temps. La compétition est lancée entre les navigateurs pour savoir lequel aura le moteur Javascript le plus rapide : [TraceMonkey](http://ejohn.org/blog/tracemonkey/) (Firefox), [SquirrelFish Extreme](http://webkit.org/blog/214/introducing-squirrelfish-extreme/) (Webkit), [V8](http://code.google.com/p/v8/) (Google Chrome) !

["Et pendant ce temps là, Microsoft apprend à faire ses lacets"](http://standblog.org/blog/post/2008/09/19/SquirrelFish-Extreme)

C'est le début d'un tournant dans le développement de véritables applications web. Mais pour cela, il faut optimiser l'architecture actuelle un peu vieillotte : allégeons les serveurs et dynamisons les clients !Passons d'une architecture "server-centric" à "client-centric".

Remettons chaque chose à sa place !
-----------------------------------

__Pour qu'une interface soit la plus dynamique possible, elle doit être manipulée au niveau des couches les plus proches de l'utilisateur : non pas coté serveur, mais dans le navigateur web__. Partant de ce constat, le seul rôle du serveur doit être de s'occuper des fonctions métier (création/suppression/modification, sécurité...). Il est réduit à la fonction de service web de type <acronym>SOAP</acronym> ou <acronym>REST</acronym> retournant des données (presque) brutes au format XML ou JSON.

Dans cette architecture, le client [incombe](http://www.youtube.com/watch?v=HoA6debXqOM) de responsabilités bien plus importantes qu'afficher du code HTML. __Le contrôleur déménage chez le client__ afin de prendre en main au plus tôt les évènements utilisateur. Il traite ces interactions en mettant à jour (une petite) fraction de l'interface en faisant si nécessaire des appels au serveurs.

Voici un schéma résumant la situation :

<a href="/uploads/client-server-20-architecture1.png"><img class="aligncenter size-full wp-image-187" title="client-server-20-architecture1" src="/uploads/client-server-20-architecture1.png" alt="" width="450" height="398" /></a>

([Source](http://www.it-eye.nl/weblog/2008/09/24/what-is-client-server-20))

Avantages
---------

Cette séparation logique des différentes couches apporte de nombreux avantages :

* meilleure distinction des métiers intervenants dans le développement d'un logiciel,
* amélioration de la réactivité des interfaces,
* échanges réseaux réduits au minimum,
* maintenabilité accrue; permettant d'alléger les charges coté serveur en cas de besoin :
  * mise en cache simplifiée,
  * séparation des contenus statiques très distincte (permettant facilement l'utilisation de <acronym title="Content delivery network">CDN</acronym>),
  * possibilité d'exporter facilement certains services sur d'autres serveurs,
  * possibilité de réécrire certaines parties du serveur dans un autre langage  sans avoir à modifier l'interface,
* ouverture naturelle des données par le biais des services web fournis :
  * création d'applications complémentaires par des développeur tiers,
  * interfaçage avec d'autres applications,
* développement d'applications "hors ligne" simplifié,
* serveur stateless,

Quels sont les outils à notre disposition ?
-------------------------------------------

Les outils (libres et standart-based) à notre disposition sont peu nombreux. Présent nativement dans chaque navigateur, Javascript est donc le langage le plus à même de réaliser les tâches que nous avons décrites ci-dessus.

Les librairies javascript sont encore peu poussées et ne proposent que des briques de base pour la construction d'interfaces. Je trouve qu'elles occupent la même place que les paquets PEAR il y a quelques années, avant que n'apparaissent les frameworks web que nous connaissons aujourd'hui.

Ce dont nous avons besoin est donc un véritable framework de développement javascript. Je vais essayer de présenter certains de ces outils sans rentrer dans les détails car ils sont pour le moment nouveaux pour moi.

### Google Web Toolkit (GWT) ###

<a href="/uploads/gwt-logo.png"><img class="alignright size-full wp-image-190" title="gwt-logo" src="/uploads/gwt-logo.png" alt="" width="100" height="100" /></a>

GWT propose aux développeurs de créer une application web en l'écrivant à la manière d'une IHM Java standard. Les outils fournis par Google se chargent ensuite de "traduire" le code Java en Javascript et HTML. Les principes sont exactement ceux évoqués plus haut : l'interface graphique en HTML est manipulée par du code javascript, et l'échange de données avec le serveur est réduit au minimum par le biais d'appels RPC.

GWT est pour moi l'outil le plus adapté pour écrire des application web dignes de ce nom. L'inconvénient le plus évoqué est sa courbe d'apprentissage assez raide...à vérifier dans un futur billet...

...L'ajout de Java sur la plateforme Google Apps Engine donnera peut être un coup de pouce à l'adoption de ce puissant outil !

Vous trouverez un guide de démarrage avec GWT [ici](http://www.vogella.de/articles/GWT/article.html), ou [ici par Didier Girard](http://www.slideshare.net/dgirard/gwt-gears-the-browser-is-the-platform/v1), sur [wikipedia](http://en.wikipedia.org/wiki/Google_Web_Toolkit), ou sur la [page du projet](http://code.google.com/webtoolkit/).

### Sproutcore ###

<a href="/uploads/logo.png"><img class="alignright size-full wp-image-192" title="logo" src="/uploads/logo.png" alt="" width="277" height="62" /></a>

Avec Sproutcore le développeur doit écrire chaque entité du modèle MVC en Javascript. Tout comme plusieurs framework (php|ruby|python), Sproutcore propose de générer des squelettes de classe pour vos modèles et contrôleurs. Les vues sont quant à elles écrites avec le moteur de template  eRuby puis traduites en HTML.

C'est une démarche intéressante et c'est le framework choisi par Apple pour son application <em>Mobile.me</em>.

À première vue, l'inconvénient est qu'il faut à la fois décrire son modèle de données dans des classes Javascript et dans ses services Web; il manque un couche permettant de faire automatiquement le lien entre les deux.

[http://www.sproutcore.com/about/](http://www.sproutcore.com/about/)

### Dojo ###

<a href="/uploads/dojo.png"><img class="alignright size-thumbnail wp-image-194" title="dojo" src="/uploads/dojo.png" alt="" width="150" height="70" /></a>

Dojo propose un tas de widgets pouvant s'interfacer avec des services web et également un système de template.

[Cette présentation](http://unclescript.blogspot.com/2008/10/tech-talk-on-thin-server-architecture.html) introduit aussi un système intéressant de datastore coté client, de description de service (une sorte de WSDL en JSON), et d'échange de schémas au format JSON.

[http://dojotoolkit.org](http://dojotoolkit.org)

### Et les autres ? ###

D'autres existent bien sûr, mais je n'ai pas encore eu le temps de m'y coller

* [Echo3](http://echo.nextapp.com/site/echo3)
* [IT Mill](http://www.itmill.com/itmill-toolkit)
* [ExtJS](http://extjs.com)
* [OpenLaszlo](http://www.openlaszlo.org)

Je n'ai pas parlé des outils de microsoft ou adobe qui restent fermé ou partiellement ouvert. [Adobe y gagnerait pourtant à plus ouvrir Flex...](http://ajaxian.com/archives/how-flash-can-join-the-open-web)

Il faut continuer à chercher...
-------------------------------

Malgré ces belles technologies, certains problèmes ne sont pas résolus, et ne le seront peut être jamais puisque l'architecture des sites web est complètement différente :

* Indexation > web sémentique
* Accessibilité (GoogleHealth qui fonctionne avec GWT aurait résolu ces problèmes)
* Sécurité des services RESTful & attaques par CSRF
* HTML a été créé pour décrire des documents, et non pas des applications. Les outils proposés par Mozilla ([XUL](http://fr.wikipedia.org/wiki/XUL) & [XBL](http://fr.wikipedia.org/wiki/XBL">XBL)) seraient en revanche plus adaptés... Je ne sais par contre pas s'ils ont été standardisés.
