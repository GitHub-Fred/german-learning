(()=>{"use strict";

/* Vad betyder det svenska ordet: [ord eller mening, rätt, [fel], förklaring, exempel] */
const V_BETYDER = [
["rolig","som får en att skratta",["lugn och stilla","ledsen"],
 "Svenska <i>rolig</i> betyder att något får en att skratta. Tyska <i>ruhig</i> heter <b>lugn</b> på svenska.",
 "Filmen var så rolig att vi skrattade hela tiden."],
["glass","något kallt och sött som man äter",["något som man dricker ur","en flaska"],
 "Svenska <i>glass</i> är något kallt och sött. Tyska <i>Glas</i> heter <b>glas</b> med ett s på svenska.",
 "På sommaren äter vi glass varje dag."],
["semester","när man är ledig från jobbet",["en del av läsåret på universitetet","en kurs på kvällen"],
 "Svenska <i>semester</i> är ledighet från jobbet. Tyska <i>Semester</i> heter <b>termin</b> på svenska.",
 "I juli har jag fyra veckors semester."],
["Hon är gift.","Hon har en make eller maka.",["Hon är giftig.","Hon är sjuk."],
 "Svenska <i>gift</i> som adjektiv betyder att man har en make eller maka. Tyska <i>Gift</i> heter <b>ett gift</b> på svenska.",
 "Hon är gift och har två barn."],
["öl","en dryck av malt och humle",["olja","smör"],
 "Svenska <i>öl</i> är en dryck. Tyska <i>Öl</i> heter <b>olja</b> på svenska.",
 "Vill du ha en öl till maten?"],
["kläder","allt man har på sig, till exempel byxor och tröjor",["bara klänningar","tyg som man syr med"],
 "Svenska <i>kläder</i> är allt man har på sig. Tyska <i>Kleid</i> heter <b>klänning</b> på svenska.",
 "Jag måste köpa nya kläder till vintern."],
["en rock","en lång jacka",["en kjol","ett par byxor"],
 "Svenska <i>rock</i> är en lång jacka, till exempel en läkarrock. Tyska <i>Rock</i> heter <b>kjol</b> på svenska.",
 "Läkaren har en vit rock."],
["en slips","ett band som man knyter runt halsen till skjortan",["underkläder","en mössa"],
 "Svenska <i>slips</i> har man till skjortan. Tyska <i>Slip</i> heter <b>trosor</b> eller <b>kalsonger</b> på svenska.",
 "Han har alltid slips på jobbet."],
["hemsk","väldigt otäck eller dålig",["som känns som hemma","gjord hemma"],
 "Svenska <i>hemsk</i> betyder väldigt otäck eller dålig. Tyska <i>heimisch</i> heter <b>inhemsk</b> på svenska, och <i>sich heimisch fühlen</i> heter <b>känna sig hemma</b>.",
 "Det var en hemsk olycka."],
["enkel","lätt, inte krånglig",["ett barnbarn","gammal"],
 "Svenska <i>enkel</i> betyder lätt eller inte krånglig. Tyska <i>Enkel</i> heter <b>barnbarn</b> på svenska.",
 "Uppgiften var ganska enkel."],
["Vilken skön stol!","Stolen är bekväm.",["Stolen är vacker.","Stolen är gammal."],
 "Svenska <i>skön</i> betyder oftast bekväm eller behaglig. Tyska <i>schön</i> heter oftast <b>vacker</b> eller <b>fin</b> på svenska.",
 "Vilken skön stol! Här kan jag sitta hela dagen."],
["ful","inte snygg, inte vacker",["lat","trött"],
 "Svenska <i>ful</i> betyder inte snygg. Tyska <i>faul</i> heter <b>lat</b> på svenska, och om mat <b>rutten</b>.",
 "Huset är gammalt och fult."],
["blöt","våt, full av vatten",["dum","smutsig"],
 "Svenska <i>blöt</i> betyder våt. Tyska <i>blöd</i> heter <b>dum</b> på svenska.",
 "Jag glömde paraplyet och blev helt blöt."],
["snäll","vänlig mot andra",["snabb","sen"],
 "Svenska <i>snäll</i> betyder vänlig. Tyska <i>schnell</i> heter <b>snabb</b> på svenska.",
 "Hon är alltid snäll mot barnen."],
["en kram","när man lägger armarna om någon",["gamla saker och skräp","en liten affär"],
 "Svenska <i>kram</i> är när man lägger armarna om någon. Tyska <i>Kram</i> heter <b>grejer</b> eller <b>skräp</b> på svenska.",
 "Hon gav mig en stor kram."],
["rar","söt och snäll",["sällsynt, ovanlig","dyr"],
 "Svenska <i>rar</i> betyder söt och snäll. Tyska <i>rar</i> heter <b>sällsynt</b> på svenska.",
 "Vilken rar liten hund!"]
];

/* Tyska ordet heter på svenska: [tyskt ord, rätt, [fel], förklaring, exempel] */
const V_HETER = [
["ruhig","lugn",["rolig","snabb"],
 "Tyska <i>ruhig</i> heter <b>lugn</b>. Svenska <i>rolig</i> betyder att något får en att skratta.",
 "Det är lugnt och skönt på landet."],
["blöd","dum",["blöt","trött"],
 "Tyska <i>blöd</i> heter <b>dum</b>. Svenska <i>blöt</i> betyder våt.",
 "Det var en dum idé."],
["künstlich","konstgjord",["konstig","vacker"],
 "Tyska <i>künstlich</i> heter <b>konstgjord</b>. Svenska <i>konstig</i> betyder märklig eller underlig.",
 "Blommorna på bordet är konstgjorda."],
["eine Fahrt nach Berlin","en resa till Berlin",["en fart till Berlin","en fest till Berlin"],
 "Tyska <i>Fahrt</i> heter <b>resa</b> eller <b>tur</b>. Svenska <i>fart</i> betyder hur snabbt något rör sig.",
 "Vi gjorde en resa till Berlin."],
["loben","berömma",["lova","låna"],
 "Tyska <i>loben</i> heter <b>berömma</b>. Svenska <i>lova</i> betyder att säga att man säkert ska göra något.",
 "Läraren berömde eleverna."],
["lecken","slicka",["leka","äta"],
 "Tyska <i>lecken</i> heter <b>slicka</b>. Svenska <i>leka</i> är vad barn gör när de har roligt.",
 "Hunden slickar mig i ansiktet."],
["Rum (drycken)","rom",["rum","vin"],
 "Tyska <i>Rum</i> heter <b>rom</b>. Svenska <i>rum</i> är en del av ett hus, till exempel ett sovrum.",
 "Han dricker rom med cola."],
["rar","sällsynt",["rar","dyr"],
 "Tyska <i>rar</i> heter <b>sällsynt</b>. Svenska <i>rar</i> betyder söt och snäll.",
 "Den här fågeln är mycket sällsynt."]
];

/* Skriv det svenska ordet: [mening, [lösningar], tysk mening, förklaring] */
const V_TIPPEN = [
["Kan jag få ett % vatten?",["glas"],"Kann ich ein Glas Wasser haben?",
 "Tyska <i>Glas</i> heter <b>glas</b> med ett s. <i>Glass</i> med två s är något kallt och sött att äta."],
["På sommaren äter barnen % varje dag.",["glass"],"Im Sommer essen die Kinder jeden Tag Eis.",
 "Tyska <i>Eis</i> som man äter heter <b>glass</b> med två s. <i>Glas</i> med ett s dricker man ur."],
["Vi har % i juli.",["semester","ledigt"],"Wir haben im Juli Urlaub.",
 "Tyska <i>Urlaub</i> heter <b>semester</b>. Tyska <i>Semester</i> heter <b>termin</b>."],
["Kursen börjar nästa %.",["termin"],"Der Kurs beginnt nächstes Semester.",
 "Tyska <i>Semester</i> heter <b>termin</b>. Svenska <i>semester</i> är ledighet från jobbet."],
["Bilen behöver ny %.",["olja","motorolja"],"Das Auto braucht neues Öl.",
 "Tyska <i>Öl</i> heter <b>olja</b>. Svenska <i>öl</i> är en dryck."],
["Två %, tack!",["öl"],"Zwei Bier, bitte!",
 "Tyska <i>Bier</i> heter <b>öl</b>. I plural heter det också <i>öl</i>."],
["Hon har en röd % på sig.",["klänning"],"Sie trägt ein rotes Kleid.",
 "Tyska <i>Kleid</i> heter <b>klänning</b>. Svenska <i>kläder</i> är allt man har på sig."],
["Hon har en kort % och en vit blus.",["kjol"],"Sie trägt einen kurzen Rock und eine weiße Bluse.",
 "Tyska <i>Rock</i> heter <b>kjol</b>. Svenska <i>rock</i> är en lång jacka."],
["Mormor har fem %.",["barnbarn"],"Oma hat fünf Enkel.",
 "Tyska <i>Enkel</i> heter <b>barnbarn</b>. Svenska <i>enkel</i> betyder lätt."],
["Han är för % för att diska.",["lat","slö"],"Er ist zu faul zum Abwaschen.",
 "Tyska <i>faul</i> heter <b>lat</b>. Svenska <i>ful</i> betyder inte snygg."],
["Solen går upp i %.",["öster","öst"],"Die Sonne geht im Osten auf.",
 "Tyska <i>Osten</i> heter <b>öster</b>. Svenska <i>ost</i> är mat som görs av mjölk."],
["Vill du ha % på smörgåsen?",["ost"],"Möchtest du Käse aufs Brot?",
 "Tyska <i>Käse</i> heter <b>ost</b>. Tyska <i>Ost</i> heter <b>öst</b> eller <b>öster</b>."],
["Båten ligger i %.",["hamnen","hamn"],"Das Boot liegt im Hafen.",
 "Tyska <i>Hafen</i> heter <b>hamn</b>. Svenska <i>hav</i> är tyska <i>Meer</i>."],
["Kan du inte % en stund till?",["stanna","stanna kvar"],"Kannst du nicht noch ein bisschen bleiben?",
 "Tyska <i>bleiben</i> heter <b>stanna</b>. Svenska <i>bli</i> är tyska <i>werden</i>."],
["Katten % upp på bordet.",["hoppar"],"Die Katze springt auf den Tisch.",
 "Tyska <i>springen</i> heter <b>hoppa</b>. Svenska <i>springa</i> är tyska <i>laufen</i> eller <i>rennen</i>."],
["Det nya tåget är väldigt %.",["snabbt"],"Der neue Zug ist sehr schnell.",
 "Tyska <i>schnell</i> heter <b>snabb</b>, här <b>snabbt</b> efter ett ett-ord. Svenska <i>snäll</i> betyder vänlig."],
["Rummet är stort och %.",["ljust"],"Das Zimmer ist groß und hell.",
 "Tyska <i>hell</i> heter <b>ljus</b>, här <b>ljust</b> efter ett ett-ord. Svenska <i>hel</i> är tyska <i>ganz</i>, till exempel att något inte är trasigt."],
["Jag är % klar.",["nästan"],"Ich bin fast fertig.",
 "Tyska <i>fast</i> heter <b>nästan</b>. Svenska <i>fast</i> betyder <i>men</i> eller <i>fastän</i>, eller att något sitter hårt."],
["Kan du stänga %?",["dörren"],"Kannst du die Tür zumachen?",
 "Tyska <i>Tür</i> heter <b>dörr</b>. Svenska <i>tur</i> betyder att något går bra av en slump."],
["I skogen såg vi en %.",["björn"],"Im Wald haben wir einen Bären gesehen.",
 "Tyska <i>Bär</i> heter <b>björn</b>. Svenska <i>bär</i> är små frukter, till exempel blåbär."]
];

V_BETYDER.forEach(([ord,richtig,falsch,erkl,exempel])=>{
  neueKarte({
    deck:"vanner", typ:"wahl",
    rohfrage:"betyder|"+ord,
    frage:"Vad betyder <i>"+esc(ord)+"</i> på svenska?",
    anweisung:"Välj rätt betydelse.",
    optionen:[richtig].concat(falsch), richtig:richtig,
    erklaerung:erkl+" &ndash; "+esc(exempel)
  });
});

V_HETER.forEach(([tyskt,richtig,falsch,erkl,exempel])=>{
  neueKarte({
    deck:"vanner", typ:"wahl",
    rohfrage:"heter|"+tyskt,
    frage:"Tyska <i>"+esc(tyskt)+"</i> heter på svenska:",
    anweisung:"Välj rätt svenskt ord.",
    optionen:[richtig].concat(falsch), richtig:richtig,
    erklaerung:erkl+" &ndash; "+esc(exempel)
  });
});

V_TIPPEN.forEach(([satz,loesungen,tysk,erkl])=>{
  neueKarte({
    deck:"vanner", typ:"tippen", schwer:true,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"På tyska: <i>"+esc(tysk)+"</i> Skriv ordet som saknas.",
    loesungen:loesungen,
    erklaerung:erkl+" &ndash; "+esc(satz.replace("%",loesungen[0]))
  });
});

})();

REGELSEITEN.vanner=`
<h2>Ord som lurar</h2>
<p><b>Falska vänner</b> är ord som ser ut eller låter som ett ord i ett annat språk, men som betyder något annat. Svenska och tyska är släkt, och därför finns det många sådana ord. Här är de viktigaste, ordnade efter ordklass.</p>
<div class="merke"><p>Om ett svenskt ord ser exakt ut som ett tyskt, kontrollera betydelsen. Oftast stämmer den, men inte alltid.</p></div>

<h2>Adjektiv</h2>
<div class="tabelle"><table>
<thead><tr><th>Svenska</th><th>betyder</th><th>Tyska ordet</th><th>heter på svenska</th></tr></thead>
<tbody>
<tr><td>rolig</td><td>som får en att skratta (<i>lustig</i>)</td><td><i>ruhig</i></td><td>lugn</td></tr>
<tr><td>snäll</td><td>vänlig (<i>nett, lieb</i>)</td><td><i>schnell</i></td><td>snabb</td></tr>
<tr><td>blöt</td><td>våt (<i>nass</i>)</td><td><i>blöd</i></td><td>dum</td></tr>
<tr><td>ful</td><td>inte snygg (<i>hässlich</i>)</td><td><i>faul</i></td><td>lat, slö; om mat: rutten</td></tr>
<tr><td>skön</td><td>bekväm, behaglig (<i>bequem, angenehm</i>)</td><td><i>schön</i></td><td>vacker, fin</td></tr>
<tr><td>enkel</td><td>lätt, inte krånglig (<i>einfach</i>)</td><td><i>Enkel</i></td><td>barnbarn</td></tr>
<tr><td>hemsk</td><td>väldigt otäck eller dålig (<i>schrecklich</i>)</td><td><i>heimisch</i></td><td>inhemsk; <i>sich heimisch fühlen</i>: känna sig hemma</td></tr>
<tr><td>rar</td><td>söt och snäll (<i>lieb, süß</i>)</td><td><i>rar</i></td><td>sällsynt</td></tr>
<tr><td>konstig</td><td>märklig, underlig (<i>seltsam</i>)</td><td><i>künstlich</i></td><td>konstgjord</td></tr>
<tr><td>gift</td><td>har en make eller maka (<i>verheiratet</i>)</td><td><i>Gift</i></td><td>ett gift; adjektiv: giftig</td></tr>
<tr><td>hel</td><td>inte trasig, komplett (<i>ganz</i>)</td><td><i>hell</i></td><td>ljus</td></tr>
</tbody></table></div>
<p class="beispiel">Filmen var så rolig att vi skrattade hela tiden.<br>Det är lugnt och skönt på landet.<br>Vilken skön stol! Här kan jag sitta hela dagen.</p>
<p>Tänk på att adjektivet böjs: <i>Rummet är stort och <b>ljust</b>. Tåget är väldigt <b>snabbt</b>.</i></p>

<h2>Substantiv</h2>
<div class="tabelle"><table>
<thead><tr><th>Svenska</th><th>betyder</th><th>Tyska ordet</th><th>heter på svenska</th></tr></thead>
<tbody>
<tr><td>glass</td><td><i>Eis</i> (att äta)</td><td><i>Glas</i></td><td>glas (ett s)</td></tr>
<tr><td>semester</td><td><i>Urlaub</i></td><td><i>Semester</i></td><td>termin</td></tr>
<tr><td>öl</td><td><i>Bier</i></td><td><i>Öl</i></td><td>olja</td></tr>
<tr><td>kläder</td><td><i>Kleidung</i></td><td><i>Kleid</i></td><td>klänning</td></tr>
<tr><td>rock</td><td><i>Mantel</i>, lång jacka (till exempel läkarrock)</td><td><i>Rock</i></td><td>kjol</td></tr>
<tr><td>slips</td><td><i>Krawatte</i></td><td><i>Slip</i></td><td>trosor, kalsonger</td></tr>
<tr><td>kram</td><td><i>Umarmung</i></td><td><i>Kram</i></td><td>grejer, skräp</td></tr>
<tr><td>fart</td><td><i>Geschwindigkeit</i></td><td><i>Fahrt</i></td><td>resa, tur</td></tr>
<tr><td>rum</td><td><i>Zimmer, Raum</i></td><td><i>Rum</i></td><td>rom</td></tr>
<tr><td>ost</td><td><i>Käse</i></td><td><i>Osten</i></td><td>öster, öst</td></tr>
<tr><td>hav</td><td><i>Meer</i></td><td><i>Hafen</i></td><td>hamn</td></tr>
<tr><td>tur</td><td><i>Glück</i></td><td><i>Tür</i></td><td>dörr</td></tr>
<tr><td>bär</td><td><i>Beere</i></td><td><i>Bär</i></td><td>björn</td></tr>
</tbody></table></div>
<p>Glöm inte stavningen: <b>ett glas</b> vatten (ett s) men <b>en glass</b> (två s). Och <b>två öl</b>: <i>öl</i> har samma form i plural.</p>
<p class="beispiel">I juli har jag fyra veckors semester. Kursen börjar nästa termin.<br>Hon har en kort kjol och en vit blus. Läkaren har en vit rock.</p>

<h2>Verb</h2>
<div class="tabelle"><table>
<thead><tr><th>Svenska</th><th>betyder</th><th>Tyska ordet</th><th>heter på svenska</th></tr></thead>
<tbody>
<tr><td>bli</td><td><i>werden</i></td><td><i>bleiben</i></td><td>stanna</td></tr>
<tr><td>springa</td><td><i>laufen, rennen</i></td><td><i>springen</i></td><td>hoppa</td></tr>
<tr><td>lova</td><td><i>versprechen</i></td><td><i>loben</i></td><td>berömma</td></tr>
<tr><td>leka</td><td><i>spielen</i> (barn)</td><td><i>lecken</i></td><td>slicka</td></tr>
</tbody></table></div>
<p class="beispiel">Kan du inte stanna en stund till? (<i>bleiben</i>)<br>Det blir kallt i kväll. (<i>Es wird kalt.</i>)<br>Katten hoppar upp på bordet. (<i>springt</i>)</p>

<h2>Små ord</h2>
<ul>
<li><b>fast</b> betyder <i>aber, obwohl</i> eller att något sitter hårt (<i>fest</i>). Tyskans <i>fast</i> heter <b>nästan</b>: <i>Jag är nästan klar.</i></li>
</ul>

<h2>Fler att se upp med</h2>
<p>Några andra vanliga falska vänner, som inte finns på korten:</p>
<ul>
<li><b>frisk</b> betyder <i>gesund</i>. Tyskans <i>frisch</i> heter <b>färsk</b>: <i>färskt bröd</i>.</li>
<li><b>glad</b> betyder <i>froh</i>. Tyskans <i>glatt</i> heter <b>slät</b> eller, om vägen, <b>hal</b>.</li>
<li><b>släkt</b> betyder <i>Verwandtschaft</i>. Tyskans <i>schlecht</i> heter <b>dålig</b>.</li>
<li><b>affär</b> betyder oftast <i>Geschäft, Laden</i>.</li>
</ul>

<h2>Sammanfattning</h2>
<p>De vanligaste fällorna: <b>rolig</b> (lustig), <b>snäll</b> (nett), <b>skön</b> (bequem), <b>glass</b> (Eis), <b>semester</b> (Urlaub), <b>gift</b> (verheiratet), <b>bli</b> (werden), <b>springa</b> (laufen), <b>fast</b> (aber). Lär dig dem som par: svenska ordet och det tyska ordet det <i>inte</i> betyder.</p>
`;
