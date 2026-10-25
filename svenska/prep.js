(()=>{"use strict";
const R={
  land:"Länder och städer tar <b>i</b>: i Sverige, i Stockholm.",
  oe:"Öar tar oftast <b>på</b>: på Gotland, på Öland.",
  inne:"<b>i</b> när något är inne i ett rum eller ett utrymme: i köket, i bilen.",
  yta:"<b>på</b> när något är ovanpå en yta: på bordet, på väggen, på gatan.",
  plats:"Många platser där man gör något tar <b>på</b>: på bio, på jobbet, på posten, på sjukhuset.",
  landet:"<b>på landet</b> betyder utanför staden, på landsbygden.",
  skog:"Man är <b>i</b> skogen, mitt bland träden.",
  hos:"<b>hos</b> + person svarar på frågan <i>var?</i>: hemma hos någon.",
  till:"<b>till</b> visar vart man åker eller går.",
  fran:"<b>från</b> visar varifrån något kommer.",
  in_i:"<b>in i</b> är en rörelse till insidan av något.",
  ut_ur:"<b>ut ur</b> och <b>upp ur</b> är en rörelse från insidan av något."
};
const text=r=>R[r]||r;

// [mening, rätt, fel, regel, svår]
const D_WAHL=[
["Jag bor % Sverige.","i",["på","till"],"land"],
["Min syster bor % Stockholm.","i",["på","till"],"land"],
["Vi har ett sommarhus % Gotland.","på",["i","till"],"oe"],
["Ska vi gå % bio i kväll?","på",["i","hos"],"plats"],
["Vi äter ofta % restaurang.","på",["i","hos"],"plats"],
["Mamma lagar mat % köket.","i",["på","hos"],"inne"],
["Han är % toaletten just nu.","på",["i","hos"],"plats"],
["Hon läser medicin % universitetet i Lund.","på",["i","till"],"plats"],
["Jag ska hämta ett paket % posten.","på",["i","om"],"plats"],
["Vi har en lägenhet i stan och ett sommarhus % landet.","på",["hos","till"],"landet"],
["Barnen leker % gatan.","på",["i","hos"],"yta"],
["Boken ligger % stolen.","på",["i","hos"],"yta"],
["Vi träffades % en fest.","på",["i","hos"],"Man är <b>på</b> en fest, en konsert eller ett möte."],
["Jag är % jobbet till fem.","på",["i","hos"],"plats"],
["Vi plockar svamp % skogen.","i",["på","hos"],"skog"],
["Tavlan hänger % väggen.","på",["i","hos"],"yta"],
["Det är varmt % bilen.","i",["på","hos"],"inne"],
["Han sjunger alltid % duschen.","i",["på","hos"],"inne"],
["Det finns en marknad % torget.","på",["i","hos"],"Man är <b>på</b> torget, en öppen plats."],
["Vi bor % en liten ö.","på",["i","hos"],"oe"],
["Vi dricker kaffe % balkongen.","på",["i","hos"],"Man sitter <b>på</b> balkongen."],
["Vi är % mormor i helgen.","hos",["till","på"],"hos"],
["Vi åker % mormor på lördag.","till",["hos","på"],"<b>till</b> visar vart man åker. <b>hos</b> svarar på frågan <i>var?</i>"],
["Vi flyger % Oslo på lördag.","till",["i","hos"],"till"],
["Jag kommer % Tyskland.","från",["ur","av"],"fran"],
["Det började regna, så vi sprang in % huset.","i",["på","ur"],"in_i"],
["Hon tog ut mjölken % kylskåpet.","ur",["i","på"],"ut_ur"],
["Han gick ut % rummet utan att säga något.","ur",["på","av"],"ut_ur"],
["Vi åker hem % jobbet klockan fem.","från",["av","ur"],"fran"],
["Jag ska gå % tandläkaren i morgon.","till",["i","ur"],"till"],
["Jag tänker ofta % dig.","på",["om","över"],"Det heter <b>tänka på</b> någon eller något."],
["Tror du % spöken?","på",["om","i"],"Det heter <b>tro på</b> något."],
["Vi väntar % bussen.","på",["efter","till"],"Det heter <b>vänta på</b> någon eller något."],
["Vi tittar % en film i kväll.","på",["om","åt"],"Det heter <b>titta på</b> något."],
["Hon lyssnar % musik hela dagen.","på",["om","med"],"Det heter <b>lyssna på</b> något."],
["Vi pratade länge % vädret.","om",["för","av"],"Man <b>pratar om</b> något."],
["Jag måste prata % dig om en sak.","med",["åt","på"],"Man <b>pratar med</b> en person och <b>om</b> en sak."],
["Jag drömmer % ett hus vid havet.","om",["på","av"],"Det heter <b>drömma om</b> något."],
["Jag tycker % glass.","om",["på","av"],"Det heter <b>tycka om</b> något."],
["Min dotter är rädd % hundar.","för",["av","på"],"Det heter <b>vara rädd för</b> något."],
["Är du intresserad % konst?","av",["för","på"],"Det heter <b>vara intresserad av</b> något."],
["Det beror % vädret.","på",["om","med"],"Det heter <b>bero på</b> något."],
["Hon ska gifta sig % Erik i sommar.","med",["på","åt"],"Det heter <b>gifta sig med</b> någon."],
["Filmen handlar % en flicka och hennes hund.","om",["på","av"],"Det heter <b>handla om</b> något."],
["Tack % hjälpen!","för",["om","på"],"Man <b>tackar för</b> något."],
["Jag letar % mina nycklar.","efter",["för","om"],"Det heter <b>leta efter</b> något."],
["Vi hälsar % mormor på söndag.","på",["om","med"],"<b>hälsa på</b> någon betyder att besöka någon."],
["Du har inte svarat % min fråga.","på",["om","till"],"Det heter <b>svara på</b> något."],
["Vi hoppas % fint väder i helgen.","på",["om","för"],"Det heter <b>hoppas på</b> något."],
["Vem tar hand % hunden?","om",["på","för"],"Det heter <b>ta hand om</b> någon."],
["Jag bryr mig inte % vad andra tycker.","om",["på","för"],"Det heter <b>bry sig om</b> något."],
["Mamma är orolig % dig.","för",["på","av"],"Det heter <b>vara orolig för</b> någon."],
["Var rädd % dig!","om",["för","på"],"<b>vara rädd om</b> betyder att vara försiktig med något. <b>rädd för</b> betyder att man är rädd.",1],
["Alla skrattade % hans skämt.","åt",["på","om"],"Det heter <b>skratta åt</b> något.",1],
["Grattis % det nya jobbet!","till",["på","om"],"Det heter <b>grattis till</b> något. Men: grattis på födelsedagen.",1],
["Vi har inte råd % en ny bil.","med",["på","av"],"Det heter <b>ha råd med</b> något.",1],
["Han är bra % att laga mat.","på",["i","av"],"Det heter <b>vara bra på</b> något.",1],
["Jag är trött % regnet nu.","på",["om","med"],"<b>vara trött på</b> något betyder att man inte orkar med det längre.",1],
["Vatten består % väte och syre.","av",["med","på"],"Det heter <b>bestå av</b> något.",1]
];

// [mening, lösningar, förklaring, grupp]
const D_TIPPEN=[
["Jag är inte van % kylan än.",["vid"],"Det heter <b>vara van vid</b> något."],
["Vi är så stolta % dig!",["över"],"Det heter <b>vara stolt över</b> någon eller något."],
["Mamma är arg % mig.",["på"],"Man är <b>arg på</b> en person."],
["Är du nöjd % resultatet?",["med"],"Det heter <b>vara nöjd med</b> något."],
["Hon är beroende % kaffe.",["av"],"Det heter <b>vara beroende av</b> något."],
["Han blev kär % henne direkt.",["i"],"Det heter <b>bli kär i</b> någon."],
["Man vänjer sig % allt.",["vid"],"Det heter <b>vänja sig vid</b> något."],
["Jag ser fram % helgen.",["emot","mot"],"Det heter <b>se fram emot</b> något."],
["Jag tycker synd % honom.",["om"],"Det heter <b>tycka synd om</b> någon."],
["Hon lider % migrän.",["av"],"Det heter <b>lida av</b> något."],
["Är du säker % det?",["på"],"Det heter <b>vara säker på</b> något."],
["Jag är så glad % din skull.",["för"],"Det heter <b>glad för någons skull</b>."],
["Vi blev glada % nyheten.",["över","för","åt"],"Man är <b>glad över</b> något. Man kan också säga <b>glad för</b> och <b>glad åt</b>."],
["Barnen längtar % julafton.",["till","efter"],"Man kan säga både <b>längta till</b> och <b>längta efter</b>."],
["Vad tänker du %?",["på"],"Det heter <b>tänka på</b> något."],
["Tror du % Gud?",["på"],"Det heter <b>tro på</b> något."],
["Boken handlar % en familj i Norrland.",["om"],"Det heter <b>handla om</b> något."],
["Det beror % dig.",["på"],"Det heter <b>bero på</b> någon eller något."],
["Vill du gifta dig % mig?",["med"],"Det heter <b>gifta sig med</b> någon."],
["Är du intresserad % fotboll?",["av"],"Det heter <b>vara intresserad av</b> något."],
["Jag är rädd % mörkret.",["för"],"Det heter <b>vara rädd för</b> något."],
["Jag lyssnar gärna % poddar.",["på","till"],"Det heter <b>lyssna på</b> något. <b>lyssna till</b> är lite mer formellt."],
["Jag drömde % dig i natt.",["om"],"Det heter <b>drömma om</b> någon."],
["Hon är gift % en läkare.",["med"],"Det heter <b>vara gift med</b> någon."],
["Vi är överens % det.",["om"],"Det heter <b>vara överens om</b> något."],
["Jag är tacksam % hjälpen.",["för"],"Det heter <b>vara tacksam för</b> något."],
["Han är känd % sina deckare.",["för"],"Det heter <b>vara känd för</b> något."],
["Jag är sugen % glass.",["på"],"Det heter <b>vara sugen på</b> något."],
["Är du medlem % klubben?",["i","av"],"Det heter <b>vara medlem i</b> något. Man kan också säga <b>medlem av</b>."],
["Hon är ansvarig % projektet.",["för"],"Det heter <b>vara ansvarig för</b> något."],
["Vi har en stuga % Öland.",["på"],"oe","plats"],
["Min pappa ligger % sjukhuset.",["på"],"plats","plats"],
["Vi bor % Malmö.",["i"],"land","plats"],
["Kan du köpa frimärken % posten?",["på"],"plats","plats"],
["De flyttade från stan och bor nu % landet.",["på"],"landet","plats"],
["Jag har aldrig varit % Frankrike.",["i"],"land","plats"],
["Vi flyttade hit % Polen för tio år sedan.",["från"],"fran"],
["Hon sprang in % köket.",["i"],"in_i"],
["Han tog upp telefonen % fickan.",["ur"],"ut_ur"],
["Vi är % farmor och farfar i helgen.",["hos"],"hos"]
];

D_WAHL.forEach(([satz,richtig,falsch,regel,schwer])=>{
  neueKarte({
    deck:"prep", typ:"wahl", schwer:!!schwer,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Vilken preposition passar?",
    optionen:[richtig].concat(falsch), richtig:richtig,
    erklaerung:text(regel)+" &ndash; "+esc(satz.replace("%",richtig))
  });
});

D_TIPPEN.forEach(([satz,loesungen,regel,grupp])=>{
  neueKarte({
    deck:"prep", typ:"tippen", schwer:true,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:grupp==="plats"?"Skriv <i>i</i> eller <i>på</i>.":"Skriv prepositionen.",
    loesungen:loesungen,
    erklaerung:text(regel)+" &ndash; "+esc(satz.replace("%",loesungen[0]))
  });
});
})();

REGELSEITEN.prep=`
<h2>Små ord med stor betydelse</h2>
<p>En <b>preposition</b> är ett litet ord som visar hur saker hänger ihop, till exempel i rummet: <i>i, på, till, från, hos, med, om</i>. Prepositioner är svåra i alla språk, för de följer inte alltid logiska regler. Svenska och tyska liknar varandra ofta, men inte alltid. Den här sidan visar reglerna för platser och de viktigaste verben och adjektiven med fast preposition.</p>

<h2>Var? I eller på</h2>
<h3>i: inne i något</h3>
<p>Man använder <b>i</b> när något är inne i ett rum eller ett utrymme, ungefär som tyskans <i>in</i>.</p>
<p class="beispiel">i köket, i bilen, i duschen, i skogen</p>
<p>Länder, landskap och städer tar alltid <b>i</b>: <i>i Sverige, i Tyskland, i Skåne, i Stockholm, i Malmö</i>.</p>
<h3>på: ovanpå en yta</h3>
<p>Man använder <b>på</b> när något ligger eller står på en yta, som tyskans <i>auf</i> eller <i>an</i>.</p>
<p class="beispiel">på bordet, på stolen, på väggen, på gatan, på torget, på balkongen</p>
<p><b>Öar</b> tar oftast <b>på</b>: <i>på Gotland, på Öland, på en liten ö</i>. Det gäller även några ö-länder: <i>på Island</i>.</p>
<h3>på: platser där man gör något</h3>
<p>Här skiljer sig svenskan mest från tyskan. Många platser där man arbetar, handlar eller gör något särskilt tar <b>på</b>, även om man är inne i en byggnad:</p>
<p class="beispiel">på jobbet, på bio, på restaurang, på posten, på sjukhuset, på universitetet, på toaletten, på kontoret, på banken</p>
<p>Händelser tar också <b>på</b>: <i>på en fest, på en konsert, på ett möte</i>.</p>
<p><b>på landet</b> betyder utanför staden, på landsbygden. <i>i landet</i> betyder inne i ett land.</p>
<div class="merke"><p>Inne i ett rum eller ett land: <b>i</b>. På en yta, en ö, ett jobb eller en händelse: <b>på</b>. Lär dig de vanliga platserna tillsammans med prepositionen: <i>på jobbet, på bio, i köket</i>.</p></div>

<h2>Vart och varifrån?</h2>
<div class="tabelle"><table>
<thead><tr><th>Fråga</th><th>Svenska</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>Vart?</td><td><b>till</b>: till Oslo, till tandläkaren, till mormor</td><td><i>nach, zu</i></td></tr>
<tr><td>Var? (hos en person)</td><td><b>hos</b>: hos mormor, hemma hos Lisa</td><td><i>bei</i></td></tr>
<tr><td>Varifrån?</td><td><b>från</b>: från Tyskland, från jobbet</td><td><i>aus, von</i></td></tr>
<tr><td>In i något</td><td><b>in i</b>: in i huset</td><td><i>in ... hinein</i></td></tr>
<tr><td>Ut ur något</td><td><b>ut ur, upp ur</b>: ut ur rummet, upp ur fickan</td><td><i>aus ... heraus</i></td></tr>
</tbody></table></div>
<p class="beispiel">Vi åker till mormor på lördag. Vi är hos mormor i helgen.<br>Jag kommer från Tyskland.<br>Hon tog ut mjölken ur kylskåpet.</p>
<p>Tyskans <i>aus</i> blir alltså två ord: <b>från</b> när det gäller ursprung (<i>aus Deutschland</i>) och <b>ur</b> när något kommer ut från insidan av något (<i>aus dem Kühlschrank</i>).</p>
<p>Svenskan skiljer också mellan rörelse och plats i små ord: <b>hem</b> (vart?) och <b>hemma</b> (var?), precis som <i>nach Hause</i> och <i>zu Hause</i>. Likadant: <i>ut/ute, in/inne, upp/uppe, ner/nere</i>.</p>
<p class="beispiel">Jag går hem. Jag är hemma.<br>Barnen springer ut. Barnen leker ute.</p>

<h2>Verb med fast preposition</h2>
<p>Många verb har alltid samma preposition. Den måste man lära sig tillsammans med verbet. Ofta är den annorlunda än på tyska, och ibland har tyskan ingen preposition alls.</p>
<div class="tabelle"><table>
<thead><tr><th>Svenska</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>tänka <b>på</b></td><td><i>denken an</i></td></tr>
<tr><td>tro <b>på</b></td><td><i>glauben an</i></td></tr>
<tr><td>vänta <b>på</b></td><td><i>warten auf</i></td></tr>
<tr><td>svara <b>på</b></td><td><i>antworten auf</i></td></tr>
<tr><td>hoppas <b>på</b></td><td><i>hoffen auf</i></td></tr>
<tr><td>bero <b>på</b></td><td><i>abhängen von</i></td></tr>
<tr><td>titta <b>på</b></td><td><i>anschauen</i></td></tr>
<tr><td>lyssna <b>på</b></td><td><i>zuhören, hören</i></td></tr>
<tr><td>hälsa <b>på</b></td><td><i>besuchen</i></td></tr>
<tr><td>prata <b>om</b> något, prata <b>med</b> någon</td><td><i>sprechen über, sprechen mit</i></td></tr>
<tr><td>drömma <b>om</b></td><td><i>träumen von</i></td></tr>
<tr><td>handla <b>om</b></td><td><i>handeln von</i></td></tr>
<tr><td>tycka <b>om</b></td><td><i>mögen</i></td></tr>
<tr><td>ta hand <b>om</b></td><td><i>sich kümmern um</i></td></tr>
<tr><td>bry sig <b>om</b></td><td><i>sich kümmern um, sich scheren um</i></td></tr>
<tr><td>tycka synd <b>om</b></td><td><i>Mitleid haben mit</i></td></tr>
<tr><td>tacka <b>för</b></td><td><i>danken für</i></td></tr>
<tr><td>leta <b>efter</b></td><td><i>suchen</i></td></tr>
<tr><td>längta <b>till</b> / <b>efter</b></td><td><i>sich sehnen nach</i></td></tr>
<tr><td>gifta sig <b>med</b></td><td><i>heiraten</i></td></tr>
<tr><td>ha råd <b>med</b></td><td><i>sich leisten können</i></td></tr>
<tr><td>skratta <b>åt</b></td><td><i>lachen über</i></td></tr>
<tr><td>bestå <b>av</b></td><td><i>bestehen aus</i></td></tr>
<tr><td>lida <b>av</b></td><td><i>leiden an</i></td></tr>
<tr><td>vänja sig <b>vid</b></td><td><i>sich gewöhnen an</i></td></tr>
<tr><td>se fram <b>emot</b></td><td><i>sich freuen auf</i></td></tr>
</tbody></table></div>
<p>Lägg märke till: <b>tycka om</b> och <b>hälsa på</b> är partikelverb. Prepositionen är betonad och ändrar betydelsen (se högen <i>Partikelverb</i>).</p>
<p><i>lyssna till</i> finns också, men det är lite mer formellt än <i>lyssna på</i>.</p>

<h2>Adjektiv med fast preposition</h2>
<div class="tabelle"><table>
<thead><tr><th>Svenska</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>rädd <b>för</b></td><td><i>Angst haben vor</i></td></tr>
<tr><td>orolig <b>för</b></td><td><i>besorgt um</i></td></tr>
<tr><td>tacksam <b>för</b>, känd <b>för</b>, ansvarig <b>för</b></td><td><i>dankbar für, bekannt für, verantwortlich für</i></td></tr>
<tr><td>intresserad <b>av</b></td><td><i>interessiert an</i></td></tr>
<tr><td>beroende <b>av</b></td><td><i>abhängig von</i></td></tr>
<tr><td>arg <b>på</b></td><td><i>böse auf</i></td></tr>
<tr><td>bra <b>på</b></td><td><i>gut in</i></td></tr>
<tr><td>trött <b>på</b></td><td><i>satt haben</i></td></tr>
<tr><td>säker <b>på</b></td><td><i>sicher</i></td></tr>
<tr><td>sugen <b>på</b></td><td><i>Lust haben auf</i></td></tr>
<tr><td>nöjd <b>med</b>, gift <b>med</b></td><td><i>zufrieden mit, verheiratet mit</i></td></tr>
<tr><td>van <b>vid</b></td><td><i>gewöhnt an</i></td></tr>
<tr><td>stolt <b>över</b></td><td><i>stolz auf</i></td></tr>
<tr><td>kär <b>i</b>, medlem <b>i</b></td><td><i>verliebt in, Mitglied in</i></td></tr>
<tr><td>överens <b>om</b></td><td><i>einig über</i></td></tr>
</tbody></table></div>
<h3>Små skillnader som ändrar betydelsen</h3>
<ul>
<li><b>rädd för</b> betyder att man är rädd: <i>rädd för hundar</i>. <b>rädd om</b> betyder att man är försiktig med något: <i>Var rädd om dig!</i></li>
<li><b>glad över</b> (eller <b>glad för</b>, <b>glad åt</b>) något: <i>glad över nyheten</i>. Men <b>glad för din skull</b> (<i>ich freue mich für dich</i>).</li>
<li><b>grattis till</b> något: <i>grattis till det nya jobbet</i>. Men <b>grattis på födelsedagen</b>.</li>
<li><b>bero på</b>, men <b>beroende av</b>.</li>
<li><b>prata med</b> en person, <b>prata om</b> en sak.</li>
</ul>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>i i stället för på:</b> <i>i jobbet, i bion</i>. Rätt: <b>på jobbet, på bio</b>.</li>
<li><b>Ingen preposition, som på tyska:</b> <i>Jag lyssnar musik, jag letar mina nycklar, hon gifter sig Erik</i>. Rätt: <b>lyssnar på, letar efter, gifter sig med</b>.</li>
<li><b>Översättning av an:</b> <i>tänka an, tro an</i> finns inte. Rätt: <b>tänka på, tro på</b>. Och <i>tänka om</i> betyder något helt annat: att ändra sin åsikt.</li>
<li><b>Översättning av vor och von:</b> <i>rädd av, drömma av</i>. Rätt: <b>rädd för, drömma om</b>.</li>
<li><b>till i stället för hos:</b> <i>Vi är till mormor</i>. Rätt: <b>hos mormor</b>.</li>
<li><b>hem och hemma:</b> <i>Jag är hem</i>. Rätt: <b>Jag är hemma</b>.</li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>i: inne i något, länder och städer.</li>
<li>på: ytor, öar, arbetsplatser, institutioner och händelser.</li>
<li>till = vart, hos = var hos en person, från = varifrån, ur = ut från insidan.</li>
<li>Verb och adjektiv med fast preposition: lär dig dem som ett paket, till exempel <i>vänta på, rädd för, intresserad av</i>.</li>
</ul>
`;
