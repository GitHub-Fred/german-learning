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

REGELSEITEN.ligga=`
<h2>Tre verbpar</h2>
<p>Svenskan har tre verbpar för hur något befinner sig på en plats. I varje par säger det ena verbet var något <b>är</b>, och det andra säger att någon <b>flyttar</b> något dit.</p>
<div class="tabelle"><table>
<thead><tr><th>Något är på en plats</th><th>Någon flyttar något dit</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td><b>ligga</b>: Boken ligger på bordet.</td><td><b>lägga</b>: Jag lägger boken på bordet.</td><td><i>liegen / legen</i></td></tr>
<tr><td><b>sitta</b>: Fågeln sitter på taket.</td><td><b>sätta</b>: Hon sätter nyckeln i låset.</td><td><i>sitzen / setzen</i></td></tr>
<tr><td><b>stå</b>: Flaskan står på bordet.</td><td><b>ställa</b>: Jag ställer flaskan i kylskåpet.</td><td><i>stehen / stellen</i></td></tr>
</tbody></table></div>
<p>Goda nyheter: det fungerar nästan exakt som på tyska. Om du skulle säga <i>legen, setzen, stellen</i> på tyska, välj <b>lägga, sätta, ställa</b>. Om du skulle säga <i>liegen, sitzen, stehen</i>, välj <b>ligga, sitta, stå</b>.</p>
<h3>Objekt eller inte?</h3>
<p>Ett säkert test är <b>objektet</b>, alltså den sak som någon flyttar:</p>
<ul>
<li><b>ligga, sitta, stå</b> har <b>inget objekt</b>. Subjektet är redan på platsen: <i>Katten ligger i solen.</i></li>
<li><b>lägga, sätta, ställa</b> har <b>ett objekt</b>. Någon flyttar något: <i>Jag lägger <b>boken</b> på bordet.</i></li>
</ul>
<div class="merke"><p>Kan du fråga <b>vad?</b> efter verbet (<i>Jag lägger - vad? - boken</i>)? Då är det <b>lägga, sätta, ställa</b>. Annars <b>ligga, sitta, stå</b>.</p></div>

<h2>Formerna</h2>
<p>Verben i varje par ser lika ut, men böjs olika. Det är här de flesta fel uppstår.</p>
<div class="tabelle"><table>
<thead><tr><th>Infinitiv</th><th>Presens</th><th>Preteritum</th><th>Supinum</th><th>Imperativ</th></tr></thead>
<tbody>
<tr><td>ligga</td><td>ligger</td><td>låg</td><td>legat</td><td>ligg</td></tr>
<tr><td>lägga</td><td>lägger</td><td>la / lade</td><td>lagt</td><td>lägg</td></tr>
<tr><td>sitta</td><td>sitter</td><td>satt</td><td>suttit</td><td>sitt</td></tr>
<tr><td>sätta</td><td>sätter</td><td>satte</td><td>satt</td><td>sätt</td></tr>
<tr><td>stå</td><td>står</td><td>stod</td><td>stått</td><td>stå</td></tr>
<tr><td>ställa</td><td>ställer</td><td>ställde</td><td>ställt</td><td>ställ</td></tr>
</tbody></table></div>
<h3>Fällor</h3>
<ul>
<li><b>la</b> är preteritum av <i>lägga</i>, <b>låg</b> är preteritum av <i>ligga</i>: <i>Hon la telefonen i väskan. Igår låg jag i sängen hela dagen.</i></li>
<li><b>lagt</b> hör till <i>lägga</i>, <b>legat</b> hör till <i>ligga</i>: <i>Vem har lagt mina papper här? Boken har legat här i flera veckor.</i></li>
<li><b>satt</b> finns två gånger: som preteritum av <i>sitta</i> (<i>Igår satt vi på en restaurang</i>) och som supinum av <i>sätta</i> (<i>Han har satt sig i soffan</i>). Efter <i>har</i> är <i>satt</i> alltid <i>sätta</i>. Supinum av <i>sitta</i> är <b>suttit</b>: <i>Vi har suttit här i två timmar.</i></li>
<li><b>satte</b> är preteritum av <i>sätta</i>: <i>Han satte på sig mössan.</i></li>
</ul>

<h2>Lägga sig, sätta sig, ställa sig</h2>
<p>Med <b>sig</b> (eller mig, dig, oss ...) beskriver verben en rörelse som man gör med sin egen kropp. Precis som tyskans <i>sich legen, sich setzen, sich stellen</i>.</p>
<ul>
<li><b>lägga sig</b>: gå från att stå eller sitta till att ligga. Det betyder också att gå och lägga sig på kvällen: <i>Barnen lägger sig klockan åtta.</i></li>
<li><b>sätta sig</b>: gå från att stå till att sitta: <i>Han sätter sig vid bordet. Sätt dig här!</i></li>
<li><b>ställa sig</b>: gå till en plats och börja stå där: <i>Han ställer sig i kön.</i></li>
</ul>
<p>Efteråt <b>ligger</b>, <b>sitter</b> eller <b>står</b> man:</p>
<p class="beispiel">Jag lägger mig i sängen. Nu ligger jag i sängen.<br>Hon satte sig bredvid mig. Hon satt bredvid mig hela resan.</p>
<p>Imperativ: <i>Lägg dig!</i> (gå och lägg dig) men <i>Ligg still!</i> (rör dig inte). <i>Sätt dig!</i> men <i>Stå still!</i></p>

<h2>Fler betydelser</h2>
<p>Svenskan använder <i>ligga, sitta, stå</i> för att säga var något finns, ofta där tyskan också gör det:</p>
<ul>
<li>Städer, länder och hus <b>ligger</b>: <i>Göteborg ligger på västkusten.</i> (<i>liegt</i>)</li>
<li>Det som är skrivet <b>står</b> i en text: <i>Det står i tidningen att det blir regn.</i> (<i>steht in der Zeitung</i>)</li>
<li>Bilar och möbler <b>står</b>: <i>Bilen står utanför huset.</i></li>
<li>Saker som sitter fast <b>sitter</b>: <i>Nyckeln sitter i låset.</i> Här säger tyskan <i>steckt</i>.</li>
<li>Kläder <b>sitter</b>: <i>Jackan sitter bra.</i> (<i>passt gut</i>). Och man <b>sätter på sig</b> en mössa (<i>setzt auf</i>).</li>
<li>Man <b>sitter</b> i fängelse: <i>Han satt i fängelse i fem år.</i></li>
<li>Man <b>ligger</b> på sjukhus: <i>Hon låg på sjukhus i tre dagar.</i></li>
</ul>

<h2>Ligga och sova, sitta och läsa</h2>
<p>Svenskan säger gärna <b>ligga/sitta/stå och</b> + verb för att visa vad någon håller på med just då. Båda verben står i samma tempus. Tyskan säger ofta bara <i>gerade</i>.</p>
<p class="beispiel">Katten ligger och sover.<br>Han satt och väntade på oss i en timme.<br>Vi stod i regnet och väntade på bussen.</p>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>la och låg:</b> <i>Igår la jag i sängen.</i> Rätt: <b>Igår låg jag i sängen.</b></li>
<li><b>satt efter har:</b> <i>Vi har satt här i två timmar.</i> Rätt: <b>Vi har suttit här.</b></li>
<li><b>Fel verb för nycklar:</b> tyskan säger <i>steckt</i>, och det verbet finns inte på svenska. Det heter <b>Nyckeln sitter i låset.</b></li>
<li><b>Glömt sig:</b> <i>Jag ska lägga nu.</i> Rätt: <b>Jag ska lägga mig nu.</b></li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>ligga, sitta, stå: något är på en plats, inget objekt (<i>liegen, sitzen, stehen</i>).</li>
<li>lägga, sätta, ställa: någon flyttar något, med objekt (<i>legen, setzen, stellen</i>).</li>
<li>låg/legat (ligga), la/lagt (lägga), satt/suttit (sitta), satte/satt (sätta), stod/stått, ställde/ställt.</li>
<li>lägga sig, sätta sig, ställa sig: rörelsen. Efteråt ligger, sitter, står man.</li>
<li>Det står i tidningen. Nyckeln sitter i låset. Staden ligger vid havet.</li>
</ul>
`;
