# RideShare — Java 5 · Hyrja dhe lejet



## Çfarë ndërtova
Ndërtova mekanizmin e hyrjes me GitHub dhe menaxhimin e lejeve. Identiteti është përdoruesi që hyn me GitHub, roli përcakton nëse është udhëtar apo shofer, ndërsa pronësia lidhet me të dhënat që përdoruesi ka krijuar vetë (p.sh. udhëtimet e tij). Kështu, aplikacioni dallon mes thjesht hyrjes, të drejtave të veçanta dhe kontrollit mbi të dhënat personale.

## Provat që bëra
### Prova 1: Hyrja, rifreskimi dhe dalja
Hapa `/panel` pa hyrë dhe u shfaq mesazhi që kërkonte login. Hyra me GitHub, rifreskova faqen dhe u shfaq emri im me rolin udhëtar. Pas daljes, rifreskimi tregoi sërish panelin bosh me kërkesën për hyrje.

### Prova 2: Shoferi ndryshon udhëtimin e vet
Si shofer i ID 2 e ndryshova orën në 08:25. Në panel u shfaq ora e re, lista e udhëtimeve e pasqyroi ndryshimin, detajet e udhëtimit e konfirmuan, dhe në SQL Editor u pa vlera e re. Riktheva orën në 08:15 dhe të gjitha pamjet u sinkronizuan sërish.

### Prova 3: Veprimi pa leje refuzohet
Nga formulari i hapur ndryshova ID në 1 dhe provova Ruaj. U shfaq mesazhi i refuzimit “Nuk ke leje për këtë veprim”. Në Neon verifikova që udhëtimi me ID 1 mbeti me orën 08:00 pa ndryshim. Kjo konfirmoi që kontrolli i pronësisë funksionon.

## Ku gjendet puna
Puna gjendet në repository‑n e projektit në GitHub, me skedarët e rinj në `src/app/api/auth/[...nextauth]/route.ts` dhe `src/lib/auth.ts`. Nëse publikohet në Vercel, demo është e aksesueshme nga linku i aplikacionit.

## Çfarë mbetet për përmirësim
Një kufizim është që kërkesa për vend mbetet simulim; nuk ka rezervim real. Hapi i ardhshëm do të ishte shtimi i logjikës për rezervime të vërteta dhe menaxhimin e vendeve të disponueshme.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Mora ndihmë për konfigurimin e NextAuth dhe strukturën e skedarëve, ndërsa provat dhe verifikimet i bëra vetë në aplikacion dhe në Neon.
