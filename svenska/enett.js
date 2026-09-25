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
