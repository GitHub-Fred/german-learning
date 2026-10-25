(()=>{"use strict";

const REGLER = {
  ing: "Substantiv på <b>-ing</b> och <b>-ning</b> är en-ord: en tidning, en övning.",
  het: "Substantiv på <b>-het</b> är en-ord: en frihet, en nyhet.",
  else: "Substantiv på <b>-else</b> är nästan alltid en-ord: en händelse, en upplevelse.",
  tion: "Substantiv på <b>-tion</b> och <b>-sion</b> är en-ord: en station, en diskussion.",
  are: "Ord för personer på <b>-are</b> är en-ord: en lärare, en bagare.",
  a: "Substantiv på <b>-a</b> är nästan alltid en-ord: en flicka, en gata. Några undantag: ett öga, ett öra, ett hjärta.",
  person: "De flesta ord för människor och djur är en-ord: en man, en hund. Några undantag: ett barn, ett djur, ett vittne.",
  dom: "Substantiv på <b>-dom</b> är en-ord: en sjukdom, en ungdom.",
  um: "Substantiv på <b>-um</b> är nästan alltid ett-ord: ett museum, ett datum.",
  ment: "Substantiv på <b>-ment</b> är nästan alltid ett-ord: ett dokument, ett experiment.",
  eri: "Substantiv på <b>-eri</b> och <b>-ori</b> är ett-ord: ett bageri, ett konditori.",
  ande: "Substantiv på <b>-ande</b> och <b>-ende</b> som inte är personer är ett-ord: ett meddelande, ett leende.",
  e: "Många ord på <b>-e</b> som inte är personer är ett-ord: ett äpple, ett frimärke. Men det finns undantag, till exempel en tanke.",
  sammansatt: "I ett sammansatt ord bestämmer det <b>sista ordet</b> om det är en eller ett.",
  homonym: "Ordet finns två gånger, med olika betydelse och olika genus. Här hjälper bara sammanhanget.",
  merkEn: "Här finns ingen regel. Det är ett <b>en</b>-ord, och det måste du lära dig utantill. De flesta substantiv är en-ord.",
  merkEtt: "Här finns ingen regel. Det är ett <b>ett</b>-ord, och det måste du lära dig utantill.",
  ingen: "<b>ingen</b> står med en-ord, <b>inget</b> med ett-ord och <b>inga</b> i plural.",
  nagon: "<b>någon</b> står med en-ord, <b>något</b> med ett-ord och <b>några</b> i plural.",
  vilken: "<b>vilken</b> står med en-ord, <b>vilket</b> med ett-ord och <b>vilka</b> i plural.",
  annan: "<b>en annan</b> står med en-ord och <b>ett annat</b> med ett-ord. I plural och i bestämd form heter det <b>andra</b>: andra dagar, den andra bilen.",
  min: "<b>min</b> står med en-ord, <b>mitt</b> med ett-ord och <b>mina</b> i plural. Samma sak gäller din/ditt/dina och vår/vårt/våra.",
  sin: "<b>sin</b> står med en-ord, <b>sitt</b> med ett-ord och <b>sina</b> i plural. Man använder sin/sitt/sina när det är subjektet som äger saken.",
  denhar: "<b>den här</b> står med en-ord, <b>det här</b> med ett-ord och <b>de här</b> i plural. Substantivet står i bestämd form: den här boken.",
  adj: "Efter <b>ett</b> får adjektivet <b>-t</b>: en stor bil, ett stort hus.",
  adjPred: "Efter <i>är</i> böjs adjektivet efter subjektet. Ett ett-ord ger <b>-t</b>.",
  liten: "<i>liten</i> blir <b>litet</b> med ett-ord: en liten bil, ett litet hus.",
  vd: "Adjektiv på vokal + <i>d</i> får <b>-tt</b> med ett-ord: röd, rött; god, gott."
};

/* [substantiv, en|ett, regel, extra] */
const E_NOMEN = [
["tidning","en","ing"],["övning","en","ing"],["lösning","en","ing"],
["frihet","en","het"],["nyhet","en","het"],["möjlighet","en","het"],
["händelse","en","else"],["upplevelse","en","else"],
["station","en","tion"],["information","en","tion"],["diskussion","en","tion"],
["lärare","en","are"],["läkare","en","are"],["bagare","en","are"],
["flicka","en","a"],["gata","en","a"],["vecka","en","a"],["kyrka","en","a"],
["hund","en","person"],["katt","en","person"],["häst","en","person"],["fågel","en","person"],
["sjukdom","en","dom"],["ungdom","en","dom"],
["museum","ett","um"],["datum","ett","um"],["gymnasium","ett","um"],
["dokument","ett","ment"],["experiment","ett","ment"],["argument","ett","ment"],
["bageri","ett","eri"],["konditori","ett","eri"],
["meddelande","ett","ande"],["leende","ett","ande"],
["äpple","ett","e"],["frimärke","ett","e"],["möte","ett","e"],["ansikte","ett","e"],
["hus","ett","merkEtt"],["bord","ett","merkEtt"],["år","ett","merkEtt"],["land","ett","merkEtt"],
["språk","ett","merkEtt"],["ord","ett","merkEtt"],["rum","ett","merkEtt"],["kök","ett","merkEtt"],
["fönster","ett","merkEtt"],["träd","ett","merkEtt"],["glas","ett","merkEtt"],["brev","ett","merkEtt"],
["namn","ett","merkEtt"],["jobb","ett","merkEtt"],["ägg","ett","merkEtt"],["huvud","ett","merkEtt"],
["bil","en","merkEn"],["stad","en","merkEn"],["bok","en","merkEn"],["stol","en","merkEn"],
["säng","en","merkEn"],["dörr","en","merkEn"],["väg","en","merkEn"],["sjö","en","merkEn"],
["skog","en","merkEn"],["kopp","en","merkEn"]
];

/* [substantiv, ledtråd, en|ett, regel, extra] */
const E_NOMEN_SVAR = [
["fängelse","","ett","else","Ett viktigt undantag: <b>ett fängelse</b>."],
["vittne","","ett","person","Ett vittne är en person, men ordet är ändå ett ett-ord."],
["barn","","ett","person"],
["djur","","ett","person"],
["öga","","ett","a","Jämför: ett öga, ett öra, men en arm, en hand, en näsa."],
["öra","","ett","a","Jämför: ett öga, ett öra, men en arm, en hand, en näsa."],
["arm","","en","merkEn","Jämför: en arm, en hand, men ett öga, ett öra, ett ben."],
["tanke","","en","e","Ordet slutar på -e men är ett en-ord."],
["äppelpaj","äppel + paj","en","sammansatt","Det heter ett äpple, men en paj. Därför: en äppelpaj."],
["äppelträd","äppel + träd","ett","sammansatt","Ett träd, alltså ett äppelträd."],
["sjukhus","sjuk + hus","ett","sammansatt","Ett hus, alltså ett sjukhus."],
["tandborste","tand + borste","en","sammansatt","En borste, alltså en tandborste."],
["lag","i fotboll: elva spelare","ett","homonym","<b>ett lag</b> är en grupp som spelar tillsammans. <b>en lag</b> är en regel som staten bestämmer."],
["lag","regel som staten bestämmer","en","homonym","<b>en lag</b> är en regel från staten. <b>ett lag</b> är en grupp som spelar tillsammans."],
["val","stort djur i havet","en","homonym","<b>en val</b> är ett djur. <b>ett val</b> är när man väljer, till exempel ett riksdagsval."],
["val","när man röstar","ett","homonym","<b>ett val</b> är när man väljer eller röstar. <b>en val</b> är ett djur i havet."]
];

/* [mening, rätt, alternativ, regel, extra] */
const E_KONGRUENS_VAL = [
["Det spelar % roll.","ingen",["ingen","inget","inga"],"ingen","Det heter <i>en roll</i>."],
["Vi har % ledigt bord i kväll.","inget",["ingen","inget","inga"],"ingen","Det heter <i>ett bord</i>."],
["Det går % bussar på söndagar.","inga",["ingen","inget","inga"],"ingen","<i>bussar</i> är plural."],
["Jag har % pengar kvar.","inga",["ingen","inget","inga"],"ingen","<i>pengar</i> är alltid plural."],
["Har du % fråga?","någon",["någon","något","några"],"nagon","Det heter <i>en fråga</i>."],
["Har du % paraply?","något",["någon","något","några"],"nagon","Det heter <i>ett paraply</i>."],
["Jag köpte % tomater.","några",["någon","något","några"],"nagon","<i>tomater</i> är plural."],
["% bil är din?","Vilken",["Vilken","Vilket","Vilka"],"vilken","Det heter <i>en bil</i>."],
["% land kommer du från?","Vilket",["Vilken","Vilket","Vilka"],"vilken","Det heter <i>ett land</i>."],
["% skor ska jag ta på mig?","Vilka",["Vilken","Vilket","Vilka"],"vilken","<i>skor</i> är plural."],
["Vi tar det en % dag.","annan",["annan","annat","andra"],"annan","Det heter <i>en dag</i>."],
["Jag vill ha ett % rum.","annat",["annan","annat","andra"],"annan","Det heter <i>ett rum</i>."],
["Den % bilen är röd.","andra",["annan","annat","andra"],"annan","Bestämd form: den andra bilen."],
["Var är % nycklar?","mina",["min","mitt","mina"],"min","<i>nycklar</i> är plural."],
["% kök är nytt.","Vårt",["Vår","Vårt","Våra"],"min","Det heter <i>ett kök</i>. Adjektivet <i>nytt</i> visar att det är singular."],
["% boken är tråkig.","Den här",["Den här","Det här","De här"],"denhar","Det heter <i>en bok</i>."],
["Jag gillar % skorna.","de här",["den här","det här","de här"],"denhar","<i>skorna</i> är plural."],
["Han tvättar % bil varje lördag.","sin",["sin","sitt","sina"],"sin","Det heter <i>en bil</i>."]
];

/* [mening, grundord, lösningar, regel, extra] */
const E_KONGRUENS_SKRIV = [
["Jag har % aning.","ingen",["ingen"],"ingen","Det heter <i>en aning</i>."],
["Det finns % vatten i flaskan.","ingen",["inget"],"ingen","<i>vatten</i> är ett ett-ord: vattnet."],
["Vi har % stolar kvar.","ingen",["inga"],"ingen","<i>stolar</i> är plural."],
["Har du % penna?","någon",["någon"],"nagon","Det heter <i>en penna</i>."],
["Har du fått % meddelande?","någon",["något"],"nagon","Det heter <i>ett meddelande</i>."],
["Jag har inte köpt % blommor.","någon",["några"],"nagon","<i>blommor</i> är plural."],
["% museum vill du besöka?","vilken",["Vilket"],"vilken","Det heter <i>ett museum</i>."],
["% länder har du bott i?","vilken",["Vilka"],"vilken","<i>länder</i> är plural."],
["Vi letar efter ett % ställe.","annan",["annat"],"annan","Det heter <i>ett ställe</i>."],
["Var är de % barnen?","annan",["andra"],"annan","Plural och bestämd form: de andra barnen."],
["% hjärta slår snabbt.","min",["Mitt"],"min","Det heter <i>ett hjärta</i>."],
["Har du sett % glasögon?","min",["mina"],"min","<i>glasögon</i> är alltid plural."],
["% äpplet är surt.","den här",["Det här"],"denhar","Det heter <i>ett äpple</i>."],
["Hon åt upp % äpple.","sin",["sitt"],"sin","Det heter <i>ett äpple</i>."],
["Vi bor i ett % hus.","stor",["stort"],"adj",""],
["Det är ett % rum.","liten",["litet"],"liten",""],
["Jag vill ha ett % äpple.","röd",["rött"],"vd",""],
["Brödet är %.","god",["gott"],"adjPred","<i>Brödet</i> är ett ett-ord, och <i>god</i> blir <b>gott</b>."]
];

const extraText=e=>e?" "+e:"";

E_NOMEN.forEach(([nomen,g,regel,extra])=>{
  neueKarte({
    deck:"enett", typ:"wahl", geschlecht:true,
    rohfrage:nomen,
    frage:LUECKE+" "+esc(nomen),
    anweisung:"En eller ett?",
    optionen:["en","ett"], richtig:g,
    erklaerung:REGLER[regel]+extraText(extra)+" &ndash; "+esc(g+" "+nomen)
  });
});

E_NOMEN_SVAR.forEach(([nomen,ledtrad,g,regel,extra])=>{
  neueKarte({
    deck:"enett", typ:"wahl", geschlecht:true, schwer:true,
    rohfrage:nomen+(ledtrad?"|"+ledtrad:""),
    frage:LUECKE+" "+esc(nomen)+(ledtrad?'<span class="zusatz">'+esc(ledtrad)+'</span>':""),
    anweisung:"En eller ett?",
    optionen:["en","ett"], richtig:g,
    erklaerung:REGLER[regel]+extraText(extra)+" &ndash; "+esc(g+" "+nomen)
  });
});

E_KONGRUENS_VAL.forEach(([mening,ratt,alternativ,regel,extra])=>{
  neueKarte({
    deck:"enett", typ:"wahl", schwer:true,
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:"Vilken form passar?",
    optionen:alternativ, richtig:ratt,
    erklaerung:REGLER[regel]+extraText(extra)+" &ndash; "+esc(mening.replace("%",ratt))
  });
});

E_KONGRUENS_SKRIV.forEach(([mening,grundord,losningar,regel,extra])=>{
  neueKarte({
    deck:"enett", typ:"tippen", schwer:true,
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:"Skriv rätt form av <i>"+esc(grundord)+"</i>.",
    loesungen:losningar,
    erklaerung:REGLER[regel]+extraText(extra)+" &ndash; "+esc(mening.replace("%",losningar[0]))
  });
});

})();

REGELSEITEN.enett=`
<h2>Två genus: en och ett</h2>
<p>Varje substantiv på svenska har ett <b>genus</b> (grammatiskt kön). Det finns bara två: <b>en-ord</b> och <b>ett-ord</b>. Ett <b>substantiv</b> är ett ord för en sak, en person, ett djur eller en idé: <i>bil, lärare, katt, frihet</i>.</p>
<p>Tyskan har tre genus: <i>der, die, das</i>. På svenska har <i>der</i> och <i>die</i> blivit ett enda genus, och det är <b>en</b>. Därför är en-ord mycket vanligare: ungefär tre av fyra substantiv är en-ord.</p>
<p>Genus syns i den obestämda artikeln (<b>en</b> bil, <b>ett</b> hus), i den bestämda formen (bil<b>en</b>, hus<b>et</b>) och i många ord som står ihop med substantivet: <b>ingen</b> bil, <b>inget</b> hus, en stor bil, ett stor<b>t</b> hus.</p>
<div class="merke"><p>Tyskt genus hjälper nästan inte alls. <i>das Buch</i> är <b>en bok</b>, <i>das Auto</i> är <b>en bil</b>, <i>der Tisch</i> är <b>ett bord</b>. Lär dig varje nytt substantiv tillsammans med <b>en</b> eller <b>ett</b>.</p></div>

<h2>Ändelser som visar genus</h2>
<p>För många ord finns ingen regel. Men vissa <b>ändelser</b> (slutet på ordet) visar nästan alltid genus. Det lönar sig att kunna dem.</p>
<h3>Ändelser för en-ord</h3>
<div class="tabelle"><table>
<thead><tr><th>Ändelse</th><th>Exempel</th><th>Undantag</th></tr></thead>
<tbody>
<tr><td>-ing, -ning</td><td>en tidning, en övning, en lösning</td><td>-</td></tr>
<tr><td>-het</td><td>en frihet, en nyhet, en möjlighet</td><td>-</td></tr>
<tr><td>-else</td><td>en händelse, en upplevelse</td><td>ett fängelse</td></tr>
<tr><td>-tion, -sion</td><td>en station, en information, en diskussion</td><td>-</td></tr>
<tr><td>-dom</td><td>en sjukdom, en ungdom, en barndom</td><td>-</td></tr>
<tr><td>-are (personer)</td><td>en lärare, en läkare, en bagare</td><td>-</td></tr>
<tr><td>-a</td><td>en flicka, en gata, en vecka, en kyrka</td><td>ett öga, ett öra, ett hjärta</td></tr>
</tbody></table></div>
<p>Jämför med tyskan: <i>-ung, -heit, -keit, -ion</i> är feminina på tyska (<i>die Zeitung, die Freiheit, die Station</i>). Feminina ord blir en-ord på svenska, så här hjälper tyskan faktiskt.</p>
<h3>Ändelser för ett-ord</h3>
<div class="tabelle"><table>
<thead><tr><th>Ändelse</th><th>Exempel</th><th>Undantag</th></tr></thead>
<tbody>
<tr><td>-um</td><td>ett museum, ett datum, ett gymnasium</td><td>sällsynta</td></tr>
<tr><td>-ment</td><td>ett dokument, ett experiment, ett argument</td><td>sällsynta</td></tr>
<tr><td>-eri, -ori</td><td>ett bageri, ett konditori</td><td>-</td></tr>
<tr><td>-ande, -ende (inte personer)</td><td>ett meddelande, ett leende</td><td>personer: en studerande</td></tr>
<tr><td>-e (inte personer)</td><td>ett äpple, ett frimärke, ett möte, ett ansikte</td><td>en tanke och några till</td></tr>
</tbody></table></div>
<p>Regeln för <b>-e</b> är svagare än de andra. Ord för personer på -e är en-ord (<i>en pojke, en kille</i>), och några andra ord på -e är också en-ord, till exempel <b>en tanke</b>.</p>

<h2>Människor och djur</h2>
<p>De flesta ord för människor och djur är en-ord: <i>en man, en kvinna, en lärare, en hund, en katt, en häst, en fågel</i>.</p>
<p>Viktiga undantag är <b>ett barn</b>, <b>ett djur</b> och <b>ett vittne</b>. Här är genus grammatik och inte biologi, precis som i tyskans <i>das Mädchen</i>.</p>

<h2>Ord utan regel</h2>
<p>Många korta och vanliga ord har ingen ändelse som hjälper. Då måste du lära dig genus utantill. Om du är osäker, gissa <b>en</b>: det är rätt oftast.</p>
<p>Vanliga <b>ett-ord</b> som du bör kunna: ett hus, ett bord, ett år, ett land, ett språk, ett ord, ett rum, ett kök, ett fönster, ett träd, ett glas, ett brev, ett namn, ett jobb, ett ägg, ett huvud.</p>
<p>Vanliga <b>en-ord</b>: en bil, en stad, en bok, en stol, en säng, en dörr, en väg, en sjö, en skog, en kopp.</p>
<p>Ett tips: lär dig också den bestämda formen. <i>Huset</i> och <i>bilen</i> visar genus direkt, och du hör dem ofta.</p>

<h2>Sammansatta ord</h2>
<p>Svenskan bildar långa ord av två eller fler ord, precis som tyskan. I ett <b>sammansatt ord</b> bestämmer det <b>sista ordet</b> genus. Det är samma regel som på tyska (<i>das Haus, das Krankenhaus</i>).</p>
<p class="beispiel">sjuk + ett hus = ett sjukhus<br>tand + en borste = en tandborste<br>äppel + en paj = en äppelpaj<br>äppel + ett träd = ett äppelträd</p>

<h2>Samma ord, två genus</h2>
<p>Några ord finns två gånger, med olika betydelse och olika genus. Här hjälper bara sammanhanget.</p>
<ul>
<li><b>en lag</b> är en regel som staten bestämmer. <b>ett lag</b> är en grupp som spelar tillsammans, till exempel i fotboll.</li>
<li><b>en val</b> är ett stort djur i havet. <b>ett val</b> är när man väljer eller röstar.</li>
<li><b>en plan</b> är en idé om vad man ska göra. <b>ett plan</b> är ett flygplan eller en våning.</li>
</ul>

<h2>Ord som följer genus</h2>
<p>Många ord som står före substantivet ändrar form efter genus. Formen för en-ord slutar oftast på <b>-n</b>, formen för ett-ord på <b>-t</b>. I plural är formen samma för båda.</p>
<div class="tabelle"><table>
<thead><tr><th>Ord</th><th>en-ord</th><th>ett-ord</th><th>plural</th></tr></thead>
<tbody>
<tr><td>ingen (kein)</td><td>ingen bil</td><td>inget hus</td><td>inga bilar</td></tr>
<tr><td>någon (irgendein, etwas)</td><td>någon fråga</td><td>något paraply</td><td>några tomater</td></tr>
<tr><td>vilken (welcher)</td><td>vilken bil?</td><td>vilket land?</td><td>vilka skor?</td></tr>
<tr><td>annan (anderer)</td><td>en annan dag</td><td>ett annat rum</td><td>andra dagar</td></tr>
<tr><td>min, din (mein, dein)</td><td>min bil</td><td>mitt hus</td><td>mina nycklar</td></tr>
<tr><td>sin (sein eigener)</td><td>sin bil</td><td>sitt äpple</td><td>sina barn</td></tr>
<tr><td>vår (unser)</td><td>vår bil</td><td>vårt kök</td><td>våra barn</td></tr>
<tr><td>er (euer)</td><td>er bil</td><td>ert kök</td><td>era barn</td></tr>
<tr><td>den här (dieser)</td><td>den här boken</td><td>det här äpplet</td><td>de här skorna</td></tr>
</tbody></table></div>
<p>Några saker att lägga märke till:</p>
<ul>
<li><b>hans, hennes, deras</b> ändras aldrig: hans bil, hans hus, hans barn.</li>
<li><b>annan</b> blir <b>andra</b> i plural och i bestämd form: andra dagar, den andra bilen, de andra barnen.</li>
<li>Efter <b>den här, det här, de här</b> står substantivet i bestämd form: <i>den här boken</i>, inte <i>den här bok</i>. Tyskan säger <i>dieses Buch</i> utan bestämd form.</li>
<li>Vissa ord finns bara i plural, till exempel <b>pengar</b> och <b>glasögon</b>. Därför: <i>inga pengar, mina glasögon</i>.</li>
<li><b>vatten</b> är ett ett-ord: <i>inget vatten</i>, inte <i>ingen vatten</i>.</li>
</ul>

<h3>Adjektiv efter ett-ord</h3>
<p>Ett <b>adjektiv</b> beskriver hur något är: <i>stor, ny, röd</i>. Med ett-ord får adjektivet <b>-t</b>. Det gäller både före substantivet och efter <i>är</i>.</p>
<p class="beispiel">en stor bil, ett stort hus<br>Bilen är ny. Köket är nytt.</p>
<ul>
<li><b>liten</b> blir <b>litet</b>: ett litet hus.</li>
<li>Adjektiv på vokal + <b>d</b> får <b>-tt</b>: röd, ett rött äpple; god, brödet är gott.</li>
</ul>
<p>Mer om detta finns i högen <i>Adjektiv</i>.</p>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>Att ta genus från tyskan.</b> <i>das Buch</i> blir inte <i>ett bok</i>, utan <b>en bok</b>. <i>das Mädchen</i> är <b>en flicka</b>.</li>
<li><b>Att glömma -t på adjektivet.</b> <i>ett stor hus</i> är fel, det heter <b>ett stort hus</b>. Samma sak efter är: <i>Huset är stort.</i></li>
<li><b>Att använda ingen med ett-ord.</b> Det heter <b>inget</b> vatten, <b>inget</b> problem.</li>
<li><b>Att glömma bestämd form efter den här.</b> Det heter <b>den här boken</b>.</li>
<li><b>Att tro att alla ord på -e är ett-ord.</b> <i>en pojke, en tanke</i> är en-ord.</li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>Svenska har två genus: en (vanligast) och ett.</li>
<li>En: -ing, -het, -else, -tion, -dom, -are, -a, de flesta personer och djur.</li>
<li>Ett: -um, -ment, -eri, -ande (saker), många ord på -e.</li>
<li>I sammansatta ord bestämmer sista ordet.</li>
<li>ingen/inget/inga, någon/något/några, vilken/vilket/vilka, min/mitt/mina följer genus och tal.</li>
<li>Adjektiv får -t med ett-ord.</li>
</ul>
`;
