(()=>{"use strict";
const DECK="reflexiv";

const REGLER={
pron:"Reflexiva pronomen: jag &ndash; <b>mig</b>, du &ndash; <b>dig</b>, han/hon/den/det &ndash; <b>sig</b>, vi &ndash; <b>oss</b>, ni &ndash; <b>er</b>, de &ndash; <b>sig</b>.",
sig3:"<b>sig</b> används bara i tredje person: han, hon, den, det, man och de. Med jag, du, vi och ni blir det mig, dig, oss och er.",
man:"Efter <b>man</b> är det reflexiva pronomenet <b>sig</b>.",
sig_honom:"Om det är samma person som subjektet blir det <b>sig</b>, inte honom eller henne.",
bisats:"Det reflexiva pronomenet följer subjektet, också i bisatser och efter inversion.",
trivas:"<b>trivas</b> slutar redan på -s och har aldrig ett reflexivt pronomen.",
minnas:"<b>minnas</b> och <b>komma ihåg</b> har inget reflexivt pronomen.",
skammas:"<b>skämmas</b> slutar redan på -s och har aldrig ett reflexivt pronomen.",
fram:"<b>se fram emot</b> något har inget reflexivt pronomen.",
undra:"<b>undra</b> har inget reflexivt pronomen.",
gifta:"<b>gifta sig</b> är reflexivt på svenska.",
lara:"<b>lära sig</b> = få ny kunskap. <i>lära någon något</i> = ge någon kunskap.",
refl:"Här behövs ett reflexivt pronomen: "
};

/* [mening, rätt, fel, regel] */
const D_PRON=[
["Jag tvättar % och borstar tänderna.","mig",["sig","jag"],"sig3"],
["Du måste skynda %, bussen går snart.","dig",["sig","du"],"sig3"],
["Hon kammar % framför spegeln.","sig",["hon","sin"],"pron"],
["Vi sätter % vid bordet och äter.","oss",["sig","vi"],"sig3"],
["Ni måste förbereda % inför provet.","er",["sig","ni"],"sig3"],
["Min syster ska gifta % med sin pojkvän.","sig",["hon","sin"],"pron"],
["Jag känner % lite trött idag.","mig",["sig","jag"],"sig3"],
["Han rakar % varje morgon.","sig",["han","sin"],"pron"],
["Sätt %, ni två!","er",["sig","ni"],"sig3"],
["Barnen klär på % själva nu.","sig",["de"],"pron"],
["Jag har bestämt %. Jag flyttar till Malmö.","mig",["sig","jag"],"sig3"],
["Vi måste skynda %, filmen börjar snart.","oss",["sig","vi"],"sig3"],
["Kan du koncentrera % lite?","dig",["sig","du"],"sig3"],
["Hon lägger % tidigt varje kväll.","sig",["hon","sin"],"pron"],
["Jag lär % svenska på kvällarna.","mig",["sig","jag"],"sig3"],
["Har du ångrat %?","dig",["sig","du"],"sig3"],
["Man måste vila % ibland.","sig",["man","mig"],"man"],
["Erik känner % sjuk idag.","sig",["honom","han"],"sig_honom"],
["Anna bestämde % för att stanna hemma.","sig",["henne","hon"],"sig_honom"],
["Ni borde vila % lite.","er",["sig","ni"],"sig3"],
["Vi har lärt % mycket i kursen.","oss",["sig","vi"],"sig3"],
["Rör % inte! Jag ska ta ett foto.","dig",["sig","du"],"sig3"],
["Vi ska lägga % tidigt ikväll.","oss",["sig","vi"],"sig3"],
["Han satte % bredvid mig.","sig",["han","sin"],"pron"],
["Hur känner ni % idag?","er",["sig","ni"],"sig3"],
["Jag ska klä på % och sedan går vi.","mig",["sig","jag"],"sig3"]
];

/* [verb, rätt mening, fel mening, regel] */
const D_FALLA=[
["trivas","Jag trivs bra i Sverige.","Jag trivs mig bra i Sverige.","trivas"],
["minnas","Jag minns inte hans namn.","Jag minns mig inte hans namn.","minnas"],
["komma ihåg","Jag kommer ihåg det.","Jag kommer mig ihåg det.","minnas"],
["skämmas","Han skäms för det han sa.","Han skäms sig för det han sa.","skammas"],
["se fram emot","Jag ser fram emot semestern.","Jag ser mig fram emot semestern.","fram"],
["undra","Jag undrar om hon kommer.","Jag undrar mig om hon kommer.","undra"],
["gifta","Hon gifte sig förra året.","Hon gifte förra året.","gifta"],
["lära","Jag vill lära mig spela gitarr.","Jag vill lära spela gitarr.","lara"]
];

/* [mening, pronomen] */
const D_PRON_TIPPEN=[
["Hon sa att hon inte kände % bra.","sig"],
["Igår kände jag % mycket bättre.","mig"],
["Vet du om de har bestämt % än?","sig"],
["När vi hade satt %, började filmen.","oss"],
["Om du skyndar %, hinner du med tåget.","dig"],
["Man vet aldrig hur man ska bete %.","sig"]
];

/* [mening, infinitiv, lösningar, regel] */
const D_VERB_TIPPEN=[
["Jag var trött, så jag % redan klockan nio igår.","lägga",["lade mig","la mig"],"refl"],
["Hon har ett nytt jobb och hon % mycket bra där.","trivas",["trivs"],"trivas"],
["Vi % förra året i Göteborg.","gifta",["gifte oss"],"refl"],
["Förlåt, jag % inte vad du heter.","minnas",["minns"],"minnas"],
["Du borde % för det du sa!","skämmas",["skämmas"],"skammas"],
["Vi måste %, tåget går om fem minuter.","skynda",["skynda oss"],"refl"],
["Han har % för att sluta röka.","bestämma",["bestämt sig"],"refl"],
["Jag % varje morgon innan jag åker till jobbet.","raka",["rakar mig"],"refl"],
["Jag kan inte % när det är så mycket ljud.","koncentrera",["koncentrera mig"],"refl"],
["Först sa han ja, men han % sedan.","ångra",["ångrade sig"],"refl"]
];

const fyll=(mening,ord)=>mening.replace("%",ord);

D_PRON.forEach(([mening,ratt,fel,regel])=>{
  neueKarte({
    deck:DECK, typ:"wahl",
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:"Vilket pronomen passar?",
    optionen:[ratt].concat(fel), richtig:ratt,
    erklaerung:REGLER[regel]+" &ndash; "+esc(fyll(mening,ratt))
  });
});

D_FALLA.forEach(([verb,ratt,fel,regel])=>{
  neueKarte({
    deck:DECK, typ:"wahl", schwer:true,
    rohfrage:ratt,
    frage:"<i>"+esc(verb)+"</i>",
    anweisung:"Vilken mening är rätt?",
    optionen:[ratt,fel], richtig:ratt,
    erklaerung:REGLER[regel]+" &ndash; "+esc(ratt)
  });
});

D_PRON_TIPPEN.forEach(([mening,pron])=>{
  neueKarte({
    deck:DECK, typ:"tippen", schwer:true,
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:"Skriv det reflexiva pronomenet.",
    loesungen:[pron],
    erklaerung:REGLER.bisats+" "+REGLER.pron+" &ndash; "+esc(fyll(mening,pron))
  });
});

D_VERB_TIPPEN.forEach(([mening,inf,losningar,regel])=>{
  neueKarte({
    deck:DECK, typ:"tippen", schwer:true,
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:"Skriv rätt form av <i>"+esc(inf)+"</i>. Lägg till ett reflexivt pronomen om det behövs.",
    loesungen:losningar,
    erklaerung:(regel==="refl"?REGLER.refl+"<b>"+esc(inf)+" sig</b>.":REGLER[regel])+" &ndash; "+esc(fyll(mening,losningar[0]))
  });
});
})();
