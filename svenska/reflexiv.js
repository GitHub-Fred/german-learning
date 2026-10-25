(()=>{"use strict";
const DECK="reflexiv";

const REGLER={
pron:"Reflexiva pronomen: jag &ndash; <b>mig</b>, du &ndash; <b>dig</b>, han/hon/den/det &ndash; <b>sig</b>, vi &ndash; <b>oss</b>, ni &ndash; <b>er</b>, de &ndash; <b>sig</b>.",
sig3:"<b>sig</b> används bara i tredje person: han, hon, den, det, man och de. Med jag, du, vi och ni blir det mig, dig, oss och er.",
man:"Efter <b>man</b> är det reflexiva pronomenet <b>sig</b>.",
sig_honom:"Om det är samma person som subjektet blir det <b>sig</b>, inte honom eller henne.",
bisats:"Det reflexiva pronomenet följer subjektet, också i bisatser och efter inversion.",
trivas:"<b>trivas</b> slutar redan på -s och har aldrig ett reflexivt pronomen.",
minnas:"<b>minnas</b> och <b>komma ihåg</b> har inget reflexivt pronomen.",
skammas:"<b>skämmas</b> slutar redan på -s och har aldrig ett reflexivt pronomen.",
fram:"<b>se fram emot</b> något har inget reflexivt pronomen.",
undra:"<b>undra</b> har inget reflexivt pronomen.",
gifta:"<b>gifta sig</b> är reflexivt på svenska.",
lara:"<b>lära sig</b> = få ny kunskap. <i>lära någon något</i> = ge någon kunskap.",
refl:"Här behövs ett reflexivt pronomen: "
};

/* [mening, rätt, fel, regel] */
const D_PRON=[
["Jag tvättar % och borstar tänderna.","mig",["sig","jag"],"sig3"],
["Du måste skynda %, bussen går snart.","dig",["sig","du"],"sig3"],
["Hon kammar % framför spegeln.","sig",["hon","sin"],"pron"],
["Vi sätter % vid bordet och äter.","oss",["sig","vi"],"sig3"],
["Ni måste förbereda % inför provet.","er",["sig","ni"],"sig3"],
["Min syster ska gifta % med sin pojkvän.","sig",["hon","sin"],"pron"],
["Jag känner % lite trött idag.","mig",["sig","jag"],"sig3"],
["Han rakar % varje morgon.","sig",["han","sin"],"pron"],
["Sätt %, ni två!","er",["sig","ni"],"sig3"],
["Barnen klär på % själva nu.","sig",["de"],"pron"],
["Jag har bestämt %. Jag flyttar till Malmö.","mig",["sig","jag"],"sig3"],
["Vi måste skynda %, filmen börjar snart.","oss",["sig","vi"],"sig3"],
["Kan du koncentrera % lite?","dig",["sig","du"],"sig3"],
["Hon lägger % tidigt varje kväll.","sig",["hon","sin"],"pron"],
["Jag lär % svenska på kvällarna.","mig",["sig","jag"],"sig3"],
["Har du ångrat %?","dig",["sig","du"],"sig3"],
["Man måste vila % ibland.","sig",["man","mig"],"man"],
["Erik känner % sjuk idag.","sig",["honom","han"],"sig_honom"],
["Anna bestämde % för att stanna hemma.","sig",["henne","hon"],"sig_honom"],
["Ni borde vila % lite.","er",["sig","ni"],"sig3"],
["Vi har lärt % mycket i kursen.","oss",["sig","vi"],"sig3"],
["Rör % inte! Jag ska ta ett foto.","dig",["sig","du"],"sig3"],
["Vi ska lägga % tidigt ikväll.","oss",["sig","vi"],"sig3"],
["Han satte % bredvid mig.","sig",["han","sin"],"pron"],
["Hur känner ni % idag?","er",["sig","ni"],"sig3"],
["Jag ska klä på % och sedan går vi.","mig",["sig","jag"],"sig3"]
];

/* [verb, rätt mening, fel mening, regel] */
const D_FALLA=[
["trivas","Jag trivs bra i Sverige.","Jag trivs mig bra i Sverige.","trivas"],
["minnas","Jag minns inte hans namn.","Jag minns mig inte hans namn.","minnas"],
["komma ihåg","Jag kommer ihåg det.","Jag kommer mig ihåg det.","minnas"],
["skämmas","Han skäms för det han sa.","Han skäms sig för det han sa.","skammas"],
["se fram emot","Jag ser fram emot semestern.","Jag ser mig fram emot semestern.","fram"],
["undra","Jag undrar om hon kommer.","Jag undrar mig om hon kommer.","undra"],
["gifta","Hon gifte sig förra året.","Hon gifte förra året.","gifta"],
["lära","Jag vill lära mig spela gitarr.","Jag vill lära spela gitarr.","lara"]
];

/* [mening, pronomen] */
const D_PRON_TIPPEN=[
["Hon sa att hon inte kände % bra.","sig"],
["Igår kände jag % mycket bättre.","mig"],
["Vet du om de har bestämt % än?","sig"],
["När vi hade satt %, började filmen.","oss"],
["Om du skyndar %, hinner du med tåget.","dig"],
["Man vet aldrig hur man ska bete %.","sig"]
];

/* [mening, infinitiv, lösningar, regel] */
const D_VERB_TIPPEN=[
["Jag var trött, så jag % redan klockan nio igår.","lägga",["lade mig","la mig"],"refl"],
["Hon har ett nytt jobb och hon % mycket bra där.","trivas",["trivs"],"trivas"],
["Vi % förra året i Göteborg.","gifta",["gifte oss"],"refl"],
["Förlåt, jag % inte vad du heter.","minnas",["minns"],"minnas"],
["Du borde % för det du sa!","skämmas",["skämmas"],"skammas"],
["Vi måste %, tåget går om fem minuter.","skynda",["skynda oss"],"refl"],
["Han har % för att sluta röka.","bestämma",["bestämt sig"],"refl"],
["Jag % varje morgon innan jag åker till jobbet.","raka",["rakar mig"],"refl"],
["Jag kan inte % när det är så mycket ljud.","koncentrera",["koncentrera mig"],"refl"],
["Först sa han ja, men han % sedan.","ångra",["ångrade sig"],"refl"]
];

const fyll=(mening,ord)=>mening.replace("%",ord);

D_PRON.forEach(([mening,ratt,fel,regel])=>{
  neueKarte({
    deck:DECK, typ:"wahl",
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:"Vilket pronomen passar?",
    optionen:[ratt].concat(fel), richtig:ratt,
    erklaerung:REGLER[regel]+" &ndash; "+esc(fyll(mening,ratt))
  });
});

D_FALLA.forEach(([verb,ratt,fel,regel])=>{
  neueKarte({
    deck:DECK, typ:"wahl", schwer:true,
    rohfrage:ratt,
    frage:"<i>"+esc(verb)+"</i>",
    anweisung:"Vilken mening är rätt?",
    optionen:[ratt,fel], richtig:ratt,
    erklaerung:REGLER[regel]+" &ndash; "+esc(ratt)
  });
});

D_PRON_TIPPEN.forEach(([mening,pron])=>{
  neueKarte({
    deck:DECK, typ:"tippen", schwer:true,
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:"Skriv det reflexiva pronomenet.",
    loesungen:[pron],
    erklaerung:REGLER.bisats+" "+REGLER.pron+" &ndash; "+esc(fyll(mening,pron))
  });
});

D_VERB_TIPPEN.forEach(([mening,inf,losningar,regel])=>{
  neueKarte({
    deck:DECK, typ:"tippen", schwer:true,
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:"Skriv rätt form av <i>"+esc(inf)+"</i>. Lägg till ett reflexivt pronomen om det behövs.",
    loesungen:losningar,
    erklaerung:(regel==="refl"?REGLER.refl+"<b>"+esc(inf)+" sig</b>.":REGLER[regel])+" &ndash; "+esc(fyll(mening,losningar[0]))
  });
});
})();

REGELSEITEN.reflexiv=`
<h2>Vad är ett reflexivt verb?</h2>
<p>Ett <b>reflexivt verb</b> har ett pronomen som syftar tillbaka på subjektet, alltså på samma person: <i>Jag tvättar <b>mig</b>.</i> Pronomenet kallas <b>reflexivt pronomen</b>. Tyskan har samma sak: <i>Ich wasche mich.</i></p>

<h2>De reflexiva pronomenen</h2>
<div class="tabelle"><table>
<thead><tr><th>Subjekt</th><th>Reflexivt pronomen</th><th>Exempel</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>jag</td><td><b>mig</b></td><td>Jag känner mig trött.</td><td><i>mich, mir</i></td></tr>
<tr><td>du</td><td><b>dig</b></td><td>Du måste skynda dig.</td><td><i>dich, dir</i></td></tr>
<tr><td>han, hon, den, det, man</td><td><b>sig</b></td><td>Hon kammar sig.</td><td><i>sich</i></td></tr>
<tr><td>vi</td><td><b>oss</b></td><td>Vi sätter oss.</td><td><i>uns</i></td></tr>
<tr><td>ni</td><td><b>er</b></td><td>Ni borde vila er.</td><td><i>euch</i></td></tr>
<tr><td>de</td><td><b>sig</b></td><td>Barnen klär på sig.</td><td><i>sich</i></td></tr>
</tbody></table></div>
<p>Precis som på tyska finns <b>sig</b> bara i tredje person. Med <i>jag, du, vi, ni</i> används de vanliga objektsformerna: mig, dig, oss, er. Tyskans skillnad mellan <i>mich</i> och <i>mir</i> finns inte.</p>
<p>Efter <b>man</b> är det reflexiva pronomenet också <b>sig</b>: <i>Man måste vila sig ibland.</i></p>

<h3>Sig eller honom?</h3>
<p>Är det samma person som subjektet, blir det <b>sig</b>. Är det en annan person, blir det <b>honom, henne, dem</b>:</p>
<p class="beispiel">Erik känner sig sjuk. (Erik själv)<br>Erik tvättar honom. (en annan person, till exempel ett barn)</p>

<h2>Var står pronomenet?</h2>
<p>Det reflexiva pronomenet står där andra objekt står: efter verbet. Vid omvänd ordföljd kommer det efter subjektet, och i perfekt efter supinum.</p>
<p class="beispiel">Igår kände jag mig mycket bättre.<br>Han har bestämt sig för att sluta röka.<br>Hon sa att hon inte kände sig bra.<br>När vi hade satt oss, började filmen.</p>
<p>Pronomenet följer alltid subjektet i sin egen sats. I en bisats med subjektet <i>du</i> blir det alltså <i>dig</i>: <i>Om du skyndar dig, hinner du med tåget.</i></p>

<h2>Reflexiva verb på både svenska och tyska</h2>
<p>Många verb är reflexiva i båda språken. De är lätta:</p>
<div class="tabelle"><table>
<thead><tr><th>Svenska</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>tvätta sig, raka sig, kamma sig</td><td><i>sich waschen, sich rasieren, sich kämmen</i></td></tr>
<tr><td>klä på sig</td><td><i>sich anziehen</i></td></tr>
<tr><td>sätta sig, lägga sig</td><td><i>sich setzen, sich hinlegen</i></td></tr>
<tr><td>känna sig</td><td><i>sich fühlen</i></td></tr>
<tr><td>bestämma sig</td><td><i>sich entscheiden</i></td></tr>
<tr><td>skynda sig</td><td><i>sich beeilen</i></td></tr>
<tr><td>koncentrera sig</td><td><i>sich konzentrieren</i></td></tr>
<tr><td>förbereda sig</td><td><i>sich vorbereiten</i></td></tr>
<tr><td>röra sig</td><td><i>sich bewegen</i></td></tr>
<tr><td>bete sig</td><td><i>sich benehmen</i></td></tr>
<tr><td>vila sig</td><td><i>sich ausruhen</i></td></tr>
<tr><td>vänja sig vid</td><td><i>sich gewöhnen an</i></td></tr>
</tbody></table></div>

<h2>Reflexiva bara på svenska</h2>
<p>Några verb är reflexiva på svenska men inte på tyska. Här glömmer tyskar ofta <i>sig</i>:</p>
<ul>
<li><b>gifta sig</b> (<i>heiraten</i>): <i>Hon gifte sig förra året.</i> Inte: <i>Hon gifte förra året.</i></li>
<li><b>lära sig</b> (<i>lernen</i>): <i>Jag vill lära mig spela gitarr.</i></li>
<li><b>ångra sig</b> (<i>es sich anders überlegen, bereuen</i>): <i>Först sa han ja, men sedan ångrade han sig.</i></li>
</ul>
<p><b>lära sig</b> och <b>lära</b> är olika: <i>Jag lär mig svenska</i> (<i>ich lerne</i>). <i>Hon lär mig svenska</i> (<i>sie bringt mir bei</i>).</p>

<h2>Reflexiva bara på tyska</h2>
<p>Andra verb är reflexiva på tyska men <b>inte</b> på svenska. Här lägger tyskar ofta till ett onödigt <i>sig</i>:</p>
<div class="tabelle"><table>
<thead><tr><th>Tyska</th><th>Svenska</th><th>Exempel</th></tr></thead>
<tbody>
<tr><td><i>sich wohlfühlen</i></td><td><b>trivas</b></td><td>Jag trivs bra i Sverige.</td></tr>
<tr><td><i>sich erinnern</i></td><td><b>minnas</b>, <b>komma ihåg</b></td><td>Jag minns inte hans namn.</td></tr>
<tr><td><i>sich schämen</i></td><td><b>skämmas</b></td><td>Han skäms för det han sa.</td></tr>
<tr><td><i>sich freuen auf</i></td><td><b>se fram emot</b></td><td>Jag ser fram emot semestern.</td></tr>
<tr><td><i>sich fragen</i></td><td><b>undra</b></td><td>Jag undrar om hon kommer.</td></tr>
<tr><td><i>sich verlieben</i></td><td><b>bli kär</b></td><td>Han blev kär i henne.</td></tr>
<tr><td><i>sich entschuldigen</i></td><td><b>be om ursäkt</b></td><td>Jag vill be om ursäkt.</td></tr>
</tbody></table></div>
<p>Lägg märke till att många av dem slutar på <b>-s</b>: <i>trivas, minnas, skämmas</i>. Ett verb som slutar på -s kan aldrig ha ett reflexivt pronomen. Mer om dem finns i högen <i>S-verb och passiv</i>.</p>
<div class="merke"><p>Verb på <b>-s</b> (trivs, minns, skäms) tar aldrig <i>sig</i>. Och <b>gifta sig</b> och <b>lära sig</b> behöver alltid <i>sig</i>.</p></div>

<h2>Sig, sig själv och varandra</h2>
<ul>
<li><b>sig själv</b> betonar att det verkligen är samma person, som tyskans <i>sich selbst</i>: <i>Han tänker bara på sig själv.</i> Med <i>själv/själva</i> efter verbet kan man också betona att någon gör något utan hjälp: <i>Barnen klär på sig själva.</i></li>
<li><b>varandra</b> betyder <i>einander</i>. Tyskan säger ofta <i>sich</i>: <i>Sie lieben sich.</i> På svenska går det inte, där heter det <b>De älskar varandra.</b> Ibland används ett s-verb: <i>Vi ses! Vi träffas imorgon.</i></li>
</ul>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>sig med jag eller vi:</b> <i>Jag tvättar sig.</i> Rätt: <b>Jag tvättar mig.</b></li>
<li><b>honom i stället för sig:</b> <i>Erik känner honom sjuk.</i> Rätt: <b>Erik känner sig sjuk.</b></li>
<li><b>sig efter -s:</b> <i>Jag trivs mig, jag minns mig.</i> Rätt: <b>Jag trivs, jag minns.</b></li>
<li><b>Glömt sig:</b> <i>Vi gifte i fjol, jag lär svenska.</i> Rätt: <b>Vi gifte oss, jag lär mig svenska.</b></li>
<li><b>sig för varandra:</b> <i>De älskar sig</i> betyder att var och en älskar sig själv. Rätt: <b>De älskar varandra.</b></li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>mig, dig, sig, oss, er, sig. sig bara i tredje person (och efter man).</li>
<li>Samma person som subjektet: sig. Annan person: honom, henne, dem.</li>
<li>Bara svenska: gifta sig, lära sig, ångra sig.</li>
<li>Bara tyska: trivas, minnas, komma ihåg, skämmas, se fram emot, undra, bli kär.</li>
<li>einander = varandra.</li>
</ul>
`;
