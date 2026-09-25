(()=>{"use strict";

const DECK = "verb";

const GRUPP = {
  "1":  "Grupp 1: presens på <b>-ar</b>, preteritum på <b>-ade</b>, supinum på <b>-at</b>.",
  "2a": "Grupp 2a: presens på <b>-er</b>, preteritum på <b>-de</b>, supinum på <b>-t</b>.",
  "2b": "Grupp 2b: stammen slutar på k, p, s, t eller x. Därför preteritum på <b>-te</b> och supinum på <b>-t</b>.",
  "3":  "Grupp 3: korta verb som inte slutar på <b>-a</b>, till exempel bo och tro. Presens på <b>-r</b>, preteritum på <b>-dde</b>, supinum på <b>-tt</b>.",
  "4":  "Grupp 4: starka och oregelbundna verb. De måste man lära sig utantill."
};

const IMP = {
  kort:  "Imperativ = infinitiv utan <b>-a</b>: skriva &rarr; skriv.",
  ar:    "Verb i grupp 1 slutar på <b>-a</b> även i imperativ: öppna &rarr; öppna.",
  vokal: "Korta verb med bara en stavelse ändras inte i imperativ: gå &rarr; gå, tro &rarr; tro, ha &rarr; ha.",
  m:     "Imperativ = infinitiv utan <b>-a</b>. Verb på <b>-mma</b> får bara ett <b>m</b> i imperativ: komma &rarr; kom, glömma &rarr; glöm."
};

/* infinitiv: [presens, preteritum, supinum, grupp]; "/" skiljer två rätta former */
const V = {
  arbeta:["arbetar","arbetade","arbetat","1"],
  prata:["pratar","pratade","pratat","1"],
  stänga:["stänger","stängde","stängt","2a"],
  ringa:["ringer","ringde","ringt","2a"],
  höra:["hör","hörde","hört","2a"],
  glömma:["glömmer","glömde","glömt","2a"],
  köpa:["köper","köpte","köpt","2b"],
  läsa:["läser","läste","läst","2b"],
  leka:["leker","lekte","lekt","2b"],
  tänka:["tänker","tänkte","tänkt","2b"],
  åka:["åker","åkte","åkt","2b"],
  bo:["bor","bodde","bott","3"],
  tro:["tror","trodde","trott","3"],
  skriva:["skriver","skrev","skrivit","4"],
  dricka:["dricker","drack","druckit","4"],
  gå:["går","gick","gått","4"],
  göra:["gör","gjorde","gjort","4"],
  ha:["har","hade","haft","4"],
  vara:["är","var","varit","4"],
  ge:["ger","gav","gett/givit","4"],
  ta:["tar","tog","tagit","4"],
  se:["ser","såg","sett","4"],
  veta:["vet","visste","vetat","4"],
  säga:["säger","sa/sade","sagt","4"],
  lägga:["lägger","la/lade","lagt","4"],
  komma:["kommer","kom","kommit","4"],
  sova:["sover","sov","sovit","4"],
  äta:["äter","åt","ätit","4"],
  finnas:["finns","fanns","funnits","4"],
  stå:["står","stod","stått","4"],
  sitta:["sitter","satt","suttit","4"],
  ligga:["ligger","låg","legat","4"],
  springa:["springer","sprang","sprungit","4"],
  flyga:["flyger","flög","flugit","4"],
  bli:["blir","blev","blivit","4"],
  få:["får","fick","fått","4"],
  sälja:["säljer","sålde","sålt","4"],
  välja:["väljer","valde","valt","4"],
  gråta:["gråter","grät","gråtit","4"],
  vinna:["vinner","vann","vunnit","4"],
  förstå:["förstår","förstod","förstått","4"]
};

const TVA = {
  "sa/sade":"Både <i>sa</i> och <i>sade</i> är rätt.",
  "la/lade":"Både <i>la</i> och <i>lade</i> är rätt.",
  "gett/givit":"Både <i>gett</i> och <i>givit</i> är rätt."
};

const alla = form => form.split("/");
const former = inf => "Formerna: <i>"+esc([inf].concat(V[inf].slice(0,3)).join(", "))+"</i>";
const regel = (inf,extra) => {
  const tva = V[inf].slice(1,3).map(f=>TVA[f]).filter(Boolean).join(" ");
  return GRUPP[V[inf][3]]+" "+former(inf)+"."+(tva?" "+tva:"")+(extra?" "+extra:"");
};

/* Välj preteritum: [mening, infinitiv, [fel, fel], extra] */
const D_PRET = [
["Igår % jag hela dagen.","arbeta",["arbetat","arbette"]],
["Hon % dörren när hon gick ut.","stänga",["stängt","stängade"]],
["Jag % mjölk i affären i morse.","köpa",["köpt","köpade"]],
["Förr % vi i Göteborg.","bo",["bott","boade"]],
["Hon % mig igår kväll.","ringa",["ringt","ringade"]],
["Jag % på dig hela dagen igår.","tänka",["tänkt","tänkade"]],
["Han % till Stockholm förra veckan.","åka",["åkt","åkade"]],
["Igår % jag ett långt mejl till min chef.","skriva",["skrivit","skrivde"]],
["Han % tre koppar kaffe i morse.","dricka",["druckit","drickade"]],
["Vi % hem efter filmen igår.","gå",["gått","gådde"]],
["Vad % du i helgen?","göra",["gjort","görde"]],
["När jag var liten % jag en hund.","ha",["haft","hadde"]],
["Hon % mig en bok i julklapp förra året.","ge",["gett","gedde"]],
["Jag % bussen till jobbet i morse.","ta",["tagit","tade"]],
["Vi % en bra film på bio i fredags.","se",["sett","sedde"]],
["Jag % inte att du var hemma.","veta",["vetat","vetade"]],
["Han % ingenting på hela kvällen.","säga",["sagt","sägde"]],
["Hon % nycklarna på bordet när hon kom hem.","lägga",["lagt","läggde"]],
["Igår % tåget tjugo minuter för sent.","komma",["kommit","kommde"]],
["Jag % dåligt förra natten.","sova",["sovit","sovde"]],
["Vi % pizza i fredags.","äta",["ätit","ätade"]],
["Förr % det en bank här.","finnas",["funnits","finnade"]]
];

/* Välj supinum: [mening, infinitiv, [fel, fel], extra] */
const D_SUP = [
["Jag har % här i tre år.","bo",["bodde","bodit"]],
["Det hade jag aldrig %!","tro",["trodde","troat"]],
["Vi har % i telefon i en timme.","prata",["pratade","pratit"]],
["Har du % fönstret?","stänga",["stängde","stängat"]],
["Jag har % mitt paraply på bussen.","glömma",["glömde","glömmat"],"Dubbelt <b>m</b> blir enkelt före en annan konsonant: glömde, glömt."],
["Jag har % en ny cykel.","köpa",["köpte","köpat"]],
["Hon har % boken tre gånger.","läsa",["läste","läsit"]],
["Har du % frukost?","äta",["åt","ätat"]],
["Jag har aldrig % i Japan.","vara",["var","är"]],
["Hon har % tre böcker.","skriva",["skrev","skrivat"]],
["Vi har redan % filmen.","se",["såg","sedd"],"Efter <i>har</i> kommer supinum (sett), inte particip (sedd)."],
["Har du % upp mjölken?","dricka",["drack","drickat"]],
["Vad har du % idag?","göra",["gjorde","gört"]],
["Hon har % mig en present.","ge",["gav","gedd"]],
["Vem har % min penna?","ta",["tog","tat"]],
["Vad har han %?","säga",["sa","sägt"]],
["Jag har % nycklarna på bordet.","lägga",["la","legat"],"<i>Legat</i> kommer från <i>ligga</i>. Här lägger någon något någonstans: <i>lägga</i>."],
["Katten har % på soffan hela dagen.","ligga",["låg","lagt"],"<i>Lagt</i> kommer från <i>lägga</i>. Katten lägger inte något, den ligger: <i>ligga</i>."],
["Har paketet % än?","komma",["kom","kommat"]],
["Har du % gott?","sova",["sov","sovat"]]
];

/* Välj presens: [mening, infinitiv, [fel, fel], extra] */
const D_PRES = [
["Jag % på ett kontor i centrum.","arbeta",["arbeter","arbeta"]],
["Affären % klockan åtta på kvällen.","stänga",["stängar","stänga"]],
["Min mamma % mig varje söndag.","ringa",["ringar","ringa"]],
["% du mig?","höra",["Hörer","Höra"],"Stammen slutar på <b>r</b>, därför får presens ingen extra ändelse: hör."],
["Han % tidningen varje morgon.","läsa",["läsar","läsa"]],
["Barnen % i sitt rum.","leka",["lekar","leka"]],
["Vi % i en lägenhet i Malmö.","bo",["boer","boar"]],
["Vi % kaffe varje morgon.","dricka",["drickar","dricka"]],
["Bussen % klockan åtta.","gå",["gåer","gå"]],
["Vad % du på helgerna?","göra",["görer","göra"]],
["Jag % trött just nu.","vara",["vara","varit"],"Presens av <i>vara</i> är oregelbundet: är."],
["Jag % inte vad han heter.","veta",["veter","vetar"],"Presens av <i>veta</i> är oregelbundet: vet."]
];

/* Skriv formen: [mening, infinitiv, "pret" eller "sup", extra] */
const D_FORM = [
["Igår % jag ett vykort till mormor.","skriva","pret"],
["Hon har aldrig % öl.","dricka","sup"],
["Vad har du % med håret?","göra","sup"],
["Vi har inte % tid att städa.","ha","sup"],
["Har du någonsin % i Norge?","vara","sup"],
["Pappa % mig en klocka när jag fyllde arton.","ge","pret"],
["Jag har % honom mitt nummer.","ge","sup"],
["Vem har % mitt paraply?","ta","sup"],
["Jag % henne på stan igår.","se","pret"],
["Jag % inte att affären var stängd.","veta","pret"],
["Igår % hon att hon var sjuk.","säga","pret"],
["Han har % att han kommer ikväll.","säga","sup"],
["Igår kväll % jag telefonen på bordet.","lägga","pret"],
["Var har du % mina glasögon?","lägga","sup"],
["Hon har precis % hem.","komma","sup"],
["På bion igår % hon bredvid mig.","sitta","pret"],
["Jag har % i sängen hela dagen.","ligga","sup"],
["I morse % hon fem kilometer.","springa","pret"],
["Vi har % till Thailand två gånger.","flyga","sup"],
["Igår % det mörkt tidigt.","bli","pret"],
["Jag har % ett nytt jobb.","få","sup"],
["Hon % när filmen var slut.","gråta","pret"],
["Vem % matchen igår?","vinna","pret"],
["Förra året % de sitt hus.","sälja","pret"],
["Han % i dörren och väntade.","stå","pret"],
["Jag har aldrig % matematik.","förstå","sup"],
];

/* Skriv preteritum och supinum */
const D_TRE = ["skriva","dricka","gå","göra","ha","vara","ge","ta","se","veta","säga","lägga","komma","sova","äta","finnas","ligga","bli","få","välja"];

/* Imperativ, välj: [mening, infinitiv, imperativ, [fel, fel], regel] */
const D_IMP = [
["% dörren, tack!","stänga","Stäng",["Stänger","Stänga"],"kort"],
["% mjölk på vägen hem!","köpa","Köp",["Köper","Köpa"],"kort"],
["% ditt namn här!","skriva","Skriv",["Skriver","Skriva"],"kort"],
["% texten högt!","läsa","Läs",["Läser","Läsa"],"kort"],
["% mig imorgon!","ringa","Ring",["Ringer","Ringa"],"kort"],
["% det igen!","säga","Säg",["Säger","Säga"],"kort"],
["% upp maten!","äta","Ät",["Äter","Äta"],"kort"],
["% tyst!","vara","Var",["Är","Vara"],"kort"],
["% fönstret, det är varmt här!","öppna","Öppna",["Öppn","Öppnar"],"ar"],
["% på mig!","vänta","Vänta",["Vänt","Väntar"],"ar"],
["% hem nu!","gå","Gå",["Går","Gåa"],"vokal"],
["% hit!","komma","Kom",["Komm","Kommer"],"m"],
["% inte nycklarna!","glömma","Glöm",["Glömm","Glömmer"],"m"],
["% inte på honom!","tro","Tro",["Tror","Troa"],"vokal"],
["% mig saltet, tack!","ge","Ge",["Ger","Gea"],"vokal"],
["% en kaka till!","ta","Ta",["Tar","Taa"],"vokal"]
];

/* Imperativ, skriv: [mening, infinitiv, imperativ, regel] */
const D_IMP_TIPPEN = [
["% ett mejl till henne!","skriva","Skriv","kort"],
["% lite vatten!","dricka","Drick","kort"],
["% mig med väskan!","hjälpa","Hjälp","kort"],
["% på det!","tänka","Tänk","kort"],
["% den här pennan!","använda","Använd","kort"],
["% försiktig!","vara","Var","kort"],
["% inte!","ljuga","Ljug","kort"],
["% av mobilen!","stänga","Stäng","kort"],
["% långsammare, tack!","prata","Prata","ar"],
["% det så bra!","ha","Ha","vokal"],
["% läxorna nu!","göra","Gör","kort"]
];

const hel = (satz,form) => {
  const s = satz.replace("%",form);
  return s.charAt(0).toUpperCase()+s.slice(1);
};

const valjForm = (lista,index) => lista.forEach(([satz,inf,falsch,extra])=>{
  const richtig = alla(V[inf][index])[0];
  const visad = satz.startsWith("%") ? richtig.charAt(0).toUpperCase()+richtig.slice(1) : richtig;
  neueKarte({
    deck:DECK, typ:"wahl",
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Vilken form av <i>"+esc(inf)+"</i>?",
    optionen:[visad].concat(falsch), richtig:visad,
    erklaerung:regel(inf,extra)+" &ndash; "+esc(hel(satz,richtig))
  });
});
valjForm(D_PRES,0);
valjForm(D_PRET,1);
valjForm(D_SUP,2);

D_FORM.forEach(([satz,inf,tid,extra])=>{
  const loesungen = alla(V[inf][tid==="pret"?1:2]);
  neueKarte({
    deck:DECK, typ:"tippen", schwer:true,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Skriv rätt form av <i>"+esc(inf)+"</i>.",
    loesungen:loesungen,
    erklaerung:regel(inf,extra)+" &ndash; "+esc(hel(satz,loesungen[0]))
  });
});

D_TRE.forEach(inf=>{
  const loesungen = [];
  alla(V[inf][1]).forEach(p=>alla(V[inf][2]).forEach(s=>loesungen.push(p+", "+s, p+","+s, p+" "+s)));
  neueKarte({
    deck:DECK, typ:"tippen", schwer:true,
    rohfrage:inf+"|pret och sup",
    frage:"<b>"+esc(inf)+"</b> &ndash; preteritum och supinum",
    anweisung:"Skriv preteritum och supinum, till exempel: <i>arbetade, arbetat</i>.",
    loesungen:loesungen,
    erklaerung:regel(inf)+" &ndash; "+esc(loesungen[0])
  });
});

D_IMP.forEach(([satz,inf,imp,falsch,r])=>{
  neueKarte({
    deck:DECK, typ:"wahl",
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Imperativ av <i>"+esc(inf)+"</i>?",
    optionen:[imp].concat(falsch), richtig:imp,
    erklaerung:IMP[r]+" &ndash; "+esc(satz.replace("%",imp))
  });
});

D_IMP_TIPPEN.forEach(([satz,inf,imp,r])=>{
  neueKarte({
    deck:DECK, typ:"tippen", schwer:true,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Skriv imperativ av <i>"+esc(inf)+"</i>.",
    loesungen:[imp],
    erklaerung:IMP[r]+" &ndash; "+esc(satz.replace("%",imp))
  });
});

})();
