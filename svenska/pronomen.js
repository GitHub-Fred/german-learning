(()=>{"use strict";

const REGLER = {
  obj: "Som objekt används objektsform: mig, dig, honom, henne, oss, er, dem.",
  subj: "Subjektet har subjektsform: jag, du, han, hon, vi, ni, de.",
  prep: "Efter en preposition används alltid objektsform: mig, dig, honom, henne, oss, er, dem.",
  bisats: "I bisatsen är pronomenet subjekt. Då används subjektsform, även efter <i>att, om, var, vad</i>.",
  den: "<i>den</i> syftar tillbaka på ett en-ord.",
  det: "<i>det</i> syftar tillbaka på ett ett-ord.",
  de: "Plural: <b>de</b> som subjekt, <b>dem</b> som objekt.",
  detSats: "<i>det</i> kan syfta på en hel mening eller en situation.",
  presDet: "När man visar eller presenterar något (det är, det var) används <i>det</i>, även för en-ord och personer.",
  deSom: "<i>de som</i>: är pronomenet subjekt i huvudsatsen används <b>de</b>.",
  demSom: "<i>dem som</i>: är pronomenet objekt i huvudsatsen används <b>dem</b>.",
  man: "<i>man</i> betyder människor i allmänhet. Det är subjektsformen.",
  en: "<i>man</i> har objektsformen <b>en</b>.",
  ens: "<i>man</i> har ägarformen <b>ens</b>.",
  an: "Efter <i>än</i> går både subjektsform och objektsform bra: äldre än jag, äldre än mig. I formell text väljer man oftast <i>jag</i>."
};

/* [mening med %, rätt, [fel], regel, svår] */
const D_WAHL = [
["Kan du hjälpa %?","mig",["jag"],"obj"],
["Jag ringer % i kväll, okej?","dig",["du"],"obj"],
["Har du sett Erik? Nej, jag har inte sett %.","honom",["han"],"obj"],
["Anna är sjuk. Vi ska besöka % i morgon.","henne",["hon"],"obj"],
["Tack för att ni hjälpte %!","oss",["vi"],"obj"],
["Lisa och Per, vi har saknat %!","er",["ni"],"obj"],
["Vet du var Maria är? Jag har inte sett % idag.","henne",["hon"],"obj"],
["Jag tycker mycket om %, Sara.","dig",["du"],"obj"],
["Barnen leker ute. Jag ser % från fönstret.","dem",["de"],"de"],
["Mina kusiner? % bor i Göteborg.","De",["Dem"],"de"],
["Kalle? % jobbar på banken.","Han",["Honom"],"subj"],
["Var är nyckeln? Jag hittar inte %.","den",["det","dem"],"den"],
["Var är mitt paraply? Jag hittar inte %.","det",["den","dem"],"det"],
["Var är mina glasögon? Jag hittar inte %.","dem",["den","det","de"],"de"],
["Jag har köpt en ny soffa. % är jätteskön.","Den",["Det","De"],"den"],
["Har du läst brevet? Ja, jag läste % igår.","det",["den"],"det"],
["Äpplena är goda. Var köpte du %?","dem",["de","den"],"de"],
["Tomaterna? % ligger i kylskåpet.","De",["Dem","Den"],"de"],
["Har ni sett min katt? Nej, vi har inte sett %.","den",["det"],"den"],
["Huset är gammalt, men vi tycker om %.","det",["den"],"det"],
["Boken? Jag har redan läst %.","den",["det"],"den"],
["Hon har flyttat till Spanien. Visste du %?","det",["den"],"detSats"],
["Vad är det där? % är en ekorre.","Det",["Den"],"presDet"],
["Vem är det där? % är min syster.","Det",["Den"],"presDet"],
["I Sverige tar % av sig skorna inomhus.","man",["en","ens"],"man"],
["% vet aldrig vad som kan hända.","Man",["En","Ens"],"man"],
["Det är skönt när någon hjälper %.","en",["man","ens"],"en"],
["Det gör % glad att se solen.","en",["man","ens"],"en"],
["Det känns bra när % vänner ringer.","ens",["man","en"],"ens"],
["Mamma ringde och frågade efter %.","dig",["du"],"prep"],
["Kommer du med % på bio?","oss",["vi"],"prep"],
["Jag har en present till %, pappa!","dig",["du"],"prep"],
["Varför tittar du på %? Jag har inte gjort något!","mig",["jag"],"prep"],
["Har du pratat med Jonas? Ja, jag pratade med % igår.","honom",["han"],"prep"],
["Jag vet inte var % bor.","de",["dem"],"bisats",1],
["Jag frågade om % ville följa med.","de",["dem"],"bisats",1],
["Tror du att % kommer i tid?","de",["dem"],"bisats",1],
["Jag gav % nycklarna.","dem",["de"],"de",1],
["% som vill kan gå hem nu.","De",["Dem"],"deSom",1],
["Jag känner % som bor i huset bredvid.","dem",["de"],"demSom",1]
];

/* [mening med %, form som ska ändras (null = välj själv), [lösningar], regel] */
const D_TIPPEN = [
["Jag vet att % har rätt.","han",["han"],"bisats"],
["Jag undrar vad % vill.","han",["han"],"bisats"],
["Tror du att % kommer?","hon",["hon"],"bisats"],
["Hon frågade om % ville ha kaffe.","jag",["jag"],"bisats"],
["Jag vet inte om % hinner.","de",["de"],"bisats"],
["Vi pratade om % hela kvällen.","de",["dem"],"prep"],
["Hon bor nära %.","vi",["oss"],"prep"],
["Kan jag sitta bredvid %?","du",["dig"],"prep"],
["Jag har köpt blommor till %.","hon",["henne"],"prep"],
["Är det här till %?","jag",["mig"],"prep"],
["Han tittade på % och log.","vi",["oss"],"prep"],
["Ska vi ses hos % eller hos oss?","ni",["er"],"prep"],
["Jag hälsade på % när jag var i Stockholm.","de",["dem"],"obj"],
["Jag har inte sett % på länge.","ni",["er"],"obj"],
["Hon är två år äldre än %.","jag",["jag","mig"],"an"],
["% som bor här är trevliga.","de",["de"],"deSom"],
["Barnen? Jag hämtar % klockan fyra.",null,["dem"],"de"],
["Var är tidningen? Jag har lagt % på bordet.",null,["den"],"den"],
["Huset? Vi sålde % förra året.",null,["det"],"det"],
["Skorna var för små, så jag lämnade tillbaka %.",null,["dem"],"de"],
["Glöm inte blommorna! % måste få vatten.",null,["de"],"de"],
["Det är svårt när ingen lyssnar på %.","man",["en"],"en"],
["Man blir arg när grannarna väcker % mitt i natten.","man",["en"],"en"],
["Det är tråkigt när % cykel blir stulen.","man",["ens"],"ens"]
];

const stor=(satz,ord)=>satz.startsWith("%")?ord.charAt(0).toUpperCase()+ord.slice(1):ord;

D_WAHL.forEach(([satz,richtig,falsch,r,schwer])=>{
  neueKarte({
    deck:"pronomen", typ:"wahl", schwer:!!schwer,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:"Vilket pronomen passar?",
    optionen:[richtig].concat(falsch), richtig:richtig,
    erklaerung:REGLER[r]+" &ndash; "+esc(satz.replace("%",richtig))
  });
});

D_TIPPEN.forEach(([satz,grund,loesungen,r])=>{
  neueKarte({
    deck:"pronomen", typ:"tippen", schwer:true,
    rohfrage:satz,
    frage:esc(satz).replace("%",LUECKE),
    anweisung:grund
      ? "Skriv rätt form av <i>"+esc(grund)+"</i>."
      : "Skriv rätt pronomen: den, det, de eller dem.",
    loesungen:loesungen,
    erklaerung:REGLER[r]+" &ndash; "+esc(satz.replace("%",stor(satz,loesungen[0])))
  });
});

})();
