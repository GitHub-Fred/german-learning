(()=>{"use strict";

const VERB = {
 stangaav: "<b>stänga av</b> betyder att få en maskin att sluta gå. Motsatsen är <b>sätta på</b>.",
 sattapa:  "<b>sätta på</b> betyder att starta en maskin, till exempel radion eller tv:n. Motsatsen är <b>stänga av</b>.",
 tyckaom:  "<b>tycka om</b> betyder att gilla något. Man betonar <i>om</i>.",
 tyckatill:"<b>tycka till</b> betyder att säga vad man tycker.",
 tamed:    "<b>ta med sig</b> betyder att ha något med sig när man går.",
 geupp:    "<b>ge upp</b> betyder att sluta försöka.",
 hallamed: "<b>hålla med</b> betyder att tycka samma sak som någon annan.",
 kommaihag:"<b>komma ihåg</b> betyder att minnas.",
 kannaigen:"<b>känna igen</b> betyder att veta vem eller vad något är, för att man har sett eller hört det förut.",
 seut:     "<b>se ut</b> säger hur något verkar när man tittar på det. Adjektivet står före <i>ut</i>.",
 seupp:    "<b>se upp</b> betyder att vara försiktig.",
 gasonder: "<b>gå sönder</b> betyder att något blir trasigt. Det har inget objekt.",
 slasonder:"<b>slå sönder</b> betyder att någon gör något trasigt. Det har ett objekt.",
 taslut:   "<b>ta slut</b> betyder att det inte finns något kvar.",
 klapa:    "<b>klä på sig</b> betyder att sätta på sig kläderna. Motsatsen är <b>klä av sig</b>.",
 taav:     "<b>ta av sig</b> betyder att ta bort ett plagg från kroppen. Motsatsen är <b>ta på sig</b>.",
 tapa:     "<b>ta på sig</b> betyder att sätta ett plagg på kroppen. Motsatsen är <b>ta av sig</b>.",
 hittapa:  "<b>hitta på</b> betyder att själv komma på något, till exempel en historia eller något roligt att göra.",
 kommafram:"<b>komma fram</b> betyder att komma till målet för en resa.",
 gaut:     "<b>gå ut</b> betyder här att gå hemifrån för att göra något roligt, till exempel äta på restaurang.",
 koraom:   "<b>köra om</b> betyder att köra förbi ett annat fordon.",
 ringaupp: "<b>ringa upp</b> någon betyder att ringa till den personen, ofta för att den har sökt en.",
 tahandom: "<b>ta hand om</b> betyder att sköta och passa någon eller något.",
 laggaav:  "<b>Lägg av!</b> betyder <i>sluta!</i> Det är vardagligt.",
 bliavmed: "<b>bli av med</b> betyder att förlora något eller att bli fri från något.",
 halsapa:  "<b>hälsa på</b> med betonat <i>på</i> betyder att besöka någon.",
 halsahej: "<b>hälsa på</b> någon med obetonat <i>på</i> betyder att säga hej. Här är <i>på</i> en vanlig preposition."
};

const ORDFOLJD = {
 objekt: "Partikeln står före objektet. Det gäller också små ord som <i>den</i>, <i>det</i> och <i>honom</i>.",
 adjektiv:"Med <b>se ut</b> står adjektivet mellan verbet och <i>ut</i>. Partikeln kommer sist.",
 inte:   "<i>Inte</i> står efter verbet och före partikeln: <i>kommer inte ihåg</i>, <i>gav inte upp</i>.",
 bisats: "I en bisats står <i>inte</i> före verbet. Partikeln kommer efter verbet och före objektet.",
 fraga:  "I en fråga står subjektet direkt efter verbet. Sedan kommer partikeln och sist objektet.",
 fram:   "I en fråga står subjektet direkt efter verbet. Partikeln kommer efter subjektet."
};

const FORM = {
 supinum: "I perfekt står partikeln efter supinum. Den sätts inte ihop med verbet.",
 particip:"I perfekt particip sätts partikeln ihop med verbet och står först: <i>stänga av</i> blir <i>avstängd</i>.",
 particip_t:"I perfekt particip sätts partikeln ihop med verbet och står först. Efter ett ett-ord slutar formen på <b>-t</b>.",
 particip_a:"I perfekt particip sätts partikeln ihop med verbet och står först. I plural slutar formen på <b>-a</b>.",
 spassiv:"I s-passiv står partikeln oftast efter verbet, precis som i aktiv form."
};

/* Vilket ord passar: [mening, rätt, [fel], verb, anvisning] */
const P_LUCKA = [
["Kan du stänga % tv:n? Jag vill sova.","av",["på","ut"],"stangaav"],
["Sätt % radion, jag vill höra nyheterna.","på",["av","ut"],"sattapa"],
["Jag tycker verkligen % glass.","om",["till","på"],"tyckaom"],
["Glöm inte att ta % dig paraplyet!","med",["av","upp"],"tamed"],
["Kommer du % vad hon heter?","ihåg",["igen","fram"],"kommaihag"],
["Se %! Det kommer en bil!","upp",["ut","av"],"seupp"],
["Det är kallt ute, klä % dig ordentligt!","på",["av","med"],"klapa"],
["Det är varmt här inne. Ta % dig jackan!","av",["på","upp"],"taav"],
["Vi kom % till hotellet sent på kvällen.","fram",["ihåg","sönder"],"kommafram"],
["Ska vi gå % och äta i kväll?","ut",["ihåg","sönder"],"gaut"],
["Lastbilen körde långsamt, så vi körde % den.","om",["av","ihåg"],"koraom"],
["Hon ringde när jag var upptagen, så jag ringer % henne senare.","upp",["av","ut"],"ringaupp"],
["Vem tar hand % hunden när ni är bortresta?","om",["med","på"],"tahandom"],
["Lägg % nu! Sluta bråka.","av",["ut","med"],"laggaav"],
["Alla får tycka % om förslaget på mötet.","till",["om","upp"],"tyckatill"],
["Äntligen blev jag % med min gamla soffa.","av",["på","om"],"bliavmed"],
["Han blev arg och % sönder en tallrik.","slog",["gick"],"slasonder","Vilket verb passar?"],
["Min telefon % sönder när den föll i golvet.","gick",["slog"],"gasonder","Vilket verb passar?"]
];

/* Vad betyder meningen: [mening, rätt, [fel], verb] */
const P_BETYDELSE = [
["Vi åkte till Umeå och hälsade på mormor i helgen.","Vi besökte mormor.",["Vi sa bara hej till mormor."],"halsapa"],
["Han hälsade på grannen i trappan och gick vidare.","Han sa hej till grannen.",["Han besökte grannen."],"halsahej"],
["Jag tycker om den här låten.","Jag gillar låten.",["Jag har en åsikt om låten.","Jag pratar om låten."],"tyckaom"],
["Han hittade på en historia om en drake.","Han kom själv på historien.",["Han hittade historien i en bok."],"hittapa"],
["Jag kände igen honom direkt.","Jag visste vem han var när jag såg honom.",["Jag lärde känna honom."],"kannaigen"],
["Min mobil gick sönder igår.","Den slutade fungera.",["Den försvann.","Jag gick ifrån den."],"gasonder"],
["Kaffet har tagit slut.","Det finns inget kaffe kvar.",["Kaffet har blivit kallt.","Någon har tagit kaffet."],"taslut"],
["Han blev av med jobbet.","Han förlorade jobbet.",["Han fick ett nytt jobb.","Han slutade tidigt på jobbet."],"bliavmed"],
["Efter tre försök gav hon upp.","Hon slutade försöka.",["Hon lyckades till slut.","Hon gav bort något."],"geupp"],
["Jag håller med dig om det.","Jag tycker samma sak som du.",["Jag följer med dig dit.","Jag håller din hand."],"hallamed"],
["Vad ska vi hitta på i helgen?","Vad ska vi göra i helgen?",["Vad ska vi leta efter i helgen?"],"hittapa"],
["Han körde om bussen.","Han körde förbi bussen.",["Han körde in i bussen.","Han körde bussen till verkstaden."],"koraom"],
["Se upp, golvet är halt!","Var försiktig!",["Titta upp i taket!"],"seupp"]
];

/* Vilken mening är rätt: [verb, rätt, [fel], regel, schwer] */
const P_ORDFOLJD = [
["tycka om","Jag tycker om den.",["Jag tycker den om."],"objekt"],
["hålla med","Jag håller med dig.",["Jag håller dig med."],"objekt"],
["stänga av","Stäng av tv:n!",["Stäng tv:n av!"],"objekt"],
["se ut","Hon ser trött ut.",["Hon ser ut trött."],"adjektiv"],
["komma ihåg","Jag kommer inte ihåg det.",["Jag kommer ihåg inte det."],"inte"],
["ge upp","Hon gav inte upp.",["Hon gav upp inte."],"inte"],
["känna igen","Det är synd att du inte kände igen mig.",["Det är synd att du kände inte igen mig.","Det är synd att du kände igen inte mig."],"bisats",true]
];

/* Skriv partikeln: [mening, [lösningar], betydelse, verb] */
const P_TIPPEN = [
["Vi ska hälsa % mormor i helgen.",["på"],"besöka","halsapa"],
["Kommer du % mig? Vi gick i samma klass.",["ihåg"],"minnas","kommaihag"],
["Kan du sätta % tv:n? Matchen börjar nu.",["på","igång"],"starta","sattapa"],
["Glöm inte att stänga % spisen innan du går.",["av"],"motsatsen till sätta på","stangaav"],
["Han ger aldrig %.",["upp"],"sluta försöka","geupp"],
["Jag håller inte % dig om det.",["med"],"tycka samma sak","hallamed"],
["Hur ser din nya lägenhet %?",["ut"],"hur den verkar när man tittar på den","seut"],
["Ta % dig jackan, det är kallt ute!",["på"],"sätta ett plagg på kroppen","tapa"],
["Mina skor har gått %.",["sönder"],"bli trasig","gasonder"],
["Bensinen tog % mitt på motorvägen.",["slut"],"det fanns inget kvar","taslut"],
["Förlåt, jag kände inte % dig med glasögon!",["igen"],"veta vem någon är","kannaigen"],
["Jag blev % med nycklarna igår.",["av"],"förlora","bliavmed"]
];

/* Rätt form: [mening, [lösningar], verb, formnamn, regel] */
const P_FORM = [
["Har du % nycklarna?",["tagit med","tagit med dig"],"ta med","supinum","supinum"],
["Hon har aldrig %.",["gett upp","givit upp"],"ge upp","supinum","supinum"],
["Jag har aldrig % hans födelsedag.",["kommit ihåg"],"komma ihåg","supinum","supinum"],
["Har du % dig? Vi ska gå nu.",["klätt på"],"klä på","supinum","supinum"],
["Tv:n är redan %.",["avstängd"],"stänga av","perfekt particip","particip"],
["Ljudet på mobilen är %.",["avstängt"],"stänga av","perfekt particip","particip_t"],
["Alla fönster var %.",["sönderslagna"],"slå sönder","perfekt particip","particip_a"],
["Historien var helt %.",["påhittad"],"hitta på","perfekt particip","particip"],
["Han blev % av tre bilar.",["omkörd"],"köra om","perfekt particip","particip"],
["Hon blev % på gatan.",["igenkänd"],"känna igen","perfekt particip","particip"],
["Tv:n % klockan tio.",["stängdes av"],"stänga av","s-passiv, preteritum","spassiv"],
["Fönstret % i natt.",["slogs sönder"],"slå sönder","s-passiv, preteritum","spassiv"]
];

/* Bygg meningen: [lösning, [andra rätta ordningar], regel] */
const P_BAU = [
["Tycker du om den?",[],"fraga"],
["Kan du stänga av tv:n?",[],"objekt"],
["Känner du igen honom?",[],"fraga"],
["Håller du med mig?",[],"fraga"],
["När kommer vi fram?",[],"fram"],
["Varför ser du så trött ut?",[],"adjektiv"],
["Jag kommer inte ihåg henne.",["Henne kommer jag inte ihåg."],"inte"],
["Jag vet att hon inte tycker om honom.",["Att hon inte tycker om honom vet jag.","Honom vet jag att hon inte tycker om."],"bisats"]
];

P_LUCKA.forEach(([satz,richtig,falsch,verb,anweisung])=>{
  neueKarte({
    deck:"partikel", typ:"wahl",
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:anweisung||"Vilket ord passar?",
    optionen:[richtig].concat(falsch), richtig:richtig,
    erklaerung:VERB[verb]+" &ndash; "+esc(satz.replace("%",richtig))
  });
});

P_BETYDELSE.forEach(([satz,richtig,falsch,verb])=>{
  neueKarte({
    deck:"partikel", typ:"wahl",
    rohfrage:satz,
    frage:esc(satz),
    anweisung:"Vad betyder meningen?",
    optionen:[richtig].concat(falsch), richtig:richtig,
    erklaerung:VERB[verb]+" &ndash; "+esc(satz)
  });
});

P_ORDFOLJD.forEach(([verb,richtig,falsch,regel,schwer])=>{
  neueKarte({
    deck:"partikel", typ:"wahl", schwer:!!schwer,
    rohfrage:"ordfoljd|"+richtig,
    frage:"<i>"+esc(verb)+"</i>",
    anweisung:"Vilken mening är rätt?",
    optionen:[richtig].concat(falsch), richtig:richtig,
    erklaerung:ORDFOLJD[regel]+" &ndash; "+esc(richtig)
  });
});

P_TIPPEN.forEach(([satz,loesungen,betydelse,verb])=>{
  neueKarte({
    deck:"partikel", typ:"tippen", schwer:true,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Skriv partikeln. Betydelse: <i>"+esc(betydelse)+"</i>",
    loesungen:loesungen,
    erklaerung:VERB[verb]+" &ndash; "+esc(satz.replace("%",loesungen[0]))
  });
});

P_FORM.forEach(([satz,loesungen,verb,formnamn,regel])=>{
  neueKarte({
    deck:"partikel", typ:"tippen", schwer:true,
    rohfrage:satz+"|form",
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Vilken form av <i>"+esc(verb)+"</i>? ("+esc(formnamn)+")",
    loesungen:loesungen,
    erklaerung:FORM[regel]+" &ndash; "+esc(satz.replace("%",loesungen[0]))
  });
});

P_BAU.forEach(([loesung,alt,regel])=>{
  neueKarte({
    deck:"partikel", typ:"bau", schwer:true,
    rohfrage:loesung,
    frage:"", anweisung:"Bygg meningen.",
    woerter:loesung.replace(/[.?!]$/,"").split(" "),
    schluss:loesung.slice(-1),
    loesungen:[loesung].concat(alt),
    erklaerung:ORDFOLJD[regel]+" &ndash; "+esc(loesung)
  });
});

})();

REGELSEITEN.partikel=`
<h2>Vad är ett partikelverb?</h2>
<p>Ett <b>partikelverb</b> består av ett verb och ett litet ord, en <b>partikel</b>. Partikeln är ofta ett ord som ser ut som en preposition eller ett adverb: <i>av, på, om, upp, ut, med, till, fram, ihåg, igen, sönder, slut</i>.</p>
<p>Tillsammans får verbet och partikeln en <b>ny betydelse</b>, som man ofta inte kan gissa:</p>
<p class="beispiel">tycka (meinen) + om = <b>tycka om</b> (mögen)<br>ge (geben) + upp = <b>ge upp</b> (aufgeben)<br>komma (kommen) + ihåg = <b>komma ihåg</b> (sich erinnern)</p>
<p>Tyskan har något liknande: de delbara verben, som <i>aufgeben, ausmachen, mitnehmen</i>. Många svenska partikelverb motsvarar dem direkt.</p>

<h2>Betoningen avgör</h2>
<p>I ett partikelverb är det <b>partikeln som har betoningen</b>, inte verbet. Det är så man hör skillnaden mellan ett partikelverb och ett verb med en vanlig preposition.</p>
<div class="tabelle"><table>
<thead><tr><th>Mening</th><th>Betoning</th><th>Betydelse</th></tr></thead>
<tbody>
<tr><td>Vi hälsade på mormor.</td><td>hälsade <b>PÅ</b></td><td>Vi besökte mormor.</td></tr>
<tr><td>Han hälsade på grannen.</td><td><b>HÄLSADE</b> på</td><td>Han sa hej till grannen.</td></tr>
<tr><td>Jag tycker om glass.</td><td>tycker <b>OM</b></td><td>Jag gillar glass.</td></tr>
<tr><td>Vad tycker du om filmen?</td><td><b>TYCKER</b> om</td><td>Vad är din åsikt om filmen?</td></tr>
</tbody></table></div>
<p>I skrift ser meningarna likadana ut. Då måste sammanhanget visa vilken betydelse det är.</p>

<h2>Vanliga partikelverb</h2>
<div class="tabelle"><table>
<thead><tr><th>Svenska</th><th>Betydelse</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>sätta på</td><td>starta en maskin</td><td><i>einschalten, anmachen</i></td></tr>
<tr><td>stänga av</td><td>få en maskin att sluta gå</td><td><i>ausschalten, ausmachen</i></td></tr>
<tr><td>tycka om</td><td>gilla</td><td><i>mögen</i></td></tr>
<tr><td>tycka till</td><td>säga vad man tycker</td><td><i>seine Meinung sagen</i></td></tr>
<tr><td>hälsa på</td><td>besöka</td><td><i>besuchen</i></td></tr>
<tr><td>ta med (sig)</td><td>ha något med sig</td><td><i>mitnehmen</i></td></tr>
<tr><td>ge upp</td><td>sluta försöka</td><td><i>aufgeben</i></td></tr>
<tr><td>hålla med</td><td>tycka samma sak</td><td><i>zustimmen, recht geben</i></td></tr>
<tr><td>komma ihåg</td><td>minnas</td><td><i>sich erinnern</i></td></tr>
<tr><td>känna igen</td><td>veta vem eller vad något är</td><td><i>wiedererkennen</i></td></tr>
<tr><td>se ut</td><td>hur något verkar</td><td><i>aussehen</i></td></tr>
<tr><td>se upp</td><td>vara försiktig</td><td><i>aufpassen</i></td></tr>
<tr><td>komma fram</td><td>komma till målet</td><td><i>ankommen</i></td></tr>
<tr><td>gå ut</td><td>gå hemifrån för att ha roligt</td><td><i>ausgehen</i></td></tr>
<tr><td>köra om</td><td>köra förbi</td><td><i>überholen</i></td></tr>
<tr><td>ringa upp</td><td>ringa till någon</td><td><i>anrufen, zurückrufen</i></td></tr>
<tr><td>hitta på</td><td>själv komma på något</td><td><i>sich ausdenken</i></td></tr>
<tr><td>ta hand om</td><td>sköta, passa</td><td><i>sich kümmern um</i></td></tr>
<tr><td>bli av med</td><td>förlora, bli fri från</td><td><i>loswerden, verlieren</i></td></tr>
<tr><td>gå sönder</td><td>bli trasig (inget objekt)</td><td><i>kaputtgehen</i></td></tr>
<tr><td>slå sönder</td><td>göra trasig (med objekt)</td><td><i>kaputtmachen</i></td></tr>
<tr><td>ta slut</td><td>inte finnas kvar</td><td><i>ausgehen, alle sein</i></td></tr>
<tr><td>klä på sig / klä av sig</td><td>sätta på / ta av kläderna</td><td><i>sich anziehen / ausziehen</i></td></tr>
<tr><td>ta på sig / ta av sig</td><td>ett plagg på / av kroppen</td><td><i>anziehen / ausziehen</i></td></tr>
<tr><td>Lägg av!</td><td>Sluta! (vardagligt)</td><td><i>Hör auf!</i></td></tr>
</tbody></table></div>

<h2>Ordföljd</h2>
<p>Den största skillnaden mot tyskan: på tyska hamnar partikeln ofta i slutet av satsen (<i>Ich mache den Fernseher aus</i>). På svenska står partikeln <b>direkt efter verbet</b>, före objektet.</p>
<p class="beispiel">Stäng av tv:n! (<i>Mach den Fernseher aus!</i>)<br>Jag håller med dig.</p>
<p>Det gäller också när objektet är ett litet pronomen som <i>den, det, honom</i>: <i>Jag tycker om den.</i> Inte: <i>Jag tycker den om.</i></p>
<h3>Med inte och i frågor</h3>
<ul>
<li>I huvudsatsen står <i>inte</i> efter verbet och före partikeln: <i>Jag kommer inte ihåg det. Hon gav inte upp.</i></li>
<li>I en fråga kommer subjektet direkt efter verbet, sedan partikeln och sist objektet: <i>Tycker du om den? Känner du igen honom? När kommer vi fram?</i></li>
<li>I en bisats står <i>inte</i> före verbet (BIFF), och partikeln kommer efter verbet: <i>Det är synd att du inte kände igen mig.</i></li>
</ul>
<h3>Se ut</h3>
<p>Med <b>se ut</b> står adjektivet mellan verbet och partikeln: <i>Hon ser trött ut. Varför ser du så trött ut? Hur ser lägenheten ut?</i></p>
<h3>Med reflexivt pronomen</h3>
<p>Vid <i>ta med sig, ta på sig, klä på sig</i> kommer pronomenet efter partikeln: <i>Ta på dig jackan! Glöm inte att ta med dig paraplyet!</i></p>
<div class="merke"><p>Verb + partikel står ihop: <b>stäng av</b> den, <b>tycker om</b> honom. Bara subjektet (i frågor och vid omvänd ordföljd), <i>inte</i> och adjektivet vid <i>se ut</i> får stå emellan.</p></div>

<h2>Partikelverb i olika former</h2>
<div class="tabelle"><table>
<thead><tr><th>Form</th><th>Partikeln</th><th>Exempel</th></tr></thead>
<tbody>
<tr><td>Supinum (perfekt)</td><td>efter verbet, separat</td><td>Hon har aldrig gett upp.<br>Jag har inte kommit ihåg det.</td></tr>
<tr><td>Perfekt particip</td><td>först, ihopskriven</td><td>Tv:n är avstängd.<br>Historien var påhittad.</td></tr>
<tr><td>S-passiv</td><td>oftast efter verbet</td><td>Tv:n stängdes av klockan tio.</td></tr>
</tbody></table></div>
<p>Participet böjs som ett adjektiv: <i>avstängd</i> (en-ord), <i>avstängt</i> (ett-ord), <i>avstängda</i> (plural): <i>Ljudet är avstängt. Alla fönster var sönderslagna.</i> Fler exempel: <i>omkörd, igenkänd, påhittad</i>.</p>
<p>Detta liknar tyskan: <i>ausgeschaltet</i> har också partikeln först.</p>
<p>Vissa partikelverb finns också som ihopskrivna verb, men då med en annan eller mer formell betydelse: <i>bryta av</i> en gren (<i>abbrechen</i>), men <i>avbryta</i> ett möte (<i>unterbrechen</i>).</p>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>Partikeln i slutet:</b> <i>Stäng tv:n av!</i> Rätt: <b>Stäng av tv:n!</b></li>
<li><b>Glömd partikel:</b> <i>Jag tycker glass</i> betyder inget. Rätt: <b>Jag tycker om glass.</b></li>
<li><b>Fel betoning:</b> om du betonar verbet i <i>hälsa på</i>, förstår svensken att du bara sa hej.</li>
<li><b>Adjektivet efter ut:</b> <i>Hon ser ut trött.</i> Rätt: <b>Hon ser trött ut.</b></li>
<li><b>gå sönder och slå sönder:</b> Telefonen <b>gick</b> sönder (av sig själv). Han <b>slog</b> sönder en tallrik.</li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>Partikelverb = verb + betonad partikel. Betydelsen ändras.</li>
<li>Partikeln står direkt efter verbet, före objektet, även före pronomen.</li>
<li>inte före partikeln, adjektivet före <i>ut</i> i <i>se ut</i>.</li>
<li>Supinum: <i>har gett upp</i>. Particip: <i>avstängd</i>. S-passiv: <i>stängdes av</i>.</li>
</ul>
`;
