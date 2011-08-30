--- 
layout: post
title: "Passer \xC3\xA0 ubuntu ? oui, mais comment ?"
published: true
tags: 
- linux
- open source
- ubuntu
---
Ubuntu 9.10 (aka Karmic Koala) is born ! Voici une nouvelle excuse pour pousser mon entourage à passer sous Ubuntu !

Pour les plus réticents [Wubi](http://wubi-installer.org) vous permettra d'installer Ubuntu comme [un simple programme windows](http://wubi-installer.org/screenshots.php) au cas où vous auriez peur de faire une bêtise. Vous pourrez ainsi le désinstaller comme tout autre programme Windows. L'inconvénient de cette solution est qu'elle ne sera plus fonctionnelle en cas de caprices de votre Windows.

Pour les autres, vous pourrez suivre la [documentation française](http://doc.ubuntu-fr.org) qui détaille toutes [les étapes de l'installation](http://doc.ubuntu-fr.org/installation_graphique) (prévoir entre 15 et 30min).

Dans tous les cas, il ne vous coûte rien d'essayer le live CD (ou très pratique [live USB](http://doc.ubuntu-fr.org/unetbootin)) qui est sans AUCUN risque pour votre système.

Une fois celui-ci installé, voici ma sélection de paquets à installer pour vous éviter quelques recherches. Pour vous dire à quel point Ubuntu est une distribution "clefs en main", cette courte sélection représente 90% des applications installées manuellement sur mon système.

Pour les novices, plus il y a de "+" à coté des noms, plus les applications sont réservées aux utilisateurs "avancés". Faites votre choix.

Les commandes suivantes sont à taper dans un terminal (Menu "Applications" > "Accessoires"). C'est une méthode pratique lorsque le nombre de programmes à installer est assez important. Mais rien ne vous empêche d'utiliser la "Logithèque Ubuntu" disponible dans le menu principal. Vous pourrez d'ailleurs l'utiliser pour désinstaller un programme qui ne vous convient pas; ou taper la commande suivante :

{% highlight bash %}
sudo aptitude remove nom_du_programme
{% endhighlight %}

Web
---

### Google Chrome ###

{% highlight bash %}
sudo add-apt-repository ppa:chromium-daily/ppa
sudo aptitude update
sudo aptitude install chromium-browser
{% endhighlight %}

### Notifications Firefox ###

{% highlight bash %}
sudo aptitude install firefox-notify
{% endhighlight %}

### Filezilla (client FTP) (++) ###

{% highlight bash %}
sudo aptitude install filezilla
{% endhighlight %}

### Notifications d'une boîte gmail : ###

{% highlight bash %}
sudo aptitude install checkgmail
sudo checkgmail -update # répondre 'Y' à la question posée
{% endhighlight %}

Outils d'administration du système
----------------------------------

### "Unp" pour extraire depuis un terminal des fichiers compressés (+++) et ''Terminator'' un terminal multi-panneaux ###

{% highlight bash %}
sudo aptitude install unp  terminator
{% endhighlight %}

### Démarrage et contrôle d'un ordinateur à distance par un terminal (+ + + +) : ###

{% highlight bash %}
sudo aptitude install wakeonlan openssh-server
{% endhighlight %}

### GSmartControl (pour vérifier la santé de son disque dur) (++) : ###

{% highlight bash %}
sudo aptitude install gsmartcontrol
{% endhighlight %}

Outils divers
-------------

### [Gnome Do](http://doc.ubuntu-fr.org/gnome-do) ###

{% highlight bash %}
sudo add-apt-repository ppa:do-core/ppa
sudo aptitude update
sudo aptitude install gnome-do gnome-do-docklets gnome-do-plugin-rhythmbox gnome-do-plugins
{% endhighlight %}

### <a href="http://doc.ubuntu-fr.org/wine">Wine</a> (permet d'exécuter des fichiers .exe) (+++) ###

{% highlight bash %}
sudo aptitude install wine
{% endhighlight %}

### <a href="http://doc.ubuntu-fr.org/virtualbox">Virtualbox</a> (permet de lancer Windows depuis Ubuntu) (+++) : ###

{% highlight bash %}
sudo -s
echo "deb http://download.virtualbox.org/virtualbox/debian karmic non-free" >> /etc/apt/sources.list
wget -q http://download.virtualbox.org/virtualbox/debian/sun_vbox.asc -O- | sudo apt-key add - aptitude update && aptitude install virtualbox-3.0
{% endhighlight %}

Multimédia Codecs et lecteurs multimédia
----


{% highlight bash %}
sudo aptitude install ubuntu-restricted-extras  adobe-flashplugin smplayer vlc lastfm subdownloader rhythmbox
{% endhighlight %}

Développement web
----

### Serveur web ###

{% highlight bash %}
sudo aptitude install php5 php5-mysql apache2 mysql-server phpmyadmin php-pear php5-ldap
{% endhighlight %}

### Editeur ###

{% highlight bash %}
sudo aptitude install  vim-full vim-gnome
{% endhighlight %}

### Gestionnaires de versions ###

{% highlight bash %}
sudo aptitude install mercurial git subversion meld colordiff
{% endhighlight %}

### Pipette de couleurs (vive les traductions qui sonnent faux) : ###

{% highlight bash %}
sudo aptitude install gcolor2
{% endhighlight %}

Have fun !

Et n'hésitez pas à poser vos questions ici ou sur [le forum d'ubuntu-fr](http://forum.ubuntu-fr.org).
