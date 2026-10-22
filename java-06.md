# RideShare — Java 6 · PWA dhe puna offline

Ruaje si java-06.md pranë README të repository-t, jashtë aplikacioni/.
Hiqi [PLOTËSO]. Mos vendos sekrete, email ose fotografi kredencialesh.

## Çfarë ndërtova
Manifesti përshkruan aplikacionin (emrin, ikonat, ngjyrat dhe URL-në kryesore) dhe i lejon shfletuesit ta ofrojë si aplikacion të instaluar. Service worker-i menaxhon cache dhe kërkesat offline, duke ruajtur faqet kryesore dhe duke i shërbyer kur nuk ka internet. Kopja publike në pajisje është versioni i ruajtur i aplikacionit që hapet edhe pa lidhje.

## Provat që bëra
### Prova 1: Manifesti dhe vizita online
Hapa URL-në kryesore `https://rideshare-demo.vercel.app`. Manifesti tregonte ikonat 192x192 dhe 512x512 me emrin “RideShare”. Lista u ruajt në cache. Shfletuesi ofroi opsionin “Install App” në Chrome, por jo në Safari.

### Prova 2: Pa internet dhe pas rifreskimit
Ndërprerjen e simulova duke fikur Wi-Fi. Pas rifreskimit, tri kartat kryesore u hapën nga cache. Koha e ruajtjes ishte e shënuar si “Cached at 14:32” dhe mesazhi ishte “Offline copy”. Nuk kishte konfirmim rezervimi sepse kërkesa POST nuk mund të ruhet offline.

### Prova 3: Lidhja rikthehet
Në Neon, ID 2 kishte orën e vjetër 15:00 dhe të renë 15:45. Offline shfaqej ora e vjetër. Pas “Rifresko listën”, u përditësua me 15:45. Riktheva orën fillestare 15:00 për testim.

## Ku gjendet puna
Repository: `https://github.com/blerion/rideshare-pwa`  
Skedarët e shtuar: `manifest.json`, `service-worker.js`, `public/icons/`  
Demo: `https://rideshare-demo.vercel.app`

## Çfarë mbetet për përmirësim
Në vizitën e parë pa kopje, faqja nuk hapet sepse nuk ka cache. Kufizimi i leximit offline është se vetëm GET kërkesat statike ruhen; të dhënat dinamike nuk shfaqen pa lidhje.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Mora ndihmë për shpjegimin e rolit të manifestit dhe service worker-it, ndërsa provat i bëra vetë.
