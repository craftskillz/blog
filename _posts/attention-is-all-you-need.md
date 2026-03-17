---
title: "Attention is all you need"
excerpt: "Quand on parle d'IA, et de LLM en particulier, on entend souvent la même explication : ce ne serait pas vraiment de l'intelligence, juste une machine très douée pour calculer des probabilités sur des mots. Et il faut reconnaître que cette explication a le mérite d'être rassurante.
Sauf que quand on creuse un peu, les choses sont moins simples."
coverImage: "/assets/blog/attention-is-all-you-need/attention_cover.jpg"
date: "2026-03-17T10:35:07.322Z"
author:
  name: Y. Medaghri-Alaoui
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/attention-is-all-you-need/attention_cover.jpg"
---

Quand on parle d'**IA**, et de **LLM** en particulier, on entend souvent la même explication : ce ne serait **pas vraiment** de l'intelligence, juste une machine très douée pour **calculer** des **probabilités** sur des **mots**. Et il faut reconnaître que cette explication a le mérite d'être rassurante.<br/>
Sauf que quand on creuse un peu, les choses sont moins simples.

Ce qui est certain, c'est que l'**IA ne fonctionne pas** de la même **manière** que **nous**, mais pour autant, elle pourrait bien fonctionner comme une forme d'intelligence, **différente de la nôtre**, mais une intelligence **tout de même**.<br/>
Le débat reste ouvert, mais il mérite qu'on s'y intéresse.

Et pour s'y intéresser, encore faut-il comprendre ce qui se passe **sous le capot**.

Quand j'étais étudiant, on nous a parlé de la RAM, des cartes mères, des processeurs, du pipeline, de la heap, de la stack, pas parce qu'on en avait besoin au quotidien, mais parce que cette **vision** des **mécanismes bas niveau** nous permettait de **mieux raisonner** sur les programmes qu'on construisait.

Avec les LLM, je pense que c'est pareil, pour évoluer avec cette technologie, il faut qu'on ait une vision à peu près claire de ce qui se passe à l'intérieur.

C'est ce que je vous propose avec une série d'articles qui commence par celui-ci : un exercice de vulgarisation très élémentaire, pour toucher du doigt ce qui se passe à l'intérieur de ces modèles.

Des liens en notes de bas de page sont également là pour ceux qui souhaitent aller plus loin

## Commençons !

Voici une phrase : _Le chat que la souris que le chien poursuit regarde dort._

À première vue, vous en pensez quoi ? Cette phrase semble **incorrecte**, elle ne veut **rien dire**, il y a des **mots** en **trop**, des **verbes** en **trop** ?

Et pourtant cette phrase est correcte, essayons d'ajouter un peu de ponctuation, car c'est peut-être bien ce qu'il manque.

_Le chat, que la souris que le chien poursuit regarde, dort._

**Mmm… Ouais, ok**, « le chat dort » cela semble désormais clair. Mais ce qui se passe entre les deux virgules reste encore difficile à saisir.

Ajoutons deux autres virgules.

_Le chat, que la souris, que le chien poursuit, regarde, dort._

Bon d'accord, c'est pas super comme formulation je vous l’accorde, et je ne suis **pas forcément sûr** que mon placement de virgules soit **parfaitement académique** mais pourtant là on comprend le sens : un chien poursuit une souris, qui elle-même regarde un chat, qui lui est en train de dormir.

![Le chat, la souris et le chien](/assets/blog/attention-is-all-you-need/dog_mouse_cat.png)

Pourquoi j'ai pris cet exemple un peu tordu ? C'est seulement pour vous faire toucher du doigt **l'influence** de **certains mots** par rapport à **d'autres** dans une **phrase**.<br/>
C'est volontairement poussé à l'extrême pour que vous puissiez justement **_sentir_** cette influence et comprendre par analogie comment cette influence est **déterminée** en **traversant des couches du modèle d’IA**, comme nous avons ajouté des virgules et **traversé** nos **propres couches** de **compréhension**.

J’aurais également pu prendre un exemple du type : Le reflet de la statue de glace dans la glace du grenier me glaça le sang.<br/>
Ici, le mot **_glace_** apparaît **plusieurs fois**, mais il ne porte **jamais exactement** le même **sens**.
Chaque occurrence doit donc être interprétée différemment.
Pour un **modèle de langage**, cela signifie que ces mots, bien qu’identiques à l’écrit, ne peuvent pas être **représentés** de la même **manière**.

## Le mécanisme d’attention dans les LLM

L'attention, c'est la capacité d'un modèle à relier n'importe quel mot à n'importe quel autre dans une phrase, quelle que soit la distance qui les sépare. C'est ce mécanisme qui permet au modèle de **comprendre** que dans 'Le chat dort', c'est bien le **chat** qui **dort**, et pas autre chose.<br/>
Comment ? En traduisant ces relations en nombres, mais nous y reviendrons.

Ce mécanisme est au cœur de l'architecture dite des **Transformers**, décrite dans un papier fondateur de Vaswani et al. (2017), celui-là même qui donne son titre à cet article.

Regardons comment ça se passe…

Prenons un exemple très simple pour comprendre le mécanisme d'attention : "**Le chat mange la souris**".

Comme lorsqu'à chaque étape nous avons ajouté de la ponctuation pour saisir le sens de la phrase précédente, dans un modèle de langage notre phrase **traverse** des **couches** d’**attention** de manière un peu **similaire**.

Ce qu'il faut comprendre, c'est qu'à l'entrée (au début), chaque mot est **isolé**.C'est juste un mot du dictionnaire, représenté comme une **suite de nombres** qui ne reflète que sa **signification propre**, hors de tout contexte, comme si chaque mot existait seul au monde.

![Embeddings avant attention](/assets/blog/attention-is-all-you-need/embeddings_avant_attention.svg)

Lorsque ces mots traversent les couches d'attention (un peu comme quand nous avons ajouté des virgules et réfléchi à chaque étape au sens), les **nombres** qui les **représentent** se **modifient**. Chaque mot s'enrichit du **contexte** des autres mots qu'il a **observés**.

Couche après couche, ces représentations numériques s'affinent : les mots ne sont plus des entités isolées, ils deviennent les **porteurs** d'un **sens** partagé.

Un vrai modèle compte des dizaines voire des centaines de couches, 96 pour GPT-3, par exemple. **Ici**, nous n'en prendrons que **trois**, pour **l'intuition**.

Observons ce qui se passe au travers de trois couches du modèle.

**Couche 1 — Les associations de base.** Chaque mot commence à regarder ses voisins les plus évidents. "Chat" regarde "Le" et comprend qu'on parle d'un chat **spécifique**, pas des chats en général. "Souris" regarde "la" de la même façon. "Mange" regarde un peu partout mais ne sait **pas encore bien** qui mange qui.

![Couche 1, Associations locales](/assets/blog/attention-is-all-you-need/attention_couche_1_associations_locales.svg)

**Couche 2 — Les rôles se précisent.** Les relations grammaticales se forment. "Mange" se connecte fortement à "chat" (c'est lui qui mange) et à "souris" (c'est elle qui est mangée). Le modèle commence à **distinguer** le **sujet** de **l'objet**.

![Couche 2, Rôles grammaticaux](/assets/blog/attention-is-all-you-need/attention_couche_2_roles_grammaticaux.svg)

**Couche 3 — La compréhension globale.** Chaque mot porte maintenant en lui le sens de la phrase entière. "Chat" n'est plus juste un chat, c'est "le chat qui est en train de manger". "Souris" n'est plus juste une souris, c'est "la souris qui se fait manger par le chat". Même "mange" s'est enrichi : c'est "l'action d'un chat sur une souris".

![Couche 3, Compréhension globale](/assets/blog/attention-is-all-you-need/attention_couche_3_comprehension_globale.svg)

![Embeddings apres attention](/assets/blog/attention-is-all-you-need/embeddings_apres_attention.svg)

## L’ entrainement du modèle

Ce mécanisme d'attention que nous venons de décrire, ne se déclenche pas uniquement quand vous posez une question à un chatbot. Il est d'abord au cœur de **l'entraînement** du modèle.

Pendant **des semaines**, sur des **milliers de machines**, le modèle a lu des **milliards de textes**. Pour chaque phrase, il a déroulé ce même processus : les mots se regardent, les connexions se forment, les **vecteurs s'enrichissent**, un peu comme dans nos schémas.<br/>
Mais à l'entraînement, il y a une étape supplémentaire : le modèle **compare** ce qu'il a compris avec ce qu'il aurait dû **comprendre**, et il ajuste ses paramètres en conséquence. Petit à petit, couche après couche, phrase après phrase, ces ajustements s'accumulent et se cristallisent en ce qu'on appelle les **poids** du modèle.

Ces poids, ce sont des nombres. Beaucoup de nombres.<br/>
GPT-3 en compte 175 milliards. GPT-4, probablement plus d'un trillion. Pour donner un ordre de grandeur : si vous écriviez un poids par seconde, sans dormir, sans pause, il vous faudrait plus de 5 000 ans pour noter ceux de GPT-3.<br/>
Stockés sur disque, les poids d'un seul modèle représentent plusieurs centaines de gigaoctets, l'équivalent de dizaines de milliers de films en texte brut, compressés dans une matrice de nombres. Et chacun de ces nombres, pris individuellement, ne veut rien dire. C'est leur agencement collectif, la façon dont ils interagissent entre eux à travers les couches, qui **encode** tout ce que le modèle a "**compris**".

C'est là que réside tout ce que le modèle a appris : pas des phrases mémorisées, mais **des régularités**, des **structures**, une **forme** de **compréhension implicite** du langage. Ce sont eux qui permettent ensuite au modèle, quand vous lui soumettez un prompt, de **réutiliser** le mécanisme d'attention avec **compétence**, de comprendre votre phrase et de générer une réponse cohérente, **mot après mot**.

C'est d'ailleurs pour cela que les **poids** sont le **trésor** le plus précieux des entreprises qui développent ces modèles. L'architecture des **Transformers** est publique, le mécanisme d'attention est décrit dans un papier accessible à tous. Mais les poids, eux, sont le résultat de mois d'entraînement sur des données massives, avec des **ressources de calcul colossales** dont le coût se chiffre en dizaines, voire en **centaines de millions de dollars**.

Ils sont ce qui distingue un modèle performant d'une coquille vide.

## Les mots dans l’espace

Nous avons vu que **chaque mot** est représenté par **une suite de nombres**, un **vecteur**. Mais ces nombres ne sont pas arbitraires. Pendant l'entraînement, le modèle organise ses vecteurs dans un espace mathématique à plusieurs milliers de dimensions.

C'est difficile à visualiser, alors ramenons ça à trois dimensions.

Imaginons un espace vectoriel à 3 dimensions. Dans cet espace, **chaque mot** occupe **une position**. Et les mots qui ont des **sens proches** se **retrouvent proches** dans cet espace vectoriel: "chat" est près de "chien", "roi" est près de "reine", "Paris" est près de "Berlin".

![Mots dans l'espace vectoriel](/assets/blog/attention-is-all-you-need/espace_vectoriel_3d_isometrique.svg)

Mais le plus surprenant, ce n'est pas que les mots proches soient regroupés. C'est que les directions dans cet espace ont un sens.

Prenons un exemple célèbre.<br/>
Si on prend le vecteur du mot "roi", qu'on lui soustrait le vecteur de "homme", et qu'on ajoute celui de "femme", on obtient un vecteur très proche de… "reine".

Autrement dit : roi − homme + femme ≈ reine

Ce n'est pas une métaphore. C'est une opération arithmétique réelle, effectuée sur les nombres qui représentent ces mots. Le modèle **a découvert**, tout **seul**, que la relation "masculin → féminin" peut s'exprimer comme **une direction** dans **l'espace**.

![Vecteurs encodent des relations](/assets/blog/attention-is-all-you-need/vecteurs_roi_reine_3d.png)

C'est cette géométrie qui donne au modèle sa puissance. Les **concepts** ne sont pas stockés dans une table, ils sont **encodés** dans la **structure même de l'espace**. Et cet espace ne se limite pas à des relations simples comme le genre : on y retrouve des directions pour le temps (présent → passé), la géographie (pays → capitale), et bien d'autres relations que le modèle a extraites de ses données d'entraînement.

Le modèle est alors en mesure de **généraliser**.<br/>
Si on lui pose la question “La reine est au roi ce que la femme est à ?”, il répondra, “l'homme”. Et il saura identifier par une direction similaire oncle/tante, neveu/niece, père/mère.

Non pas parce qu'il a mémorisé ces associations, mais parce qu'il a capturé, dans la géométrie de son espace vectoriel, la structure abstraite de la relation entre ces mots.

C'est cette capacité à manipuler des directions dans l'espace qui lui permet de **raisonner** par analogie sur des cas qu'il n'a **jamais rencontrés** tels quels.

C’est aussi pour cette raison que les **vecteurs** n’ont pas 3 dimensions dans les modèles, mais un **très grand nombre** de dimensions (**12 288** pour GPT-3) car les **directions** dans l’espace représentent des concepts (du sens) encodés par ces vecteurs.

## Prédire le mot suivant

Comment le modèle choisit-il le mot suivant ?
C’est en fait la partie qui nous intéresse le plus car c’est en fait ce que font les LLM que nous utilisons quotidiennement (ChatGPT, Claude, Gemini, Mistral, DeepSeek, Llama, …)

Après avoir traversé toutes les couches d'attention, le **dernier mot** de la séquence porte en lui une **représentation** riche de **tout le contexte**. Ce **vecteur** est comme une **flèche** qui pointe dans une **direction précise** de l'espace.

Le modèle compare alors ce vecteur avec ceux de tous les mots de son vocabulaire, des **dizaines de milliers de mots**.<br/>
Plus un mot du vocabulaire est "aligné" avec le vecteur de sortie, plus il a de chances d'être choisi comme mot suivant.

C'est pour cela que les réponses sont souvent **si pertinentes**. Le modèle ne **pioche pas** un mot au **hasard** parmi une liste de **mots fréquents**. Il choisit **celui** dont la **position** dans l'espace **correspond le mieux** à tout ce que les **couches d'attention** ont **construit**, le **sens** de la phrase, les **relations** entre les mots, le **contexte global**.

C'est aussi pourquoi les vecteurs (ou embeddings) possèdent un très grand nombre de dimensions, plusieurs milliers en fait.<br/>
Plus l'espace est grand, plus le modèle peut y encoder de nuances, de relations et de subtilités. C'est dans cette richesse dimensionnelle que **résident** en grande partie les **capacités** de **compréhension** des **modèles**.

Et ce processus se répète. Chaque mot prédit est **ajouté** à la séquence, le modèle repasse par ses couches d'attention avec ce **nouveau contexte**, et prédit le mot suivant. Mot après mot, la **réponse** se **construit**.

C'est ainsi que fonctionne, **en substance**, la “magie” de nos LLM. Pas de véritable magie bien sûr, mais une mécanique élégante où des **vecteurs**, des couches **d'attention** et des **milliards** de **poids** s'articulent pour produire quelque chose qui ressemble **étrangement** à de la **compréhension**.

Maintenant que nous avons une vision claire de ce qui se passe à l'intérieur, je vous propose de nous retrouver pour un prochain article où on s'intéressera à la façon dont on peut amener ces modèles à raisonner, avec des techniques comme le **Chain of Thought**.

Nous aborderons par la suite des sujets comme le prompt engineering, les agents autonomes ou encore le MCP, autant de **concepts** qui **transforment** déjà **concrètement** notre **façon de développer**.
