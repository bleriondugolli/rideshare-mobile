# RideShare — Java 7 · Lista, detajet dhe kërkesa demonstrative

## Rasti im (P7-439, GitHub: bleriondugolli)

## Parashikimi
Parashikova që një udhëtim i zgjedhur nga lista do të hapet sipas ID-së dhe do të shfaqë detajet e veta. Një ID që nuk ekziston duhet të japë mesazh të qartë. Nëse udhëtimi ka 0 vende, aplikacioni nuk duhet të ofrojë një vend. Kërkesa demonstrative duhet ta bëjë të qartë se rezervimi dhe njoftimi nuk janë realë.

## Ndryshimi i ri
U verifikua rrjedha nga lista te faqja `/udhetimi/[id]`: karta përdor ID-në e udhëtimit, faqja kërkon atë ID në databazë dhe shfaq nisjen, destinacionin, orën, vendtakimin dhe vendet e lira. ID-ja e panjohur shfaq faqen “Udhëtimi nuk u gjet”. Për udhëtimin me 0 vende, veprimi për të kërkuar vend është i çaktivizuar. Për udhëtim me vende të lira, faqja e kërkesës shfaq simulimin dhe sqaron se nuk dërgohet kërkesë te shoferi dhe nuk ruhet rezervim real.

## Dy probleme
1. Një ID e gabuar ose që mungon nuk duhet të shkaktojë faqe bosh apo gabim të pakuptueshëm; përdoruesi duhet të dijë se udhëtimi nuk u gjet dhe të mund të kthehet te lista.
2. Kur numri i vendeve është 0, një buton aktiv për kërkesë mund të krijojë përshtypjen se ka vend të lirë. Po ashtu, demonstrimi i kërkesës nuk duhet të paraqitet si rezervim ose njoftim i vërtetë.

## Korrigjimi (arsyeja)
Rruga e detajeve përdor `notFound()` kur kërkimi sipas ID-së nuk kthen udhëtim, dhe faqja përkatëse tregon mesazh të qartë me lidhje kthimi. Butoni i kërkesës shfaqet vetëm kur ka vende të lira; përndryshe çaktivizohet. Rruga e kërkesës e kontrollon përsëri numrin e vendeve dhe shfaq tekstin e simulimit, që të mos premtojë rezervim ose njoftim real. Kjo e bën sjelljen të qartë si në ndërfaqe ashtu edhe në rastet kufitare.

Skedari: `aplikacioni/src/app/udhetimi/[id]/page.tsx`

## Ndihma nga AI
Përdora AI për të shqyrtuar rrjedhën e listës, detajeve dhe kërkesës, për të verifikuar sjelljen e ID-së që mungon dhe për të organizuar raportin. Provat e përshkruara më poshtë u kontrolluan në aplikacionin lokal. Kërkesa mbetet simulim; AI nuk kreu rezervim ose njoftim.

## Prova 1 (Hapat, Pritshmëria, Vëzhgimi)
**Hapat:** Hapa një udhëtim nga lista me ID 1, pastaj hapa drejtpërdrejt adresën `/udhetimi/id-qe-nuk-ekziston`.

**Pritshmëria:** ID 1 shfaq detajet e udhëtimit të zgjedhur; ID-ja e panjohur shfaq mesazh të qartë dhe lidhje kthimi te lista.

**Vëzhgimi:** Udhëtimi ID 1 shfaqi Prishtinë–AAB, orën 08:00, vendtakimin dhe 2 vende të lira. Për ID-në e panjohur u shfaq “Udhëtimi nuk u gjet” dhe lidhja “Kthehu te lista”.

## Prova 2 (Hapat, Pritshmëria, Vëzhgimi)
**Hapat:** Hapa udhëtimin provë Lipjan–AAB, ID 3, me 0 vende.

**Pritshmëria:** Faqja tregon se nuk ka vende dhe nuk ofron një veprim aktiv që premton vend të lirë.

**Vëzhgimi:** U shfaqën “Vende të lira: 0” dhe butoni i çaktivizuar “Nuk ka vende të lira”. Nuk u dërgua kërkesë.

## Prova 3 (Hapat, Pritshmëria, Vëzhgimi)
**Hapat:** Hapa kërkesën demonstrative për udhëtimin ID 1, i cili ka vende të lira.

**Pritshmëria:** Aplikacioni tregon se është simulim dhe sqaron se nuk bëhet rezervim dhe nuk dërgohet njoftim real.

**Vëzhgimi:** U shfaq “Simulim: Në pritje”, “Kërkesa për Prishtinë nuk është dërguar te shoferi” dhe se ruajtja dhe konfirmimi real do të shtohen më vonë.
