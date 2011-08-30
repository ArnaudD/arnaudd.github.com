--- 
layout: post
title: "[M\xC3\xA9mo] Installation de XDebug sous ubuntu"
published: true
tags: 
- netbeans
- php
- xdebug
---

Sous debian, par les paquets :

{% highlight bash %}
sudo aptitude install php5-xdebug
apache2ctl restart
{% endhighlight %}

XDebug devrait être intégré au prochain redémarrage d'apache. Les messages d'erreurs devraient maintenant être un peu plus bavards.

Pour activer le débugage pas à pas dans netbeans (ou autre) :

{% highlight bash %}
echo "xdebug.remote_enable=on" >> /etc/php5/apache2/conf.d/xdebug.ini
apache2ctl restart
{% endhighlight %}

Il ne reste qu'à ajouter des points d'arrêt dans netbeans et faire Ctrl+F5
