---
title: "Une documentation qui vit avec votre code"
excerpt: "La documentation meurt le jour où elle est écrite. Elle devient obsolète,
oubliée, difficile à retrouver. Et si au lieu de la reléguer dans un Confluence ou
un Notion qu'on n'ouvre plus, on la gardait là où elle appartient : à côté du code,
en Markdown, éditable en un clic ?"
coverImage: "/assets/blog/living-documentation/living-documentation-cover.jpg"
date: "2026-03-22T10:00:00.000Z"
author:
  picture: "/assets/blog/authors/yma_logo.png"
ogImage:
  url: "/assets/blog/living-documentation/living-documentation-cover.jpg"
---

La documentation, c'est le parent pauvre du développement logiciel.

Tout le monde sait qu'elle est importante. Tout le monde reconnaît qu'elle manque.
Et pourtant, elle reste **la dernière chose** qu'on écrit, et **la première** qu'on
néglige quand le temps presse.

Le problème n'est pas **uniquement** le manque de bonne volonté.
<br/>
C'est que les outils habituels
créent trop de **friction** : ouvrir Confluence, se logger, trouver le bon espace,
créer une page, la formater... plus on accumule de la friction, moins on écrit et au final, la documentation reste dans les têtes, ou dans des fichiers Markdown éparpillés que personne ne consulte parce qu'il n'existe aucun endroit pour les lire confortablement.

> [!NOTE]
> Ce post parle d'un outil OpenSource que j'ai créé au départ pour mes besoins perso, pour minimiser cette friction et me faciliter la vie dans la documentation de mes projets.

## L'idée : des fichiers Markdown servis localement

Perso, sur tous mes projets j'ai un dossier doc/adrs et je le lance via npx comme un doc portal local sur n'importe quel projet
C'est vraiment moins de friction, et la doc vit dans la base de code

On finit par avoir des **documentations mortes** : ce diagramme d'architecture qui montre encore le microservice qu'on a supprimé il y a six mois, ce `CONTRIBUTING.md` dont les commandes ne fonctionnent plus depuis la migration vers un nouveau tooling, cet ADR qui décrit un choix d'infrastructure que l'équipe a abandonné sans laisser de trace... La documentation morte est pire que l'absence de documentation : **elle induit en erreur**.

Cyrille Martraire dans son ouvrage **"Living Documentation"** [^1] [^2] formule le problème de façon lumineuse : la documentation, c'est avant tout **"le processus de transmission de connaissances précieuses à d'autres personnes, maintenant et dans le futur"**.
<br/>Ce qui compte, c'est le transfert de connaissance, pas le document en lui-même, et si ce document diverge de la réalité, il trahit exactement ce but.

J'ai voulu résoudre exactement ce problème avec **<a href="https://www.npmjs.com/package/living-documentation" target="_blank">living-documentation</a>**[^3], un petit outil inspiré des réflexions que j'ai découvertes dans le livre **"Living Documentation"** [^1] [^2] de Cyrille Martraire.

Le parti pris est simple : vos fichiers `.md` restent dans votre dépôt, à côté de
votre code, et un outil local les sert dans un **viewer élégant et fonctionnel**, accessible depuis votre navigateur.

```bash
npx living-documentation ./docs
```

C'est tout. Votre documentation s'ouvre à `http://localhost:4321`.

## Le markdown : un incontournable avec la coding par agents IA

Les ADRs sont utilisés depuis longtemps comme manière de documenter un projet, bien avant que les LLM ne soient connus et utilisés, l'acronyme ADR signifiant **Architecture Decision Record** [^5].
<br/>
Ils sont écrits en **markdown**, portent par nature la date de leur création au sein même de leur nommage, sont **immuables** [^6], présentent les avantages et inconvénients de telle ou telle approche, paradigme, librairie, concept, framework, peuvent contenir des diagrammes (C4 Model, Mermaid, ...)

Leur rôle est de tracer des décisions que l'on prend en tant que développeur, tech lead ou architecte logiciel et sont accessibles car déposés avec le code lui même, souvent dans un dossier `doc/adr`, `documentation`, `adrs` ...

Avec l'avènement et le succès des développements pilotés par l'IA, le Markdown est devenu omniprésent : fichiers **CLAUDE.md**, **SKILLS.md**, **RULES.md**, **README.md**...
<br/>
En effet le Markdown est une syntaxe simple pour écrire des documents, facile à apprendre, compréhensible aisément par des humains **ET** par les LLM, ce qui fait son indéniable succès aujourd'hui.

Le **context engineering** repose beaucoup sur un ensemble de principes d'écriture, de maintenance, de découpage de ces fichiers Markdown justement, en permettant de scinder les ADRs par exemple et de les associer à une table des matières au sein du **README.md** ou **CLAUDE.md**, permettant ainsi au LLM de ne pas surcharger inutilement sa fenêtre de contexte [^7].

## Deux familles de documentation vivante

Il existe en réalité deux grandes familles de documentation vivante, et elles sont complémentaires.

La première est la documentation **générée** : elle est extraite directement du code ou des outils, et ne peut donc jamais diverger de la réalité. On y trouve la documentation d'API via **OpenAPI**, les spécifications exécutables en **BDD/Gherkin**, les schémas de base de données générés par des outils comme SchemaSpy, les diagrammes-as-code avec C4Model ou Mermaid... Ces approches ont une propriété remarquable : si le code change, la documentation change avec lui. Elle est **vivante par construction**.

La seconde est la documentation **écrite**, et c'est là que réside le vrai défi. Certaines choses ne peuvent tout simplement pas être générées : le contexte d'une décision d'équipe, les contraintes organisationnelles, les expériences passées, les compromis acceptés, les conventions de nommage.
<br/>
Les ADRs en sont l'exemple le plus pur, cette documentation-là dépend entièrement de la **discipline humaine**, et c'est précisément pour la soutenir que **<a href="https://www.npmjs.com/package/living-documentation" target="_blank">living-documentation</a>**[^3] a été conçu.

## Vers une capitalisation des pratiques

J'utilise beaucoup l'IA et le développement **piloté par agents**, et donc de là également le **context engineering**, les Markdowns, MCP, agents, skills...
<br/>
Mais ce qui m'intéresse ici c'est l'aspect **documentaire** de cette approche.
<br/>
En effet, c'est à la fois mon(mes) **LLM** et moi-même qui gardons un œil en permanence sur ces fichiers pour suivre les avancées, les **décisions prises**, les **manières d'implémenter** telle notion, les conventions de nommage, les règles de styles de la partie frontend, les tests, l'utilisation de fichiers `just`[^8] (comme pour les Makefiles d'antan) contribuant aussi au principe de documentation vivante.

## L'édition inline : là où la documentation devient vraiment vivante

Pour simplifier cette gestion des **Markdown**, en particulier leur **édition**, leur **lecture**, l'ajout de **diagrammes** et **d'images**, j'ai développé l'outil dont je vous ai parlé au début de ce post.

La documentation vivante n'est pas un concept nouveau. Cyrille Martraire en parle depuis des années, et les ADRs existent bien avant les LLM. Ce qui change aujourd'hui, c'est que l'IA nous oblige à **remettre la documentation au centre**, non plus comme une corvée optionnelle, mais comme un **artefact de première classe** qui nourrit nos agents autant qu'il nous informe nous-mêmes.

Pour la partie générée, l'écosystème est déjà riche : OpenAPI, BDD, diagrammes-as-code... ces outils font leur travail. Le maillon faible a toujours été la **documentation écrite**, celle qui capture le pourquoi, le contexte, l'histoire. C'est là que la friction tue la discipline, et c'est là que **<a href="https://www.npmjs.com/package/living-documentation" target="_blank">living-documentation</a>**[^3] intervient.

Dans ce contexte, avoir ses docs co-localisées avec le code, éditables sans friction, lisibles dans un viewer propre, n'est plus un luxe, c'est une **hygiène de projet**.

**<a href="https://www.npmjs.com/package/living-documentation" target="_blank">living-documentation</a>**[^3] est mon outil pour tenir cette discipline.
<br/>
Il est **simple**, **local**, **sans cloud**, **sans abonnement**, et bien au contraire de beaucoup d'outils qui se monétisent sur la durée, il est **open source sous licence MIT** : vous pouvez l'utiliser, le modifier, le redistribuer librement, parce que je crois que les outils qui soutiennent la discipline de développement doivent rester accessibles à tous.
<br/>
Et parce qu'il tourne en local avec vos fichiers, votre **LLM** peut lui aussi les **lire**, les **enrichir**, les maintenir à jour, en **session de pair programming** ou via un **agent autonome**.

La boucle est bouclée : la documentation qui vit avec le code, lue et écrite par les humains **et** par les machines.

[^1]: (1) [Book on Amazon, Living Documentation: Continuous Knowledge Sharing by Design ](https://www.amazon.fr/Living-Documentation-Cyrille-Martraire/dp/0134689321)

[^2]: (2) [Blog Octo : Living documentation, parce que la doc, ça peut être fun !](https://blog.octo.com/living-documentation-parce-que-la-doc-ca-peut-etre-fun-!)

[^3]: (3) [Outil Living-Documentation sur NPM](https://www.npmjs.com/package/living-documentation)

[^5]: (5) Un **Architecture Decision Record** est un court document qui capture une décision architecturale significative : le contexte qui l'a motivée, les options envisagées, la décision retenue et ses conséquences. Initialement le nom complet était LADR (LightWeight Architecture Decision Records) pour insister sur le fait qu'un ADR doit être concis. Le format a été popularisé par Michael Nygard dans [Documenting Architecture Decisions (2011)](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).

[^6]: (6) Cela signifie qu'une fois écrit on ne doit pas les modifier car ils contiennent l'historique des décisions prises au cours du cycle de vie du projet ; les modifier reviendrait à réécrire l'histoire du projet, or on apprend de ses échecs autant que de ses succès (voire davantage).

[^7]: (7) La fenêtre de contexte (context window) désigne la quantité maximale de texte qu'un LLM peut traiter en une seule fois. Charger tous les fichiers Markdown d'un projet d'un coup peut la saturer inutilement ; mieux vaut structurer la documentation pour ne charger que ce qui est pertinent à la tâche en cours.

[^8]: (8) Un **justfile** est un fichier de recettes de commandes propulsé par l'outil `just`, un task runner moderne inspiré des Makefiles, mais avec une syntaxe plus claire et sans les pièges historiques de `make` (tabulations obligatoires, gestion des dépendances de fichiers, etc.). On y définit des commandes nommées (`just build`, `just test`, `just deploy`...) que `just --list` affiche avec leur description. C'est une forme de documentation vivante : les commandes disponibles sont toujours à jour puisqu'elles sont le code lui-même. Plus d'infos sur [just.systems](https://just.systems).
