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
