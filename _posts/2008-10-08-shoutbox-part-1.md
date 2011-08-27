--- 
layout: post
title: "Shoutbox Part 1 : Prototypage"
published: true

tags: 
- framework
- php
- symfony
---

Voici comment vont s'architecturer les différentes parties du développement de la shoutbox : 

* prototypage
* personnalisation du comportement du modèle et de l'interface
* petite touche d'ajax avec jquery

Je sous-entend que [symfony est installé](http://www.symfony-project.org/book/1_1/03-Running-Symfony) pour commencer.

Création du squelette du projet
---

{% highlight bash %}
mkdir shoutbox
cd shoutbox
symfony generate:project shoutbox 
{% endhighlight %}

Nous voici avec le squelette de base. Créons maintenant l'application frontend et le module shoutbox 

{% highlight bash %}
symfony generate:app frontend 
symfony generate:module frontend shoutbox 
{% endhighlight %} 

Le contrôleur shoutbox a été créé. Nous pouvons passer à la définition du modèle 

Définition du modèle 
---

Nous allons décrire le modèle dans le fichier ''config/schema.yml''.

{% highlight yaml %}
propel:
  shoutbox_message:
    _attributes: { phpName: Message }     
    id: ~
    content:     longvarchar     
    created_at: ~
{% endhighlight %} 
    
__Note :__ Certains noms de colonnes sont interprétés par Symfony :

* ''id'' va générer une clef primaire 
* ''created_at'' génère un champ qui contiendra le timestamp de sa création 
* ''updated_at'' génère un champ qui contiendra le timestamp de sa modification 
* enfin les colonnes terminant par ''_id'' seront des clefs externes vers une table qui sera automatiquement détecté 

La commande symfony va maintenant se charger de créer les classes php correspondantes. 

{% highlight bash %}
symfony propel:build-model 
{% endhighlight %} 

Passons à la configuration de la base puis à la modification du schéma : 

{% highlight bash %}
symfony configure:database "mysql://shoutbox:mdpshoutbox@localhost/shoutbox" # génération du script de création de base 
symfony propel:build-sql # insertion du script 
symfony propel:insert-sql
{% endhighlight %} 

Génération du formulaire 
---

{% highlight bash %}
symfony propel:build-forms 
{% endhighlight %} 

Écriture du contrôleur et de la vue
----

Cette étape peut aussi être générée : 

{% highlight bash %}
symfony propel:generate-crud frontend messages Message 
{% endhighlight %} 

Nous voilà avec une application qui permet de créer/lire/modifier et supprimer des messages (accessible par l'url http://mon.appli/messages). Dans le billet suivant nous personnaliserons un peu ce qui a été généré. Mais il faut noter que créer ce prototype d'application tout en lisant la doc et écrivant ce billet ne m'a pas pris plus qu'un quart d'heure ! TOUTES LES ÉTAPES SONT DÉTAILLÉES ICI ! rien ne manque.
