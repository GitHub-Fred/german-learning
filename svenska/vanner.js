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
