(()=>{"use strict";

const REGLER = {
  en: "Efter <i>en</i> har adjektivet grundform.",
  ett: "Efter <i>ett</i> får adjektivet <b>-t</b>.",
  pl: "I plural får adjektivet <b>-a</b>.",
  best: "I bestämd form (den/det/de + adjektiv + substantiv) får adjektivet <b>-a</b>.",
  predEn: "Efter <i>är</i> böjs adjektivet efter subjektet. Subjektet är ett en-ord, så adjektivet har grundform.",
  predEtt: "Efter <i>är</i> böjs adjektivet efter subjektet. Subjektet är ett ett-ord, så adjektivet får <b>-t</b>.",
  predPl: "Efter <i>är</i> böjs adjektivet efter subjektet. Subjektet står i plural, så adjektivet får <b>-a</b>.",
  det: "När <i>det</i> är subjekt och adjektivet står ensamt efter verbet (det är kallt) får adjektivet <b>-t</b>.",
  poss: "Efter ett ägarord (min, din, hans, Annas ...) får adjektivet <b>-a</b>, som i bestämd form.",
  liten: "<i>liten</i> är oregelbundet: en liten, ett litet, små (plural), den lilla, de små.",
  gammal: "<i>gammal</i> blir <i>gamla</i> i plural och bestämd form: en gammal, ett gammalt, gamla, den gamla.",
  enAdj: "Adjektiv på <b>-en</b>: ett-form på <b>-et</b>, plural och bestämd form på <b>-na</b>. Som öppen, öppet, öppna.",
  elAdj: "Adjektiv på <b>-el</b> och <b>-er</b> tappar <i>e</i> före <b>-a</b>: enkel, enkelt, enkla; vacker, vackert, vackra.",
  kt: "Slutar adjektivet på konsonant + <i>t</i> läggs inget extra <i>t</i> till: ett svart hus, ett lätt prov.",
  vt: "Lång vokal + <i>t</i> blir <b>-tt</b> i ett-form: vit, vitt; söt, sött.",
  vd: "Vokal + <i>d</i> blir <b>-tt</b> i ett-form: röd, rött; god, gott; glad, glatt.",
  kd: "Konsonant + <i>d</i>: <i>d</i> blir <b>t</b> i ett-form: känd, känt; hård, hårt.",
  vokal: "Slutar adjektivet på betonad vokal får ett-formen <b>-tt</b>: ny, nytt; fri, fritt; blå, blått.",
  blaa: "<i>blå</i> och <i>grå</i> kan ha två former i plural och bestämd form: blå eller blåa, grå eller gråa.",
  obojl: "Några adjektiv får aldrig <b>-t</b> eller <b>-a</b>: bra, extra, gratis, rosa, lila, kul.",
  komp: "Komparativ bildas oftast med <b>-are</b> och böjs inte: en billigare bil, ett billigare hus.",
  superlPred: "Efter <i>är</i> utan artikel har superlativ grundform: <i>störst, längst, yngst</i>.",
  superlBest: "Superlativ efter <i>den/det/de</i> eller ett genitivord (Sveriges, världens) får <b>-a</b>: den största, Sveriges största. <b>-ast</b> blir <b>-aste</b>.",
  lang: "Adjektiv på <b>-ande</b> och många långa adjektiv jämförs med <b>mer</b> och <b>mest</b>: mer spännande, mest spännande."
};
const regel=r=>REGLER[r]||r;

/* [mening med %, grundform, rätt, [fel], regel, svår] */
const D_WAHL = [
["Vi har en % bil.","stor","stor",["stort","stora"],"en"],
["De bor i ett % hus.","stor","stort",["stor","stora"],"ett"],
["Det står två % bilar på gatan.","stor","stora",["stor","stort"],"pl"],
["Den % bilen är min.","röd","röda",["röd","rött"],"best"],
["Huset är % och ljust.","stor","stort",["stor","stora"],"predEtt"],
["Bilarna är helt %.","ny","nya",["ny","nytt"],"predPl"],
["Jag köpte en % tröja.","röd","röd",["rött","röda"],"en"],
["Kaffet är %.","varm","varmt",["varm","varma"],"predEtt"],
["Maten är %.","god","god",["gott","goda"],"predEn"],
["Vattnet är %.","kall","kallt",["kall","kalla"],"predEtt"],
["Jag tar det % rummet.","billig","billiga",["billig","billigt"],"best"],
["Barnen är %.","trött","trötta",["trött"],"predPl"],
["Det är ett % problem.","svår","svårt",["svår","svåra"],"ett"],
["Frågan är %.","svår","svår",["svårt","svåra"],"predEn"],
["Stolarna är %.","bekväm","bekväma",["bekväm","bekvämt"],"predPl"],
["Vi såg en % film igår.","rolig","rolig",["roligt","roliga"],"en"],
["Vi har ett % kök.","ljus","ljust",["ljus","ljusa"],"ett"],
["De % husen ligger vid havet.","vit","vita",["vit","vitt"],"best"],
["Det % huset är till salu.","gul","gula",["gul","gult"],"best"],
["Jag har köpt två % tröjor.","varm","varma",["varm","varmt"],"pl"],
["Rummet är %.","mörk","mörkt",["mörk","mörka"],"predEtt"],
["Tröjan är för %.","dyr","dyr",["dyrt","dyra"],"predEn"],
["Äpplena är %.","söt","söta",["söt","sött"],"predPl"],
["Det är % ute idag.","kall","kallt",["kall","kalla"],"det"],
["Vädret är % idag.","fin","fint",["fin","fina"],"predEtt"],
["Katten är %.","liten","liten",["litet","små"],"liten"],
["Dörren är %.","öppen","öppen",["öppet","öppna"],"enAdj"],
["Tåget är % än bussen.","snabb","snabbare",["snabbast","snabbt"],"komp"],
["Det här är % än jag trodde.","lätt","lättare",["lättast","lätt"],"komp"],
["Min bror är % än jag.","gammal","äldre",["gammalare","äldst"],"<i>gammal</i> är oregelbundet: gammal, äldre, äldst."],
["Den här filmen är % än den förra.","bra","bättre",["bäst","bra"],"<i>bra</i> är oregelbundet: bra, bättre, bäst."],
["Hon har % pengar än jag.","mycket","mer",["mest","fler"],"<i>mycket</i>, <b>mer</b>, mest används med saker man inte kan räkna (pengar, tid, mat). <i>fler</i> används med saker man kan räkna."],
["Det finns % bilar i stan nu än förr.","många","fler",["mer","flest"],"<i>många</i>, <b>fler</b>, flest används med saker man kan räkna (bilar, människor)."],
["Juli är den % månaden.","varm","varmaste",["varmast","varmare"],"superlBest"],
["Tröjan är snygg, men den är tyvärr för %.","liten","liten",["litet","lilla"],"liten"],
["Jag har två % syskon.","ung","yngre",["yngst","ungare"],"<i>ung</i> är oregelbundet: ung, yngre, yngst."],
["Mount Everest är det % berget i världen.","hög","högsta",["högst","högre"],"superlBest"],
["Vilken % stad!","vacker","vacker",["vackert","vackra"],"<i>stad</i> är ett en-ord, så adjektivet har grundform: vilken vacker stad, vilket vackert hus."],
["Hon har köpt ett % bord.","billig","billigt",["billig","billiga"],"ett"],
["Pojkarna är %.","glad","glada",["glad","glatt"],"predPl"],
["Vi bor i en % lägenhet.","ljus","ljus",["ljust","ljusa"],"en"],
["Glöm inte den % jackan!","svart","svarta",["svart"],"best"],
["Hotellet är %.","dyr","dyrt",["dyr","dyra"],"predEtt"],
["Stockholm är Sveriges % stad.","stor","största",["störst","större"],"superlBest",1],
["Vem är % i din familj?","lång","längst",["längsta","längre"],"superlPred",1],
["Vädret var dåligt igår, men idag är det ännu %.","dålig","sämre",["sämst","sämsta"],"Efter <i>ännu</i> kommer komparativ. <i>dålig</i> har oftast komparativ <b>sämre</b> och superlativ <b>sämst</b>.",1],
["Det här är den % boken jag har läst.","bra","bästa",["bäst","bättre"],"superlBest",1],
["Det här är det % jag vet.","rolig","roligaste",["roligast","roligare"],"superlBest",1],
["Vem i laget har gjort % mål i år?","många","flest",["mest","flesta"],"<i>många</i>, fler, <b>flest</b> används med saker man kan räkna (mål, bilar).",1],
["Hon är den % i klassen.","ung","yngsta",["yngst","yngre"],"superlBest",1],
["Min syster är % av oss tre.","ung","yngst",["yngsta","yngre"],"superlPred",1],
["Min % bil är röd.","ny","nya",["ny","nytt"],"poss",1],
["Mormor bor i ett % hus.","liten","litet",["liten","lilla"],"liten",1],
["Den % flickan heter Elsa.","liten","lilla",["liten","små"],"liten",1],
["Fönstret är %.","öppen","öppet",["öppen","öppna"],"enAdj",1]
];

/* [mening med %, grundform, [lösningar], regel, anvisning (valfri)] */
const KOMP="komparativ", SUPERL="superlativ";
const D_TIPPEN = [
["De har två % barn.","liten",["små"],"liten"],
["Mormor har ett % piano.","gammal",["gammalt"],"gammal"],
["Mina föräldrar är ganska %.","gammal",["gamla"],"gammal"],
["Fönstren är %.","öppen",["öppna"],"enAdj"],
["Bananerna är inte % än.","mogen",["mogna"],"enAdj"],
["Barnet är fortfarande %.","vaken",["vaket"],"enAdj"],
["Hon har ett % rum.","egen",["eget"],"enAdj"],
["Frågorna var %.","enkel",["enkla"],"elAdj"],
["De har två % döttrar.","vacker",["vackra"],"elAdj"],
["Det är inte % att hon kommer.","säker",["säkert"],"det"],
["Han bor i ett % hus.","svart",["svart"],"kt"],
["Hon har ett % jobb.","intressant",["intressant"],"kt"],
["Barnet är så %.","söt",["sött"],"vt"],
["Vi har målat köket %.","vit",["vitt"],"vt"],
["Hon har ett % äpple.","röd",["rött"],"vd"],
["Barnet ser % ut.","glad",["glatt"],"vd"],
["Det är ett % band.","känd",["känt"],"kd"],
["Vi har köpt ett % hus.","ny",["nytt"],"vokal"],
["Inträdet är %.","fri",["fritt"],"vokal"],
["Hon har ett % halsband.","blå",["blått"],"vokal"],
["Hon har stora % ögon.","blå",["blå","blåa"],"blaa"],
["Det % huset är vårt.","grå",["grå","gråa"],"blaa"],
["Det var ett % förslag.","bra",["bra"],"obojl"],
["Kaffet är %.","gratis",["gratis"],"obojl"],
["Hon har ett % paraply.","rosa",["rosa"],"obojl"],
["Vi behöver ett % hus än det här.","stor",["större"],"<i>stor</i> är oregelbundet: stor, större, störst. Komparativ böjs inte."],
["Vänern är den % sjön i Sverige.","stor",["största"],"superlBest"],
["Maja är % i klassen.","lång",["längst","den längsta"],"<i>lång</i>, längre, längst. Utan artikel: <i>längst</i>. Med artikel: <i>den längsta</i>.",SUPERL],
["Vädret blir % i morgon.","dålig",["sämre","dåligare","värre"],"Komparativ av <i>dålig</i> är oftast <b>sämre</b>. <i>dåligare</i> finns också, och när något negativt ökar säger man ofta <i>värre</i>.",KOMP],
["Idag är det % folk här än igår.","mycket",["mer","mera"],"<i>mycket</i>, mer (eller mera), mest. Används med saker man inte kan räkna, som folk och pengar."],
["Det kom % gäster än vi trodde.","många",["fler","flera"],"<i>många</i>, fler (eller flera), flest. Används med saker man kan räkna."],
["Den här boken är % än den förra.","spännande",["mer spännande","mera spännande"],"lang",KOMP],
["Det var den % filmen i år.","spännande",["mest spännande"],"lang",SUPERL],
["Hennes nya jobb är % än det gamla.","intressant",["intressantare","mer intressant","mera intressant"],"<i>intressant</i> kan jämföras på två sätt: <i>intressantare</i> eller <i>mer intressant</i>. Båda är rätt.",KOMP],
["Vilket är världens % land?","liten",["minsta"],"<i>liten</i>, mindre, minst. Efter genitiv (världens) får superlativ <b>-a</b>: världens minsta."],
["Hon har % syskon än jag.","få",["färre"],"<i>få</i> är oregelbundet: få, färre, färst."],
];

D_WAHL.forEach(([satz,grund,richtig,falsch,r,schwer])=>{
  neueKarte({
    deck:"adjektiv", typ:"wahl", schwer:!!schwer,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Vilken form av <i>"+esc(grund)+"</i> passar?",
    optionen:[richtig].concat(falsch), richtig:richtig,
    erklaerung:regel(r)+" &ndash; "+esc(satz.replace("%",richtig))
  });
});

D_TIPPEN.forEach(([satz,grund,loesungen,r,form])=>{
  neueKarte({
    deck:"adjektiv", typ:"tippen", schwer:true,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:form
      ? "Skriv "+form+" av <i>"+esc(grund)+"</i>."
      : "Skriv rätt form av <i>"+esc(grund)+"</i>.",
    loesungen:loesungen,
    erklaerung:regel(r)+" &ndash; "+esc(satz.replace("%",loesungen[0]))
  });
});

})();
