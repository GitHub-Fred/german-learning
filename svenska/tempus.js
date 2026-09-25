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
