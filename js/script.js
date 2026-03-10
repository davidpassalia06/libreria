// ══════════════════════════════════════════════════════════════
// CONSTANTS
// ══════════════════════════════════════════════════════════════
const PROFILE_ICONS = ['📚','🦉','🌙','⭐','🔮','🎭','🐉','🌿','☕','🎨','🚬','🎸','🧠','🐺'];
const ACHIEVEMENTS = [
  {id:'first_book', emoji:'📖',name:'Prima pagina',   desc:'Aggiungi il primo libro',        check:s=>s.total>=1},
  {id:'first_done', emoji:'✅',name:'Primo traguardo',desc:'Completa il primo libro',        check:s=>s.read>=1},
  {id:'shelf10',    emoji:'📚',name:'Scaffale pieno', desc:'10 libri nella libreria',        check:s=>s.total>=10},
  {id:'read5',      emoji:'🎓',name:'Lettore assiduo',desc:'5 libri completati',             check:s=>s.read>=5},
  {id:'streak7',    emoji:'🔥',name:'Una settimana',  desc:'7 giorni consecutivi',           check:s=>s.streak>=7},
  {id:'streak30',   emoji:'📅',name:'Maratoneta',     desc:'30 giorni consecutivi',          check:s=>s.streak>=30},
  {id:'pomo10',     emoji:'🍅',name:'Concentrato',    desc:'10 sessioni Pomodoro',           check:s=>s.pomodoros>=10},
  {id:'pomo50',     emoji:'⏱', name:'Instancabile',   desc:'50 sessioni Pomodoro',           check:s=>s.pomodoros>=50},
  {id:'reviewer',   emoji:'⭐',name:'Critico',        desc:'5 recensioni scritte',           check:s=>s.reviews>=5},
  {id:'genres5',    emoji:'🗺', name:'Esploratore',    desc:'5 generi diversi',               check:s=>s.genres>=5},
  {id:'night_owl',  emoji:'🌙',name:'Nottambulo',     desc:'Sessione dopo le 22:00',         check:s=>s.lateSession},
  {id:'speedster',  emoji:'🏃',name:'Velocista',      desc:'Libro completato in <7 giorni',  check:s=>s.fastRead},
];
const STATUS = {
  'letto':      {label:'Letto',       cls:'badge-letto'},
  'in-corso':   {label:'In corso',    cls:'badge-in-corso'},
  'da-leggere': {label:'Da leggere',  cls:'badge-da-leggere'},
  'abbandonato':{label:'Abbandonato', cls:'badge-abbandonato'},
};
const S_COLOR = {'letto':'var(--green)','in-corso':'var(--amber)','da-leggere':'var(--text3)','abbandonato':'var(--red)'};
const S_ORDER = ['letto','in-corso','da-leggere','abbandonato'];
const SCOPRI_CATALOG = [
  {genre:'Narrativa letteraria', books:[
    {title:'I fratelli Karamazov',author:'Dostoevskij',year:'2014',publisher:'Feltrinelli',pages:'1120',isbn:'9788807900792'},
    {title:'Anna Karenina',author:'Tolstoj',year:'2013',publisher:'Feltrinelli',pages:'1120',isbn:'9788807900006'},
    {title:'Cent\'anni di solitudine',author:'García Márquez',year:'2021',publisher:'Oscar Mondadori',pages:'384',isbn:'9788804734949',cover:'https://m.media-amazon.com/images/I/81nxsT-8NWS._SL1500_.jpg'},
    {title:'Il maestro e Margherita',author:'Bulgakov',year:'2022',publisher:'Feltrinelli',pages:'560',isbn:'9788807900143'},
    {title:'Il processo',author:'Kafka',year:'2020',publisher:'Adelphi',pages:'329',isbn:'9788845934674'},
    {title:'Lo straniero',author:'Camus',year:'2018',publisher:'Bompiani',pages:'123',isbn:'9788858780626'},
    {title:'Se una notte d\'inverno un viaggiatore',author:'Calvino',year:'2022',publisher:'Oscar Mondadori',pages:'324',isbn:'9788804772149'},
    {title:'Finzioni',author:'Borges',year:'2015',publisher:'Adelphi',pages:'192',isbn:'9788845929649'}
  ]},
  {genre:'Narrativa italiana', books:[
    {title:'Il Gattopardo',author:'Tomasi di Lampedusa',year:'2026',publisher:'Feltrinelli',pages:'304',isbn:'9788807950735'},
    {title:'Il nome della rosa',author:'Umberto Eco',year:'2020',publisher:'La nave di Teseo',pages:'624',isbn:'9788834603000'},
    {title:'La coscienza di Zeno',author:'Italo Svevo',year:'2022',publisher:'Feltrinelli',pages:'432',isbn:'9788807900495'},
    {title:'L\'amica geniale',author:'Elena Ferrante',year:'2011',publisher:'EO',pages:'336',isbn:'9788866320326'},
    {title:'Se questo è un uomo',author:'Primo Levi',year:'2014',publisher:'Einaudi',pages:'214',isbn:'9788806219352'},
    {title:'Lessico famigliare',author:'Natalia Ginzburg',year:'2014',publisher:'Einaudi',pages:'296',isbn:'9788806219291'},
    {title:'Una questione privata',author:'Fenoglio',year:'2022',publisher:'Einaudi',pages:'208',isbn:'9788806253103'},
    {title:'I promessi sposi',author:'Manzoni',year:'2014',publisher:'Feltrinelli',pages:'736',isbn:'9788807901010'}
  ]},
  {genre:'Fantascienza', books:[
    {title:'Dune',author:'Frank Herbert',year:'2019',publisher:'Fanucci',pages:'640',isbn:'9788834739679'},
    {title:'1984',author:'George Orwell',year:'2024',publisher:'Mondadori',pages:'321',isbn:'9788804796657'},
    {title:'Il problema dei tre corpi',author:'Liu Cixin',year:'2017',publisher:'Mondadori',pages:'362',isbn:'9788804680604'},
    {title:'Il cacciatore di androidi',author:'Philip K. Dick',year:'2022',publisher:'Mondadori',pages:'249',isbn:'9788835722366'},
    {title:'Solaris',author:'Stanislaw Lem',year:'2013',publisher:'Sellerio',pages:'328',isbn:'9788838929106'},
    {title:'Il mondo nuovo',author:'Aldous Huxley',year:'2021',publisher:'Oscar Mondadori',pages:'384',isbn:'9788804735823'},
    {title:'Il racconto dell\'ancella',author:'Margaret Atwood',year:'2019',publisher:'Ponte alle Grazie',pages:'400',isbn:'9788833312255'},
    {title:'Fahrenheit 451',author:'Ray Bradbury',year:'2023',publisher:'Oscar Mondadori',pages:'180',isbn:'9788804783497'}
  ]},
  {genre:'Filosofia', books:[
    {title:'La Repubblica',author:'Platone',year:'2019',publisher:'Feltrinelli',pages:'1079',isbn:'9788807903458'},
    {title:'Pensieri',author:'Marco Aurelio',year:'2024',publisher:'Oscar Mondadori',pages:'324',isbn:'9788804796749'},
    {title:'Al di là del bene e del male',author:'Nietzsche',year:'2020',publisher:'Feltrinelli',pages:'272',isbn:'9788807903656'},
    {title:'Il mito di Sisifo',author:'Albert Camus',year:'2013',publisher:'Bompiani',pages:'144',isbn:'9788845246425'},
    {title:'Il mondo come volontà e rappresentazione',author:'Schopenhauer',year:'2006',publisher:'Bompiani',pages:'2368',isbn:'9788845257100'},
    {title:'L\'essere e il nulla',author:'Sartre',year:'2023',publisher:'Il Saggiatore',pages:'736',isbn:'9788842832232'},
    {title:'Etica',author:'Spinoza',year:'2017',publisher:'UTET',pages:'742',isbn:'9788851151720'},
    {title:'Critica della ragion pura',author:'Kant',year:'2004',publisher:'Bompiani',pages:'1536',isbn:'9788845233234'}
  ]},
  {genre:'Giallo e noir', books:[
    {title:'Dieci piccoli indiani',author:'Agatha Christie',year:'2025',publisher:'Oscar Mondadori',pages:'224',isbn:'9788804801962'},
    {title:'Il grande sonno',author:'Raymond Chandler',year:'2019',publisher:'Adelphi',pages:'288',isbn:'9788845934384'},
    {title:'Il talento di Mr. Ripley',author:'Patricia Highsmith',year:'2017',publisher:'La nave di Teseo',pages:'414',isbn:'9788893441759'},
    {title:'La spia che venne dal freddo',author:'John Le Carré',year:'2025',publisher:'Oscar Mondadori',pages:'288',isbn:'9788804807407'},
    {title:'L.A. Confidential',author:'James Ellroy',year:'2023',publisher:'Einaudi',pages:'512',isbn:'9788806256951'},
    {title:'Uomini che odiano le donne',author:'Stieg Larsson',year:'2018',publisher:'Marsilio',pages:'676',isbn:'9788831743358'},
    {title:'La promessa',author:'Friedrich Dürrenmatt',year:'2019',publisher:'Adelphi',pages:'162',isbn:'9788845934216'},
    {title:'Il commissario Maigret',author:'Georges Simenon',year:'2019',publisher:'Adelphi',pages:'719',isbn:'9788845933738'}
  ]},
  {genre:'Saggistica', books:[
    {title:'Sapiens',author:'Yuval Noah Harari',year:'2017',publisher:'Bompiani',pages:'540',isbn:'9788845296499'},
    {title:'Le origini del totalitarismo',author:'Hannah Arendt',year:'2009',publisher:'Einaudi',pages:'792',isbn:'9788806200640'},
    {title:'La struttura delle rivoluzioni scientifiche',author:'Thomas Kuhn',year:'2009',publisher:'Einaudi',pages:'251',isbn:'9788806199005'},
    {title:'Armi acciaio e malattie',author:'Jared Diamond',year:'2014',publisher:'Einaudi',pages:'414',isbn:'9788806219222'},
    {title:'Sorvegliare e punire',author:'Michel Foucault',year:'2014',publisher:'Einaudi',pages:'340',isbn:'9788806219468'},
    {title:'L\'interpretazione dei sogni',author:'Sigmund Freud',year:'2014',publisher:'Einaudi',pages:'582',isbn:'9788806224820'},
    {title:'Il cigno nero',author:'Nassim Taleb',year:'2023',publisher:'Il Saggiatore',pages:'496',isbn:'9788842832270'},
    {title:'La democrazia in America',author:'Tocqueville',year:'2014',publisher:'UTET',pages:'165',isbn:'9788841899861'}
  ]}
];

// ══════════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════════
let currentUser=null, books=[], currentBook=null;
let formRating=0, formStatus='letto', formEditId=null, searchTimer=null, currentTab='cerca';
let firebaseUrl='';
let isDirty=false, pendingNav=null;
let manageMode=false, editingUserId=null, editingUserSelectedIcon=null;

// ══════════════════════════════════════════════════════════════
// SECURITY UTILS
// ══════════════════════════════════════════════════════════════
const h=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
const trunc=(s,n)=>s&&s.length>n?s.slice(0,n-1)+'…':(s||'');

const STR_FIELDS=['id','title','author','year','publisher','pages','genre','isbn','cover','dateRead','review','quote','description','status','sourceId'];
const MAX_LENS={title:300,author:200,year:10,publisher:200,pages:10,genre:100,isbn:20,cover:100000,dateRead:20,review:5000,quote:1000,description:3000,status:20,sourceId:100};
function validateBook(raw){
  if(!raw||typeof raw!=='object')return null;
  const b={};
  const id=String(raw.id||'').trim();
  if(!id)return null;
  b.id=id.slice(0,50);
  const title=String(raw.title||'').trim();
  if(!title)return null;
  b.title=title.slice(0,300);
  for(const f of STR_FIELDS){
    if(f==='id'||f==='title')continue;
    const max=MAX_LENS[f]||200;
    b[f]=String(raw[f]??'').trim().slice(0,max);
  }
  if(!STATUS[b.status])b.status='da-leggere';
  b.rating=Math.min(5,Math.max(0,parseInt(raw.rating)||0));
  b.currentPage=Math.max(0,parseInt(raw.currentPage)||0);
  if(Array.isArray(raw.chapters)){
    b.chapters=raw.chapters.slice(0,200).map(ch=>({
      name:String(ch?.name||'').trim().slice(0,200),
      notes:String(ch?.notes||'').trim().slice(0,2000),
    }));
  }else{b.chapters=[];}
  return b;
}
// ══════════════════════════════════════════════════════════════
// USERS & LOCAL STORAGE
// ══════════════════════════════════════════════════════════════
function getUsers(){try{return JSON.parse(localStorage.getItem('lib-users')||'[]');}catch{return[];}}
function saveUsers(us){localStorage.setItem('lib-users',JSON.stringify(us));}
function getUserStats(uid){try{return JSON.parse(localStorage.getItem('lib-stats-'+uid)||'{}');}catch{return{};}}
function saveUserStats(uid,stats){localStorage.setItem('lib-stats-'+uid,JSON.stringify(stats));}

// ── Profile screen ──────────────────────────────
function renderUserScreen(){
  const us=getUsers();
  const grid=document.getElementById('profile-grid');
  let html='';
  us.forEach(u=>{
    const st=getUserStats(u.id);
    const streak=st.streak||0;
    const icon=u.icon||'📚';
    html+=`<div class="profile-tile${manageMode?' edit-mode':''}" data-uid="${h(u.id)}">
      <div class="profile-tile-avatar">${icon}</div>
      <div class="profile-tile-name">${h(u.name)}</div>
      ${streak>0&&!manageMode?`<div class="profile-tile-streak">🔥 ${streak}</div>`:''}
    </div>`;
  });
  if(manageMode){
    html+=`<div class="profile-add-tile" id="add-profile-tile-btn">
      <div class="profile-add-avatar">＋</div>
      <div class="profile-add-label">Nuovo</div>
    </div>`;
  }
  grid.innerHTML=html;
  grid.querySelectorAll('.profile-tile').forEach(tile=>{
    tile.addEventListener('click',()=>{
      const uid=tile.dataset.uid;
      if(manageMode){openEditProfileModal(uid);}
      else{selectUser(uid).catch(err=>console.error(err));}
    });
  });
  const addBtn=document.getElementById('add-profile-tile-btn');
  if(addBtn)addBtn.addEventListener('click',showNewProfileForm);
  document.getElementById('profile-manage-btn').textContent=manageMode?'✓ Fine':'✏ Gestisci profili';
}

function toggleManageMode(){
  manageMode=!manageMode;
  if(!manageMode)document.getElementById('new-profile-form').style.display='none';
  renderUserScreen();
}
function showNewProfileForm(){
  const form=document.getElementById('new-profile-form');
  form.style.display='block';
  initNewUserIconPicker();
  document.getElementById('new-user-input').focus();
}
function hideNewProfileForm(){
  document.getElementById('new-profile-form').style.display='none';
  document.getElementById('new-user-input').value='';
}

let newUserSelectedIcon=PROFILE_ICONS[0];
function initNewUserIconPicker(){
  newUserSelectedIcon=PROFILE_ICONS[0];
  const row=document.getElementById('new-user-icon-picker');
  row.innerHTML=PROFILE_ICONS.map(ic=>`<div class="icon-opt${ic===newUserSelectedIcon?' selected':''}" data-icon="${ic}">${ic}</div>`).join('');
  row.querySelectorAll('.icon-opt').forEach(el=>{
    el.addEventListener('click',()=>{
      newUserSelectedIcon=el.dataset.icon;
      row.querySelectorAll('.icon-opt').forEach(e=>e.classList.remove('selected'));
      el.classList.add('selected');
    });
  });
}

function addUser(){
  const inp=document.getElementById('new-user-input');
  const name=inp.value.trim().slice(0,32);
  if(!name)return;
  const us=getUsers();
  if(us.some(u=>u.name.toLowerCase()===name.toLowerCase())){alert('Esiste già un profilo con questo nome.');return;}
  us.push({id:'u'+Date.now(),name,icon:newUserSelectedIcon||'📚'});
  saveUsers(us);inp.value='';
  hideNewProfileForm();
  renderUserScreen();
}

function openEditProfileModal(uid){
  editingUserId=uid;
  const u=getUsers().find(x=>x.id===uid);if(!u)return;
  editingUserSelectedIcon=u.icon||'📚';
  document.getElementById('edit-profile-name-input').value=u.name;
  const picker=document.getElementById('edit-profile-icon-picker');
  picker.innerHTML=PROFILE_ICONS.map(ic=>`<div class="icon-opt${ic===editingUserSelectedIcon?' selected':''}" data-icon="${ic}">${ic}</div>`).join('');
  picker.querySelectorAll('.icon-opt').forEach(el=>{
    el.addEventListener('click',()=>{
      editingUserSelectedIcon=el.dataset.icon;
      picker.querySelectorAll('.icon-opt').forEach(e=>e.classList.remove('selected'));
      el.classList.add('selected');
    });
  });
  document.getElementById('edit-profile-modal').classList.add('active');
}
function closeEditProfileModal(){
  document.getElementById('edit-profile-modal').classList.remove('active');
  editingUserId=null;
}
function saveProfileEdit(){
  if(!editingUserId)return;
  const name=document.getElementById('edit-profile-name-input').value.trim().slice(0,32);
  if(!name){alert('Il nome non può essere vuoto.');return;}
  const us=getUsers();
  const u=us.find(x=>x.id===editingUserId);if(!u)return;
  u.name=name;u.icon=editingUserSelectedIcon||'📚';
  saveUsers(us);closeEditProfileModal();renderUserScreen();
}
function deleteEditingUser(){
  if(!editingUserId)return;
  if(!confirm('Eliminare il profilo e tutti i suoi libri?'))return;
  const uid=editingUserId;
  closeEditProfileModal();
  saveUsers(getUsers().filter(u=>u.id!==uid));
  localStorage.removeItem('lib-stats-'+uid);
  localStorage.removeItem('firebase-url-'+uid);
  if(db)dbClearUser(uid).catch(()=>{});
  renderUserScreen();
}

async function selectUser(uid){
  const u=getUsers().find(x=>x.id===uid);
  if(!u){console.error('Profilo non trovato:',uid);return;}
  currentUser=u;manageMode=false;
  try{await openDB();}catch(e){console.error('openDB:',e);}
  try{books=await dbAllForUser(uid);}catch(e){console.error('dbAllForUser:',e);books=[];}
  document.getElementById('user-pill-name').textContent=u.name;
  document.getElementById('user-pill-avatar').textContent=u.icon||'📚';
  document.getElementById('export-user-name').textContent=u.name;
  document.getElementById('user-screen').style.display='none';
  document.getElementById('app-shell').style.display='flex';
  firebaseUrl=localStorage.getItem('firebase-url-'+uid)||'';
  if(firebaseUrl){
    document.getElementById('firebase-url-input').value=firebaseUrl;
    document.getElementById('fb-saved').style.display='block';
    document.getElementById('fb-saved').textContent='✓ URL configurato: '+firebaseUrl;
  }
  updateStreakDisplay();
  checkAndAwardAchievements();
  renderShelf();
}

function switchUser(){
  stopPomodoro();currentUser=null;books=[];manageMode=false;
  document.getElementById('app-shell').style.display='none';
  document.getElementById('user-screen').style.display='flex';
  renderUserScreen();
}

function initProfileIconPicker(){
  const u=currentUser;if(!u)return;
  const grid=document.getElementById('profile-icon-picker');
  grid.innerHTML=PROFILE_ICONS.map(ic=>`<div class="profile-icon-opt${(u.icon||'📚')===ic?' selected':''}" data-icon="${ic}">${ic}</div>`).join('');
  grid.querySelectorAll('.profile-icon-opt').forEach(el=>{
    el.addEventListener('click',()=>setProfileIcon(el.dataset.icon));
  });
}
function toggleProfileIconPicker(){
  const compendium=document.getElementById('profile-icon-picker-wrap');
  if(compendium.style.display==='none'){initProfileIconPicker();compendium.style.display='block';}
  else compendium.style.display='none';
}
function setProfileIcon(icon){
  if(!currentUser)return;
  const us=getUsers();const u=us.find(x=>x.id===currentUser.id);if(!u)return;
  u.icon=icon;saveUsers(us);currentUser=u;
  document.getElementById('profile-avatar-big').textContent=icon;
  document.getElementById('user-pill-avatar').textContent=icon;
  document.querySelectorAll('#profile-icon-picker .profile-icon-opt').forEach(el=>{
    el.classList.toggle('selected',el.dataset.icon===icon);
  });
}

function renderProfilePage(){
  if(!currentUser)return;
  const stats=getUserStats(currentUser.id);
  const streak=stats.streak||0;
  document.getElementById('profile-avatar-big').textContent=currentUser.icon||'📚';
  document.getElementById('profile-name-label').textContent=currentUser.name;
  document.getElementById('profile-streak-label').textContent=streak>0?`🔥 ${streak} giorni consecutivi`:'';
  document.getElementById('profile-icon-picker-wrap').style.display='none';
  const booksRead=books.filter(b=>b.status==='letto').length;
  const totalPages=books.reduce((s,b)=>s+(parseInt(b.pages)||0),0);
  const rated=books.filter(b=>b.rating>0);
  const avg=rated.length?(rated.reduce((s,b)=>s+b.rating,0)/rated.length).toFixed(1):'—';
  const pomo=stats.pomodoros||0;
  document.getElementById('profile-stats-grid').innerHTML=[
    {val:books.length,lbl:'Libri in totale'},
    {val:booksRead,lbl:'Libri completati'},
    {val:totalPages.toLocaleString('it'),lbl:'Pagine lette'},
    {val:avg+'★',lbl:'Media voti'},
    {val:pomo,lbl:'Pomodoro'},
    {val:streak,lbl:'Streak giorni'},
  ].map(s=>`<div class="profile-stat-card"><div class="profile-stat-val">${h(String(s.val))}</div><div class="profile-stat-lbl">${s.lbl}</div></div>`).join('');
  const top4=[...books].filter(b=>b.rating>0).sort((a,b)=>b.rating-a.rating).slice(0,4);
  const topGrid=document.getElementById('top-books-grid');
  if(!top4.length){topGrid.innerHTML='<div style="grid-column:1/-1;font-size:13px;color:var(--text3)">Nessun libro valutato ancora.</div>';}
  else{topGrid.innerHTML=top4.map(b=>`<div class="top-book-item" data-bid="${h(b.id)}">
    <div class="top-book-cover">
      ${b.cover?`<img src="${h(b.cover)}" alt="" onerror="this.style.display='none'">`:`<div class="top-book-no-cover">${h(trunc(b.title,30))}</div>`}
      <div class="cover-spine"></div>
    </div>
    <div class="top-book-rating">${'★'.repeat(b.rating)}</div>
    <div class="top-book-title">${h(trunc(b.title,22))}</div>
  </div>`).join('');
  topGrid.querySelectorAll('.top-book-item').forEach(el=>{
    el.addEventListener('click',()=>openDetail(el.dataset.bid));
  });}
  const unlocked=stats.unlockedAchievements||[];
  document.getElementById('profile-ach-sub').textContent=`${unlocked.length} di ${ACHIEVEMENTS.length} sbloccati`;
  document.getElementById('profile-ach-grid').innerHTML=ACHIEVEMENTS.map(a=>`
    <div class="ach-card ${unlocked.includes(a.id)?'unlocked':'locked'}">
      <div class="ach-emoji">${a.emoji}</div>
      <div class="ach-name">${h(a.name)}</div>
      <div class="ach-desc">${h(a.desc)}</div>
    </div>`).join('');
}

// ══════════════════════════════════════════════════════════════
// compendium
// ══════════════════════════════════════════════════════════════
function openCompendium(){
  const screen=document.getElementById('compendium-screen');
  screen.classList.add('active');
  const sel=document.getElementById('compendium-year-select');
  const currentYear=new Date().getFullYear();
  sel.innerHTML='';
  for(let y=currentYear;y>=currentYear-5;y--){
    const opt=document.createElement('option');
    opt.value=y;opt.textContent=y;
    sel.appendChild(opt);
  }
  renderCompendium();
}
function closeCompendium(){document.getElementById('compendium-screen').classList.remove('active');}

function renderCompendium(){
  const year=parseInt(document.getElementById('compendium-year-select').value);
  const yearBooks=books.filter(b=>{
    if(!b.dateRead)return false;
    return new Date(b.dateRead).getFullYear()===year;
  });
  const content=document.getElementById('compendium-content');
  const stats=getUserStats(currentUser?.id||'');

  if(!yearBooks.length){
    content.innerHTML=`<div class="compendium-empty">Nessun libro con data di lettura nel ${year}.<br>Aggiungi una data ai libri completati per vedere il tuo compendium.</div>`;
    return;
  }

  const totalPages=yearBooks.reduce((s,b)=>s+(parseInt(b.pages)||0),0);
  const rated=yearBooks.filter(b=>b.rating>0);
  const avg=rated.length?(rated.reduce((s,b)=>s+b.rating,0)/rated.length).toFixed(1):'—';
  const bookOfYear=[...yearBooks].filter(b=>b.rating>0).sort((a,b)=>b.rating-a.rating)[0];

  const genreCount={};
  yearBooks.forEach(b=>{if(b.genre){const g=b.genre.split(',')[0].trim();genreCount[g]=(genreCount[g]||0)+1;}});
  const topGenre=Object.entries(genreCount).sort((a,b)=>b[1]-a[1])[0];

  const authorCount={};
  yearBooks.forEach(b=>{if(b.author){const a=b.author.split(',')[0].trim();authorCount[a]=(authorCount[a]||0)+1;}});
  const topAuthor=Object.entries(authorCount).sort((a,b)=>b[1]-a[1])[0];

  const monthCounts=Array(12).fill(0);
  yearBooks.forEach(b=>{if(b.dateRead){const m=new Date(b.dateRead).getMonth();monthCounts[m]++;}});
  const maxM=Math.max(...monthCounts,1);
  const monthNames=['G','F','M','A','M','G','L','A','S','O','N','D'];

  const withQuote=yearBooks.filter(b=>b.quote?.trim());
  const randomQuote=withQuote.length?withQuote[Math.floor(Math.random()*withQuote.length)]:null;
  const pomos=stats.pomodoros||0;

  let html=`
  <div class="compendium-hero">
    <div class="compendium-hero-year">${year}</div>
    <div class="compendium-hero-name">${h(currentUser?.name||'')}</div>
    <div class="compendium-hero-sub">Hai letto ${yearBooks.length} ${yearBooks.length===1?'libro':'libri'} quest\'anno</div>
  </div>
  <div class="compendium-stats">
    <div class="compendium-stat"><div class="compendium-stat-val">${yearBooks.length}</div><div class="compendium-stat-lbl">Libri letti</div></div>
    <div class="compendium-stat"><div class="compendium-stat-val">${totalPages.toLocaleString('it')}</div><div class="compendium-stat-lbl">Pagine</div></div>
    <div class="compendium-stat"><div class="compendium-stat-val">${avg}★</div><div class="compendium-stat-lbl">Media voti</div></div>
    <div class="compendium-stat"><div class="compendium-stat-val">${pomos}</div><div class="compendium-stat-lbl">Pomodoro</div></div>
  </div>`;

  if(bookOfYear){html+=`<div class="compendium-book-of-year">
    <div class="compendium-book-cover">
      ${bookOfYear.cover?`<img src="${h(bookOfYear.cover)}" alt="" onerror="this.style.display='none'">`:`<div class="compendium-book-no-cover">📚</div>`}
    </div>
    <div>
      <div class="compendium-book-label">📖 Libro dell\'anno</div>
      <div class="compendium-book-title">${h(bookOfYear.title)}</div>
      <div class="compendium-book-author">${h(bookOfYear.author||'')}</div>
      <div style="color:var(--amber);margin-top:6px;font-size:14px">${'★'.repeat(bookOfYear.rating)}</div>
    </div>
  </div>`;}

  if(topGenre){html+=`<div class="compendium-highlight">
    <div class="compendium-highlight-label">🗺 Genere preferito</div>
    <div class="compendium-highlight-val">${h(topGenre[0])}</div>
    <div class="compendium-highlight-sub">${topGenre[1]} ${topGenre[1]===1?'libro':'libri'}</div>
  </div>`;}

  if(topAuthor&&topAuthor[1]>1){html+=`<div class="compendium-highlight">
    <div class="compendium-highlight-label">✍ Autore più letto</div>
    <div class="compendium-highlight-val">${h(topAuthor[0])}</div>
    <div class="compendium-highlight-sub">${topAuthor[1]} libri</div>
  </div>`;}

  html+=`<div class="compendium-months">
    <div class="compendium-months-label">📅 Libri per mese</div>
    <div class="month-bars">
      ${monthCounts.map((c,i)=>`<div class="month-bar-compendium">
        <div class="month-bar${c>0?' has-books':''}" style="height:${Math.max(3,Math.round(c/maxM*56))}px"></div>
        <div class="month-bar-lbl">${monthNames[i]}</div>
      </div>`).join('')}
    </div>
  </div>`;

  if(randomQuote){html+=`<div class="compendium-quote">
    <div class="compendium-quote-label">💬 Una citazione dell\'anno</div>
    <div class="compendium-quote-text">${h(trunc(randomQuote.quote,200))}</div>
    <div class="compendium-quote-from">— ${h(randomQuote.title)}</div>
  </div>`;}

  html+=`<button class="btn-compendium-export" onclick="exportcompendiumPNG()">📷 Salva come immagine</button>`;
  content.innerHTML=html;
}

async function exportcompendiumPNG(){
  const el=document.getElementById('compendium-content');
  try{
    const canvas=await html2canvas(el,{backgroundColor:'#1c1917',scale:2,useCORS:true,logging:false});
    const link=document.createElement('a');
    const year=document.getElementById('compendium-year-select').value;
    link.download=`marginalia_compendium_${year}.png`;
    link.href=canvas.toDataURL('image/png');
    link.click();
  }catch(e){alert('Errore export: '+e.message);}
}

// ══════════════════════════════════════════════════════════════
// SCOPRI
// ══════════════════════════════════════════════════════════════
function renderScopri(){
  const sec=document.getElementById('scopri-section');
  if(!sec)return;
  let html=`<div class="scopri-intro">Esplora i capolavori della letteratura mondiale. Tocca un libro per aggiungerlo alla tua libreria.</div>`;
  SCOPRI_CATALOG.forEach(cat=>{
    html+=`<div class="scopri-genre-block">
      <div class="scopri-genre-title">${h(cat.genre)}</div>
      <div class="scopri-books-row">
        ${cat.books.map((b,i)=>{
          const coverUrl=b.cover||(b.isbn?`https://covers.openlibrary.org/b/isbn/${h(b.isbn)}-M.jpg`:'');
          return `<div class="scopri-book-card" data-genre="${h(cat.genre)}" data-idx="${i}">
            <div class="scopri-cover">
              ${coverUrl?`<img src="${h(coverUrl)}" alt="" onerror="this.parentNode.innerHTML='<div class=\\'scopri-no-cover\\'>📚</div>'">`:`<div class="scopri-no-cover">📚</div>`}
            </div>
            <div class="scopri-book-title">${h(trunc(b.title,30))}</div>
            <div class="scopri-book-author">${h(trunc(b.author,24))}</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  });
  sec.innerHTML=html;
  sec.querySelectorAll('.scopri-book-card').forEach(card=>{
    card.addEventListener('click',()=>{
      const genre=card.dataset.genre;
      const idx=parseInt(card.dataset.idx);
      const cat=SCOPRI_CATALOG.find(c=>c.genre===genre);
      if(!cat)return;
      const b=cat.books[idx];
      const coverUrl=b.cover||(b.isbn?`https://covers.openlibrary.org/b/isbn/${b.isbn}-M.jpg`:'');
      clearFields();
      document.getElementById('f-title').value=b.title;
      document.getElementById('f-author').value=b.author;
      document.getElementById('f-genre').value=genre;
      document.getElementById('f-isbn').value=b.isbn||'';
      document.getElementById('f-cover').value=coverUrl;
      document.getElementById('f-cover-b64').value='';
      document.getElementById('f-sourceId').value='';
      document.getElementById('f-year').value=b.year||'';
      document.getElementById('f-publisher').value=b.publisher||'';
      document.getElementById('f-pages').value=b.pages||'';
      updateCoverPreview();
      switchTab('manuale');
      setDirty();
    });
  });
}
function debounceSearchBooks(){
  clearTimeout(searchTimer);
  const q=document.getElementById('search-input-books').value.trim();
  const scopri=document.getElementById('scopri-section');
  if(!q){
    document.getElementById('search-results').innerHTML='';
    document.getElementById('search-loading').style.display='none';
    if(scopri){scopri.style.display='block';}
    return;
  }
  if(scopri)scopri.style.display='none';
  searchTimer=setTimeout(()=>searchBooks(q),500);
}

// ══════════════════════════════════════════════════════════════
// STREAK
// ══════════════════════════════════════════════════════════════
function todayStr(){return new Date().toISOString().slice(0,10);}
function updateStreakOnLogin(){}
function incrementStreakOnAction(){
  if(!currentUser)return;
  const stats=getUserStats(currentUser.id);
  const today=todayStr();
  if(stats.lastActiveDay===today)return; // già incrementata oggi
  const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
  const yStr=yesterday.toISOString().slice(0,10);
  stats.streak=stats.lastActiveDay===yStr?(stats.streak||0)+1:1;
  stats.lastActiveDay=today;
  saveUserStats(currentUser.id,stats);
  updateStreakDisplay();
}
function updateStreakDisplay(){
  if(!currentUser)return;
  const streak=getUserStats(currentUser.id).streak||0;
  document.getElementById('streak-display').textContent=streak>0?`🔥 ${streak}`:'';
}

// ══════════════════════════════════════════════════════════════
// INDEXEDDB
// ══════════════════════════════════════════════════════════════
const DB_NAME='libreria-db',DB_VER=3,STORE='books';
let db;
function openDB(){return new Promise((res,rej)=>{const req=indexedDB.open(DB_NAME,DB_VER);req.onupgradeneeded=e=>{const d=e.target.result;if(d.objectStoreNames.contains(STORE))d.deleteObjectStore(STORE);const s=d.createObjectStore(STORE,{keyPath:'_pk'});s.createIndex('userId','userId',{unique:false});};req.onsuccess=e=>{db=e.target.result;res(db);};req.onerror=()=>rej(req.error);});}
function dbPk(uid,bid){return uid+'::'+bid;}
function dbAllForUser(uid){return new Promise((res,rej)=>{const req=db.transaction(STORE,'readonly').objectStore(STORE).index('userId').getAll(uid);req.onsuccess=()=>res(req.result||[]);req.onerror=()=>rej(req.error);});}
function dbPut(b){const rec=Object.assign({},b,{_pk:dbPk(currentUser.id,b.id),userId:currentUser.id});return new Promise((res,rej)=>{const req=db.transaction(STORE,'readwrite').objectStore(STORE).put(rec);req.onsuccess=()=>res();req.onerror=()=>rej(req.error);});}
function dbDel(id){return new Promise((res,rej)=>{const req=db.transaction(STORE,'readwrite').objectStore(STORE).delete(dbPk(currentUser.id,id));req.onsuccess=()=>res();req.onerror=()=>rej(req.error);});}
function dbClear(){return dbAllForUser(currentUser.id).then(bs=>Promise.all(bs.map(b=>new Promise((res,rej)=>{const req=db.transaction(STORE,'readwrite').objectStore(STORE).delete(b._pk);req.onsuccess=()=>res();req.onerror=()=>rej(req.error);}))));}
function dbClearUser(uid){return new Promise((res,rej)=>{const tx=db.transaction(STORE,'readwrite');const req=tx.objectStore(STORE).index('userId').getAll(uid);req.onsuccess=()=>{Promise.all(req.result.map(r=>new Promise((r2,j2)=>{const dr=tx.objectStore(STORE).delete(r._pk);dr.onsuccess=()=>r2();dr.onerror=()=>j2(dr.error);}))).then(res).catch(rej);};req.onerror=()=>rej(req.error);});}

// ══════════════════════════════════════════════════════════════
// ROUTING
// ══════════════════════════════════════════════════════════════
function showView(n){
  if(isDirty&&document.getElementById('view-form').classList.contains('active')){
    pendingNav=n;showUnsavedDialog();return;
  }
  _doShowView(n);
}
function _doShowView(n){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+n).classList.add('active');
  document.getElementById('main').scrollTop=0;
  if(n==='shelf')renderShelf();
  if(n==='profile')renderProfilePage();
  if(n==='form'&&currentTab==='cerca'){
    const scopri=document.getElementById('scopri-section');
    const q=document.getElementById('search-input-books').value.trim();
    if(!q&&scopri){scopri.style.display='block';renderScopri();}
  }
}
function setDirty(){isDirty=true;}
function clearDirty(){isDirty=false;}
function showUnsavedDialog(){document.getElementById('unsaved-dialog').classList.add('active');}
function closeUnsavedDialog(){document.getElementById('unsaved-dialog').classList.remove('active');}
function unsavedSave(){closeUnsavedDialog();saveBook();}
function unsavedDiscard(){clearDirty();closeUnsavedDialog();if(pendingNav){_doShowView(pendingNav);pendingNav=null;}}
function unsavedCancel(){closeUnsavedDialog();pendingNav=null;}

// ══════════════════════════════════════════════════════════════
// SHELF
// ══════════════════════════════════════════════════════════════
function renderShelf(){
  const q=(document.getElementById('search-input').value||'').toLowerCase();
  const fi=document.getElementById('filter-sel').value;
  const so=document.getElementById('sort-sel').value;
  let list=books.filter(b=>{
    const mq=!q||[b.title,b.author,b.genre].join(' ').toLowerCase().includes(q);
    return mq&&(fi==='tutti'||b.status===fi);
  }).sort((a,b)=>{
    if(so==='title')return(a.title||'').localeCompare(b.title||'');
    if(so==='author')return(a.author||'').localeCompare(b.author||'');
    if(so==='rating')return(b.rating||0)-(a.rating||0);
    if(so==='year')return(b.year||'0').localeCompare(a.year||'0');
    return(b.id||'').localeCompare(a.id||'');
  });
  const grid=document.getElementById('book-grid');
  const empty=document.getElementById('empty-state');
  if(!list.length){
    grid.innerHTML=books.length&&q?'<p style="color:var(--text3);font-size:14px;padding:16px 0">Nessun risultato trovato.</p>':'';
    empty.style.display=books.length?'none':'block';
  }else{
    empty.style.display='none';
    grid.innerHTML=list.map(b=>{
      const pages=parseInt(b.pages)||0;const cur=parseInt(b.currentPage)||0;
      const pct=pages>0?Math.min(100,Math.round(cur/pages*100)):0;
      const showBar=pages>0&&b.status==='in-corso';
      return `<div class="book-card" data-bid="${h(b.id)}">
        <div class="book-cover">
          ${b.cover?`<img src="${h(b.cover)}" alt="" loading="lazy" onerror="this.style.display='none'">`:
          `<div class="no-cover"><div class="no-cover-title">${h(b.title)}</div>${b.author?`<div class="no-cover-author">${h(b.author)}</div>`:''}</div>`}
          <div class="cover-spine"></div>
          ${b.rating?`<div class="rating-pip">★ ${h(String(b.rating))}</div>`:''}
        </div>
        ${showBar?`<div class="card-progress-bar"><div class="card-progress-fill" style="width:${pct}%"></div></div>`:''}
        <div class="card-title">${h(trunc(b.title,32))}</div>
        ${b.author?`<div class="card-author">${h(trunc(b.author,28))}</div>`:''}
        <span class="badge ${STATUS[b.status]?.cls||'badge-letto'}">${STATUS[b.status]?.label||''}</span>
      </div>`;
    }).join('');
    grid.querySelectorAll('.book-card').forEach(card=>{
      card.addEventListener('click',()=>openDetail(card.dataset.bid));
    });
  }
  updateStats();
}

function updateStats(){
  const rated=books.filter(b=>b.rating>0);
  const avg=rated.length?(rated.reduce((s,b)=>s+b.rating,0)/rated.length).toFixed(1):'—';
  const pages=books.reduce((s,b)=>s+(parseInt(b.pages)||0),0);
  document.getElementById('s-total').textContent=books.length+(books.length===1?' libro':' libri');
  document.getElementById('s-avg').textContent=avg+'★';
  document.getElementById('s-pages').textContent=pages.toLocaleString('it')+'p.';
  document.getElementById('btn-push').textContent=`⬆ Carica su Firebase (${books.length})`;
}

// ══════════════════════════════════════════════════════════════
// DETAIL
// ══════════════════════════════════════════════════════════════
function openDetail(id){
  const b=books.find(x=>x.id===id);if(!b)return;currentBook=b;
  const frame=document.getElementById('detail-cover-frame');
  frame.querySelector('.detail-cover-empty')?.remove();frame.querySelector('img')?.remove();
  if(b.cover){const img=document.createElement('img');img.src=b.cover;img.alt='';img.onerror=()=>img.remove();frame.insertBefore(img,frame.querySelector('.cover-spine'));}
  else{const ph=document.createElement('div');ph.className='detail-cover-empty';ph.textContent='📚';frame.insertBefore(ph,frame.querySelector('.cover-spine'));}
  document.getElementById('detail-title').textContent=b.title;
  document.getElementById('detail-author').textContent=b.author||'';
  document.getElementById('detail-author').style.display=b.author?'block':'none';
  document.getElementById('detail-badges').innerHTML=`<span class="badge ${STATUS[b.status]?.cls||'badge-letto'}">${STATUS[b.status]?.label||''}</span>${b.year?`<span style="font-size:12px;color:var(--text3)">${h(b.year)}</span>`:''}${b.pages?`<span style="font-size:12px;color:var(--text3)">${h(String(b.pages))} pag.</span>`:''}`;
  document.getElementById('detail-stars').innerHTML=b.rating?[1,2,3,4,5].map(s=>`<span class="star${b.rating>=s?' on':''}">★</span>`).join(''):'';
  const meta=[['Editore',b.publisher],['Genere',b.genre],['ISBN',b.isbn],['Letto il',b.dateRead?new Date(b.dateRead).toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'}):null]].filter(([,v])=>v);
  document.getElementById('detail-meta-grid').innerHTML=meta.map(([k,v])=>`<span class="meta-key">${h(k)}</span><span class="meta-val">${h(v)}</span>`).join('');
  const setTxt=(sId,eId,val)=>{const s=document.getElementById(sId);const e=document.getElementById(eId);s.style.display=val?'block':'none';if(e)e.textContent=val||'';};
  setTxt('sec-quote','detail-quote',b.quote);
  setTxt('sec-review','detail-review',b.review);
  setTxt('sec-desc','detail-desc',b.description);
  renderDetailChapters(b);renderDetailProgress(b);
  document.getElementById('btn-edit').onclick=()=>openEditForm(b);
  document.getElementById('btn-del').onclick=()=>deleteBook(b.id);
  _doShowView('detail');
}

function renderDetailProgress(b){
  const pages=parseInt(b.pages)||0;
  const cur=Math.min(parseInt(b.currentPage)||0,pages||Infinity);
  const pct=pages>0?Math.min(100,Math.round(cur/pages*100)):0;
  document.getElementById('detail-prog-fill').style.width=pct+'%';
  document.getElementById('detail-prog-pct').textContent=pct+'%';
  document.getElementById('detail-current-page').value=cur||'';
  document.getElementById('detail-current-page').max=pages||'';
  document.getElementById('detail-total-pages-lbl').textContent=pages>0?`di ${pages}`:'di —';
}

async function updateProgressInput(){
  if(!currentBook)return;
  const pages=parseInt(currentBook.pages)||0;
  let val=parseInt(document.getElementById('detail-current-page').value)||0;
  if(pages>0)val=Math.min(val,pages);
  val=Math.max(0,val);
  document.getElementById('detail-current-page').value=val||'';
  const b=books.find(x=>x.id===currentBook.id);if(!b)return;
  b.currentPage=val;incrementStreakOnAction();renderDetailProgress(b);
  await dbPut(b);books=await dbAllForUser(currentUser.id);
  currentBook=books.find(x=>x.id===b.id);
}

// ── Chapters ─────────────────────────────────────────────────
function renderDetailChapters(b){
  const sec=document.getElementById('sec-chapters');
  const list=b.chapters||[];
  if(!list.length){sec.style.display='none';return;}
  sec.style.display='block';
  document.getElementById('detail-chapters-list').innerHTML=list.map((ch,i)=>`
    <div class="chapter-item">
      <div class="chapter-header">
        <span class="chapter-num">Cap. ${i+1}</span>
        ${ch.name?`<span class="chapter-title-text">${h(ch.name)}</span>`:''}
        <button class="chapter-edit-btn" data-cidx="${i}">✏</button>
      </div>
      ${ch.notes?`<div class="chapter-notes-text">${h(ch.notes)}</div>`:`<div style="font-size:12px;color:var(--text3);font-style:italic">Nessun appunto.</div>`}
    </div>`).join('');
  document.querySelectorAll('.chapter-edit-btn').forEach(btn=>{
    btn.addEventListener('click',()=>openChapterModal(parseInt(btn.dataset.cidx)));
  });
}

let modalChapterIdx=null;
function openChapterModal(idx){
  if(!currentBook)return;modalChapterIdx=idx;
  const ch=(currentBook.chapters||[])[idx]||{};
  document.getElementById('chapter-modal-title').textContent=`Capitolo ${idx+1}`;
  document.getElementById('chapter-modal-name').value=ch.name||'';
  document.getElementById('chapter-modal-notes').value=ch.notes||'';
  document.getElementById('chapter-modal').style.display='flex';
}
function closeChapterModal(){document.getElementById('chapter-modal').style.display='none';}
async function saveChapterModal(){
  if(!currentBook||modalChapterIdx===null)return;
  const b=books.find(x=>x.id===currentBook.id);if(!b)return;
  if(!b.chapters)b.chapters=[];
  b.chapters[modalChapterIdx]={
    name:document.getElementById('chapter-modal-name').value.trim().slice(0,200),
    notes:document.getElementById('chapter-modal-notes').value.trim().slice(0,2000),
  };
  await dbPut(b);books=await dbAllForUser(currentUser.id);
  currentBook=books.find(x=>x.id===b.id);renderDetailChapters(currentBook);closeChapterModal();
}

// ══════════════════════════════════════════════════════════════
// SHARE
// ══════════════════════════════════════════════════════════════
function openShareMenu(){if(!currentBook)return;document.getElementById('share-modal').style.display='flex';}
function closeShareModal(){document.getElementById('share-modal').style.display='none';}
async function shareAs(format){
  closeShareModal();
  const b=currentBook;if(!b)return;
  const cover=document.getElementById('sc-cover');
  cover.innerHTML=b.cover?`<img src="${h(b.cover)}" crossorigin="anonymous">`:`<div class="share-card-no-cover">📚</div>`;
  document.getElementById('sc-title').textContent=b.title;
  document.getElementById('sc-author').textContent=b.author||'';
  document.getElementById('sc-stars').textContent=b.rating?'★'.repeat(b.rating)+'☆'.repeat(5-b.rating):'';
  const badgeEl=document.getElementById('sc-badge');
  const st=STATUS[b.status]||STATUS['letto'];
  badgeEl.textContent=st.label;badgeEl.className='share-card-badge '+st.cls;
  const metaParts=[b.year,b.publisher,b.pages?b.pages+' pag.':null,b.genre].filter(Boolean);
  document.getElementById('sc-meta').textContent=metaParts.join(' · ');
  document.getElementById('sc-review').textContent=b.review?`"${trunc(b.review,120)}"`:b.description?trunc(b.description,120):'';
  await new Promise(r=>setTimeout(r,200));
  try{
    const canvas=await html2canvas(document.getElementById('share-card'),{backgroundColor:'#1c1917',scale:2,useCORS:true,logging:false});
    if(format==='png'){
      const link=document.createElement('a');
      link.download=`${b.title.replace(/[^a-z0-9]/gi,'_').toLowerCase()}.png`;
      link.href=canvas.toDataURL('image/png');link.click();
    }else{
      const{jsPDF}=window.jspdf;
      const pdf=new jsPDF({orientation:'landscape',unit:'px',format:[canvas.width/2,canvas.height/2]});
      pdf.addImage(canvas.toDataURL('image/png'),'PNG',0,0,canvas.width/2,canvas.height/2);
      pdf.save(`${b.title.replace(/[^a-z0-9]/gi,'_').toLowerCase()}.pdf`);
    }
  }catch(e){alert('Errore: '+e.message);}
}

// ══════════════════════════════════════════════════════════════
// POMODORO
// ══════════════════════════════════════════════════════════════
const CIRCUM=2*Math.PI*88;
let pomoInterval=null,pomoSecs=0,pomoTotalSecs=0,pomoRunning=false;
let pomoIsBreak=false,pomoDone=0,pomoBookId=null;

function openPomodoro(){
  if(!currentBook)return;
  pomoBookId=currentBook.id;pomoIsBreak=false;pomoDone=0;
  document.getElementById('pomo-sessions-count').textContent='0';
  document.getElementById('pomo-end-form').style.display='none';
  document.getElementById('pomo-config').style.display='flex';
  document.getElementById('pomo-book-title').textContent=currentBook.title;
  resetPomoTimer();document.getElementById('pomodoro-screen').classList.add('active');
}
function resetPomoTimer(){
  const mins=pomoIsBreak?(parseInt(document.getElementById('pomo-break-min').value)||5):(parseInt(document.getElementById('pomo-work-min').value)||25);
  pomoSecs=mins*60;pomoTotalSecs=pomoSecs;pomoRunning=false;
  document.getElementById('pomo-play-btn').textContent='▶';
  const lbl=document.getElementById('pomo-phase-label');
  lbl.textContent=pomoIsBreak?'PAUSA':'CONCENTRAZIONE';
  lbl.className='pomo-phase-label'+(pomoIsBreak?' break-phase':'');
  document.getElementById('pomo-ring').className='pomo-ring-prog'+(pomoIsBreak?' break-phase':'');
  updatePomoDisplay();updatePomoRing();
}
function togglePomodoro(){
  if(pomoRunning){clearInterval(pomoInterval);pomoRunning=false;document.getElementById('pomo-play-btn').textContent='▶';}
  else{
    document.getElementById('pomo-config').style.display='none';
    pomoRunning=true;document.getElementById('pomo-play-btn').textContent='⏸';
    pomoInterval=setInterval(()=>{pomoSecs--;updatePomoDisplay();updatePomoRing();if(pomoSecs<=0){clearInterval(pomoInterval);pomoRunning=false;onPomoEnd();}},1000);
  }
}
function requestClosePomodoro(){
  if(pomoRunning){document.getElementById('pomo-confirm-dialog').classList.add('active');}
  else{closePomodoro();}
}
function closePomoConfirmDialog(){document.getElementById('pomo-confirm-dialog').classList.remove('active');}
function confirmClosePomodoro(){closePomoConfirmDialog();closePomodoro();}
function onPomoEnd(){
  if(!pomoIsBreak){
    pomoDone++;document.getElementById('pomo-sessions-count').textContent=pomoDone;
    recordPomodoroSession();
    const b=books.find(x=>x.id===pomoBookId);
    document.getElementById('pomo-page-input').value=b?.currentPage||'';
    document.getElementById('pomo-end-form').style.display='block';
  }else{pomoIsBreak=false;resetPomoTimer();togglePomodoro();}
}
async function savePomodoroProgress(){
  const b=books.find(x=>x.id===pomoBookId);
  const pages=parseInt(b?.pages)||0;
  let val=parseInt(document.getElementById('pomo-page-input').value);
  if(!isNaN(val)&&val>=0&&pomoBookId){
    if(pages>0)val=Math.min(val,pages);
    if(b){b.currentPage=val;await dbPut(b);books=await dbAllForUser(currentUser.id);
      if(currentBook?.id===pomoBookId){currentBook=books.find(x=>x.id===pomoBookId);renderDetailProgress(currentBook);}}
  }
  document.getElementById('pomo-end-form').style.display='none';
  pomoIsBreak=true;resetPomoTimer();togglePomodoro();
}
function skipPomodoroProgress(){document.getElementById('pomo-end-form').style.display='none';pomoIsBreak=true;resetPomoTimer();togglePomodoro();}
function stopPomodoro(){clearInterval(pomoInterval);pomoRunning=false;}
function closePomodoro(){stopPomodoro();document.getElementById('pomodoro-screen').classList.remove('active');document.getElementById('pomo-config').style.display='flex';}
function updatePomoDisplay(){const m=String(Math.floor(pomoSecs/60)).padStart(2,'0');const s=String(pomoSecs%60).padStart(2,'0');document.getElementById('pomo-time').textContent=`${m}:${s}`;}
function updatePomoRing(){const offset=CIRCUM*(1-(pomoTotalSecs>0?pomoSecs/pomoTotalSecs:1));document.getElementById('pomo-ring').style.strokeDashoffset=offset;}
function recordPomodoroSession(){
  if(!currentUser)return;
  const stats=getUserStats(currentUser.id);
  stats.pomodoros=(stats.pomodoros||0)+1;
  incrementStreakOnAction()
  if(new Date().getHours()>=22)stats.lateSession=true;
  saveUserStats(currentUser.id,stats);
  checkAndAwardAchievements();
}

// ══════════════════════════════════════════════════════════════
// ACHIEVEMENTS
// ══════════════════════════════════════════════════════════════
function buildAchStats(){
  if(!currentUser)return{};
  const stats=getUserStats(currentUser.id);
  const booksRead=books.filter(b=>b.status==='letto').length;
  const genres=new Set(books.filter(b=>b.genre).map(b=>b.genre.split(',')[0].trim().toLowerCase())).size;
  const reviews=books.filter(b=>b.review?.trim()).length;
  let fastRead=false;
  books.forEach(b=>{if(b.status==='letto'&&b.dateRead&&b.id){const added=parseInt(b.id),read=new Date(b.dateRead).getTime();if(read>=added&&read-added<7*24*3600*1000)fastRead=true;}});
  return{total:books.length,read:booksRead,genres,reviews,streak:stats.streak||0,pomodoros:stats.pomodoros||0,lateSession:stats.lateSession||false,fastRead};
}
function checkAndAwardAchievements(){
  if(!currentUser)return;
  const stats=getUserStats(currentUser.id);
  const unlocked=stats.unlockedAchievements||[];
  const aStats=buildAchStats();
  const newOnes=[];
  ACHIEVEMENTS.forEach(a=>{if(!unlocked.includes(a.id)&&a.check(aStats)){unlocked.push(a.id);newOnes.push(a);}});
  if(newOnes.length){stats.unlockedAchievements=unlocked;saveUserStats(currentUser.id,stats);newOnes.forEach((a,i)=>setTimeout(()=>showAchToast(a),i*2000));}
}
let toastTimer=null;
function showAchToast(a){
  const el=document.getElementById('ach-toast');
  el.innerHTML=`<div class="ach-toast-inner"><div class="ach-toast-emoji">${a.emoji}</div><div class="ach-toast-text"><strong>${h(a.name)}</strong><span>${h(a.desc)}</span></div></div>`;
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>{el.innerHTML='';},4000);
}

// ══════════════════════════════════════════════════════════════
// FORM
// ══════════════════════════════════════════════════════════════
function buildStatusBtns(){document.getElementById('status-row').innerHTML=S_ORDER.map(k=>`<button class="s-btn" data-s="${k}" style="border-color:${S_COLOR[k]}">${STATUS[k].label}</button>`).join('');document.querySelectorAll('.s-btn').forEach(b=>b.addEventListener('click',()=>setStatus(b.dataset.s)));}
function setStatus(s){formStatus=s;setDirty();S_ORDER.forEach(k=>{const b=document.querySelector(`.s-btn[data-s="${k}"]`);if(!b)return;if(k===s){b.style.background=S_COLOR[k];b.style.color='#1c1917';b.style.borderColor=S_COLOR[k];}else{b.style.background='transparent';b.style.color='var(--text3)';b.style.borderColor='var(--border)';}});}
function buildStars(){document.getElementById('star-row').innerHTML=[1,2,3,4,5].map(s=>`<span class="s-star${formRating>=s?' on':''}" data-v="${s}">★</span>`).join('');document.querySelectorAll('.s-star').forEach(s=>s.addEventListener('click',()=>setStar(parseInt(s.dataset.v))));}
function setStar(n){formRating=n;setDirty();[1,2,3,4,5].forEach(s=>{const e=document.querySelector(`.s-star[data-v="${s}"]`);if(e)e.className='s-star'+(n>=s?' on':'');});}
function switchTab(t){
  currentTab=t;
  document.getElementById('tab-content-cerca').style.display=t==='cerca'?'block':'none';
  document.getElementById('tab-content-manuale').style.display=t==='manuale'?'block':'none';
  document.getElementById('tab-cerca').classList.toggle('active',t==='cerca');
  document.getElementById('tab-manuale').classList.toggle('active',t==='manuale');
  if(t==='cerca'){
    const q=document.getElementById('search-input-books').value.trim();
    const scopri=document.getElementById('scopri-section');
    if(!q&&scopri){scopri.style.display='block';if(!scopri.innerHTML.trim())renderScopri();}
    else if(scopri)scopri.style.display='none';
  }
}

function openAddForm(){
  formEditId=null;formRating=0;formStatus='letto';clearDirty();
  document.getElementById('form-title').textContent='Aggiungi libro';
  clearFields();buildStatusBtns();setStatus('letto');buildStars();switchTab('cerca');
  document.getElementById('search-input-books').value='';
  document.getElementById('search-results').innerHTML='';
  document.getElementById('form-back').onclick=()=>showView('shelf');
  document.getElementById('form-cancel').onclick=()=>showView('shelf');
  document.getElementById('form-back-label').textContent='Annulla';
  _doShowView('form');
  renderScopri();
}
function openEditForm(b){
  formEditId=b.id;formRating=b.rating||0;formStatus=b.status||'letto';clearDirty();
  document.getElementById('form-title').textContent='Modifica libro';
  fillFields(b);buildStatusBtns();setStatus(formStatus);buildStars();switchTab('manuale');
  document.getElementById('form-back').onclick=()=>showView('detail');
  document.getElementById('form-cancel').onclick=()=>showView('detail');
  document.getElementById('form-back-label').textContent='Annulla';
  _doShowView('form');
}
function clearFields(){
  ['title','author','year','publisher','pages','genre','isbn','cover','dateread','review','quote','description'].forEach(k=>{const e=document.getElementById('f-'+k);if(e)e.value='';});
  document.getElementById('f-id').value='';document.getElementById('f-sourceId').value='';
  document.getElementById('cover-thumb').innerHTML='📚';
  document.getElementById('f-chapter-count').value=0;document.getElementById('chapters-list-form').innerHTML='';
  document.getElementById('f-cover-b64').value='';
}
function fillFields(b){
  const f=(id,v)=>{const e=document.getElementById(id);if(e)e.value=v||'';};
  f('f-title',b.title);f('f-author',b.author);f('f-year',b.year);f('f-publisher',b.publisher);
  f('f-pages',b.pages);f('f-genre',b.genre);f('f-isbn',b.isbn);
  f('f-dateread',b.dateRead);f('f-review',b.review);f('f-quote',b.quote);f('f-description',b.description);
  f('f-id',b.id);f('f-sourceId',b.sourceId);
  // gestione copertina: base64 o URL
  if(b.cover&&b.cover.startsWith('data:')){
    document.getElementById('f-cover').value='';
    document.getElementById('f-cover-b64').value=b.cover;
    document.getElementById('cover-thumb').innerHTML=`<img src="${b.cover}"><div class="cover-spine"></div>`;
  }else{
    f('f-cover',b.cover);
    document.getElementById('f-cover-b64').value='';
    updateCoverPreview();
  }
  const chapters=b.chapters||[];
  document.getElementById('f-chapter-count').value=chapters.length;
  rebuildChaptersForm(chapters);
}
function updateCoverPreview(){
  const url=document.getElementById('f-cover').value.trim();
  const box=document.getElementById('cover-thumb');
  if(url){box.innerHTML=`<img src="${h(url)}" onerror="this.parentNode.innerHTML='📚'"><div class="cover-spine"></div>`;}
  else{box.innerHTML='📚';}
  setDirty();
}
function loadCoverFromFile(event){
  const file=event.target.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    const img=new Image();
    img.onload=()=>{
      const MAX=400;
      const ratio=Math.min(MAX/img.width,MAX/img.height,1);
      const w=Math.round(img.width*ratio);
      const h=Math.round(img.height*ratio);
      const canvas=document.createElement('canvas');
      canvas.width=w;canvas.height=h;
      canvas.getContext('2d').drawImage(img,0,0,w,h);
      const b64=canvas.toDataURL('image/jpeg',0.8);
      document.getElementById('f-cover').value='';
      document.getElementById('f-cover-b64').value=b64;
      document.getElementById('cover-thumb').innerHTML=`<img src="${b64}"><div class="cover-spine"></div>`;
      setDirty();
    };
    img.src=e.target.result;
  };
  reader.readAsDataURL(file);
  event.target.value='';
}
function rebuildChaptersForm(existingChapters){
  const n=parseInt(document.getElementById('f-chapter-count').value)||0;
  const container=document.getElementById('chapters-list-form');
  const prev=existingChapters||readChaptersForm();
  if(n<=0){container.innerHTML='';return;}
  container.innerHTML=Array.from({length:n},(_,i)=>{const ch=prev[i]||{};return `<div class="chapter-form-item"><div class="chapter-form-num">Capitolo ${i+1}</div><input type="text" id="fc-name-${i}" placeholder="Titolo (opzionale)" value="${h(ch.name||'')}" oninput="setDirty()"><textarea id="fc-notes-${i}" placeholder="Riassunto, appunti…" oninput="setDirty()">${h(ch.notes||'')}</textarea></div>`;}).join('');
}
function readChaptersForm(){
  const n=parseInt(document.getElementById('f-chapter-count').value)||0;
  return Array.from({length:n},(_,i)=>({
    name:(document.getElementById('fc-name-'+i)?.value||'').trim().slice(0,200),
    notes:(document.getElementById('fc-notes-'+i)?.value||'').trim().slice(0,2000),
  }));
}

async function saveBook(){
  const title=document.getElementById('f-title').value.trim();
  if(!title){alert('Inserisci almeno il titolo.');return;}
  const id=formEditId||Date.now().toString();
  const existing=formEditId?books.find(x=>x.id===formEditId):null;
  const pages=document.getElementById('f-pages').value.trim();
  const newStatus=formStatus;
  let currentPage=existing?.currentPage||0;
  if(newStatus==='letto'&&pages)currentPage=parseInt(pages)||currentPage;
  if(pages)currentPage=Math.min(currentPage,parseInt(pages)||currentPage);
  const coverVal = document.getElementById('f-cover-b64').value || document.getElementById('f-cover').value.trim();
  const book=validateBook({
    id,title,
    author:document.getElementById('f-author').value.trim(),
    year:document.getElementById('f-year').value.trim(),
    publisher:document.getElementById('f-publisher').value.trim(),
    pages,
    genre:document.getElementById('f-genre').value.trim(),
    isbn:document.getElementById('f-isbn').value.trim(),
    cover: document.getElementById('f-cover-b64').value || document.getElementById('f-cover').value.trim(),
    dateRead:document.getElementById('f-dateread').value,
    review:document.getElementById('f-review').value.trim(),
    quote:document.getElementById('f-quote').value.trim(),
    description:document.getElementById('f-description').value.trim(),
    rating:formRating,status:newStatus,
    sourceId:document.getElementById('f-sourceId').value,
    chapters:readChaptersForm(),currentPage,
  });
  if(!book){alert('Dati non validi.');return;}
  clearDirty();
  await dbPut(book);books=await dbAllForUser(currentUser.id);
  checkAndAwardAchievements();openDetail(book.id);
}

async function deleteBook(id){
  if(!confirm('Eliminare questo libro?'))return;
  await dbDel(id);books=await dbAllForUser(currentUser.id);showView('shelf');
}

// ── Open Library Search ───────────────────────────────────────
async function searchBooks(q){
  document.getElementById('search-loading').style.display='flex';
  document.getElementById('search-results').innerHTML='';
  try{
    const r=await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=10&fields=key,title,author_name,first_publish_year,publisher,number_of_pages_median,subject,isbn,cover_i`);
    if(!r.ok)throw new Error();
    const d=await r.json();
    document.getElementById('search-loading').style.display='none';
    const items=(d.docs||[]).slice(0,8).map(doc=>{
      const isbn=(doc.isbn||[])[0]||'';
      let cover='';
      if(isbn)cover=`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
      else if(doc.cover_i)cover=`https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
      return{sourceId:doc.key||'',title:doc.title||'',author:(doc.author_name||[]).join(', '),year:String(doc.first_publish_year||''),publisher:(doc.publisher||[])[0]||'',pages:doc.number_of_pages_median||'',genre:(doc.subject||[]).slice(0,3).join(', '),description:'',cover,isbn:(doc.isbn||[]).find(i=>i.length===13)||isbn};
    });
    renderSearchResults(items);
  }catch{
    document.getElementById('search-loading').style.display='none';
    document.getElementById('search-results').innerHTML='<p style="color:var(--text3);font-size:13px">⚠ Controlla la connessione oppure usa <strong style="color:var(--text2)">Inserimento manuale</strong>.</p>';
  }
}
function renderSearchResults(items){
  const el=document.getElementById('search-results');
  if(!items.length){el.innerHTML='<p style="color:var(--text3);font-size:13px">Nessun risultato trovato.</p>';return;}
  el.innerHTML=items.map((b,i)=>`<div class="gitem" data-gi="${i}">
    <div class="gthumb">${b.cover?`<img src="${h(b.cover)}" alt="" onerror="this.parentNode.innerHTML='📖'">`:'📖'}</div>
    <div><div class="gtitle">${h(b.title)}</div><div class="gauthor">${h(b.author)}</div><div class="gmeta">${h([b.year,b.publisher].filter(Boolean).join(' · '))}</div></div>
  </div>`).join('');
  el._data=items;
  el.querySelectorAll('.gitem').forEach(item=>{
    item.addEventListener('click',()=>selectSearchResult(parseInt(item.dataset.gi)));
  });
}
function selectSearchResult(i){
  const items=document.getElementById('search-results')._data;
  if(!items?.[i])return;
  const b=items[i];formEditId=null;
  ['title','author','year','publisher','pages','genre','isbn','cover','description'].forEach(k=>{const el=document.getElementById('f-'+k);if(el)el.value=b[k]||'';});
  document.getElementById('f-sourceId').value=b.sourceId||'';
  updateCoverPreview();switchTab('manuale');setDirty();
}

// ── Export / Import ───────────────────────────────────────────
function exportData(){
  if(!currentUser)return;
  const blob=new Blob([JSON.stringify({user:currentUser.name,exportedAt:new Date().toISOString(),books,stats:getUserStats(currentUser.id)},null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download=`marginalia_${currentUser.name.replace(/[^a-z0-9]/gi,'_').toLowerCase()}_${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(a.href);
  setSyncStatus('✓ File esportato correttamente.');
}
function importData(event){
  const file=event.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=async e=>{
    try{
      const raw=JSON.parse(e.target.result);
      let rawList=[];
      if(Array.isArray(raw))rawList=raw;
      else if(raw.books&&Array.isArray(raw.books))rawList=raw.books;
      else{setSyncStatus('✗ Formato non riconosciuto.');return;}
      const list=rawList.map(validateBook).filter(Boolean);
      if(!list.length){setSyncStatus('✗ Nessun libro valido nel file.');return;}
      if(!confirm(`Importare ${list.length} libri? I dati esistenti verranno sostituiti.`))return;
      await dbClear();
      for(const b of list)await dbPut(b);
      if(raw.stats&&typeof raw.stats==='object'){
        const s=raw.stats;
        const safeStats={
          streak:Math.max(0,parseInt(s.streak)||0),
          lastActiveDay:String(s.lastActiveDay||'').slice(0,10),
          pomodoros:Math.max(0,parseInt(s.pomodoros)||0),
          lateSession:!!s.lateSession,
          unlockedAchievements:Array.isArray(s.unlockedAchievements)?s.unlockedAchievements.filter(x=>typeof x==='string').slice(0,50):[],
        };
        saveUserStats(currentUser.id,safeStats);
      }
      books=await dbAllForUser(currentUser.id);
      checkAndAwardAchievements();
      renderShelf();setSyncStatus(`✓ ${books.length} libri importati.`);
    }catch{setSyncStatus('✗ Errore nella lettura del file.');}
    event.target.value='';
  };
  reader.readAsText(file);
}

// ── Firebase ──────────────────────────────────────────────────
function saveFirebaseUrl(){const url=document.getElementById('firebase-url-input').value.trim().replace(/\/$/,'');firebaseUrl=url;localStorage.setItem('firebase-url-'+currentUser.id,url);const el=document.getElementById('fb-saved');el.style.display='block';el.textContent='✓ URL configurato: '+url;}
async function syncPush(){if(!firebaseUrl){setSyncStatus('⚠ Configura prima l\'URL Firebase.');return;}setSyncStatus('<span class="spinner"></span> Caricamento…');try{const p={};books.forEach(b=>{p[b.id]=b;});const r=await fetch(`${firebaseUrl}/users/${currentUser.id}/books.json`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)});if(r.ok)setSyncStatus(`✓ ${books.length} libri caricati.`);else{const t=await r.text().catch(()=>'');setSyncStatus(`✗ Errore HTTP ${r.status}: ${t.slice(0,100)}`);}}catch(e){setSyncStatus('✗ Errore: '+e.message);}}
async function syncPull(){if(!firebaseUrl){setSyncStatus('⚠ Configura prima l\'URL Firebase.');return;}setSyncStatus('<span class="spinner"></span> Download…');try{const r=await fetch(`${firebaseUrl}/users/${currentUser.id}/books.json`);if(!r.ok){const t=await r.text().catch(()=>'');setSyncStatus(`✗ HTTP ${r.status}: ${t.slice(0,100)}`);return;}const data=await r.json();if(!data){setSyncStatus('⚠ Nessun dato su Firebase.');return;}const rawList=(Array.isArray(data)?data:Object.values(data)).filter(Boolean);const list=rawList.map(validateBook).filter(Boolean);if(!list.length){setSyncStatus('⚠ Nessun libro valido.');return;}await dbClear();for(const b of list)await dbPut(b);books=await dbAllForUser(currentUser.id);checkAndAwardAchievements();renderShelf();setSyncStatus(`✓ ${books.length} libri scaricati.`);}catch(e){setSyncStatus('✗ Errore: '+e.message);}}
function setSyncStatus(html){document.getElementById('sync-status').innerHTML=html;}

// ── PWA ───────────────────────────────────────────────────────
let deferredPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;document.getElementById('install-banner').style.display='flex';});
document.getElementById('install-btn').onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();const{outcome}=await deferredPrompt.userChoice;if(outcome==='accepted')document.getElementById('install-banner').style.display='none';};
document.getElementById('dismiss-banner').onclick=()=>document.getElementById('install-banner').style.display='none';
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});

// ── Init ──────────────────────────────────────────────────────
(async()=>{
  document.getElementById('search-loading').style.display='none';
  try{await openDB();}catch(e){console.warn('openDB:',e);}
  renderUserScreen();
})();
