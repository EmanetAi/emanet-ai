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
      "gate.hint": "pritisnite pečat i preuzmite amanet",
      "gate.cursor": "pritisnite i preuzmite amanet",
      "nav.practice": "Praksa",
      "nav.keepers": "Čuvari",
      "nav.pricing": "Cijene",
      "nav.contact": "Kontakt",
      "th.sub": "ČVOR 00 · AMANET",
      "th.h": "<span class=\"ln\"><span class=\"w\">Vašu</span> <span class=\"w\">tehnologiju</span></span><span class=\"ln\"><span class=\"w\">čuvamo</span></span><span class=\"ln\"><span class=\"w\">kao</span> <span class=\"w\">amanet.</span></span>",
      "th.thesis": "Amanet (<span class=\"arabic\" lang=\"ar\">أمانة</span>) je nešto što vam je predano na čuvanje, da bude vraćeno cijelo. Softver gradimo na isti način — ono što nam povjerite, čuvamo i vraćamo netaknuto.",
      "th.side": "Inženjerski studio vođen kao radionica, ne kao pogon. Kod, sistemi i tišina između izdanja.",
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
      "wl.parallel": "Razloži cilj na flotu AI agenata koji rade paralelno, pa spoji njihov rezultat u jedan.",
      "wl.relay": "Pozovi AI agenta kao običnu funkciju — webhook okidač uz relej poštanskog sandučića, bez ijedne zavisnosti.",
      "wl.mostay": "Web stranica za butik hotel u Mostaru — brzi statički Next.js.",
      "wl.cloudops": "LangChain agent koji upravlja i rasuđuje nad Google Cloud infrastrukturom.",
      "wl.pipeline": "Streaming, serverless cjevovod podataka na Google Cloudu.",
      "wl.classroom": "Nativna Android aplikacija: QR evidencija prisustva, kvizovi uživo, AI objašnjenja, uvid u nastavu u realnom vremenu.",
      "wl.iac": "Ojačavanje i infrastruktura-kao-kod na GCP-u: Cloud Armor, KMS, VPC, GKE.",
      "wl.dataviz": "Eksplorativna analiza i vizualizacija podataka u Pythonu, uključujući studiju Spotify skupa podataka.",
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
      "ft.pretitle": "Nit se vraća · <span class=\"arabic\" lang=\"ar\">أمانة</span>",
      "ft.h": "Predajte amanet<br>u <em>sigurne ruke.</em>",
      "ft.cta": "Predajte amanet",
      "ft.fallback": "ili pišite na <a href=\"mailto:salam@emanet.ai\">salam@emanet.ai</a>",
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
      "gate.eyebrow": "الأمانة — وديعةٌ تُصان وتُرَدّ",
      "gate.hint": "اضغط على الختم لتُودِع أمانتك",
      "gate.cursor": "اضغط لتُودِع أمانتك",
      "nav.practice": "الممارسة",
      "nav.keepers": "الأُمناء",
      "nav.pricing": "الأسعار",
      "nav.contact": "تواصل",
      "th.sub": "العقدة 00 · الأمانة",
      "th.h": "<span class=\"ln\"><span class=\"w\">نحفظ</span></span><span class=\"ln\"><span class=\"w\">تقنيتك</span></span><span class=\"ln\"><span class=\"w\">أمانةً</span></span>",
      "th.thesis": "<span class=\"arabic\" lang=\"ar\">أمانة</span>: وديعةٌ تُوضَع في رعايتك لتُرَدَّ كاملةً. هكذا نبني البرمجيات تمامًا — ما تُسلِّمه إلينا نرعاه ونُعيده سليمًا.",
      "th.side": "استوديو هندسي يُدار كورشةٍ صغيرة، لا كخطِّ إنتاج. الشِّفرة، والأنظمة، والهدوء بين الإصدارات.",
      "th.cue": "اتبع الخيط",
      "pr.idx": "الممارسة",
      "pr.h": "خمسة تخصُّصات،<br>محمولةٌ على خيطٍ واحد.",
      "pr.p": "بعبارةٍ بسيطة: نبني المواقع والتطبيقات وأدوات الذكاء الاصطناعي والأنظمة الخفيّة التي يقوم عليها عملك — ونرعاها بعد أن تنطلق. كلُّ ما يلي نوعٌ من العمل نتولّاه.",
      "label.get": "ما تحصل عليه",
      "n1.tag": "العقدة 01 · أتمتة الذكاء الاصطناعي",
      "n1.h": "أتمتة الذكاء الاصطناعي والوكلاء",
      "n1.line": "مساعدون أذكياء يتولّون العمل المتكرّر في مؤسستك — يجيبون عن الأسئلة الروتينية، وينقلون المعلومات بين أدواتك، ويفرزون ويكتبون المسوّدات — ويعرفون متى يتوقّفون ليرجعوا إليك.",
      "n1.dv": "المهامّ المملّة المتكرّرة تُنجَز عنك، والساعات التي توفّرها محسوبةٌ فعلًا، ومفتاح إيقافٍ بسيط بين يديك.",
      "n1.flex": "يعمل على عتادٍ تتحكّم فيه — بالصوت أو المحادثة أو عبر API",
      "n2.tag": "العقدة 02 · البرمجيات",
      "n2.h": "تطوير الويب والتطبيقات",
      "n2.line": "نبني موقعك أو تطبيقك — ما يراه عملاؤك ويستخدمونه فعلًا — ونحرص أن يكون سريعًا، سهل الاستخدام، وأن يظلَّ يعمل طويلًا بعد الإطلاق.",
      "n2.dv": "موقعٌ أو تطبيقٌ مكتمل — عادةً في نحو ثلاثة أشهر — يبدو كما ينبغي، ويعمل على الهواتف، ومبنيٌّ ليدوم، لا ليُطلَق فحسب.",
      "n3.tag": "العقدة 03 · هندسة البيانات",
      "n3.h": "هندسة البيانات",
      "n3.line": "نجمع معلوماتك المبعثرة في مكانٍ واحدٍ مرتّبٍ جديرٍ بالثقة — لتكون الأرقام التي تبني عليها قراراتك صحيحةً فعلًا.",
      "n3.dv": "تقارير ولوحات معلومات تثق بها، بعد تنظيف البيانات الفوضوية وترتيبها خلفها — مع الحفاظ على خصوصيّتها.",
      "n4.tag": "العقدة 04 · السحابة / DevOps",
      "n4.h": "السحابة وDevOps",
      "n4.line": "نُهيّئ ونرعى المكان الذي تعيش فيه برمجياتك على الإنترنت — ليبقى متاحًا، ويعمل بسرعة، ولا يُفاجئك بفاتورةٍ غير متوقَّعة.",
      "n4.dv": "برمجياتك تعمل بثباتٍ على الإنترنت، وتحديثاتٌ تصدر بلا متاعب، وفاتورةٌ شهرية يمكنك قراءتها فعلًا.",
      "n5.tag": "العقدة 05 · الأمان والموثوقية",
      "n5.h": "الأمان والموثوقية",
      "n5.line": "نُبقي ما نبنيه آمنًا ومتاحًا — بياناتك محميّة، وحساباتك مُحكَمة، وموقعك يعمل حين يحتاجه عملاؤك.",
      "n5.dv": "حمايةٌ مدمجةٌ منذ اليوم الأول، وكلمات المرور والوصول تُدار كما ينبغي، ونُسَخٌ احتياطية مُختبَرةٌ فعلًا. نجعل ما نبنيه آمنًا افتراضيًّا — ولا ندّعي أننا فريق الأمان لديك.",
      "ke.idx": "الأُمناء",
      "ke.h": "أربع أيادٍ<br>على الخيط ذاته.",
      "ke.p": "استوديو صغيرٌ عن قصد. كلُّ أمينٍ يُوقّع عقدته. مهندسٌ واحدٌ باسمه يتولّى عملك من أوّله إلى آخره ويُجيب عنه مباشرةً — دون تسليمٍ لأشخاصٍ لم تلتقِ بهم قط.",
      "role.data": "مهندس بيانات",
      "role.ai": "مهندس أتمتة الذكاء الاصطناعي",
      "role.devops": "مهندس DevOps",
      "role.fullstack": "مهندس Full-Stack",
      "bio.ajdin": "يبني خطوط المعالجة والعقود التي نقف عليها جميعًا.",
      "bio.tarik": "يُصمّم وكلاء يتصرّفون باتّزان — أتمتةٌ تعرف حدودها وتستأذن قبل تجاوزها.",
      "bio.eman": "يُبقي عمليات النشر بلا مفاجآت والخدمة قائمة.",
      "bio.aner": "من المخطّط إلى الشاشة — الطبقات كلّها، مشدودةٌ معًا.",
      "wo.idx": "أعمالٌ مختارة",
      "wo.h": "ما<br>أطلقناه فعلًا.",
      "wo.p": "أعمالٌ حقيقية من الفريق — لا شعارات عملاء، ولا استعراض دراسات حالة. العمل، مُسمّى ببساطة.",
      "wl.parallel": "تفكيك هدفٍ إلى أسطولٍ من وكلاء الذكاء الاصطناعي يعملون بالتوازي، ثم دمج مخرجاتهم في نتيجةٍ واحدة.",
      "wl.relay": "استدعاء وكيل ذكاء اصطناعي كأنّه دالّةٌ عادية — مُحفّز webhook مع مُرحِّل صندوق بريد، بلا أيّ اعتماديات.",
      "wl.mostay": "موقعٌ لفندقٍ صغير في موستار — Next.js ثابتٌ وسريع.",
      "wl.cloudops": "وكيل LangChain يُشغّل بنية Google Cloud ويستدلّ عليها.",
      "wl.pipeline": "خطُّ بياناتٍ تدفّقي بلا خوادم على Google Cloud.",
      "wl.classroom": "تطبيق Android أصلي: حضورٌ عبر QR، واختباراتٌ حيّة، وشروحٌ بالذكاء الاصطناعي، ورؤى تعليمية لحظية.",
      "wl.iac": "تحصينٌ وبنيةٌ تحتية ككود عبر GCP: Cloud Armor وKMS وVPC وGKE.",
      "wl.dataviz": "تحليلٌ استكشافي للبيانات وتصويرها بلغة Python، يشمل دراسة مجموعة بيانات Spotify.",
      "pn.eyebrow": "الحدُّ الذي نلتزم به",
      "pn.quote": "نتولّى ما يمكننا إنجازه <b>بصدقٍ وإتقان</b> — ونصارحك في ما عدا ذلك.",
      "pn.note": "إنها مسألة عنايةٍ لا قواعد. الغريزة ذاتها التي تجعلنا نحرس بياناتك تُبقينا صادقين بشأن العمل — وسريعين في مصارحتك، وجهًا لوجه، إن لم نكن الأيدي المناسبة له.",
      "pn.gloss": "أمانة — وديعةٌ تُصان وتُرَدُّ كاملةً",
      "pf.idx": "ما نتمسّك به",
      "pf.h": "نُؤثِر أن نُرِيَ<br>لا أن نقول.",
      "pf.p": "لا مقاييس للتباهي. البرهان في ما نقبل رفضه، وفي ما نقبل أن نُحاسَب عليه.",
      "pf.t1": "المحلّي أولًا",
      "pf.k1": "لك أن تفصله متى شئت.",
      "pf.v1": "ما نبنيه يعمل على أجهزةٍ تتحكّم فيها. لا شيء يغادرها لم تُرسله أنت، ولا سحابة لا يمكنك إطفاؤها.",
      "pf.t2": "اقرأ الشِّفرة المصدرية",
      "pf.k2": "مكتوبةٌ لتُدقَّق.",
      "pf.v2": "شِفرةٌ واضحةٌ بما يكفي لتُورَّث، موثَّقةٌ بما يكفي لتُوثَق، وتُسلَّم سليمة.",
      "pf.t3": "مملوكةٌ لا مُستأجَرة",
      "pf.k3": "المفاتيح ملكك.",
      "pf.v3": "بنيةٌ تحتية تملكها واعتماديات يمكنك إزالتها. لا احتكارَ مُقنَّعًا في ثوب ميزة.",
      "bg.idx": "كيف نبدأ",
      "bg.h": "ابدأ صغيرًا.<br>واكسب الباقي.",
      "bg.p": "الثقة تُمنَح خطوةً خطوة. نُثبت العمل على شيءٍ صغير قبل أن تلتزم بالبناء كاملًا — بلا أتعابٍ مُسبقة، وبلا احتكار.",
      "bg.step1": "الخطوة الأولى · اللمسة الأولى",
      "bg.name1": "موقعٌ بسيط، مبنيٌّ فعلًا",
      "bg.price1": "€200<small> ثابت · جولة مراجعة واحدة</small>",
      "bg.desc1": "نبني النسخة الأولى من موقعٍ بسيط — مُصمَّمة، ومُبرمَجة، ومنشورة — ثم نمرّ بها في جولةٍ واحدة من ملاحظاتك. تُمسك عملًا مكتملًا بين يديك قبل أن تقرّر أيّ شيءٍ أكبر.",
      "bg.note1": "موقعٌ منشور · مراجعةٌ واحدة · مِلكٌ لك",
      "bg.step2": "الخطوة الثانية · البناء الكامل",
      "bg.name2": "نُحدّد نطاقه معًا، حين تُكتسَب الثقة",
      "bg.price2": "سعرٌ واضح<small> بعد اللمسة الأولى</small>",
      "bg.desc2": "حين تستحقّ اللمسة الأولى ذلك، نُحدّد بقيّة النطاق معك — الموقع أو المنتج كاملًا، بسعرٍ بندًا بندًا. أنت تملك الشِّفرة والمفاتيح؛ ونُسلّمها إليك كاملة.",
      "bg.note2": "تملك كلَّ ما نبنيه",
      "bg.cta": "ابدأ باللمسة الأولى",
      "ft.pretitle": "الخيط يعود · <span class=\"arabic\" lang=\"ar\">أمانة</span>",
      "ft.h": "ضَعْ أمانةً<br>في <em>أيدٍ أمينة.</em>",
      "ft.cta": "أودِع أمانتك",
      "ft.fallback": "أو راسلنا على <a href=\"mailto:salam@emanet.ai\">salam@emanet.ai</a>",
      "ft.sig": "محفوظٌ أمانةً. <span class=\"ar\" aria-hidden=\"true\">أمانة</span>",
      "dl.get": "ما تحصل عليه",
      "dl.cost": "كم يكلّف",
      "dl.approach": "كيف نتعامل معه",
      "dl.stack": "التقنيات",
      "dl.example": "مثالٌ من أعمالنا",
      "card.open": "افتح ↗"
    },
    "detail": {
      "01": {
        "approach": "نبدأ بتحديد الحفنة من المهامّ التي تستحقّ الأتمتة فعلًا — تلك المتكرّرة التي تلتهم وقت فريقك — لا كلِّ ما نقدر عليه. كلُّ مساعدٍ لا يُمنَح إلا الصلاحيات التي يحتاجها، ويحتفظ بسجلٍّ لما فعله، وله حدٌّ عليه احترامه. تبقى مستنداتك حيث هي؛ ولا يُنسَخ شيءٌ إلى مكانٍ لا تراه.",
        "priceRows": [
          [
            "أول نسخة عاملة",
            "€200"
          ],
          [
            "البناء الكامل",
            "بسعرٍ وفق المهامّ والأدوات"
          ],
          [
            "التشغيل والصيانة",
            "من €10 / شهريًا"
          ]
        ]
      },
      "02": {
        "approach": "نضع بين يديك نسخةً صغيرة عاملة مبكّرًا ونُنمّيها على المكشوف، فلا تنتظر شهورًا من أجل كشفٍ كبير. نبنيها بنظافةٍ ليتمكّن من يأتي بعدنا من متابعتها — لا لمجرّد تدبّر اليوم. ونبقى صادقين بشأن ما اكتمل، وما لا يزال خشِنًا، وما هو مجرّد تخمين.",
        "priceRows": [
          [
            "النسخة الأولى · مراجعة واحدة",
            "€200"
          ],
          [
            "الموقع / التطبيق الكامل",
            "بسعرٍ وفق الصقل والميزات"
          ],
          [
            "الاستضافة والصيانة",
            "من €10 / شهريًا"
          ]
        ]
      },
      "03": {
        "approach": "نتعامل مع أرقامك بوصفها ما سيكون عليك الوقوف خلفه، فتكون قابلةً للتتبّع ومُختبَرة منذ البداية. والبنية الداخلية مبنيّةٌ لتُعلِن أعطالها بصوتٍ عالٍ وتتعافى بهدوء. والعناية ذاتها تُبقي بياناتك آمنةً للاستخدام دون أن تتسرّب إلى حيث لا ينبغي.",
        "priceRows": [
          [
            "البداية",
            "من €200"
          ],
          [
            "البناء الكامل",
            "بسعرٍ وفق حجم البيانات ومصادرها"
          ],
          [
            "الصيانة والمراقبة",
            "من €10 / شهريًا"
          ]
        ]
      },
      "04": {
        "approach": "كلُّ شيءٍ مكتوبٌ ككود، فيُعاد بناءُ تهيئتك بدلًا من أن تعيش في رأس شخصٍ واحد. ويُفترَض في التحديثات أن تكون مملّةً — بلا متاعب. نُقدّر الحجم وفق ما تستخدمه فعلًا، ونقرأ الفاتورة معك، بندًا بندًا.",
        "priceRows": [
          [
            "التهيئة",
            "بسعرٍ وفق الحجم"
          ],
          [
            "الإدارة المستمرّة",
            "من €10 / شهريًا"
          ]
        ]
      },
      "05": {
        "approach": "نبني الأمان من اليوم الأول، لا كفحصٍ نؤجّله إلى النهاية. كلمات المرور والوصول تُدار بعناية، والنُّسَخ الاحتياطية مُختبَرة، والبقاء على الإنترنت أمرٌ لا تفكّر فيه إلا حين يغيب. نجعل ما نبنيه آمنًا افتراضيًّا — ولا ندّعي أننا فريق الأمان لديك.",
        "priceRows": [
          [
            "الأمان",
            "مدمجٌ في البناء"
          ],
          [
            "المراقبة والنُّسَخ الاحتياطية",
            "من €10 / شهريًا"
          ]
        ]
      }
    },
    "aria": {
      "gate": "اضغط على الختم لتُودِع أمانتك",
      "close": "إغلاق التفاصيل"
    }
  }
};
