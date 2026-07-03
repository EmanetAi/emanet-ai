// i18n dictionary — Bosnian + Arabic. English is the source of truth and lives in
// the JSX (captured from the DOM at runtime), so only bs/ar are stored here.
// Keys map to data-i18n attributes; t values are innerHTML (markup preserved).
// Generated + adversarially reviewed by the emanet-i18n-bs-ar workflow.
// Missing keys fall back to English automatically.

export type Loc = "bs" | "ar";

export type LangPack = {
  t: Record<string, string>;
  detail: Record<string, { approach: string; priceRows: string[][] }>;
  aria: Record<string, string>;
};

export const dict: Record<Loc, LangPack> = {
  "bs": {
    "t": {
      "gate.eyebrow": "AMANET — POVJERENO NA ČUVANJE",
      "gate.hint": "pritisnite pečat — ili samo skrolajte",
      "gate.pitch": "Studio od četiri inženjera — AI automatizacija, aplikacije i web, podaci. Prva izrada €200.",
      "mail.sub.first": "Prvi rez — €200",
      "mail.sub.main": "Amanet za vas",
      "mail.body": "Čime se bavimo:\n\nŠta nam prvo treba:\n\nOkvirni rok:\n",
      "wl.servis": "Web stranica, galerija i admin za servis turbina — izradio Tarik; u produkciji.",
      "faq.idx": "Pitanja",
      "faq.h": "Pitano jasno,<br>odgovoreno jasno.",
      "faq.p": "Ono što ljudi zaista žele znati prije nego što nam pišu.",
      "faq.q1": "Čiji je kod?",
      "faq.a1": "Vaš — od prvog commita. Repozitoriji, ključevi i nalozi otvaraju se na vaše ime i predaju cijeli. Ako se ikada raziđemo, sve nastavlja raditi i bez nas.",
      "faq.q2": "Šta ako mi se prvi rez ne svidi?",
      "faq.a2": "Kažete nam otvoreno. €200 pokriva jedan pošten pokušaj i jedan krug vaših primjedbi — ako ni tada ne valja, zadržavate urađeno i ne dugujete ništa više. Nema pretplate i ništa se ne obnavlja.",
      "faq.q3": "Kako komuniciramo?",
      "faq.a3": "Direktno s inženjerom koji radi vaš posao — e-mail, WhatsApp/Viber ili poziv. Bez posrednika i bez čekanja u redu. Javljamo se kad nešto isporučimo, i prije svega rizičnog.",
      "faq.q4": "Koliko košta održavanje?",
      "faq.a4": "Od €10 mjesečno, rečeno unaprijed. Pokriva hosting, ažuriranja i backupe — i može se otkazati bilo koji mjesec, jer su ključevi vaši.",
      "faq.q5": "Radite li samo u Bosni?",
      "faq.a5": "Ne — radimo na daljinu, na bosanskom, engleskom i arapskom. Većina posla ide preko granica; naša vremenska zona je srednjoevropska.",
      "gate.cursor": "pritisnite i preuzmite amanet",
      "nav.practice": "Praksa",
      "nav.keepers": "Čuvari",
      "nav.pricing": "Cijene",
      "nav.contact": "Kontakt",
      "th.sub": "ČVOR 00 · AMANET",
      "th.h": "<span class=\"ln\"><span class=\"w\">Vašu</span> <span class=\"w\">tehnologiju</span></span><span class=\"ln\"><span class=\"w\">čuvamo</span></span><span class=\"ln\"><span class=\"w\">kao</span> <span class=\"w w-gold\">amanet.</span></span>",
      "th.thesis": "<b>Prestanite puštati neispravne AI funkcije.</b> Gradimo pouzdane agente i besprijekorne integracije kojima zaista možete vjerovati u produkciji.",
      "th.side": "Amanet (<span class=\"arabic\" lang=\"ar\">أمانة</span>) je nešto što vam je predano na čuvanje, da bude vraćeno cijelo. Softver gradimo na isti način — ono što nam povjerite, čuvamo i vraćamo netaknuto.",
      "th.cue": "pratite nit",
      "pr.idx": "Praksa",
      "pr.h": "Pet disciplina,<br>nošenih na jednoj niti.",
      "pr.p": "Jednostavno rečeno: gradimo web stranice, aplikacije, AI alate i sisteme iza kulisa na kojima vaše poslovanje počiva — i brinemo se o njima kad jednom zažive. Svaki od njih je vrsta posla koju preuzimamo.",
      "label.get": "Šta dobijate",
      "n1.tag": "Čvor 01 · AI automatizacija",
      "n1.h": "AI automatizacija i agenti",
      "n1.line": "Pametni asistenti koji preuzimaju ponavljajući posao u vašem poslovanju — odgovaraju na rutinska pitanja, prebacuju informacije među vašim alatima, sortiraju i pišu nacrte — i znaju kada stati i pitati vas.",
      "n1.dv": "Dosadni, ponavljajući zadaci odrađeni umjesto vas, ušteđeni sati koji se zaista broje i jednostavan prekidač koji je u vašim rukama.",
      "n1.flex": "Radi na hardveru koji vi kontrolišete — glasom, porukom ili API-jem",
      "n2.tag": "Čvor 02 · Softver",
      "n2.h": "Razvoj weba i aplikacija",
      "n2.line": "Gradimo vašu web stranicu ili aplikaciju — ono što vaši korisnici zaista vide i koriste — i pazimo da bude brza, jednostavna za korištenje i da radi dugo nakon lansiranja.",
      "n2.dv": "Gotova web stranica ili aplikacija — obično za otprilike tri mjeseca — koja izgleda kako treba, radi na telefonima i napravljena je da traje, ne samo da se lansira.",
      "n3.tag": "Čvor 03 · Inženjering podataka",
      "n3.h": "Inženjering podataka",
      "n3.line": "Vaše razasute informacije slažemo na jedno uredno, pouzdano mjesto — da brojevi na osnovu kojih odlučujete zaista budu tačni.",
      "n3.dv": "Izvještaji i kontrolne table kojima možete vjerovati — a neuredni podaci iza njih očišćeni su, posloženi i čuvani privatno.",
      "n4.tag": "Čvor 04 · Cloud / DevOps",
      "n4.h": "Cloud i DevOps",
      "n4.line": "Postavljamo i održavamo mjesto gdje vaš softver živi na internetu — da ostane dostupan, radi brzo i da vam ne priredi iznenađenje na računu.",
      "n4.dv": "Vaš softver pouzdano radi na internetu, ažuriranja izlaze bez drame, a mjesečni račun zaista možete pročitati.",
      "n5.tag": "Čvor 05 · Sigurnost i pouzdanost",
      "n5.h": "Sigurnost i pouzdanost",
      "n5.line": "Ono što gradimo držimo sigurnim i dostupnim — vaši podaci zaštićeni, vaše prijave zaključane, a vaša stranica dostupna kad je korisnicima treba.",
      "n5.dv": "Zaštita ugrađena od prvog dana, vaše lozinke i pristup uredno vođeni i sigurnosne kopije koje su zaista testirane. Ono što gradimo po pravilu je sigurno — ne predstavljamo se kao vaš sigurnosni tim.",
      "ke.idx": "Čuvari",
      "ke.h": "Četiri ruke<br>na istoj niti.",
      "ke.p": "Namjerno malen studio. Svaki čuvar potpisuje svoj čvor. Jedan imenovani inženjer vodi vaš posao od početka do kraja i za njega odgovara lično — bez predaje ljudima koje nikad niste sreli.",
      "role.data": "Inženjer podataka",
      "role.ai": "Inženjer AI automatizacije",
      "role.devops": "DevOps inženjer",
      "role.fullstack": "Full-Stack inženjer",
      "bio.ajdin": "Gradi cjevovode i ugovore na kojima svi mi ostali stojimo.",
      "bio.tarik": "Dizajnira agente koji djeluju suzdržano — automatizaciju koja zna svoje granice i pita prije nego ih pređe.",
      "bio.eman": "Pušta u rad bez drame, a svjetla drži upaljenima.",
      "bio.aner": "Od šeme do ekrana — cijeli stack, na okupu.",
      "wo.idx": "Odabrani radovi",
      "wo.h": "Stvari koje smo<br>zaista isporučili.",
      "wo.p": "Stvarni radovi tima — bez logotipa klijenata, bez glume sa studijama slučaja. Posao, nazvan jednostavno.",
      "wl.mostay": "Web stranica za butik hotel u Mostaru — brzi statički Next.js.",
      "wl.cloudops": "LangChain agent koji upravlja i rasuđuje nad Google Cloud infrastrukturom.",
      "wl.pipeline": "Streaming, serverless cjevovod podataka na Google Cloudu.",
      "wl.dataviz": "Eksplorativna analiza i vizualizacija podataka u Pythonu, uključujući studiju Spotify skupa podataka.",
      "wl.parallel": "Isplanira cilj, rasporedi tim AI radnika kroz tmux panele i spoji njihove rezultate u jednu cjelinu.",
      "wl.relay": "Pozovi asinhroni cloud agent kao običnu blokirajuću Python funkciju — webhook ulaz, Airtable sandučić izlaz. Bez zavisnosti.",
      "wl.digest": "Lokalni dnevni pregled — jedan strukturiran sažetak Gmaila, Slacka i kalendara. SQLite keš, AI sažeci.",
      "pn.eyebrow": "Nit koje se držimo",
      "pn.quote": "Preuzimamo ono što možemo uraditi <b>pošteno i dobro</b> — a o ostalom smo s vama iskreni.",
      "pn.note": "To je stvar brige, ne pravila. Isti instinkt koji nas tjera da čuvamo vaše podatke drži nas iskrenima o poslu — i spremnima da vam kažemo, jedan na jedan, ako nismo prave ruke za njega.",
      "pn.gloss": "amanet — povjereno, sačuvano i vraćeno cijelo",
      "pf.idx": "Čega se držimo",
      "pf.h": "Radije pokazujemo<br>nego pričamo.",
      "pf.p": "Bez ispraznih metrika. Dokaz je u onome što smo spremni odbiti i u onome za što smo spremni odgovarati.",
      "pf.t1": "Prvo lokalno",
      "pf.k1": "Vi ga isključujete.",
      "pf.v1": "Ono što gradimo radi na mašinama koje vi kontrolišete. Ništa što sami niste poslali ne napušta te mašine, niti ima clouda koji ne možete ugasiti.",
      "pf.t2": "Pročitajte izvor",
      "pf.k2": "Pisano da se provjeri.",
      "pf.v2": "Kod dovoljno čitljiv da se naslijedi, dovoljno dokumentovan da mu se vjeruje, i predan netaknut.",
      "pf.t3": "Čuvano, ne iznajmljeno",
      "pf.k3": "Ključevi su vaši.",
      "pf.v3": "Infrastruktura koju držite i zavisnosti koje možete ukloniti. Bez zaključavanja prerušenog u funkciju.",
      "bg.idx": "Kako počinjemo",
      "bg.h": "Počnite malo.<br>Ostalo zaslužimo.",
      "bg.p": "Povjerenje se daje u koracima. Posao dokazujemo na nečemu malom prije nego se obavežete na cijeli projekt — bez pretplate, bez zaključavanja.",
      "bg.step1": "Korak prvi · Prvi rez",
      "bg.name1": "Jednostavna stranica, i zaista napravljena",
      "bg.price1": "€200<small> fiksno · jedan krug izmjena</small>",
      "bg.desc1": "Gradimo prvu verziju jednostavne web stranice — dizajniranu, kodiranu i objavljenu — pa je provedemo kroz jedan krug vaših povratnih informacija. Gotov posao držite u rukama prije nego odlučite o nečem većem.",
      "bg.note1": "Objavljena stranica · jedna izmjena · ostaje vama",
      "bg.step2": "Korak drugi · Cijeli projekt",
      "bg.name2": "Odredimo zajedno, kad povjerenje bude zasluženo",
      "bg.price2": "Jasno procijenjeno<small> nakon prvog reza</small>",
      "bg.desc2": "Kad prvi rez to zasluži, ostatak određujemo s vama — cijela stranica ili proizvod, s cijenom stavku po stavku. Vama pripadaju kod i ključevi; vraćamo vam ga cijelog.",
      "bg.note2": "Sve što napravimo pripada vama",
      "bg.cta": "Počnite prvim rezom",
      "bg.assure": "Prvi odgovor u roku od jednog dana — bez ikakve obaveze.",
      "ft.pretitle": "Nit se vraća · <span class=\"arabic\" lang=\"ar\">أمانة</span>",
      "ft.h": "Predajte amanet<br>u <em>sigurne ruke.</em>",
      "ft.cta": "Predajte amanet",
      "ft.fallback": "ili pišite na <a href=\"mailto:info@emanet-ai.com\">info@emanet-ai.com</a>",
      "ft.assure": "Odgovaramo u roku od jednog dana · bez obaveza · razgovori ostaju povjerljivi",
      "ft.copy": "Kopiraj",
      "ft.copied": "Kopirano ✓",
      "ft.sig": "Čuvano kao amanet. <span class=\"ar\" aria-hidden=\"true\">أمانة</span>",
      "dl.get": "Šta dobijate",
      "dl.cost": "Koliko košta",
      "dl.approach": "Kako pristupamo",
      "dl.stack": "Stack",
      "dl.example": "Primjer iz našeg rada",
      "card.open": "Otvori ↗"
    },
    "detail": {
      "01": {
        "approach": "Počinjemo tako što pronađemo onih nekoliko zadataka koje zaista vrijedi automatizovati — one ponavljajuće koji jedu vrijeme vašeg tima — a ne sve što bismo mogli. Svaki asistent dobija samo pristup koji mu treba i granicu koju mora poštovati, te vodi evidenciju o svemu što uradi. Vaši dokumenti ostaju gdje jesu; ništa se ne kopira negdje gdje vi to ne vidite.",
        "priceRows": [
          [
            "Prva radna verzija",
            "€200"
          ],
          [
            "Cijeli projekt",
            "cijena po zadacima i alatima"
          ],
          [
            "Rad i održavanje",
            "od €10 / mj"
          ]
        ]
      },
      "02": {
        "approach": "Malu radnu verziju stavljamo pred vas rano i razvijamo je na otvorenom, da nikad ne čekate mjesecima na veliko otkrivanje. Gradimo je uredno da je sljedeća osoba može preuzeti — ne samo da nekako prođe danas. I ostajemo iskreni o tome šta je gotovo, šta je grubo, a šta je još uvijek nagađanje.",
        "priceRows": [
          [
            "Prva verzija · 1 izmjena",
            "€200"
          ],
          [
            "Cijela stranica / aplikacija",
            "cijena po doradi i funkcijama"
          ],
          [
            "Hosting i održavanje",
            "od €10 / mj"
          ]
        ]
      },
      "03": {
        "approach": "Vaše brojeve tretiramo kao nešto iza čega ćete morati stati, pa su sljedivi i testirani od početka. Cjevovod je građen da glasno otkaže i tiho se oporavi. A ista briga drži vaše podatke sigurnima za korištenje, bez curenja tamo gdje ne treba.",
        "priceRows": [
          [
            "Početni paket",
            "od €200"
          ],
          [
            "Cijeli projekt",
            "cijena po količini podataka i izvorima"
          ],
          [
            "Održavanje i nadzor",
            "od €10 / mj"
          ]
        ]
      },
      "04": {
        "approach": "Sve je zapisano kao kod, pa se vaša postavka može ponovo izgraditi umjesto da živi u nečijoj glavi. Ažuriranja trebaju biti dosadna — bez drame. Stvari dimenzionišemo prema onome što zaista koristite i čitamo račun s vama, stavku po stavku.",
        "priceRows": [
          [
            "Postavljanje",
            "cijena po veličini"
          ],
          [
            "Stalno upravljanje",
            "od €10 / mj"
          ]
        ]
      },
      "05": {
        "approach": "Sigurnost ugrađujemo od prvog dana, ne kao provjeru koju zakažemo za kraj. Lozinke i pristup vode se pažljivo, sigurnosne kopije se testiraju, a dostupnost je nešto na šta mislite tek kad je nestane. Ono što gradimo po pravilu je sigurno — ne pretvaramo se da smo vaš sigurnosni tim.",
        "priceRows": [
          [
            "Sigurnost",
            "ugrađena u samu izradu"
          ],
          [
            "Nadzor i sigurnosne kopije",
            "od €10 / mj"
          ]
        ]
      }
    },
    "aria": {
      "gate": "Pritisnite pečat i preuzmite amanet",
      "close": "Zatvori detalj"
    }
  },
  "ar": {
    "t": {
      "gate.eyebrow": "الأمانة — نحفظها ونعيدها كما هي",
      "gate.hint": "اضغط على الختم — أو مرّر للدخول",
      "gate.pitch": "استوديو من أربعة مهندسين — أتمتة بالذكاء الاصطناعي، تطبيقات ومواقع، بيانات. أول بناء €200.",
      "mail.sub.first": "اللمسة الأولى — €200",
      "mail.sub.main": "أمانة نضعها بين أيديكم",
      "mail.body": "ما نعمل به:\n\nما نحتاجه أولًا:\n\nالإطار الزمني التقريبي:\n",
      "wl.servis": "موقع ومعرض صور ولوحة إدارة لورشة إصلاح توربينات — من إنشاء طارق، وقيد التشغيل الفعلي.",
      "faq.idx": "أسئلة",
      "faq.h": "سُئلت بوضوح،<br>وأُجيبت بوضوح.",
      "faq.p": "ما يريد الناس معرفته فعلًا قبل أن يراسلونا.",
      "faq.q1": "لمن يعود الكود؟",
      "faq.a1": "لك — من أول سطر. المستودعات والمفاتيح والحسابات تُفتح باسمك وتُسلَّم كاملة. وإن افترقنا يومًا، يبقى كل شيء يعمل من دوننا.",
      "faq.q2": "ماذا لو لم تعجبني اللمسة الأولى؟",
      "faq.a2": "تخبرنا بصراحة. الـ€200 تغطي محاولة صادقة واحدة وجولة واحدة من ملاحظاتك — وإن لم يكن العمل مناسبًا بعدها، تحتفظ بما بُني ولا تدين بشيء آخر. لا اشتراك، ولا شيء يتجدد.",
      "faq.q3": "كيف نتواصل؟",
      "faq.a3": "مباشرة مع المهندس الذي يعمل على مشروعك — بريد إلكتروني أو واتساب/فايبر أو مكالمة. لا وسطاء ولا طوابير تذاكر. نراسلك عندما نُنجز شيئًا، وقبل أي خطوة فيها مخاطرة.",
      "faq.q4": "كم تكلفة الصيانة؟",
      "faq.a4": "من €10 شهريًا، تُذكر قبل التزامك. تشمل الاستضافة والتحديثات والنسخ الاحتياطي — ويمكن إلغاؤها في أي شهر، لأن المفاتيح مفاتيحك.",
      "faq.q5": "هل تعملون فقط داخل البوسنة؟",
      "faq.a5": "لا — نعمل عن بُعد بالعربية والإنجليزية والبوسنية. معظم أعمالنا تعبر الحدود؛ توقيتنا هو توقيت وسط أوروبا.",
      "gate.cursor": "اضغط لتترك أمانتك",
      "nav.practice": "خدماتنا",
      "nav.keepers": "الأمناء",
      "nav.pricing": "الأسعار",
      "nav.contact": "تواصل معنا",
      "th.sub": "العقدة 00 · الأمانة",
      "th.h": "<span class=\"ln\"><span class=\"w\">نحفظ</span></span><span class=\"ln\"><span class=\"w\">تقنيتك</span></span><span class=\"ln\"><span class=\"w w-gold\">كأمانة</span></span>",
      "th.thesis": "<b>توقّف عن إطلاق ميزات ذكاء اصطناعي معطوبة.</b> نبني وكلاء يمكنك الاعتماد عليهم، وتكاملات سلسة تثق بها فعلًا عند التشغيل الحقيقي.",
      "th.side": "<span class=\"arabic\" lang=\"ar\">أمانة</span> شيء تتركه عند من تثق به ليحفظه ويعيده كما هو. هكذا نبني البرمجيات تمامًا — ما تسلّمه لنا نحفظه ونعيده سليمًا.",
      "th.cue": "اتبع الخيط",
      "pr.idx": "خدماتنا",
      "pr.h": "خمسة تخصّصات،<br>على خيط واحد.",
      "pr.p": "ببساطة: نبني المواقع والتطبيقات وأدوات الذكاء الاصطناعي والأنظمة التي تعمل خلف الكواليس ويقوم عليها عملك — ونعتني بها بعد إطلاقها. كل ما يلي نوع من العمل الذي نقوم به.",
      "label.get": "ما تحصل عليه",
      "n1.tag": "العقدة 01 · أتمتة الذكاء الاصطناعي",
      "n1.h": "أتمتة الذكاء الاصطناعي والوكلاء",
      "n1.line": "مساعدون أذكياء يقومون بالعمل المتكرّر في شركتك — يجيبون عن الأسئلة المعتادة، وينقلون المعلومات بين أدواتك، ويرتّبون ويكتبون المسودّات — ويعرفون متى يتوقّفون ليسألوك.",
      "n1.dv": "المهام المملّة المتكرّرة نقوم بها بدلًا منك، والساعات التي توفّرها محسوبة فعلًا، وزرّ إيقاف بسيط بين يديك.",
      "n1.flex": "يعمل على أجهزة تتحكّم بها — بالصوت أو المحادثة أو عبر API",
      "n2.tag": "العقدة 02 · البرمجيات",
      "n2.h": "تطوير الويب والتطبيقات",
      "n2.line": "نبني موقعك أو تطبيقك — ما يراه عملاؤك ويستخدمونه فعلًا — ونحرص أن يكون سريعًا وسهل الاستخدام، وأن يستمرّ في العمل طويلًا بعد الإطلاق.",
      "n2.dv": "موقع أو تطبيق مكتمل — عادةً خلال ثلاثة أشهر تقريبًا — يبدو جيّدًا، ويعمل على الهواتف، ومبني ليدوم لا ليُطلق فقط.",
      "n3.tag": "العقدة 03 · هندسة البيانات",
      "n3.h": "هندسة البيانات",
      "n3.line": "نجمع معلوماتك المبعثرة في مكان واحد مرتّب وموثوق — لتكون الأرقام التي تبني عليها قراراتك صحيحة فعلًا.",
      "n3.dv": "تقارير ولوحات تثق بها، بعد تنظيف البيانات المبعثرة وترتيبها خلفها — مع الحفاظ على خصوصيّتها.",
      "n4.tag": "العقدة 04 · السحابة / DevOps",
      "n4.h": "السحابة وDevOps",
      "n4.line": "نجهّز ونعتني بالمكان الذي تعمل فيه برمجياتك على الإنترنت — ليبقى متاحًا، ويعمل بسرعة، ولا يفاجئك بفاتورة غير متوقّعة.",
      "n4.dv": "برمجياتك تعمل باستقرار على الإنترنت، وتحديثات تصدر بلا متاعب، وفاتورة شهرية يمكنك قراءتها بسهولة.",
      "n5.tag": "العقدة 05 · الأمان والموثوقية",
      "n5.h": "الأمان والموثوقية",
      "n5.line": "نُبقي ما نبنيه آمنًا ومتاحًا — بياناتك محميّة، وحساباتك مؤمَّنة، وموقعك يعمل حين يحتاجه عملاؤك.",
      "n5.dv": "حماية مدمجة منذ اليوم الأول، وكلمات المرور والصلاحيات تُدار كما يجب، ونُسخ احتياطية مختبَرة فعلًا. نجعل ما نبنيه آمنًا من البداية — لكننا لا ندّعي أننا فريق الأمان لديك.",
      "ke.idx": "الأمناء",
      "ke.h": "أربع أيادٍ<br>على الخيط نفسه.",
      "ke.p": "استوديو صغير عن قصد. كل أمين يوقّع عقدته. مهندس واحد، تعرفه بالاسم، يتولّى عملك من أوّله إلى آخره ويجيب عنه مباشرة — دون تسليمه لأشخاص لم تقابلهم.",
      "role.data": "مهندس بيانات",
      "role.ai": "مهندس أتمتة الذكاء الاصطناعي",
      "role.devops": "مهندس DevOps",
      "role.fullstack": "مهندس Full-Stack",
      "bio.ajdin": "يبني خطوط البيانات والأسس التي نقف عليها جميعًا.",
      "bio.tarik": "يصمّم وكلاء يتصرّفون بحكمة — أتمتة تعرف حدودها وتستأذنك قبل تجاوزها.",
      "bio.eman": "يبقي عمليات النشر بلا مفاجآت والخدمة تعمل دائمًا.",
      "bio.aner": "من قاعدة البيانات إلى الشاشة — كل الطبقات مترابطة.",
      "wo.idx": "أعمال مختارة",
      "wo.h": "ما<br>أطلقناه فعلًا.",
      "wo.p": "أعمال حقيقية من الفريق — لا شعارات عملاء، ولا استعراض دراسات حالة. مجرّد عمل، نسمّيه ببساطة.",
      "wl.mostay": "موقع لفندق صغير في موستار — Next.js ثابت وسريع.",
      "wl.cloudops": "وكيل LangChain يشغّل بنية Google Cloud ويتّخذ القرارات بشأنها.",
      "wl.pipeline": "خط بيانات متدفّق بلا خوادم على Google Cloud.",
      "wl.dataviz": "تحليل استكشافي للبيانات وعرضها بالرسوم بلغة Python، يشمل دراسة لبيانات Spotify.",
      "wl.parallel": "يخطّط الهدف، ويوزّعه على فريق من عمّال الذكاء الاصطناعي في نوافذ tmux، ثم يدمج نتائجهم في عمل واحد متكامل.",
      "wl.relay": "استدعِ وكيلًا سحابيًا غير متزامن كأنه دالة Python عادية — الطلب عبر webhook والنتيجة عبر جدول Airtable. بلا اعتماديات.",
      "wl.digest": "ملخّص يومي محلي — خلاصة واحدة منظّمة لرسائل Gmail وSlack والتقويم. تخزين في SQLite وتلخيص بالذكاء الاصطناعي.",
      "pn.eyebrow": "الخط الذي نلتزم به",
      "pn.quote": "نقبل ما نستطيع إنجازه <b>بصدق وإتقان</b> — ونكون صريحين معك في ما عدا ذلك.",
      "pn.note": "إنها مسألة اهتمام، لا قواعد. الحرص نفسه الذي يجعلنا نحمي بياناتك يجعلنا صادقين بشأن العمل — وسريعين في مصارحتك، وجهًا لوجه، إن لم نكن المناسبين له.",
      "pn.gloss": "أمانة — شيء نحفظه ونعيده كاملًا",
      "pf.idx": "ما نتمسّك به",
      "pf.h": "نفضّل أن نُري<br>لا أن نقول.",
      "pf.p": "لا أرقام للتباهي. الدليل في ما نرفض القيام به، وفي ما نقبل أن نُحاسَب عليه.",
      "pf.t1": "المحلّي أولًا",
      "pf.k1": "تستطيع فصله متى شئت.",
      "pf.v1": "ما نبنيه يعمل على أجهزة تتحكّم بها. لا شيء يخرج منها إلا ما ترسله أنت، ولا سحابة لا تستطيع إيقافها.",
      "pf.t2": "اقرأ الكود المصدري",
      "pf.k2": "مكتوب لتراجعه بنفسك.",
      "pf.v2": "كود واضح بما يكفي ليتابعه غيرك، وموثَّق بما يكفي لتثق به، ويُسلَّم سليمًا.",
      "pf.t3": "مملوكة لا مستأجَرة",
      "pf.k3": "المفاتيح ملكك.",
      "pf.v3": "بنية تحتية تملكها، واعتماديات يمكنك إزالتها. لا قيود خفيّة مغلّفة كأنها ميزة.",
      "bg.idx": "كيف نبدأ",
      "bg.h": "ابدأ صغيرًا،<br>واكسب الباقي.",
      "bg.p": "الثقة تُبنى خطوة خطوة. نُثبت عملنا على شيء صغير قبل أن تلتزم بالمشروع كاملًا — بلا التزام مالي مسبق، وبلا قيود.",
      "bg.step1": "الخطوة الأولى · اللمسة الأولى",
      "bg.name1": "موقع بسيط، مبني فعلًا",
      "bg.price1": "€200<small> ثابت · جولة مراجعة واحدة</small>",
      "bg.desc1": "نبني النسخة الأولى من موقع بسيط — مصمَّمة ومبرمَجة ومنشورة — ثم نأخذ جولة واحدة من ملاحظاتك عليها. يصبح بين يديك عمل مكتمل قبل أن تقرّر أي شيء أكبر.",
      "bg.note1": "موقع منشور · مراجعة واحدة · ملك لك",
      "bg.step2": "الخطوة الثانية · البناء الكامل",
      "bg.name2": "نحدّده معًا، بعد أن تُبنى الثقة",
      "bg.price2": "سعر واضح<small> بعد اللمسة الأولى</small>",
      "bg.desc2": "حين تثبت اللمسة الأولى نفسها، نحدّد بقيّة العمل معك — الموقع أو المنتج كاملًا، بسعر بندًا بندًا. أنت تملك الكود والمفاتيح، ونسلّمها إليك كاملة.",
      "bg.note2": "تملك كل ما نبنيه",
      "bg.cta": "ابدأ باللمسة الأولى",
      "bg.assure": "أول ردّ خلال يوم واحد — دون أي التزام.",
      "ft.pretitle": "الخيط يعود · <span class=\"arabic\" lang=\"ar\">أمانة</span>",
      "ft.h": "ضع أمانتك<br>في <em>أيدٍ أمينة.</em>",
      "ft.cta": "اترك أمانتك",
      "ft.fallback": "أو راسلنا على <a href=\"mailto:info@emanet-ai.com\">info@emanet-ai.com</a>",
      "ft.assure": "نرد خلال يوم واحد · دون أي التزام · محادثاتنا تبقى سرّية",
      "ft.copy": "انسخ",
      "ft.copied": "تم النسخ ✓",
      "ft.sig": "محفوظ كأمانة. <span class=\"ar\" aria-hidden=\"true\">أمانة</span>",
      "dl.get": "ما تحصل عليه",
      "dl.cost": "كم يكلّف",
      "dl.approach": "كيف نتعامل معه",
      "dl.stack": "التقنيات",
      "dl.example": "مثال من أعمالنا",
      "card.open": "افتح ↗"
    },
    "detail": {
      "01": {
        "approach": "نبدأ بتحديد المهام القليلة التي تستحقّ الأتمتة فعلًا — المتكرّرة التي تستهلك وقت فريقك — لا كل ما نستطيع. كل مساعد يأخذ فقط الصلاحيات التي يحتاجها، ويحتفظ بسجلّ لما فعله، وله حدّ يلتزم به. تبقى مستنداتك مكانها، ولا نَنسخ شيئًا إلى مكان لا تراه.",
        "priceRows": [
          [
            "أول نسخة عاملة",
            "€200"
          ],
          [
            "البناء الكامل",
            "حسب المهام والأدوات"
          ],
          [
            "التشغيل والصيانة",
            "من €10 / شهريًا"
          ]
        ]
      },
      "02": {
        "approach": "نضع بين يديك نسخة صغيرة عاملة مبكّرًا ونطوّرها أمامك خطوة بخطوة، فلا تنتظر شهورًا من أجل مفاجأة كبيرة. نبنيها بشكل نظيف ليستطيع من يأتي بعدنا متابعتها — لا لمجرّد إنهاء اليوم. ونبقى صادقين بشأن ما اكتمل، وما لا يزال غير جاهز، وما هو مجرّد تخمين.",
        "priceRows": [
          [
            "النسخة الأولى · مراجعة واحدة",
            "€200"
          ],
          [
            "الموقع / التطبيق الكامل",
            "حسب التشطيب والميزات"
          ],
          [
            "الاستضافة والصيانة",
            "من €10 / شهريًا"
          ]
        ]
      },
      "03": {
        "approach": "نتعامل مع أرقامك على أنها شيء سيكون عليك الوقوف خلفه، فتكون قابلة للتتبّع ومختبَرة منذ البداية. والبنية الداخلية مبنية لتُظهر أعطالها بوضوح وتتعافى بهدوء. والعناية نفسها تُبقي بياناتك آمنة للاستخدام دون أن تتسرّب إلى حيث لا يجب.",
        "priceRows": [
          [
            "البداية",
            "من €200"
          ],
          [
            "البناء الكامل",
            "حسب حجم البيانات ومصادرها"
          ],
          [
            "الصيانة والمراقبة",
            "من €10 / شهريًا"
          ]
        ]
      },
      "04": {
        "approach": "كل شيء مكتوب ككود، فيمكن إعادة بناء إعداداتك بدل أن تبقى في رأس شخص واحد. والتحديثات يجب أن تكون مملّة — بلا متاعب. نحدّد الحجم حسب ما تستخدمه فعلًا، ونقرأ الفاتورة معك بندًا بندًا.",
        "priceRows": [
          [
            "الإعداد",
            "حسب الحجم"
          ],
          [
            "الإدارة المستمرّة",
            "من €10 / شهريًا"
          ]
        ]
      },
      "05": {
        "approach": "نبني الأمان من اليوم الأول، لا كفحص نؤجّله إلى النهاية. كلمات المرور والصلاحيات تُدار بعناية، والنُّسخ الاحتياطية مختبَرة، والبقاء على الإنترنت شيء لا تنتبه له إلا حين يغيب. نجعل ما نبنيه آمنًا من البداية — لكننا لا ندّعي أننا فريق الأمان لديك.",
        "priceRows": [
          [
            "الأمان",
            "مدمج في البناء"
          ],
          [
            "المراقبة والنُّسخ الاحتياطية",
            "من €10 / شهريًا"
          ]
        ]
      }
    },
    "aria": {
      "gate": "اضغط على الختم لتترك أمانتك",
      "close": "إغلاق التفاصيل"
    }
  }
};
