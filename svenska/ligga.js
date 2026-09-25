(()=>{"use strict";
const DECK="ligga";

const REGLER={
ligga:"<b>ligga</b> (ligger, låg, legat): något eller någon är redan på en plats. Verbet har inget objekt.",
lagga:"<b>lägga</b> (lägger, la/lade, lagt): man flyttar något till en plats. Verbet har ett objekt.",
laggasig:"<b>lägga sig</b>: man går från att stå eller sitta till att ligga. Efteråt <b>ligger</b> man.",
sitta:"<b>sitta</b> (sitter, satt, suttit): någon eller något är redan på en plats. Verbet har inget objekt.",
satta:"<b>sätta</b> (sätter, satte, satt): man flyttar något till en plats. Verbet har ett objekt.",
sattasig:"<b>sätta sig</b>: man går från att stå eller ligga till att sitta. Efteråt <b>sitter</b> man.",
sta:"<b>stå</b> (står, stod, stått): någon eller något är redan på en plats, upprätt. Verbet har inget objekt.",
stalla:"<b>ställa</b> (ställer, ställde, ställt): man flyttar något till en plats, så att det står. Verbet har ett objekt.",
stallasig:"<b>ställa sig</b>: man går till en plats och börjar stå där, till exempel i en kö. Efteråt <b>står</b> man.",
satt:"<b>satt</b> är både preteritum av <i>sitta</i> och supinum av <i>sätta</i>. Med <i>sig</i> och <i>har</i> är det <i>sätta</i>.",
suttit:"Supinum av <i>sitta</i> är <b>suttit</b>. Efter <i>har</i> hör <i>satt</i> till <i>sätta</i>, och då behövs ett objekt.",
legat:"Supinum av <i>ligga</i> är <b>legat</b>, supinum av <i>lägga</i> är <b>lagt</b>.",
plats:"Städer, länder och hus <b>ligger</b> någonstans.",
text:"Det som är skrivet <b>står</b> i en text: Det står i tidningen.",
fast:"Saker som sitter fast någonstans, till exempel en nyckel i ett lås, <b>sitter</b>.",
fangelse:"Man säger att någon <b>sitter</b> i fängelse.",
ochverb:"<b>ligga/sitta/stå och</b> + verb visar vad någon håller på med."
};

const PAR={
l:"Vilken form passar: <i>ligga</i> eller <i>lägga</i>?",
s:"Vilken form passar: <i>sitta</i> eller <i>sätta</i>?",
t:"Vilken form passar: <i>stå</i> eller <i>ställa</i>?",
x:"Vilket verb passar?"
};
const PAR_TIPPEN={
l:"Skriv rätt form av <i>ligga</i> eller <i>lägga</i>.",
s:"Skriv rätt form av <i>sitta</i> eller <i>sätta</i>.",
t:"Skriv rätt form av <i>stå</i> eller <i>ställa</i>."
};

/* [par, mening, rätt, fel, regel, extra] */
const D_WAHL=[
["l","Boken % på bordet.","ligger",["lägger"],"ligga"],
["l","Jag % boken på bordet.","lägger",["ligger"],"lagga"],
["l","Var % mina nycklar? Jag hittar dem inte.","ligger",["lägger"],"ligga"],
["l","Kan du % tidningen på bordet?","lägga",["ligga"],"lagga"],
["l","Katten % i solen och sover.","ligger",["lägger"],"ligga"],
["l","Barnen % sig klockan åtta varje kväll.","lägger",["ligger"],"laggasig"],
["l","Igår % jag i sängen hela dagen.","låg",["la","ligger"],"ligga","Preteritum av ligga är låg. La är preteritum av lägga."],
["l","Hon % telefonen i väskan och gick.","lade",["låg"],"lagga","Man kan också säga la."],
["l","Jag är trött. Jag ska % mig nu.","lägga",["ligga"],"laggasig"],
["l","% dig på soffan och vila lite!","Lägg",["Ligg"],"laggasig"],
["l","% still! Doktorn ska undersöka dig.","Ligg",["Lägg"],"ligga"],
["x","Göteborg % på västkusten.","ligger",["lägger","står"],"plats"],
["s","Vi % i soffan och tittar på tv.","sitter",["sätter"],"sitta"],
["s","% dig här, det finns plats!","Sätt",["Sitt"],"sattasig"],
["s","Han % sig vid bordet.","sätter",["sitter"],"sattasig"],
["s","Fågeln % på taket.","sitter",["sätter"],"sitta"],
["s","Hon % nyckeln i låset.","sätter",["sitter"],"satta"],
["s","Igår % vi på en restaurang i tre timmar.","satt",["satte","sitter"],"sitta"],
["s","Han % på sig mössan och gick ut.","satte",["satt"],"satta"],
["s","Hon % vid datorn hela kvällen igår.","satt",["satte"],"sitta"],
["t","Flaskan % på bordet.","står",["ställer"],"sta"],
["t","Kan du % flaskan i kylskåpet?","ställa",["stå"],"stalla"],
["t","Vi % i kön i en halvtimme igår.","stod",["ställde","står"],"sta"],
["t","Han % sig i kön.","ställer",["står"],"stallasig"],
["t","Bilen % utanför huset.","står",["ställer"],"sta"],
["t","Jag % bilen på parkeringen.","ställer",["står"],"stalla"],
["t","% still, jag ska ta ett foto!","Stå",["Ställ"],"sta"],
["t","Hon % väskan på golvet och tar av sig jackan.","ställer",["står"],"stalla"]
];

const D_WAHL_SCHWER=[
["x","Det % i tidningen att det blir regn imorgon.","står",["ligger","sitter"],"text"],
["x","Nyckeln % i låset.","sitter",["ligger","sätter"],"fast"],
["x","Han % i fängelse i fem år.","satt",["låg","stod"],"fangelse"],
["s","Han har % sig i soffan.","satt",["suttit"],"satt"],
["s","Vi har % här i två timmar nu.","suttit",["satt"],"suttit"],
["l","Hon är trött och har redan % sig.","lagt",["legat"],"legat"],
["l","Boken har % här i flera veckor.","legat",["lagt"],"legat"]
];

/* [par, mening, lösningar, regel] */
const D_TIPPEN=[
["l","Igår kväll % jag mig redan klockan nio.",["lade","la"],"laggasig"],
["l","Plånboken har % i bilen hela veckan.",["legat"],"ligga"],
["l","Vem har % mina papper här?",["lagt"],"lagga"],
["l","När jag kom hem % katten på min säng.",["låg"],"ligga"],
["l","Imorgon ska jag % mig tidigt.",["lägga"],"laggasig"],
["l","Förra veckan % hon på sjukhus i tre dagar.",["låg"],"ligga"],
["l","Jag % alltid nycklarna i den här skålen när jag kommer hem.",["lägger"],"lagga"],
["s","Hon % sig bredvid mig på bussen igår.",["satte"],"sattasig"],
["s","Vi har % i bilen i fem timmar.",["suttit"],"sitta"],
["s","Har du % på dig mössan?",["satt"],"satt"],
["s","Han % och väntade på oss i en timme igår.",["satt"],"ochverb"],
["s","Barnen ska % sig vid bordet nu.",["sätta"],"sattasig"],
["s","Igår % jag nya batterier i klockan.",["satte"],"satta"],
["s","Fåglarna % på taket hela morgonen igår.",["satt"],"sitta"],
["t","Vi % i regnet och väntade på bussen igår.",["stod"],"ochverb"],
["t","Hur länge har du % här?",["stått"],"sta"],
["t","Jag har % bilen i garaget.",["ställt"],"stalla"],
["t","Han % sig i kön och väntade igår.",["ställde"],"stallasig"],
["t","Tåget % still i en timme igår.",["stod"],"sta"],
["t","Kan du % stolarna vid väggen?",["ställa"],"stalla"]
];

const fyll=(mening,ord)=>mening.replace("%",ord);

const wahl=schwer=>([par,mening,ratt,fel,regel,extra])=>{
  neueKarte({
    deck:DECK, typ:"wahl", schwer:schwer,
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:PAR[par],
    optionen:[ratt].concat(fel), richtig:ratt,
    erklaerung:REGLER[regel]+(extra?" "+esc(extra):"")+" &ndash; "+esc(fyll(mening,ratt))
  });
};
D_WAHL.forEach(wahl(false));
D_WAHL_SCHWER.forEach(wahl(true));

D_TIPPEN.forEach(([par,mening,losningar,regel])=>{
  neueKarte({
    deck:DECK, typ:"tippen", schwer:true,
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:PAR_TIPPEN[par],
    loesungen:losningar,
    erklaerung:REGLER[regel]+" &ndash; "+esc(fyll(mening,losningar[0]))
  });
});
})();
