(()=>{"use strict";

const DECK = "verb";

const GRUPP = {
  "1":  "Grupp 1: presens på <b>-ar</b>, preteritum på <b>-ade</b>, supinum på <b>-at</b>.",
  "2a": "Grupp 2a: presens på <b>-er</b>, preteritum på <b>-de</b>, supinum på <b>-t</b>.",
  "2b": "Grupp 2b: stammen slutar på k, p, s, t eller x. Därför preteritum på <b>-te</b> och supinum på <b>-t</b>.",
  "3":  "Grupp 3: många korta verb på betonad vokal, till exempel bo och tro (men gå, se, ge, ta och få hör till grupp 4). Presens på <b>-r</b>, preteritum på <b>-dde</b>, supinum på <b>-tt</b>.",
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

REGELSEITEN.verb=`
<h2>Verbets former</h2>
<p>Ett <b>verb</b> är ett ord för något man gör eller något som händer: <i>arbeta, skriva, bo</i>. Svenska verb har fem viktiga former:</p>
<div class="tabelle"><table>
<thead><tr><th>Form</th><th>Användning</th><th>Exempel</th></tr></thead>
<tbody>
<tr><td><b>Infinitiv</b></td><td>grundformen, efter hjälpverb och <i>att</i></td><td>Jag vill <b>arbeta</b>.</td></tr>
<tr><td><b>Presens</b></td><td>nu, vanor, framtid</td><td>Jag <b>arbetar</b>.</td></tr>
<tr><td><b>Preteritum</b></td><td>förfluten tid</td><td>Jag <b>arbetade</b> igår.</td></tr>
<tr><td><b>Supinum</b></td><td>efter <i>har</i> och <i>hade</i></td><td>Jag har <b>arbetat</b>.</td></tr>
<tr><td><b>Imperativ</b></td><td>uppmaning, order</td><td><b>Arbeta</b> nu!</td></tr>
</tbody></table></div>
<p>En stor lättnad jämfört med tyskan: verbet har <b>samma form för alla personer</b>. <i>Jag arbetar, du arbetar, hon arbetar, vi arbetar, de arbetar.</i> Det finns inga ändelser som <i>-e, -st, -t, -en</i>.</p>

<h2>De fyra verbgrupperna</h2>
<p>Verben delas in i fyra grupper efter hur de bildar presens, preteritum och supinum.</p>
<div class="tabelle"><table>
<thead><tr><th>Grupp</th><th>Infinitiv</th><th>Presens</th><th>Preteritum</th><th>Supinum</th></tr></thead>
<tbody>
<tr><td>1</td><td>arbeta</td><td>arbeta<b>r</b></td><td>arbeta<b>de</b></td><td>arbeta<b>t</b></td></tr>
<tr><td>2a</td><td>stänga</td><td>stäng<b>er</b></td><td>stäng<b>de</b></td><td>stäng<b>t</b></td></tr>
<tr><td>2b</td><td>köpa</td><td>köp<b>er</b></td><td>köp<b>te</b></td><td>köp<b>t</b></td></tr>
<tr><td>3</td><td>bo</td><td>bo<b>r</b></td><td>bo<b>dde</b></td><td>bo<b>tt</b></td></tr>
<tr><td>4</td><td>skriva</td><td>skriv<b>er</b></td><td>skrev</td><td>skriv<b>it</b></td></tr>
</tbody></table></div>
<p>Grupp 1-3 är <b>svaga verb</b>: de följer en regel. Grupp 4 är <b>starka och oregelbundna verb</b>: de måste man lära sig utantill.</p>
<div class="merke"><p>Infinitiven visar inte alltid gruppen: <i>prata</i> (grupp 1) och <i>ringa</i> (grupp 2) ser likadana ut. Lär dig därför <b>presens</b> också: <i>pratar</i> visar grupp 1, <i>ringer</i> visar grupp 2.</p></div>

<h3>Grupp 1: -ar, -ade, -at</h3>
<p>Den största gruppen. Presens slutar på <b>-ar</b>. Nya ord och lånord hamnar nästan alltid här: <i>mejla, googla, fika</i>.</p>
<p class="beispiel">arbeta, arbetar, arbetade, arbetat<br>prata, pratar, pratade, pratat<br>öppna, öppnar, öppnade, öppnat</p>

<h3>Grupp 2: -er, -de/-te, -t</h3>
<p>Presens slutar på <b>-er</b>. I preteritum finns två varianter, som beror på det sista ljudet i <b>stammen</b> (verbet utan <i>-a</i>):</p>
<ul>
<li><b>2a</b>: stammen slutar på ett tonande ljud (till exempel g, l, m, n, r, v). Preteritum <b>-de</b>: stänga, stängde; ringa, ringde; höra, hörde.</li>
<li><b>2b</b>: stammen slutar på <b>k, p, s, t</b> eller <b>x</b>. Preteritum <b>-te</b>: köpa, köpte; läsa, läste; leka, lekte; tänka, tänkte; åka, åkte.</li>
</ul>
<p>Supinum slutar alltid på <b>-t</b>: stängt, ringt, köpt, läst.</p>
<p>Specialfall:</p>
<ul>
<li>Slutar stammen på <b>r</b>, får presens ingen extra ändelse: höra, <b>hör</b>; köra, <b>kör</b>.</li>
<li>Dubbelt <b>m</b> blir enkelt före en annan konsonant: glömma, glömmer, <b>glömde</b>, <b>glömt</b>.</li>
<li>Stammar på <b>-nd</b> tappar ett <i>d</i>: använda, använde, använt.</li>
</ul>

<h3>Grupp 3: -r, -dde, -tt</h3>
<p>Många korta verb som slutar på en betonad vokal (inte <i>-a</i>): bo, tro, sy, må. Men inte alla: gå, få, se, ge, ta, stå och bli är starka och hör till grupp 4.</p>
<p class="beispiel">bo, bor, bodde, bott<br>tro, tror, trodde, trott<br>sy, syr, sydde, sytt</p>

<h3>Grupp 4: starka och oregelbundna verb</h3>
<p><b>Starka verb</b> byter vokal i preteritum, och supinum slutar ofta på <b>-it</b>. Det känner du igen från tyskan: <i>trinken, trank, getrunken</i> - <b>dricka, drack, druckit</b>. Många svenska starka verb har samma vokalbyte som de tyska.</p>
<div class="tabelle"><table>
<thead><tr><th>Infinitiv</th><th>Presens</th><th>Preteritum</th><th>Supinum</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>skriva</td><td>skriver</td><td>skrev</td><td>skrivit</td><td><i>schrieb, geschrieben</i></td></tr>
<tr><td>bli</td><td>blir</td><td>blev</td><td>blivit</td><td><i>blieb, geblieben</i></td></tr>
<tr><td>dricka</td><td>dricker</td><td>drack</td><td>druckit</td><td><i>trank, getrunken</i></td></tr>
<tr><td>springa</td><td>springer</td><td>sprang</td><td>sprungit</td><td><i>sprang, gesprungen</i></td></tr>
<tr><td>vinna</td><td>vinner</td><td>vann</td><td>vunnit</td><td><i>gewann, gewonnen</i></td></tr>
<tr><td>finnas</td><td>finns</td><td>fanns</td><td>funnits</td><td>-</td></tr>
<tr><td>sitta</td><td>sitter</td><td>satt</td><td>suttit</td><td><i>saß, gesessen</i></td></tr>
<tr><td>flyga</td><td>flyger</td><td>flög</td><td>flugit</td><td><i>flog, geflogen</i></td></tr>
<tr><td>ta</td><td>tar</td><td>tog</td><td>tagit</td><td>-</td></tr>
<tr><td>äta</td><td>äter</td><td>åt</td><td>ätit</td><td><i>aß, gegessen</i></td></tr>
<tr><td>ge</td><td>ger</td><td>gav</td><td>gett / givit</td><td><i>gab, gegeben</i></td></tr>
<tr><td>se</td><td>ser</td><td>såg</td><td>sett</td><td><i>sah, gesehen</i></td></tr>
<tr><td>komma</td><td>kommer</td><td>kom</td><td>kommit</td><td><i>kam, gekommen</i></td></tr>
<tr><td>sova</td><td>sover</td><td>sov</td><td>sovit</td><td>-</td></tr>
<tr><td>ligga</td><td>ligger</td><td>låg</td><td>legat</td><td><i>lag, gelegen</i></td></tr>
<tr><td>gråta</td><td>gråter</td><td>grät</td><td>gråtit</td><td>-</td></tr>
<tr><td>stå</td><td>står</td><td>stod</td><td>stått</td><td><i>stand, gestanden</i></td></tr>
<tr><td>förstå</td><td>förstår</td><td>förstod</td><td>förstått</td><td><i>verstand, verstanden</i></td></tr>
</tbody></table></div>
<p>Några mycket vanliga verb är helt <b>oregelbundna</b>:</p>
<div class="tabelle"><table>
<thead><tr><th>Infinitiv</th><th>Presens</th><th>Preteritum</th><th>Supinum</th></tr></thead>
<tbody>
<tr><td>vara</td><td>är</td><td>var</td><td>varit</td></tr>
<tr><td>ha</td><td>har</td><td>hade</td><td>haft</td></tr>
<tr><td>göra</td><td>gör</td><td>gjorde</td><td>gjort</td></tr>
<tr><td>gå</td><td>går</td><td>gick</td><td>gått</td></tr>
<tr><td>få</td><td>får</td><td>fick</td><td>fått</td></tr>
<tr><td>veta</td><td>vet</td><td>visste</td><td>vetat</td></tr>
<tr><td>säga</td><td>säger</td><td>sa / sade</td><td>sagt</td></tr>
<tr><td>lägga</td><td>lägger</td><td>la / lade</td><td>lagt</td></tr>
<tr><td>sälja</td><td>säljer</td><td>sålde</td><td>sålt</td></tr>
<tr><td>välja</td><td>väljer</td><td>valde</td><td>valt</td></tr>
</tbody></table></div>
<p><i>sa</i> och <i>la</i> är vanligast i tal, <i>sade</i> och <i>lade</i> är lite mer formella. Båda är rätt.</p>

<h2>Supinum och particip</h2>
<p>Tyskan har en form, <i>Partizip II</i>, för två saker: <i>ich habe geschrieben</i> och <i>ein geschriebener Brief</i>. Svenskan har två olika former:</p>
<ul>
<li><b>Supinum</b> efter <i>har</i> och <i>hade</i>: Jag har <b>skrivit</b> ett brev. Vi har <b>sett</b> filmen.</li>
<li><b>Particip</b> som adjektiv: ett <b>skrivet</b> brev, filmen är <b>sedd</b>.</li>
</ul>
<p>Efter <i>har</i> står alltid supinum: <i>har sett</i>, inte <i>har sedd</i>.</p>

<h2>Imperativ</h2>
<p><b>Imperativ</b> är formen för uppmaningar och order: <i>Kom hit! Stäng dörren!</i> Den är samma för en eller flera personer (tyskans <i>komm, kommt, kommen Sie</i> blir alltid <b>kom</b>).</p>
<ul>
<li>Normalt: infinitiv utan <b>-a</b>. skriva, <b>skriv</b>; köpa, <b>köp</b>; läsa, <b>läs</b>; äta, <b>ät</b>; säga, <b>säg</b>; göra, <b>gör</b>; använda, <b>använd</b>.</li>
<li><b>vara</b> blir <b>var</b>: <i>Var tyst! Var försiktig!</i></li>
<li>Grupp 1 behåller <b>-a</b>: öppna, <b>öppna</b>; vänta, <b>vänta</b>; prata, <b>prata</b>.</li>
<li>Korta verb ändras inte: <b>gå, tro, ge, ta, ha, se</b>.</li>
<li>Verb på <b>-mma</b> får bara ett <i>m</i>: komma, <b>kom</b>; glömma, <b>glöm</b>.</li>
</ul>
<p>Imperativ är normalt inte samma som presens: <i>Stänger dörren!</i> är fel. Undantag är verb vars stam slutar på <b>r</b>: där är formerna lika (hör, kör, gör).</p>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>Personändelser:</b> svenskan har inga. <i>du arbetar, hon arbetar, vi arbetar</i>.</li>
<li><b>Fel grupp:</b> <i>köpade, ringade</i>. Rätt: <b>köpte, ringde</b>. Lär dig presens, då vet du gruppen.</li>
<li><b>Svag form av starka verb:</b> <i>skrivde, drickade</i>. Rätt: <b>skrev, drack</b>.</li>
<li><b>Preteritum efter har:</b> <i>Jag har bodde</i>. Rätt: <b>Jag har bott</b>.</li>
<li><b>Fel supinum:</b> <i>läsit, köpat</i>. Grupp 2 har alltid <b>-t</b>: läst, köpt.</li>
<li><b>Imperativ med -a:</b> <i>Skriva!</i> Rätt: <b>Skriv!</b> Men grupp 1: <b>Vänta!</b></li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>Fem former: infinitiv, presens, preteritum, supinum, imperativ. Inga personändelser.</li>
<li>Grupp 1: -ar, -ade, -at. Grupp 2a: -er, -de, -t. Grupp 2b (k, p, s, t, x): -er, -te, -t. Grupp 3: -r, -dde, -tt.</li>
<li>Grupp 4: vokalbyte och oregelbundna former. Lär dig dem utantill.</li>
<li>Supinum efter har/hade. Particip som adjektiv.</li>
<li>Imperativ: infinitiv utan -a (skriv), men grupp 1 och korta verb oförändrade (vänta, gå).</li>
</ul>
`;
