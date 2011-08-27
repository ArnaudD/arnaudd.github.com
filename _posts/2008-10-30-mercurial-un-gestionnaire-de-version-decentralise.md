--- 
layout: post
title: "Mercurial, un gestionnaire de version d\xC3\xA9centralis\xC3\xA9"
published: true
---


Apparu aux alentour de 2005, Mercurial fait partie de la dernière génération des systèmes de versions qui ont comme particularité d'être décentralisés. Contrairement aux systèmes centralisés tels que Subversion ou CVS, chaque développeur possède ses propres dépôts contenant l'intégralité des modifications d'un projet.
 
Apparus dans le contexte de projets open source, ces <acronym title="Distributed Version Control System">DVCS</acronym> permettent à un développeur extérieur à un projet de le "cloner" afin d'y ajouter une fonctionnalité. Possédant ainsi son propres dépôt il peut alors "versionner" ses modifications sans pour autant modifier le projet original. Une fois terminé il peut proposer aux développeurs du projet de récupérer son code afin de l'analyser en vue d'une intégration dans leur code de base. Avec Subversion, un tel scénario n'aurait pas été possible aussi simple.
 
D'autres logiciels open source existent bien sûr, les plus connus sont (source [wikipédia](http://fr.wikipedia.org/wiki/Gestion_de_version_d%C3%A9centralis%C3%A9e)):

* [Bazaar](http://fr.wikipedia.org/wiki/Bazaar_\(logiciel\)), Développé et utilisé par Canonical.
* [Darcs](http://fr.wikipedia.org/wiki/Darcs)
* [Git](http://fr.wikipedia.org/wiki/Git)
* [Mercurial](http://fr.wikipedia.org/wiki/Mercurial)
* [Monotone](http://fr.wikipedia.org/wiki/Monotone_\(logiciel\))
* [GNU Arch](http://fr.wikipedia.org/wiki/GNU_Arch)

Ayant l'occasion d'utiliser Mercurial dans un projet, je vais essayer de décrire ses principales commandes pour vous montrer à quel point il est simple à utiliser.

La plus grosse difficulté est de structurer le dépôt&nbsp;: Quelles branches créer, quand, par qui, etc. Pour simplifier les choses nous allons utiliser un dépôt central sur lequel plusieurs branches cohabiteront. C'est la méthode la plus simple pour permettre à plusieurs développeurs de travailler sur la même branche. Tout dépend du projet et de la taille de l'équipe. Pour plus de renseignement sur l'architecture d'un projet, le chapitre "[Collaboration model](http://hgbook.red-bean.com/hgbookch6.html#x10-1110006.2)" du livre Mercurial est là pour ça.
 
On va donc prendre l'exemple d'une application web ayant les branches suivantes :
 
* stable&nbsp;: version en production
* test&nbsp;: version de test qui consiste en un merge d'une ou plusieurs fonctionnalités
* fonctionnalité 1&nbsp;: Fonctionnalité développée par M Pink
* fonctionnalité 2&nbsp;: Fonctionnalité développée par M Brown et M Orange
* etc .
 
Les commandes de Mercurial sont trés similaires à SVN&nbsp;: <em>add</em>, <em>remove</em>, <em>status</em>, <em>diff</em> et <em>commit</em> ont le même effet. Il faut par contre ne pas perdre de vue qu'on travaille sur le dépôt local. Les commandes permettant la collaboration sont&nbsp;:

* `hg clone URI`&nbsp;: clone un dépôt local ou distant
* `hg push URI`&nbsp;: envoi des modification du dépôt local vers un autre dépot 
* `hg pull URI`&nbsp;: récupère les modification d'un autre dépôt (mais ne met pas à jour le dépôt)
* `hg update`&nbsp;: met à jour le dépôt local à la plus haute révision (le "tip")
* `hg merge nom_de_la_branche`&nbsp;: merge la branche local avec une autre branche
 
Quelques astuces&nbsp;: 

* `hg pull URL  && hg update` = `hg pull -u`
* Utilisez `hg view` pour avoir une réprésentation graphique du dépôt, de ses branches et logs. Sous Ubuntu 8.10 le greffon hgk n'est pas activé par défaut, il faut faut ajouter les lignes suivantes dans votre fichier `~/.hgrc`

{% highlight ini %}
[extensions]
hgk=
{% endhighlight %}
 
C'est parti&nbsp;! 
 
Par simplicité nous n'allons pas créer le dépôt manuellement. Nous utiliserons le site <a href="http://www.bitbucket.org" hreflang="en">BitBucket</a> qui propose d'héberger gratuitement des projets.
 
Clonage du dépôt et ajout de fichiers
-------------------------------------
 
 
Comme expliqué précédemment, dans un système distribué, chaque dépôt est une copie intégrale d'un autre dépot. La première étape est donc le clonage du dépôt que nous avons créé sur BitBucket.
 

{% highlight bash %}
hg clone http://bitbucket.org/ArnaudD/mon-projet/ 
cd mon-projet
{% endhighlight %}
 
 
Ajoutons un fichier

{% highlight bash %}
echo "nouveau fichier" > new-file 
hg add new-file 
hg commit -m "Ajout du premier fichier"
{% endhighlight %}
 
Comme sur svn, on peut utiliser la commande hg status pour connaître les fichiers qui ne sont pas versionné, qui ont été modifiés depuis le derniers commit, etc...
 
Envoyons maintenant nos fichiers sur le serveur (puisque <em>hg commit</em> n'a fait que modifier le dépôt local) 

{% highlight bash %}
hg push
{% endhighlight %}
 
Note&nbsp;: Il n'est pas nécessaire de préciser l'URI du dépôt distant; Mercurial utilise celle précisée lors du clone
 
 
Création de branches
-------------------- 
 
{% highlight bash %}
hg branch # affiche la branche courante 
  default
{% endhighlight %}
 
La branche "default" sera notre branche stable. Nous allons donc créer une branche de test. Pour pouvoir travailler simultanément sur plusieurs branches sur notre machine nous allons créer un répertoire par branche.

{% highlight bash %}
hg clone http://bitbucket.org/ArnaudD/mon-projet/ mon-projet-test 
cd ../mon-projet-test 
hg branch test 
hg commit -m "Création de la branche de test"
hg push -f
{% endhighlight %}
 
Nous utilisons ici l'option `-f` (`--force`) pour indiquer que nous forçons le push en cas de création de nouvelle tête ("head") dans le dépot de destination. Ce qui est bien notre cas puisque nous souhaitons avancer sur plusieurs front en parallèle.
 
Faisons la même choses pour les branches function1 function2 etc

{% highlight bash %}
hg clone http://bitbucket.org/ArnaudD/mon-projet/ mon-projet-fct1
cd ../mon-projet-fct1
hg branch fct1
hg commit -m "Création de la branche de développement de la fonctionnalité 1" 
hg push -f
{% endhighlight %}
 
Voyont maintenant où on en est si je reviens sur le dépôt de la branche "default" (stable)

{% highlight bash %}
cd ../mon-projet
hg pull -u
    ...
    added 2 changesets with 0 changes to 0 files (+1 heads) 
hg branch
    default
hg branches 
    test                           2:692b6e18db13 
    fct1                           1:2ad3df6be62a
    default                        0:be3be0bd6b35 (inactive)
{% endhighlight %}
 
On vient bien de récupérer les deux modifications. On se trouve toujours sur la branche "default" et les branches "test" et "fct1" ont bien été crées.
 
Fusion (synchronisation) de branches
------------------------------------
 
Retournons dans la branche fct1 et ajoutons une fonction&nbsp;:

{% highlight bash %}
cd ../nom-project-fct1
echo "function foobar () {}" >> new-file 
hg commit -m "Ajout de la nouvelle fonctionnalité" 
hg push
{% endhighlight %}
 
Le push final n'est pas obligatoire, mais permet de rendre disponible notre magnifique nouvelle fonction dans le cas où un autre développeur voudrait l'essayer.

Plusieurs cycles de commit/push se sont déroulé et nous voilà avec notre fonctionnalité terminée. C'est le moment de synchroniser la branche de test avec la notre. Pour cela nous allons utiliser la commande merge.

{% highlight bash %}
cd ../nom-projet-test 
hg pull -u
hg branch
    test 
hg merge fct1
    1 files updated, 0 files merged, 0 files removed, 0 files unresolved
    (branch merge, don t forget to commit) 
hg commit -m "merge de la fonctionnalité fct1 dans la branche de test" 
hg push
{% endhighlight %}
 
En cours de test on s'aperçoit qu'il y a un bug dans la fonction. Retournons donc le corriger dans la branche "fct1"

{% highlight bash %}
cd ../nom-project-fct1
hg branch # pas obligatoire, sert juste à vérifier qu'on est dans la bonne branche 
    fct1
hg pull -u 
echo "bugfix foobar" >> new-file 
hg commit -m "bugfix de foobar" 
hg push -f
{% endhighlight %}
 
Retournons maintenant dans la branche de test et ré-appliquons un merge sur fct1

{% highlight bash %}
cd ../nom-projet-test 
hg pull -u
hg merge fct1
hg commit -m "synchronisation avec la branche fct1" 
hg push
cat new-file 
    nouveau fichier
    function foobar () {} 
    bugfix foobar
{% endhighlight %}
 
Maintenant que la branche de test est stable passons la en production dans la branche "default"

{% highlight bash %}
cd ../nom-projet
hg pull -u
hg merge test 
hg commit -m "synchronisation avec la branche test" 
hg push
{% endhighlight %}
 
Dernier cas très important&nbsp;: application d'une correction urgente en prod. Il suffit de se placer dans notre dépôt local correspondant à la branche default. De faire notre correction puis de `commit`er et `push`er. Les autres développement pourront récupérer le bugfix en faisant un `hg merge default`. S'il ne le font pas, le bugfix sera appliqué lors d'un merge entre leur branche et la branche "default".

Conclusion
----------
 
Mercurial (les systèmes décentralisés en général) peuvent sembler complexes pour de petits projets, mais j'espère que ces scénarii vous ont convaincu que les DVCS sont très utiles pour développer des fonctionnalités en parallèle dans des contextes différents. Le plus grand intérêt pour moi est de permettre à des contributeur de forker facilement des projets open sources.
 
Si les DVCS vous ont convaincu je vous conseille de regarder du côté de Git qui est très utilisé par la communauté Ruby et qui possède un très bon hébergeur http://github.com/.
