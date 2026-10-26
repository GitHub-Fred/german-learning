(()=>{"use strict";

const REGLER = {
  or: "Grupp 1: en-ord på <b>-a</b> får <b>-or</b>: en flicka, flickor. Några få andra ord får också -or: en ros, rosor.",
  ar: "Grupp 2: många korta en-ord, många en-ord på <b>-e</b> och alla en-ord på <b>-ing</b> och <b>-dom</b> får <b>-ar</b>: en bil, bilar; en pojke, pojkar.",
  arE: "Grupp 2: de flesta en-ord på obetonat <b>-el</b>, <b>-er</b> och <b>-ar</b> tappar <i>e</i> eller <i>a</i> före <b>-ar</b>: en fågel, fåglar; en syster, systrar; en sommar, somrar.",
  er: "Grupp 3: lånord, ord med betoning på sista stavelsen och en del korta en-ord får <b>-er</b>: en telefon, telefoner; en park, parker.",
  erE: "Grupp 3: några ord på <b>-el</b> tappar <i>e</i> och får <b>-er</b>: en regel, regler; en möbel, möbler.",
  omljud: "Några ord i grupp 3 får också <b>omljud</b>, alltså a blir ä och o blir ö: en hand, händer; en bok, böcker.",
  r: "Några en-ord som slutar på betonad vokal får bara <b>-r</b>: en sko, skor; en ko, kor.",
  n: "Grupp 4: ett-ord som slutar på obetonad vokal får <b>-n</b>: ett äpple, äpplen; ett frimärke, frimärken.",
  noll: "Grupp 5: de flesta ett-ord som slutar på konsonant får ingen ändelse: ett hus, två hus.",
  nollPerson: "Grupp 5: personord på <b>-are</b> och <b>-iker</b> får ingen ändelse: en lärare, två lärare; en musiker, två musiker.",
  um: "Många lånord på <b>-eum</b> och <b>-ium</b> tappar <i>-um</i> och får <b>-er</b>: ett museum, museer; ett gymnasium, gymnasier.",
  ogon: "<i>öga</i> och <i>öra</i> får <b>-on</b>: ett öga, två ögon; ett öra, två öron.",
  oregel: "Det här ordet är oregelbundet. Plural måste du lära dig utantill.",
  familj: "Några familjeord är oregelbundna: en bror, bröder; en dotter, döttrar; en son, söner; en mor, mödrar.",
  finger: "<i>finger</i> är ett ett-ord men får ändå <b>-ar</b>, och <i>e</i> försvinner: ett finger, fingrar.",
  best: "Bestämd form plural: plural på <b>-r</b> får <b>-na</b> (bröderna). Plural som slutar på konsonant men inte på -r får oftast <b>-en</b> (mössen, gässen).",
  mening: "I plural får substantivet pluralform och adjektivet oftast <b>-a</b>. Verbet ändras inte."
};

/* [singular, plural, fel, regel] */
const P_VAL = [
["en flicka","flickor",["flickar","flicker"],"or"],
["en klocka","klockor",["klockar","klocker"],"or"],
["en gata","gator",["gatar","gater"],"or"],
["en vecka","veckor",["veckar","vecker"],"or"],
["en kyrka","kyrkor",["kyrkar","kyrker"],"or"],
["en skola","skolor",["skolar","skoler"],"or"],
["en ros","rosor",["rosar","roser"],"or"],
["en bil","bilar",["biler","bilor"],"ar"],
["en dag","dagar",["dager","dagor"],"ar"],
["en hund","hundar",["hunder","hundor"],"ar"],
["en stol","stolar",["stoler","stolor"],"ar"],
["en pojke","pojkar",["pojker","pojkor"],"ar"],
["en tidning","tidningar",["tidninger","tidningor"],"ar"],
["en sjukdom","sjukdomar",["sjukdomer","sjukdomor"],"ar"],
["en sjö","sjöar",["sjör","sjöer"],"ar"],
["en ö","öar",["ör","öer"],"ar"],
["en fågel","fåglar",["fågelar","fågler"],"arE"],
["en nyckel","nycklar",["nyckelar","nyckler"],"arE"],
["en syster","systrar",["systerar","systrer"],"arE"],
["en sommar","somrar",["sommarar","sommarer"],"arE"],
["en telefon","telefoner",["telefonar","telefonor"],"er"],
["en station","stationer",["stationar","stationor"],"er"],
["en film","filmer",["filmar","filmor"],"er"],
["en park","parker",["parkar","parkor"],"er"],
["en sak","saker",["sakar","sakor"],"er"],
["en månad","månader",["månadar","månador"],"er"],
["en student","studenter",["studentar","studentor"],"er"],
["en idé","idéer",["idér","idéar"],"er"],
["ett museum","museer",["museumer","museumar"],"um"],
["ett parti","partier",["partin","partiar"],"er"],
["en bok","böcker",["bokar","böker"],"omljud"],
["en hand","händer",["handar","hander"],"omljud"],
["en stad","städer",["stadar","stader"],"omljud"],
["en sko","skor",["skoar","skoer"],"r"],
["en ko","kor",["koar","koer"],"r"],
["ett äpple","äpplen",["äpplar","äppler"],"n"],
["ett frimärke","frimärken",["frimärkar","frimärker"],"n"],
["ett möte","möten",["mötar","mötor"],"n"],
["ett meddelande","meddelanden",["meddelandar","meddelander"],"n"],
["ett hus","hus",["huser","husor"],"noll"],
["ett barn","barn",["barner","barnor"],"noll"],
["ett bord","bord",["bordar","bordor"],"noll"],
["ett brev","brev",["brever","brevar"],"noll"],
["ett glas","glas",["glaser","glasar"],"noll"],
["ett rum","rum",["rummer","rumar"],"noll"],
["en lärare","lärare",["lärarer","lärarar"],"nollPerson"],
["en läkare","läkare",["läkarer","läkarar"],"nollPerson"],
["en musiker","musiker",["musikrar","musikerer"],"nollPerson"]
];

/* [singular, ledtråd, lösningar, regel] */
const P_SKRIV = [
["en man","",["män"],"oregel"],
["en mus","djuret",["möss"],"oregel"],
["en gås","",["gäss"],"oregel"],
["en bror","",["bröder"],"familj"],
["en mor","",["mödrar"],"familj"],
["en dotter","",["döttrar"],"familj"],
["en son","",["söner"],"familj"],
["en fot","",["fötter"],"omljud"],
["en tand","",["tänder"],"omljud"],
["en natt","",["nätter"],"omljud"],
["ett land","",["länder"],"omljud"],
["en strand","",["stränder"],"omljud"],
["en bonde","",["bönder"],"omljud"],
["ett öga","",["ögon"],"ogon"],
["ett öra","",["öron"],"ogon"],
["ett finger","",["fingrar"],"finger"],
["en regel","",["regler"],"erE"],
["en möbel","",["möbler"],"erE"],
["en vinter","",["vintrar"],"arE"],
["en semester","",["semestrar"],"arE"],
["ett huvud","",["huvuden"],"oregel"],
["ett fönster","",["fönster"],"noll"]
];

/* [singular, ledtråd, bestämd plural, regel] */
const P_BESTAMD = [
["en bror","",["bröderna"],"best"],
["en mus","djuret",["mössen"],"best"],
["ett land","",["länderna"],"best"],
["en dotter","",["döttrarna"],"best"],
["en tand","",["tänderna"],"best"],
["en gås","",["gässen"],"best"]
];

/* [singular, plural, förklaring] */
const P_MENING = [
["Min bok är ny.","Mina böcker är nya.","min blir mina, en bok blir böcker och ny blir nya."],
["Bilen är röd.","Bilarna är röda.","bilen blir bilarna och röd blir röda."],
["Huset är gammalt.","Husen är gamla.","huset blir husen och gammalt blir gamla."],
["Barnet är trött.","Barnen är trötta.","barnet blir barnen och trött blir trötta."],
["Mitt rum är litet.","Mina rum är små.","mitt blir mina, rum är samma i plural och litet blir små."],
["Äpplet är gott.","Äpplena är goda.","äpplet blir äpplena och gott blir goda."],
["Hunden skäller.","Hundarna skäller.","hunden blir hundarna. Verbet skäller ändras inte."],
["Mannen är lång.","Männen är långa.","mannen blir männen och lång blir långa."],
["Min fot gör ont.","Mina fötter gör ont.","min blir mina och en fot blir fötter."],
["Min bror är äldre.","Mina bröder är äldre.","min blir mina och en bror blir bröder. Äldre ändras inte."],
["Musen är liten.","Mössen är små.","musen blir mössen och liten blir små."],
["Den här stolen är bekväm.","De här stolarna är bekväma.","den här blir de här, stolen blir stolarna och bekväm blir bekväma."],
["Fönstret är öppet.","Fönstren är öppna.","fönstret blir fönstren och öppet blir öppna."],
["Staden är vacker.","Städerna är vackra.","staden blir städerna och vacker blir vackra."],
["Vår lärare är snäll.","Våra lärare är snälla.","vår blir våra. En lärare, två lärare. Snäll blir snälla."],
["Min dotter är sjuk.","Mina döttrar är sjuka.","min blir mina, en dotter blir döttrar och sjuk blir sjuka."]
];

const fragaText=(sing,ledtrad)=>esc(sing)+", två "+LUECKE+(ledtrad?'<span class="zusatz">'+esc(ledtrad)+'</span>':"");

P_VAL.forEach(([sing,pl,fel,regel])=>{
  neueKarte({
    deck:"plural", typ:"wahl",
    rohfrage:sing,
    frage:fragaText(sing,""),
    anweisung:"Vilken är pluralformen?",
    optionen:[pl].concat(fel), richtig:pl,
    erklaerung:REGLER[regel]+" &ndash; "+esc(sing+", två "+pl)
  });
});

P_SKRIV.forEach(([sing,ledtrad,losningar,regel])=>{
  neueKarte({
    deck:"plural", typ:"tippen", schwer:true,
    rohfrage:sing,
    frage:fragaText(sing,ledtrad),
    anweisung:"Skriv pluralformen.",
    loesungen:losningar,
    erklaerung:REGLER[regel]+" &ndash; "+esc(sing+", två "+losningar[0])
  });
});

P_BESTAMD.forEach(([sing,ledtrad,losningar,regel])=>{
  neueKarte({
    deck:"plural", typ:"tippen", schwer:true,
    rohfrage:sing+"|bestamd",
    frage:esc(sing)+" &rarr; "+LUECKE+(ledtrad?'<span class="zusatz">'+esc(ledtrad)+'</span>':""),
    anweisung:"Skriv <b>bestämd form plural</b>.",
    loesungen:losningar,
    erklaerung:REGLER[regel]+" &ndash; "+esc(sing+", "+losningar[0])
  });
});

P_MENING.forEach(([sing,pl,forklaring])=>{
  neueKarte({
    deck:"plural", typ:"tippen", schwer:true,
    rohfrage:sing,
    frage:esc(sing),
    anweisung:"Skriv samma mening i <b>plural</b>.",
    loesungen:[pl],
    erklaerung:REGLER.mening+" "+esc(forklaring.charAt(0).toUpperCase()+forklaring.slice(1))+" &ndash; "+esc(pl)
  });
});

})();

REGELSEITEN.plural=`
<h2>Fem grupper</h2>
<p><b>Plural</b> betyder flera: en bil, två bilar. På svenska finns det fem vanliga pluraländelser. Därför delar man in substantiven i <b>fem grupper</b>. Vilken grupp ett ord hör till beror mest på två saker: <b>genus</b> (en eller ett) och <b>hur ordet slutar</b>.</p>
<div class="tabelle"><table>
<thead><tr><th>Grupp</th><th>Ändelse</th><th>Vilka ord?</th><th>Exempel</th></tr></thead>
<tbody>
<tr><td>1</td><td><b>-or</b></td><td>en-ord på -a</td><td>en flicka, flickor</td></tr>
<tr><td>2</td><td><b>-ar</b></td><td>många korta en-ord, en-ord på -e, -ing, -dom, -el, -er</td><td>en bil, bilar; en pojke, pojkar</td></tr>
<tr><td>3</td><td><b>-er, -r</b></td><td>lånord, ord med betoning på slutet, en del korta ord</td><td>en telefon, telefoner; en sko, skor</td></tr>
<tr><td>4</td><td><b>-n</b></td><td>ett-ord på vokal</td><td>ett äpple, äpplen</td></tr>
<tr><td>5</td><td><b>ingen ändelse</b></td><td>ett-ord på konsonant, personer på -are</td><td>ett hus, hus; en lärare, lärare</td></tr>
</tbody></table></div>
<p>Grupp 1 och 2 är nästan bara en-ord, grupp 3 mest en-ord. Grupp 4 och 5 är mest ett-ord.</p>

<h2>Grupp 1: -or</h2>
<p>En-ord som slutar på <b>-a</b> byter <i>-a</i> mot <b>-or</b>.</p>
<p class="beispiel">en flicka, flickor; en klocka, klockor; en gata, gator; en vecka, veckor; en skola, skolor; en kyrka, kyrkor</p>
<p>Några få ord som inte slutar på -a får också -or, till exempel <b>en ros, rosor</b> och <b>en våg, vågor</b>.</p>

<h2>Grupp 2: -ar</h2>
<p>Hit hör:</p>
<ul>
<li>många korta en-ord: en bil, bilar; en dag, dagar; en hund, hundar; en stol, stolar</li>
<li>de flesta en-ord på <b>-e</b>. Då försvinner <i>e</i>: en pojke, pojkar</li>
<li>alla en-ord på <b>-ing/-ning</b> och <b>-dom</b>: en tidning, tidningar; en sjukdom, sjukdomar</li>
<li>några ord på betonad vokal: en sjö, sjöar; en ö, öar</li>
</ul>
<p>Ord på obetonat <b>-el, -er</b> och <b>-ar</b> tappar oftast <i>e</i> eller <i>a</i> före ändelsen:</p>
<p class="beispiel">en fågel, fåglar; en nyckel, nycklar<br>en syster, systrar; en vinter, vintrar; en semester, semestrar<br>en sommar, somrar</p>
<p>Ett ovanligt fall: <b>ett finger</b> är ett ett-ord men får ändå -ar: <b>fingrar</b>.</p>

<h2>Grupp 3: -er och -r</h2>
<p>Hit hör:</p>
<ul>
<li><b>lånord</b> (ord från andra språk) och ord som har betoning på sista stavelsen: en telefon, telefoner; en station, stationer; en student, studenter; en idé, idéer</li>
<li>en del korta en-ord: en film, filmer; en park, parker; en sak, saker; en månad, månader</li>
<li>några ett-ord: ett parti, partier; ett museum, museer (<i>-um</i> försvinner)</li>
<li>några ord på -el som tappar <i>e</i>: en regel, regler; en möbel, möbler</li>
</ul>
<p>Några en-ord på betonad vokal får bara <b>-r</b>: en sko, skor; en ko, kor; en tå, tår.</p>
<h3>Omljud</h3>
<p>I grupp 3 finns många ord med <b>omljud</b>. Det betyder att vokalen ändras i plural: <i>a</i> blir <i>ä</i> och <i>o</i> blir <i>ö</i>. Det känner du igen från tyskan: <i>Buch, Bücher; Hand, Hände</i>.</p>
<div class="tabelle"><table>
<thead><tr><th>Singular</th><th>Plural</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>en bok</td><td>böcker</td><td><i>Bücher</i></td></tr>
<tr><td>en fot</td><td>fötter</td><td><i>Füße</i></td></tr>
<tr><td>en son</td><td>söner</td><td><i>Söhne</i></td></tr>
<tr><td>en bonde</td><td>bönder</td><td><i>Bauern</i></td></tr>
<tr><td>en hand</td><td>händer</td><td><i>Hände</i></td></tr>
<tr><td>en stad</td><td>städer</td><td><i>Städte</i></td></tr>
<tr><td>en tand</td><td>tänder</td><td><i>Zähne</i></td></tr>
<tr><td>en natt</td><td>nätter</td><td><i>Nächte</i></td></tr>
<tr><td>en strand</td><td>stränder</td><td><i>Strände</i></td></tr>
<tr><td>ett land</td><td>länder</td><td><i>Länder</i></td></tr>
</tbody></table></div>
<p>Lägg märke till att konsonanten ibland blir dubbel: bok, böcker; fot, fötter.</p>

<h2>Grupp 4: -n</h2>
<p>Ett-ord som slutar på obetonad vokal får <b>-n</b>.</p>
<p class="beispiel">ett äpple, äpplen; ett frimärke, frimärken; ett möte, möten; ett meddelande, meddelanden</p>
<p>Specialfall: <b>ett öga, ögon</b> och <b>ett öra, öron</b> får <b>-on</b>. <b>ett huvud</b> slutar på konsonant men får ändå -en: <b>huvuden</b>.</p>

<h2>Grupp 5: ingen ändelse</h2>
<p>Här ser plural ut precis som singular. Hit hör:</p>
<ul>
<li>de flesta ett-ord som slutar på konsonant: ett hus, två hus; ett barn, två barn; ett bord, ett brev, ett glas, ett rum, ett fönster</li>
<li>personord på <b>-are</b> och <b>-iker</b>: en lärare, två lärare; en läkare, två läkare; en musiker, två musiker</li>
</ul>
<p>Om plural syns eller inte, märker du då på andra ord i meningen: <i>Barnet är trött. Barnen är trötta.</i></p>
<p>Jämför med tyskan: <i>Lehrer, Lehrer</i> och <i>Fenster, Fenster</i> har också ingen ändelse. Men <i>Haus, Häuser</i> och <i>Kind, Kinder</i> har en ändelse på tyska. På svenska heter det <b>hus</b> och <b>barn</b>, inte <i>huser</i> eller <i>barner</i>.</p>

<h2>Oregelbundna ord</h2>
<p>Några vanliga ord följer ingen regel. Dem måste du lära dig utantill.</p>
<div class="tabelle"><table>
<thead><tr><th>Singular</th><th>Plural</th><th>Bestämd plural</th></tr></thead>
<tbody>
<tr><td>en man</td><td>män</td><td>männen</td></tr>
<tr><td>en mus</td><td>möss</td><td>mössen</td></tr>
<tr><td>en gås</td><td>gäss</td><td>gässen</td></tr>
<tr><td>en bror</td><td>bröder</td><td>bröderna</td></tr>
<tr><td>en far</td><td>fäder</td><td>fäderna</td></tr>
<tr><td>en mor</td><td>mödrar</td><td>mödrarna</td></tr>
<tr><td>en dotter</td><td>döttrar</td><td>döttrarna</td></tr>
</tbody></table></div>
<p>Även här hjälper tyskan ofta: <i>Mann, Männer; Maus, Mäuse; Gans, Gänse; Bruder, Brüder; Tochter, Töchter</i>.</p>

<h2>Bestämd form plural</h2>
<p>Bestämd form plural bygger på pluralformen:</p>
<ul>
<li>plural på <b>-r</b> får <b>-na</b>: bilarna, flickorna, böckerna, bröderna, länderna</li>
<li>plural på <b>-n</b> får <b>-a</b>: äpplena, frimärkena</li>
<li>plural utan ändelse eller med bara vokalbyte får oftast <b>-en</b>: husen, barnen, männen, mössen, gässen</li>
<li>personer på <b>-are</b> tappar <i>e</i> och får <b>-na</b>: lärarna</li>
<li><b>ögon</b> och <b>öron</b> blir <b>ögonen</b> och <b>öronen</b></li>
</ul>
<p>Mer om bestämd form står i högen <i>Bestämd form</i>.</p>

<h2>Plural i hela meningen</h2>
<p>När substantivet står i plural, ändras också orden runt omkring:</p>
<ul>
<li>ägarord: <b>min</b>/<b>mitt</b> blir <b>mina</b>, <b>vår</b>/<b>vårt</b> blir <b>våra</b></li>
<li><b>den här</b>/<b>det här</b> blir <b>de här</b></li>
<li>adjektivet får <b>-a</b>: röd, röda; gammal, gamla. <b>liten</b> blir <b>små</b>.</li>
</ul>
<p>Men <b>verbet ändras inte</b>. På tyska säger man <i>ist, sind</i>, på svenska alltid <b>är</b>.</p>
<p class="beispiel">Min bok är ny. Mina böcker är nya.<br>Mitt rum är litet. Mina rum är små.<br>Hunden skäller. Hundarna skäller.<br>Den här stolen är bekväm. De här stolarna är bekväma.</p>
<div class="merke"><p>Vid plural: ändra substantivet, ägarordet och adjektivet. Låt verbet vara.</p></div>
<p>Ord som <b>pengar</b> och <b>glasögon</b> finns bara i plural: <i>Pengarna räcker inte. Mina glasögon är borta.</i></p>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>Tysk ändelse på ett-ord:</b> <i>huser, barner</i>. Rätt: två <b>hus</b>, två <b>barn</b>.</li>
<li><b>Fel grupp för ord på -e:</b> <i>pojker</i>. Rätt: <b>pojkar</b>. Men ett-ord på -e får -n: <b>äpplen</b>.</li>
<li><b>Glömt e-bortfall:</b> <i>fågelar, systerar</i>. Rätt: <b>fåglar, systrar</b>.</li>
<li><b>Glömt omljud:</b> <i>bokar, fotar</i>. Rätt: <b>böcker, fötter</b>.</li>
<li><b>Verbet i plural:</b> svenskan har ingen pluralform av verbet. <i>Barnen är trötta.</i></li>
<li><b>Adjektivet utan -a:</b> <i>Bilarna är röd</i>. Rätt: <b>Bilarna är röda</b>.</li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>Grupp 1: -or (flickor). Grupp 2: -ar (bilar, pojkar, fåglar). Grupp 3: -er/-r (telefoner, böcker, skor). Grupp 4: -n (äpplen). Grupp 5: ingen ändelse (hus, lärare).</li>
<li>Omljud som på tyska: bok, böcker; hand, händer; man, män.</li>
<li>Bestämd plural: -na, -a eller -en.</li>
<li>I plural ändras ägarord och adjektiv, men inte verbet.</li>
</ul>
`;
