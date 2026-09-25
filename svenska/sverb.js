(()=>{"use strict";
const DECK="sverb";

const REGLER={
paspres:"Passiv presens: ta bort <b>-r</b> i presens och lägg till <b>-s</b>, till exempel talar &rarr; talas, läser &rarr; läses. Ofta försvinner e: bygger &rarr; byggs. Vi använder det ofta för regler och sådant som händer ofta.",
paspret:"Passiv preteritum: preteritum + <b>-s</b>, till exempel byggde &rarr; byggdes, skrev &rarr; skrevs.",
passup:"Passiv supinum: supinum + <b>-s</b>, till exempel har skickats, har sålts.",
pasinf:"Efter <i>ska, måste, kan</i> kommer passiv infinitiv: infinitiv + <b>-s</b>, till exempel ska hållas.",
bli:"Passiv med <b>bli</b> + particip. Participet böjs efter subjektet: en-ord stulen, ett-ord stulet, plural stulna.",
vara:"<b>vara</b> + particip beskriver hur något är. Participet böjs efter subjektet: en-ord skriven, ett-ord skrivet, plural skrivna.",
deponens:"Det här verbet slutar på <b>-s</b> i alla former, men det betyder något aktivt. Det är inte passiv.",
reciprok:"Här betyder <b>-s</b> <i>varandra</i>: vi ses = vi ser varandra."
};

/* [mening, rätt, fel, regel, extra] */
const D_WAHL=[
["Här % svenska och engelska.","talas",["talar","tala"],"paspres"],
["Frukost % mellan sju och tio.","serveras",["serverar"],"paspres"],
["Tidningen % av många människor varje dag.","läses",["läser"],"paspres"],
["Bron % år 1932.","byggdes",["byggde","bygger"],"paspret"],
["Boken % av Astrid Lindgren.","skrevs",["skrev","skriver"],"paspret"],
["Paketet har % idag.","skickats",["skickat","skickas"],"passup"],
["Mötet ska % på fredag.","hållas",["hålla","hålls"],"pasinf"],
["Min cykel blev % igår.","stulen",["stulet","stulna"],"bli"],
["Huset blev % förra året.","sålt",["såld","sålda"],"bli"],
["Jag % att du mår bra.","hoppas",["hoppar"],"deponens","hoppas, hoppades, hoppats. Hoppa betyder att man rör sig upp i luften."],
["Det % mycket snö i norra Sverige.","finns",["finner"],"deponens","finnas, finns, fanns, funnits."],
["Vi % imorgon! Hej då!","ses",["ser"],"reciprok"],
["Vi %! Ring mig i helgen.","hörs",["hör"],"reciprok"],
["Jag % bra i Sverige.","trivs",["trivas"],"deponens","trivas, trivs, trivdes, trivts."],
["Hur % det?","känns",["känner"],"deponens","kännas, känns, kändes, känts."],
["Det % att du är trött.","syns",["ser"],"deponens","synas, syns, syntes, synts."],
["Försök att % lugnt.","andas",["andar"],"deponens","andas, andades, andats."],
["Hon % till slut hitta en lägenhet.","lyckades",["lyckade"],"deponens","lyckas, lyckades, lyckats."],
["Vi % utanför bion klockan sju.","träffas",["träffar"],"reciprok"],
["Det % en kopp. Kan du hämta en till?","fattas",["fattar"],"deponens","Det fattas = det saknas."],
["Jag % när jag springer.","svettas",["svettar"],"deponens","svettas, svettades, svettats."],
["Han % att han sover.","låtsas",["låter"],"deponens","låtsas, låtsades, låtsats."],
["Igår % det inga biljetter kvar.","fanns",["finns","fann"],"deponens","finnas, finns, fanns, funnits. Fann kommer från finna."],
["Pojkarna % på gräset.","brottas",["brottar"],"deponens"],
["Hur % ditt namn?","stavas",["stavar"],"paspres"],
["Mjölken ska % i kylskåpet.","förvaras",["förvara","förvarar"],"pasinf"],
["Jag % för det jag sa.","skäms",["skämmer"],"deponens","skämmas, skäms, skämdes, skämts."],
["Tåget % av snön.","försenades",["försenade"],"paspret"],
["Fisken % direkt från båten.","säljs",["säljer"],"paspres"],
["Dörren % med en nyckel.","låses",["låser"],"paspres"]
];

const D_WAHL_SCHWER=[
["Två cyklar blev % i natt.","stulna",["stulen","stulet"],"bli"],
["Boken är % på lätt svenska.","skriven",["skrivet","skrivna"],"vara"],
["Jag har länge % att du skulle komma.","hoppats",["hoppat","hoppas"],"deponens","hoppas, hoppades, hoppats."],
["Vi % igår på festen.","sågs",["såg","ses"],"reciprok","ses, sågs, setts."]
];

/* [mening, anvisning, lösningar, regel, extra] */
const D_TIPPEN=[
["Den här kyrkan % på 1200-talet.","Skriv <i>bygga</i> i passiv med -s.",["byggdes"],"paspret"],
["Alla biljetter har redan %.","Skriv <i>sälja</i> i passiv med -s.",["sålts"],"passup"],
["Maten % klockan sex varje kväll, så kom inte för sent!","Skriv <i>servera</i> i passiv med -s.",["serveras"],"paspres"],
["Brevet måste % idag.","Skriv <i>skicka</i> i passiv med -s.",["skickas"],"pasinf"],
["Fönstren % förra sommaren.","Skriv <i>måla</i> i passiv med -s.",["målades"],"paspret"],
["Romanen har % till trettio språk.","Skriv <i>översätta</i> i passiv med -s.",["översatts"],"passup"],
["Dörren ska % klockan åtta.","Skriv <i>låsa</i> i passiv med -s.",["låsas"],"pasinf"],
["Tjuven % av polisen igår.","Skriv <i>gripa</i> i passiv med -s.",["greps"],"paspret"],
["Min plånbok % igår.","Skriv <i>stjäla</i> med <i>bli</i> + particip.",["blev stulen"],"bli"],
["Tre personer % i olyckan igår.","Skriv <i>skada</i> med <i>bli</i> + particip.",["blev skadade"],"bli"],
["Vi % på sol, men det regnade hela veckan.","Skriv rätt form av <i>hoppas</i>.",["hoppades"],"deponens","hoppas, hoppades, hoppats."],
["Det har aldrig % någon affär här.","Skriv rätt form av <i>finnas</i>.",["funnits"],"deponens","finnas, finns, fanns, funnits."],
["När jag var liten % det inga mobiltelefoner.","Skriv rätt form av <i>finnas</i>.",["fanns"],"deponens","finnas, finns, fanns, funnits."],
["Jag har alltid % bra i Uppsala.","Skriv rätt form av <i>trivas</i>.",["trivts"],"deponens","trivas, trivs, trivdes, trivts."],
["Nästa morgon % han inte vad han hade gjort.","Skriv rätt form av <i>minnas</i>.",["mindes"],"deponens","minnas, minns, mindes, mints."],
["Har du % att hitta nycklarna?","Skriv rätt form av <i>lyckas</i>.",["lyckats"],"deponens","lyckas, lyckades, lyckats."],
["Hur % det på jobbet igår?","Skriv rätt form av <i>kännas</i>.",["kändes"],"deponens","kännas, känns, kändes, känts."],
["Vi har inte % på länge!","Skriv rätt form av <i>ses</i>.",["setts"],"reciprok","ses, sågs, setts."],
["Vi % på stationen förra veckan.","Skriv rätt form av <i>träffas</i>.",["träffades"],"reciprok","träffas, träffades, träffats."],
["Jag % när jag ramlade på scenen igår.","Skriv rätt form av <i>skämmas</i>.",["skämdes"],"deponens","skämmas, skäms, skämdes, skämts."],
["Hon % att hon inte hörde mig igår.","Skriv rätt form av <i>låtsas</i>.",["låtsades"],"deponens","låtsas, låtsades, låtsats."],
["Efter loppet igår % han tungt.","Skriv rätt form av <i>andas</i>.",["andades"],"deponens","andas, andades, andats."],
["Förra veckan % vi i telefon.","Skriv rätt form av <i>höras</i>.",["hördes"],"reciprok","höras, hörs, hördes, hörts."],
["Det % två stolar, så några fick stå.","Skriv rätt form av <i>fattas</i>.",["fattades"],"deponens","fattas, fattades, fattats."],
["De % länge på flygplatsen igår.","Skriv rätt form av <i>kramas</i>.",["kramades"],"reciprok","kramas, kramades, kramats."]
];

const fyll=(mening,ord)=>mening.replace("%",ord);

const wahl=schwer=>([mening,ratt,fel,regel,extra])=>{
  neueKarte({
    deck:DECK, typ:"wahl", schwer:schwer,
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:"Vilken form passar?",
    optionen:[ratt].concat(fel), richtig:ratt,
    erklaerung:REGLER[regel]+(extra?" "+esc(extra):"")+" &ndash; "+esc(fyll(mening,ratt))
  });
};
D_WAHL.forEach(wahl(false));
D_WAHL_SCHWER.forEach(wahl(true));

D_TIPPEN.forEach(([mening,anvisning,losningar,regel,extra])=>{
  neueKarte({
    deck:DECK, typ:"tippen", schwer:true,
    rohfrage:mening,
    frage:esc(mening).replace("%",LUECKE),
    anweisung:anvisning,
    loesungen:losningar,
    erklaerung:REGLER[regel]+(extra?" "+esc(extra):"")+" &ndash; "+esc(fyll(mening,losningar[0]))
  });
});
})();
