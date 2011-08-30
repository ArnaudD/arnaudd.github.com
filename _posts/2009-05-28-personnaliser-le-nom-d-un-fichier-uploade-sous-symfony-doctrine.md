--- 
layout: post
title: "Personnaliser le nom d'un fichier upload\xC3\xA9 sous Symfony + Doctrine"
published: true
tags: 
- doctrine
- snippet
- symfony
---

Par défaut Symfony donne un nom de fichier hashé aux fichiers uploadés :

{% highlight php startinline %}
sha1($this->getOriginalName().rand(11111, 99999)).$this->getExtension($this->getOriginalExtension());
{% endhighlight %}

Rien de très explicite pour l'utilisateur qui va télécharger le fichier. Persuadé qu'une solution simple devait exister, une petite fouille dans les sources de Symfony s'imposa. Je note ici le résultat parce que je suis sûr que je l'aurai oublié d'ici quelques mois. Ça pourra aussi servir à quelqu'un (c'est aussi dans [le tuto jobeet](http://www.symfony-project.org/jobeet/1_2/Doctrine/en/10)).

La solution est d'implémenter la méthode `generate{ColonneDuFichier}Filename ($file)` dans la classe du modèle qui va stocker le chemin vers le fichier. Exemple pour la colonne "certificat" :

{% highlight php startinline %}
public function generateCertificatFilename ($file)
{
  return "mynewfilename".$file->getExtension($file->getOriginalExtension());
}
{% endhighlight %}
