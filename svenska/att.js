(()=>{"use strict";

const REGLER = {
  modal:"Efter hjälpverben <i>kan</i>, <i>vill</i>, <i>ska</i>, <i>måste</i>, <i>får</i> och <i>bör</i> kommer infinitiv utan <i>att</i>.",
  brukar:"<i>Brukar</i> fungerar som ett hjälpverb: infinitiv utan <i>att</i>.",
  verb:"Efter de flesta vanliga verb står <i>att</i> före infinitiven.",
  adj:"Efter <i>det är</i> + adjektiv står <i>att</i> före infinitiven.",
  subst:"Efter uttryck som <i>ha lust</i>, <i>ha tid</i> och <i>det är dags</i> står <i>att</i> före infinitiven.",
  prep:"Efter en preposition (för, utan, om, på, genom, emot, efter) står alltid <i>att</i> före infinitiven.",
  kommer:"<i>Kommer att</i> + infinitiv betyder framtid. I formell text ska <i>att</i> vara med. I talspråk hoppar många över det.",
  serut:"<i>Ser ut att</i> + infinitiv: här behövs <i>att</i>.",
  lar:"<i>Lär</i> betyder här <i>det sägs</i>. Det fungerar som ett hjälpverb: infinitiv utan <i>att</i>.",
  later:"<i>Låta</i> (= tillåta) tar infinitiv utan <i>att</i>.",
  villatt:"<i>Vill</i> + infinitiv har inget <i>att</i>. Men efter <i>vill</i> kan en hel bisats komma (subjekt + verb), och då behövs <i>att</i>."
};

const INGET = "–";
const fyll = (satz,svar) => satz.replace("% ", svar===INGET ? "" : svar+" ");
const formell = regel => regel==="kommer" ? " Skriv som i en formell text." : "";

/* [mening, rätt ("att" eller "–"), regel, schwer] */
const A_WAHL = [
["Jag kan % simma.",INGET,"modal"],
["Vi vill % åka till Stockholm.",INGET,"modal"],
["Du måste % äta frukost.",INGET,"modal"],
["Jag ska % ringa dig i kväll.",INGET,"modal"],
["Får jag % låna din penna?",INGET,"modal"],
["Man bör % dricka mycket vatten.",INGET,"modal"],
["Han brukar % gå och lägga sig tidigt.",INGET,"brukar"],
["Jag tycker om % läsa.","att","verb"],
["Hon älskar % laga mat.","att","verb"],
["Kom ihåg % låsa dörren!","att","verb"],
["Det är svårt % lära sig svenska.","att","adj"],
["Det är viktigt % sova ordentligt.","att","adj"],
["Jag har inte lust % städa.","att","subst"],
["Nu är det dags % gå hem.","att","subst"],
["Jag åker till stan för % handla.","att","prep"],
["Han gick utan % säga hej.","att","prep"],
["Hon drömmer om % resa jorden runt.","att","prep"],
["Jag är rädd för % flyga.","att","prep"],
["Jag har bestämt mig för % sluta röka.","att","prep"],
["Man lär sig mycket genom % läsa.","att","prep"],
["I stället för % klaga kan du hjälpa till.","att","prep"],
["Det kommer % regna i morgon.","att","kommer",1],
["Det ser ut % bli regn.","att","serut",1],
["Han lär % vara mycket rik.",INGET,"lar",1],
["Hon låter barnen % leka ute.",INGET,"later",1],
["Jag vill % du stannar.","att","villatt",1],
["Jag ser fram emot % träffa dig.","att","prep",1],
["Efter % ha ätit gick vi ut.","att","prep",1]
];

A_WAHL.forEach(([satz,richtig,regel,schwer])=>{
  neueKarte({
    deck:"att", typ:"wahl", schwer:!!schwer,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Med eller utan <i>att</i>?"+formell(regel),
    optionen:["att",INGET], richtig:richtig,
    erklaerung:REGLER[regel]+" &ndash; "+esc(fyll(satz,richtig))
  });
});

/* [mening, rätt] - "att" är markerat med * */
const A_ORDKLASS = [
["Jag lovar *att* komma.","infinitivmärke"],
["Jag vet *att* hon bor här.","subjunktion"],
["Det är roligt *att* dansa.","infinitivmärke"],
["Det är roligt *att* du är här.","subjunktion"],
["Vi åkte dit för *att* bada.","infinitivmärke"],
["Jag stannade hemma för *att* jag var sjuk.","subjunktion"]
];

A_ORDKLASS.forEach(([satz,richtig])=>{
  const ren=satz.replace(/\*/g,"");
  neueKarte({
    deck:"att", typ:"wahl", schwer:true,
    rohfrage:ren+"|ordklass",
    frage:esc(satz).replace(/\*(.+?)\*/,"<b>$1</b>"),
    anweisung:"Vad är <i>att</i> här?",
    optionen:["infinitivmärke","subjunktion"], richtig:richtig,
    erklaerung:(richtig==="infinitivmärke"
      ? "Efter <i>att</i> kommer en infinitiv. Då är <i>att</i> ett infinitivmärke."
      : "Efter <i>att</i> kommer en hel bisats med subjekt och verb. Då är <i>att</i> en subjunktion.")
      +" &ndash; "+esc(ren)
  });
});

/* [mening, verb, rätt svar, regel] */
const A_TIPPEN = [
["Jag brukar % till jobbet.","cykla","cykla","brukar"],
["Jag tycker om % i skogen.","promenera","att promenera","verb"],
["Det är dags % nu.","gå","att gå","subst"],
["Vi måste % nu.","åka","åka","modal"],
["Hon åkte till Spanien för % spanska.","lära sig","att lära sig","prep"],
["Han gick hem utan % hej då.","säga","att säga","prep"],
["Det kommer % i morgon.","snöa","att snöa","kommer"]
];

A_TIPPEN.forEach(([satz,verb,svar,regel])=>{
  neueKarte({
    deck:"att", typ:"tippen", schwer:true,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Skriv <i>"+esc(verb)+"</i> i luckan, med eller utan <i>att</i>."+formell(regel),
    loesungen:[svar],
    erklaerung:REGLER[regel]+" &ndash; "+esc(satz.replace("%",svar))
  });
});

})();

REGELSEITEN.att=`
<h2>Två sorters att</h2>
<p>Det svenska ordet <b>att</b> motsvarar två olika tyska ord:</p>
<ul>
<li><b>att</b> före en infinitiv = tyskans <i>zu</i>. Då kallas det <b>infinitivmärke</b>: <i>Jag lovar att komma.</i> (<i>Ich verspreche zu kommen.</i>)</li>
<li><b>att</b> före en hel bisats med subjekt och verb = tyskans <i>dass</i>. Då kallas det <b>subjunktion</b>: <i>Jag vet att hon bor här.</i> (<i>Ich weiß, dass sie hier wohnt.</i>)</li>
</ul>
<p>Testa: kommer det ett subjekt (jag, hon, du ...) efter <i>att</i>? Då är det en subjunktion. Kommer det direkt en infinitiv? Då är det ett infinitivmärke.</p>
<p class="beispiel">Det är roligt att dansa. (infinitivmärke)<br>Det är roligt att du är här. (subjunktion)<br>Vi åkte dit för att bada. (infinitivmärke)<br>Jag stannade hemma för att jag var sjuk. (subjunktion)</p>
<p>I talspråk uttalas infinitivmärket ofta som <i>å</i>. I skrift skriver man alltid <i>att</i>.</p>
<p>Resten av sidan handlar om infinitivmärket: när infinitiven behöver <i>att</i> och när den klarar sig utan.</p>

<h2>Utan att: hjälpverb</h2>
<p>Efter <b>hjälpverben</b> står infinitiven <b>utan</b> <i>att</i>. Det är samma sak som på tyska: <i>Ich kann schwimmen</i>, inte <i>zu schwimmen</i>.</p>
<div class="tabelle"><table>
<thead><tr><th>Hjälpverb</th><th>Exempel</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>kan</td><td>Jag kan simma.</td><td><i>können</i></td></tr>
<tr><td>vill</td><td>Vi vill åka till Stockholm.</td><td><i>wollen</i></td></tr>
<tr><td>ska</td><td>Jag ska ringa dig i kväll.</td><td><i>werden, sollen</i></td></tr>
<tr><td>måste</td><td>Du måste äta frukost.</td><td><i>müssen</i></td></tr>
<tr><td>får</td><td>Får jag låna din penna?</td><td><i>dürfen</i></td></tr>
<tr><td>bör</td><td>Man bör dricka mycket vatten.</td><td><i>sollte</i></td></tr>
</tbody></table></div>
<p>Några andra verb fungerar likadant, utan <i>att</i>:</p>
<ul>
<li><b>brukar</b> (<i>pflegen zu</i>): <i>Han brukar gå och lägga sig tidigt.</i> Lägg märke till: tyskan har <i>zu</i>, svenskan inte.</li>
<li><b>låta</b> (<i>lassen</i>): <i>Hon låter barnen leka ute.</i></li>
<li><b>lär</b> i betydelsen <i>det sägs</i> (<i>soll angeblich</i>): <i>Han lär vara mycket rik.</i></li>
<li>Även <b>hinna</b>, <b>orka</b>, <b>slippa</b> och <b>behöva</b> tar oftast infinitiv utan <i>att</i>: <i>Jag hinner inte äta. Du behöver inte komma.</i></li>
</ul>
<div class="merke"><p>Hjälpverb (kan, vill, ska, måste, får, bör) och brukar: <b>inget att</b>. De flesta andra verb: <b>att</b>.</p></div>

<h2>Med att</h2>
<h3>Efter vanliga verb</h3>
<p>Efter de flesta andra verb står <i>att</i> före infinitiven, som tyskans <i>zu</i>:</p>
<p class="beispiel">Jag tycker om att läsa.<br>Hon älskar att laga mat.<br>Kom ihåg att låsa dörren!<br>Jag lovar att komma.</p>
<p>Efter några verb, till exempel <b>börja</b>, <b>sluta</b> och <b>försöka</b>, går det bra både med och utan <i>att</i>: <i>Det började (att) regna. Jag har slutat (att) röka.</i></p>
<h3>Efter det är + adjektiv</h3>
<p class="beispiel">Det är svårt att lära sig svenska. (<i>Es ist schwer, Schwedisch zu lernen.</i>)<br>Det är viktigt att sova ordentligt.</p>
<h3>Efter substantivuttryck</h3>
<p>Efter uttryck som <b>ha lust</b>, <b>ha tid</b>, <b>det är dags</b> och <b>ha råd</b>:</p>
<p class="beispiel">Jag har inte lust att städa.<br>Nu är det dags att gå hem.</p>
<h3>Efter preposition: alltid att</h3>
<p>Efter en <b>preposition</b> (för, utan, om, på, genom, emot, efter, i stället för) står alltid <i>att</i> före infinitiven. Här har tyskan ofta andra lösningar, till exempel <i>um ... zu</i>, <i>ohne ... zu</i> eller ett substantiv.</p>
<div class="tabelle"><table>
<thead><tr><th>Svenska</th><th>Tyska</th></tr></thead>
<tbody>
<tr><td>Jag åker till stan för att handla.</td><td><i>um einzukaufen</i></td></tr>
<tr><td>Han gick utan att säga hej.</td><td><i>ohne Hallo zu sagen</i></td></tr>
<tr><td>I stället för att klaga kan du hjälpa till.</td><td><i>statt zu klagen</i></td></tr>
<tr><td>Man lär sig mycket genom att läsa.</td><td><i>indem man liest</i></td></tr>
<tr><td>Jag är rädd för att flyga.</td><td><i>Ich habe Angst vorm Fliegen.</i></td></tr>
<tr><td>Hon drömmer om att resa jorden runt.</td><td><i>Sie träumt davon, um die Welt zu reisen.</i></td></tr>
<tr><td>Jag ser fram emot att träffa dig.</td><td><i>Ich freue mich darauf, dich zu sehen.</i></td></tr>
<tr><td>Efter att ha ätit gick vi ut.</td><td><i>Nachdem wir gegessen hatten ...</i></td></tr>
</tbody></table></div>
<p>Tyskans <i>um ... zu</i> blir alltså <b>för att</b>. Prepositionen och <i>att</i> står tillsammans före infinitiven.</p>

<h2>Specialfall</h2>
<ul>
<li><b>kommer att</b> + infinitiv uttrycker framtid: <i>Det kommer att regna i morgon.</i> I formell text ska <i>att</i> vara med. I talspråk hoppar många över det: <i>Det kommer regna.</i> Jämför <b>ska</b>, som aldrig har <i>att</i>.</li>
<li><b>ser ut att</b> + infinitiv: <i>Det ser ut att bli regn.</i> Här behövs <i>att</i>.</li>
<li><b>vill att</b> + bisats: <i>vill</i> tar infinitiv utan <i>att</i>, men om en hel bisats kommer efter, behövs <i>att</i> (subjunktion): <i>Jag vill att du stannar.</i> (<i>Ich will, dass du bleibst.</i>)</li>
<li><b>inte</b> står efter <i>att</i> och före infinitiven: <i>Försök att inte glömma nycklarna.</i></li>
</ul>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>att efter brukar:</b> <i>Jag brukar att cykla</i> (efter tyskans <i>pflegen zu</i>). Rätt: <b>Jag brukar cykla.</b></li>
<li><b>att efter hjälpverb:</b> <i>Vi måste att åka.</i> Rätt: <b>Vi måste åka.</b></li>
<li><b>Glömt att efter preposition:</b> <i>för handla, utan säga hej</i>. Rätt: <b>för att handla, utan att säga hej</b>.</li>
<li><b>Infinitiv efter vill när subjektet byts:</b> <i>Jag vill du stannar.</i> Rätt: <b>Jag vill att du stannar.</b></li>
<li><b>ska att:</b> <i>Jag ska att ringa.</i> Rätt: <b>Jag ska ringa.</b></li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>Utan att: kan, vill, ska, måste, får, bör, brukar, låta, lär.</li>
<li>Med att: de flesta verb, det är + adjektiv, ha lust/tid, det är dags.</li>
<li>Alltid att efter preposition: för att, utan att, genom att, i stället för att.</li>
<li>kommer att (formellt med att), ser ut att.</li>
<li>att + bisats = <i>dass</i>. att + infinitiv = <i>zu</i>.</li>
</ul>
`;
