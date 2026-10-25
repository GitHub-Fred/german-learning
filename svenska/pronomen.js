(()=>{"use strict";

const REGLER = {
  obj: "Som objekt används objektsform: mig, dig, honom, henne, oss, er, dem.",
  subj: "Subjektet har subjektsform: jag, du, han, hon, vi, ni, de.",
  prep: "Efter en preposition används alltid objektsform: mig, dig, honom, henne, oss, er, dem.",
  bisats: "I bisatsen är pronomenet subjekt. Då används subjektsform, även efter <i>att, om, var, vad</i>.",
  den: "<i>den</i> syftar tillbaka på ett en-ord.",
  det: "<i>det</i> syftar tillbaka på ett ett-ord.",
  de: "Plural: <b>de</b> som subjekt, <b>dem</b> som objekt.",
  detSats: "<i>det</i> kan syfta på en hel mening eller en situation.",
  presDet: "När man visar eller presenterar något (det är, det var) används <i>det</i>, även för en-ord och personer.",
  deSom: "<i>de som</i>: är pronomenet subjekt i huvudsatsen används <b>de</b>.",
  demSom: "<i>dem som</i>: är pronomenet objekt i huvudsatsen används <b>dem</b>.",
  man: "<i>man</i> betyder människor i allmänhet. Det är subjektsformen.",
  en: "<i>man</i> har objektsformen <b>en</b>.",
  ens: "<i>man</i> har ägarformen <b>ens</b>.",
  an: "Efter <i>än</i> går både subjektsform och objektsform bra: äldre än jag, äldre än mig. I formell text väljer man oftast <i>jag</i>."
};

/* [mening med %, rätt, [fel], regel, svår] */
const D_WAHL = [
["Kan du hjälpa %?","mig",["jag"],"obj"],
["Jag ringer % i kväll, okej?","dig",["du"],"obj"],
["Har du sett Erik? Nej, jag har inte sett %.","honom",["han"],"obj"],
["Anna är sjuk. Vi ska besöka % i morgon.","henne",["hon"],"obj"],
["Tack för att ni hjälpte %!","oss",["vi"],"obj"],
["Lisa och Per, vi har saknat %!","er",["ni"],"obj"],
["Vet du var Maria är? Jag har inte sett % idag.","henne",["hon"],"obj"],
["Jag tycker mycket om %, Sara.","dig",["du"],"obj"],
["Barnen leker ute. Jag ser % från fönstret.","dem",["de"],"de"],
["Mina kusiner? % bor i Göteborg.","De",["Dem"],"de"],
["Kalle? % jobbar på banken.","Han",["Honom"],"subj"],
["Var är nyckeln? Jag hittar inte %.","den",["det","dem"],"den"],
["Var är mitt paraply? Jag hittar inte %.","det",["den","dem"],"det"],
["Var är mina glasögon? Jag hittar inte %.","dem",["den","det","de"],"de"],
["Jag har köpt en ny soffa. % är jätteskön.","Den",["Det","De"],"den"],
["Har du läst brevet? Ja, jag läste % igår.","det",["den"],"det"],
["Äpplena är goda. Var köpte du %?","dem",["de","den"],"de"],
["Tomaterna? % ligger i kylskåpet.","De",["Dem","Den"],"de"],
["Har ni sett min katt? Nej, vi har inte sett %.","den",["det"],"den"],
["Huset är gammalt, men vi tycker om %.","det",["den"],"det"],
["Boken? Jag har redan läst %.","den",["det"],"den"],
["Hon har flyttat till Spanien. Visste du %?","det",["den"],"detSats"],
["Vad är det där? % är en ekorre.","Det",["Den"],"presDet"],
["Vem är det där? % är min syster.","Det",["Den"],"presDet"],
["I Sverige tar % av sig skorna inomhus.","man",["en","ens"],"man"],
["% vet aldrig vad som kan hända.","Man",["En","Ens"],"man"],
["Det är skönt när någon hjälper %.","en",["man","ens"],"en"],
["Det gör % glad att se solen.","en",["man","ens"],"en"],
["Det känns bra när % vänner ringer.","ens",["man","en"],"ens"],
["Mamma ringde och frågade efter %.","dig",["du"],"prep"],
["Kommer du med % på bio?","oss",["vi"],"prep"],
["Jag har en present till %, pappa!","dig",["du"],"prep"],
["Varför tittar du på %? Jag har inte gjort något!","mig",["jag"],"prep"],
["Har du pratat med Jonas? Ja, jag pratade med % igår.","honom",["han"],"prep"],
["Jag vet inte var % bor.","de",["dem"],"bisats",1],
["Jag frågade om % ville följa med.","de",["dem"],"bisats",1],
["Tror du att % kommer i tid?","de",["dem"],"bisats",1],
["Jag gav % nycklarna.","dem",["de"],"de",1],
["% som vill kan gå hem nu.","De",["Dem"],"deSom",1],
["Jag känner % som bor i huset bredvid.","dem",["de"],"demSom",1]
];

/* [mening med %, form som ska ändras (null = välj själv), [lösningar], regel] */
const D_TIPPEN = [
["Jag vet att % har rätt.","han",["han"],"bisats"],
["Jag undrar vad % vill.","han",["han"],"bisats"],
["Tror du att % kommer?","hon",["hon"],"bisats"],
["Hon frågade om % ville ha kaffe.","jag",["jag"],"bisats"],
["Jag vet inte om % hinner.","de",["de"],"bisats"],
["Vi pratade om % hela kvällen.","de",["dem"],"prep"],
["Hon bor nära %.","vi",["oss"],"prep"],
["Kan jag sitta bredvid %?","du",["dig"],"prep"],
["Jag har köpt blommor till %.","hon",["henne"],"prep"],
["Är det här till %?","jag",["mig"],"prep"],
["Han tittade på % och log.","vi",["oss"],"prep"],
["Ska vi ses hos % eller hos oss?","ni",["er"],"prep"],
["Jag hälsade på % när jag var i Stockholm.","de",["dem"],"obj"],
["Jag har inte sett % på länge.","ni",["er"],"obj"],
["Hon är två år äldre än %.","jag",["jag","mig"],"an"],
["% som bor här är trevliga.","de",["de"],"deSom"],
["Barnen? Jag hämtar % klockan fyra.",null,["dem"],"de"],
["Var är tidningen? Jag har lagt % på bordet.",null,["den"],"den"],
["Huset? Vi sålde % förra året.",null,["det"],"det"],
["Skorna var för små, så jag lämnade tillbaka %.",null,["dem"],"de"],
["Glöm inte blommorna! % måste få vatten.",null,["de"],"de"],
["Det är svårt när ingen lyssnar på %.","man",["en"],"en"],
["Man blir arg när grannarna väcker % mitt i natten.","man",["en"],"en"],
["Det är tråkigt när % cykel blir stulen.","man",["ens"],"ens"]
];

const stor=(satz,ord)=>satz.startsWith("%")?ord.charAt(0).toUpperCase()+ord.slice(1):ord;

D_WAHL.forEach(([satz,richtig,falsch,r,schwer])=>{
  neueKarte({
    deck:"pronomen", typ:"wahl", schwer:!!schwer,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Vilket pronomen passar?",
    optionen:[richtig].concat(falsch), richtig:richtig,
    erklaerung:REGLER[r]+" &ndash; "+esc(satz.replace("%",richtig))
  });
});

D_TIPPEN.forEach(([satz,grund,loesungen,r])=>{
  neueKarte({
    deck:"pronomen", typ:"tippen", schwer:true,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:grund
      ? "Skriv rätt form av <i>"+esc(grund)+"</i>."
      : "Skriv rätt pronomen: den, det, de eller dem.",
    loesungen:loesungen,
    erklaerung:REGLER[r]+" &ndash; "+esc(satz.replace("%",stor(satz,loesungen[0])))
  });
});

})();

REGELSEITEN.pronomen=`
<h2>Personliga pronomen</h2>
<p>Ett <b>pronomen</b> är ett litet ord som står i stället för ett substantiv eller ett namn: <i>Erik är trött. <b>Han</b> har jobbat länge.</i></p>
<p>Personliga pronomen har olika former beroende på vilken roll de har i meningen:</p>
<ul>
<li><b>Subjektsform</b>: pronomenet är <b>subjekt</b>, alltså den som gör något eller den som meningen handlar om. <i><b>Jag</b> läser.</i></li>
<li><b>Objektsform</b>: pronomenet är <b>objekt</b>, alltså den som något händer med. <i>Erik ser <b>mig</b>.</i></li>
<li><b>Ägarform</b>: pronomenet visar vem som äger något. <i>Det är <b>min</b> bok.</i></li>
</ul>
<div class="tabelle"><table>
<thead><tr><th>Subjekt</th><th>Objekt</th><th>Ägare</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>jag</td><td>mig</td><td>min, mitt, mina</td><td><i>ich, mich/mir</i></td></tr>
<tr><td>du</td><td>dig</td><td>din, ditt, dina</td><td><i>du, dich/dir</i></td></tr>
<tr><td>han</td><td>honom</td><td>hans</td><td><i>er, ihn/ihm</i></td></tr>
<tr><td>hon</td><td>henne</td><td>hennes</td><td><i>sie, sie/ihr</i></td></tr>
<tr><td>hen</td><td>hen (henom)</td><td>hens</td><td>-</td></tr>
<tr><td>den</td><td>den</td><td>dess</td><td><i>er, sie, es</i> (Dinge)</td></tr>
<tr><td>det</td><td>det</td><td>dess</td><td><i>es</i></td></tr>
<tr><td>vi</td><td>oss</td><td>vår, vårt, våra</td><td><i>wir, uns</i></td></tr>
<tr><td>ni</td><td>er</td><td>er, ert, era</td><td><i>ihr, euch</i></td></tr>
<tr><td>de</td><td>dem</td><td>deras</td><td><i>sie, sie/ihnen</i></td></tr>
</tbody></table></div>
<p><b>Uttal:</b> <i>mig</i> och <i>dig</i> uttalas oftast <i>mej</i> och <i>dej</i>. <i>De</i> och <i>dem</i> uttalas båda <i>dom</i> i talspråk. I informell text ser man ibland <i>dom</i>, men i vanligt skriftspråk skriver man <b>de</b> och <b>dem</b>.</p>
<p><b>hen</b> är ett könsneutralt pronomen. Man använder det om en person när man inte vet eller inte vill säga om det är en man eller en kvinna. Det står i ordböckerna sedan 2015 och är vanligt i dag, men inte alla använder det.</p>
<p><b>du och ni:</b> I Sverige säger nästan alla <b>du</b> till varandra, även till chefen eller till främlingar. <i>ni</i> används framför allt i plural. Tyskans <i>Sie</i> blir alltså oftast <b>du</b>.</p>

<h2>Subjektsform eller objektsform?</h2>
<p>Tyskan har två former för objekt: <i>mich</i> och <i>mir</i>, <i>ihn</i> och <i>ihm</i>. Svenskan har bara <b>en</b> objektsform. Den används för båda.</p>
<p class="beispiel">Kan du hjälpa mig? (<i>Kannst du mir helfen?</i>)<br>Jag gav dem nycklarna. (<i>Ich gab ihnen die Schlüssel.</i>)<br>Anna är sjuk. Vi ska besöka henne i morgon.</p>
<h3>Efter preposition</h3>
<p>Efter en <b>preposition</b> (ett litet ord som <i>med, till, på, om, hos, bredvid</i>) står alltid objektsform.</p>
<p class="beispiel">Jag pratade med honom igår.<br>Jag har en present till dig.<br>Ska vi ses hos er eller hos oss?<br>Vi pratade om dem hela kvällen.</p>
<h3>I bisatser</h3>
<p>En <b>bisats</b> är en del av meningen som börjar med ett ord som <i>att, om, var, vad, när</i>. Bisatsen har ett eget subjekt. Är pronomenet subjekt i bisatsen, står det i <b>subjektsform</b>, även om det kommer direkt efter <i>att</i> eller <i>om</i>.</p>
<p class="beispiel">Jag vet inte var de bor.<br>Jag frågade om de ville följa med.<br>Tror du att hon kommer?</p>
<div class="merke"><p>Gör pronomenet något i sin egen sats? Då är det subjekt: <b>jag, han, de</b>. Händer något med det, eller står det efter en preposition? Då är det objekt: <b>mig, honom, dem</b>.</p></div>
<h3>Efter än</h3>
<p>Efter <b>än</b> (tyska <i>als</i>) går båda formerna bra: <i>Hon är äldre än jag</i> eller <i>äldre än mig</i>. I formell text väljer man oftast subjektsform.</p>

<h2>Den, det och de för saker</h2>
<p>På tyska väljer man pronomen efter genus: <i>der Schlüssel - er, die Tasche - sie</i>. På svenska gör man nästan samma sak, men med två genus:</p>
<ul>
<li>en-ord: <b>den</b>. <i>Var är nyckeln? Jag hittar inte den.</i></li>
<li>ett-ord: <b>det</b>. <i>Huset är gammalt, men vi tycker om det.</i></li>
<li>plural: <b>de</b> som subjekt, <b>dem</b> som objekt. <i>Tomaterna? De ligger i kylskåpet. Var köpte du dem?</i></li>
</ul>
<p><b>han</b> och <b>hon</b> används bara om personer (och ibland om djur man känner). En nyckel eller en bil är alltid <b>den</b>, aldrig <i>han</i>.</p>
<p class="beispiel">Har ni sett min katt? Nej, vi har inte sett den.<br>Var är mina glasögon? Jag hittar inte dem.</p>

<h3>Det om en hel mening</h3>
<p><b>det</b> kan syfta på en hel mening eller en situation, som tyskans <i>das</i> eller <i>es</i>.</p>
<p class="beispiel">Hon har flyttat till Spanien. Visste du det?</p>
<h3>Det när man presenterar något</h3>
<p>När man visar eller presenterar något säger man <b>det är</b>, även om det gäller en person eller ett en-ord. Det är som tyskans <i>Das ist ...</i>.</p>
<p class="beispiel">Vem är det där? Det är min syster.<br>Vad är det där? Det är en ekorre.</p>

<h2>De som och dem som</h2>
<p>Före <b>som</b> (tyska <i>die</i>, <i>welche</i>) väljer man form efter rollen i <b>huvudsatsen</b>:</p>
<p class="beispiel">De som vill kan gå hem nu. (<i>de</i> är subjekt till <i>kan</i>)<br>Jag känner dem som bor i huset bredvid. (<i>dem</i> är objekt till <i>känner</i>)</p>

<h2>Man, en, ens</h2>
<p><b>man</b> betyder människor i allmänhet, precis som tyskans <i>man</i>. Men svenskans <i>man</i> har också en objektsform och en ägarform:</p>
<div class="tabelle"><table>
<thead><tr><th>Form</th><th>Svenska</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>subjekt</td><td><b>man</b>: Man vet aldrig.</td><td><i>man</i></td></tr>
<tr><td>objekt</td><td><b>en</b>: Det gör en glad.</td><td><i>einen, einem</i></td></tr>
<tr><td>ägare</td><td><b>ens</b>: när ens vänner ringer</td><td><i>seine</i></td></tr>
</tbody></table></div>
<p class="beispiel">Det är skönt när någon hjälper en.<br>Man blir arg när grannarna väcker en mitt i natten.<br>Det är tråkigt när ens cykel blir stulen.</p>
<p>Använd inte <i>han</i> eller <i>honom</i> för att syfta tillbaka på <i>man</i>.</p>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>Subjektsform efter preposition:</b> <i>med han</i>. Rätt: <b>med honom</b>.</li>
<li><b>Fel form efter verb som tar dativ på tyska:</b> <i>helfen</i>, <i>danken</i> och <i>geben</i> tar bara vanligt objekt på svenska: <b>hjälpa mig, tacka dig, ge dem</b>.</li>
<li><b>Objektsform i bisatsen:</b> <i>Jag vet inte var dem bor</i>. Rätt: <b>var de bor</b>.</li>
<li><b>Han eller hon om saker:</b> <i>Nyckeln? Jag har inte sett honom.</i> Rätt: <b>den</b>.</li>
<li><b>Den i stället för det vid presentation:</b> <i>Den är min syster</i>. Rätt: <b>Det är min syster</b>.</li>
<li><b>Ni som artig form:</b> säg <b>du</b> till en person.</li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>Subjekt: jag, du, han, hon, vi, ni, de. Objekt: mig, dig, honom, henne, oss, er, dem.</li>
<li>Objektsform efter verb och preposition. Subjektsform som subjekt, även i bisats.</li>
<li>Saker: den (en-ord), det (ett-ord), de/dem (plural).</li>
<li>Det är ... för att presentera. Det om en hel mening.</li>
<li>man, en, ens.</li>
</ul>
`;
