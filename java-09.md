# RideShare — Java 9

## Çfarë ndërtova
Shtova ruajtjen e udhëtimeve te të preferuarat për përdoruesin e kyçur. Ndërfaqja reagon menjëherë dhe rikthehet në rast gabimi. Serveri parandalon kopjet për të njëjtin përdorues dhe udhëtim.

## Provat që bëra

**Shënim:** Provat nuk u ekzekutuan në këtë seancë; rezultatet më poshtë janë pritshmëri.

### Prova 1: Ruajtja pas rifreskimit
Ruaje udhëtimin 2 dhe rifresko faqen. Preferimi pritet të mbetet. Kërkohet migrimi i databazës.

### Prova 2: Dështimi i ruajtjes
Shtyp “Simulo refuzimin në server”. Pritet që ylli dhe numri të kthehen si më parë dhe të shfaqet mundësia për riprovim.

### Prova 3: Klikimet e përsëritura
Përsërit ruajtjen për të njëjtin udhëtim. Çelësi unik pritet të sigurojë vetëm një preferim.

## Ku gjendet puna
Kodi: `Preferimi.tsx`, `api/preferimet/route.ts`, faqja e udhëtimit dhe `schema-java09.sql`.

Link publik production: [https://aplikacioni-pi.vercel.app/udhetimi/2](https://aplikacioni-pi.vercel.app/udhetimi/2).

## Çfarë mbetet
Ekzekuto migrimin `aplikacioni/schema-java09.sql` në Neon dhe provo ruajtjen, rifreskimin dhe kërkesat e përsëritura me një përdorues të kyçur. Deploy-i i Vercel-it nuk ekzekuton migrimin.

## Ndihma nga AI
Përdora AI për kodin dhe raportin. Kontrollova kodin dhe `git diff --check`, por nuk ekzekutova aplikacionin ose provat.
