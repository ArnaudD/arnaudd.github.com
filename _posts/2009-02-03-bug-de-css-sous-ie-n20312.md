--- 
layout: post
title: "Bug de CSS sous IE n\xC2\xB020312"
published: true
tags: 
- CSS Bug
- IE
- Microsoft
---

Comment faire du webdesign en HTML/CSS sans devenir fou ?

> CSS and front-end development can be ‘interesting’at times, and shouting at the screen seldom has any affect.

Pour ne pas changer, je viens tomber une 100ème fois sur le bug des blocs qui disparaissent sous IE. Je commence à être rodé et crois reconnaître le bug du hasLayout. [Plusieurs](http://haslayout.net/css/index) [sites](http://www.satzansatz.de/cssd/onhavinglayout.html) sont là pour m'aider, dont [celui de Microsoft](http://msdn.microsoft.com/en-us/library/bb250481.aspx), une honte. Je tente la technique qui consiste à ajouter `zoom: 1;` au conteneur des floats qui posent problème. Cette technique m'a plusieurs fois aidé à résoudre ce bug mais là rien n'a changé.

Après quelques cheveux en moins et quelques recherches, je tombe sur ce [lien](http://www.brunildo.org/test/IE_raf3.html) qui nous dit :

> Un bloc avec une position absolue peut disparaître s'il précède ou suit, dans le code source, un bloc en position flotante. [...] N'importe quel bloc (même un div vide) placé dans le code source entre ces deux bloc résous le problème.

Magnifique ! Une raison de plus de détester/cracher sur IE et Microsoft !

Voici donc le code source final contenant le fameux div vide qui me permet de résoudre le problème :

{% highlight html %}
<div class="page">
  <div id="pub-left">hello from left en position absolute</div>
  <div id="pub-right">hello from right en position absolute</div>

  <div> <!-- Merci Microsoft pour ce div vide !  --> </div>

  <div id="contenu">lorem ipsum en position float</div>
  ...
</div>
{% endhighlight %}

Est-ce qu'un aimable développeur de virus pourrait aider les malheureux webdesigners en créant un petit ver qui supprimerait IE et le remplacerait par Firefox ? Si tu en es un, saches que tu auras le soutiens de toute la communauté des développeurs web pour répandre ton oeuvre !
