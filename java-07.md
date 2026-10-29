# RideShare · Java 7

Ruaje si **java-07.md**, pranë README në rrënjën e repository-t tënd. Plotëso me vëzhgimet e tua dhe plotëso çdo vend bosh përpara dorëzimit. Ruaj titujt dhe etiketat. Para/Pas janë dy URL të plota commit-esh nga i njëjti repository, me kodin e plotë prej 40 shenjash.

Pas Commit dhe Push, hap formularin e lëndës për **Java 7** dhe vendos linkun kryesor të repository-t. Rezultati vjen te komenti **Kontrolli automatik i dorëzimit**, nga github-actions[bot], në Issue-n tënd. Lexo 5/5 dhe çdo ✅/❌; nëse korrigjon, bëj Push dhe komento **rikontrollo** te i njëjti Issue. 5/5 është kontroll teknik, jo notë.

## Rasti im
GitHub: bleriondugolli
Kodi: P7-439
Skenari i zgjedhur (numri dhe titulli, nga Rastet 1–5): Rasti 3 · Klikim apo rezervim
ID i udhëtimit në projektin tim: 1
Të dhënat fiktive të rastit: Ferizaj → AAB, 09:05, 2 vende. Ora për provën e re: 09:10. Këto janë të dhënat e dhëna për rastin; nuk i shkrova në Neon. Për provën e faqes demonstrative përdora ID 1 që ekziston në bazën e testimit: Prishtinë → AAB, 08:00, 2 vende.

## Parashikimi
Para ndryshimit prisja që hapja e kërkesës për ID 1 të shfaqte një simulim, jo rezervim. Titulli “Në pritje” mund të kuptohej si kërkesë e ruajtur ose në radhë; prisja që mesazhi ta sqaronte këtë.

## Dy probleme
1. Te kërkesa demonstrative, titulli “Simulim: Në pritje” mund të nënkuptonte se kërkesa ishte regjistruar. E përsërita duke hapur kërkesën e ID 1; teksti poshtë thoshte se ajo nuk ishte dërguar.
2. Faqja për ID që mungon nuk tregon vlerën e ID-së që u kërkua. Mesazhi dhe kthimi te lista janë të qarta, por shfaqja e ID-së mund ta ndihmojë përdoruesin të gjejë gabimin.

## Korrigjimi (arsyeja)
Skedari: aplikacioni/src/app/udhetimi/[id]/kerkesa/page.tsx
Ndryshova titullin nga “Simulim: Në pritje” në “Simulim: Kërkesa nuk u dërgua”, sepse formulimi i vjetër mund të dukej si kërkesë e ruajtur. Titulli i ri përputhet me tekstin poshtë dhe sqaron se ky veprim nuk dërgon kërkesë. Nuk ndryshova të dhëna në Neon.

## Versionet
Para: https://github.com/bleriondugolli/rideshare-mobile/commit/4fc9e123160cd97b20ab97abf65beb45f0b1f0c1
Pas: https://github.com/bleriondugolli/rideshare-mobile/commit/e5d845c335b9ec1935b67eaeefe1857922219341

## Provat që bëra
### Prova 1
Hapat: Hapa udhëtimin ID 1 nga lista, pastaj hapa /udhetimi/id-qe-nuk-ekziston.
Pritshmëria: ID 1 shfaq detajet e veta; ID e panjohur jep mesazh të qartë dhe lidhje kthimi.
Vëzhgimi: ID 1 shfaqi Prishtinë–AAB, 08:00 dhe 2 vende. ID e panjohur shfaqi “Udhëtimi nuk u gjet” dhe “Kthehu te lista”.

### Prova 2
Hapat: Hapa udhëtimin ID 3, Lipjan–AAB, i cili ka 0 vende në të dhënat e provës.
Pritshmëria: Shfaqet mesazh pa vende; nuk ofrohet veprim aktiv për të kërkuar vend.
Vëzhgimi: U shfaq “Vende të lira: 0” dhe butoni i çaktivizuar “Nuk ka vende të lira”.

### Prova 3
Hapat: Hapa kërkesën demonstrative për ID 1 pas korrigjimit të titullit.
Pritshmëria: Faqja sqaron se kërkesa nuk dërgohet, nuk ruhet rezervim dhe nuk njoftohet shoferi.
Vëzhgimi: U shfaq “Simulim: Kërkesa nuk u dërgua”, shpjegimi se kërkesa nuk është dërguar te shoferi dhe se ruajtja/konfirmimi real do të shtohen më vonë.

## Ndryshimi i ri
Hyrja e udhëtimit që ndryshoi kolegu nuk u demonstrua në këtë provë. Prandaj nuk kam parashikim ose vëzhgim për atë ndryshim dhe nuk po pretendoj se e testova.

## Ndihma nga AI
Përdora AI për të shqyrtuar kodin, për të propozuar tekstin më të qartë të simulimit dhe për të strukturuar raportin sipas modelit. Verifikova vetë faqen e kërkesës në shfletuesin lokal, kontrollova ID-në e panjohur dhe rastin me 0 vende, si dhe ekzekutova `npm run build`. Nuk ndryshova të dhëna reale ose të bazës Neon.
