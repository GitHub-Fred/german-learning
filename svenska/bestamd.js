(()=>{"use strict";

const REGLER = {
  enKons: "En-ord får <b>-en</b> i bestämd form singular: en bil, bilen.",
  enVokal: "En-ord som slutar på vokal får bara <b>-n</b>: en flicka, flickan; en pojke, pojken.",
  enEl: "En-ord på obetonat <b>-el</b> och <b>-er</b> får bara <b>-n</b>: en fågel, fågeln; en syster, systern.",
  ettKons: "Ett-ord får <b>-et</b> i bestämd form singular: ett hus, huset.",
  ettVokal: "Ett-ord som slutar på obetonad vokal får bara <b>-t</b>: ett äpple, äpplet.",
  betonad: "Ett-ord som slutar på betonad vokal får <b>-et</b>: ett kafé, kaféet.",
  dubbel: "Efter kort vokal skrivs <i>m</i> och <i>n</i> dubbelt när en ändelse kommer efter: en man, mannen; ett rum, rummet.",
  ettEr: "Ett-ord på obetonat <b>-er</b>, <b>-el</b> och <b>-en</b> tappar <i>e</i>: ett fönster, fönstret; ett exempel, exemplet; ett vatten, vattnet.",
  um: "Många lånord på <b>-eum</b> och <b>-ium</b> tappar <i>-um</i> i bestämd form: ett museum, museet; museer, museerna.",
  plR: "Plural som slutar på <b>-r</b> får <b>-na</b> i bestämd form: bilar, bilarna; flickor, flickorna; böcker, böckerna.",
  plN: "Plural som slutar på <b>-n</b> får <b>-a</b> i bestämd form: äpplen, äpplena.",
  plNoll: "Ett-ord utan ändelse i plural får <b>-en</b> i bestämd form: hus, husen; barn, barnen.",
  plNollDubbel: "Ett-ord utan ändelse i plural får <b>-en</b> i bestämd form. Efter kort vokal blir <i>m</i> dubbelt: rum, rummen.",
  plNollEr: "Ett-ord på <b>-er</b> utan ändelse i plural tappar <i>e</i> och får <b>-en</b>: fönster, fönstren.",
  plAre: "Personord på <b>-are</b> tappar <i>e</i> och får <b>-na</b> i bestämd form plural: lärare, lärarna.",
  plOgon: "<i>ögon</i> och <i>öron</i> får <b>-en</b>: ögonen, öronen.",
  plMan: "<i>män</i> får <b>-nen</b> i bestämd form: männen.",
  dubbelBest: "Med adjektiv behövs <b>dubbel bestämning</b>: <b>den/det/de</b> före, adjektivet på <b>-a</b> och substantivet i bestämd form: den nya bilen, det stora huset, de gamla böckerna.",
  liten: "<i>liten</i> blir <b>lilla</b> i bestämd form singular och <b>små</b> i plural: det lilla köket, de små barnen.",
  denhar: "Efter <b>den här</b>, <b>det här</b> och <b>de här</b> står substantivet i bestämd form: den här boken.",
  forra: "Efter <b>förra</b> står substantivet i bestämd form, utan den/det: förra veckan, förra året.",
  nasta: "Efter <b>nästa</b> står substantivet i obestämd form: nästa vecka, nästa år.",
  samma: "Efter <b>samma</b> står substantivet i obestämd form: samma dag, samma sak.",
  foljande: "Efter <b>följande</b> står substantivet i obestämd form: följande dag, följande frågor.",
  hela: "Efter <b>hela</b> och <b>halva</b> står substantivet i bestämd form, utan den/det: hela dagen, halva natten.",
  bada: "Efter <b>båda</b> står substantivet oftast i bestämd form: båda barnen.",
  forsta: "Efter <b>första</b> och <b>sista</b> står substantivet oftast i bestämd form, även utan den/det: första gången, sista dagen.",
  poss: "Efter ett ägarord (min, din, vår ...) står substantivet i obestämd form: min bil, vårt hus.",
  genitiv: "Efter ett genitiv-s står substantivet i obestämd form: Annas hus, Sveriges huvudstad.",
  vilken: "Efter <b>vilken</b>, <b>vilket</b> och <b>vilka</b> står substantivet i obestämd form: vilken buss?",
  possAdj: "Efter ett ägarord eller ett genitiv-s får adjektivet <b>-a</b>, men substantivet står i obestämd form: min nya bil, Annas gamla hus."
};

/* [obestämd form, bestämd form singular, fel, regel] */
const B_SINGULAR = [
["en bil","bilen",["bilet","bilan"],"enKons"],
["en flicka","flickan",["flickaen","flickat"],"enVokal"],
["en sko","skon",["skoen","skot"],"enVokal"],
["en pojke","pojken",["pojkeen","pojket"],"enVokal"],
["en lärare","läraren",["lärareen","läraret"],"enVokal"],
["en vecka","veckan",["veckaen","veckat"],"enVokal"],
["en bro","bron",["broen","brot"],"enVokal"],
["en fågel","fågeln",["fågelen","fågelet"],"enEl"],
["en syster","systern",["systeren","systeret"],"enEl"],
["en telefon","telefonen",["telefonet","telefonn"],"enKons"],
["en buss","bussen",["busset","bussan"],"enKons"],
["en man","mannen",["manet","mannet"],"dubbel"],
["en vän","vännen",["vänet","vännet"],"dubbel"],
["ett rum","rummet",["rumet","rummen"],"dubbel"],
["ett hus","huset",["husen","husan"],"ettKons"],
["ett bord","bordet",["borden","bordan"],"ettKons"],
["ett barn","barnet",["barnen","barnan"],"ettKons"],
["ett kök","köket",["köken","kökan"],"ettKons"],
["ett äpple","äpplet",["äppleet","äpplen"],"ettVokal"],
["ett frimärke","frimärket",["frimärkeet","frimärken"],"ettVokal"],
["ett hjärta","hjärtat",["hjärtaet","hjärtan"],"ettVokal"],
["ett öga","ögat",["ögaet","ögon"],"ettVokal"]
];

/* [singular, obestämd plural, bestämd plural, fel, regel] */
const B_PLURAL = [
["en bil","bilar","bilarna",["bilerna","bilen"],"plR"],
["en flicka","flickor","flickorna",["flickarna","flickan"],"plR"],
["en pojke","pojkar","pojkarna",["pojkorna","pojken"],"plR"],
["en telefon","telefoner","telefonerna",["telefonarna","telefonen"],"plR"],
["en sko","skor","skorna",["skoerna","skon"],"plR"],
["en dag","dagar","dagarna",["dagerna","dagen"],"plR"],
["en vecka","veckor","veckorna",["veckarna","veckan"],"plR"],
["en kvinna","kvinnor","kvinnorna",["kvinnarna","kvinnan"],"plR"],
["en bok","böcker","böckerna",["bokarna","boken"],"plR"],
["en stad","städer","städerna",["stadarna","staden"],"plR"],
["ett hus","hus","husen",["husena","huset"],"plNoll"],
["ett barn","barn","barnen",["barnena","barnet"],"plNoll"],
["ett bord","bord","borden",["bordena","bordet"],"plNoll"],
["ett rum","rum","rummen",["rumen","rummet"],"plNollDubbel"],
["ett äpple","äpplen","äpplena",["äpplenen","äpplet"],"plN"],
["ett frimärke","frimärken","frimärkena",["frimärkenen","frimärket"],"plN"],
["en lärare","lärare","lärarna",["lärarena","läraren"],"plAre"],
["ett öga","ögon","ögonen",["ögonena","ögat"],"plOgon"]
];

/* [fråga, singular eller plural, lösningar, regel, extra] */
const B_SVAR_FORM = [
["ett fönster","s",["fönstret"],"ettEr"],
["ett nummer","s",["numret"],"ettEr","Dessutom blir <i>mm</i> bara ett <i>m</i>: numret."],
["ett exempel","s",["exemplet"],"ettEr"],
["ett vatten","s",["vattnet"],"ettEr","Bara <i>e</i> försvinner, <i>tt</i> fanns redan: vatten, vattnet."],
["ett museum","s",["museet"],"um"],
["ett kafé","s",["kaféet","caféet"],"betonad"],
["en man, män","p",["männen"],"plMan"],
["ett fönster, fönster","p",["fönstren"],"plNollEr"],
["ett museum, museer","p",["museerna"],"um"],
["en fot, fötter","p",["fötterna"],"plR"]
];

/* [mening, ledtråd, lösningar, regel] */
const B_DUBBEL_SKRIV = [
["Vi har sålt %.","stor + hus",["det stora huset"],"dubbelBest"],
["Jag gillar %.","ny + bil",["den nya bilen"],"dubbelBest"],
["Var har du lagt %?","gammal + bok, plural",["de gamla böckerna"],"dubbelBest"],
["Kan du stänga %?","öppen + fönster",["det öppna fönstret"],"dubbelBest"],
["Vi åt i %.","liten + kök",["det lilla köket"],"liten"],
["% är för små.","ny + sko, plural",["De nya skorna"],"dubbelBest"],
["Hon bor i %.","gul + hus",["det gula huset"],"dubbelBest"],
["% sover redan.","liten + barn, plural",["De små barnen"],"liten"],
["Jag tar %.","röd + tröja",["den röda tröjan"],"dubbelBest"]
];

/* [mening, rätt, fel, regel] */
const B_DUBBEL_VAL = [
["Jag har läst %.","den nya boken",["den nya bok","den ny boken"],"dubbelBest"],
["Vi bodde i %.","det gamla huset",["det gamla hus","den gamla huset"],"dubbelBest"],
["% är sura.","De gröna äpplena",["De gröna äpplen","Den gröna äpplena"],"dubbelBest"],
["Jag gillar %.","den här boken",["den här bok","det här boken"],"denhar"]
];

/* [mening, rätt, fel, regel, schwer] */
const B_UNDANTAG = [
["Vi var i Göteborg förra %.","veckan","vecka","forra",1],
["Vi flyttade hit förra %.","året","år","forra",1],
["Vi ses nästa %.","vecka","veckan","nasta",1],
["Jag börjar på ett nytt jobb nästa %.","månad","månaden","nasta",1],
["Vi är födda samma %.","år","året","samma",1],
["Hon har samma % som jag.","tröja","tröjan","samma",1],
["Svara på följande %.","frågor","frågorna","foljande",1],
["Jag har jobbat hela %.","dagen","dag","hela",0],
["Barnet grät halva %.","natten","natt","hela",1],
["Båda % är sjuka.","barnen","barn","bada",1],
["Det var första % jag var där.","gången","gång","forsta",1],
["Det här är min %.","bil","bilen","poss",0],
["Jag gillar din nya %.","jacka","jackan","possAdj",1],
["Annas % är stort.","hus","huset","genitiv",1],
["Sveriges % heter Stockholm.","huvudstad","huvudstaden","genitiv",1],
["Vilken % tar du?","buss","bussen","vilken",0]
];

/* [mening, grundord, lösningar, regel] */
const B_POSS_ADJ = [
["Det här är min % bil.","ny",["nya"],"possAdj"],
["Annas % hus ligger vid sjön.","gammal",["gamla"],"possAdj"],
["Vi sålde vårt % hus.","stor",["stora"],"possAdj"]
];

const extraText=e=>e?" "+e:"";

B_SINGULAR.forEach(([obest,best,fel,regel])=>{
  neueKarte({
    deck:"bestamd", typ:"wahl",
    rohfrage:obest,
    frage:esc(obest)+" &rarr; "+LUECKE,
    anweisung:"Bestämd form singular?",
    optionen:[best].concat(fel), richtig:best,
    erklaerung:REGLER[regel]+" &ndash; "+esc(obest+", "+best)
  });
});

B_PLURAL.forEach(([sing,pl,best,fel,regel])=>{
  neueKarte({
    deck:"bestamd", typ:"wahl",
    rohfrage:sing+"|plural",
    frage:esc(sing+", "+pl)+" &rarr; "+LUECKE,
    anweisung:"Bestämd form plural?",
    optionen:[best].concat(fel), richtig:best,
    erklaerung:REGLER[regel]+" &ndash; "+esc(pl+", "+best)
  });
});

B_SVAR_FORM.forEach(([fraga,tal,losningar,regel,extra])=>{
  neueKarte({
    deck:"bestamd", typ:"tippen", schwer:true,
    rohfrage:fraga+"|"+tal,
    frage:esc(fraga)+" &rarr; "+LUECKE,
    anweisung:tal==="s"?"Skriv bestämd form singular.":"Skriv bestämd form plural.",
    loesungen:losningar,
    erklaerung:REGLER[regel]+extraText(extra)+" &ndash; "+esc(fraga+" → "+losningar[0])
  });
});

B_DUBBEL_SKRIV.forEach(([mening,ledtrad,losningar,regel])=>{
  neueKarte({
    deck:"bestamd", typ:"tippen", schwer:true,
    rohfrage:mening+"|"+ledtrad,
    frage:esc(mening).replace("%",LUECKE)+'<span class="zusatz">'+esc(ledtrad)+'</span>',
    anweisung:"Skriv med bestämd form: <i>den/det/de</i> + adjektiv + substantiv.",
    loesungen:losningar,
    erklaerung:REGLER[regel]+" &ndash; "+esc(mening.replace("%",losningar[0]))
  });
});

B_DUBBEL_VAL.forEach(([mening,ratt,fel,regel])=>{
  neueKarte({
    deck:"bestamd", typ:"wahl", schwer:true,
    rohfrage:mening+"|"+ratt,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:"Vilken form är rätt?",
    optionen:[ratt].concat(fel), richtig:ratt,
    erklaerung:REGLER[regel]+" &ndash; "+esc(mening.replace("%",ratt))
  });
});

B_UNDANTAG.forEach(([mening,ratt,fel,regel,schwer])=>{
  neueKarte({
    deck:"bestamd", typ:"wahl", schwer:!!schwer,
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:"Bestämd eller obestämd form?",
    optionen:[ratt,fel], richtig:ratt,
    erklaerung:REGLER[regel]+" &ndash; "+esc(mening.replace("%",ratt))
  });
});

B_POSS_ADJ.forEach(([mening,grundord,losningar,regel])=>{
  neueKarte({
    deck:"bestamd", typ:"tippen", schwer:true,
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:"Skriv rätt form av <i>"+esc(grundord)+"</i>.",
    loesungen:losningar,
    erklaerung:REGLER[regel]+" &ndash; "+esc(mening.replace("%",losningar[0]))
  });
});

})();

REGELSEITEN.bestamd=`
<h2>Artikeln sitter i slutet</h2>
<p>På tyska står den bestämda artikeln före substantivet: <i>das Haus</i>. På svenska sitter den i slutet av ordet, som en <b>ändelse</b>: <b>huset</b>. Den formen kallas <b>bestämd form</b>. Formen utan ändelse (<i>ett hus</i>) kallas <b>obestämd form</b>.</p>
<p>Man använder bestämd form ungefär som tyskans <i>der, die, das</i>: när man talar om något som är känt eller som man redan har nämnt.</p>
<p class="beispiel">Jag har köpt en bil. Bilen är röd.</p>
<p>Ändelsen beror på genus (en eller ett), på tal (singular eller plural) och på hur ordet slutar.</p>

<h2>Bestämd form singular</h2>
<div class="tabelle"><table>
<thead><tr><th></th><th>Ordet slutar på konsonant</th><th>Ordet slutar på vokal</th></tr></thead>
<tbody>
<tr><td>en-ord</td><td><b>-en</b>: en bil, bilen</td><td><b>-n</b>: en flicka, flickan</td></tr>
<tr><td>ett-ord</td><td><b>-et</b>: ett hus, huset</td><td><b>-t</b>: ett äpple, äpplet</td></tr>
</tbody></table></div>
<p class="beispiel">en buss, bussen; en telefon, telefonen<br>en sko, skon; en pojke, pojken; en lärare, läraren<br>ett bord, bordet; ett barn, barnet; ett kök, köket<br>ett frimärke, frimärket; ett hjärta, hjärtat; ett öga, ögat</p>
<h3>Specialfall</h3>
<ul>
<li><b>Betonad vokal i ett-ord.</b> Är sista vokalen betonad, får ett-ord <b>-et</b>: ett kafé, kaféet; ett bi, biet.</li>
<li><b>En-ord på obetonat -el och -er</b> får bara <b>-n</b>: en fågel, fågeln; en syster, systern; en nyckel, nyckeln.</li>
<li><b>Ett-ord på obetonat -er, -el och -en</b> tappar <i>e</i> och får <b>-et</b>: ett fönster, fönstret; ett exempel, exemplet; ett vatten, vattnet. Ibland ändras konsonanten också: ett nummer, numret (bara ett <i>m</i>).</li>
<li><b>Dubbel konsonant.</b> Efter kort vokal skrivs <i>m</i> och <i>n</i> ofta enkelt i slutet av ordet. När en ändelse kommer efter, blir de dubbla: en man, mannen; en vän, vännen; ett rum, rummet.</li>
<li><b>-eum och -ium.</b> Lånord som ett museum och ett gymnasium tappar <i>-um</i>: museet, gymnasiet. Plural: museer, museerna.</li>
</ul>

<h2>Bestämd form plural</h2>
<p>I plural är det pluralformen som bestämmer ändelsen, inte genus. Hur man bildar plural står i högen <i>Plural</i>.</p>
<div class="tabelle"><table>
<thead><tr><th>Pluralen slutar på</th><th>Ändelse</th><th>Exempel</th></tr></thead>
<tbody>
<tr><td>-r (-or, -ar, -er, -r)</td><td><b>-na</b></td><td>flickorna, bilarna, telefonerna, skorna, böckerna</td></tr>
<tr><td>-n</td><td><b>-a</b></td><td>äpplena, frimärkena</td></tr>
<tr><td>ingen ändelse (ett-ord)</td><td><b>-en</b></td><td>husen, barnen, borden, rummen, fönstren</td></tr>
<tr><td>ingen ändelse (personer på -are)</td><td><b>-na</b>, <i>e</i> försvinner</td><td>lärare, lärarna</td></tr>
</tbody></table></div>
<p>Några ord passar inte riktigt i tabellen: <b>ögon, öron</b> blir <b>ögonen, öronen</b>, och <b>män</b> blir <b>männen</b>. Även <i>m</i> blir dubbelt här: rum, rummen. Och <i>fönster</i> tappar <i>e</i>: fönstren.</p>

<h2>Dubbel bestämning</h2>
<p>När ett adjektiv står framför substantivet i bestämd form, måste du markera bestämd form <b>två gånger</b>. Det kallas <b>dubbel bestämning</b>:</p>
<ol>
<li><b>den</b> (en-ord), <b>det</b> (ett-ord) eller <b>de</b> (plural) före adjektivet,</li>
<li>adjektivet med <b>-a</b>,</li>
<li>substantivet i bestämd form.</li>
</ol>
<div class="tabelle"><table>
<thead><tr><th></th><th>Artikel</th><th>Adjektiv</th><th>Substantiv</th></tr></thead>
<tbody>
<tr><td>en-ord</td><td>den</td><td>nya</td><td>bilen</td></tr>
<tr><td>ett-ord</td><td>det</td><td>stora</td><td>huset</td></tr>
<tr><td>plural</td><td>de</td><td>gamla</td><td>böckerna</td></tr>
</tbody></table></div>
<p class="beispiel">Kan du stänga det öppna fönstret?<br>De nya skorna är för små.<br>Jag tar den röda tröjan.</p>
<p><b>liten</b> är oregelbundet: <b>den lilla</b> i singular och <b>de små</b> i plural: det lilla köket, de små barnen.</p>
<p>På tyska räcker artikeln: <i>das große Haus</i>. Därför glömmer tyskar ofta ändelsen och skriver <i>det stora hus</i>. Det är fel: det heter <b>det stora huset</b>.</p>
<p>I vissa namn och fasta uttryck försvinner <i>den/det</i>: <i>Vita huset, Gamla stan, Svarta havet</i>. Det är undantag. I vanliga meningar behövs <i>den/det/de</i>.</p>
<div class="merke"><p>Adjektiv + bestämd form = <b>den/det/de</b> + adjektiv på <b>-a</b> + substantiv på <b>-en/-et/-na</b>. Tre markeringar, inte en.</p></div>

<h2>Den här, det här, de här</h2>
<p><b>den här, det här, de här</b> betyder <i>dieser, dieses, diese</i>. Efter dem står substantivet i <b>bestämd form</b>: den här boken, det här huset, de här skorna. Samma sak gäller <b>den där, det där, de där</b> (<i>jener</i>).</p>
<p>I skriven och formell svenska finns också <b>denna, detta, dessa</b>. Efter dem står substantivet i obestämd form: <i>denna bok, detta hus</i>.</p>

<h2>Ord som styr formen</h2>
<p>Efter vissa ord måste substantivet stå i en viss form. Här är det lätt att göra fel, för tyskan fungerar ofta annorlunda.</p>
<h3>Bestämd form utan den/det</h3>
<div class="tabelle"><table>
<thead><tr><th>Ord</th><th>Exempel</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>förra</td><td>förra veckan, förra året</td><td><i>letzte Woche</i></td></tr>
<tr><td>hela, halva</td><td>hela dagen, halva natten</td><td><i>den ganzen Tag</i></td></tr>
<tr><td>första, sista</td><td>första gången, sista dagen</td><td><i>das erste Mal</i></td></tr>
<tr><td>båda</td><td>båda barnen</td><td><i>beide Kinder</i></td></tr>
</tbody></table></div>
<p>Efter <i>första</i>, <i>sista</i> och <i>båda</i> kan man också använda den/det/de: <i>den första gången, de båda barnen</i>.</p>
<h3>Obestämd form</h3>
<div class="tabelle"><table>
<thead><tr><th>Ord</th><th>Exempel</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>nästa</td><td>nästa vecka, nästa år</td><td><i>nächste Woche</i></td></tr>
<tr><td>samma</td><td>samma dag, samma tröja</td><td><i>derselbe Tag</i></td></tr>
<tr><td>följande</td><td>följande dag, följande frågor</td><td><i>der folgende Tag</i></td></tr>
<tr><td>vilken, vilket, vilka</td><td>vilken buss?</td><td><i>welcher Bus?</i></td></tr>
<tr><td>min, din, vår ... (ägarord)</td><td>min bil, vårt hus</td><td><i>mein Auto</i></td></tr>
<tr><td>genitiv-s</td><td>Annas hus, Sveriges huvudstad</td><td><i>Annas Haus</i></td></tr>
</tbody></table></div>
<p>Lägg märke till skillnaden: <b>förra veckan</b> (bestämd form) men <b>nästa vecka</b> (obestämd form). Och <i>samma</i> ser ut som tyskans <i>derselbe</i>, men substantivet står i obestämd form: <b>samma dag</b>.</p>

<h3>Ägarord och genitiv med adjektiv</h3>
<p>Ett <b>ägarord</b> (possessivpronomen) är ett ord som <i>min, din, hans, vår</i>. Ett <b>genitiv-s</b> visar vem något tillhör: <i>Annas</i>. Efter dem står substantivet i <b>obestämd</b> form, men adjektivet får ändå <b>-a</b>:</p>
<p class="beispiel">min nya bil (inte: min nya bilen)<br>Annas gamla hus<br>Vi sålde vårt stora hus.</p>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>Adjektiv utan bestämd form på substantivet:</b> <i>det stora hus</i>. Rätt: <b>det stora huset</b>.</li>
<li><b>Fel artikel före adjektivet:</b> <i>den stora huset</i>. <i>hus</i> är ett ett-ord, alltså <b>det</b> stora huset.</li>
<li><b>Bestämd form efter ägarord:</b> <i>min bilen</i>. Rätt: <b>min bil</b>.</li>
<li><b>Obestämd form efter den här:</b> <i>den här bok</i>. Rätt: <b>den här boken</b>.</li>
<li><b>Fel form efter förra och nästa:</b> Det heter <b>förra veckan</b> och <b>nästa vecka</b>.</li>
<li><b>Ändelse på -et efter vokal:</b> <i>äppleet</i>. Rätt: <b>äpplet</b>.</li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>Singular: en-ord -en/-n, ett-ord -et/-t.</li>
<li>Plural: -na efter -r, -a efter -n, -en efter plural utan ändelse.</li>
<li>Adjektiv + bestämd form: den/det/de + adjektiv på -a + substantiv i bestämd form.</li>
<li>Bestämd form efter den här, förra, hela, första, sista, båda.</li>
<li>Obestämd form efter nästa, samma, följande, vilken, ägarord och genitiv.</li>
</ul>
`;
