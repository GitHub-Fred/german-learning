(()=>{"use strict";

const REGLER = {
  sin: "Ägaren är subjektet i samma sats. Då används <b>sin/sitt/sina</b>.",
  form: "Ägaren är subjektet, så det blir <i>sin</i>. Formen följer det man äger: <b>sin</b> + en-ord, <b>sitt</b> + ett-ord, <b>sina</b> + plural.",
  hans: "Ägaren är inte subjektet i satsen. Då används <b>hans/hennes/deras</b>.",
  subj: "Ägarordet hör till subjektet. Subjektet kan aldrig ha <i>sin</i>. Då används <b>hans/hennes/deras</b>.",
  bisats: "Bisatsen har ett eget subjekt. <i>sin</i> syftar bara på subjektet i samma sats.",
  jag: "<i>sin</i> finns bara i tredje person. Med jag, du, vi och ni används min, din, vår, er.",
  bisatsSubj: "Ägarordet hör till subjektet i bisatsen. Subjektet kan aldrig ha <i>sin</i>, så det blir <b>hans/hennes</b>.",
  de: "Även när ägaren står i plural och är subjekt används <b>sin/sitt/sina</b>, inte <i>deras</i>.",
  dess: "Ägaren är subjektet, så det blir <i>sin/sitt/sina</i>. <i>dess</i> används bara när ägaren inte är subjekt."
};

/* [mening med %, rätt, [fel], vems (null = ingen ledtråd), regel, svår] */
const D_WAHL = [
["Erik tvättar % bil.","sin",["hans","sitt"],"Eriks bil","sin"],
["Lisa ringer % mamma varje dag.","sin",["hennes","sitt"],"Lisas mamma","sin"],
["Kalle älskar % katt.","sin",["hans"],"Kalles katt","sin"],
["Johan glömde % mobil hemma.","sin",["hans","sitt"],"Johans mobil","sin"],
["Maja cyklar till jobbet med % kollega.","sin",["hennes"],"Majas kollega","sin"],
["Sara ringde % syster och sa grattis.","sin",["hennes"],"Saras syster","sin"],
["Lisa har sålt % hus.","sitt",["sin","hennes"],"Lisas hus","form"],
["Lisa träffar % vänner på fredag.","sina",["sin","hennes"],"Lisas vänner","form"],
["Emma har tappat % glasögon.","sina",["sin","hennes"],"Emmas glasögon","form"],
["Oskar packar % väska.","sin",["sitt","sina"],"Oskars väska","form"],
["Hunden leker med % boll.","sin",["sitt","dess"],"hundens boll","dess"],
["Företaget har flyttat % kontor till Malmö.","sitt",["sin","dess"],"företagets kontor","dess"],
["Erik är bortrest, så Anna lånar % cykel.","hans",["sin"],"Eriks cykel","hans"],
["Jag hjälpte Erik med % flytt.","hans",["sin"],"Eriks flytt","hans"],
["Vi besökte Anna och % man.","hennes",["sin"],"Annas man","hans"],
["Erik är från Lund. % bror bor i Malmö.","Hans",["Sin"],"Eriks bror","subj"],
["Erik har ett nytt jobb. % chef är snäll.","Hans",["Sin"],"Eriks chef","subj"],
["Anna och % man kommer i kväll.","hennes",["sin"],"Annas man","subj"],
["Per och % fru bor i Umeå.","hans",["sin"],"Pers fru","subj"],
["Maria och % syster ska åka till Paris.","hennes",["sin"],"Marias syster","subj"],
["Anna kom, men % man var sjuk.","hennes",["sin"],"Annas man","subj"],
["Grannarna har sålt % bil.","sin",["deras","sina"],"grannarnas bil","de"],
["Barnen leker med % hund.","sin",["deras","sina"],"barnens hund","de"],
["Grannarna har målat % hus.","sitt",["deras","sin"],"grannarnas hus","de"],
["Mina föräldrar firar % bröllopsdag i dag.","sin",["deras","sina"],"föräldrarnas bröllopsdag","de"],
["Jag tvättar % bil.","min",["sin"],null,"jag"],
["Vi träffade % vänner i stan.","våra",["sina"],null,"jag"],
["Du har glömt % nyckel.","din",["sin"],null,"jag"],
["Ni har glömt % jackor.","era",["sina"],null,"jag"],
["Erik sa att % fru var sjuk.","hans",["sin"],"Eriks fru","bisatsSubj",1],
["Lena berättade att % dotter hade fått jobb.","hennes",["sin"],"Lenas dotter","bisatsSubj",1],
["Erik sa att han hade glömt % nycklar.","sina",["hans"],"Eriks nycklar (han = Erik)","bisats",1],
["Anna tror att Per har tagit % telefon.","hennes",["sin"],"Annas telefon","bisats",1],
["Anna tror att Per har tagit % telefon.","sin",["hennes"],"Pers telefon","bisats",1]
];

/* [mening med %, [lösningar], vems (null = ingen ledtråd), regel] */
const D_TIPPEN = [
["Oskar har glömt % pass.",["sitt"],"Oskars pass","form"],
["Klara vattnar % blommor.",["sina"],"Klaras blommor","form"],
["Karin lånade ut % bil till Erik.",["sin"],"Karins bil","sin"],
["Erik lånade Karins bil och körde till % jobb.",["sitt"],"Eriks jobb","form"],
["Barnet sover i % säng.",["sin"],"barnets säng","sin"],
["Familjen Berg har köpt % första hus.",["sitt"],"familjens hus","form"],
["Eleverna har glömt % böcker.",["sina"],"elevernas böcker","de"],
["Kalle och Lisa har sålt % bil.",["sin"],"Kalles och Lisas bil","de"],
["Per och % bror spelar fotboll.",["hans"],"Pers bror","subj"],
["Eleverna och % lärare åker på utflykt.",["deras"],"elevernas lärare","subj"],
["Sara är glad, för % syster kommer hem i dag.",["hennes"],"Saras syster","subj"],
["Mina grannar? Jag känner inte % barn.",["deras"],"grannarnas barn","hans"],
["Vi har bjudit Anna och % barn på middag.",["hennes"],"Annas barn","hans"],
["Maja har flyttat. Jag har inte sett % nya lägenhet.",["hennes"],"Majas lägenhet","hans"],
["Lena säger att % man lagar mat varje dag.",["hennes"],"Lenas man","bisatsSubj"],
["Tobias tror att % chef vill sparka honom.",["hans"],"Tobias chef","bisatsSubj"],
["Johan sa att han skulle ringa % mamma.",["sin"],"Johans mamma (han = Johan)","bisats"],
["Kalle vet inte var han har lagt % plånbok.",["sin"],"Kalles plånbok (han = Kalle)","bisats"],
["Vi har tagit med % barn.",["våra"],null,"jag"],
["Har du ringt % mamma?",["din"],null,"jag"]
];

const ledtraad=vems=>vems?"Det gäller <i>"+esc(vems)+"</i>. ":"";

D_WAHL.forEach(([satz,richtig,falsch,vems,r,schwer])=>{
  neueKarte({
    deck:"sin", typ:"wahl", schwer:!!schwer,
    rohfrage:satz+"|"+(vems||""),
    frage:esc(satz).replace("%",LUECKE),
    anweisung:ledtraad(vems)+"Vilket ord passar?",
    optionen:[richtig].concat(falsch), richtig:richtig,
    erklaerung:REGLER[r]+" &ndash; "+esc(satz.replace("%",richtig))
  });
});

D_TIPPEN.forEach(([satz,loesungen,vems,r])=>{
  neueKarte({
    deck:"sin", typ:"tippen", schwer:true,
    rohfrage:satz+"|"+(vems||""),
    frage:esc(satz).replace("%",LUECKE),
    anweisung:ledtraad(vems)+"Skriv rätt ägarord.",
    loesungen:loesungen,
    erklaerung:REGLER[r]+" &ndash; "+esc(satz.replace("%",loesungen[0]))
  });
});

})();

REGELSEITEN.sin=`
<h2>Två ord för tyskans sein och ihr</h2>
<p>På tyska kan meningen <i>Erik wäscht sein Auto</i> betyda två saker: Erik tvättar sin egen bil, eller han tvättar en annan mans bil. Svenskan skiljer på detta:</p>
<p class="beispiel">Erik tvättar <b>sin</b> bil. (Eriks egen bil)<br>Erik tvättar <b>hans</b> bil. (en annan mans bil, till exempel Johans)</p>
<p><b>sin, sitt, sina</b> kallas <b>reflexiva ägarord</b>. Reflexiv betyder att ordet syftar tillbaka på subjektet i samma sats. Ordet finns bara i tredje person (han, hon, den, det, de).</p>

<h2>Grundregeln</h2>
<div class="merke"><p>Är ägaren <b>subjektet i samma sats</b>? Då heter det <b>sin, sitt, sina</b>. Annars heter det <b>hans, hennes, deras</b> (och <b>dess</b> för saker).</p></div>
<p>Subjektet är den som gör något eller den som satsen handlar om. Ett bra test: sätt in ägarens namn. Om det blir samma person som subjektet, välj <i>sin</i>.</p>
<p class="beispiel">Lisa ringer [Lisas] mamma. → Lisa ringer <b>sin</b> mamma.<br>Erik är bortrest, så Anna lånar [Eriks] cykel. → Anna lånar <b>hans</b> cykel.<br>Jag hjälpte Erik med [Eriks] flytt. → Jag hjälpte Erik med <b>hans</b> flytt.</p>

<h2>Sin, sitt eller sina?</h2>
<p>Formen följer det man <b>äger</b>, inte ägaren. Det är som med <i>min, mitt, mina</i>.</p>
<div class="tabelle"><table>
<thead><tr><th>Det man äger</th><th>Form</th><th>Exempel</th></tr></thead>
<tbody>
<tr><td>en-ord</td><td><b>sin</b></td><td>Oskar packar sin väska.</td></tr>
<tr><td>ett-ord</td><td><b>sitt</b></td><td>Lisa har sålt sitt hus.</td></tr>
<tr><td>plural</td><td><b>sina</b></td><td>Lisa träffar sina vänner.</td></tr>
</tbody></table></div>
<p><b>hans, hennes, deras, dess</b> ändras däremot aldrig: hans bil, hans hus, hans barn.</p>

<h2>Ägaren i plural</h2>
<p>Även när subjektet står i plural används <b>sin, sitt, sina</b>. Formen beror fortfarande bara på det man äger.</p>
<p class="beispiel">Grannarna har sålt <b>sin</b> bil. (en bil)<br>Grannarna har målat <b>sitt</b> hus. (ett hus)<br>Eleverna har glömt <b>sina</b> böcker. (flera böcker)</p>
<p>Här gör tyskar ofta fel, eftersom tyskan säger <i>ihr Auto</i>. I talspråk hör man ibland <i>deras</i> i sådana meningar, men korrekt svenska är <b>sin</b>.</p>
<p>Är ägaren inte subjektet, blir det <b>deras</b>: <i>Mina grannar? Jag känner inte deras barn.</i></p>

<h2>Subjektet kan inte ha sin</h2>
<p><i>sin</i> syftar på subjektet, så det kan aldrig själv stå i subjektet. Det gäller särskilt när två personer är subjekt tillsammans:</p>
<p class="beispiel">Per och <b>hans</b> fru bor i Umeå.<br>Anna och <b>hennes</b> man kommer i kväll.<br>Erik är från Lund. <b>Hans</b> bror bor i Malmö.</p>
<p>I den sista meningen är <i>hans bror</i> subjekt. Därför går <i>sin</i> inte.</p>

<h2>Sin i bisatser</h2>
<p>En <b>bisats</b> (till exempel en sats som börjar med <i>att</i>) har ett eget subjekt. <i>sin</i> syftar bara på subjektet i <b>samma</b> sats.</p>
<ul>
<li><b>Ägarordet hör till bisatsens subjekt:</b> då går <i>sin</i> inte. <i>Erik sa att <b>hans</b> fru var sjuk.</i> (<i>hans fru</i> är subjekt i bisatsen)</li>
<li><b>Ägaren är subjekt i bisatsen:</b> då blir det <i>sin</i>. <i>Erik sa att han hade glömt <b>sina</b> nycklar.</i> (<i>han</i> = Erik är subjekt i bisatsen)</li>
<li><b>Ägaren är subjekt i huvudsatsen, men inte i bisatsen:</b> då blir det <i>hans/hennes</i>. <i>Anna tror att Per har tagit <b>hennes</b> telefon.</i> (Annas telefon)</li>
</ul>
<p>Jämför: <i>Anna tror att Per har tagit <b>sin</b> telefon.</i> Här är det Pers egen telefon, för Per är subjekt i bisatsen.</p>

<h2>Bara i tredje person</h2>
<p>Med <i>jag, du, vi</i> och <i>ni</i> används de vanliga ägarorden, även om ägaren är subjekt:</p>
<p class="beispiel">Jag tvättar <b>min</b> bil. Du har glömt <b>din</b> nyckel.<br>Vi träffade <b>våra</b> vänner. Ni har glömt <b>era</b> jackor.</p>

<h2>Dess</h2>
<p><b>dess</b> är ägarordet för saker, djur och organisationer (tyska <i>dessen</i>, <i>sein</i>). Men regeln är densamma: är ägaren subjekt, heter det <i>sin/sitt/sina</i>.</p>
<p class="beispiel">Hunden leker med <b>sin</b> boll.<br>Företaget har flyttat <b>sitt</b> kontor till Malmö.<br>Vi besökte staden och <b>dess</b> museer.</p>
<p><i>dess</i> är ganska formellt och används mest i skrift.</p>

<h2>Sin egen</h2>
<p>Vill man betona att det verkligen är ens egen sak, kan man lägga till <b>egen, eget, egna</b>: <i>Han tar sin egen bil. Hon har sitt eget rum.</i></p>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>hans när subjektet är ägaren:</b> <i>Erik tvättar hans bil</i> betyder en annan mans bil. Menar du Eriks egen bil, säg <b>sin</b>.</li>
<li><b>deras när subjektet är plural:</b> <i>Barnen leker med deras hund</i> betyder någon annans hund. Rätt för barnens egen: <b>sin hund</b>.</li>
<li><b>sin i subjektet:</b> <i>Per och sin fru</i>. Rätt: <b>Per och hans fru</b>.</li>
<li><b>sina efter plural ägare:</b> <i>Grannarna har sålt sina bil</i>. Formen följer det man äger: <b>sin bil</b>.</li>
<li><b>sin med jag eller vi:</b> <i>Jag tvättar sin bil</i>. Rätt: <b>min bil</b>.</li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>Ägaren är subjekt i samma sats: sin, sitt, sina.</li>
<li>Annars: hans, hennes, deras, dess.</li>
<li>sin/sitt/sina följer det man äger.</li>
<li>Gäller även när subjektet är plural.</li>
<li>Aldrig i subjektet: Per och hans fru.</li>
<li>Bara tredje person. Annars min, din, vår, er.</li>
</ul>
`;
