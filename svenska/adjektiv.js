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

REGELSEITEN.adjektiv=`
<h2>Vad är ett adjektiv?</h2>
<p>Ett <b>adjektiv</b> beskriver hur något är: <i>stor, ny, röd, trött</i>. På svenska ändrar adjektivet form efter substantivet det hör till. Det kallas att adjektivet <b>böjs</b>. Formen beror på tre saker:</p>
<ul>
<li><b>genus</b>: en-ord eller ett-ord</li>
<li><b>tal</b>: singular eller plural</li>
<li><b>form</b>: obestämd form (en bil) eller bestämd form (den bilen)</li>
</ul>
<p>Tyskan har dessutom kasus (<i>großer, großen, großem</i>). Det har svenskan inte. Därför är det bara tre former att lära sig: <b>grundform</b>, <b>t-form</b> och <b>a-form</b>.</p>

<h2>De tre formerna</h2>
<div class="tabelle"><table>
<thead><tr><th></th><th>en-ord</th><th>ett-ord</th><th>plural</th><th>bestämd form</th></tr></thead>
<tbody>
<tr><td>stor</td><td>en stor bil</td><td>ett stor<b>t</b> hus</td><td>stor<b>a</b> bilar</td><td>den stor<b>a</b> bilen</td></tr>
<tr><td>röd</td><td>en röd tröja</td><td>ett rö<b>tt</b> äpple</td><td>rö<b>da</b> tröjor</td><td>den rö<b>da</b> tröjan</td></tr>
<tr><td>ny</td><td>en ny bil</td><td>ett ny<b>tt</b> hus</td><td>ny<b>a</b> bilar</td><td>det ny<b>a</b> huset</td></tr>
</tbody></table></div>
<ul>
<li><b>Grundform</b> (ingen ändelse): med en-ord i obestämd form singular.</li>
<li><b>-t</b>: med ett-ord i obestämd form singular.</li>
<li><b>-a</b>: i plural och i bestämd form, både med en-ord och ett-ord.</li>
</ul>
<h3>a-formen efter ägarord och genitiv</h3>
<p>Efter ett ägarord (<i>min, din, hans, vår</i>) eller ett genitiv-s (<i>Annas, Sveriges</i>) får adjektivet också <b>-a</b>. Substantivet står ändå i obestämd form.</p>
<p class="beispiel">min nya bil, Annas gamla hus, vårt stora kök</p>
<p>I äldre och formell svenska kan adjektivet få <b>-e</b> när det gäller en man i bestämd form: <i>den gamle mannen</i>. I vanlig svenska går <i>den gamla mannen</i> lika bra.</p>

<h2>Efter är och blir</h2>
<p>Står adjektivet efter <i>är</i>, <i>blir</i> eller <i>verkar</i>, böjs det efter <b>subjektet</b> (den eller det som meningen handlar om).</p>
<p class="beispiel">Bilen är ny. (en bil)<br>Huset är nytt. (ett hus)<br>Bilarna är nya. (plural)</p>
<p>Här skiljer sig svenska tydligt från tyskan. På tyska böjs adjektivet inte efter <i>sein</i>: <i>Das Haus ist groß, die Häuser sind groß</i>. På svenska måste du böja: <b>Huset är stort. Husen är stora.</b></p>
<p>När <b>det</b> är ett formellt subjekt (som tyskans <i>es</i>) får adjektivet <b>-t</b>: <i>Det är kallt ute. Det är inte säkert att hon kommer.</i></p>
<div class="merke"><p>Fråga alltid: vem eller vad är det som är så? <i>Vattnet är kallt</i>, för det heter <i>ett vatten</i>.</p></div>

<h2>Hur bildas t-formen?</h2>
<p>Oftast lägger man bara till <b>-t</b>: stor, stort; fin, fint; rolig, roligt. Men ibland ändras ordet.</p>
<div class="tabelle"><table>
<thead><tr><th>Adjektivet slutar på</th><th>t-form</th><th>Exempel</th></tr></thead>
<tbody>
<tr><td>betonad vokal</td><td><b>-tt</b></td><td>ny, nytt; fri, fritt; blå, blått</td></tr>
<tr><td>vokal + d (korta ord)</td><td><b>-tt</b></td><td>röd, rött; god, gott; glad, glatt</td></tr>
<tr><td>lång vokal + t</td><td><b>-tt</b></td><td>vit, vitt; söt, sött</td></tr>
<tr><td>konsonant + d</td><td>d blir <b>t</b></td><td>känd, känt; hård, hårt</td></tr>
<tr><td>konsonant + t</td><td>inget nytt t</td><td>svart, svart; intressant, intressant; lätt, lätt</td></tr>
<tr><td>-en</td><td><b>-et</b></td><td>öppen, öppet; egen, eget; vaken, vaket</td></tr>
</tbody></table></div>

<h2>Hur bildas a-formen?</h2>
<p>Oftast lägger man bara till <b>-a</b>: stor, stora; trött, trötta. Specialfall:</p>
<ul>
<li>Adjektiv på <b>-en</b> får <b>-na</b>: öppen, öppna; mogen, mogna; egen, egna.</li>
<li>Adjektiv på <b>-el</b> och <b>-er</b> tappar <i>e</i>: enkel, enkla; vacker, vackra; säker, säkra.</li>
<li><b>gammal</b> blir <b>gamla</b> (t-form: gammalt).</li>
<li><b>blå</b> och <b>grå</b> har två former: blå eller blåa, grå eller gråa.</li>
</ul>

<h2>Liten</h2>
<p><b>liten</b> är det mest oregelbundna adjektivet. Lär dig alla former:</p>
<div class="tabelle"><table>
<thead><tr><th>en-ord</th><th>ett-ord</th><th>plural</th><th>bestämd singular</th><th>bestämd plural</th></tr></thead>
<tbody>
<tr><td>en liten bil</td><td>ett litet hus</td><td>små bilar</td><td>den lilla bilen</td><td>de små bilarna</td></tr>
</tbody></table></div>
<p class="beispiel">Katten är liten. Rummet är litet. Barnen är små.</p>

<h2>Adjektiv som inte böjs</h2>
<p>Några adjektiv har alltid samma form: <b>bra, extra, gratis, rosa, lila, kul</b>.</p>
<p class="beispiel">ett bra förslag, Kaffet är gratis, ett rosa paraply</p>

<h2>Komparation</h2>
<p><b>Komparation</b> betyder att man jämför. Det finns tre steg: <b>grundform</b> (stor), <b>komparativ</b> (större) och <b>superlativ</b> (störst).</p>
<h3>Regelbundna adjektiv</h3>
<p>De flesta adjektiv får <b>-are</b> och <b>-ast</b>: billig, billigare, billigast; snabb, snabbare, snabbast.</p>
<p>Jämförelseordet är <b>än</b> (tyska <i>als</i>): <i>Tåget är snabbare än bussen.</i> För att säga <i>so ... wie</i> använder man <b>lika ... som</b>: <i>Hon är lika lång som jag.</i></p>
<h3>Oregelbundna adjektiv</h3>
<div class="tabelle"><table>
<thead><tr><th>Grundform</th><th>Komparativ</th><th>Superlativ</th></tr></thead>
<tbody>
<tr><td>bra</td><td>bättre</td><td>bäst</td></tr>
<tr><td>dålig</td><td>sämre (värre)</td><td>sämst (värst)</td></tr>
<tr><td>gammal</td><td>äldre</td><td>äldst</td></tr>
<tr><td>ung</td><td>yngre</td><td>yngst</td></tr>
<tr><td>stor</td><td>större</td><td>störst</td></tr>
<tr><td>liten</td><td>mindre</td><td>minst</td></tr>
<tr><td>lång</td><td>längre</td><td>längst</td></tr>
<tr><td>hög</td><td>högre</td><td>högst</td></tr>
<tr><td>låg</td><td>lägre</td><td>lägst</td></tr>
<tr><td>tung</td><td>tyngre</td><td>tyngst</td></tr>
<tr><td>få</td><td>färre</td><td>färst</td></tr>
<tr><td>många</td><td>fler (flera)</td><td>flest</td></tr>
<tr><td>mycket</td><td>mer (mera)</td><td>mest</td></tr>
</tbody></table></div>
<p><b>sämre</b> är den vanliga formen av <i>dålig</i>. <b>värre</b> används ofta när något negativt blir ännu mer negativt: <i>Förkylningen blev värre.</i></p>
<h3>Mer eller fler?</h3>
<p>Tyskan har bara <i>mehr</i>. Svenskan har två ord:</p>
<ul>
<li><b>mer</b> med saker man inte kan räkna: mer pengar, mer tid, mer folk</li>
<li><b>fler</b> med saker man kan räkna: fler bilar, fler gäster</li>
</ul>
<p>Samma sak i superlativ: <b>mest</b> (mest pengar) och <b>flest</b> (flest mål).</p>
<h3>Mer och mest</h3>
<p>Långa adjektiv och adjektiv på <b>-ande, -ende</b> och <b>-isk</b> jämförs med <b>mer</b> och <b>mest</b>: <i>mer spännande, mest spännande; mer praktisk</i>. Vissa adjektiv kan jämföras på båda sätten: <i>intressantare</i> eller <i>mer intressant</i>.</p>
<h3>Böjning av komparativ och superlativ</h3>
<ul>
<li><b>Komparativ böjs aldrig</b>: en större bil, ett större hus, större bilar.</li>
<li><b>Superlativ utan artikel</b> efter <i>är</i> har grundform: <i>Maja är längst. Min syster är yngst.</i></li>
<li><b>Superlativ i bestämd form</b> (efter den/det/de eller genitiv) får <b>-a</b>. <b>-ast</b> blir <b>-aste</b>: den största sjön, Sveriges största stad, den varmaste månaden, det roligaste jag vet.</li>
</ul>
<p>Efter <b>ännu</b> (tyska <i>noch</i>) kommer komparativ: <i>Idag är det ännu sämre.</i></p>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>Inget -t efter är:</b> <i>Huset är stor</i>. Rätt: <b>Huset är stort</b>.</li>
<li><b>Inget -a i plural efter är:</b> <i>Barnen är trött</i>. Rätt: <b>Barnen är trötta</b>.</li>
<li><b>Fel t-form:</b> <i>ett röt äpple, ett nyt hus</i>. Rätt: <b>rött, nytt</b>.</li>
<li><b>Böjning av bra:</b> <i>ett brat förslag</i>. <i>bra</i> böjs aldrig.</li>
<li><b>Mer i stället för fler:</b> <i>mer bilar</i>. Rätt: <b>fler bilar</b>.</li>
<li><b>Som i stället för än:</b> <i>större som</i>. Rätt: <b>större än</b>.</li>
<li><b>Fel liten-form:</b> <i>de litna barnen</i>. Rätt: <b>de små barnen</b>.</li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>en-ord: grundform. ett-ord: -t. Plural och bestämd form: -a.</li>
<li>Efter <i>är</i> böjs adjektivet efter subjektet.</li>
<li>liten, litet, små, lilla. gammal, gammalt, gamla.</li>
<li>bra, gratis, rosa, kul böjs inte.</li>
<li>Komparation: -are, -ast eller mer, mest. Många vanliga adjektiv är oregelbundna.</li>
<li>Komparativ böjs inte. Superlativ i bestämd form får -a eller -e: största, varmaste.</li>
</ul>
`;
