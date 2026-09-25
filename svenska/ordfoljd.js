(()=>{"use strict";

const REGLER = {
  v2:"I en huvudsats står det böjda verbet alltid på plats två.",
  inv:"Om något annat än subjektet står först, kommer verbet före subjektet (omvänd ordföljd).",
  inv_obj:"Även ett objekt kan stå först. Då kommer verbet direkt efter, sedan subjektet.",
  fraga:"I en fråga med frågeord kommer först frågeordet, sedan det böjda verbet och därefter subjektet.",
  jafraga:"I en ja/nej-fråga står verbet först och subjektet direkt efter. Ett satsadverb som <i>någonsin</i> kommer efter subjektet.",
  adv_hs:"I en huvudsats med rak ordföljd står <i>inte</i>, <i>aldrig</i>, <i>alltid</i> och <i>ofta</i> direkt efter det böjda verbet.",
  adv_inv:"Vid omvänd ordföljd står <i>inte</i> och <i>aldrig</i> normalt efter ett pronomen som subjekt: verb + subjekt + inte. Bara om subjektet är betonat kan <i>inte</i> stå före det.",
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
