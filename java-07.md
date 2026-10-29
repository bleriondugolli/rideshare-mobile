# RideShare — Java 7 · Lista, detajet dhe kërkesa demonstrative

## Rasti im (P7-439, GitHub: bleriondugolli)

Rasti personal P7-439 është identifikuesi im i provës; nuk është numër rasti nga ligjërata.

## Rastet nga ligjërata

Rasti 1 · Lista dhe detajet — i provuar në Provën 1: ID 1 hapi detajet e veta; ID e panjohur dha mesazh dhe kthim te lista.

Rasti 2 · Pa vende — i provuar në Provën 2: udhëtimi ID 3 me 0 vende shfaqi mesazh dhe nuk ofroi veprim aktiv për kërkesë.

Rasti 3 · Klikim apo rezervim — i provuar në Provën 3: faqja e kërkesës e bën të qartë se kërkesa nuk dërgohet dhe rezervimi nuk ruhet.

Rasti 4 · Kopja pa internet — u hap lista online, u çaktivizua rrjeti për tab-in dhe u rifreskua. U shfaq kopja e ruajtur me shënimin se mund të jetë vjetruar; ora e ruajtjes mbeti e njëjtë.

Rasti 5 · Lejet e ndryshimit — me llogarinë testuese të shoferit ndryshova përkohësisht orën e udhëtimit tim ID 2 dhe e riktheva në 08:25. Prova e ndryshimit të ID 1 u refuzua me mesazhin se nuk kishte leje; ora e ID 1 mbeti 08:00. Nuk u provua hyrja me llogari të dytë.

Rasti 6 · Një vend, dy udhëtarë — vetëm diskutim për version të ardhshëm; nuk u implementua si rezervim real.

Numrat e rasteve tregojnë skenarët e ligjëratës. Provat 1–3 më poshtë janë kontrollet e punës; Hapat 1–6 tregojnë rendin e punës dhe nuk janë raste ose prova.

## Parashikimi
Parashikova që një udhëtim i zgjedhur nga lista do të hapet sipas ID-së dhe do të shfaqë detajet e veta. Një ID që nuk ekziston duhet të japë mesazh të qartë. Nëse udhëtimi ka 0 vende, aplikacioni nuk duhet të ofrojë një vend. Kërkesa demonstrative duhet ta bëjë të qartë se rezervimi dhe njoftimi nuk janë realë.

## Ndryshimi i ri
U verifikua rrjedha nga lista te faqja `/udhetimi/[id]`: karta përdor ID-në e udhëtimit, faqja kërkon atë ID në databazë dhe shfaq nisjen, destinacionin, orën, vendtakimin dhe vendet e lira. ID-ja e panjohur shfaq faqen “Udhëtimi nuk u gjet”. Për udhëtimin me 0 vende, veprimi për të kërkuar vend është i çaktivizuar. Për udhëtim me vende të lira, faqja e kërkesës shfaq simulimin dhe sqaron se nuk dërgohet kërkesë te shoferi dhe nuk ruhet rezervim real.

## Dy probleme ose paqartësi reale
1. Titulli “Simulim: Në pritje” mund të tingëllojë sikur kërkesa është ruajtur në radhë, edhe pse teksti poshtë thotë se nuk është dërguar. Kjo paqartësi u korrigjua duke e ndryshuar titullin në “Simulim: Kërkesa nuk u dërgua”.
2. Faqja për ID që mungon nuk tregon vetë vlerën e ID-së së kërkuar; kur hapen disa lidhje, përdoruesi mund të mos dijë cilën ID duhet të kontrollojë. Faqja jep mesazh dhe lidhje kthimi, por shfaqja e ID-së do të ishte përmirësim i ardhshëm.

## Korrigjimi (arsyeja)

Arsyeja: Shprehja “Në pritje” mund të kuptohet si kërkesë e ruajtur ose në proces. Duhet të thuhet drejtpërdrejt se simulimi nuk dërgon kërkesë.

Korrigjimi: Titulli i faqes së kërkesës tani thotë “Simulim: Kërkesa nuk u dërgua”. Teksti shpjegues për mungesën e dërgimit dhe mungesën e ruajtjes mbetet gjithashtu.

Skedari: aplikacioni/src/app/udhetimi/[id]/kerkesa/page.tsx

## Ndihma nga AI
Përdora AI për të shqyrtuar rrjedhën e listës, detajeve dhe kërkesës, për të verifikuar sjelljen e ID-së që mungon dhe për të organizuar raportin. Provat e përshkruara më poshtë u kontrolluan në aplikacionin lokal. Kërkesa mbetet simulim; AI nuk kreu rezervim ose njoftim.

## Prova 1 (Hapat, Pritshmëria, Vëzhgimi)

### Hapat
Hapa një udhëtim nga lista me ID 1, pastaj hapa drejtpërdrejt adresën `/udhetimi/id-qe-nuk-ekziston`.

### Pritshmëria
ID 1 shfaq detajet e udhëtimit të zgjedhur; ID-ja e panjohur shfaq mesazh të qartë dhe lidhje kthimi te lista.

### Vëzhgimi
Udhëtimi ID 1 shfaqi Prishtinë–AAB, orën 08:00, vendtakimin dhe 2 vende të lira. Për ID-në e panjohur u shfaq “Udhëtimi nuk u gjet” dhe lidhja “Kthehu te lista”.

## Prova 2 (Hapat, Pritshmëria, Vëzhgimi)

### Hapat
Hapa udhëtimin provë Lipjan–AAB, ID 3, me 0 vende.

### Pritshmëria
Faqja tregon se nuk ka vende dhe nuk ofron një veprim aktiv që premton vend të lirë.

### Vëzhgimi
U shfaqën “Vende të lira: 0” dhe butoni i çaktivizuar “Nuk ka vende të lira”. Nuk u dërgua kërkesë.

## Prova 3 (Hapat, Pritshmëria, Vëzhgimi)

### Hapat
Hapa kërkesën demonstrative për udhëtimin ID 1, i cili ka vende të lira.

### Pritshmëria
Aplikacioni tregon se është simulim dhe sqaron se nuk bëhet rezervim dhe nuk dërgohet njoftim real.

### Vëzhgimi
U shfaq “Simulim: Kërkesa nuk u dërgua”, “Kërkesa për Prishtinë nuk është dërguar te shoferi” dhe se ruajtja dhe konfirmimi real do të shtohen më vonë.
