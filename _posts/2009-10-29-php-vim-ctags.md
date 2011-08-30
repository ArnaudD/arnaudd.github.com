--- 
layout: post
title: PHP, Vim & CTags, ou comment naviguer rapidement dans vos sources
published: true
tags: 
- ctags
- php
- vim
---
Ce billet est certainement les millionième howto du web sur vim+ctags. Je partage quand même ce mémo au cas où il soit utile à quelqu'un.


{% highlight bash %}
sudo aptitude install exuberant-ctags
{% endhighlight %}

Ajoutez les lignes suivantes au fichier `~/.vimrc` :

{% highlight vim %}
set tags=tags;/ " Permet de rechercher un fichier "tags" en remontant depuis le répertoire courant jusqu'à la racine jusqu'à ce qu'il soit trouvé
map  :tab split:exec("tag ".expand(""))
map  :vsp :exec("tag ".expand(""))
{% endhighlight %}

Ajoutez ceci à votre `~/.bashrc` ou `~/.bash_aliases` :

{% highlight bash %}
phptags () {
    ctags-exuberant -h ".php" -R                     \
        --exclude="\.svn"                            \
        --totals=yes                                 \
        --tag-relative=yes                           \
        --PHP-kinds=+cf                              \
        --regex-PHP='/abstract class ([^ ]*)/\1/c/'  \
        --regex-PHP='/interface ([^ ]*)/\1/c/'       \
        --regex-PHP='/(public |static |abstract |protected |private )+function ([^ (]*)/\2/f/'
}
{% endhighlight %}

Puis placez vous à la racine de votre projet et exécutez :

{% highlight bash %}
phptags
{% endhighlight %}

Un fichier tags devrait avoir été créé, et devrait être pris en compte au prochain démarrage de vim.

Voici donc les différentes façon de naviguer dans vos sources (en vous plaçant au début d'un appel de fonction) :

* __Ctrl ]__ Devrait vous amener à la définition de la fonction/classe (= __Ctrl ClicGauche__)
* __Ctrl T__ Vous ramènera à l'appel de la fonction (= __Ctrl ClicDroit__)
* __Ctrl W Ctrl ]__ Ouvrira la définition dans un panneau horizontal
* __Alt ]__ Ouvrira la définition dans un panneau vertical
* __Ctrl \ __ Ouvrira la définition dans un nouvel onglet
