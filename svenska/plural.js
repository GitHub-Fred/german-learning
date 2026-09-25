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
