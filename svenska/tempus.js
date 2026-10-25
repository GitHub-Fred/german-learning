(()=>{"use strict";

const DECK = "tempus";

const REGLER = {
  pret:   "Preteritum används när något hände vid en bestämd tid i det förflutna: igår, förra året, när jag var liten.",
  falla:  "<i>Igår</i>, <i>förra året</i> och <i>i fredags</i> är avslutad tid. Då använder man <b>preteritum</b>, inte perfekt. På tyska går perfekt bra här, på svenska inte.",
  sedan:  "<i>För ... sedan</i> säger när något hände. Då använder man <b>preteritum</b>, inte perfekt.",
  perf:   "Perfekt (<b>har</b> + supinum) används när tiden inte är avslutad eller inte sägs: Jag har aldrig varit i Japan.",
  perfTid:"Något som började förr och fortfarande pågår: <b>perfekt</b>. Jag har bott här i tre år (och bor här nu).",
  perfSedan:"Något som började förr och fortfarande pågår: <b>perfekt</b>. Med <i>sedan</i> + tidpunkt går även presens: Vi är gifta sedan 2010.",
  perfNu: "Det som har hänt är viktigt nu. Då använder man <b>perfekt</b>: Har du ätit? Ja, jag har redan ätit.",
  plusk:  "Pluskvamperfekt (<b>hade</b> + supinum) används för något som hände före en annan händelse i det förflutna.",
  pres:   "Presens används för nu, för vanor och för sådant som alltid är sant.",
  presFut:"Med ett tidsord för framtiden (imorgon, om fem minuter) räcker presens.",
  ska:    "<b>Ska</b> + infinitiv (utan <i>att</i>) används för planer och beslut om framtiden.",
  kommer: "<b>Kommer att</b> + infinitiv används när man tror att något kommer att hända. I formell text ska <i>att</i> vara med.",
  omPres: "I en om-mening om framtiden står båda delarna oftast i presens: Om det regnar imorgon stannar vi hemma.",
  skulle: "<b>Skulle</b> + infinitiv används för något som inte är verkligt: Om jag hade tid skulle jag hjälpa dig.",
  skullePret:"<b>Skulle</b> + infinitiv används för något som inte är verkligt. Preteritum går också: Jag hjälpte dig gärna om jag hade tid.",
  artig:  "<b>Skulle</b> + infinitiv gör en önskan artigare: Jag skulle vilja ha ..."
};

const ZIEL = {
  pret:   ["Skriv meningen i <b>preteritum</b>.","Preteritum är en form av verbet, utan hjälpverb."],
  perf:   ["Skriv meningen i <b>perfekt</b>.","Perfekt: <b>har</b> + supinum."],
  plusk:  ["Skriv meningen i <b>pluskvamperfekt</b>.","Pluskvamperfekt: <b>hade</b> + supinum."],
  ska:    ["Skriv meningen i framtid med <b>ska</b>.","Framtid med <b>ska</b> + infinitiv, utan <i>att</i>."],
  kommer: ["Skriv meningen i framtid med <b>kommer att</b>.","Framtid med <b>kommer att</b> + infinitiv."],
  skulle: ["Skriv meningen med <b>skulle</b> + infinitiv.","<b>Skulle</b> + infinitiv: verbet står i infinitiv efter <i>skulle</i>."]
};

const INTE = "<i>Inte</i> står mellan <i>har</i> och supinum.";

/* Välj: [mening, rätt, [fel], regel] */
const D_WAHL = [
["Jag % i Rom förra året.","var",["har varit"],"falla"],
["Vi % en ny soffa i lördags.","köpte",["har köpt"],"falla"],
["Igår % jag en gammal vän på stan.","träffade",["har träffat"],"falla"],
["Hon % sin examen 2020.","tog",["har tagit"],"falla"],
["Förra veckan % jag sjuk i tre dagar.","var",["har varit"],"falla"],
["I fredags % vi på bio.","var",["har varit"],"falla"],
["Mozart % 1791.","dog",["har dött"],"pret"],
["Min mormor % när jag var tio år.","dog",["har dött"],"pret"],
["När jag var liten % jag rädd för hundar.","var",["har varit","är"],"pret"],
["Förra sommaren % vi till Italien.","åkte",["har åkt","åker"],"pret"],
["Har du ätit? – Ja, jag % för en timme sedan.","åt",["har ätit"],"sedan"],
["Jag % här i tre år nu.","har bott",["bodde"],"perfTid"],
["Vi % gifta sedan 2010 och har två barn.","har varit",["var"],"perfSedan"],
["Jag känner Eva väl. Vi % vänner sedan skolan.","har varit",["var"],"perfSedan"],
["Hur länge % du läst svenska nu?","har",["hade"],"perfTid"],
["Jag % i Japan, men jag vill gärna åka dit.","har aldrig varit",["var aldrig"],"perf"],
["Har ni ätit? – Ja, vi % redan ätit.","har",["hade"],"perfNu"],
["Är du hungrig? – Nej, jag % precis ätit.","har",["hade"],"perfNu"],
["Barnen sover. De % somnat.","har",["hade"],"perfNu"],
["När vi kom till stationen % tåget redan gått.","hade",["har"],"plusk"],
["Jag var hungrig, för jag % inte ätit på hela dagen.","hade",["har"],"plusk"],
["Innan hon kom % vi redan diskat.","hade",["har"],"plusk"],
["Han % redan gått när jag ringde.","hade",["har"],"plusk"],
["Vatten % vid 100 grader.","kokar",["kokade"],"pres"],
["Vad % du just nu?","gör",["gjorde"],"pres"],
["Nu för tiden % jag till jobbet.","cyklar",["cyklade"],"pres"],
["Min syster % i Stockholm nu.","bor",["bodde"],"pres"],
["Skynda dig, filmen % om fem minuter!","börjar",["började","har börjat"],"presFut"],
["Imorgon % jag till Uppsala.","åker",["åkte","har åkt"],"presFut"],
["Jag % dig imorgon.","ringer",["ringde","har ringt"],"presFut"],
["Nästa år % vi till Umeå.","ska flytta",["flyttade","har flyttat"],"ska"],
["Vi % till Norge i juli.","ska åka",["ska att åka","ska åker"],"ska"],
["Det % att bli kallt i helgen.","kommer",["ska"],"kommer"],
["Jag tror att hon % att vinna.","kommer",["ska"],"kommer"],
["Om det regnar imorgon % vi hemma.","stannar",["stannade"],"omPres"],
["Om jag hade mer pengar % jag resa mer.","skulle",["ska"],"skulle"],
["Om jag var du % jag ringa henne.","skulle",["ska"],"skulle"],
["Jag % gärna vilja ha en kopp te.","skulle",["ska"],"artig"]
];

/* Skriv om: [mening, mål, [lösningar], extra] */
const D_OM = [
["Jag äter frukost.","pret",["Jag åt frukost."]],
["Jag äter frukost.","perf",["Jag har ätit frukost."]],
["Hon skriver ett brev.","perf",["Hon har skrivit ett brev."]],
["Vi går hem.","pret",["Vi gick hem."]],
["Han säger nej.","pret",["Han sa nej.","Han sade nej."],"Både <i>sa</i> och <i>sade</i> är rätt."],
["Vi bor i Malmö.","pret",["Vi bodde i Malmö."]],
["Jag vet inte.","pret",["Jag visste inte."]],
["Jag lägger boken på bordet.","pret",["Jag la boken på bordet.","Jag lade boken på bordet."],"Både <i>la</i> och <i>lade</i> är rätt."],
["Hon tar bussen.","pret",["Hon tog bussen."]],
["Jag har ett problem.","pret",["Jag hade ett problem."]],
["Hon har köpt en ny jacka.","pret",["Hon köpte en ny jacka."]],
["Hon ger mig en bok.","perf",["Hon har gett mig en bok.","Hon har givit mig en bok."],"Både <i>gett</i> och <i>givit</i> är rätt."],
["Han kommer inte.","perf",["Han har inte kommit."],INTE],
["Jag åt inte.","perf",["Jag har inte ätit."],INTE],
["Jag gör läxorna.","perf",["Jag har gjort läxorna."]],
["Han är sjuk.","perf",["Han har varit sjuk."]],
["Tåget gick.","plusk",["Tåget hade gått."]],
["Hon sover.","plusk",["Hon hade sovit."]],
["Jag har ätit.","plusk",["Jag hade ätit."]],
["Jag åker till Göteborg.","ska",["Jag ska åka till Göteborg."]],
["Jag slutar röka.","ska",["Jag ska sluta röka."]],
["Det regnar.","kommer",["Det kommer att regna."]],
["Det blir kallt.","kommer",["Det kommer att bli kallt."]],
["Jag köper en bil.","skulle",["Jag skulle köpa en bil."]],
["Vi stannar hemma.","skulle",["Vi skulle stanna hemma."]]
];

/* Skriv i luckan: [mening, infinitiv, [lösningar], regel] */
const D_LUCKA = [
["Jag % här i fem år nu.","bo",["har bott"],"perfTid"],
["Vi % gifta i tjugo år nu.","vara",["har varit"],"perfTid"],
["Hon % svenska i två år nu.","läsa",["har läst"],"perfTid"],
["Jag % på det här företaget i tio år nu.","arbeta",["har arbetat"],"perfTid"],
["Förra året % vi i Paris.","vara",["var"],"falla"],
["Jag % i Oslo förra helgen.","vara",["var"],"falla"],
["Igår % jag en ny tröja.","köpa",["köpte"],"falla"],
["I lördags % vi en fest.","ha",["hade"],"falla"],
["För två veckor sedan % jag en gammal vän.","träffa",["träffade"],"sedan"],
["Har du ätit? – Ja, jag % för en halvtimme sedan.","äta",["åt"],"sedan"],
["Min farfar % 1998.","dö",["dog"],"pret"],
["När jag var liten % jag mycket på TV.","titta",["tittade"],"pret"],
["Nu för tiden % jag till jobbet.","cykla",["cyklar"],"pres"],
["Vatten % vid noll grader.","frysa",["fryser"],"pres"],
["Jag % dig om jag hade tid.","hjälpa",["skulle hjälpa","hjälpte"],"skullePret"],
["Jag % ett hus vid havet om jag hade mycket pengar.","köpa",["skulle köpa","köpte"],"skullePret"]
];

D_WAHL.forEach(([satz,richtig,falsch,r])=>{
  neueKarte({
    deck:DECK, typ:"wahl",
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Vilken form passar?",
    optionen:[richtig].concat(falsch), richtig:richtig,
    erklaerung:REGLER[r]+" &ndash; "+esc(satz.replace("%",richtig))
  });
});

D_OM.forEach(([satz,mal,loesungen,extra])=>{
  neueKarte({
    deck:DECK, typ:"tippen", schwer:true,
    rohfrage:satz+"|"+mal,
    frage:esc(satz),
    anweisung:ZIEL[mal][0],
    loesungen:loesungen,
    erklaerung:ZIEL[mal][1]+(extra?" "+extra:"")+" &ndash; "+esc(loesungen[0])
  });
});

D_LUCKA.forEach(([satz,inf,loesungen,r])=>{
  neueKarte({
    deck:DECK, typ:"tippen", schwer:true,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Skriv <i>"+esc(inf)+"</i> i rätt tempus.",
    loesungen:loesungen,
    erklaerung:REGLER[r]+" &ndash; "+esc(satz.replace("%",loesungen[0]))
  });
});

})();

REGELSEITEN.tempus=`
<h2>Tidsformer</h2>
<p><b>Tempus</b> betyder tidsform. Verbets form visar när något händer: nu, förr eller i framtiden. Svenskan har nästan samma tempus som tyskan, men använder dem delvis på ett annat sätt. Den största skillnaden gäller <b>preteritum</b> och <b>perfekt</b>.</p>
<div class="tabelle"><table>
<thead><tr><th>Tempus</th><th>Form</th><th>Exempel</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>Presens</td><td>presens</td><td>Jag äter.</td><td><i>Ich esse.</i></td></tr>
<tr><td>Preteritum</td><td>preteritum</td><td>Jag åt.</td><td><i>Ich aß.</i></td></tr>
<tr><td>Perfekt</td><td><b>har</b> + supinum</td><td>Jag har ätit.</td><td><i>Ich habe gegessen.</i></td></tr>
<tr><td>Pluskvamperfekt</td><td><b>hade</b> + supinum</td><td>Jag hade ätit.</td><td><i>Ich hatte gegessen.</i></td></tr>
<tr><td>Futurum</td><td><b>ska</b> / <b>kommer att</b> + infinitiv</td><td>Jag ska äta.</td><td><i>Ich werde essen.</i></td></tr>
<tr><td>Konditionalis</td><td><b>skulle</b> + infinitiv</td><td>Jag skulle äta.</td><td><i>Ich würde essen.</i></td></tr>
</tbody></table></div>
<p>Hur man bildar formerna står i högen <i>Verbformer</i>.</p>

<h2>Presens</h2>
<p>Presens används:</p>
<ul>
<li>för det som händer <b>nu</b>: <i>Vad gör du just nu?</i></li>
<li>för <b>vanor</b>: <i>Nu för tiden cyklar jag till jobbet.</i></li>
<li>för det som <b>alltid är sant</b>: <i>Vatten kokar vid 100 grader.</i></li>
<li>för <b>framtiden</b>, när ett tidsord visar att det gäller framtiden: <i>Imorgon åker jag till Uppsala. Filmen börjar om fem minuter.</i></li>
</ul>
<p>Det fungerar som på tyska.</p>

<h2>Preteritum eller perfekt?</h2>
<p>Här gör tyskar flest fel. I tyskt talspråk använder man nästan alltid perfekt för det som har hänt: <i>Gestern habe ich einen Freund getroffen.</i> På svenska är det fel. Svenskan väljer tempus efter <b>betydelsen</b>.</p>
<h3>Preteritum: avslutad tid</h3>
<p>Preteritum används när något hände vid en <b>bestämd tid</b> i det förflutna, en tid som är slut. Ofta finns ett tidsuttryck som <i>igår, i fredags, förra året, 2020, för två veckor sedan, när jag var liten</i>.</p>
<p class="beispiel">Igår träffade jag en gammal vän. (inte: har träffat)<br>Vi köpte en ny soffa i lördags.<br>Hon tog sin examen 2020.<br>Mozart dog 1791.<br>När jag var liten var jag rädd för hundar.</p>
<p>Även om tiden inte sägs, men det är tydligt att den är slut, används preteritum: <i>Har du ätit? - Ja, jag åt för en timme sedan.</i></p>
<h3>Perfekt: tiden är inte slut eller sägs inte</h3>
<p>Perfekt (<b>har</b> + supinum) används:</p>
<ul>
<li>när <b>tiden inte sägs</b>, ofta om erfarenheter: <i>Jag har aldrig varit i Japan. Har du någonsin sett norrsken?</i></li>
<li>när resultatet är <b>viktigt nu</b>: <i>Har ni ätit? - Ja, vi har redan ätit. Barnen sover, de har somnat.</i></li>
<li>när något <b>började förr och pågår fortfarande</b>: <i>Jag har bott här i tre år.</i> (och bor här nu)</li>
</ul>
<p>I det sista fallet använder tyskan presens med <i>seit</i>: <i>Ich wohne seit drei Jahren hier</i>. Svenskan använder perfekt med <b>i</b> + tidslängd eller <b>sedan</b> + tidpunkt:</p>
<p class="beispiel">Jag har bott här i fem år nu.<br>Vi har varit vänner sedan skolan.<br>Hur länge har du läst svenska?</p>
<p>Med <i>sedan</i> + tidpunkt går ibland även presens: <i>Vi är gifta sedan 2010.</i> Men perfekt är alltid rätt.</p>
<div class="merke"><p>Kan du svara på frågan <b>när?</b> med en tid som är slut (igår, 2020, för en vecka sedan)? Då är det <b>preteritum</b>. Annars oftast <b>perfekt</b>.</p></div>
<h3>Alltid har</h3>
<p>På tyska bildar många verb perfekt med <i>sein</i>: <i>Ich bin gegangen, er ist gekommen</i>. På svenska används <b>alltid har</b>:</p>
<p class="beispiel">Jag har gått. Han har kommit. Hon har varit sjuk. Det har blivit kallt.</p>
<p><i>inte</i> och andra satsadverb står mellan <i>har</i> och supinum: <i>Han har inte kommit. Jag har aldrig varit där.</i></p>
<p>I en bisats kan man låta bli att skriva <i>har</i> och <i>hade</i>: <i>Boken som jag (har) läst var bra.</i> Det är vanligt i skrift.</p>

<h2>Pluskvamperfekt</h2>
<p>Pluskvamperfekt (<b>hade</b> + supinum) används för något som hände <b>före</b> en annan händelse i det förflutna. Det fungerar som på tyska.</p>
<p class="beispiel">När vi kom till stationen hade tåget redan gått.<br>Jag var hungrig, för jag hade inte ätit på hela dagen.<br>Han hade redan gått när jag ringde.</p>

<h2>Framtid</h2>
<p>Svenskan har ingen egen form för framtid. Man kan uttrycka framtid på tre sätt:</p>
<div class="tabelle"><table>
<thead><tr><th>Form</th><th>När?</th><th>Exempel</th></tr></thead>
<tbody>
<tr><td><b>presens</b> + tidsord</td><td>när ett tidsord visar framtiden</td><td>Imorgon åker jag till Uppsala.</td></tr>
<tr><td><b>ska</b> + infinitiv</td><td>planer och beslut</td><td>Nästa år ska vi flytta till Umeå.</td></tr>
<tr><td><b>kommer att</b> + infinitiv</td><td>något man tror eller förutser, som man inte själv bestämmer</td><td>Det kommer att bli kallt i helgen.</td></tr>
</tbody></table></div>
<ul>
<li>Efter <b>ska</b> kommer infinitiv <b>utan</b> <i>att</i>: <i>Vi ska åka</i>, inte <i>ska att åka</i>.</li>
<li>Efter <b>kommer</b> ska <i>att</i> vara med i formell text. I talspråk hör man ofta <i>Det kommer bli kallt</i> utan <i>att</i>.</li>
<li><b>ska</b> är inte samma som tyskans <i>sollen</i>. Oftast betyder det en plan: <i>Jag ska sluta röka.</i> (<i>Ich werde aufhören zu rauchen.</i>)</li>
</ul>
<h3>Om-meningar om framtiden</h3>
<p>I en mening med <b>om</b> (<i>wenn, falls</i>) om framtiden står båda delarna oftast i presens:</p>
<p class="beispiel">Om det regnar imorgon stannar vi hemma.</p>

<h2>Skulle: det som inte är verkligt</h2>
<p><b>skulle</b> + infinitiv motsvarar tyskans <i>würde</i>. Det används för sådant som inte är verkligt, bara tänkt. I om-delen står verbet i <b>preteritum</b> (tyska <i>Konjunktiv II</i>):</p>
<p class="beispiel">Om jag hade mer pengar skulle jag resa mer. (<i>Wenn ich mehr Geld hätte, würde ich mehr reisen.</i>)<br>Om jag var du skulle jag ringa henne. (<i>Wenn ich du wäre ...</i>)</p>
<p>Ibland används preteritum i båda delarna: <i>Jag hjälpte dig gärna om jag hade tid.</i> Det är lite mer formellt.</p>
<p>Om det gäller det förflutna använder man <b>hade</b> + supinum: <i>Om jag hade vetat det, skulle jag ha kommit</i> (eller: <i>hade jag kommit</i>).</p>
<h3>Artig önskan</h3>
<p><b>Jag skulle vilja ...</b> är ett artigt sätt att be om något, som tyskans <i>Ich hätte gern ...</i> eller <i>Ich würde gern ...</i>: <i>Jag skulle gärna vilja ha en kopp te.</i></p>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>Perfekt med avslutad tid:</b> <i>Igår har jag köpt en tröja.</i> Rätt: <b>Igår köpte jag en tröja.</b></li>
<li><b>Presens med sedan:</b> <i>Jag bor här sedan fem år.</i> Rätt: <b>Jag har bott här i fem år.</b></li>
<li><b>är i stället för har:</b> <i>Han är kommit.</i> Rätt: <b>Han har kommit.</b></li>
<li><b>att efter ska:</b> <i>Jag ska att åka.</i> Rätt: <b>Jag ska åka.</b></li>
<li><b>skulle i om-delen:</b> <i>Om jag skulle ha pengar ...</i> Bättre: <b>Om jag hade pengar ...</b></li>
<li><b>Particip efter har:</b> <i>Jag har gjord.</i> Rätt: <b>Jag har gjort.</b></li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>Presens: nu, vanor, sanningar, framtid med tidsord.</li>
<li>Preteritum: bestämd, avslutad tid (igår, 2020, för ... sedan).</li>
<li>Perfekt (har + supinum): tiden sägs inte, resultatet gäller nu, eller något pågår fortfarande (i fem år, sedan 2019). Alltid <i>har</i>.</li>
<li>Pluskvamperfekt (hade + supinum): före en annan händelse i det förflutna.</li>
<li>Framtid: presens + tidsord, ska (plan), kommer att (förutsägelse).</li>
<li>skulle + infinitiv: tänkt, inte verkligt, och artiga önskningar.</li>
</ul>
`;
