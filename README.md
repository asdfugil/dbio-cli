# dbio-cli
## Contents

- [Contents](#Contents)
- [Installing](#Installing)
- [Help message](#command-line-help-message)
- [Commands](#Commands)
  - [details](#details)
  - [search](#search)
  - [topLikes](#topLikes)
  - [totalUsers](#totalUsers)
  - [help](#help)

## Installing

Via npm:

```bash
npm i -g dbio-cli
```
Or, if you don't have npm installed:

Download binaries from the [github release page](https://github.com/Assfugil/dbio-cli/releases/tag/latest) .

## Command line help message

```
Options:
  -V, --version              output the version number
  -h, --help                 display help for command

Commands:
  details <slug_or_user_id>  Display user details
  search <query>             Search for profiles, sorted by upvotes
  topLikes                   Show the most upvoted profiles, sorted by upvotes
  totalUsers                 Display approximate discord.bio user count
  help [command]             display help for command
```
## Commands
### details
Display user details

**Example:** `dbio details nick` outputs

```xl
Nick Chan#0001(nickchan)
❤️ 1 likes

Description: Just another random developer.

https://www.npmjs.com/package/discord.bio/
User ID:570634232465063967
Flags: house bravery
Details
┌────────────┬──────────────────────────┐
│  (index)   │          value           │
├────────────┼──────────────────────────┤
│  location  │       'Hong Kong'        │
│   gender   │          'male'          │
│   email    │ 'towinchenmi@gmail.com'  │
│ createdAt  │ 2020-02-21T02:22:06.000Z │
│ occupation │    '[object Object]'     │
└────────────┴──────────────────────────┘
Connections
┌─────────┬──────────────────────────────┐
│ (index) │            value             │
├─────────┼──────────────────────────────┤
│ github  │          'Assfugil'          │
│ website │ 'https://Assfugil.github.io' │
└─────────┴──────────────────────────────┘

```

### search

Search for profiles, sorted by upvotes

**Example:** `dbio search nick` outputs

```
┌──────────────────────┬────────────┬──────────────────────┬──────────┬───────┬─────────┐
│       (index)        │    slug    │       User ID        │ Verified │ Staff │ Premium │
├──────────────────────┼────────────┼──────────────────────┼──────────┼───────┼─────────┤
│ Nick Chan#0001 (↑ 5) │ 'nickchan' │ '570634232465063967' │  false   │ false │  false  │
│   Nick#7894 (↑ 4)    │   'nick'   │ '161866437579898881' │  false   │ false │  false  │
│  Nickeo#0337 (↑ 0)   │  'nickeo'  │ '314759419197915137' │  false   │ false │  false  │
│  !Nick.S#3589 (↑ 0)  │  'nicks'   │ '523494475973132309' │  false   │ false │  false  │
│  nickpdx#2884 (↑ 0)  │ 'nickpdx'  │ '302915598038335490' │  false   │ false │  false  │
└──────────────────────┴────────────┴──────────────────────┴──────────┴───────┴─────────┘
```

### topLikes

Show the most liked user, sorted by upvotes.

```
Showing page 1 of 560
┌───────────────────────────────────────┬─────────────┬──────────────────────┬──────────┬───────┬─────────┐
│                (index)                │    slug     │       User ID        │ Verified │ Staff │ Premium │
├───────────────────────────────────────┼─────────────┼──────────────────────┼──────────┼───────┼─────────┤
│        IBO#4515 (❤️ 145 likes)        │    'ibo'    │ '465207798968614923' │   true   │ false │  true   │
│        MXE#4680 (❤️ 94 likes)         │    'mxe'    │ '343862533570166785' │   true   │ false │  true   │
│      Zine Rù#0007 (❤️ 78 likes)       │ 'trustzine' │ '490546269832609792' │  false   │ false │  false  │
│       Dramex#0001 (❤️ 74 likes)       │  'dramex'   │ '157605500488384512' │   true   │ false │  true   │
│       iaqua#0001 (❤️ 58 likes)        │   'iaqua'   │ '713486249121415208' │  false   │ false │  true   │
│      Melmsie#0001 (❤️ 51 likes)       │  'melmsie'  │ '172571295077105664' │   true   │ false │  true   │
│      Valentín#1080 (❤️ 46 likes)      │ 'valentin'  │ '520453145143279637' │   true   │ false │  true   │
│        ven#7051 (❤️ 45 likes)         │     'v'     │ '204616460797083648' │  false   │ true  │  true   │
│        W6N#0003 (❤️ 42 likes)         │    'w6n'    │ '566904571096465418' │  false   │ false │  false  │
│ !     KS.BAHZAD🚬#5948 (❤️ 40 likes)  │  'bahzad'   │ '525410311897874445' │  false   │ false │  false  │
│     scintilla#0001 (❤️ 33 likes)      │ 'scintilla' │ '702373433677185054' │   true   │ true  │  false  │
│     ! 3mr , 71#0071 (❤️ 31 likes)     │   '3mr71'   │ '689499836541960303' │  false   │ false │  false  │
│      𝙃𝙮𝙧𝙤#8938 (❤️ 29 likes)      │  'xhyrom'   │ '491999008106217473' │  false   │ false │  false  │
│   'PG | Redka DZ#0079 (❤️ 28 likes)   │  'redkdz'   │ '698573321096134656' │  false   │ false │  false  │
│    DrZheerツ🇩🇪#5777 (❤️ 28 likes)    │  'shroud'   │ '555832684837077040' │  false   │ false │  false  │
│       Aiphey#0666 (❤️ 25 likes)       │  'aiphey'   │ '327272032863649793' │  false   │ false │  false  │
│        Salo#0001 (❤️ 24 likes)        │   'salo'    │ '250716778949378059' │  false   │ false │  false  │
│   DE | SMASHER !#0001 (❤️ 23 likes)   │ 'smasheryt' │ '428109022328258562' │  false   │ false │  false  │
│       Dubsty#1075 (❤️ 22 likes)       │  'dubsty'   │ '320989222171312128' │   true   │ false │  false  │
│ - Mas I 7MooD . Hm#6666 (❤️ 22 likes) │  'skiner'   │ '429140753386831882' │  false   │ false │  false  │
│      ArchoLek#0001 (❤️ 22 likes)      │ 'archolek'  │ '590636977100161038' │  false   │ false │  false  │
│       Maniz#0001 (❤️ 20 likes)        │   'maniz'   │ '254321678270726144' │   true   │ false │  false  │
│      Derrios#0001 (❤️ 19 likes)       │  'derrios'  │ '264320223182585858' │   true   │ false │  true   │
│       Dylan™#0001 (❤️ 18 likes)       │    'dyl'    │ '301596835024207873' │  false   │ false │  false  │
│        Vane#0002 (❤️ 18 likes)        │   'vane'    │ '592244365490126878' │  false   │ false │  false  │
│      GrifGrif#0001 (❤️ 17 likes)      │ 'grifgrif'  │ '401430491481374720' │   true   │ false │  true   │
│       Darky#0001 (❤️ 17 likes)        │   'darky'   │ '336584648518008832' │  false   │ false │  false  │
└───────────────────────────────────────┴─────────────┴──────────────────────┴──────────┴───────┴─────────┘
```

### totalUsers
Shows approximate discord.bio user count.

Example: `dbio totalUsers` outputs

```
15120
```
### help
Shows help message. Please see [here](#command-line-help-message)
