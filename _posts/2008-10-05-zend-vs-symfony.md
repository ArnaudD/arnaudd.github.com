--- 
layout: post
title: Comparaison Zend vs Symfony
published: true

tags: 
- framework
- MVC
- php
- symfony
- zend
---

Pour un premier post pourquoi ne pas commencer par un court comparatif entre les framework Zend et Symfony.

Pourquoi utiliser un framework ?
--------------------------------

Quelle que soit la taille d'un projet, certains problèmes sont sensiblement les mêmes et nécessitent des développements très similaires. Je pense par exemple à la mise en place d'une structure MVC, à la gestion des erreurs, à la sécurisation des accès à la base de données, à la définition des formulaires et leur validation etc. La liste est longue. Une solution est de développer toutes ces briques soit même, permettant par là même occasion d'avoir une connaissance trés précise du fonctionnement de son site. Mais qu'en est-il de la modélisation, de l'évolution et plus important encore, de la sécurité. Tout a bien été pensé, aucune faille n'a été laissée ? Quelle est la qualité du code produit par quelques, voire un seul développeur face à une communauté d'utilisateurs et des milliers de testeurs potentiels ? C'est pour cette raison que les frameworks existent : pouvoir coder rapidement une application sécurisée et évolutive.

Le point commun de ces deux frameworks php est qu'ils sont orientés objet et reposent sur une architecture MVC.

Zend framework
--------------

ZF est développé par la société Zend -qui se cache derrière le parseur PHP‑ depuis 2005. Parmis ses prestigieux contributeurs et/ou utilisateurs on recense Google, IBM, Microsoft, Adobe, etc. Cela fait tout juste un ans que je développe avec ZF. Hormis quelques librairies PEAR je n'avais pas réellement testé de framework de cette taille, mais connaissant et utilisant les principes MVC je n'ai pas été dérouté lors de ma première prise en main. Les points forts de Zend sont à la fois ses points faibles : Le développement du framework suit des [étapes trés  précises](http://framework.zend.com/wiki/display/ZFPROP/Proposal+Process) (proposition > modélisation > implémentation) jalonnées par des revues/validations par l'équipe de Zend. Ce processus trés stricte permet de garantir une trés bonne modélisation et donc la pérénnité du code. L'inconvénient est la lenteur d'évolution des fonctionnalités. On se retrouve assez vite à développer certaines chose déjà présentes sur des frameworks tels que Rails, Django ou Symfony. Ce qu'il manque le plus est la génération du code (en cours de test dans la version 1.6), un bootstrap (pour configurer et initialiser les classes de base de l'application) et la gestion de plugins. Toutefois on ne peut qu'imaginer un bon avenir en voyant [les propositions en cours d'évaluation](http://framework.zend.com/wiki/display/ZFPROP/Home) et la [librairie Zym](http://www.zym-project.com/docs/reference) développée en parallèle. Disont que pour l'instant c'est frustrant d'utiliser Zend lorsqu'on connait les possibilités des autres frameworks. Site du projet : [framework.zend.com/](http://framework.zend.com) 

Symfony
-------

Symfony est un framework initié par la web agency française Sensio en 2003 et rendu open source en 2005. Les grands nom qui l'utilisent sont Yahoo! pour son application Yahoo Bookmarks et [tant d'autres](http://trac.symfony-project.org/wiki/ApplicationsDevelopedWithSymfony), Malgré tous les retours que j'ai eu sur SF, cela ne fait que trois semaines que j'ai décidé de m'y former en lisant la doc et en commençant un projet basique. Le point notable au premier abord est la génération de code qui permet un prototypage très rapide d'une application. La génération est présente à tous les niveaux : application, contrôleur, modèle, formulaire, test, configuration... Tout cela est accessible à partir d'un seule commande 'symfony'. C'est cette commande qui gère par la même occasion l'internationalisation, les logs, les plugins, et les tests. C'est un peu tôt pour trouver des points faibles; On verra ça dès que je plongerai dans les fonctionnalités avancées. Tout ce dont je m'interroge pour le moment c'est la pérennité des plugins proposés et plus précisément la probabilité que l'API de ceux-ci et même du coeur de symfony change. La prochaine étape sera le développement d'une shoutbox avec un billet pour détailler chaque étape. Site du projet : [http://www.symfony-project.org/](http://www.symfony-project.org/)

Et vous ?
---------

Hormis le temps d'apprentissage trop important face à la taille d'un projet, quelles seraient vos motivations pour NE PAS utiliser de framework ?
