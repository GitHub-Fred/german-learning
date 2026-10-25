(()=>{"use strict";

const REGLER = {
  v2:"I en huvudsats står det böjda verbet alltid på plats två.",
  inv:"Om något annat än subjektet står först, kommer verbet före subjektet (omvänd ordföljd).",
  inv_obj:"Även ett objekt kan stå först. Då kommer verbet direkt efter, sedan subjektet.",
  fraga:"I en fråga med frågeord kommer först frågeordet, sedan det böjda verbet och därefter subjektet.",
  jafraga:"I en ja/nej-fråga står verbet först och subjektet direkt efter. Ett satsadverb som <i>någonsin</i> kommer efter subjektet.",
  adv_hs:"I en huvudsats med rak ordföljd står <i>inte</i>, <i>aldrig</i>, <i>alltid</i> och <i>ofta</i> direkt efter det böjda verbet.",
  adv_inv:"Vid omvänd ordföljd står <i>inte</i> och <i>aldrig</i> normalt efter ett pronomen som subjekt: verb + subjekt + inte. Är subjektet ett substantiv, kan <i>inte</i> stå både före och efter det: Idag kommer inte Erik, Idag kommer Erik inte.",
  biff:"BIFF: i en bisats står <i>inte</i>, <i>aldrig</i> och <i>alltid</i> före det böjda verbet.",
  indirekt:"En indirekt fråga är en bisats. Den har rak ordföljd: frågeord + subjekt + verb.",
  bisats_forst:"En bisats som står först räknas som plats ett. Därför kommer huvudsatsens verb direkt efter, före subjektet.",
  biff_forst:"Bisatsen först: <i>inte</i> före verbet i bisatsen (BIFF). Sedan verb + subjekt i huvudsatsen.",
  konj:"<i>Och</i>, <i>men</i>, <i>eller</i> och <i>för</i> räknas inte som plats ett. Om subjektet står direkt efter dem, blir det rak ordföljd: subjekt + verb."
};

const anvisning = a =>
  a==="r" ? "Vilken mening är rätt?"
  : a[0]==="?" ? "Var ska <i>"+esc(a.slice(1))+"</i> stå?"
  : "Börja med <i>"+esc(a.slice(1))+"</i>. Vilken mening är rätt?";

/* [grundmening, anvisning, rätt, fel, regel, schwer] */
const O_WAHL = [
["Jag åker till Göteborg idag.",">Idag","Idag åker jag till Göteborg.",["Idag jag åker till Göteborg.","Idag åker till Göteborg jag."],"inv"],
["Hon läser en bok på kvällen.",">På kvällen","På kvällen läser hon en bok.",["På kvällen hon läser en bok."],"inv"],
["Vi äter middag klockan sex.",">Klockan sex","Klockan sex äter vi middag.",["Klockan sex vi äter middag."],"inv"],
["Jag spelar fotboll på lördagar.",">På lördagar","På lördagar spelar jag fotboll.",["På lördagar jag spelar fotboll."],"inv"],
["Han bor i Uppsala nu.",">Nu","Nu bor han i Uppsala.",["Nu han bor i Uppsala."],"inv"],
["Vi åker till landet i sommar.",">I sommar","I sommar åker vi till landet.",["I sommar vi åker till landet."],"inv"],
["Jag dricker te ibland.",">Ibland","Ibland dricker jag te.",["Ibland jag dricker te."],"inv"],
["Barnen leker i parken efter skolan.",">Efter skolan","Efter skolan leker barnen i parken.",["Efter skolan barnen leker i parken."],"inv"],
["Jag har ett möte på måndag.",">På måndag","På måndag har jag ett möte.",["På måndag jag har ett möte."],"inv"],
["Man dricker mycket kaffe i Sverige.",">I Sverige","I Sverige dricker man mycket kaffe.",["I Sverige man dricker mycket kaffe."],"inv"],
["Vi åt glass varje dag förra sommaren.",">Förra sommaren","Förra sommaren åt vi glass varje dag.",["Förra sommaren vi åt glass varje dag."],"inv"],
["Vi har bott här i tre år.",">I tre år","I tre år har vi bott här.",["I tre år vi har bott här.","I tre år har bott vi här."],"inv"],
["","r","Jag var sjuk. Därför stannade jag hemma.",["Jag var sjuk. Därför jag stannade hemma."],"inv"],
["","r","Först åt vi och sedan gick vi hem.",["Först åt vi och sedan vi gick hem."],"inv"],
["Jag har redan sett den filmen.",">Den filmen","Den filmen har jag redan sett.",["Den filmen jag har redan sett.","Den filmen redan har jag sett."],"inv_obj",1],

["","r","Var bor du?",["Var du bor?"],"fraga"],
["","r","När börjar filmen?",["När filmen börjar?"],"fraga"],
["","r","Vad heter din bror?",["Vad din bror heter?"],"fraga"],
["","r","Hur mycket kostar biljetten?",["Hur mycket biljetten kostar?"],"fraga"],
["","r","Varför kommer du inte?",["Varför du inte kommer?","Varför inte kommer du?"],"fraga"],
["","r","Har du någonsin varit i Norge?",["Har du varit någonsin i Norge?","Har någonsin varit du i Norge?"],"jafraga"],

["","?inte","Jag dricker inte kaffe.",["Jag inte dricker kaffe.","Jag dricker kaffe inte."],"adv_hs"],
["","?aldrig","Hon äter aldrig kött.",["Hon aldrig äter kött.","Hon äter kött aldrig."],"adv_hs"],
["","?alltid","Han kommer alltid för sent.",["Han alltid kommer för sent."],"adv_hs"],
["","?inte","Vi kan inte komma på fredag.",["Vi inte kan komma på fredag.","Vi kan komma inte på fredag."],"adv_hs"],
["","?inte","Jag har inte sett filmen.",["Jag inte har sett filmen.","Jag har sett inte filmen."],"adv_hs"],
["","?ofta","Vi tittar ofta på tv på kvällen.",["Vi ofta tittar på tv på kvällen."],"adv_hs"],
["","?aldrig","Min bror har aldrig varit i Spanien.",["Min bror aldrig har varit i Spanien.","Min bror har varit aldrig i Spanien."],"adv_hs"],
["","?inte","Jag förstår inte.",["Jag inte förstår."],"adv_hs"],
["","?inte","Hon vill inte åka hem.",["Hon inte vill åka hem.","Hon vill åka inte hem."],"adv_hs"],

["Jag kan inte komma idag.",">Idag","Idag kan jag inte komma.",["Idag jag kan inte komma.","Idag kan inte komma jag."],"adv_inv"],
["Vi har inte tid på kvällen.",">På kvällen","På kvällen har vi inte tid.",["På kvällen vi har inte tid.","På kvällen inte har vi tid."],"adv_inv",1],
["Han dricker aldrig kaffe på morgonen.",">På morgonen","På morgonen dricker han aldrig kaffe.",["På morgonen han aldrig dricker kaffe.","På morgonen aldrig dricker han kaffe."],"adv_inv",1],

["","?inte","Det är synd att du inte kan komma.",["Det är synd att du kan inte komma.","Det är synd att du kan komma inte."],"biff"],
["","?inte","Jag stannar hemma när jag inte mår bra.",["Jag stannar hemma när jag mår inte bra."],"biff"],
["","?inte","Säg till om du inte har tid.",["Säg till om du har inte tid."],"biff"],
["","?inte","Det är bra att du inte röker.",["Det är bra att du röker inte."],"biff"],
["","?inte","Jag blev förvånad när hon inte kom.",["Jag blev förvånad när hon kom inte."],"biff"],
["","?alltid","Jag är glad att du alltid hjälper mig.",["Jag är glad att du hjälper alltid mig."],"biff"],
["","?alltid","Jag vet inte varför hon alltid har en bok med sig.",["Jag vet inte varför hon har alltid en bok med sig."],"biff",1],
["","?aldrig","Det är en film som jag aldrig har sett.",["Det är en film som jag har aldrig sett."],"biff",1],
["","?aldrig","Han är en person som aldrig säger nej.",["Han är en person som säger aldrig nej."],"biff",1],
["","?inte","Jag undrar varför hon inte svarar.",["Jag undrar varför hon svarar inte.","Jag undrar varför svarar hon inte."],"biff",1],

["","r","Jag undrar var han bor.",["Jag undrar var bor han."],"indirekt"],
["","r","Vet du när tåget går?",["Vet du när går tåget?"],"indirekt"],
["","r","Kan du säga hur mycket det kostar?",["Kan du säga hur mycket kostar det?"],"indirekt"],
["","r","Jag vet inte om hon kommer.",["Jag vet inte om kommer hon."],"indirekt"],
["","r","Hon frågar vad jag heter.",["Hon frågar vad heter jag."],"indirekt"],

["","r","Om det regnar, stannar vi hemma.",["Om det regnar, vi stannar hemma.","Om regnar det, stannar vi hemma."],"bisats_forst"],
["","r","När jag kom hem, åt jag middag.",["När jag kom hem, jag åt middag.","När kom jag hem, åt jag middag."],"bisats_forst"],
["","r","Eftersom det var kallt, tog hon på sig jackan.",["Eftersom det var kallt, hon tog på sig jackan."],"bisats_forst"],
["","r","Om du har tid, kan vi fika.",["Om du har tid, vi kan fika."],"bisats_forst"],
["","r","Innan vi åker, måste vi packa.",["Innan vi åker, vi måste packa."],"bisats_forst"],
["","r","När filmen var slut, gick vi hem.",["När filmen var slut, vi gick hem."],"bisats_forst"],
["","r","Om du inte har tid, kan vi ses på måndag.",["Om du har inte tid, kan vi ses på måndag.","Om du inte har tid, vi kan ses på måndag."],"biff_forst",1],
["","r","Eftersom jag inte har bil, tar jag bussen.",["Eftersom jag har inte bil, tar jag bussen.","Eftersom jag inte har bil, jag tar bussen."],"biff_forst",1],
["","r","Trots att han inte har tid, hjälper han oss.",["Trots att han har inte tid, hjälper han oss.","Trots att han inte har tid, han hjälper oss."],"biff_forst",1],

["","r","Jag är trött, men jag vill inte sova.",["Jag är trött, men vill jag inte sova.","Jag är trött, men jag inte vill sova."],"konj",1],
["","r","Hon stannar hemma, för hon är sjuk.",["Hon stannar hemma, för är hon sjuk."],"konj",1]
];

O_WAHL.forEach(([grund,a,richtig,falsch,regel,schwer])=>{
  neueKarte({
    deck:"ordfoljd", typ:"wahl", schwer:!!schwer,
    rohfrage:richtig,
    frage:esc(grund),
    anweisung:anvisning(a),
    optionen:[richtig].concat(falsch), richtig:richtig,
    erklaerung:REGLER[regel]+" &ndash; "+esc(richtig)
  });
});

/* [mening med lucka, ord i luckan (i fel ordning), svar, regel] */
const O_TIPPEN = [
["Idag % till jobbet.","jag, cyklar","cyklar jag","inv"],
["På helgen % länge.","vi, sover","sover vi","inv"],
["Förra året % till Japan.","hon, reste","reste hon","inv"],
["Nu % inte mer.","jag, orkar","orkar jag","adv_inv"],
["Hon % kött.","inte, äter","äter inte","adv_hs"],
["Vi har % i Norge.","varit, aldrig","aldrig varit","adv_hs"],
["Var %?","ni, bor","bor ni","fraga"],
["Jag undrar var %.","bor, ni","ni bor","indirekt"],
["Min mamma blir ledsen om jag % hem.","ringer, inte","inte ringer","biff"],
["Det är en bok som % läst.","har, aldrig, jag","jag aldrig har","biff"],
["Vet du varför %?","inte, kommer, han",["han inte kommer"],"biff"],
["Om det regnar, % hemma.","vi, stannar","stannar vi","bisats_forst"],
["När jag kom hem, % middag.","jag, åt","åt jag","bisats_forst"],
["Eftersom jag % bil, tar jag bussen.","har, inte","inte har","biff"],
["Jag stannar hemma, för % sjuk.","är, jag","jag är","konj"]
];

O_TIPPEN.forEach(([satz,ord,svar,regel])=>{
  neueKarte({
    deck:"ordfoljd", typ:"tippen", schwer:true,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Skriv orden i rätt ordning: <i>"+esc(ord)+"</i>",
    loesungen:[].concat(svar),
    erklaerung:REGLER[regel]+" &ndash; "+esc(satz.replace("%",[].concat(svar)[0]))
  });
});

/* [lösning, andra rätta ordningar, regel, adverb som hör till bisatsen] - inga kommatecken i orden */
const O_BAU = [
["På kvällen läser hon en bok.",["Hon läser en bok på kvällen.","En bok läser hon på kvällen."],"inv"],
["Nu åker vi hem.",["Vi åker hem nu.","Hem åker vi nu.","Vi åker nu hem."],"inv"],
["Varje morgon dricker han te.",["Han dricker te varje morgon.","Te dricker han varje morgon."],"inv"],
["Den filmen har jag redan sett.",["Jag har redan sett den filmen.","Den filmen har jag sett redan.","Jag har sett den filmen redan."],"inv_obj"],
["Jag dricker inte kaffe.",["Kaffe dricker jag inte."],"adv_hs"],
["Vi har aldrig varit i Norge.",["I Norge har vi aldrig varit.","Aldrig har vi varit i Norge."],"adv_hs"],
["Nu har jag inte tid.",["Jag har inte tid nu.","Tid har jag inte nu.","Jag har nu inte tid."],"adv_inv"],
["Var bor din syster?",[],"fraga"],
["Hur länge har du bott här?",[],"fraga"],
["Vad gjorde ni i helgen?",[],"fraga"],
["Det är synd att du inte kan komma.",["Synd är det att du inte kan komma."],"biff","inte"],
["Han är en man som aldrig säger nej.",["En man som aldrig säger nej är han."],"biff","aldrig"],
["Jag undrar var han bor.",["Var han bor undrar jag."],"indirekt"],
["Vet du när tåget går?",[],"indirekt"],
["Jag vet inte om hon kommer.",["Om hon kommer vet jag inte."],"indirekt"],
["Vi stannar hemma när barnen inte mår bra.",["Vi stannar hemma när inte barnen mår bra.","När barnen inte mår bra stannar vi hemma.","När inte barnen mår bra stannar vi hemma.","Hemma stannar vi när barnen inte mår bra.","Hemma stannar vi när inte barnen mår bra."],"biff","inte"],
["Vi tar bussen om tåget inte går.",["Vi tar bussen om inte tåget går.","Om tåget inte går tar vi bussen.","Om inte tåget går tar vi bussen.","Bussen tar vi om tåget inte går.","Bussen tar vi om inte tåget går."],"biff","inte"],
["Om det regnar stannar vi hemma.",["Vi stannar hemma om det regnar.","Hemma stannar vi om det regnar."],"bisats_forst"],
["När jag kom hem åt jag middag.",["Jag åt middag när jag kom hem.","Middag åt jag när jag kom hem."],"bisats_forst"]
];

O_BAU.forEach(([loesung,alt,regel,iBisats])=>{
  neueKarte({
    deck:"ordfoljd", typ:"bau", schwer:true,
    rohfrage:loesung,
    frage:"", anweisung:"Sätt orden i rätt ordning."+(iBisats?" Ordet <i>"+iBisats+"</i> hör till bisatsen.":""),
    woerter:loesung.replace(/[.?!]$/,"").split(" "),
    schluss:loesung.slice(-1),
    loesungen:[loesung].concat(alt),
    erklaerung:REGLER[regel]+" &ndash; "+esc(loesung)
  });
});

})();

REGELSEITEN.ordfoljd=`
<h2>Två sorters satser</h2>
<p>En <b>huvudsats</b> är en sats som kan stå ensam: <i>Jag dricker kaffe.</i> En <b>bisats</b> är en sats som är en del av en annan sats. Den börjar ofta med ett ord som <i>att, om, när, eftersom, som</i> eller ett frågeord: <i>... att jag dricker kaffe.</i></p>
<p>Huvudsatser och bisatser har olika ordföljd. Två ord är viktiga:</p>
<ul>
<li>Det <b>böjda verbet</b> (finita verbet) är verbet som visar tid: <i>dricker, drack, har, kan, ska</i>.</li>
<li>Ett <b>satsadverb</b> är ett litet ord som säger något om hela satsen: <i>inte, aldrig, alltid, ofta, redan, också, kanske, gärna, någonsin</i>.</li>
</ul>

<h2>Huvudsatsen: verbet på plats två</h2>
<p>I en huvudsats står det böjda verbet alltid på <b>plats två</b>. Det är samma regel som på tyska: <i>Heute fahre ich nach Hamburg.</i> Det som står på plats ett kallas <b>fundament</b>.</p>
<div class="tabelle"><table>
<thead><tr><th>Fundament</th><th>Böjt verb</th><th>Subjekt</th><th>Satsadverb</th><th>Övriga verb</th><th>Objekt</th><th>Plats, tid</th></tr></thead>
<tbody>
<tr><td>Jag</td><td>har</td><td>-</td><td>inte</td><td>sett</td><td>filmen</td><td>-</td></tr>
<tr><td>Idag</td><td>kan</td><td>jag</td><td>inte</td><td>komma</td><td>-</td><td>-</td></tr>
<tr><td>Den filmen</td><td>har</td><td>jag</td><td>redan</td><td>sett</td><td>-</td><td>-</td></tr>
<tr><td>På kvällen</td><td>läser</td><td>hon</td><td>-</td><td>-</td><td>en bok</td><td>-</td></tr>
<tr><td>Vi</td><td>åker</td><td>-</td><td>-</td><td>-</td><td>-</td><td>till landet i sommar</td></tr>
</tbody></table></div>
<h3>Rak och omvänd ordföljd</h3>
<p>Står subjektet först, kallas det <b>rak ordföljd</b>: <i>Jag åker till Göteborg idag.</i></p>
<p>Står något annat först (en tid, en plats, ett objekt, ett ord som <i>därför</i> eller <i>sedan</i>), måste subjektet komma <b>efter</b> verbet. Det kallas <b>omvänd ordföljd</b> (inversion).</p>
<p class="beispiel">Idag åker jag till Göteborg.<br>I Sverige dricker man mycket kaffe.<br>Jag var sjuk. Därför stannade jag hemma.<br>Först åt vi och sedan gick vi hem.<br>Den filmen har jag redan sett.</p>
<p>Detta fungerar precis som på tyska. Fel som <i>Idag jag åker</i> är typiska för engelsktalande, men tyskar kan använda sin känsla här.</p>
<div class="merke"><p>Huvudsats: räkna till två. Det böjda verbet står alltid på plats två, oavsett vad som står först.</p></div>

<h2>Satsadverbet i huvudsatsen</h2>
<p>I en huvudsats med rak ordföljd står satsadverbet <b>direkt efter det böjda verbet</b>:</p>
<p class="beispiel">Jag dricker inte kaffe.<br>Hon äter aldrig kött.<br>Vi kan inte komma på fredag.<br>Min bror har aldrig varit i Spanien.</p>
<p>Vid omvänd ordföljd kommer satsadverbet efter subjektet, om subjektet är ett pronomen: verb + subjekt + inte.</p>
<p class="beispiel">Idag kan jag inte komma.<br>På morgonen dricker han aldrig kaffe.</p>
<p>Är subjektet ett substantiv, kan satsadverbet stå före eller efter det: <i>Idag kommer Erik inte</i> eller <i>Idag kommer inte Erik</i>.</p>
<h3>Skillnad mot tyskan</h3>
<p>På tyska står andra verb (infinitiv och particip) i slutet av satsen, och <i>nicht</i> hamnar ofta långt bak: <i>Ich habe den Film nicht gesehen.</i> På svenska står allt tätt ihop: böjt verb, satsadverb, övriga verb.</p>
<p class="beispiel">Jag har inte sett filmen. (<i>Ich habe den Film nicht gesehen.</i>)<br>Hon vill inte åka hem. (<i>Sie will nicht nach Hause fahren.</i>)</p>
<p>Ett litet pronomen som objekt kan ställa sig före <i>inte</i>, när det bara finns ett verb: <i>Jag förstår det inte. Jag känner honom inte.</i> Det är vanligt och korrekt.</p>

<h2>Frågor</h2>
<h3>Frågor med frågeord</h3>
<p>Först kommer <b>frågeordet</b> (<i>var, vad, när, hur, varför, vem</i>), sedan det böjda verbet och sedan subjektet. Frågeordet är fundament, så verbet står på plats två.</p>
<p class="beispiel">Var bor du?<br>När börjar filmen?<br>Hur länge har du bott här?<br>Varför kommer du inte?</p>
<h3>Ja/nej-frågor</h3>
<p>En fråga som man svarar <i>ja</i> eller <i>nej</i> på börjar med verbet. Subjektet kommer direkt efter, och satsadverbet efter subjektet.</p>
<p class="beispiel">Har du någonsin varit i Norge?<br>Kommer du inte i kväll?</p>

<h2>Bisatsen: BIFF</h2>
<p>I bisatsen är ordföljden en annan. Subjektet kommer direkt efter bisatsinledaren, och satsadverbet står <b>före</b> det böjda verbet. Regeln kallas <b>BIFF</b>: <b>B</b>isats - <b>I</b>nte <b>F</b>öre <b>F</b>inita verbet.</p>
<div class="tabelle"><table>
<thead><tr><th>Bisatsinledare</th><th>Subjekt</th><th>Satsadverb</th><th>Böjt verb</th><th>Övriga verb</th><th>Resten</th></tr></thead>
<tbody>
<tr><td>att</td><td>du</td><td>inte</td><td>kan</td><td>komma</td><td>-</td></tr>
<tr><td>när</td><td>jag</td><td>inte</td><td>mår</td><td>-</td><td>bra</td></tr>
<tr><td>som</td><td>jag</td><td>aldrig</td><td>har</td><td>sett</td><td>-</td></tr>
<tr><td>varför</td><td>hon</td><td>alltid</td><td>har</td><td>-</td><td>en bok med sig</td></tr>
</tbody></table></div>
<p class="beispiel">Det är synd att du inte kan komma.<br>Säg till om du inte har tid.<br>Han är en person som aldrig säger nej.<br>Jag är glad att du alltid hjälper mig.</p>
<p>Om subjektet är ett substantiv, kan <i>inte</i> också stå före subjektet: <i>om inte tåget går</i>. Men aldrig efter det böjda verbet.</p>
<div class="merke"><p>BIFF: i bisatsen står <b>inte</b>, <b>aldrig</b>, <b>alltid</b> före det böjda verbet. <i>... att han <b>inte</b> kommer.</i></p></div>
<h3>Skillnad mot tyskan</h3>
<p>Tyskan sätter verbet sist i bisatsen: <i>dass er heute nicht kommen kann</i>. Svenskan gör inte det. Verbet kommer direkt efter satsadverbet, och resten följer efter: <b>att han inte kan komma idag</b>. Ordningen subjekt - satsadverb - verb liknar ändå tyskan, och det hjälper.</p>

<h2>Indirekta frågor</h2>
<p>En <b>indirekt fråga</b> är en fråga inne i en annan mening: <i>Jag undrar var han bor.</i> Den är en bisats och har därför <b>rak ordföljd</b>: frågeord + subjekt + verb.</p>
<p class="beispiel">Jag undrar var han bor. (inte: var bor han)<br>Vet du när tåget går?<br>Kan du säga hur mycket det kostar?<br>Jag undrar varför hon inte svarar.</p>
<p>Ja/nej-frågor blir indirekta med <b>om</b> (tyska <i>ob</i>): <i>Jag vet inte om hon kommer.</i></p>
<p>Är frågeordet själv subjekt, lägger man till <b>som</b>: <i>Vem kommer? - Jag undrar vem som kommer.</i></p>

<h2>Bisatsen först</h2>
<p>En bisats kan stå först i meningen. Då räknas hela bisatsen som <b>plats ett</b>. Huvudsatsens verb kommer direkt efter, och sedan subjektet. Det är också samma som på tyska: <i>Wenn es regnet, bleiben wir zu Hause.</i></p>
<p class="beispiel">Om det regnar, stannar vi hemma.<br>När jag kom hem, åt jag middag.<br>Eftersom jag inte har bil, tar jag bussen.<br>Om du inte har tid, kan vi ses på måndag.</p>
<p>Kommatecknet efter bisatsen kan man sätta eller låta bli. Ordföljden är densamma.</p>

<h2>Och, men, eller, för</h2>
<p>Orden <b>och, men, eller, för</b> binder ihop två huvudsatser. De räknas <b>inte</b> som plats ett. Kommer subjektet direkt efter dem, blir det rak ordföljd:</p>
<p class="beispiel">Jag är trött, men jag vill inte sova.<br>Hon stannar hemma, för hon är sjuk.</p>
<p>Svenskans <i>för</i> fungerar som tyskans <i>denn</i>. Om du vill använda en bisats, säg <b>eftersom</b> (tyska <i>weil</i>): <i>... eftersom hon är sjuk.</i></p>
<p>Men står något annat än subjektet efter <i>och</i>, blir det omvänd ordföljd igen: <i>Först åt vi och sedan gick vi hem.</i></p>

<h2>Typiska fel för tyskar</h2>
<ul>
<li><b>Verbet sist i bisatsen:</b> <i>att han inte idag komma kan</i>. Rätt: <b>att han inte kan komma idag</b>.</li>
<li><b>Inte efter verbet i bisatsen:</b> <i>att du kan inte komma</i>. Rätt: <b>att du inte kan komma</b>.</li>
<li><b>Particip och infinitiv sist i huvudsatsen:</b> <i>Jag har filmen inte sett</i>. Rätt: <b>Jag har inte sett filmen</b>.</li>
<li><b>Omvänd ordföljd i indirekta frågor:</b> <i>Jag undrar var bor han</i>. Rätt: <b>var han bor</b>.</li>
<li><b>Omvänd ordföljd efter för:</b> <i>för är hon sjuk</i>. Rätt: <b>för hon är sjuk</b>.</li>
</ul>

<h2>Sammanfattning</h2>
<ul>
<li>Huvudsats: böjt verb på plats två. Står något annat än subjektet först, kommer subjektet efter verbet.</li>
<li>Huvudsats: satsadverb efter det böjda verbet (eller efter subjektet vid omvänd ordföljd).</li>
<li>Frågor: frågeord + verb + subjekt, eller verb + subjekt.</li>
<li>Bisats: subjekt + satsadverb + böjt verb (BIFF). Inget verb sist som på tyska.</li>
<li>Indirekt fråga = bisats = rak ordföljd.</li>
<li>Bisatsen först = plats ett. Och, men, eller, för = ingen plats.</li>
</ul>
`;
