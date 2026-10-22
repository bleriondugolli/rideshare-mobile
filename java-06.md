# RideShare — Java 6 · PWA dhe puna offline

Raporti i javës 6 për projektin RideShare, ruajtur pranë README-së dhe jashtë aplikacionit/.
Provat më poshtë u kryen lokalisht në shfletues, me build-in production të Next.js.

## Çfarë ndërtova
Manifesti përshkruan aplikacionin (emrin, ikonat, ngjyrat dhe URL-në kryesore) dhe i lejon shfletuesit ta ofrojë si aplikacion të instaluar. Service worker-i menaxhon cache dhe kërkesat offline, duke ruajtur faqet kryesore dhe duke i shërbyer kur nuk ka internet. Kopja publike në pajisje është versioni i ruajtur i aplikacionit që hapet edhe pa lidhje.

## Provat
### Prova 1: Manifesti dhe vizita online
Ndërtova projektin me `npm run build` dhe hapa aplikacionin lokal me `npm run start`; faqja kryesore u shfaq, manifesti dha emrin “RideShare AAB” dhe ikonat 192×192 e 512×512, ndërsa service worker-i u regjistrua e mori kontrollin e faqes. API-ja publike ktheu tri udhëtime dhe kopja e listës u ruajt lokalisht. Nuk testova instalimin nga ndërfaqja e shfletuesit.

### Prova 2: Pa internet dhe pas rifreskimit
Simulova mungesën e rrjetit në shfletues dhe kërkova listën sërish; API-ja ktheu kopjen e ruajtur, shënuar si të vjetruar, dhe faqja offline shfaqi tri kartat me orën e ruajtjes. Butoni i rezervimit mbeti i çaktivizuar; nuk kryeva asnjë rezervim.

### Prova 3: Lidhja rikthehet
Riktheva rrjetin dhe shtypja “Rifresko listën”; API-ja dha të dhëna nga serveri, koha e leximit u përditësua dhe tri kartat u shfaqën përsëri. Nuk ndryshova të dhëna në Neon ose në bazën e të dhënave.

## Ku gjendet puna
Repository: `https://github.com/bleriondugolli/rideshare-mobile`
Skedarët: `aplikacioni/src/app/manifest.ts`, `aplikacioni/src/components/Pwa.tsx`, `aplikacioni/src/app/api/udhetimet/route.ts`, `aplikacioni/public/sw.js`, `aplikacioni/public/offline.html` dhe `aplikacioni/public/icons/`.

## Çfarë mbetet për përmirësim
Pa një vizitë online që krijon kopjen lokale, lista nuk mund të lexohet offline. Puna offline është vetëm për lexim: rezervimet, kërkesat POST dhe faqet private nuk ruhen. Nuk testova instalimin në telefon ose një deploy publik.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Përdora ndihmë nga AI për përshkrimin e manifestit dhe service worker-it dhe për organizimin e raportit; verifikimet teknike u kryen në build-in lokal të projektit.
