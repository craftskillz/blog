---
title: "Restez productifs et en sécurité avec vos propres outils autonomes"
excerpt: "Votre environnement de travail est ultra-sécurisé et bloque vos outils habituels ? Vous pouvez facilement construire votre propre mini-dashboard de productivité, en utilisant l'IA, avec un simple fichier HTML, du JavaScript et du CSS, sans dépendance externe, sans CDN, et sans compromis sur la sécurité."
coverImage: "/assets/blog/stay-secure-and-productive/cover.jpg"
date: "2026-01-01T11:42:06.163Z"
author:
  picture: "/assets/blog/authors/yma_logo.png"
ogImage:
  url: "/assets/blog/stay-secure-and-productive/cover.jpg"
---

Il peut vous arriver de travailler dans des environnements **hautement sécurisés** et surtout **hautement contraignants** : pas d'accès à certains logiciels classiques de suivi des tâches, pas d'accès aux CDN standards, etc.

Or, vous le savez par expérience : votre productivité est fortement liée à votre capacité à vous **libérer cognitivement** de certaines tâches en les consignant dans un outil de suivi, puis à les reprendre chaque matin en partant d'un **dashboard** qui en garde la trace.

Pour répondre à ce problème tout en respectant les **exigences de sécurité** de votre environnement, une solution existe : construire votre propre outil en combinant HTML, JavaScript Vanilla[^1] et CSS Vanilla[^1].
Concrètement, vous obtenez un simple **fichier HTML** que vous déposez sur votre bureau et qui, grâce au `localStorage` de votre navigateur, conserve vos données même après fermeture et réouverture de celui-ci.

Aucune dépendance externe, aucun serveur, **aucune communication avec l'exterieur**, aucune faille dans le périmètre de sécurité tout se passe en local, pas besoin de serveur, de librairie, c'est un **fichier de votre bureau que vous ouvrez dans votre navigateur.**

> [!INFO inline]
> C'est comme si vous utilisiez un papier et un stylo avec votre propre bloc note, à part que là c'est avec des capacités du web, mais en local.

## L'IA à la rescousse

Une fois ce parti pris technique posé, du **HTML brut**, du **JavaScript** et du **CSS** uniquement, vous pouvez vous faire accompagner par un assistant de code IA pour générer l'application qui vous conviendra.

Les LLM récents et compétitifs **maitrisent particulièrement bien ces languages** et si vous savez bien prompter et découper les tâches vous pouvez faire des choses très propres.

J'ai justement **conçu une** application sur le même principe que je mets à **votre disposition**.
<br/>
Le code est simple à comprendre et pourtant ses fonctionnalités sont cool et bien pratiques. D'ailleurs vous pouvez même **cliquer dessus** pour la **tester**.

Elle est libre de droits et disponible sur mon dépôt Git : <a href="https://github.com/ymedaghri/doc-survival-kit" target="_blank">github.com/ymedaghri/doc-survival-kit</a>

Vous pouvez aussi l'installer sur votre ordinateur en tant qu'utilitaire via `npx doc-survival-kit`<br/>
Plus d'infos sur <a href="https://www.npmjs.com/package/doc-survival-kit" target="_blank">www.npmjs.com/package/doc-survival-kit</a>

> [!TIP]
> Cliquer sur l'image pour tester l'application directement depuis le blog
>
> <a href="/assets/blog/stay-secure-and-productive/index.html" target="_blank">
>   <img src="/assets/blog/stay-secure-and-productive/mon_dashboard.png" alt="Mon mini dashboard" />
> </a>

[^1]: Le terme « Vanilla » (JavaScript ou CSS) signifie que l'on n'utilise aucune bibliothèque tierce, uniquement les fonctionnalités natives du langage, disponibles dans tous les navigateurs.
