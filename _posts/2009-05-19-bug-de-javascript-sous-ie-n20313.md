--- 
layout: post
title: "Bug de Javascript sous IE n\xC2\xB020313"
published: true
tags: 
- Bug
- IE
---

À défaut de faire de la pub pour un logiciel libre (ce que j'aimerais continuer d'ici peu) je vais une fois de plus me défouler sur IE. Après un problème de [CSS](/blog/2009/02/03/bug-de-css-sous-ie-n20312), voici une n-ème merveille en provenance de Redmond.

C'est en voulant surveiller le changement de valeur d'un groupe de bouton radio que je me suis rendu compte de ce [serious bug](http://www.quirksmode.org/dom/events/change.html)

> IE fires the event when the checkbox or radio is blurred, and not when it is activated. This is a serious bug that requires the user to take another action and prevents a consistent cross-browser interface based on the change event on checkboxes and radios.

(Voir le très bon site [Quirksmode.org](http://www.quirksmode.org/dom/events/change.html))

Concrètement l'évènement `change` n'est pas levé lorsqu'on clique sur un checkbox/radio mais lors d'un second clic sur un endroit quelconque de la page (correspond à l'évènement onBlur)

Le code était pourtant simple :

{% highlight javascript %}
$('.options input', context).change (function () {
  // Do some stuff
});
{% endhighlight %}

La solution la plus simple est donc de déclencher manuellement les évènement change lors d'un click

{% highlight javascript %}
$('.options input, .options label', context)
    .click (function () {$(this).change();});
{% endhighlight %}

Encore une merveille d'IE qu'il est bon de connaître avant de perdre quelques cheveux.

Aller, je retourne m'attaquer au hasLayout, inline-bloc & co... sous IE bien sûr
