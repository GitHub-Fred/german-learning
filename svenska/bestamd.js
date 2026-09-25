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
["ett vatten","s",["vattnet"],"ettEr","Dessutom blir <i>t</i> dubbelt: vattnet."],
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
