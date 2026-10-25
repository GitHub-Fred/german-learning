(()=>{"use strict";
const R={
  for_sedan:"<b>för ... sedan</b> säger när något hände. Det har redan hänt.",
  i_tid:"<b>i</b> + tid säger hur länge något pågår eller pågick.",
  om:"<b>om</b> + tid säger när något ska hända i framtiden.",
  pa_tid:"<b>på</b> + tid säger hur lång tid det tar att bli klar med något.",
  pa_lange:"Med <i>inte</i> säger man <b>på länge</b>: under lång tid fram till nu.",
  pa_dag:"<b>på</b> + veckodag betyder den närmaste dagen framåt: på måndag.",
  i_dags:"<b>i</b> + veckodag + <b>-s</b> betyder den senaste dagen som har varit: i måndags.",
  pa_dagar:"<b>på</b> + veckodag i plural betyder varje vecka: på måndagar.",
  i_somras:"<b>i somras, i vintras, i våras, i höstas</b> betyder den senaste årstiden som har varit.",
  i_sommar:"<b>i sommar, i vinter, i vår, i höst</b> betyder den här årstiden, nu eller snart.",
  pa_arstid:"<b>på sommaren, på vintern</b> betyder ofta varje år, som en vana.",
  i_fjol:"<b>i fjol</b> betyder förra året.",
  i_ar:"<b>i år</b> betyder det här året.",
  pa_morgonen:"<b>på morgonen, på kvällen</b> betyder ofta som en vana, när det är morgon eller kväll.",
  i_morgon:"<b>i morgon</b> (eller <b>imorgon</b>) betyder dagen efter i dag.",
  i_morse:"<b>i morse</b> betyder tidigt i dag. Det har redan hänt.",
  i_kvall:"<b>i kväll</b> betyder i dag på kvällen.",
  manad:"Månader tar <b>i</b>: i april, i maj.",
  decennium:"Årtionden tar <b>på</b>: på 1990-talet.",
  under:"<b>under</b> + en händelse betyder medan den pågick: under kriget.",
  sedan:"<b>sedan</b> + en tidpunkt betyder från den tidpunkten fram till nu."
};
const text=r=>R[r]||r;

// [mening, rätt, fel, regel, svår]
const D_WAHL=[
["Jag flyttade till Sverige % tre år sedan.","för",["i","om"],"for_sedan"],
["Han åkte hem % en vecka sedan.","för",["i","om"],"for_sedan"],
["Det hände % länge sedan.","för",["på","i"],"for_sedan"],
["Vi har bott här % fem år.","i",["om","för"],"i_tid"],
["Jag väntade % två timmar!","i",["om","för"],"i_tid"],
["Vi var i Spanien % två veckor.","i",["om","för"],"i_tid"],
["Jag tar examen % två år.","om",["i","för"],"om"],
["Tåget kommer % tio minuter.","om",["i","för"],"om"],
["Konserten börjar % en timme.","om",["i","för"],"om"],
["Vi ses % måndag!","på",["i","för"],"pa_dag"],
["Jag träffade henne % måndags.","i",["på","om"],"i_dags"],
["Jag tränar % måndagar.","på",["i","för"],"pa_dagar"],
["Vi var i Italien % somras.","i",["på","om"],"i_somras"],
["Vi ska åka till Grekland % sommar.","i",["på","om"],"i_sommar"],
["Vi åker alltid till landet % sommaren.","på",["i","för"],"pa_arstid"],
["Hon fyllde 30 % fjol.","i",["på","om"],"i_fjol"],
["Jag har mycket att göra % år.","i",["på","om"],"i_ar"],
["Jag dricker alltid kaffe % morgonen.","på",["i","för"],"pa_morgonen"],
["Vi ses % morgon!","i",["på","om"],"i_morgon"],
["Jag vaknade tidigt % morse.","i",["på","om"],"i_morse"],
["Vad ska du göra % kväll?","i",["på","om"],"i_kvall"],
["Jag var i London % april.","i",["på","om"],"manad"],
["Mina föräldrar träffades % 1970-talet.","på",["i","om"],"decennium"],
["Min farfar var soldat % kriget.","under",["på","om"],"under"],
["Jag somnade % filmen.","under",["om","för"],"under"],
["Jag har bott i Malmö % 2019.","sedan",["i","för"],"sedan"],
["Det har regnat sedan % fredags.","i",["på","om"],"<b>sedan i fredags</b> betyder från förra fredagen fram till nu."],
["Vi städade hela huset % en timme.","på",["om","för"],"pa_tid"],
["Jag träffade Lisa % och vi fikade.","i måndags",["på måndag"],"i_dags",1],
["Jag ska träffa Lisa %.","på måndag",["i måndags"],"pa_dag",1],
["Vi ska åka till Kreta %.","i sommar",["i somras"],"i_sommar",1],
["Jag kom till Sverige %.","för två år sedan",["om två år","på två år"],"for_sedan",1],
["Vi har bott här %.","i två år",["för två år sedan","om två år"],"i_tid",1],
["Jag tar studenten %.","om två år",["för två år sedan","i två år"],"om",1],
["Huset blev klart %.","på ett år",["i ett år","om ett år"],"pa_tid",1],
["Varje år åker vi till fjällen %.","på vintern",["i vintras","i vinter"],"pa_arstid",1],
["Vi har inte setts %.","på länge",["i länge","om länge"],"pa_lange",1],
["Jag har varit sjuk %.","sedan i fredags",["i fredags","på fredag"],"sedan",1],
["Hon slutade röka %.","för tio år sedan",["sedan tio år","om tio år"],"for_sedan",1],
["Jag ska ringa dig %.","i morgon",["i morse"],"i_morgon",1],
["Jag vaknade med huvudvärk %.","i morse",["i morgon"],"i_morse",1]
];

// [mening, lösningar, regel]
const D_TIPPEN=[
["Jag började jobba här % fyra år sedan.",["för"],"for_sedan"],
["Vi har varit gifta % tjugo år.",["i"],"i_tid"],
["Han har jobbat här % sex månader.",["i"],"i_tid"],
["Filmen börjar % fem minuter.",["om"],"om"],
["Vi gifter oss % ett år.",["om"],"om"],
["Hon fyller 40 % en vecka.",["om"],"om"],
["Hon läste ut boken % två timmar.",["på"],"pa_tid"],
["Vi ses % tisdag!",["på"],"pa_dag"],
["Jag var sjuk % tisdags.",["i"],"i_dags"],
["Jag jobbar hemma % fredagar.",["på"],"pa_dagar"],
["Vi var i Paris % våras.",["i"],"i_somras"],
["Jag ska börja en kurs % höst.",["i"],"i_sommar"],
["Hon är född % 1980-talet.",["på"],"decennium"],
["De har varit ihop % 2020.",["sedan","sen"],"sedan"],
["Jag har inte ätit något % i morse.",["sedan","sen"],"sedan"],
["Hon har bott här % i fjol.",["sedan","sen"],"sedan"]
];

D_WAHL.forEach(([satz,richtig,falsch,regel,schwer])=>{
  neueKarte({
    deck:"tid", typ:"wahl", schwer:!!schwer,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:richtig.includes(" ")?"Vilket tidsuttryck passar?":"Vilket ord passar?",
    optionen:[richtig].concat(falsch), richtig:richtig,
    erklaerung:text(regel)+" &ndash; "+esc(satz.replace("%",richtig))
  });
});

D_TIPPEN.forEach(([satz,loesungen,regel])=>{
  neueKarte({
    deck:"tid", typ:"tippen", schwer:true,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Skriv <i>i</i>, <i>på</i>, <i>om</i>, <i>för</i> eller <i>sedan</i>.",
    loesungen:loesungen,
    erklaerung:text(regel)+" &ndash; "+esc(satz.replace("%",loesungen[0]))
  });
});
})();

REGELSEITEN.tid=`
<h2>Tid med prepositioner</h2>
<p>När man talar om tid använder svenskan små ord som <i>i, på, om, för</i> och <i>sedan</i>. Det är lätt att blanda ihop dem, eftersom samma tyska ord (till exempel <i>in</i> eller <i>seit</i>) kan bli olika ord på svenska. Den här sidan går igenom alla regler.</p>

<h2>Hur länge, när och hur snabbt?</h2>
<div class="tabelle"><table>
<thead><tr><th>Uttryck</th><th>Betydelse</th><th>Exempel</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td><b>för</b> ... <b>sedan</b></td><td>när något hände (förr)</td><td>för tre år sedan</td><td><i>vor drei Jahren</i></td></tr>
<tr><td><b>i</b> + tid</td><td>hur länge något pågår eller pågick</td><td>i två timmar</td><td><i>zwei Stunden lang, seit</i></td></tr>
<tr><td><b>om</b> + tid</td><td>när något ska hända (framtid)</td><td>om tio minuter</td><td><i>in zehn Minuten</i></td></tr>
<tr><td><b>på</b> + tid</td><td>hur lång tid det tar att bli klar</td><td>på en timme</td><td><i>in einer Stunde</i></td></tr>
<tr><td><b>sedan</b> + tidpunkt</td><td>från en tidpunkt fram till nu</td><td>sedan 2019</td><td><i>seit 2019</i></td></tr>
</tbody></table></div>

<h3>för ... sedan</h3>
<p>Säger när något hände. Det har redan hänt. Verbet står oftast i preteritum (se högen <i>Tempus</i>).</p>
<p class="beispiel">Jag flyttade till Sverige för tre år sedan.<br>Det hände för länge sedan.</p>
<h3>i + tid</h3>
<p>Säger hur länge något pågår eller pågick.</p>
<p class="beispiel">Vi var i Spanien i två veckor.<br>Jag väntade i två timmar!</p>
<p>Mycket viktigt för tyskar: när något har pågått fram till nu, använder tyskan <i>seit</i> och presens: <i>Ich wohne seit fünf Jahren hier</i>. Svenskan använder <b>i</b> och perfekt:</p>
<p class="beispiel">Vi har bott här i fem år. (inte: Vi bor här sedan fem år)</p>
<h3>sedan + tidpunkt</h3>
<p><b>sedan</b> används bara med en <b>tidpunkt</b> (ett år, en dag, en händelse), inte med en tidslängd. I talspråk och i enkel text säger man ofta <b>sen</b>.</p>
<p class="beispiel">Jag har bott i Malmö sedan 2019.<br>Jag har varit sjuk sedan i fredags.<br>Jag har inte ätit något sedan i morse.</p>
<h3>om + tid</h3>
<p><b>om</b> säger när något ska hända i framtiden, räknat från nu.</p>
<p class="beispiel">Tåget kommer om tio minuter.<br>Vi gifter oss om ett år.</p>
<p>Tyskans <i>in zehn Minuten</i> blir alltså <b>om</b>, inte <i>i</i>. <i>i tio minuter</i> betyder <i>zehn Minuten lang</i>.</p>
<h3>på + tid</h3>
<p><b>på</b> säger hur lång tid det tar att bli klar med något.</p>
<p class="beispiel">Vi städade hela huset på en timme.<br>Huset blev klart på ett år.</p>
<p>Med <i>inte</i> säger man <b>på länge</b>: <i>Vi har inte setts på länge</i> (<i>seit Langem nicht</i>).</p>
<div class="merke"><p>för tre år <b>sedan</b> = förr. <b>i</b> tre år = hur länge. <b>om</b> tre år = framtid. <b>på</b> tre år = hur lång tid det tog.</p></div>

<h2>Dagar, årstider och delar av dagen</h2>
<p>Här visar prepositionen och formen om det gäller förr, nu, framtiden eller en vana.</p>
<div class="tabelle"><table>
<thead><tr><th></th><th>Förra (har varit)</th><th>Den här / nästa</th><th>Varje gång (vana)</th></tr></thead>
<tbody>
<tr><td>veckodag</td><td>i måndags</td><td>på måndag</td><td>på måndagar</td></tr>
<tr><td>årstid</td><td>i somras, i vintras, i våras, i höstas</td><td>i sommar, i vinter, i vår, i höst</td><td>på sommaren, på vintern</td></tr>
<tr><td>dag</td><td>i går</td><td>i dag, i morgon</td><td>varje dag</td></tr>
<tr><td>morgon</td><td>i morse</td><td>i morgon bitti</td><td>på morgonen</td></tr>
<tr><td>kväll</td><td>i går kväll</td><td>i kväll</td><td>på kvällen</td></tr>
<tr><td>år</td><td>i fjol, förra året</td><td>i år, nästa år</td><td>varje år</td></tr>
</tbody></table></div>
<h3>Veckodagar</h3>
<ul>
<li><b>på måndag</b>: den närmaste måndagen framåt. <i>Vi ses på måndag!</i></li>
<li><b>i måndags</b>: den senaste måndagen som har varit. <i>Jag träffade henne i måndags.</i></li>
<li><b>på måndagar</b>: varje måndag. <i>Jag tränar på måndagar.</i></li>
</ul>
<h3>Årstider</h3>
<ul>
<li><b>i sommar</b>: den här sommaren, nu eller snart.</li>
<li><b>i somras</b>: den senaste sommaren som har varit. Samma sak: i vintras, i våras, i höstas.</li>
<li><b>på sommaren</b> (eller <b>på somrarna</b>): varje sommar, som en vana. <i>Vi åker alltid till landet på sommaren.</i></li>
</ul>
<h3>Delar av dagen</h3>
<ul>
<li><b>i morse</b> betyder tidigt i dag. Det har redan hänt. <i>Jag vaknade tidigt i morse.</i></li>
<li><b>i morgon</b> (också <b>imorgon</b>) betyder dagen efter i dag. Blanda inte ihop dem!</li>
<li><b>i kväll</b> betyder i dag på kvällen. <b>i natt</b> kan betyda både den kommande natten och natten som just har varit. Sammanhanget visar vilken.</li>
<li><b>på morgonen, på kvällen</b> beskriver ofta en vana: <i>Jag dricker alltid kaffe på morgonen.</i></li>
</ul>
<p>Lägg märke till: <i>i dag, i går, i morgon</i> skrivs också ihop: <i>idag, igår, imorgon</i>. Båda sätten är rätt.</p>

<h2>Månader, år och årtionden</h2>
<ul>
<li>Månader tar <b>i</b>: <i>i april, i maj</i>.</li>
<li>Årtal står utan preposition, eller med <b>år</b>: <i>Jag flyttade hit 2019. Det hände år 1995.</i> Säg inte <i>i 2019</i>.</li>
<li><b>i år</b> betyder det här året. <b>i fjol</b> betyder förra året.</li>
<li>Årtionden och århundraden tar <b>på</b>: <i>på 1990-talet, på 1800-talet</i>.</li>
</ul>

<h2>Under</h2>
<p><b>under</b> + en händelse betyder medan den pågick, som tyskans <i>während</i>.</p>
<p class="beispiel">Min farfar var soldat under kriget.<br>Jag somnade under filmen.</p>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>sedan med tidslängd:</b> <i>Jag bor här sedan fem år</i>. Rätt: <b>Jag har bott här i fem år</b>.</li>
<li><b>i för framtid:</b> <i>Tåget kommer i tio minuter</i>. Rätt: <b>om tio minuter</b>.</li>
<li><b>för utan sedan:</b> <i>för tre år</i>. Rätt: <b>för tre år sedan</b>.</li>
<li><b>Fel riktning i tiden:</b> <i>på måndag</i> är framåt, <i>i måndags</i> bakåt. <i>i sommar</i> är nu eller snart, <i>i somras</i> bakåt.</li>
<li><b>i morse och i morgon:</b> <i>i morse</i> är förbi, <i>i morgon</i> kommer.</li>
<li><b>i före årtal:</b> <i>i 2019</i>. Rätt: <b>2019</b> eller <b>år 2019</b>.</li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>för ... sedan (förr), i (hur länge), om (framtid), på (hur lång tid det tog), sedan + tidpunkt.</li>
<li>Har pågått fram till nu: perfekt + i: <i>Jag har bott här i fem år.</i></li>
<li>på måndag / i måndags / på måndagar.</li>
<li>i sommar / i somras / på sommaren.</li>
<li>i morse (förbi), i morgon (kommer), i kväll (i dag), i fjol, i år.</li>
<li>i april, på 1990-talet, under kriget.</li>
</ul>
`;
