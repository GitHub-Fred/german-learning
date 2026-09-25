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
