# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova
Lista e udhëtimeve dhe faqja e detajeve lexojnë të dhënat direkt nga databaza Neon përmes pyetjeve SQL. API route në aplikacion bën query te tabela `udhetimet` dhe kthen rezultatet si JSON, të cilat pastaj shfaqen në kartat e listës dhe në faqen e detajeve.

## Provat që bëra
### Prova 1: Ndryshimi në databazë shfaqet në aplikacion
Ndryshova orën e udhëtimit me ID 2 nga **08:15** në **08:25** në SQL Editor. Pas rifreskimit, lista tregoi orën e re 08:25 dhe faqja e detajeve gjithashtu. Pasi e ktheva përsëri në 08:15 dhe rifreskova, të dyja u kthyen në vlerën origjinale.

### Prova 2: Lista bosh dhe rikthimi
Vendosa `WHERE false` vetëm te pyetja `lexoUdhetimet`. Aplikacioni tregoi mesazhin **“Nuk ka udhëtime të disponueshme”**. Pasi hoqa `WHERE false`, rifreskova dhe u kthyen tri kartat e udhëtimeve si më parë.

### Prova 3: Lidhja mungon, rikthimi dhe siguria
Ndryshova përkohësisht emrin e variablës `DATABASE_URL` në `.env.local` dhe rinisa serverin. Aplikacioni tregoi mesazhin **“Gabim në lidhje me databazën”**. Pasi riktheva emrin e saktë dhe rinisa serverin, lidhja punoi sërish. `.env.local` nuk shfaqet në listën e GitHub Desktop sepse është i përjashtuar nga `.gitignore`.

## Ku gjendet puna
- `schema.sql` (definimi i tabelës `udhetimet`)
- Skedarët e ndryshuar: `src/app/api/udhetimet/route.ts`, `src/app/page.tsx`
- Repository: [https://github.com/bleriondugolli/rideshare-mobile](https://github.com/bleriondugolli/rideshare-mobile)
- Deploy në Vercel (opsional këtë javë): [https://rideshare-mobile.vercel.app](https://rideshare-mobile.vercel.app)

## Çfarë mbetet për përmirësim
Një kufizim është që sistemi aktual vetëm lexon dhe shfaq udhëtime, pa rezervim real. Hapi i ardhshëm është të shtohet funksionaliteti për krijimin e rezervimeve dhe menaxhimin e statusit të tyre.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Mora ndihmë nga AI për të kuptuar si të lidhem me Neon, si të vendos `DATABASE_URL` në `.env.local`, dhe si të bëj deploy në Vercel. Provat dhe verifikimet i bëra vetë në aplikacion.
