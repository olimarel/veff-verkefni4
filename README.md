## Verkefni 4

React framendi fyrir sýnilausn settur upp með next.js.

pages/ mappa notuð fyrir síður

## Uppsetning og keyrsla

Til að setja allt verkefni upp í einu:
```bash
npm run setup
```

Ef villa kemur upp þarf að hreinsa gagnagrunn:
```bash
cd backend/
npx prisma db push --force-reset
```

Til að keyra bakenda og framenda saman:
```bash
npm run dev
```

## Bakendi

Sýnilausn að verkefni 3 notuð.

### Uppskipting bakenda

1. Hono sér um vefþjónustulagið
2. Hjálparföll sjá um að staðfesta gögn
3. Interface og types notuð til að útfæra _hvernig_ gögnum er skaffað fyrir vefþjónustu
4. Prisma notað til að sækja gögn úr gagnagrunni
5. „Static“ gögn líka möguleiki

### Test fyrir bakenda

Test skrifuð með vitest. Til að keyra test:

```bash
cd backend/
npm run test
```

## Eslint

Eslint aðeins sett upp fyrir framenda þar sem bakendi var nú þegar til.

Til að keyra:


```bash
cd frontend/
npm run lint
```
