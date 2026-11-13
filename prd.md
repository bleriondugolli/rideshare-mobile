# RideShare — PRD

## Qëllimi

Të ndihmojë studentët që udhëtojnë drejt AAB të gjejnë dhe të shqyrtojnë udhëtime të publikuara, me nisjen, destinacionin, orarin dhe vendet e lira të paraqitura qartë. Produkti aktual është prototip mësimor; kërkesat për vende dhe pagesat nuk janë transaksione reale.

## Përdoruesit

- **Udhëtarët/studentët:** shfletojnë listën publike, lexojnë detajet dhe provojnë kërkesën për një vend.
- **Shoferët:** publikojnë të dhënat e udhëtimit; përdoruesi i identifikuar si shofer mund të ndryshojë orën e udhëtimit të vet në panel.
- **Përdoruesit e kthyer:** mund të hyjnë me GitHub dhe të ruajnë udhëtime te të preferuarat.

## Kërkesat funksionale

1. Shfaq listën publike të udhëtimeve të lexuar nga databaza PostgreSQL në Neon, me informacionin kryesor të çdo udhëtimi dhe numrin e vendeve.
2. Hap faqe me detajet e një udhëtimi të zgjedhur.
3. Ofron rrjedhë demonstrimi për kërkesën e një vendi. Ndërfaqja duhet të bëjë të qartë se kërkesa është simulim.
4. Lejon hyrjen me GitHub dhe shfaq panelin e përdoruesit të identifikuar.
5. Lejon shoferin të ndryshojë orën vetëm për udhëtimin që i përket; serveri verifikon pronësinë dhe vlefshmërinë e orës.
6. Lejon përdoruesin e identifikuar të ruajë ose heqë një udhëtim nga të preferuarat; preferimet lidhen me përdoruesin dhe udhëtimin.
7. Ruaj dhe shfaq kopjen publike të listës për lexim offline pasi lista është ngarkuar me internet. Veprimet që kërkojnë server nuk ofrohen nga kopja offline.
8. Shfaq gjendje të kuptueshme për listë bosh ose dështim të lidhjes me databazën.
9. Në formularin e kërkesës për vendtakim, ofro kërkim opsional të vendndodhjes vetëm pasi përdoruesi zgjedh ta përdorë; nëse nuk funksionon, lejo shkrimin manual. Koordinatat nuk ruhen ose dërgohen në server.

## MVP

- Listë publike udhëtimesh me vendet e lira.
- Faqe detajesh për udhëtimin e zgjedhur.
- Demonstrim i rrjedhës së kërkesës për vend, pa rezervim real.

Hyrja, paneli i shoferit, të preferuarat, vendndodhja dhe leximi offline janë funksione shtesë të prototipit aktual.

## Kufizimet

- Aplikacioni është prototip mësimor i ndërtuar me Next.js; nuk është shërbim i plotë rezervimi.
- Kërkesat për vende simulohen. Nuk ka rezervim të konfirmuar, menaxhim real të kërkesave, pagesë ose chat.
- Të dhënat e udhëtimeve lexohen nga PostgreSQL në Neon dhe kërkojnë konfigurim të vlefshëm të databazës.
- Lista offline është vetëm për lexim dhe mund të jetë e vjetruar; kërkesat dhe veprimet e panelit kërkojnë lidhje.
- Hyrja përdor OAuth të GitHub-it dhe kërkon konfigurim të kredencialeve përkatëse.
- Veprimi i shoferit në panel është i kufizuar në udhëtimin e caktuar në prototip.

## Kriteret e pranimit

- Kur databaza është e arritshme, faqja kryesore paraqet udhëtimet e lexuara dhe informacionin e nisjes, destinacionit, orës e vendeve.
- Kur nuk ka udhëtime, shfaqet gjendje bosh; kur leximi dështon, shfaqet mesazh gabimi dhe mundësi riprovimi.
- Zgjedhja e një udhëtimi hap detajet e tij; një ID e panjohur nuk paraqitet si udhëtim i vlefshëm.
- Rrjedha e kërkesës shpjegon se është demonstrim dhe nuk paraqet rezervim real si të konfirmuar.
- Përdoruesi pa hyrje nuk mund të ndryshojë orën; shoferi mund ta ndryshojë vetëm udhëtimin e vet me një orë të vlefshme.
- Përdoruesi i identifikuar mund të ruajë dhe heqë të preferuarat; nuk krijohen rreshta të dyfishtë për të njëjtin përdorues dhe udhëtim.
- Pas ngarkimit online të listës, kopja e ruajtur mund të lexohet offline dhe ndërfaqja nuk lejon veprime që kërkojnë server.
- Përdoruesi mund të zgjedhë vendndodhjen vetëm me veprim të qartë; refuzimi ose mungesa e API-së nuk pengon shkrimin manual të vendtakimit.
