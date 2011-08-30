--- 
layout: post
title: "D\xC3\xA9buggage acc\xC3\xA9l\xC3\xA9r\xC3\xA9 avec PHP sous linux"
published: true
tags: 
- linux
- netbeans
- php
- symfony
- xdebug
---

Voici une rapide astuce pour ouvrir le code source de votre projet dans netbeans (ou votre éditeur préféré) depuis votre navigateur en cliquant sur les noms des fichiers présents dans les stack traces généré par xdebug ou symfony >= 1.3. 

Créez le fichier `~/bin/netbeans-url-handler.sh` :

{% highlight bash %}
#!/bin/bash 

url=$1 
file=${url#*\/}

# substitution de netbeans://file... par /file.. 
netbeans --open "$file" 
{% endhighlight %}

Ajoutez netbeans dans votre PATH si ce n'est pas déjà fait : 

{% highlight bash %}
export PATH=$PATH:~/bin 
{% endhighlight %}

Support des URL netbeans:// dans gnome (pour KDE il faut chercher comment configurer les url handler avec kfmclient) : 

{% highlight bash %}
gconftool-2 -t string -s /desktop/gnome/url-handlers/netbeans/command '/home/[votre_username]/bin/netbeans-url-handler.sh %s' 
gconftool-2 -t bool -s /desktop/gnome/url-handlers/netbeans/needs_terminal false 
gconftool-2 -t bool -s /desktop/gnome/url-handlers/netbeans/enabled true 
{% endhighlight %}

Configuration de symfony pour substituer les noms des fichiers par des liens html  : 

{% highlight yaml %}
dev:
   .settings:
     file_link_format: "netbeans://%f:%l" 
{% endhighlight %}

On peut aussi configurer cette option par le biais de la variable `xdebug.file_link_format` dans le fichier `/etc/php5/conf.d/xdebug.ini` : 

{% highlight bash %}
sudo echo "xdebug.file_link_format=\"netbeans://%f:%l\"" >> /etc/php5/conf.d/xdebug.ini 
sudo apache2ctl restart 
{% endhighlight %}

Chrome ou Firefox devraient maintenant ouvrir netbeans en cliquant sur les URL au format netbeans://filename:10

Si quelqu'un connait une méthode pour ne pas avoir besoin du fichier netbeans-url-handler.sh je suis preneur ! 

À vous d'adapter ces lignes à votre IDE préféré. En cas de problèmes essayez de rédémarrer votre navigateur ou votre session X. 

Happy coding !
