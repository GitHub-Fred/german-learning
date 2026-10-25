(()=>{"use strict";
const DECK="sverb";

const REGLER={
paspres:"Passiv presens: ta bort <b>-r</b> i presens och lägg till <b>-s</b>, till exempel talar &rarr; talas, läser &rarr; läses. Ofta försvinner e: bygger &rarr; byggs. Vi använder det ofta för regler och sådant som händer ofta.",
paspret:"Passiv preteritum: preteritum + <b>-s</b>, till exempel byggde &rarr; byggdes, skrev &rarr; skrevs.",
passup:"Passiv supinum: supinum + <b>-s</b>, till exempel har skickats, har sålts.",
pasinf:"Efter <i>ska, måste, kan</i> kommer passiv infinitiv: infinitiv + <b>-s</b>, till exempel ska hållas.",
bli:"Passiv med <b>bli</b> + particip. Participet böjs efter subjektet: en-ord stulen, ett-ord stulet, plural stulna.",
vara:"<b>vara</b> + particip beskriver hur något är. Participet böjs efter subjektet: en-ord skriven, ett-ord skrivet, plural skrivna.",
deponens:"Det här verbet slutar på <b>-s</b> i alla former, men det betyder något aktivt. Det är inte passiv.",
reciprok:"Här betyder <b>-s</b> <i>varandra</i>: vi ses = vi ser varandra."
};

/* [mening, rätt, fel, regel, extra] */
const D_WAHL=[
["Här % svenska och engelska.","talas",["talar","tala"],"paspres"],
["Frukost % mellan sju och tio.","serveras",["serverar"],"paspres"],
["Tidningen % av många människor varje dag.","läses",["läser"],"paspres"],
["Bron % år 1932.","byggdes",["byggde","bygger"],"paspret"],
["Boken % av Astrid Lindgren.","skrevs",["skrev","skriver"],"paspret"],
["Paketet har % idag.","skickats",["skickat","skickas"],"passup"],
["Mötet ska % på fredag.","hållas",["hålla","hålls"],"pasinf"],
["Min cykel blev % igår.","stulen",["stulet","stulna"],"bli"],
["Huset blev % förra året.","sålt",["såld","sålda"],"bli"],
["Jag % att du mår bra.","hoppas",["hoppar"],"deponens","hoppas, hoppades, hoppats. Hoppa betyder att man rör sig upp i luften."],
["Det % mycket snö i norra Sverige.","finns",["finner"],"deponens","finnas, finns, fanns, funnits."],
["Vi % imorgon! Hej då!","ses",["ser"],"reciprok"],
["Vi %! Ring mig i helgen.","hörs",["hör"],"reciprok"],
["Jag % bra i Sverige.","trivs",["trivas"],"deponens","trivas, trivs, trivdes, trivts."],
["Hur % det?","känns",["känner"],"deponens","kännas, känns, kändes, känts."],
["Det % att du är trött.","syns",["ser"],"deponens","synas, syns, syntes, synts."],
["Försök att % lugnt.","andas",["andar"],"deponens","andas, andades, andats."],
["Hon % till slut hitta en lägenhet.","lyckades",["lyckade"],"deponens","lyckas, lyckades, lyckats."],
["Vi % utanför bion klockan sju.","träffas",["träffar"],"reciprok"],
["Det % en kopp. Kan du hämta en till?","fattas",["fattar"],"deponens","Det fattas = det saknas."],
["Jag % när jag springer.","svettas",["svettar"],"deponens","svettas, svettades, svettats."],
["Han % att han sover.","låtsas",["låter"],"deponens","låtsas, låtsades, låtsats."],
["Igår % det inga biljetter kvar.","fanns",["finns","fann"],"deponens","finnas, finns, fanns, funnits. Fann kommer från finna."],
["Pojkarna % på gräset.","brottas",["brottar"],"deponens"],
["Hur % ditt namn?","stavas",["stavar"],"paspres"],
["Mjölken ska % i kylskåpet.","förvaras",["förvara","förvarar"],"pasinf"],
["Jag % för det jag sa.","skäms",["skämmer"],"deponens","skämmas, skäms, skämdes, skämts."],
["Tåget % av snön.","försenades",["försenade"],"paspret"],
["Fisken % direkt från båten.","säljs",["säljer"],"paspres"],
["Dörren % med en nyckel.","låses",["låser"],"paspres"]
];

const D_WAHL_SCHWER=[
["Två cyklar blev % i natt.","stulna",["stulen","stulet"],"bli"],
["Boken är % på lätt svenska.","skriven",["skrivet","skrivna"],"vara"],
["Jag har länge % att du skulle komma.","hoppats",["hoppat","hoppas"],"deponens","hoppas, hoppades, hoppats."],
["Vi % igår på festen.","sågs",["såg","ses"],"reciprok","ses, sågs, setts."]
];

/* [mening, anvisning, lösningar, regel, extra] */
const D_TIPPEN=[
["Den här kyrkan % på 1200-talet.","Skriv <i>bygga</i> i passiv med -s.",["byggdes"],"paspret"],
["Alla biljetter har redan %.","Skriv <i>sälja</i> i passiv med -s.",["sålts"],"passup"],
["Maten % klockan sex varje kväll, så kom inte för sent!","Skriv <i>servera</i> i passiv med -s.",["serveras"],"paspres"],
["Brevet måste % idag.","Skriv <i>skicka</i> i passiv med -s.",["skickas"],"pasinf"],
["Fönstren % förra sommaren.","Skriv <i>måla</i> i passiv med -s.",["målades"],"paspret"],
["Romanen har % till trettio språk.","Skriv <i>översätta</i> i passiv med -s.",["översatts"],"passup"],
["Dörren ska % klockan åtta.","Skriv <i>låsa</i> i passiv med -s.",["låsas"],"pasinf"],
["Tjuven % av polisen igår.","Skriv <i>gripa</i> i passiv med -s.",["greps"],"paspret"],
["Min plånbok % igår.","Skriv <i>stjäla</i> med <i>bli</i> + particip.",["blev stulen"],"bli"],
["Tre personer % i olyckan igår.","Skriv <i>skada</i> med <i>bli</i> + particip.",["blev skadade"],"bli"],
["Vi % på sol, men det regnade hela veckan.","Skriv rätt form av <i>hoppas</i>.",["hoppades"],"deponens","hoppas, hoppades, hoppats."],
["Det har aldrig % någon affär här.","Skriv rätt form av <i>finnas</i>.",["funnits"],"deponens","finnas, finns, fanns, funnits."],
["När jag var liten % det inga mobiltelefoner.","Skriv rätt form av <i>finnas</i>.",["fanns"],"deponens","finnas, finns, fanns, funnits."],
["Jag har alltid % bra i Uppsala.","Skriv rätt form av <i>trivas</i>.",["trivts"],"deponens","trivas, trivs, trivdes, trivts."],
["Nästa morgon % han inte vad han hade gjort.","Skriv rätt form av <i>minnas</i>.",["mindes"],"deponens","minnas, minns, mindes, mints."],
["Har du % att hitta nycklarna?","Skriv rätt form av <i>lyckas</i>.",["lyckats"],"deponens","lyckas, lyckades, lyckats."],
["Hur % det på jobbet igår?","Skriv rätt form av <i>kännas</i>.",["kändes"],"deponens","kännas, känns, kändes, känts."],
["Vi har inte % på länge!","Skriv rätt form av <i>ses</i>.",["setts"],"reciprok","ses, sågs, setts."],
["Vi % på stationen förra veckan.","Skriv rätt form av <i>träffas</i>.",["träffades"],"reciprok","träffas, träffades, träffats."],
["Jag % när jag ramlade på scenen igår.","Skriv rätt form av <i>skämmas</i>.",["skämdes"],"deponens","skämmas, skäms, skämdes, skämts."],
["Hon % att hon inte hörde mig igår.","Skriv rätt form av <i>låtsas</i>.",["låtsades"],"deponens","låtsas, låtsades, låtsats."],
["Efter loppet igår % han tungt.","Skriv rätt form av <i>andas</i>.",["andades"],"deponens","andas, andades, andats."],
["Förra veckan % vi i telefon.","Skriv rätt form av <i>höras</i>.",["hördes"],"reciprok","höras, hörs, hördes, hörts."],
["Det % två stolar, så några fick stå.","Skriv rätt form av <i>fattas</i>.",["fattades"],"deponens","fattas, fattades, fattats."],
["De % länge på flygplatsen igår.","Skriv rätt form av <i>kramas</i>.",["kramades"],"reciprok","kramas, kramades, kramats."]
];

const fyll=(mening,ord)=>mening.replace("%",ord);

const wahl=schwer=>([mening,ratt,fel,regel,extra])=>{
  neueKarte({
    deck:DECK, typ:"wahl", schwer:schwer,
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:"Vilken form passar?",
    optionen:[ratt].concat(fel), richtig:ratt,
    erklaerung:REGLER[regel]+(extra?" "+esc(extra):"")+" &ndash; "+esc(fyll(mening,ratt))
  });
};
D_WAHL.forEach(wahl(false));
D_WAHL_SCHWER.forEach(wahl(true));

D_TIPPEN.forEach(([mening,anvisning,losningar,regel,extra])=>{
  neueKarte({
    deck:DECK, typ:"tippen", schwer:true,
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:anvisning,
    loesungen:losningar,
    erklaerung:REGLER[regel]+(extra?" "+esc(extra):"")+" &ndash; "+esc(fyll(mening,losningar[0]))
  });
});
})();

REGELSEITEN.sverb=`
<h2>Verb som slutar på -s</h2>
<p>Många svenska verb kan få ändelsen <b>-s</b>. Den kan betyda tre olika saker:</p>
<ol>
<li><b>Passiv</b>: något görs med subjektet. <i>Dörren öppnas.</i></li>
<li><b>Deponens</b>: verbet finns bara med -s, men betydelsen är aktiv. <i>Jag hoppas. Det finns.</i></li>
<li><b>Ömsesidig betydelse</b>: två eller flera gör något med varandra. <i>Vi ses!</i></li>
</ol>
<p>Tyskan har ingen sådan ändelse. Där säger man <i>wird geöffnet</i>, <i>es gibt</i> eller <i>wir sehen uns</i>.</p>

<h2>Passiv</h2>
<p>I en vanlig (aktiv) mening är subjektet den som gör något: <i>Astrid Lindgren skrev boken.</i> I en <b>passiv</b> mening är subjektet det som något händer med: <i>Boken skrevs av Astrid Lindgren.</i> Den som gör något kommer efter <b>av</b> (tyska <i>von</i>), men den behöver inte nämnas alls.</p>
<p>Svenskan har två sätt att bilda passiv: med <b>-s</b> och med <b>bli</b> + particip.</p>

<h3>S-passiv</h3>
<div class="tabelle"><table>
<thead><tr><th>Form</th><th>Aktiv</th><th>S-passiv</th><th>Regel</th></tr></thead>
<tbody>
<tr><td>Infinitiv</td><td>skicka</td><td>skicka<b>s</b></td><td>infinitiv + s</td></tr>
<tr><td>Presens</td><td>talar, läser, bygger</td><td>tala<b>s</b>, läs<b>es</b>, bygg<b>s</b></td><td>presens utan -r, + s</td></tr>
<tr><td>Preteritum</td><td>byggde, skrev</td><td>byggde<b>s</b>, skrev<b>s</b></td><td>preteritum + s</td></tr>
<tr><td>Supinum</td><td>har skickat</td><td>har skickat<b>s</b></td><td>supinum + s</td></tr>
</tbody></table></div>
<p>I presens av grupp 2 och 4 försvinner oftast <i>-er</i>: <i>bygger, byggs; säljer, säljs; skriver, skrivs</i>. Men om stammen slutar på <b>s</b>, blir det <b>-es</b>: <i>läser, läses; låser, låses</i>.</p>
<p class="beispiel">Här talas svenska och engelska.<br>Frukost serveras mellan sju och tio.<br>Bron byggdes år 1932.<br>Alla biljetter har redan sålts.<br>Mötet ska hållas på fredag.<br>Brevet måste skickas idag.</p>
<p>Efter hjälpverb som <i>ska, måste, kan</i> står passiv infinitiv: <i>ska hållas, måste skickas</i>.</p>

<h3>Bli + particip</h3>
<p>Passiv kan också bildas med <b>bli</b> + <b>perfekt particip</b>. Det liknar tyskans <i>werden</i> + <i>Partizip</i>. Participet är ett adjektiv och böjs efter subjektet:</p>
<div class="tabelle"><table>
<thead><tr><th>Subjekt</th><th>Exempel</th></tr></thead>
<tbody>
<tr><td>en-ord</td><td>Min cykel blev <b>stulen</b>.</td></tr>
<tr><td>ett-ord</td><td>Huset blev <b>sålt</b>.</td></tr>
<tr><td>plural</td><td>Två cyklar blev <b>stulna</b>. Tre personer blev <b>skadade</b>.</td></tr>
</tbody></table></div>
<h3>S-passiv eller bli?</h3>
<p>Ofta går båda. Ett par tumregler:</p>
<ul>
<li><b>S-passiv</b> är vanligast, särskilt i skrift. Den passar bra för regler, instruktioner och sådant som händer ofta: <i>Maten serveras klockan sex. Mjölken ska förvaras i kylskåpet.</i></li>
<li><b>bli</b>-passiv används ofta i talspråk och när något händer en gång och ändrar läget: <i>Min plånbok blev stulen igår.</i></li>
</ul>
<h3>Vara + particip</h3>
<p><b>vara</b> + particip beskriver inte en händelse, utan hur något <b>är</b>: <i>Boken är skriven på lätt svenska. Dörren är stängd.</i> Det motsvarar tyskans <i>sein</i> + <i>Partizip</i> (<i>Zustandspassiv</i>).</p>
<div class="merke"><p>Händelse: <b>-s</b> eller <b>bli</b> (<i>Dörren stängs. Dörren blev stängd.</i>). Tillstånd: <b>vara</b> (<i>Dörren är stängd.</i>).</p></div>

<h2>Deponens: verb som bara finns med -s</h2>
<p>Vissa verb finns bara med -s, men de betyder något aktivt. De kallas <b>deponens</b>. Många av dem är reflexiva på tyska, och därför vill tyskar gärna lägga till <i>sig</i>. Men ett verb på -s tar aldrig ett reflexivt pronomen.</p>
<div class="tabelle"><table>
<thead><tr><th>Infinitiv</th><th>Presens</th><th>Preteritum</th><th>Supinum</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>hoppas</td><td>hoppas</td><td>hoppades</td><td>hoppats</td><td><i>hoffen</i></td></tr>
<tr><td>lyckas</td><td>lyckas</td><td>lyckades</td><td>lyckats</td><td><i>gelingen, schaffen</i></td></tr>
<tr><td>andas</td><td>andas</td><td>andades</td><td>andats</td><td><i>atmen</i></td></tr>
<tr><td>låtsas</td><td>låtsas</td><td>låtsades</td><td>låtsats</td><td><i>so tun als ob</i></td></tr>
<tr><td>svettas</td><td>svettas</td><td>svettades</td><td>svettats</td><td><i>schwitzen</i></td></tr>
<tr><td>fattas</td><td>fattas</td><td>fattades</td><td>fattats</td><td><i>fehlen</i></td></tr>
<tr><td>finnas</td><td>finns</td><td>fanns</td><td>funnits</td><td><i>es gibt</i></td></tr>
<tr><td>trivas</td><td>trivs</td><td>trivdes</td><td>trivts</td><td><i>sich wohlfühlen</i></td></tr>
<tr><td>minnas</td><td>minns</td><td>mindes</td><td>mints</td><td><i>sich erinnern</i></td></tr>
<tr><td>skämmas</td><td>skäms</td><td>skämdes</td><td>skämts</td><td><i>sich schämen</i></td></tr>
<tr><td>kännas</td><td>känns</td><td>kändes</td><td>känts</td><td><i>sich anfühlen</i></td></tr>
<tr><td>synas</td><td>syns</td><td>syntes</td><td>synts</td><td><i>sichtbar sein, man sieht</i></td></tr>
<tr><td>brottas</td><td>brottas</td><td>brottades</td><td>brottats</td><td><i>ringen</i></td></tr>
</tbody></table></div>
<p>Lägg märke till: hos verb som <i>hoppas, lyckas, andas</i> är <b>presens samma som infinitiv</b>: <i>Jag hoppas att du mår bra.</i> Hos <i>finnas, trivas, minnas</i> försvinner <i>-a</i> i presens: <i>finns, trivs, minns</i>.</p>
<p class="beispiel">Det finns mycket snö i norra Sverige.<br>Jag trivs bra i Sverige.<br>Hur känns det?<br>Det syns att du är trött.<br>Hon lyckades till slut hitta en lägenhet.<br>Det fattas en kopp.</p>
<p>Akta dig för par som ser lika ut men betyder olika: <b>hoppas</b> (<i>hoffen</i>) och <b>hoppa</b> (<i>springen</i>); <b>finnas</b> (<i>es gibt</i>) och <b>finna</b> (<i>finden</i>); <b>låtsas</b> (<i>so tun als ob</i>) och <b>låta</b> (<i>lassen, klingen</i>).</p>

<h2>Ömsesidiga verb: vi ses</h2>
<p>Med vissa verb betyder -s <b>varandra</b> (tyska <i>einander</i> eller <i>sich</i>). Subjektet är oftast i plural.</p>
<div class="tabelle"><table>
<thead><tr><th>Verb</th><th>Betydelse</th><th>Former</th></tr></thead>
<tbody>
<tr><td>ses</td><td>se varandra</td><td>ses, sågs, setts</td></tr>
<tr><td>höras</td><td>höra av varandra, prata i telefon</td><td>hörs, hördes, hörts</td></tr>
<tr><td>träffas</td><td>träffa varandra</td><td>träffas, träffades, träffats</td></tr>
<tr><td>kramas</td><td>krama varandra</td><td>kramas, kramades, kramats</td></tr>
<tr><td>mötas</td><td>möta varandra</td><td>möts, möttes, mötts</td></tr>
</tbody></table></div>
<p class="beispiel">Vi ses imorgon! Hej då!<br>Vi hörs! Ring mig i helgen.<br>Vi träffas utanför bion klockan sju.<br>Vi har inte setts på länge!</p>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>sig efter -s:</b> <i>Jag trivs mig.</i> Rätt: <b>Jag trivs.</b></li>
<li><b>hoppar i stället för hoppas:</b> <i>Jag hoppar att du mår bra</i> betyder att du hoppar upp och ner. Rätt: <b>Jag hoppas.</b></li>
<li><b>Fel form av finnas:</b> <i>Det finner en bank här.</i> Rätt: <b>Det finns.</b> Preteritum: <b>fanns</b>.</li>
<li><b>Fel böjning av participet:</b> <i>Två cyklar blev stulen.</i> Rätt: <b>stulna</b>.</li>
<li><b>Glömt -s i supinum:</b> <i>Paketet har skickat.</i> Rätt: <b>Paketet har skickats.</b></li>
<li><b>vara i stället för bli för en händelse:</b> <i>Bron var byggd 1932</i> beskriver hur bron var. För händelsen: <b>Bron byggdes 1932.</b></li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>S-passiv: skickas, byggs, byggdes, har byggts. Den som gör något: <i>av</i>.</li>
<li>bli + particip: blev stulen, blev sålt, blev stulna. vara + particip: tillstånd.</li>
<li>Deponens: hoppas, finnas, trivas, minnas, skämmas, lyckas, andas. Aktiv betydelse, aldrig <i>sig</i>.</li>
<li>Ömsesidiga: ses, hörs, träffas, kramas = varandra.</li>
</ul>
`;
