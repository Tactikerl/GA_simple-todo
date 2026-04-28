# Simple Todo CRUD

En demo-applikasjon som viser CRUD-operasjoner (Create, Read, Update, Delete) mot et REST-API, bygget med vanilla HTML, CSS og TypeScript. Prosjektet brukes i undervisning i operasjonell frontendutvikling ved Gokstad Akademiet.

## Om prosjektet

Simple Todo CRUD er en enkel oppgaveliste der man kan opprette, lese, oppdatere og slette oppgaver. Frontenden kommuniserer med [CrudOps](https://github.com/eskjelbred/GA_crudops-fork-with-login) — et JSON-basert API som kjører lokalt. Denne forken av [det opprinnelige CrudOps-API-et](https://github.com/vegarcodes/crudops) inneholder en innloggingsfunksjon som returnerer API-nøkkelen, slik at man slipper å bruke nøkkelen direkte i koden. Nøkkelen lagres i `localStorage` etter innlogging.

`main`-branchen inneholder utgangspunktet med ferdig HTML/CSS og en `src/main.ts` full av TODO-oppgaver. Etterhvert som vi jobber oss gjennom stoffet i undervisningen, vil nye brancher vise frem løsningene steg for steg.

## Brancher

| Branch                         | Beskrivelse                                      |
| ------------------------------ | ------------------------------------------------ |
| `main`                         | Startpunkt med HTML, CSS og TODO-er i TypeScript |
| `Intro-CRUD-(uten-innlogging)` | Grunnleggende CRUD uten autentisering            |
| `Med-innlogging`               | Utvidet med innlogging og brukerhåndtering       |
| `Med-URL-search-params`        | Navigasjon til enkeltoppgaver via URL-parametre  |

## Forutsetninger

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) og npm
- En lokal kjørende instans av [CrudOps (fork med innlogging)](https://github.com/eskjelbred/GA_crudops-fork-with-login) — følg instruksene i README-en der for å sette opp og starte API-et.

## Kom i gang

### 1. Sett opp API-et (CrudOps)

Klon og sett opp [CrudOps (fork med innlogging)](https://github.com/eskjelbred/GA_crudops-fork-with-login) ved å følge instruksene i repoets README.

### 2. Åpne frontenden

Klon dette repositoryet og installer avhengigheter:

```bash
git clone <repo-url>
cd GA_simple-todo
npm install
```

Start utviklingsserveren:

```bash
npm run dev
```

### 3. Koble frontend til API

Åpne `src/api.ts` og fyll inn `BASE_URL` — adressen til CrudOps-API-et (f.eks. `http://localhost:3000/api`). API-nøkkelen hentes automatisk via innlogging og lagres i `localStorage`.

## Filstruktur

```
GA_simple-todo/
├── index.html          # Hovedside med skjema og oppgaveliste
├── public/
│   └── icons.svg       # Ikoner
├── src/
│   ├── api.ts          # API-kall mot CrudOps (fetch-funksjoner)
│   ├── main.ts         # Hovedlogikk med DOM-manipulasjon og eventlyttere
│   ├── types.ts        # TypeScript-typer for Todo og LoginResponse
│   └── style.css       # Styling for hele applikasjonen
├── package.json        # Avhengigheter og scripts (Vite + TypeScript)
├── tsconfig.json       # TypeScript-konfigurasjon
└── README.md
```

## Oppgaver

`src/main.ts` og `src/api.ts` inneholder en rekke TODO-er som dekker:

- Henting av data med `fetch` (GET)
- Oppretting av oppgaver (POST)
- Oppdatering av eksisterende oppgaver (PATCH)
- Sletting av oppgaver (DELETE)
- Dynamisk rendering av DOM-elementer
- Skjemahåndtering og validering
- Innlogging og autentisering
