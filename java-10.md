# RideShare — Java 10

## Çfarë ndërtova
Shtova kërkesat e vendeve që ruhen në Neon. Udhëtari sheh vetëm kërkesën e vet; shoferi sheh kërkesat për udhëtimin që i përket. Shoferi mund ta pranojë një kërkesë. Pranimi ruan statusin dhe ul vendet në të njëjtin veprim, vetëm një herë.

Të dyja pamjet lexojnë gjendjen nga serveri çdo 5 sekonda. Gjatë ndërprerjes shfaqen të dhënat e fundit, veprimet bllokohen dhe pas rilidhjes nis një lexim i ri.

## Përgatitja e provës
Udhëtimi 2 është Ferizaj → AAB, ora 08:15. Në kontrollin e fundit kishte 2 vende. Udhëtimet demo 1 dhe 2 u lidhën me profilin e vetëm real të shoferit në databazë. Për provën duhen dy sesione të ndara: shoferi në njërin shfletues dhe udhëtari në tjetrin.

## Provat që bëra

**Shënim:** Nuk i provova manualisht rrjedhat me dy sesione ose testin offline. Rezultatet e pritshme më poshtë nuk paraqiten si vëzhgime të kryera.

### Prova 1: Kërkesa mbërrin te shoferi
- **Hapat:** Udhëtari dërgon kërkesë për udhëtimin 2; shoferi pret leximin automatik.
- **Prisja:** Udhëtari dhe shoferi shohin “Në pritje”; vendet mbeten 2.
- **Vëzhgimi:** Nuk u provua me dy përdorues në shfletues.
- **Ruajtja:** Tabela e kërkesave u krijua në Neon; nuk kontrollova manualisht rreshtin e kërkesës.

### Prova 2: Pranimi përditëson të dy ekranet
- **Hapat:** Shoferi pranon kërkesën. Pastaj përsërit pranimin dhe provo edhe një udhëtim pa vende.
- **Prisja:** Të dyja pamjet tregojnë kërkesën e pranuar dhe vendet 1. Përsëritja nuk i ul vendet sërish; pa vende, pranimi refuzohet.
- **Vëzhgimi:** Nuk u provua manualisht. Kodi ruan statusin dhe ul vendet në një shkrim të vetëm në databazë.

### Prova 3: Ndërprerja dhe rilidhja
- **Hapat:** Përdor udhëtimin 1 si udhëtim të dytë dhe vendose vetëm shfletuesin e udhëtarit në Network → Offline.
- **Prisja:** Udhëtari mban vlerat e fundit dhe sheh paralajmërimin. Pas rilidhjes, pa Refresh, sheh statusin dhe numrin e ri të vendeve.
- **Vëzhgimi:** Nuk u provua manualisht. Në kontrollin e fundit, udhëtimi 1 kishte vetëm 1 vend; duhet kthyer në 2 për këtë provë.

## Ku gjendet puna
- Ndërfaqja dhe rifreskimi automatik: `aplikacioni/src/components/GjendjaUdhetimit.tsx`.
- Leximi i autorizuar i gjendjes: `aplikacioni/src/lib/kerkesat.ts` dhe `aplikacioni/src/app/api/udhetimet/[id]/gjendja/route.ts`.
- Dërgimi dhe pranimi i kërkesave: `aplikacioni/src/app/api/udhetimet/[id]/kerkesa/route.ts` dhe `aplikacioni/src/app/api/kerkesat/[id]/route.ts`.
- Skema: `aplikacioni/schema-java10.sql` (u ekzekutua në Neon).
- Demo production: [https://aplikacioni-pi.vercel.app/udhetimi/2](https://aplikacioni-pi.vercel.app/udhetimi/2). Deploy-i është `READY`.

## Prova me kolegun
Nuk bëra provë me koleg, ndaj nuk kam hyrje, parashikim ose vëzhgim për të raportuar.

## Çfarë mbetet për përmirësim
Duhet provuar rrjedha me dy llogari GitHub të ndara dhe ndërprerja e rrjetit vetëm te udhëtari. Para testit offline, rivendos udhëtimin 1 në 2 vende. Build-i kaloi, por prova e build-it nuk vërteton sjelljen reale në dy pajisje.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Përdora AI për kodin, migrimin e skemës dhe këtë raport. Verifikova build-in, ekzekutova migrimin në Neon dhe publikova aplikacionin në Vercel. Nuk ekzekutova provat manuale me dy sesione ose testin offline.

## Pas dorëzimit të parë — përditëso më vonë
Pas përgjigjes, shto linkun e Issue-t, commit-in e kontrolluar dhe çfarë kaloi ose duhet korrigjuar. 2/2 teknikisht nuk provon funksionimin e aplikacionit.
