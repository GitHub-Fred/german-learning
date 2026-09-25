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
