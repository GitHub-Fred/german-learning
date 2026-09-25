"use strict";

/* =====================================================================
   Karteikasten: Leitner-Fächer, Runden, Notizen, Fortschritt.
   Inhalt und Texte kommen von der Seite, siehe starteKarteikasten(A).
   ===================================================================== */

function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
function hash(s){let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36);}
function mische(a){const b=a.slice();for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
function leichteZuerst(liste){return liste.sort((a,b)=>(a.schwer?1:0)-(b.schwer?1:0));}
const LUECKE='<span class="luecke"></span>';

const ITEMS=[];
function neueKarte(k){
  k.id=k.deck+"-"+hash(k.typ+"|"+(k.rohfrage||"")+"|"+(k.richtig||(k.loesungen&&k.loesungen[0])||""));
  ITEMS.push(k);
}

function starteKarteikasten(A){
const T=A.texte;
const DECKS=A.decks, SONDERDECKS=A.sonderdecks;
const DECK_NACH_K={};DECKS.forEach(d=>DECK_NACH_K[d.k]=d);
function deckName(k){return (DECK_NACH_K[k]||SONDERDECKS[k]).name;}
const norm=A.norm;
const ordneNeue=A.ordneNeue||((deck,liste)=>leichteZuerst(liste));
const ITEM_NACH_ID={};ITEMS.forEach(i=>ITEM_NACH_ID[i.id]=i);

/* ---------- Fortschritt speichern ---------- */
const INTERVALLE=[0,1,2,4,8,21];          // Tage pro Fach
const TAG=86400000;
const RUNDENLAENGE=16;

const LEER={v:1,xp:0,items:{},fehler:[],tage:{},streak:0,letzterTag:"",abzeichen:[],notizen:{},themaNotizen:{},
            totalRichtig:0,totalFalsch:0,runden:0,perfekteRunden:0,besteSerie:0};
let S=laden();

function aufbereiten(d){
  return Object.assign({},LEER,d,{items:d.items||{},tage:d.tage||{},
    fehler:d.fehler||[],abzeichen:d.abzeichen||[],notizen:d.notizen||{},themaNotizen:d.themaNotizen||{}});
}
function laden(){
  try{
    const roh=localStorage.getItem(A.schluessel);
    if(!roh) return Object.assign({},LEER);
    return aufbereiten(JSON.parse(roh));
  }catch(e){return Object.assign({},LEER);}
}
function sichern(){
  try{localStorage.setItem(A.schluessel,JSON.stringify(S));}
  catch(e){meldung(T.speicherFehler);}
}
function ymd(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}

function stufeFuer(xp){let l=1;while(xp>=100*l*(l+1)/2)l++;return l;}
function fach(id){const z=S.items[id];return z?z.b:0;}
function zaehleFach(n){let c=0;for(const id in S.items)if(S.items[id].b===n)c++;return c;}

const ABZEICHEN_TESTS={
 start:  ()=>S.runden>=1,
 r50:    ()=>S.totalRichtig>=50,
 r250:   ()=>S.totalRichtig>=250,
 serie10:()=>S.besteSerie>=10,
 s3:     ()=>S.streak>=3,
 s7:     ()=>S.streak>=7,
 s30:    ()=>S.streak>=30,
 sauber: ()=>S.perfekteRunden>=1,
 fach5:  ()=>zaehleFach(5)>=25,
 alle:   ()=>DECKS.every(d=>ITEMS.some(i=>i.deck===d.k&&S.items[i.id])),
 hundert:()=>Object.keys(S.items).length>=100,
 schwer: ()=>ITEMS.filter(i=>i.schwer&&S.items[i.id]&&S.items[i.id].b>=4).length>=25
};
const ABZEICHEN=Object.keys(ABZEICHEN_TESTS).map(k=>({k:k,name:A.abzeichen[k][0],text:A.abzeichen[k][1],test:ABZEICHEN_TESTS[k]}));

/* ---------- Oberfläche ---------- */
const $=id=>document.getElementById(id);
const sStart=$("s-start"), sRunde=$("s-runde"), sFortschritt=$("s-fortschritt");
const karte=$("karte");
let lauf=null, bildschirm="start";

function zeige(name){
  bildschirm=name;
  sStart.hidden=name!=="start";
  sRunde.hidden=name!=="runde";
  sFortschritt.hidden=name!=="fortschritt";
  $("knopf-zurueck").hidden=name==="start";
  $("knopf-zurueck").textContent=name==="runde"?T.rundeBeenden:T.zumKasten;
  window.scrollTo(0,0);
}
function kopfleiste(){
  $("w-streak").textContent=S.streak;
  $("w-streak-wort").textContent=S.streak===1?T.tag:T.tage;
  $("w-xp").textContent=S.xp;
  $("w-stufe").textContent=stufeFuer(S.xp);
}
function meldung(text){
  const el=document.createElement("div");
  el.className="meldung";el.setAttribute("role","status");el.textContent=text;
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),3400);
}

/* ---------- Startseite ---------- */
function deckItems(k){
  if(k==="gemischt")return ITEMS;
  if(k==="schwer")return ITEMS.filter(i=>i.schwer);
  if(k==="fehler")return S.fehler.map(id=>ITEM_NACH_ID[id]).filter(Boolean);
  return ITEMS.filter(i=>i.deck===k);
}
function deckZahlen(k){
  const li=deckItems(k);
  let f=0,beherrscht=0,neu=0;
  li.forEach(i=>{const z=S.items[i.id];
    if(!z){neu++;f++;}else{if(z.d<=Date.now())f++;if(z.b>=4)beherrscht++;}});
  return {gesamt:li.length,faellig:f,beherrscht:beherrscht,neu:neu,
          quote:li.length?Math.round(beherrscht/li.length*100):0};
}

function zeigeStart(){
  const g=deckZahlen("gemischt");
  $("gruss").textContent = g.faellig===0
    ? T.grussFertig
    : (S.runden===0 ? T.grussErsteRunde : T.grussWeiter);
  $("gruss-text").textContent = g.faellig===0 ? T.grussTextFertig : T.grussText;

  const geuebt=Object.keys(S.items).length;
  $("kasten-lage").innerHTML = geuebt===0
    ? T.kastenNeu(ITEMS.length)
    : T.kastenLage(g.faellig,g.beherrscht,ITEMS.length);

  const zahlen=[1,2,3,4,5].map(zaehleFach);
  const max=Math.max(1,...zahlen);
  $("faecher").innerHTML=zahlen.map((n,idx)=>{
    const blaetter=n===0?0:Math.max(1,Math.ceil(n/max*12));
    return '<div class="fach"><div class="stapel">'+
      (n===0?'<div class="fach-leer">'+T.leer+'</div>':'<div class="blatt"></div>'.repeat(blaetter))+
      '</div><div class="fach-schild"><b>'+n+'</b><span>'+T.fach+' '+(idx+1)+'</span></div></div>';
  }).join("");

  const alle=DECKS.concat([SONDERDECKS.gemischt,SONDERDECKS.schwer]);
  if(S.fehler.length) alle.push(SONDERDECKS.fehler);

  $("stapel-liste").innerHTML=alle.map(d=>{
    const z=deckZahlen(d.k);
    const wort=z.faellig===0 ? T.nichtsFaellig
             : z.neu===z.faellig ? T.neu(z.faellig)
             : T.faellig(z.faellig);
    const badge=z.faellig>0
      ? '<span class="deck-faellig">'+wort+'</span>'
      : '<span class="deck-faellig ruhig">'+wort+'</span>';
    return '<button class="deck" data-deck="'+d.k+'" style="--reiter:'+d.farbe+'">'+
      '<div class="deck-kopf"><h3>'+esc(d.name)+'</h3>'+badge+'</div>'+
      '<p>'+esc(d.text)+'</p>'+
      '<div class="deck-fuss"><span>'+T.karten(z.gesamt)+'</span>'+
      '<div class="balken"><i style="width:'+z.quote+'%"></i></div><b>'+z.quote+'%</b></div></button>';
  }).join("");
  $("stapel-liste").querySelectorAll(".deck").forEach(b=>{
    b.addEventListener("click",()=>starteRunde(b.dataset.deck));
  });
  kopfleiste();
}

/* ---------- Runde ---------- */
function starteRunde(k){
  const pool=deckItems(k);
  if(!pool.length){meldung(T.stapelLeer);return;}
  const jetzt=Date.now();
  const faellige=pool.filter(i=>S.items[i.id]&&S.items[i.id].d<=jetzt)
                     .sort((a,b)=>S.items[a.id].d-S.items[b.id].d);
  const neue=ordneNeue(k,mische(pool.filter(i=>!S.items[i.id])));
  const rest=mische(pool.filter(i=>S.items[i.id]&&S.items[i.id].d>jetzt));
  let liste=faellige.concat(neue).slice(0,RUNDENLAENGE);
  if(liste.length<RUNDENLAENGE) liste=liste.concat(rest.slice(0,RUNDENLAENGE-liste.length));
  lauf={deck:k,liste:mische(liste),pos:0,richtig:0,falsch:0,serie:0,
        wiederholt:{},beantwortet:false,gewaehlt:null,gebaut:[],vorrat:[]};
  zeige("runde");
  zeigeKarte(false);
}

function zeigeKarte(mitAnimation){
  const k=lauf.liste[lauf.pos];
  if(!k){zeigeBilanz();return;}
  lauf.beantwortet=false;lauf.gewaehlt=null;lauf.wechselt=false;
  const gesamt=lauf.liste.length;
  $("runde-balken").style.width=Math.round(lauf.pos/gesamt*100)+"%";
  $("runde-zaehler").textContent=(lauf.pos+1)+" "+T.von+" "+gesamt;

  const d=DECK_NACH_K[k.deck];
  const f=fach(k.id);
  let kopf='<div class="karte-reiter" style="--reiter:'+d.farbe+'">'+
    '<span class="punkt"></span><span>'+esc(d.name)+'</span>'+
    (k.schwer?'<span class="schwer-marke">'+T.schwer+'</span>':'')+
    '<span class="fach-zeiger">'+(f===0?T.neueKarte:T.fach+" "+f)+'</span></div>';

  let koerper="";
  if(k.typ==="bau"){
    lauf.gebaut=[];lauf.vorrat=mische(k.woerter.map((w,i)=>({w:w,i:i})));
    koerper='<p class="anweisung">'+k.anweisung+'</p>'+
            '<div class="bauplatz" id="bauplatz" data-leer="'+esc(T.bauplatzLeer)+'"></div>'+
            '<div class="vorrat" id="vorrat"></div>'+
            '<div class="karte-fuss"><button class="knopf" id="k-pruefen">'+T.pruefen+'</button>'+
            '<span class="tastenhinweis"><kbd>Enter</kbd> '+T.tastePruefen+'</span></div>';
  }else if(k.typ==="tippen"){
    koerper='<p class="frage">'+k.frage+'</p><p class="anweisung">'+k.anweisung+'</p>'+
      '<div class="eingabe-zeile"><input class="eingabe" id="eingabe" autocomplete="off" '+
      'autocapitalize="off" spellcheck="false" placeholder="'+esc(T.eintippen)+'"></div>'+
      '<div class="umlaute">'+A.zeichen.map(c=>'<button data-c="'+c+'">'+c+'</button>').join("")+'</div>'+
      '<div class="karte-fuss"><button class="knopf" id="k-pruefen">'+T.pruefen+'</button>'+
      '<button class="knopf leise" id="k-weissnicht">'+T.weissNicht+'</button>'+
      '<span class="tastenhinweis"><kbd>Enter</kbd> '+T.tastePruefen+'</span></div>';
  }else{
    const opt=mische(k.optionen);
    const stil=k.geschlecht?' zweispaltig':'';
    koerper='<p class="frage">'+k.frage+'</p><p class="anweisung">'+k.anweisung+'</p>'+
      '<div class="antworten'+stil+'" id="antworten">'+
      opt.map((o,n)=>{
        const farbe=k.geschlecht?A.geschlechtFarben[o]:null;
        return '<button class="wahl'+(farbe?" geschlecht":"")+'" data-wert="'+esc(o)+'"'+
          (farbe?' style="--g:'+farbe+'"':'')+'><kbd>'+(n+1)+'</kbd>'+esc(o)+'</button>';
      }).join("")+'</div>'+
      '<div class="karte-fuss"><span class="tastenhinweis">'+T.tasten(opt.length)+'</span></div>';
  }

  karte.className="karte"+(mitAnimation?" rein":"");
  karte.innerHTML=kopf+koerper;
  verdrahteKarte(k);
}

function verdrahteKarte(k){
  if(k.typ==="wahl"){
    karte.querySelectorAll(".wahl").forEach(b=>
      b.addEventListener("click",()=>antworte(k,b.dataset.wert)));
  }else if(k.typ==="tippen"){
    const e=$("eingabe");e.focus();
    $("k-pruefen").addEventListener("click",()=>antworte(k,e.value));
    $("k-weissnicht").addEventListener("click",()=>antworte(k,""));
    karte.querySelectorAll(".umlaute button").forEach(b=>b.addEventListener("click",()=>{
      const p=e.selectionStart||e.value.length;
      e.value=e.value.slice(0,p)+b.dataset.c+e.value.slice(e.selectionEnd||p);
      e.focus();e.setSelectionRange(p+1,p+1);
    }));
  }else{
    zeichneBau();
    $("k-pruefen").addEventListener("click",()=>
      antworte(k,lauf.gebaut.map(x=>x.w).join(" ")+k.schluss));
  }
}

function zeichneBau(){
  const bp=$("bauplatz"), vr=$("vorrat");
  bp.innerHTML=lauf.gebaut.map((x,n)=>'<button class="wortchip" data-weg="'+n+'">'+esc(x.w)+'</button>').join("");
  vr.innerHTML=lauf.vorrat.map((x,n)=>'<button class="wortchip"'+(x.benutzt?" disabled":"")+' data-hin="'+n+'">'+esc(x.w)+'</button>').join("");
  bp.querySelectorAll("[data-weg]").forEach(b=>b.addEventListener("click",()=>{
    const x=lauf.gebaut.splice(+b.dataset.weg,1)[0];
    lauf.vorrat.find(v=>v.i===x.i).benutzt=false;zeichneBau();
  }));
  vr.querySelectorAll("[data-hin]").forEach(b=>b.addEventListener("click",()=>{
    const x=lauf.vorrat[+b.dataset.hin];if(x.benutzt)return;
    x.benutzt=true;lauf.gebaut.push({w:x.w,i:x.i});zeichneBau();
  }));
}

/* ---------- Antwort bewerten ---------- */
function tagBuchen(){
  const heute=ymd(new Date());
  S.tage[heute]=(S.tage[heute]||0)+1;
  if(S.letzterTag!==heute){
    const gestern=ymd(new Date(Date.now()-TAG));
    S.streak = S.letzterTag===gestern ? S.streak+1 : 1;
    S.letzterTag=heute;
  }
}

function antworte(k,wert){
  if(lauf.beantwortet)return;
  lauf.beantwortet=true;
  const eingabe=String(wert==null?"":wert);
  const ok = k.typ==="wahl" ? eingabe===k.richtig
           : k.loesungen.some(l=>norm(l)===norm(eingabe));
  const stufeVorher=stufeFuer(S.xp);

  const z=S.items[k.id]||{b:0,d:0,r:0,f:0};
  const fachVorher=z.b;
  if(ok){z.b=Math.min(5,z.b+1);z.r=(z.r||0)+1;z.d=Date.now()+INTERVALLE[z.b]*TAG;}
  else   {z.b=1;z.f=(z.f||0)+1;z.d=Date.now();}
  S.items[k.id]=z;

  if(ok){
    lauf.richtig++;lauf.serie++;S.totalRichtig++;
    S.xp+=(k.schwer?15:10)+(z.b===5&&fachVorher<5?15:0);
    if(lauf.serie>S.besteSerie)S.besteSerie=lauf.serie;
    const w=S.fehler.indexOf(k.id);if(w>-1)S.fehler.splice(w,1);
  }else{
    lauf.falsch++;lauf.serie=0;S.totalFalsch++;
    if(S.fehler.indexOf(k.id)<0)S.fehler.unshift(k.id);
    if(S.fehler.length>200)S.fehler.length=200;
    if(!lauf.wiederholt[k.id]){lauf.wiederholt[k.id]=1;lauf.liste.push(k);}
  }
  tagBuchen();
  sichern();
  kopfleiste();

  zeichneRueckmeldung(k,ok,eingabe,fachVorher,z.b);

  if(stufeFuer(S.xp)>stufeVorher) meldung(T.stufeErreicht(stufeFuer(S.xp)));
  ABZEICHEN.forEach(a=>{
    if(S.abzeichen.indexOf(a.k)<0&&a.test()){S.abzeichen.push(a.k);sichern();
      setTimeout(()=>meldung(T.abzeichenMeldung+a.name),600);}
  });
}

function jubel(){return A.jubel[Math.floor(Math.random()*A.jubel.length)];}

function notizSetzen(sammlung,schluessel,text){
  if(text.trim())S[sammlung][schluessel]=text;else delete S[sammlung][schluessel];
  sichern();
}
function notizFeld(k){
  return '<label class="notiz-label" for="notiz-feld">'+T.deineNotiz+'</label>'+
    '<textarea class="notiz" id="notiz-feld" rows="2" placeholder="'+esc(T.notizPlatzhalter)+'">'+esc(S.notizen[k.id]||"")+'</textarea>';
}
function notizFeldVerbinden(k){
  $("notiz-feld").addEventListener("input",ev=>notizSetzen("notizen",k.id,ev.target.value));
}
function kartenText(k){
  const loesung="<b>"+esc(k.typ==="wahl"?k.richtig:k.loesungen[0])+"</b>";
  if(!k.frage)return loesung;
  if(k.frage.indexOf(LUECKE)>-1)return k.frage.replace(LUECKE,loesung);
  return k.frage+": "+loesung;
}

function zeichneRueckmeldung(k,ok,eingabe,vorher,nachher){
  if(k.typ==="wahl"){
    karte.querySelectorAll(".wahl").forEach(b=>{
      b.disabled=true;
      if(b.dataset.wert===k.richtig){b.classList.add("richtig");
        b.insertAdjacentHTML("beforeend",'<span class="marker">'+T.markerRichtig+'</span>');}
      else if(!ok&&b.dataset.wert===eingabe){b.classList.add("falsch");
        b.insertAdjacentHTML("beforeend",'<span class="marker">'+T.markerGewaehlt+'</span>');}
    });
  }else if(k.typ==="tippen"){
    const e=$("eingabe");e.disabled=true;e.classList.add(ok?"richtig":"falsch");
    if(!eingabe)e.value="";
  }else{
    karte.querySelectorAll(".wortchip").forEach(b=>b.disabled=true);
  }
  const fussAlt=karte.querySelector(".karte-fuss");if(fussAlt)fussAlt.remove();
  const umlaute=karte.querySelector(".umlaute");if(umlaute)umlaute.remove();

  const loesung=k.typ==="wahl"?k.richtig:k.loesungen[0];
  const bewegung = ok
    ? (nachher===5&&vorher===5 ? T.bleibtHinten : T.rutscht(nachher))
    : (vorher===0 ? T.landetVorne : T.gehtZurueck);

  karte.insertAdjacentHTML("beforeend",
    '<div class="rueckmeldung '+(ok?"ja":"nein")+'">'+
      '<h3>'+(ok?esc(jubel()):T.nochNicht)+'</h3>'+
      (ok?"":'<p class="loesung">'+T.richtigIst+' <b>'+esc(loesung)+'</b></p>')+
      '<p>'+bewegung+'</p>'+
      (k.erklaerung?'<div class="regel">'+k.erklaerung+'</div>':'')+
      '<div class="notiz-block" id="notiz-block">'+(S.notizen[k.id]?notizFeld(k):'')+'</div>'+
      '<div class="karte-fuss"><button class="knopf hell" id="k-weiter">'+T.weiter+'</button>'+
      (S.notizen[k.id]?'':'<button class="knopf leise" id="k-notiz">'+T.notiz+'</button>')+
      '<span class="tastenhinweis"><kbd>Enter</kbd> '+T.tasteWeiter+'</span></div>'+
    '</div>');
  $("k-weiter").focus();
  $("k-weiter").addEventListener("click",weiter);
  if(S.notizen[k.id])notizFeldVerbinden(k);
  else $("k-notiz").addEventListener("click",()=>{
    $("notiz-block").innerHTML=notizFeld(k);
    notizFeldVerbinden(k);
    $("k-notiz").remove();
    $("notiz-feld").focus();
  });
}

function weiter(){
  if(lauf.wechselt||lauf.fertig)return;
  lauf.wechselt=true;
  lauf.pos++;
  if(lauf.pos>=lauf.liste.length){lauf.wechselt=false;zeigeBilanz();return;}
  karte.classList.add("raus");
  setTimeout(()=>zeigeKarte(true),150);
}

function zeigeBilanz(){
  S.runden++;
  if(lauf.falsch===0)S.perfekteRunden++;
  sichern();
  const gesamt=lauf.richtig+lauf.falsch;
  const quote=gesamt?Math.round(lauf.richtig/gesamt*100):0;
  $("runde-balken").style.width="100%";
  $("runde-zaehler").textContent=T.fertig;
  const name=deckName(lauf.deck);
  karte.className="karte rein";
  karte.innerHTML=
    '<div class="karte-reiter"><span>'+T.rundeBeendet+'</span>'+
    '<span class="fach-zeiger">'+esc(name)+'</span></div>'+
    '<div class="bilanz"><div class="zahl">'+quote+'<small>%</small></div>'+
    '<ul class="bilanz-zeilen">'+
      '<li>'+T.bilanzRichtig+'<b>'+lauf.richtig+'</b></li>'+
      '<li>'+T.bilanzFalsch+'<b>'+lauf.falsch+'</b></li>'+
      '<li>'+T.laengsteSerie+'<b>'+S.besteSerie+'</b></li>'+
      '<li>'+T.punkteInsgesamt+'<b>'+S.xp+'</b></li>'+
    '</ul></div>'+
    '<div class="karte-fuss">'+
      '<button class="knopf hell gross" id="k-nochmal">'+T.nochEineRunde+'</button>'+
      '<button class="knopf leise" id="k-kasten">'+T.zumKasten+'</button></div>';
  $("k-nochmal").addEventListener("click",()=>starteRunde(lauf.deck));
  $("k-kasten").addEventListener("click",()=>{zeigeStart();zeige("start");});
  $("k-nochmal").focus();
  lauf.beantwortet=true;lauf.fertig=true;
}

/* ---------- Fortschritt ---------- */
function zeigeFortschritt(){
  $("f-themen").innerHTML=DECKS.concat([SONDERDECKS.schwer]).map(d=>{
    const z=deckZahlen(d.k);
    return '<div class="thema" style="--reiter:'+d.farbe+'">'+
      '<div class="thema-name"><span class="punkt"></span>'+esc(d.name)+'</div>'+
      '<div class="balken"><i style="width:'+z.quote+'%"></i></div>'+
      '<div class="thema-zahl"><b>'+z.beherrscht+'</b> '+T.von+' '+z.gesamt+'</div></div>';
  }).join("");

  const heute=new Date();heute.setHours(12,0,0,0);
  const zellen=[];
  for(let i=55;i>=0;i--){
    const d=new Date(heute.getTime()-i*TAG);
    const n=S.tage[ymd(d)]||0;
    const s=n===0?"":n<5?"s1":n<15?"s2":"s3";
    zellen.push('<div class="tag '+s+(i===0?" heute":"")+'" title="'+ymd(d)+": "+T.karten(n)+'"></div>');
  }
  let kal="";
  for(let w=0;w<8;w++) kal+='<div class="woche">'+zellen.slice(w*7,w*7+7).join("")+'</div>';
  $("f-kalender").innerHTML=kal;

  $("f-thema-notizen").innerHTML=DECKS.map(d=>
    '<article class="notiz-eintrag" style="--reiter:'+d.farbe+'">'+
      '<div class="thema-name"><span class="punkt"></span>'+esc(d.name)+'</div>'+
      '<textarea class="notiz dunkel" data-thema="'+d.k+'" rows="2" placeholder="'+esc(T.stapelNotiz)+'">'+esc(S.themaNotizen[d.k]||"")+'</textarea>'+
    '</article>').join("");
  const mitNotiz=ITEMS.filter(i=>S.notizen[i.id]);
  $("f-karten-notizen-leer").hidden=mitNotiz.length>0;
  $("f-karten-notizen").innerHTML=mitNotiz.map(i=>
    '<article class="notiz-eintrag" style="--reiter:'+DECK_NACH_K[i.deck].farbe+'">'+
      '<div class="notiz-frage">'+kartenText(i)+'</div>'+
      '<textarea class="notiz dunkel" data-karte="'+i.id+'" rows="2">'+esc(S.notizen[i.id])+'</textarea>'+
    '</article>').join("");

  const hat=ABZEICHEN.filter(a=>S.abzeichen.indexOf(a.k)>-1).length;
  $("f-abzeichen-zahl").textContent=T.gesammelt(hat,ABZEICHEN.length);
  $("f-abzeichen").innerHTML=ABZEICHEN.map(a=>
    '<article class="'+(S.abzeichen.indexOf(a.k)>-1?"hat":"")+'"><h3>'+esc(a.name)+'</h3>'+
    '<p>'+esc(a.text)+'</p></article>').join("");
  kopfleiste();
}

function datenHinweis(text,gut){
  const el=$("daten-hinweis");el.textContent=text;el.hidden=false;
  el.dataset.ton=gut?"gut":"";
}
function fortschrittDatei(){
  return new File([JSON.stringify(Object.assign({app:A.app},S))],A.dateiname+"-"+ymd(new Date())+".json",{type:"application/json"});
}
function teilenMoeglich(datei){
  return navigator.maxTouchPoints>0&&!!navigator.canShare&&navigator.canShare({files:[datei]});
}
$("k-export").addEventListener("click",async()=>{
  const datei=fortschrittDatei();
  if(teilenMoeglich(datei)){
    try{
      await navigator.share({files:[datei],title:T.teilenTitel});
      datenHinweis(T.geteilt,true);
    }catch(e){
      if(e.name==="AbortError")$("daten-hinweis").hidden=true;
      else datenHinweis(T.teilenFehler);
    }
    return;
  }
  const a=document.createElement("a");
  a.href=URL.createObjectURL(datei);
  a.download=datei.name;
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  datenHinweis(T.gespeichert,true);
});
$("k-import").addEventListener("click",()=>$("datei-eingabe").click());
$("datei-eingabe").addEventListener("change",ev=>{
  const f=ev.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=()=>{
    let d;
    try{
      d=JSON.parse(r.result);
      if(!d||typeof d!=="object"||!d.items)throw 0;
    }catch(e){datenHinweis(T.dateiPasstNicht);return;}
    // Sicherungen ohne Kennung stammen aus der Zeit, als es nur die deutsche Seite gab.
    if((d.app||"de")!==A.app){datenHinweis(T.falscheSprache);return;}
    delete d.app;
    S=aufbereiten(d);
    sichern();zeigeFortschritt();zeigeStart();
    datenHinweis(T.geladen,true);
  };
  r.readAsText(f);ev.target.value="";
});
$("k-reset").addEventListener("click",()=>{
  if(!confirm(T.resetFrage))return;
  S=Object.assign({},LEER,{items:{},tage:{},fehler:[],abzeichen:[],notizen:{},themaNotizen:{}});
  sichern();zeigeFortschritt();zeigeStart();
  datenHinweis(T.zurueckgesetzt);
});
$("knopf-fortschritt").addEventListener("click",()=>{zeigeFortschritt();zeige("fortschritt");});
sFortschritt.addEventListener("input",ev=>{
  const t=ev.target;
  if(t.dataset.thema)notizSetzen("themaNotizen",t.dataset.thema,t.value);
  else if(t.dataset.karte)notizSetzen("notizen",t.dataset.karte,t.value);
});
sFortschritt.addEventListener("change",ev=>{
  if(ev.target.dataset.karte&&!ev.target.value.trim())zeigeFortschritt();
});
$("knopf-zurueck").addEventListener("click",()=>{zeigeStart();zeige("start");});

/* ---------- Tastatur ---------- */
document.addEventListener("keydown",ev=>{
  if(ev.metaKey||ev.ctrlKey||ev.altKey)return;
  if(ev.target.tagName==="TEXTAREA")return;
  if(bildschirm==="fortschritt"&&ev.key==="Escape"){zeigeStart();zeige("start");return;}
  if(bildschirm!=="runde"||!lauf)return;
  if(ev.key==="Escape"&&!lauf.fertig){zeigeStart();zeige("start");return;}
  const k=lauf.liste[lauf.pos];
  if(lauf.fertig)return;
  if(lauf.beantwortet){
    if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();weiter();}
    return;
  }
  if(k.typ==="wahl"&&/^[1-9]$/.test(ev.key)){
    const b=karte.querySelectorAll(".wahl")[+ev.key-1];
    if(b){ev.preventDefault();antworte(k,b.dataset.wert);}
  }else if(ev.key==="Enter"){
    ev.preventDefault();
    if(k.typ==="tippen")antworte(k,$("eingabe").value);
    else if(k.typ==="bau"&&lauf.gebaut.length)antworte(k,lauf.gebaut.map(x=>x.w).join(" ")+k.schluss);
  }
});

zeigeStart();
zeige("start");
}
