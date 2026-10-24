/* ── Shama Cart ──
   سلة شراء بسيطة: تضيف المنتجات، تجمع بيانات الزبونة، وترسل الطلب لواتساب صاحبة المتجر.
   الإعدادات والأسعار في أول الملف.                                                      */
(function () {
  'use strict';

  /* ===== الإعدادات ===== */
  var WHATSAPP = '905058424680';   // رقم واتساب المتجر (بدون +)
  var CURRENCY = ' ₺';              // رمز العملة اللي بتظهر جنب الأسعار
  var STORAGE_KEY = 'shama_cart_v1';

  /* ===== الأسعار =====
     اكتبي سعر كل منتج حسب رقمه (data-id). مثال:
       'p2c0': 45,
       'p27c0': 80,
     أي منتج بدون سعر رح يظهر بالطلب "السعر يُحدد عند التأكيد". */
  var PRICES = {
    // 'p2c0': 45,
  };

  /* ===== النصوص ===== */
  var T = {
    ar: {
      cart: 'سلة التسوق', emptyT: 'سلتكِ فارغة حالياً', emptyS: 'أضيفي شنطتكِ المفضلة وابدئي',
      browse: 'تصفحي الشنط', add: '🛍️ أضيفي إلى السلة', added: 'تمت الإضافة إلى السلة ✓',
      price: 'السعر', remove: 'حذف', subtotal: 'مجموع المنتجات', shipping: 'الشحن', free: 'مجاني 🎁',
      total: 'الإجمالي', checkout: 'إتمام الطلب', back: 'رجوع للسلة',
      fullName: 'الاسم الكامل', phone: 'رقم الهاتف (للتواصل والشحن)',
      address: 'العنوان الكامل (المدينة، الحي، الشارع، رقم البناء)',
      loc: '📍 إضافة موقعي الحالي (اختياري)', locOk: '✓ تمت إضافة موقعكِ', locFail: 'تعذّر تحديد الموقع، اكتبي العنوان يدوياً',
      send: 'إرسال الطلب عبر واتساب', shipBar: '✦ الشحن مجاني على جميع الطلبات ✦',
      shipNote: '🚚 الشحن مجاني على جميع الطلبات',
      gift: '🎁 أريد تغليف هدية لهذه القطعة', giftNote: 'بفرق سعر بسيط', giftChip: '🎁 تغليف هدية', giftAdd: 'إضافة تغليف هدية', giftDel: 'إلغاء التغليف',
      eName: 'اكتبي الاسم الأول والأخير', ePhone: 'اكتبي رقم هاتف صحيح', eAddr: 'اكتبي العنوان بشكل أوضح (المدينة والحي والشارع)',
      thanksT: 'تم تجهيز طلبكِ 💕', thanksS: 'انفتح الواتساب برسالة الطلب، اضغطي إرسال لنأكد معكِ. إذا ما انفتح، اضغطي الزر تحت.',
      reopen: 'فتح الواتساب مرة ثانية', close: 'إغلاق', color: 'اللون', tbd: 'يُحدد عند التأكيد', pcs: 'قطعة'
    },
    en: {
      cart: 'Shopping Cart', emptyT: 'Your cart is empty', emptyS: 'Add your favourite bag to begin',
      browse: 'Browse bags', add: '🛍️ Add to cart', added: 'Added to cart ✓',
      price: 'Price', remove: 'Remove', subtotal: 'Subtotal', shipping: 'Shipping', free: 'Free 🎁',
      total: 'Total', checkout: 'Checkout', back: 'Back to cart',
      fullName: 'Full name', phone: 'Phone number (for shipping)',
      address: 'Full address (city, district, street, building no.)',
      loc: '📍 Add my current location (optional)', locOk: '✓ Location added', locFail: 'Could not get location, please type your address',
      send: 'Send order via WhatsApp', shipBar: '✦ Free shipping on all orders ✦',
      shipNote: '🚚 Free shipping on all orders',
      gift: '🎁 I want gift wrapping for this piece', giftNote: 'small price difference', giftChip: '🎁 Gift wrapped', giftAdd: 'Add gift wrap', giftDel: 'Remove gift wrap',
      eName: 'Enter first and last name', ePhone: 'Enter a valid phone number', eAddr: 'Please write a fuller address (city, district, street)',
      thanksT: 'Your order is ready 💕', thanksS: 'WhatsApp opened with your order message. Press send to confirm. If it did not open, use the button below.',
      reopen: 'Open WhatsApp again', close: 'Close', color: 'Color', tbd: 'Confirmed on order', pcs: 'pcs'
    }
  };
  var T2 = {
    ar: {
      gateT: 'بيانات التوصيل', gateS: 'قبل إضافة أي شنطة للسلة، اكتبي بياناتكِ مرة وحدة لنجهّز طلبكِ بشكل صحيح.',
      fName: 'الاسم الكامل (بالتركي أو الإنجليزي)', fCity: 'المدينة (Şehir)', fDist: 'المنطقة / الحي (İlçe / Mahalle)',
      fBld: 'رقم البناية', fApt: 'رقم الشقة', fPhone: 'رقم الهاتف التركي', fNotes: 'ملاحظات العنوان (الشارع، علامة مميزة) — اختياري',
      saveGo: 'حفظ ومتابعة', saveOnly: 'حفظ التعديلات', editInfo: 'تعديل', infoT: 'بيانات التوصيل',
      eName2: 'اكتبي الاسم الأول والأخير بأحرف تركية أو إنجليزية فقط', eCity: 'اكتبي اسم المدينة', eDist: 'اكتبي المنطقة أو الحي',
      eBld: 'اكتبي رقم البناية', eApt: 'اكتبي رقم الشقة', ePhone2: 'اكتبي رقم تركي صحيح مثل 05XX XXX XX XX',
      order: 'رقم الطلب', needInfo: 'أكملي بيانات التوصيل أولاً', baseLbl: 'مقاس القاعدة', cardBase: 'قاعدة', cm: 'سم', soldOut: 'نفذت الكمية', soldNote: 'هذا اللون نفذ حالياً، اختاري لوناً آخر 🤍', imgT: '📷 خطوة أخيرة: أرسلي صورة طلبكِ', imgS: 'صورة فيها المنتجات اللي طلبتيها مع كل بياناتكِ. أرسليها لنفس محادثة واتساب حتى توصل صاحبة المتجر كاملة.', shareImg: '📷 إرسال الصورة عبر واتساب', saveImg: '⬇️ حفظ الصورة', blockedHint: 'المتصفح منع فتح الرابط من هنا. نسخنا لكِ المطلوب ✓ الصقيه مباشرة في التطبيق', ctT: 'تواصلي معنا', ctS: 'اختاري الطريقة الأنسب إلكِ', wa: 'واتساب', waBtn: 'ابدئي المحادثة', ig: 'إنستغرام', igBtn: 'زيارة الحساب', prevS: 'السابق', nextS: 'التالي', copy: 'نسخ', copied: 'تم النسخ ✓', blockedBody: 'المتصفح منع فتح الواتساب من هون، بس طلبكِ جاهز. انسخي الرسالة وابعتيها على واتساب شامة:', copyMsg: 'نسخ رسالة الطلب', openWa: 'فتح الواتساب', waNote: 'رح ينفتح واتساب شامة والرسالة جاهزة، اضغطي إرسال:'
    },
    en: {
      gateT: 'Delivery details', gateS: 'Before adding any bag to your cart, enter your details once so we can prepare your order correctly.',
      fName: 'Full name (Turkish or English letters)', fCity: 'City (Şehir)', fDist: 'District / Neighborhood (İlçe / Mahalle)',
      fBld: 'Building no.', fApt: 'Apartment no.', fPhone: 'Turkish phone number', fNotes: 'Address notes (street, landmark) — optional',
      saveGo: 'Save & continue', saveOnly: 'Save changes', editInfo: 'Edit', infoT: 'Delivery details',
      eName2: 'Enter first and last name using Turkish or English letters only', eCity: 'Enter the city', eDist: 'Enter the district or neighborhood',
      eBld: 'Enter the building number', eApt: 'Enter the apartment number', ePhone2: 'Enter a valid Turkish number, e.g. 05XX XXX XX XX',
      order: 'Order no.', needInfo: 'Please complete your delivery details first', baseLbl: 'Base size', cardBase: 'Base', cm: 'cm', soldOut: 'Sold out', soldNote: 'This color is currently sold out, please choose another 🤍', imgT: '📷 Last step: send your order image', imgS: 'An image with the pieces you ordered and all your details. Send it to the same WhatsApp chat so the shop gets everything.', shareImg: '📷 Send image via WhatsApp', saveImg: '⬇️ Save image', blockedHint: 'Your browser blocked the link from here. Copied for you ✓ — paste it in the app', ctT: 'Contact us', ctS: 'Choose the way that suits you', wa: 'WhatsApp', waBtn: 'Start chat', ig: 'Instagram', igBtn: 'Visit profile', prevS: 'Previous', nextS: 'Next', copy: 'Copy', copied: 'Copied ✓', blockedBody: 'Your browser blocked opening WhatsApp from here, but your order is ready. Copy the message and send it to Shama on WhatsApp:', copyMsg: 'Copy order message', openWa: 'Open WhatsApp', waNote: 'WhatsApp will open with your order ready, press send:'
    }
  };
  Object.keys(T2.ar).forEach(function (k) { T.ar[k] = T2.ar[k]; T.en[k] = T2.en[k]; });
  var T3 = {
    ar: { fCity: 'المدينة (Şehir)', fSide: 'الجهة في إسطنبول', fDist: 'المنطقة (İlçe)', selCity: 'اختاري المدينة…', selSide: 'اختاري الجهة (أوروبية / آسيوية)…',
          selDist: 'اختاري المنطقة…', selCityFirst: 'اختاري المدينة أولاً', selSideFirst: 'اختاري الجهة أولاً', distOther: 'منطقة غير موجودة بالقائمة…',
          fDistOther: 'اكتبي اسم المنطقة', eCity: 'اختاري المدينة', eSide: 'اختاري الجهة الأوروبية أو الآسيوية', eDist: 'اختاري المنطقة' },
    en: { fCity: 'City (Şehir)', fSide: 'Side of Istanbul', fDist: 'District (İlçe)', selCity: 'Select city…', selSide: 'Select side (European / Asian)…',
          selDist: 'Select district…', selCityFirst: 'Select the city first', selSideFirst: 'Select the side first', distOther: 'District not in the list…',
          fDistOther: 'Type the district name', eCity: 'Select the city', eSide: 'Select the European or Asian side', eDist: 'Select the district' }
  };
  Object.keys(T3.ar).forEach(function (k) { T.ar[k] = T3.ar[k]; T.en[k] = T3.en[k]; });

  var CITIES = ['Adana','Adıyaman','Afyonkarahisar','Ağrı','Aksaray','Amasya','Ankara','Antalya','Ardahan','Artvin','Aydın','Balıkesir','Bartın','Batman','Bayburt','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum','Denizli','Diyarbakır','Düzce','Edirne','Elazığ','Erzincan','Erzurum','Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkâri','Hatay','Iğdır','Isparta','İstanbul','İzmir','Kahramanmaraş','Karabük','Karaman','Kars','Kastamonu','Kayseri','Kilis','Kırıkkale','Kırklareli','Kırşehir','Kocaeli','Konya','Kütahya','Malatya','Manisa','Mardin','Mersin','Muğla','Muş','Nevşehir','Niğde','Ordu','Osmaniye','Rize','Sakarya','Samsun','Şanlıurfa','Siirt','Sinop','Sivas','Şırnak','Tekirdağ','Tokat','Trabzon','Tunceli','Uşak','Van','Yalova','Yozgat','Zonguldak'];
  var CITY_AR = {"Adana": "أضنة", "Adıyaman": "أديامان", "Afyonkarahisar": "أفيون قره حصار", "Ağrı": "أغري", "Aksaray": "آق سراي", "Amasya": "أماسيا", "Ankara": "أنقرة", "Antalya": "أنطاليا", "Ardahan": "أردهان", "Artvin": "أرتفين", "Aydın": "أيدن", "Balıkesir": "باليكسير", "Bartın": "بارتن", "Batman": "باتمان", "Bayburt": "بايبورت", "Bilecik": "بيله جيك", "Bingöl": "بينغول", "Bitlis": "بتليس", "Bolu": "بولو", "Burdur": "بوردور", "Bursa": "بورصة", "Çanakkale": "جناق قلعة", "Çankırı": "جانقري", "Çorum": "جوروم", "Denizli": "دنيزلي", "Diyarbakır": "ديار بكر", "Düzce": "دوزجه", "Edirne": "أدرنة", "Elazığ": "إلازيغ", "Erzincan": "أرزنجان", "Erzurum": "أرضروم", "Eskişehir": "إسكي شهير", "Gaziantep": "غازي عنتاب", "Giresun": "غيرسون", "Gümüşhane": "غوموشهانه", "Hakkâri": "هكاري", "Hatay": "هاتاي", "Iğdır": "إغدير", "Isparta": "إسبارطة", "İstanbul": "إسطنبول", "İzmir": "إزمير", "Kahramanmaraş": "قهرمان مرعش", "Karabük": "قره بوك", "Karaman": "قرمان", "Kars": "قارص", "Kastamonu": "قسطموني", "Kayseri": "قيصري", "Kilis": "كيليس", "Kırıkkale": "قيريق قلعة", "Kırklareli": "قرق كلي", "Kırşehir": "قير شهير", "Kocaeli": "كوجالي (إزميت)", "Konya": "قونية", "Kütahya": "كوتاهيا", "Malatya": "ملاطية", "Manisa": "مانيسا", "Mardin": "ماردين", "Mersin": "مرسين", "Muğla": "موغلا", "Muş": "موش", "Nevşehir": "نوشهير", "Niğde": "نيغدة", "Ordu": "أوردو", "Osmaniye": "عثمانية", "Rize": "ريزه", "Sakarya": "صقاريا", "Samsun": "سامسون", "Şanlıurfa": "شانلي أورفا", "Siirt": "سيرت", "Sinop": "سينوب", "Sivas": "سيواس", "Şırnak": "شرناق", "Tekirdağ": "تكيرداغ", "Tokat": "توقات", "Trabzon": "طرابزون", "Tunceli": "تونجلي", "Uşak": "أوشاك", "Van": "وان", "Yalova": "يالوفا", "Yozgat": "يوزغات", "Zonguldak": "زونغولداك"};
  var DIST = {"Adana": "Aladağ,Ceyhan,Çukurova,Feke,İmamoğlu,Karaisalı,Karataş,Kozan,Pozantı,Saimbeyli,Sarıçam,Seyhan,Tufanbeyli,Yumurtalık,Yüreğir", "Adıyaman": "Besni,Çelikhan,Gerger,Gölbaşı,Kahta,Merkez,Samsat,Sincik,Tut", "Afyonkarahisar": "Başmakçı,Bayat,Bolvadin,Çay,Çobanlar,Dazkırı,Dinar,Emirdağ,Evciler,Hocalar,İhsaniye,İscehisar,Kızılören,Merkez,Sandıklı,Sinanpaşa,Sultandağı,Şuhut", "Ağrı": "Diyadin,Doğubayazıt,Eleşkirt,Hamur,Merkez,Patnos,Taşlıçay,Tutak", "Aksaray": "Ağaçören,Eskil,Gülağaç,Güzelyurt,Merkez,Ortaköy,Sarıyahşi,Sultanhanı", "Amasya": "Göynücek,Gümüşhacıköy,Hamamözü,Merkez,Merzifon,Suluova,Taşova", "Ankara": "Akyurt,Altındağ,Ayaş,Bala,Beypazarı,Çamlıdere,Çankaya,Çubuk,Elmadağ,Etimesgut,Evren,Gölbaşı,Güdül,Haymana,Kahramankazan,Kalecik,Keçiören,Kızılcahamam,Mamak,Nallıhan,Polatlı,Pursaklar,Sincan,Şereflikoçhisar,Yenimahalle", "Antalya": "Akseki,Aksu,Alanya,Demre,Döşemealtı,Elmalı,Finike,Gazipaşa,Gündoğmuş,İbradı,Kaş,Kemer,Kepez,Konyaaltı,Korkuteli,Kumluca,Manavgat,Muratpaşa,Serik", "Ardahan": "Çıldır,Damal,Göle,Hanak,Merkez,Posof", "Artvin": "Ardanuç,Arhavi,Borçka,Hopa,Kemalpaşa,Merkez,Murgul,Şavşat,Yusufeli", "Aydın": "Bozdoğan,Buharkent,Çine,Didim,Efeler,Germencik,İncirliova,Karacasu,Karpuzlu,Koçarlı,Köşk,Kuşadası,Kuyucak,Nazilli,Söke,Sultanhisar,Yenipazar", "Balıkesir": "Altıeylül,Ayvalık,Balya,Bandırma,Bigadiç,Burhaniye,Dursunbey,Edremit,Erdek,Gömeç,Gönen,Havran,İvrindi,Karesi,Kepsut,Manyas,Marmara,Savaştepe,Sındırgı,Susurluk", "Bartın": "Amasra,Kurucaşile,Merkez,Ulus", "Batman": "Beşiri,Gercüş,Hasankeyf,Kozluk,Merkez,Sason", "Bayburt": "Aydıntepe,Demirözü,Merkez", "Bilecik": "Bozüyük,Gölpazarı,İnhisar,Merkez,Osmaneli,Pazaryeri,Söğüt,Yenipazar", "Bingöl": "Adaklı,Genç,Karlıova,Kiğı,Merkez,Solhan,Yayladere,Yedisu", "Bitlis": "Adilcevaz,Ahlat,Güroymak,Hizan,Merkez,Mutki,Tatvan", "Bolu": "Dörtdivan,Gerede,Göynük,Kıbrıscık,Mengen,Merkez,Mudurnu,Seben,Yeniçağa", "Burdur": "Ağlasun,Altınyayla,Bucak,Çavdır,Çeltikçi,Gölhisar,Karamanlı,Kemer,Merkez,Tefenni,Yeşilova", "Bursa": "Büyükorhan,Gemlik,Gürsu,Harmancık,İnegöl,İznik,Karacabey,Keles,Kestel,Mudanya,Mustafakemalpaşa,Nilüfer,Orhaneli,Orhangazi,Osmangazi,Yenişehir,Yıldırım", "Çanakkale": "Ayvacık,Bayramiç,Biga,Bozcaada,Çan,Eceabat,Ezine,Gelibolu,Gökçeada,Lapseki,Merkez,Yenice", "Çankırı": "Atkaracalar,Bayramören,Çerkeş,Eldivan,Ilgaz,Kızılırmak,Korgun,Kurşunlu,Merkez,Orta,Şabanözü,Yapraklı", "Çorum": "Alaca,Bayat,Boğazkale,Dodurga,İskilip,Kargı,Laçin,Mecitözü,Merkez,Oğuzlar,Ortaköy,Osmancık,Sungurlu,Uğurludağ", "Denizli": "Acıpayam,Babadağ,Baklan,Bekilli,Beyağaç,Bozkurt,Buldan,Çal,Çameli,Çardak,Çivril,Güney,Honaz,Kale,Merkezefendi,Pamukkale,Sarayköy,Serinhisar,Tavas", "Diyarbakır": "Bağlar,Bismil,Çermik,Çınar,Çüngüş,Dicle,Eğil,Ergani,Hani,Hazro,Kayapınar,Kocaköy,Kulp,Lice,Silvan,Sur,Yenişehir", "Düzce": "Akçakoca,Cumayeri,Çilimli,Gölyaka,Gümüşova,Kaynaşlı,Merkez,Yığılca", "Edirne": "Enez,Havsa,İpsala,Keşan,Lalapaşa,Meriç,Merkez,Süloğlu,Uzunköprü", "Elazığ": "Ağın,Alacakaya,Arıcak,Baskil,Karakoçan,Keban,Kovancılar,Maden,Merkez,Palu,Sivrice", "Erzincan": "Çayırlı,İliç,Kemah,Kemaliye,Merkez,Otlukbeli,Refahiye,Tercan,Üzümlü", "Erzurum": "Aşkale,Aziziye,Çat,Hınıs,Horasan,İspir,Karaçoban,Karayazı,Köprüköy,Narman,Oltu,Olur,Palandöken,Pasinler,Pazaryolu,Şenkaya,Tekman,Tortum,Uzundere,Yakutiye", "Eskişehir": "Alpu,Beylikova,Çifteler,Günyüzü,Han,İnönü,Mahmudiye,Mihalgazi,Mihalıççık,Odunpazarı,Sarıcakaya,Seyitgazi,Sivrihisar,Tepebaşı", "Gaziantep": "Araban,İslahiye,Karkamış,Nizip,Nurdağı,Oğuzeli,Şahinbey,Şehitkamil,Yavuzeli", "Giresun": "Alucra,Bulancak,Çamoluk,Çanakçı,Dereli,Doğankent,Espiye,Eynesil,Görele,Güce,Keşap,Merkez,Piraziz,Şebinkarahisar,Tirebolu,Yağlıdere", "Gümüşhane": "Kelkit,Köse,Kürtün,Merkez,Şiran,Torul", "Hakkâri": "Çukurca,Derecik,Merkez,Şemdinli,Yüksekova", "Hatay": "Altınözü,Antakya,Arsuz,Belen,Defne,Dörtyol,Erzin,Hassa,İskenderun,Kırıkhan,Kumlu,Payas,Reyhanlı,Samandağ,Yayladağı", "Iğdır": "Aralık,Karakoyunlu,Merkez,Tuzluca", "Isparta": "Aksu,Atabey,Eğirdir,Gelendost,Gönen,Keçiborlu,Merkez,Senirkent,Sütçüler,Şarkikaraağaç,Uluborlu,Yalvaç,Yenişarbademli", "İzmir": "Aliağa,Balçova,Bayındır,Bayraklı,Bergama,Beydağ,Bornova,Buca,Çeşme,Çiğli,Dikili,Foça,Gaziemir,Güzelbahçe,Karabağlar,Karaburun,Karşıyaka,Kemalpaşa,Kınık,Kiraz,Konak,Menderes,Menemen,Narlıdere,Ödemiş,Seferihisar,Selçuk,Tire,Torbalı,Urla", "Kahramanmaraş": "Afşin,Andırın,Çağlayancerit,Dulkadiroğlu,Ekinözü,Elbistan,Göksun,Nurhak,Onikişubat,Pazarcık,Türkoğlu", "Karabük": "Eflani,Eskipazar,Merkez,Ovacık,Safranbolu,Yenice", "Karaman": "Ayrancı,Başyayla,Ermenek,Kazımkarabekir,Merkez,Sarıveliler", "Kars": "Akyaka,Arpaçay,Digor,Kağızman,Merkez,Sarıkamış,Selim,Susuz", "Kastamonu": "Abana,Ağlı,Araç,Azdavay,Bozkurt,Cide,Çatalzeytin,Daday,Devrekani,Doğanyurt,Hanönü,İhsangazi,İnebolu,Küre,Merkez,Pınarbaşı,Seydiler,Şenpazar,Taşköprü,Tosya", "Kayseri": "Akkışla,Bünyan,Develi,Felahiye,Hacılar,İncesu,Kocasinan,Melikgazi,Özvatan,Pınarbaşı,Sarıoğlan,Sarız,Talas,Tomarza,Yahyalı,Yeşilhisar", "Kilis": "Elbeyli,Merkez,Musabeyli,Polateli", "Kırıkkale": "Bahşılı,Balışeyh,Çelebi,Delice,Karakeçili,Keskin,Merkez,Sulakyurt,Yahşihan", "Kırklareli": "Babaeski,Demirköy,Kofçaz,Lüleburgaz,Merkez,Pehlivanköy,Pınarhisar,Vize", "Kırşehir": "Akçakent,Akpınar,Boztepe,Çiçekdağı,Kaman,Merkez,Mucur", "Kocaeli": "Başiskele,Çayırova,Darıca,Derince,Dilovası,Gebze,Gölcük,İzmit,Kandıra,Karamürsel,Kartepe,Körfez", "Konya": "Ahırlı,Akören,Akşehir,Altınekin,Beyşehir,Bozkır,Cihanbeyli,Çeltik,Çumra,Derbent,Derebucak,Doğanhisar,Emirgazi,Ereğli,Güneysınır,Hadim,Halkapınar,Hüyük,Ilgın,Kadınhanı,Karapınar,Karatay,Kulu,Meram,Sarayönü,Selçuklu,Seydişehir,Taşkent,Tuzlukçu,Yalıhüyük,Yunak", "Kütahya": "Altıntaş,Aslanapa,Çavdarhisar,Domaniç,Dumlupınar,Emet,Gediz,Hisarcık,Merkez,Pazarlar,Simav,Şaphane,Tavşanlı", "Malatya": "Akçadağ,Arapgir,Arguvan,Battalgazi,Darende,Doğanşehir,Doğanyol,Hekimhan,Kale,Kuluncak,Pütürge,Yazıhan,Yeşilyurt", "Manisa": "Ahmetli,Akhisar,Alaşehir,Demirci,Gölmarmara,Gördes,Kırkağaç,Köprübaşı,Kula,Salihli,Sarıgöl,Saruhanlı,Selendi,Soma,Şehzadeler,Turgutlu,Yunusemre", "Mardin": "Artuklu,Dargeçit,Derik,Kızıltepe,Mazıdağı,Midyat,Nusaybin,Ömerli,Savur,Yeşilli", "Mersin": "Akdeniz,Anamur,Aydıncık,Bozyazı,Çamlıyayla,Erdemli,Gülnar,Mezitli,Mut,Silifke,Tarsus,Toroslar,Yenişehir", "Muğla": "Bodrum,Dalaman,Datça,Fethiye,Kavaklıdere,Köyceğiz,Marmaris,Menteşe,Milas,Ortaca,Seydikemer,Ula,Yatağan", "Muş": "Bulanık,Hasköy,Korkut,Malazgirt,Merkez,Varto", "Nevşehir": "Acıgöl,Avanos,Derinkuyu,Gülşehir,Hacıbektaş,Kozaklı,Merkez,Ürgüp", "Niğde": "Altunhisar,Bor,Çamardı,Çiftlik,Merkez,Ulukışla", "Ordu": "Akkuş,Altınordu,Aybastı,Çamaş,Çatalpınar,Çaybaşı,Fatsa,Gölköy,Gülyalı,Gürgentepe,İkizce,Kabadüz,Kabataş,Korgan,Kumru,Mesudiye,Perşembe,Ulubey,Ünye", "Osmaniye": "Bahçe,Düziçi,Hasanbeyli,Kadirli,Merkez,Sumbas,Toprakkale", "Rize": "Ardeşen,Çamlıhemşin,Çayeli,Derepazarı,Fındıklı,Güneysu,Hemşin,İkizdere,İyidere,Kalkandere,Merkez,Pazar", "Sakarya": "Adapazarı,Akyazı,Arifiye,Erenler,Ferizli,Geyve,Hendek,Karapürçek,Karasu,Kaynarca,Kocaali,Pamukova,Sapanca,Serdivan,Söğütlü,Taraklı", "Samsun": "19 Mayıs,Alaçam,Asarcık,Atakum,Ayvacık,Bafra,Canik,Çarşamba,Havza,İlkadım,Kavak,Ladik,Salıpazarı,Tekkeköy,Terme,Vezirköprü,Yakakent", "Şanlıurfa": "Akçakale,Birecik,Bozova,Ceylanpınar,Eyyübiye,Halfeti,Haliliye,Harran,Hilvan,Karaköprü,Siverek,Suruç,Viranşehir", "Siirt": "Baykan,Eruh,Kurtalan,Merkez,Pervari,Şirvan,Tillo", "Sinop": "Ayancık,Boyabat,Dikmen,Durağan,Erfelek,Gerze,Merkez,Saraydüzü,Türkeli", "Sivas": "Akıncılar,Altınyayla,Divriği,Doğanşar,Gemerek,Gölova,Gürün,Hafik,İmranlı,Kangal,Koyulhisar,Merkez,Suşehri,Şarkışla,Ulaş,Yıldızeli,Zara", "Şırnak": "Beytüşşebap,Cizre,Güçlükonak,İdil,Merkez,Silopi,Uludere", "Tekirdağ": "Çerkezköy,Çorlu,Ergene,Hayrabolu,Kapaklı,Malkara,Marmaraereğlisi,Muratlı,Saray,Süleymanpaşa,Şarköy", "Tokat": "Almus,Artova,Başçiftlik,Erbaa,Merkez,Niksar,Pazar,Reşadiye,Sulusaray,Turhal,Yeşilyurt,Zile", "Trabzon": "Akçaabat,Araklı,Arsin,Beşikdüzü,Çarşıbaşı,Çaykara,Dernekpazarı,Düzköy,Hayrat,Köprübaşı,Maçka,Of,Ortahisar,Sürmene,Şalpazarı,Tonya,Vakfıkebir,Yomra", "Tunceli": "Çemişgezek,Hozat,Mazgirt,Merkez,Nazımiye,Ovacık,Pertek,Pülümür", "Uşak": "Banaz,Eşme,Karahallı,Merkez,Sivaslı,Ulubey", "Van": "Bahçesaray,Başkale,Çaldıran,Çatak,Edremit,Erciş,Gevaş,Gürpınar,İpekyolu,Muradiye,Özalp,Saray,Tuşba", "Yalova": "Altınova,Armutlu,Çiftlikköy,Çınarcık,Merkez,Termal", "Yozgat": "Akdağmadeni,Aydıncık,Boğazlıyan,Çandır,Çayıralan,Çekerek,Kadışehri,Merkez,Saraykent,Sarıkaya,Sorgun,Şefaatli,Yenifakılı,Yerköy", "Zonguldak": "Alaplı,Çaycuma,Devrek,Ereğli,Gökçebey,Kilimli,Kozlu,Merkez"};
  var IST = {"eu": "Arnavutköy,Avcılar,Bağcılar,Bahçelievler,Bakırköy,Başakşehir,Bayrampaşa,Beşiktaş,Beylikdüzü,Beyoğlu,Büyükçekmece,Çatalca,Esenler,Esenyurt,Eyüpsultan,Fatih,Gaziosmanpaşa,Güngören,Kağıthane,Küçükçekmece,Sarıyer,Silivri,Sultangazi,Şişli,Zeytinburnu", "as": "Adalar,Ataşehir,Beykoz,Çekmeköy,Kadıköy,Kartal,Maltepe,Pendik,Sancaktepe,Sultanbeyli,Şile,Tuzla,Ümraniye,Üsküdar"};
  var SIDES = { eu: { ar: 'الجهة الأوروبية', en: 'European side', tr: 'Avrupa Yakası' }, as: { ar: 'الجهة الآسيوية', en: 'Asian side (Anatolia)', tr: 'Anadolu Yakası' } };
  var PAGE_OF = {"p1c0": "small.html", "p1c1": "small.html", "p2c0": "small.html", "p2c1": "small.html", "p2c2": "small.html", "p2c3": "small.html", "p2c4": "small.html", "p2c5": "small.html", "p12c0": "small.html", "p14c0": "small.html", "p15c0": "small.html", "p17c0": "small-2.html", "p26c0": "small-2.html", "p19c0": "medium.html", "p8c0": "medium.html", "p8c1": "medium.html", "p8c2": "medium.html", "p9c0": "medium.html", "p9c1": "medium.html", "p21c0": "medium.html", "p25c0": "medium-2.html", "p3c0": "medium-2.html", "p3c1": "medium-2.html", "p28c0": "medium-2.html", "p28c1": "medium-2.html", "p28c2": "medium-2.html", "p28c3": "medium-2.html", "p28c4": "medium-3.html", "p13c0": "medium-3.html", "p13c1": "medium-3.html", "p27c0": "large.html", "p27c1": "large.html", "p5c0": "large.html", "p5c1": "large.html", "p5c2": "large.html", "p5c3": "large.html", "p7c0": "large.html", "p7c1": "large.html", "p7c2": "large.html", "p18c0": "large.html", "p18c1": "large.html", "p18c2": "large-2.html", "p18c3": "large-2.html", "p24c0": "large-2.html", "p20c0": "large-2.html"};
  var SITE_URL = ''; // اتركيه فاضي ليؤخذ رابط الموقع تلقائياً. إذا بدك رابط ثابت اكتبيه هون مثل: 'https://shama.example.com/'
  function foldTr(s) {
    return String(s || '').replace(/[İIı]/g, 'i').toLowerCase().replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[âî]/g, function (c) { return c === 'â' ? 'a' : 'i'; }).trim();
  }
  function canonCity(s) {
    var x = foldTr(s); if (!x) return '';
    for (var i = 0; i < CITIES.length; i++) if (foldTr(CITIES[i]) === x) return CITIES[i];
    for (var k in CITY_AR) if (CITY_AR[k] === String(s).trim()) return k;
    return '';
  }
  function districtsFor(city, side) {
    if (city === 'İstanbul') return side === 'eu' ? IST.eu.split(',') : side === 'as' ? IST.as.split(',') : [];
    return DIST[city] ? DIST[city].split(',') : [];
  }
  function canonDistrict(city, side, d) {
    var x = foldTr(d), list = districtsFor(city, side);
    for (var i = 0; i < list.length; i++) if (foldTr(list[i]) === x) return list[i];
    return '';
  }
  function cityLabel(lng) {
    var c = profile.city || '';
    if (c === 'İstanbul' && SIDES[profile.side]) c += ' (' + SIDES[profile.side][lng || 'ar'] + ')';
    return c;
  }
  function lang() { return document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'ar'; }
  function t(k) { return T[lang()][k]; }

  /* ===== الحالة ===== */
  var items = [];
  var currentCard = null;
  var view = 'cart'; // cart | form | done
  var lastWaUrl = '', lastWaMsg = '', sentOk = true;
  var curOrder = null, orderImg = null, imgCache = {};
  var form = { loc: '' };
  var PROFILE_KEY = 'shama_customer_v1';
  var profile = { name: '', city: '', side: '', district: '', building: '', apt: '', phone: '', notes: '' };
  var gateOverlay, gateBox, gateAfter = null, gateDraft = null;

  /* ===== التحقق من بيانات الزبونة ===== */
  var NAME_RE = /^[A-Za-zÇĞİıÖŞÜçğöşüÂâÎîÛû][A-Za-zÇĞİıÖŞÜçğöşüÂâÎîÛû' .\-]*$/;
  function nameOk(s) {
    s = (s || '').trim();
    if (!NAME_RE.test(s)) return false;
    var w = s.split(/\s+/).filter(Boolean);
    return w.length >= 2 && w.every(function (x) { return x.replace(/[^A-Za-zÇĞİıÖŞÜçğöşüÂâÎîÛû]/g, '').length >= 2; });
  }
  function normPhone(s) {
    var d = String(s || '').replace(/\D/g, '');
    if (d.indexOf('0090') === 0) d = d.slice(4);
    else if (d.indexOf('90') === 0 && d.length >= 12) d = d.slice(2);
    if (d.charAt(0) === '0') d = d.slice(1);
    if (!/^5\d{9}$/.test(d)) return '';
    return '+90 ' + d.slice(0, 3) + ' ' + d.slice(3, 6) + ' ' + d.slice(6, 8) + ' ' + d.slice(8);
  }
  function placeOk(s) { s = (s || '').trim(); return s.length >= 2 && /[A-Za-z\u00C0-\u024F\u0600-\u06FF]/.test(s); }
  function numOk(s) { s = (s || '').trim(); return s.length >= 1 && s.length <= 12 && /[A-Za-z0-9\u0660-\u0669]/.test(s) && /^[A-Za-z0-9\u0660-\u0669\-\/ ]+$/.test(s); }
  function checkProfile(p) {
    return { name: nameOk(p.name), city: CITIES.indexOf(p.city) >= 0, side: p.city !== 'İstanbul' || p.side === 'eu' || p.side === 'as', district: placeOk(p.district),
             building: numOk(p.building), apt: numOk(p.apt), phone: !!normPhone(p.phone) };
  }
  function profileValid() { var c = checkProfile(profile); return c.name && c.city && c.side && c.district && c.building && c.apt && c.phone; }
  function loadProfile() {
    try { var p = JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null'); if (p) profile = Object.assign(profile, p); } catch (e) {}
    profile.city = canonCity(profile.city);
    if (profile.city === 'İstanbul' && profile.side !== 'eu' && profile.side !== 'as') {
      profile.side = '';
      if (canonDistrict('İstanbul', 'eu', profile.district)) profile.side = 'eu';
      else if (canonDistrict('İstanbul', 'as', profile.district)) profile.side = 'as';
    }
    if (profile.city && profile.side !== undefined) { var cd = canonDistrict(profile.city, profile.side, profile.district); if (cd) profile.district = cd; }
  }
  function saveProfile() { try { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); } catch (e) {} }

  function load() {
    try { items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') || []; } catch (e) { items = []; }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (e) { /* quota */ }
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function priceOf(card) {
    var p = card.dataset.price || PRICES[card.dataset.id];
    p = parseFloat(p);
    return isNaN(p) ? null : p;
  }
  function money(n) {
    var r = Math.round(n * 100) / 100;
    return r.toLocaleString('en-US') + CURRENCY;
  }
  function count() { return items.reduce(function (a, i) { return a + i.qty; }, 0); }

  /* ===== بناء العناصر ===== */
  var navBtn, badge, overlay, drawer, toast, addBtn, shipNote, priceTag, baseTag, giftRow, giftBox, giftTxt, colorBox;

  function build() {
    // زر السلة في الشريط العلوي
    var actions = document.querySelector('.nav-actions');
    navBtn = document.createElement('button');
    navBtn.className = 'sc-nav-btn';
    navBtn.type = 'button';
    navBtn.setAttribute('aria-label', 'Cart');
    navBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span class="sc-badge"></span>';
    badge = navBtn.querySelector('.sc-badge');
    if (actions) actions.insertBefore(navBtn, actions.firstChild);
    else { navBtn.style.cssText = 'position:fixed;top:14px;inset-inline-end:14px;z-index:60'; document.body.appendChild(navBtn); }
    navBtn.addEventListener('click', function () { view = 'cart'; openDrawer(); });

    overlay = document.createElement('div');
    overlay.className = 'sc-overlay';
    overlay.addEventListener('click', closeDrawer);
    drawer = document.createElement('aside');
    drawer.className = 'sc-drawer';
    drawer.setAttribute('role', 'dialog');
    toast = document.createElement('div');
    toast.className = 'sc-toast';
    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    document.body.appendChild(toast);

    gateOverlay = document.createElement('div');
    gateOverlay.className = 'sc-gate-overlay';
    gateBox = document.createElement('div');
    gateBox.className = 'sc-gate sc-form';
    gateBox.setAttribute('role', 'dialog');
    gateBox.setAttribute('aria-modal', 'true');
    gateOverlay.appendChild(gateBox);
    document.body.appendChild(gateOverlay);
    gateOverlay.addEventListener('click', function (e) { if (e.target === gateOverlay) closeGate(); });
    gateBox.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-gate]');
      if (!b) return;
      if (b.dataset.gate === 'close') closeGate();
      else if (b.dataset.gate === 'save') submitGate();
    });
    gateBox.addEventListener('input', function (e) {
      var el = e.target; if (el.classList.contains('err')) { el.classList.remove('err'); var m = el.nextElementSibling; if (m && m.classList.contains('sc-err-msg')) m.classList.remove('show'); }
    });
    gateBox.addEventListener('change', function (e) {
      var id = e.target.id; if (id !== 'scG_city' && id !== 'scG_side' && id !== 'scG_district') return;
      readGate();
      if (id === 'scG_city') { gateDraft.side = ''; gateDraft.district = ''; gateDraft.districtOther = ''; }
      else if (id === 'scG_side') { gateDraft.district = ''; gateDraft.districtOther = ''; }
      renderGate();
      var next = id === 'scG_city' ? (gateDraft.city === 'İstanbul' ? 'scG_side' : 'scG_district') : id === 'scG_side' ? 'scG_district' : (gateDraft.district === '__other' ? 'scG_districtOther' : null);
      var n = next && document.getElementById(next); if (n) n.focus();
    });
    gateBox.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); submitGate(); } });

    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeGate(); closeDrawer(); } });

    // عناصر داخل نافذة المنتج
    var actionsRow = document.querySelector('#overlay .modal-body .actions');
    if (actionsRow) {
      priceTag = document.createElement('div');
      priceTag.className = 'sc-price-tag';
      priceTag.style.display = 'none';
      addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.className = 'sc-add-btn';
      addBtn.addEventListener('click', addCurrent);
      shipNote = document.createElement('div');
      shipNote.className = 'sc-modal-ship';
      var parent = actionsRow.parentNode;
      parent.insertBefore(priceTag, actionsRow);
      parent.insertBefore(addBtn, actionsRow);
      parent.insertBefore(shipNote, actionsRow);
      baseTag = document.createElement('div');
      baseTag.className = 'sc-price-tag sc-base-tag';
      baseTag.style.display = 'none';
      parent.insertBefore(baseTag, addBtn);
      giftRow = document.createElement('label');
      giftRow.className = 'sc-gift';
      giftRow.innerHTML = '<input type="checkbox" id="scGift"><span class="sc-gift-box"></span><span class="sc-gift-txt"></span>';
      giftBox = giftRow.querySelector('input'); giftTxt = giftRow.querySelector('.sc-gift-txt');
      parent.insertBefore(giftRow, addBtn);
      var nmEl = document.getElementById('modalName');
      if (nmEl) { colorBox = document.createElement('div'); colorBox.className = 'sc-modal-color'; nmEl.parentNode.insertBefore(colorBox, nmEl.nextSibling); }
    }

    // سعر على البطاقات (إذا محدد)
    document.querySelectorAll('.card').forEach(function (card) {
      var p = priceOf(card);
      var body = card.querySelector('.card-body');
      if (p != null && body) {
        var d = document.createElement('div');
        d.className = 'sc-card-price';
        d.textContent = money(p);
        var bc = card.dataset.baseCm;
        if (bc) {
          var sp = document.createElement('span');
          sp.className = 'sc-card-base';
          sp.setAttribute('data-ar', 'قاعدة ' + bc + ' سم');
          sp.setAttribute('data-en', 'Base ' + bc + ' cm');
          sp.textContent = 'قاعدة ' + bc + ' سم';
          d.appendChild(sp);
        }
        body.appendChild(d);
      }
    });

    // تتبع المنتج المفتوح
    document.addEventListener('click', function (e) {
      var card = e.target.closest && e.target.closest('.card');
      if (card && !e.target.closest('.swatch')) { currentCard = card; if (giftBox) giftBox.checked = false; refreshModalUI(); }
    }, true);

    // تتبع تغيير اللغة
    new MutationObserver(function () { refreshModalUI(); refreshColorUI(); render(); document.querySelectorAll('.sc-sold-badge').forEach(function (b) { b.textContent = t('soldOut'); }); if (gateOverlay && gateOverlay.classList.contains('open')) { readGate(); renderGate(); } })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });

    window.addEventListener('storage', function (e) { if (e.key === STORAGE_KEY) { load(); updateBadge(); render(); } });
  }

  function refreshModalUI() {
    if (!addBtn) return;
    refreshColorUI();
    var sold = !!(currentCard && currentCard.dataset.soldout === '1');
    addBtn.textContent = sold ? t('soldOut') : t('add');
    addBtn.disabled = sold; addBtn.classList.toggle('sc-disabled', sold);
    if (giftRow) giftRow.style.display = sold ? 'none' : '';
    if (giftTxt) giftTxt.innerHTML = esc(t('gift')) + ' <em>(' + esc(t('giftNote')) + ')</em>';
    shipNote.textContent = t('shipNote');
    var p = currentCard ? priceOf(currentCard) : null;
    if (p != null) { priceTag.style.display = ''; priceTag.textContent = t('price') + ': ' + money(p); }
    else priceTag.style.display = 'none';
    var bcm = currentCard ? currentCard.dataset.baseCm : '';
    if (baseTag) {
      if (bcm) { baseTag.style.display = ''; baseTag.textContent = t('baseLbl') + ': ' + bcm + ' ' + t('cm'); }
      else baseTag.style.display = 'none';
    }
  }

  function updateBadge() {
    var n = count();
    badge.textContent = n;
    badge.classList.toggle('show', n > 0);
  }
  function bump() {
    navBtn.classList.remove('bump'); void navBtn.offsetWidth; navBtn.classList.add('bump');
  }
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }

  /* ===== إضافة منتج ===== */
  function thumbFrom(src, cb) {
    try {
      var img = new Image();
      img.onload = function () {
        try {
          var w = 240, h = Math.round(240 * img.naturalHeight / img.naturalWidth);
          var c = document.createElement('canvas'); c.width = w; c.height = h;
          c.getContext('2d').drawImage(img, 0, 0, w, h);
          cb(c.toDataURL('image/jpeg', 0.7));
        } catch (e) { cb(''); }
      };
      img.onerror = function () { cb(''); };
      img.src = src;
    } catch (e) { cb(''); }
  }

  /* ===== نافذة بيانات التوصيل (إلزامية قبل أول إضافة) ===== */
  var FIELDS = [
    { k: 'name', lab: 'fName', err: 'eName2', type: 'text', ac: 'name', full: true },
    { k: 'phone', lab: 'fPhone', err: 'ePhone2', type: 'tel', ac: 'tel', ph: '05XX XXX XX XX', ltr: true, full: true },
    { k: 'city', lab: 'fCity', err: 'eCity', type: 'select' },
    { k: 'side', lab: 'fSide', err: 'eSide', type: 'select' },
    { k: 'district', lab: 'fDist', err: 'eDist', type: 'select' },
    { k: 'building', lab: 'fBld', err: 'eBld', type: 'text', ac: 'off' },
    { k: 'apt', lab: 'fApt', err: 'eApt', type: 'text', ac: 'off' }
  ];
  function readGate() {
    FIELDS.concat([{ k: 'notes' }, { k: 'districtOther' }]).forEach(function (f) {
      var el = document.getElementById('scG_' + f.k); if (el) gateDraft[f.k] = el.value;
    });
  }
  function selectHtml(f, d) {
    var L = lang(), id = 'scG_' + f.k, h = '<select id="' + id + '"' + (f.k === 'city' ? ' autocomplete="address-level1"' : '') + '>', opts = '', disabled = false, ph = '';
    if (f.k === 'city') {
      ph = t('selCity');
      CITIES.forEach(function (c) { opts += '<option value="' + esc(c) + '"' + (d.city === c ? ' selected' : '') + '>' + esc(L === 'ar' ? c + ' — ' + CITY_AR[c] : c) + '</option>'; });
    } else if (f.k === 'side') {
      ph = t('selSide');
      ['eu', 'as'].forEach(function (k) { opts += '<option value="' + k + '"' + (d.side === k ? ' selected' : '') + '>' + esc(SIDES[k][L] + ' (' + SIDES[k].tr + ')') + '</option>'; });
    } else {
      var needSide = d.city === 'İstanbul' && !d.side;
      if (!d.city) { disabled = true; ph = t('selCityFirst'); }
      else if (needSide) { disabled = true; ph = t('selSideFirst'); }
      else {
        ph = t('selDist');
        districtsFor(d.city, d.side).forEach(function (x) { opts += '<option value="' + esc(x) + '"' + (d.district === x ? ' selected' : '') + '>' + esc(x) + '</option>'; });
        opts += '<option value="__other"' + (d.district === '__other' ? ' selected' : '') + '>' + esc(t('distOther')) + '</option>';
      }
    }
    h = h.replace('>', disabled ? ' disabled>' : '>');
    return h + '<option value="">' + esc(ph) + '</option>' + opts + '</select>';
  }
  function renderGate() {
    var d = gateDraft || profile, L = lang();
    var h = '<button class="sc-x" type="button" data-gate="close" aria-label="' + esc(t('close')) + '">✕</button>' +
      '<h3>' + esc(t('gateT')) + '</h3><p class="sc-gate-sub">' + esc(t('gateS')) + '</p><div class="sc-grid2">';
    FIELDS.forEach(function (f) {
      if (f.k === 'side' && d.city !== 'İstanbul') return;
      var full = f.full || f.k === 'side';
      h += '<div class="' + (full ? 'sc-full' : '') + '"><label for="scG_' + f.k + '">' + esc(t(f.lab)) + '</label>';
      if (f.type === 'select') {
        h += selectHtml(f, d);
        if (f.k === 'district' && d.district === '__other') h += '<input id="scG_districtOther" type="text" style="margin-top:8px" placeholder="' + esc(t('fDistOther')) + '" value="' + esc(d.districtOther || '') + '">';
      } else {
        h += '<input id="scG_' + f.k + '" type="' + f.type + '" autocomplete="' + f.ac + '"' + (f.ltr ? ' dir="ltr" inputmode="tel"' : '') +
          (f.ph ? ' placeholder="' + esc(f.ph) + '"' : '') + ' value="' + esc(d[f.k] || '') + '">';
      }
      h += '<div class="sc-err-msg" id="scGE_' + f.k + '">' + esc(t(f.err)) + '</div></div>';
    });
    h += '<div class="sc-full"><label for="scG_notes">' + esc(t('fNotes')) + '</label><textarea id="scG_notes" style="min-height:64px">' + esc(d.notes || '') + '</textarea></div></div>' +
      '<button class="sc-btn" type="button" data-gate="save">' + esc(gateAfter ? t('saveGo') : t('saveOnly')) + '</button>';
    gateBox.innerHTML = h;
  }
  function openGate(after) {
    gateAfter = after || null;
    gateDraft = Object.assign({}, profile);
    if (gateDraft.city && gateDraft.district && !canonDistrict(gateDraft.city, gateDraft.side, gateDraft.district)) { gateDraft.districtOther = gateDraft.district; gateDraft.district = '__other'; }
    renderGate();
    gateOverlay.classList.add('open');
    setTimeout(function () { var f = document.getElementById('scG_name'); if (f) f.focus(); }, 60);
  }
  function closeGate() { if (gateOverlay) gateOverlay.classList.remove('open'); gateAfter = null; }
  function submitGate() {
    readGate();
    var eff = Object.assign({}, gateDraft);
    if (eff.district === '__other') eff.district = (eff.districtOther || '').trim();
    if (eff.city !== 'İstanbul') eff.side = '';
    var c = checkProfile(eff), ok = true;
    FIELDS.forEach(function (f) {
      var el = document.getElementById('scG_' + f.k), er = document.getElementById('scGE_' + f.k);
      if (!el || !er) return;
      var bad = !c[f.k];
      el.classList.toggle('err', bad); er.classList.toggle('show', bad);
      if (bad) ok = false;
    });
    if (!ok) { var first = gateBox.querySelector('.err'); if (first) first.focus(); return; }
    delete eff.districtOther;
    profile = Object.assign(profile, eff);
    profile.name = profile.name.trim().replace(/\s+/g, ' ');
    profile.phone = normPhone(profile.phone);
    saveProfile();
    var cb = gateAfter;
    closeGate();
    render();
    if (cb) cb();
  }

  function addCurrent() {
    if (currentCard && currentCard.dataset.soldout === '1') { showToast(t('soldNote')); return; }
    if (!currentCard) return;
    if (!profileValid()) { openGate(addCurrent); return; }
    var card = currentCard;
    var activeSw = document.querySelector('#modalColors .swatch.active');
    var ci = activeSw ? parseInt(activeSw.dataset.ci, 10) || 0 : 0;
    var cardSw = card.querySelectorAll('.colors .swatch')[ci];
    var fin = card.dataset.finish, colorName = card.dataset.colorAr || (cardSw ? (cardSw.getAttribute('title') || '') : '');
    var colorEn = card.dataset.colorEn || colorName;
    if (fin && FIN[fin]) { var fa = FIN[fin].ar.replace('✨ ', ''), fe = FIN[fin].en.replace('✨ ', ''); colorName += ' - ' + fa; colorEn += ' - ' + fe; }
    var gift = !!(giftBox && giftBox.checked);
    var key = card.dataset.id + ':' + ci + (gift ? ':g' : '');
    var modalImg = document.getElementById('modalImg');
    var src = modalImg ? modalImg.src : '';

    var existing = items.filter(function (i) { return i.key === key; })[0];
    if (existing) {
      existing.qty += 1;
      finishAdd();
    } else {
      var it = {
        key: key, id: card.dataset.id,
        nameAr: card.dataset.nameAr || '', nameEn: card.dataset.nameEn || card.dataset.nameAr || '',
        color: colorName, colorEn: colorEn, price: priceOf(card), base: card.dataset.baseCm || '', gift: gift, qty: 1, thumb: ''
      };
      items.push(it);
      thumbFrom(src, function (th) { it.thumb = th; save(); render(); });
      finishAdd();
    }
  }
  function finishAdd() {
    save(); updateBadge(); bump(); render();
    var closeBtn = document.getElementById('closeModal');
    if (closeBtn) closeBtn.click();
    showToast(t('added'));
  }

  /* ===== الدرج ===== */
  function openDrawer() {
    toast.classList.remove('show');
    render();
    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  function totals() {
    var sum = 0, allPriced = true;
    items.forEach(function (i) {
      if (i.price == null) allPriced = false; else sum += i.price * i.qty;
    });
    return { sum: sum, allPriced: allPriced && items.length > 0, anyPriced: items.some(function (i) { return i.price != null; }) };
  }

  function render() {
    if (!drawer) return;
    var L = lang();
    var h = '<div class="sc-head"><h3>' + esc(t('cart')) + '</h3><button class="sc-x" type="button" data-act="close" aria-label="' + esc(t('close')) + '">✕</button></div>';
    h += '<div class="sc-ship-bar">' + esc(t('shipBar')) + '</div>';

    if (view === 'done') {
      var blocked = !sentOk;
      h += '<div class="sc-body"><div class="sc-thanks"><div class="big">💕</div><h3 style="font:500 22px \'Aref Ruqaa\',serif;margin:14px 0 8px">' + esc(t('thanksT')) + '</h3>' +
        '<p style="color:#6b5459;line-height:1.9;font-size:14px">' + esc(blocked ? t('blockedBody') : t('thanksS')) + '</p>' +
        '<p dir="ltr" style="margin:0 0 12px;font-weight:700;color:#8e5b5c">WhatsApp ' + esc(fmtWa()) + '</p>' +
        (blocked ? '<textarea readonly class="sc-msgbox" id="scMsgBox">' + esc(lastWaMsg) + '</textarea><button class="sc-btn" type="button" data-act="copymsg">' + esc(t('copyMsg')) + '</button>' : '') +
        (orderImg ? '<div class="sc-stepbox"><b>' + esc(t('imgT')) + '</b><p>' + esc(t('imgS')) + '</p><img class="sc-orderimg" alt="" src="' + orderImg.dataUrl + '">' +
          ((navigator.canShare && navigator.canShare({ files: [orderImg.file] })) ? '<button class="sc-btn wa" type="button" data-act="shareimg">' + esc(t('shareImg')) + '</button>' : '') +
          '<button class="sc-btn" type="button" data-act="saveimg">' + esc(t('saveImg')) + '</button></div>' : '') +
        '<a class="sc-btn wa sc-alink" href="' + esc(lastWaUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(t('openWa')) + '</a>' +
        '<button class="sc-btn ghost" type="button" data-act="close">' + esc(t('close')) + '</button></div></div>';
    } else if (!items.length) {
      h += '<div class="sc-body"><div class="sc-empty"><div class="big">🛍️</div><div style="font-weight:700;font-size:16px">' + esc(t('emptyT')) + '</div><div style="margin-top:6px;font-size:13.5px">' + esc(t('emptyS')) + '</div><a href="bags.html">' + esc(t('browse')) + '</a></div></div>';
    } else if (view === 'cart') {
      h += '<div class="sc-body">';
      items.forEach(function (i, idx) {
        var nm = L === 'en' ? i.nameEn : i.nameAr;
        h += '<div class="sc-item">' +
          (i.thumb ? '<img src="' + esc(i.thumb) + '" alt="">' : '<div class="ph">👜</div>') +
          '<div class="sc-info"><div class="sc-name">' + esc(nm) + '</div>' +
          (i.color ? '<div class="sc-color">' + esc(t('color')) + ': ' + esc(L === 'en' ? (i.colorEn || i.color) : i.color) + '</div>' : '') +
          '<div class="sc-giftline">' + (i.gift ? '<span class="sc-giftchip">' + esc(t('giftChip')) + '</span>' : '') + '<button class="sc-giftbtn" type="button" data-act="gift" data-i="' + idx + '">' + esc(i.gift ? t('giftDel') : t('giftAdd')) + '</button></div>' +
          '<div class="sc-row"><div class="sc-qty"><button type="button" data-act="dec" data-i="' + idx + '">−</button><span>' + i.qty + '</span><button type="button" data-act="inc" data-i="' + idx + '">+</button></div>' +
          '<div class="sc-line-price">' + (i.price != null ? esc(money(i.price * i.qty)) : '') + '</div></div>' +
          '<button class="sc-rm" type="button" data-act="rm" data-i="' + idx + '">' + esc(t('remove')) + '</button></div></div>';
      });
      h += '</div><div class="sc-foot">';
      var tt = totals();
      if (tt.anyPriced) h += '<div class="sc-sum"><span>' + esc(t('subtotal')) + '</span><span>' + esc(money(tt.sum)) + (tt.allPriced ? '' : ' +') + '</span></div>';
      h += '<div class="sc-sum"><span>' + esc(t('shipping')) + '</span><span class="free">' + esc(t('free')) + '</span></div>';
      if (tt.allPriced) h += '<div class="sc-sum total"><span>' + esc(t('total')) + '</span><span>' + esc(money(tt.sum)) + '</span></div>';
      h += '<button class="sc-btn" type="button" data-act="checkout">' + esc(t('checkout')) + '</button></div>';
    } else { // form
      var tt2 = totals();
      h += '<div class="sc-body"><div class="sc-form">' +
        '<div class="sc-info-box"><div class="sc-info-head"><b>' + esc(t('infoT')) + '</b><button type="button" class="sc-edit" data-act="editprofile">' + esc(t('editInfo')) + '</button></div>' +
        '<div class="sc-info-row">👤 ' + esc(profile.name) + '</div>' +
        '<div class="sc-info-row" dir="ltr" style="text-align:start">📞 ' + esc(profile.phone) + '</div>' +
        '<div class="sc-info-row">📍 ' + esc(cityLabel(lang()) + ' — ' + profile.district) + '</div>' +
        '<div class="sc-info-row">🏢 ' + esc(t('fBld')) + ': ' + esc(profile.building) + ' &nbsp;|&nbsp; ' + esc(t('fApt')) + ': ' + esc(profile.apt) + '</div>' +
        (profile.notes ? '<div class="sc-info-row">📝 ' + esc(profile.notes) + '</div>' : '') + '</div>' +
        '<button type="button" class="sc-loc' + (form.loc ? ' ok' : '') + '" data-act="loc">' + esc(form.loc ? t('locOk') : t('loc')) + '</button>' +
        '<div class="sc-mini">' + items.map(function (i) { return esc((L === 'en' ? i.nameEn : i.nameAr) + (i.color ? ' (' + i.color + ')' : '') + ' ×' + i.qty); }).join('<br>') +
        '<div style="margin-top:8px;font-weight:700">' + esc(t('shipping')) + ': <span style="color:#1f9d55">' + esc(t('free')) + '</span>' + (tt2.allPriced ? ' &nbsp;|&nbsp; ' + esc(t('total')) + ': ' + esc(money(tt2.sum)) : '') + '</div></div>' +
        '</div></div><div class="sc-foot"><div class="sc-wa-note">' + esc(t('waNote')) + ' <b dir="ltr">' + esc(fmtWa()) + '</b></div><button class="sc-btn wa" type="button" data-act="send">' + esc(t('send')) + '</button><button class="sc-btn ghost" type="button" data-act="back">' + esc(t('back')) + '</button></div>';
    }
    drawer.innerHTML = h;
  }


  /* ===== رسالة مختصرة (الروابط الطويلة بتفشل بواتساب، فنقصّرها) ===== */
  function orderStats() {
    var sum = 0, allPriced = items.length > 0, pcs = 0, gift = 0;
    items.forEach(function (i) { pcs += i.qty; if (i.gift) gift += i.qty; if (i.price == null) allPriced = false; else sum += i.price * i.qty; });
    return { sum: sum, allPriced: allPriced, pcs: pcs, gift: gift };
  }
  function addrLine() {
    return cityLabel('ar') + ' - ' + profile.district + ' | بناية ' + profile.building + ' شقة ' + profile.apt;
  }
  /* حدود طول رابط الواتساب (بعد الترميز). إذا الرابط أطول منها بنستخدم نسخة أقصر من الرسالة.
     قسم الشحن التركي بيضل كامل بكل النسخ. إذا جرّبتي وطلع إنو واتساب بيقبل رسائل أطول، كبّري الرقمين. */
  var WA_MAX_FULL = 3000, WA_MAX_COMPACT = 2600;
  function pickWaUrl() {
    var base = 'https://wa.me/' + WHATSAPP + '?text=';
    var u = base + encodeURIComponent(buildMessage());
    if (u.length <= WA_MAX_FULL) return u;
    u = base + encodeURIComponent(buildCompact());
    if (u.length <= WA_MAX_COMPACT) return u;
    return base + encodeURIComponent(buildMini());
  }

  /* ===== صورة الطلب (منتجات + بيانات) ===== */
  function warmImages(done) {
    var pending = 0, fin = false;
    function chk() { if (!pending && !fin) { fin = true; if (done) done(); } }
    items.forEach(function (i) {
      if (i.thumb && !imgCache[i.thumb]) {
        var im = new Image(); pending++;
        im.onload = im.onerror = function () { pending--; chk(); };
        im.src = i.thumb; imgCache[i.thumb] = im;
      }
    });
    try {
      if (document.fonts && document.fonts.load) {
        pending++;
        Promise.all([document.fonts.load('700 30px "El Messiri"'), document.fonts.load('400 24px "El Messiri"')])
          .then(function () { pending--; chk(); }, function () { pending--; chk(); });
      }
    } catch (e) {}
    chk();
  }
  function rrect(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }
  function wrapText(ctx, text, maxW, maxLines) {
    var words = String(text).split(/\s+/), lines = [], cur = '';
    words.forEach(function (w) {
      var test = cur ? cur + ' ' + w : w;
      if (ctx.measureText(test).width > maxW && cur) { lines.push(cur); cur = w; } else cur = test;
    });
    if (cur) lines.push(cur);
    if (lines.length > maxLines) { lines = lines.slice(0, maxLines); lines[maxLines - 1] += '…'; }
    return lines;
  }
  function dataUrlToFile(u, name) {
    var a = u.split(','), mime = a[0].match(/:(.*?);/)[1], bin = atob(a[1]), n = bin.length, arr = new Uint8Array(n);
    while (n--) arr[n] = bin.charCodeAt(n);
    return new File([arr], name, { type: mime });
  }
  function makeOrderImage() {
    try {
      ensureOrder();
      var st = orderStats(), W = 1080, P = 44, F = '"El Messiri","Tajawal","Segoe UI",Arial,sans-serif';
      var info = [['الاسم', profile.name], ['الهاتف', '\u2066' + profile.phone + '\u2069'], ['المدينة / المنطقة', cityLabel('ar') + ' - ' + profile.district], ['البناية / الشقة', profile.building + ' / ' + profile.apt]];
      if (profile.notes && profile.notes.trim()) info.push(['ملاحظات', profile.notes.trim()]);
      if (form.loc) info.push(['الموقع', 'تم إرفاق موقع على الخريطة']);
      var headH = 200, rowH = 236, infoH = 36 + info.length * 54, footH = 250;
      var H = headH + 28 + infoH + 28 + items.length * (rowH + 18) + footH + 30;
      var c = document.createElement('canvas'); c.width = W; c.height = H;
      var ctx = c.getContext('2d'); ctx.direction = 'rtl';
      ctx.fillStyle = '#FBF3EF'; ctx.fillRect(0, 0, W, H);
      var g = ctx.createLinearGradient(0, 0, W, headH); g.addColorStop(0, '#8e5b5c'); g.addColorStop(1, '#6b4344');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, headH);
      ctx.textAlign = 'center'; ctx.fillStyle = '#F6DCC0'; ctx.font = '700 58px ' + F; ctx.fillText('طلب جديد — شامة', W / 2, 88);
      ctx.fillStyle = '#EBCFC4'; ctx.font = '400 28px ' + F; ctx.fillText('رقم الطلب: \u2066' + curOrder.no + '\u2069', W / 2, 138);
      ctx.fillText('\u2066' + curOrder.when + '\u2069', W / 2, 176);
      var y = headH + 28;
      rrect(ctx, P, y, W - 2 * P, infoH, 26); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#F0DCE1'; ctx.lineWidth = 2; ctx.stroke();
      ctx.textAlign = 'right'; var ly = y + 62;
      info.forEach(function (r) {
        ctx.font = '700 29px ' + F; ctx.fillStyle = '#8e5b5c'; ctx.fillText(r[0] + ':', W - P - 28, ly);
        var lw = ctx.measureText(r[0] + ':').width;
        ctx.font = '400 29px ' + F; ctx.fillStyle = '#3A3A3A';
        var val = wrapText(ctx, r[1], W - 2 * P - 56 - lw - 20, 1)[0];
        ctx.fillText('\u2068' + val + '\u2069', W - P - 28 - lw - 14, ly);
        ly += 54;
      });
      y += infoH + 28;
      items.forEach(function (i) {
        rrect(ctx, P, y, W - 2 * P, rowH, 26); ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#F0DCE1'; ctx.stroke();
        var iw = 150, ih = 196, ix = W - P - 20 - iw, iy = y + 20;
        var im = i.thumb && imgCache[i.thumb];
        ctx.save(); rrect(ctx, ix, iy, iw, ih, 16); ctx.clip();
        if (im && im.complete && im.naturalWidth) {
          var sr = im.naturalWidth / im.naturalHeight, dr = iw / ih, sw = im.naturalWidth, sh = im.naturalHeight, sx = 0, sy = 0;
          if (sr > dr) { sw = sh * dr; sx = (im.naturalWidth - sw) / 2; } else { sh = sw / dr; sy = (im.naturalHeight - sh) * 0.2; }
          ctx.drawImage(im, sx, sy, sw, sh, ix, iy, iw, ih);
        } else { ctx.fillStyle = '#f4e9e4'; ctx.fillRect(ix, iy, iw, ih); }
        ctx.restore();
        var tx = ix - 24, ty = y + 56, maxW = tx - P - 230;
        ctx.textAlign = 'right'; ctx.fillStyle = '#3A3A3A'; ctx.font = '700 31px ' + F;
        wrapText(ctx, i.nameAr, maxW, 2).forEach(function (ln) { ctx.fillText(ln, tx, ty); ty += 40; });
        ctx.font = '400 26px ' + F; ctx.fillStyle = '#7a6064';
        if (i.color) { ctx.fillText('اللون: ' + i.color, tx, ty); ty += 36; }
        if (i.base) { ctx.fillText('القاعدة: ' + i.base + ' سم', tx, ty); ty += 36; }
        ctx.fillText('الكمية: \u2066' + i.qty + '\u2069' + (i.price != null ? '  ×  \u2066' + money(i.price) + '\u2069' : ''), tx, ty); ty += 36;
        if (i.gift) { ctx.fillStyle = '#8e5b5c'; ctx.font = '700 26px ' + F; ctx.fillText('🎁 تغليف هدية', tx, ty); }
        ctx.textAlign = 'left'; ctx.font = '700 34px ' + F; ctx.fillStyle = '#C4456C';
        ctx.fillText(i.price != null ? '\u2066' + money(i.price * i.qty) + '\u2069' : 'السعر عند التأكيد', P + 28, y + rowH / 2 + 12);
        y += rowH + 18;
      });
      rrect(ctx, P, y, W - 2 * P, footH - 40, 26); ctx.fillStyle = '#6b4344'; ctx.fill();
      ctx.textAlign = 'right'; ctx.fillStyle = '#F6DCC0'; ctx.font = '600 30px ' + F;
      var fy = y + 56;
      ctx.fillText('عدد القطع: \u2066' + st.pcs + '\u2069' + (st.gift ? '   |   🎁 مغلّفة: \u2066' + st.gift + '\u2069' : ''), W - P - 30, fy); fy += 50;
      ctx.fillText('الشحن: مجاني 🎁', W - P - 30, fy); fy += 58;
      if (st.allPriced) { ctx.font = '700 44px ' + F; ctx.fillStyle = '#fff'; ctx.fillText('الإجمالي: \u2066' + money(st.sum) + '\u2069', W - P - 30, fy); }
      ctx.textAlign = 'center'; ctx.fillStyle = '#9a7d84'; ctx.font = '400 24px ' + F;
      ctx.fillText('SHAMA ✦ شامة — الشحن مجاني لكل الولايات التركية', W / 2, H - 22);
      var url = c.toDataURL('image/jpeg', 0.88);
      return { dataUrl: url, file: dataUrlToFile(url, 'shama-order-' + curOrder.no + '.jpg') };
    } catch (e) { return null; }
  }

  /* ===== رسالة الواتساب (قسم عربي + قسم تركي للشحن) ===== */
  function ensureOrder() {
    if (curOrder) return curOrder;
    var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
    curOrder = { no: orderNo(), when: d.getFullYear() + '/' + p(d.getMonth() + 1) + '/' + p(d.getDate()) + '  ' + p(d.getHours()) + ':' + p(d.getMinutes()) };
    return curOrder;
  }
  function orderNo() {
    var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
    return 'SH-' + String(d.getFullYear()).slice(2) + p(d.getMonth() + 1) + p(d.getDate()) + '-' + p(d.getHours()) + p(d.getMinutes()) + '-' + Math.floor(100 + Math.random() * 900);
  }
  function siteBase() {
    if (SITE_URL) return SITE_URL.replace(/\/?$/, '/');
    if (/^https?:$/.test(location.protocol)) return location.origin + location.pathname.replace(/[^\/]*$/, '');
    return '';
  }
  function productUrl(i) {
    var b = siteBase(); if (!b) return '';
    return PAGE_OF[i.id] ? b + PAGE_OF[i.id] + '#' + i.id : b;
  }
  function b64url(str) {
    return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function orderLink() {
    var b = siteBase(); if (!b || !items.length) return '';
    ensureOrder();
    var p = {
      v: 1, n: curOrder.no, t: curOrder.when,
      c: { n: profile.name, p: profile.phone, ct: cityLabel('ar'), d: profile.district, b: profile.building, a: profile.apt, o: (profile.notes || '').trim(), l: form.loc || '' },
      i: items.map(function (i) { return { i: i.id, q: i.qty, g: i.gift ? 1 : 0, p: i.price, n: i.nameAr, c: i.color || '', b: i.base || '' }; })
    };
    return b + 'order.html?o=' + b64url(JSON.stringify(p));
  }
  function linkLine() { var u = orderLink(); return u ? 'رابط الطلب (افتحيه لمشاهدة الطلب كاملاً بالصور): ' + u + '\n\n' : ''; }
  /* ===== رسالة الطلب الرسمية (على نمط ترنديول) =====
     الرسالة بتنقسم لقسمين بنفس الواتساب:
       القسم الأول: ملخص الطلب بالعربي (لصاحبة المتجر)
       القسم الثاني: بيانات الشحن والتوصيل كاملة بالتركي (جاهزة لشركة الشحن)
     لو الرسالة طالت كتير، بنقصّرها على مرحلتين (level 1 ثم 2) بس قسم الشحن التركي يضل كامل دايماً. */
  var SEP = '━━━━━━━━━━━━━━━━';
  var TR_COLORS = {
    'أبيض': 'Beyaz', 'أبيض تاوب': 'Beyaz Taupe', 'أبيض رمادي': 'Beyaz Gri', 'أخضر زمرد': 'Zümrüt Yeşili',
    'أخضر غامق': 'Koyu Yeşil', 'أسود': 'Siyah', 'أسود بني': 'Siyah Kahve', 'أسود وبني': 'Siyah & Kahverengi',
    'بني': 'Kahverengi', 'بني غامق': 'Koyu Kahverengi', 'بوردو': 'Bordo', 'بيج': 'Bej', 'بيج بني': 'Bej Kahve',
    'بيج رمادي': 'Bej Gri', 'بيج فاتح': 'Açık Bej', 'بيج كاكي': 'Bej Haki', 'بيج وأسود': 'Bej & Siyah',
    'بيج وبني': 'Bej & Kahverengi', 'تاوب': 'Taupe', 'جملي': 'Camel', 'رمادي': 'Gri', 'رمادي غامق': 'Koyu Gri',
    'رمادي فاتح': 'Açık Gri', 'رمادي وأسود': 'Gri & Siyah', 'زيتي': 'Zeytin Yeşili', 'عسلي': 'Bal Rengi',
    'كاميل': 'Camel', 'كحلي': 'Lacivert', 'كريمي': 'Krem', 'كونياك': 'Konyak', 'وردي': 'Pembe'
  };
  function ltr(s) { return '\u2066' + s + '\u2069'; }          // يمنع قلب الأرقام والرموز داخل الأسطر العربية
  function colorTr(i) { return TR_COLORS[i.color] || i.colorEn || i.color || ''; }
  function moneyTr(n) {                                           // 1850 -> 1.850 ₺ (الصيغة التركية)
    var r = Math.round(n * 100) / 100, p = String(r).split('.');
    return p[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (p[1] ? ',' + (p[1].length < 2 ? p[1] + '0' : p[1]) : '') + CURRENCY;
  }
  function whenAr() { return String(curOrder.when || '').replace(/\s+/g, ' '); }
  function whenTr() {
    var m = String(curOrder.when || '').match(/(\d{4})\/(\d{2})\/(\d{2})\s+(\d{2}:\d{2})/);
    return m ? m[3] + '.' + m[2] + '.' + m[1] + ' ' + m[4] : whenAr();
  }
  function skuOf(i) { return 'SH-' + String(i.id).toUpperCase(); }

  /* القسم الأول: عربي */
  function sectionAr(lv) {
    var st = orderStats(), L = [], phone = normPhone(profile.phone) || profile.phone;
    var total = st.allPriced ? money(st.sum) : 'يُحدد عند التأكيد';
    L.push('*شامة | SHAMA* ✦');
    L.push('*ملخص الطلب*');
    L.push('رقم الطلب: ' + ltr(curOrder.no));
    L.push('تاريخ الطلب: ' + ltr(whenAr()));
    L.push('عدد المنتجات: ' + items.length + ' | إجمالي القطع: ' + st.pcs);
    if (lv >= 2) {
      L.push('الإجمالي: ' + total + ' | الشحن: مجاني 🎁');
      L.push('📷 تفاصيل المنتجات وصورها في الصورة التالية');
      return L.join('\n');
    }
    L.push('');
    L.push('*بيانات العميلة*');
    L.push('الاسم: ' + profile.name);
    L.push('الهاتف: ' + ltr(phone));
    if (lv === 0) {
      L.push('المدينة: ' + cityLabel('ar'));
      L.push('المنطقة: ' + profile.district);
      L.push('البناية: ' + profile.building + ' | الشقة: ' + profile.apt);
      if (profile.notes && profile.notes.trim()) L.push('ملاحظات: ' + profile.notes.trim());
      if (form.loc) L.push('الموقع على الخريطة: ' + form.loc);
    }
    L.push('');
    L.push('*المنتجات*');
    items.forEach(function (i, n) {
      var price = i.price != null ? money(i.price * i.qty) : 'يُحدد عند التأكيد';
      if (lv === 0) {
        L.push((n + 1) + ') ' + i.nameAr);
        var d = [];
        if (i.color) d.push('اللون: ' + i.color);
        if (i.base) d.push('القاعدة: ' + i.base + ' سم');
        if (d.length) L.push('   ' + d.join(' | '));
        L.push('   الكمية: ' + i.qty + ' | السعر: ' + price);
        L.push('   رمز المنتج: ' + ltr(skuOf(i)));
        if (i.gift) L.push('   🎁 تغليف هدية');
        var u = productUrl(i); if (u) L.push('   الرابط: ' + u);
      } else {
        L.push((n + 1) + ') ' + i.nameAr + (i.color ? ' (' + i.color + ')' : '') + (i.base ? ' [' + i.base + 'سم]' : '') +
          ' ×' + i.qty + ' = ' + price + (i.gift ? ' 🎁' : ''));
      }
    });
    L.push('');
    L.push('*ملخص الدفع*');
    if (st.allPriced) L.push('المجموع الفرعي: ' + money(st.sum));
    L.push('الشحن: مجاني 🎁');
    if (st.gift) L.push('تغليف هدية: ' + st.gift + ' قطعة (بفرق سعر بسيط)');
    L.push('*الإجمالي: ' + total + '*');
    return L.join('\n');
  }

  /* القسم الثاني: تركي (كل بيانات الشحن) */
  function sectionTr(lv) {
    var st = orderStats(), L = [], phone = normPhone(profile.phone) || profile.phone;
    var total = st.allPriced ? moneyTr(st.sum) : 'Onay sırasında belirlenecek';
    L.push('*SİPARİŞ ÖZETİ – KARGO BİLGİLERİ*');
    L.push('Sipariş No: ' + curOrder.no);
    L.push('Sipariş Tarihi: ' + whenTr());
    L.push('');
    L.push('*TESLİMAT ADRESİ*');
    L.push('Alıcı: ' + profile.name);
    L.push('Telefon: ' + phone);
    L.push('İl: ' + cityLabel('tr'));
    L.push('İlçe / Mahalle: ' + profile.district);
    L.push('Bina No: ' + profile.building + ' | Daire No: ' + profile.apt);
    if (profile.notes && profile.notes.trim()) L.push('Adres Tarifi: ' + profile.notes.trim());
    if (form.loc) L.push('Konum: ' + form.loc);
    L.push('');
    if (lv >= 2) {
      L.push('Toplam Ürün: ' + st.pcs + ' adet | Kargo: Ücretsiz');
      L.push('*Toplam Tutar: ' + total + '*');
      return L.join('\n');
    }
    L.push('*ÜRÜNLER*');
    items.forEach(function (i, n) {
      var price = i.price != null ? moneyTr(i.price * i.qty) : 'Onayda belirlenecek';
      var col = colorTr(i);
      if (lv === 0) {
        L.push((n + 1) + ') ' + (i.nameEn || i.nameAr) + (col ? ' - ' + col : ''));
        if (i.base) L.push('   Taban: ' + i.base + ' cm');
        L.push('   Adet: ' + i.qty + ' | Tutar: ' + price);
        L.push('   Ürün Kodu: ' + skuOf(i));
        if (i.gift) L.push('   🎁 Hediye paketi');
      } else {
        L.push((n + 1) + ') ' + (i.nameEn || i.nameAr) + (col ? ' (' + col + ')' : '') + (i.base ? ' [' + i.base + ' cm]' : '') +
          ' x' + i.qty + ' = ' + price + (i.gift ? ' 🎁' : ''));
      }
    });
    L.push('');
    L.push('*SİPARİŞ TUTARI*');
    if (st.allPriced) L.push('Ara Toplam: ' + moneyTr(st.sum));
    L.push('Kargo Ücreti: Ücretsiz');
    if (st.gift) L.push('Hediye Paketi: ' + st.gift + ' adet (küçük fiyat farkı ile)');
    L.push('*Toplam Tutar: ' + total + '*');
    return L.join('\n');
  }

  /* الرسالة النهائية = رابط الطلب + [عربي] + فاصل + [تركي] */
  function buildBoth(lv) {
    ensureOrder();
    return linkLine() + sectionAr(lv) + '\n\n' + SEP + '\n\n' + sectionTr(lv);
  }
  function buildMessage() { return buildBoth(0); }   // كاملة
  function buildCompact() { return buildBoth(1); }   // مختصرة
  function buildMini() { return buildBoth(2); }      // أقصر نسخة (التفاصيل بالصورة)


  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.sc-fin-switch button');
    if (!btn || btn.classList.contains('on') || btn.classList.contains('na') || !currentCard) return;
    var sib = siblingFinish(currentCard); if (sib) sib.click();
  });

  // مسح رسالة الخطأ أول ما تبدأ الزبونة تعدّل الحقل
  document.addEventListener('input', function (e) {
    var el = e.target;
    if (el && el.classList && el.classList.contains('err') && drawer && drawer.contains(el)) {
      el.classList.remove('err');
      var m = el.nextElementSibling;
      if (m && m.classList.contains('sc-err-msg')) m.classList.remove('show');
    }
  });

  /* ===== أحداث الدرج ===== */
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-act]');
    if (!b || !drawer || !drawer.contains(b)) return;
    var act = b.dataset.act, i = parseInt(b.dataset.i, 10);
    if (act === 'close') { closeDrawer(); }
    else if (act === 'inc') { items[i].qty += 1; save(); updateBadge(); render(); }
    else if (act === 'dec') { items[i].qty -= 1; if (items[i].qty < 1) items.splice(i, 1); save(); updateBadge(); render(); }
    else if (act === 'gift') {
      var it2 = items[i]; it2.gift = !it2.gift;
      it2.key = it2.key.replace(/:g$/, '') + (it2.gift ? ':g' : '');
      var dup = items.filter(function (x, k) { return k !== i && x.key === it2.key; })[0];
      if (dup) { dup.qty += it2.qty; items.splice(i, 1); }
      save(); updateBadge(); render();
    }
    else if (act === 'rm') { items.splice(i, 1); save(); updateBadge(); render(); }
    else if (act === 'checkout') { ensureOrder(); warmImages(); view = 'form'; render(); }
    else if (act === 'back') { view = 'cart'; render(); }
    else if (act === 'editprofile') { openGate(null); }
    else if (act === 'loc') {
      if (!navigator.geolocation) { showToast(t('locFail')); return; }
      navigator.geolocation.getCurrentPosition(function (pos) {
        form.loc = 'https://maps.google.com/?q=' + pos.coords.latitude.toFixed(6) + ',' + pos.coords.longitude.toFixed(6);
        render();
      }, function () { showToast(t('locFail')); }, { timeout: 10000 });
    }
    else if (act === 'send') {
      if (!profileValid()) { openGate(null); showToast(t('needInfo')); return; }
      var orderMsg = buildMessage();
      orderImg = makeOrderImage();
      lastWaUrl = pickWaUrl();
      lastWaMsg = orderMsg;
      sentOk = openExternal(lastWaUrl, orderMsg);
      curOrder = null;
      items = []; save(); updateBadge();
      view = 'done'; render();
    }
    else if (act === 'shareimg') {
      if (orderImg && navigator.share) {
        navigator.share({ files: [orderImg.file], text: orderImg.file.name.replace(/^shama-order-|\.jpg$/g, '') }).catch(function () {});
      }
    }
    else if (act === 'saveimg') {
      if (orderImg) { var a = document.createElement('a'); a.href = orderImg.dataUrl; a.download = orderImg.file.name; document.body.appendChild(a); a.click(); a.remove(); }
    }
    else if (act === 'copymsg') { copyText(lastWaMsg); var bx = document.getElementById('scMsgBox'); if (bx) { bx.focus(); bx.select(); } }
    else if (act === 'reopen') { if (lastWaUrl) openExternal(lastWaUrl, lastWaMsg); }
  });

  /* ===== تشغيل ===== */
  /* ===== slider على البطاقة (أكتر من صورة لكل منتج) ===== */
  function initSliders() {
    document.querySelectorAll('.card').forEach(function (card) {
      var jsn = card.querySelector('.color-data'), media = card.querySelector('.card-media'), sl = card.querySelector('.slider');
      if (!jsn || !sl || !media) return;
      var imgs; try { imgs = JSON.parse(jsn.textContent)[0] || []; } catch (e) { return; }
      if (!imgs.length) return;
      sl.innerHTML = imgs.map(function (s, i) { return '<img src="' + s + '" alt="" class="' + (i === 0 ? 'active' : '') + '" data-i="' + i + '">'; }).join('');
      if (imgs.length < 2) return;
      var cur = 0, timer = null;
      var prev = document.createElement('button'), next = document.createElement('button'), dots = document.createElement('div');
      prev.type = next.type = 'button'; prev.className = 'cs-arrow prev'; next.className = 'cs-arrow next';
      prev.innerHTML = '&#8249;'; next.innerHTML = '&#8250;'; prev.setAttribute('aria-label', 'Previous'); next.setAttribute('aria-label', 'Next');
      dots.className = 'cs-dots';
      imgs.forEach(function (_, i) { var d = document.createElement('span'); d.className = 'cs-dot' + (i === 0 ? ' active' : ''); dots.appendChild(d); });
      media.appendChild(prev); media.appendChild(next); media.appendChild(dots);
      function go(n) {
        cur = (n + imgs.length) % imgs.length;
        sl.querySelectorAll('img').forEach(function (im, i) { im.classList.toggle('active', i === cur); });
        dots.querySelectorAll('.cs-dot').forEach(function (d, i) { d.classList.toggle('active', i === cur); });
      }
      [prev, next].forEach(function (b) {
        b.addEventListener('click', function (e) { e.stopPropagation(); e.preventDefault(); go(cur + (b === next ? 1 : -1)); });
      });
      card.addEventListener('mouseenter', function () { clearInterval(timer); timer = setInterval(function () { go(cur + 1); }, 1600); });
      card.addEventListener('mouseleave', function () { clearInterval(timer); go(0); });
    });
  }

  /* ===== فتح الروابط الخارجية (واتساب/إنستغرام) بشكل آمن =====
     بعض البيئات (معاينة داخل إطار، متصفحات التطبيقات) بتمنع فتح تبويب جديد.
     نجرّب فتح تبويب، وإذا انمنع ننسخ الرقم/الرسالة ونعطي تلميح، ونجرّب فتح الرابط بالصفحة الرئيسية. */
  function openExternal(url, copyVal) {
    var w = null;
    try { w = window.open(url, '_blank'); } catch (e) { w = null; }
    if (w) { try { w.opener = null; } catch (e) {} return true; }
    if (copyVal) copyText(copyVal, true);
    showToast(t('blockedHint'));
    try { window.top.location.href = url; } catch (e) { /* ممنوع من الإطار */ }
    return false;
  }

  /* ===== نافذة تواصلي معنا (واتساب + إنستغرام) ===== */
  var IG = 'shamas_bags', contactOv;
  function fmtWa() { var d = WHATSAPP.replace(/\D/g, ''); return '+' + d.slice(0, 2) + ' ' + d.slice(2, 5) + ' ' + d.slice(5, 8) + ' ' + d.slice(8, 10) + ' ' + d.slice(10); }
  var ICO_WA = '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.45 15.04L2 22l5.1-1.55A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.3 14.98l-.3-.18-2.98.9.92-2.9-.2-.31A8.1 8.1 0 0 1 12.04 3.8zm-3 3.9c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.48 2.5 1.07 3 .86 3.54.8.54-.05 1.74-.7 1.98-1.4.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35-.3-.15-1.74-.86-2-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.2-.24-.58-.49-.5-.67-.5z"/></svg>';
  var ICO_IG = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>';
  function renderContact() {
    contactOv.innerHTML = '<div class="sc-contact" role="dialog" aria-modal="true"><button class="sc-x" type="button" data-ct="close" aria-label="' + esc(t('close')) + '">✕</button>' +
      '<div class="ct-swan">🦢</div><h3>' + esc(t('ctT')) + '</h3><p class="ct-sub">' + esc(t('ctS')) + '</p>' +
      '<a class="ct-row ct-link" href="https://wa.me/' + WHATSAPP + '" target="_blank" rel="noopener noreferrer"><span class="ct-ico wa">' + ICO_WA + '</span><span class="ct-txt"><b>' + esc(t('wa')) + '</b><em dir="ltr">' + esc(fmtWa()) + '</em></span><span class="ct-arrow">‹</span></a>' +
      '<a class="ct-row ct-link" href="https://instagram.com/' + IG + '" target="_blank" rel="noopener noreferrer"><span class="ct-ico ig">' + ICO_IG + '</span><span class="ct-txt"><b>' + esc(t('ig')) + '</b><em dir="ltr">@' + IG + '</em></span><span class="ct-arrow">‹</span></a></div>';
  }
  function copyText(txt, silent) {
    function done() { if (!silent) showToast(t('copied')); }
    try { navigator.clipboard.writeText(txt).then(done, fallback); } catch (e) { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta); done();
    }
  }
  function openContact() { renderContact(); contactOv.classList.add('open'); }
  function initContact() {
    contactOv = document.createElement('div'); contactOv.className = 'sc-contact-ov'; document.body.appendChild(contactOv);
    contactOv.addEventListener('click', function (e) { var cp = e.target.closest && e.target.closest('.ct-copy'); if (cp) { copyText(cp.getAttribute('data-copy')); return; } if (e.target === contactOv || (e.target.closest && e.target.closest('[data-ct="close"]'))) contactOv.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') contactOv.classList.remove('open'); });
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
      var href = a.getAttribute('href') || '';
      var isWa = href === 'https://wa.me/' + WHATSAPP;
      if (!a.closest('.sc-contact') && (a.hasAttribute('data-contact') || a.classList.contains('nav-wa') || (isWa && !a.closest('footer')))) { e.preventDefault(); e.stopPropagation(); openContact(); }
      else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?instagram\.com)\//i.test(a.href || '')) {
        e.preventDefault(); e.stopPropagation();
        var isIg = /instagram\.com/i.test(a.href);
        openExternal(a.href, isIg ? '@' + IG : '+' + WHATSAPP);
      }
    }, true);
  }
  function openFromHash() {
    var h = ((location.hash || window.__SHAMA_HASH || '') + '').replace(/^#/, ''); if (!h) return;
    var c = document.querySelector('.card[data-id="' + h + '"]'); if (!c) return;
    setTimeout(function () { c.scrollIntoView({ block: 'center' }); c.click(); }, 450);
  }

  /* ===== سهم الرجوع للقائمة الرئيسية (كل الصفحات الداخلية) ===== */
  function initBackBtn() {
    if (document.getElementById('sections')) return;        // الصفحة الرئيسية
    var a = document.createElement('a');
    a.className = 'sc-back'; a.href = 'index.html#sections';
    a.setAttribute('aria-label', 'القائمة الرئيسية');
    a.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg><span data-ar="القائمة الرئيسية" data-en="Main menu">القائمة الرئيسية</span>';
    document.body.appendChild(a);
  }

  var FIN = { glossy: { ar: '✨ لامع', en: '✨ Glossy', dAr: 'سطح لامع بلمعة عاكسة تخطف النظر', dEn: 'A shiny, reflective finish that catches the eye' }, matte: { ar: 'مطفي', en: 'Matte', dAr: 'سطح مطفي ناعم وهادئ بإطلالة راقية', dEn: 'A soft, understated finish with a refined look' } };
  function cardColor(card, lng) {
    var c = lng === 'en' ? (card.dataset.colorEn || card.dataset.colorAr) : card.dataset.colorAr;
    return c || '';
  }
  function colorLineHtml(card, noTag) {
    var L = lang(), c = cardColor(card, L); if (!c) return '';
    var fin = card.dataset.finish, tag = (!noTag && fin && FIN[fin]) ? '<span class="sc-fin-tag ' + fin + '">' + esc(FIN[fin][L]) + '</span>' : '';
    return '<i style="background:' + esc(card.dataset.colorHex || '#ccc') + '"></i><span>' + esc((L === 'en' ? 'Color: ' : 'اللون: ') + c) + '</span>' + tag;
  }
  function addSparks(el) {
    if (!el || el.querySelector('.sc-spark')) return;
    [['12%', '16%', '0s'], ['78%', '30%', '.9s'], ['26%', '72%', '1.7s']].forEach(function (p) {
      var s = document.createElement('span'); s.className = 'sc-spark'; s.textContent = '✦'; s.style.cssText = 'top:' + p[0] + ';left:' + p[1] + ';animation-delay:' + p[2]; el.appendChild(s);
    });
  }
  function addFinFx(el, fin) {
    if (!el || el.querySelector('.sc-fin-frame')) return;
    var f = document.createElement('span'); f.className = 'sc-fin-frame ' + fin; el.appendChild(f);
    if (fin === 'glossy') { var g = document.createElement('span'); g.className = 'sc-fin-glint'; el.appendChild(g); addSparks(el); }
  }
  function siblingFinish(card) {
    var out = null;
    document.querySelectorAll('.card[data-finish]').forEach(function (c) {
      if (c !== card && c.dataset.nameAr === card.dataset.nameAr && c.dataset.colorAr === card.dataset.colorAr && c.dataset.finish !== card.dataset.finish) out = c;
    });
    return out;
  }
  function decorateCards() {
    document.querySelectorAll('.card[data-color-ar]').forEach(function (card) {
      var body = card.querySelector('.card-body'), h3 = body && body.querySelector('h3');
      if (h3 && !body.querySelector('.sc-colorline')) {
        var d = document.createElement('div'); d.className = 'sc-colorline' + (card.querySelector('.swatch') ? ' nodot' : ''); d.innerHTML = colorLineHtml(card); h3.parentNode.insertBefore(d, h3.nextSibling);
      }
      var fin = card.dataset.finish, media = card.querySelector('.card-media');
      if (fin && FIN[fin] && media) { card.classList.add('fin-' + fin); addFinFx(media, fin); }
    });
    document.querySelectorAll('.pcard.fin-glossy .pm, .pcard.fin-matte .pm').forEach(function (pm) { addFinFx(pm, pm.closest('.pcard').classList.contains('fin-glossy') ? 'glossy' : 'matte'); });
  }
  function refreshColorUI() {
    var L = lang();
    document.querySelectorAll('.card[data-color-ar]').forEach(function (card) {
      var line = card.querySelector('.sc-colorline'); if (line) line.innerHTML = colorLineHtml(card);
    });
    document.querySelectorAll('.pcard .sc-fin-tag').forEach(function (tg) { tg.textContent = tg.getAttribute(L === 'en' ? 'data-en' : 'data-ar'); });
    if (colorBox) {
      var cc = currentCard, fin = cc && cc.dataset.finish, html = '';
      if (cc && cc.dataset.colorAr) html += '<div class="sc-colorline big">' + colorLineHtml(cc, true) + '</div>';
      if (fin && FIN[fin]) {
        var other = fin === 'glossy' ? 'matte' : 'glossy', sib = siblingFinish(cc);
        html += '<div class="sc-fin-switch" role="group">' + ['glossy', 'matte'].map(function (k) {
          var cls = k + (k === fin ? ' on' : (!sib ? ' na' : ''));
          return '<button type="button" class="' + cls + '" data-fin="' + k + '">' + esc(FIN[k][L]) + '</button>';
        }).join('') + '</div><div class="sc-fin-desc">' + esc(L === 'en' ? FIN[fin].dEn : FIN[fin].dAr) +
          (!sib ? ' · ' + esc(L === 'en' ? 'this color comes in this finish only' : 'هذا اللون متوفر بهذه اللمعة فقط') : '') + '</div>';
      }
      colorBox.innerHTML = html;
    }
  }
  function markSoldCards() {
    document.querySelectorAll('.card[data-soldout="1"]').forEach(function (card) {
      card.classList.add('sc-sold');
      var media = card.querySelector('.card-media');
      if (media && !media.querySelector('.sc-sold-badge')) {
        var b = document.createElement('span'); b.className = 'sc-sold-badge'; b.textContent = t('soldOut'); media.appendChild(b);
      }
    });
  }
  function init() {
    load();
    loadProfile();
    initSliders(); initContact(); initBackBtn(); openFromHash();
    build();
    markSoldCards();
    decorateCards();
    updateBadge();
    refreshModalUI();
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
