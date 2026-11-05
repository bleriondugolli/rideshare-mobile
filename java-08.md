# RideShare — Java 8

## Çfarë ndërtova
Shtova mundësinë që përdoruesi ta shkruajë e ta konfirmojë vetë vendtakimin, si dhe një kërkesë të vendndodhjes që niset vetëm kur klikohet butoni. Aplikacioni jep mesazhe të ndryshme për lejen e refuzuar, vendndodhjen e padisponueshme dhe timeout-in. Faqja `/java-08-test` shërben për provë; konfirmimi nuk ruhet në databazë.

## Provat që bëra
### Prova 1: Leja nuk kërkohet sapo hapet faqja.
Hapat: Hapa `/java-08-test` në localhost dhe rifreskova faqen. Pastaj klikova “Përdor vendndodhjen time”.

Pritshmëria: Faqja hapet pa kërkuar vendndodhjen. Para klikimit, statusi tregon se vendndodhja nuk është kërkuar; kërkesa nis vetëm pas klikimit.

Vëzhgimi: Pas hapjes dhe rifreskimit u shfaq “Vendndodhja nuk është kërkuar.” dhe nuk u shfaq kërkesë lejeje. Pas klikimit u shfaq “Po kërkojmë vendndodhjen…”, pastaj “Pozicioni u mor.” dhe saktësia 68 m. Ky shfletues nuk shfaqi një dritare të re lejeje gjatë klikimit, ndaj pranimi i një kërkese të freskët nuk u verifikua; u verifikua përgjigjja e suksesshme e shfletuesit. Nuk regjistrova ose publikova koordinata.

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin.
Hapat: Në localhost dhe në faqen HTTPS të Vercel hapa detajet, klikova “Përdor vendndodhjen time” dhe simulova përgjigjen `PERMISSION_DENIED` (`error.code === 1`) në shfletuesin e provës. Pastaj shkrova “Parkingu” dhe e konfirmova; lokalisht u ktheva te lista dhe hapa përsëri detajet.

Pritshmëria: Shfaqet “Leja u refuzua. Shkruaj vendtakimin vetë.”, pritja përfundon dhe vendtakimi mund të shkruhet e konfirmohet pa leje vendndodhjeje.

Vëzhgimi: Në të dyja adresat u shfaq mesazhi i pritshëm, pritja përfundoi dhe butoni u aktivizua sërish. “Vendtakimi i konfirmuar: Parkingu” u shfaq pas konfirmimit. Lokalisht lista u hap dhe detajet e udhëtimit u hapën përsëri. Refuzimin e simulova në shfletues; nuk ndryshova lejen Location në pajisje.

Provë shtesë — Hapat: Simulova sërish refuzimin në build-in lokal dhe shkrova “Kafeneja”.

Pritshmëria: Shfaqet mesazhi për refuzimin, dhe pas konfirmimit vendtakimi bëhet “Kafeneja”.

Vëzhgimi: Mesazhi u shfaq dhe vlera e konfirmuar u bë “Kafeneja”. Këtë provë e bëra vetë, jo me koleg. Pas rikontrollit automatik, korrigjova klasifikimin te `aplikacioni/src/components/Vendtakimi.tsx` që përdor kodet standarde numerike `1` (refuzim), `2` (i padisponueshëm) dhe `3` (skadim), pa u varur nga konstante shtesë në objektin e gabimit.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale.
Hapat: Shqyrtova raportin dhe skedarët e provës `aplikacioni/src/components/Vendtakimi.tsx`, `aplikacioni/src/components/Java08Test.tsx` dhe `aplikacioni/src/app/java-08-test/page.tsx`, si dhe rregullat te `aplikacioni/.gitignore`.

Pritshmëria: Skedarët e provës nuk përmbajnë koordinata reale, adresa personale ose sekrete. Koordinatat nuk shfaqen apo ruhen nga kjo provë; të dhënat e ndjeshme lokale nuk përfshihen në publikim.

Vëzhgimi: Në skedarët Java 8 që shqyrtova nuk gjeta koordinata reale, adresa personale ose sekrete. Kodi merr nga shfletuesi vetëm saktësinë dhe nuk e ruan vendndodhjen në databazë; emrat si “Parkingu”, “Kafeneja” dhe “Biblioteka” janë hyrje prove. `.gitignore` përjashton `.env*.local` dhe `.vercel`. Nuk kontrollova përmbajtjen e databazës. Në ndryshimet e tjera të projektit, `aplikacioni/schema-java05.sql` përdor emrin “Driton” për profilin demo; nuk mund ta vërtetoj nëse është fiktiv, prandaj duhet verifikuar para publikimit.

### Simulim timeout-i (provë shtesë).
Hapat: Për simulim në zhvillim shtova përkohësisht një buton që thërriste `kurDeshtonLeximi` me `code: 3`. E shtypa dy herë për të kontrolluar edhe riprovimin, pastaj shkrova dhe konfirmova “Biblioteka”. E hoqa butonin pas provës.

Pritshmëria: Shfaqet mesazhi i timeout-it, pritja përfundon, butoni kryesor mund të përdoret përsëri dhe vendtakimi manual mund të konfirmohet.

Vëzhgimi: U shfaq “Kërkesa për vendndodhje skadoi. Provo përsëri.” Butoni kryesor u aktivizua sërish; simulimi i dytë funksionoi dhe “Vendtakimi i konfirmuar: Biblioteka” u shfaq. Kjo ishte simulim i degës `code: 3`, jo test i vonesës reale. Nuk publikova koordinata ose adresë.

### Rikontrolli pas raportit automatik.
Simulova sërish refuzimin me objekt gabimi që përmban vetëm `code: 1` dhe skadimin me vetëm `code: 3`. Në të dy rastet statusi u bë përkatësisht `denied` dhe `timeout`, pritja përfundoi, butoni i vendndodhjes u aktivizua dhe vendtakimi “Biblioteka” u konfirmua manualisht. Këto janë prova të simuluara në shfletues, jo leje GPS apo skadim real në pajisje.

## Ku gjendet puna
Skedari që plotësova: `java-08.md`.

Skedarët kryesorë të provës: `aplikacioni/src/components/Vendtakimi.tsx`, `aplikacioni/src/components/Java08Test.tsx` dhe `aplikacioni/src/app/java-08-test/page.tsx`. Puna integrohet edhe te faqja e detajeve `aplikacioni/src/app/udhetimi/[id]/page.tsx`.

Konfigurimi automatik është në `mobile-week08.json` në rrënjën e repository-t dhe tregon te `/java-08-test`. Lockfile-i i instalimit është `aplikacioni/package-lock.json`. Faqja përdor të njëjtin komponent `Vendtakimi` si detajet e udhëtimit dhe të dhënat lokale fiktive të Dritonit; nuk lexon databazën. Fusha, konfirmimi, gabimi, vendndodhja dhe saktësia kanë etiketat `data-testid` të testit, ndërsa statusi i vendndodhjes raportohet me `data-state`.

Repository: https://github.com/bleriondugolli/rideshare-mobile

Faqja e provës u hap lokalisht te `http://127.0.0.1:3000/java-08-test`; nuk po jap link publik demonstrimi sepse nuk e verifikova në këtë seancë.

## Çfarë mbetet për përmirësim
Vendtakimi i shkruar dhe konfirmimi ruhen vetëm në gjendjen e përkohshme të faqes: nuk ruhen në `localStorage` ose databazë dhe humbin pas rifreskimit. E verifikova duke konfirmuar “Biblioteka” dhe rifreskuar faqen; fusha dhe konfirmimi u zbrazën. Hapi tjetër është të provohet kërkesa e freskët e lejes pasi të pastrohet leja e faqes në shfletues, si dhe sjellja në telefon real.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Përdora AI për të shqyrtuar kodin dhe për të plotësuar e organizuar raportin. Në shfletuesin lokal verifikova rifreskimin pa kërkesë vendndodhjeje, përgjigjen e suksesshme pas klikimit, hyrjen me vetëm hapësira dhe humbjen e konfirmimit pas rifreskimit. Refuzimi dhe timeout-i më sipër u testuan me simulim; nuk i paraqes si prova në pajisje reale. Nuk bëra provën e hyrjes së re me koleg.

## Prova me një hyrje të re
Zgjodha tekstin me vetëm hapësira. Këtë hyrje e provova vetë në shfletuesin lokal, jo me koleg.
- Hyrja që provova: `   ` (vetëm hapësira), pastaj klikova “Konfirmo në telefon”.
- Parashikimi im para klikimit: Hapësirat hiqen me `trim()`, ndaj shfaqet gabimi që kërkon vendtakim dhe nuk konfirmohet tekst bosh.
- Çfarë pashë realisht: U shfaq “Shkruaj vendtakimin para se ta konfirmosh.”; vendtakimi i konfirmuar mbeti bosh.
- Skedari dhe funksioni që e shpjegojnë: `aplikacioni/src/components/Vendtakimi.tsx`, funksioni `konfirmo()`.
- Çfarë kuptova ose korrigjova: Hyrja me hapësira trajtohet si bosh. Nuk pata vëzhgim nga kolegu, prandaj nuk po e paraqes si provë të bërë në çift.

Këtë pjesë e shpjegoj në klasë. Kontrolli automatik nuk verifikon vërtetësinë e provës.
