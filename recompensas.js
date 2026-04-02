/* ====================================================
   LA CIUDAD DE LOS NIÑOS — GAME ENGINE v2.0
   45 Zonas · DOFUS-style · Mobile-First
   ==================================================== */

// ===== FIREBASE =====
const firebaseConfig = {
  apiKey: "AIzaSyDG6gIdKgL0a_C7fAIQ6SCm5qMCcO-0d3w",
  authDomain: "caminos-de-convivencia.firebaseapp.com",
  projectId: "caminos-de-convivencia",
  storageBucket: "caminos-de-convivencia.firebasestorage.app",
  messagingSenderId: "590366039762",
  appId: "1:590366039762:web:a1f2c222cf205c4107d70b"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ===== CONSTANTS =====
const TILE_W = 64;
const TILE_H = 32;
const CHAR_SPEED = 4;
const SPAWN_ZONE = 45;
const IS_MAESTRO = new URLSearchParams(window.location.search).get('maestro') === '1';

// ===== CLASSES (Rich Role Data) =====
const CLASSES = [
  {id:"eco_maker",name:"Eco Maker",icon:"🛠️",color:"#4CAF50",skill:"Construir y Crear",
    subtitle:"Constructor sostenible de la ciudad",
    desc:"Transforma el entorno mediante acciones responsables que cuidan y restauran el planeta.",
    hat:"helmet",matIcon:"construction",
    bg:"assets/roles/eco_maker_bg.png",charImg:"assets/roles/eco_maker_char.png",
    skills:[
      {icon:"recycling",name:"Reciclaje",desc:"Gestiona residuos y los convierte en recursos"},
      {icon:"park",name:"Reforestación",desc:"Recupera zonas naturales del campus"},
      {icon:"bolt",name:"Energía Sostenible",desc:"Optimiza el uso de recursos energéticos"},
      {icon:"eco",name:"Conciencia Ambiental",desc:"Influye positivamente en otros ciudadanos"}
    ],
    impact:"Mejora el estado ambiental de la ciudad, recupera espacios verdes y reduce el impacto negativo en el entorno.",
    btnText:"Convertirme en Eco Maker"
  },
  {id:"eco_trader",name:"Eco Trader",icon:"💰",color:"#FF9800",skill:"Comerciar y Negociar",
    subtitle:"Comerciante de recursos de la ciudad",
    desc:"Expertos en intercambio. Negocian recursos y generan valor sostenible para la comunidad.",
    hat:"none",matIcon:"storefront",
    skills:[
      {icon:"storefront",name:"Comercio Justo",desc:"Negocia recursos de forma equitativa"},
      {icon:"savings",name:"Economía Verde",desc:"Genera valor con impacto positivo"},
      {icon:"handshake",name:"Alianzas",desc:"Crea redes de cooperación ciudadana"},
      {icon:"inventory_2",name:"Gestión de Recursos",desc:"Administra bienes de la comunidad"}
    ],
    impact:"Impulsa la economía local, promueve el comercio justo y conecta a los ciudadanos a través del intercambio.",
    btnText:"Convertirme en Eco Trader"
  },
  {id:"message_crafter",name:"Message Crafter",icon:"✉️",color:"#2196F3",skill:"Comunicar y Persuadir",
    subtitle:"Artesano del mensaje y la palabra",
    desc:"Crean campañas, historias y contenido que inspira a la comunidad a actuar.",
    hat:"beret",matIcon:"edit_note",
    skills:[
      {icon:"campaign",name:"Campañas",desc:"Crea contenido que inspira acción"},
      {icon:"menu_book",name:"Narrativa",desc:"Construye historias que conectan"},
      {icon:"record_voice_over",name:"Oratoria",desc:"Comunica ideas con claridad y fuerza"},
      {icon:"share",name:"Difusión",desc:"Amplifica el mensaje de la ciudad"}
    ],
    impact:"Transforma la comunicación de la ciudad, inspira a los ciudadanos y amplifica las voces que importan.",
    btnText:"Convertirme en Message Crafter"
  },
  {id:"ecofit",name:"Ecofit",icon:"🏃",color:"#F44336",skill:"Resistencia y Acción",
    subtitle:"Guerrero del movimiento y la energía",
    desc:"Superan desafíos físicos y lideran con energía. El cuerpo es su herramienta.",
    hat:"headband",matIcon:"sports_martial_arts",
    skills:[
      {icon:"fitness_center",name:"Fuerza",desc:"Supera desafíos físicos extremos"},
      {icon:"directions_run",name:"Agilidad",desc:"Se mueve rápido por toda la ciudad"},
      {icon:"favorite",name:"Resistencia",desc:"Aguanta las misiones más largas"},
      {icon:"emoji_events",name:"Competición",desc:"Lidera desafíos deportivos"}
    ],
    impact:"Energiza la ciudad con movimiento, lidera desafíos deportivos y demuestra que la acción transforma.",
    btnText:"Convertirme en Ecofit"
  },
  {id:"smart_citizen",name:"Smart Citizen",icon:"🧠",color:"#9C27B0",skill:"Resolver Problemas",
    subtitle:"Mente brillante de la ciudad",
    desc:"Analizan datos, investigan y encuentran soluciones innovadoras a los problemas urbanos.",
    hat:"none",matIcon:"psychology",
    skills:[
      {icon:"science",name:"Investigación",desc:"Descubre nuevas soluciones"},
      {icon:"analytics",name:"Análisis",desc:"Procesa datos para tomar decisiones"},
      {icon:"lightbulb",name:"Innovación",desc:"Crea tecnologías para la ciudad"},
      {icon:"school",name:"Conocimiento",desc:"Comparte saber con la comunidad"}
    ],
    impact:"Resuelve los problemas más complejos de la ciudad con ciencia, datos e innovación.",
    btnText:"Convertirme en Smart Citizen"
  },
  {id:"dream_maker",name:"Dream Maker",icon:"🎨",color:"#E91E63",skill:"Crear Arte e Inspirar",
    subtitle:"Artista visionario de la ciudad",
    desc:"Transforman ideas en obras que emocionan, conectan y embellecen la ciudad.",
    hat:"beret",matIcon:"palette",
    skills:[
      {icon:"palette",name:"Arte",desc:"Crea obras que transforman espacios"},
      {icon:"music_note",name:"Música",desc:"Compone sonidos que inspiran"},
      {icon:"theater_comedy",name:"Expresión",desc:"Comunica a través del arte"},
      {icon:"auto_awesome",name:"Creatividad",desc:"Imagina lo que otros no ven"}
    ],
    impact:"Embellece la ciudad, inspira emociones y demuestra que el arte transforma comunidades.",
    btnText:"Convertirme en Dream Maker"
  },
  {id:"global_citizen",name:"Global Citizen",icon:"🌍",color:"#00BCD4",skill:"Diplomacia y ODS",
    subtitle:"Embajador del mundo en la ciudad",
    desc:"Conectan culturas y promueven los Objetivos de Desarrollo Sostenible.",
    hat:"none",matIcon:"public",
    skills:[
      {icon:"public",name:"Diplomacia",desc:"Conecta culturas y perspectivas"},
      {icon:"translate",name:"Idiomas",desc:"Habla el lenguaje del mundo"},
      {icon:"diversity_3",name:"Inclusión",desc:"Promueve la diversidad"},
      {icon:"globe",name:"ODS",desc:"Impulsa los objetivos globales"}
    ],
    impact:"Conecta la ciudad con el mundo, promueve la diversidad y lidera los ODS.",
    btnText:"Convertirme en Global Citizen"
  },
  {id:"civic_minded",name:"Civic Minded",icon:"🏛️",color:"#607D8B",skill:"Liderazgo y Gobierno",
    subtitle:"Líder y gobernante de la ciudad",
    desc:"Organizan, gobiernan y toman decisiones que transforman la ciudad.",
    hat:"none",matIcon:"account_balance",
    skills:[
      {icon:"gavel",name:"Gobierno",desc:"Toma decisiones justas para todos"},
      {icon:"groups",name:"Liderazgo",desc:"Guía a la comunidad con ejemplo"},
      {icon:"policy",name:"Leyes Justas",desc:"Crea normas que protegen"},
      {icon:"campaign",name:"Participación",desc:"Moviliza a los ciudadanos"}
    ],
    impact:"Gobierna con justicia, lidera con ejemplo y transforma las instituciones de la ciudad.",
    btnText:"Convertirme en Civic Minded"
  },
  {id:"peace_counselor",name:"Peace Counselor",icon:"☮️",color:"#FFD700",skill:"Mediación y Paz",
    subtitle:"Consejero de paz de la ciudad",
    desc:"Consejeros de paz elegidos por voto popular. Median conflictos y restauran la armonía.",
    hat:"laurel",matIcon:"diversity_3",exclusive:true,
    skills:[
      {icon:"diversity_3",name:"Mediación",desc:"Resuelve conflictos entre ciudadanos"},
      {icon:"volunteer_activism",name:"Empatía",desc:"Comprende todas las perspectivas"},
      {icon:"balance",name:"Justicia",desc:"Busca soluciones equilibradas"},
      {icon:"spa",name:"Armonía",desc:"Restaura la paz en la ciudad"}
    ],
    impact:"Restaura la paz, resuelve conflictos y demuestra que el diálogo transforma la convivencia.",
    btnText:"Solo por Voto Popular"
  }
];

// ===== TILE COLORS =====
const TILE_COLORS = {
  0: null,
  1: {top:"#5a9e3e",left:"#4a8a32",right:"#3d7828"},
  2: {top:"#c4a96a",left:"#b09558",right:"#9c844e"},
  3: {top:"#8a8a9a",left:"#6a6a7a",right:"#5a5a6a"},
  4: null,
  5: {top:"#4fc3f7",left:"#29b6f6",right:"#039be5"},
  6: {top:"#5a9e3e",left:"#4a8a32",right:"#3d7828"},
  7: {top:"#1565c0",left:"#0d47a1",right:"#0a3380"},
  8: {top:"#6db34a",left:"#5ca03c",right:"#4d9030"},
  9: {top:"#7c4dff",left:"#651fff",right:"#6200ea"}
};

// ===== COLOR PALETTES =====
const SHIRT_COLORS = ["#4CAF50", "#2196F3", "#F44336", "#FF9800", "#9C27B0", "#00BCD4", "#607D8B", "#FFEB3B"];
const PANTS_COLORS = ["#37474F", "#1A237E", "#b71c1c", "#3E2723", "#1B5E20", "#263238", "#4E342E", "#212121"];
const SHOES_COLORS = ["#212121", "#3E2723", "#4E342E", "#BDBDBD", "#795548", "#111111"];

// ===== GAME STATE =====
let gameState = {
  userId: null, userName: "", stars: 0,
  clase: null, nivel: 1, xp: 0,
  currentZone: SPAWN_ZONE,
  charCol: 7, charRow: 10,
  charTargetCol: 7, charTargetRow: 10,
  charMoving: false, charPath: [],
  charMoveProgress: 0, charPrevCol: 7, charPrevRow: 10,
  charDirection: "s", gameReady: false,
  charColors: {shirt:"#4CAF50",pants:"#37474F",shoes:"#212121"},
  carouselIndex: 0
};

let canvas, ctx;
let camera = {x:0,y:0,targetX:0,targetY:0};
let lastTime = 0, animTime = 0;

// ===== INIT =====
window.addEventListener('load', initGame);

async function initGame() {
  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  createLoaderParticles();
  updateLoaderStatus("Conectando con la Ciudad...", 10);

  // Build all zone maps
  buildAllMaps();
  updateLoaderStatus("Generando mundo (45 zonas)...", 30);

  let userData = sessionStorage.getItem('ciudadanoJuego');
  if (!userData && IS_MAESTRO) {
    // Modo Maestro: crear usuario de prueba
    userData = JSON.stringify({id:'maestro', nombre:'Maestro CEES', estrellas:999});
    sessionStorage.setItem('ciudadanoJuego', userData);
  }
  if (!userData) {
    updateLoaderStatus("Redirigiendo a Caminos...", 100);
    setTimeout(function(){ window.location.href = 'index.html'; }, 1500);
    return;
  }

  const user = JSON.parse(userData);
  gameState.userId = user.id;
  gameState.userName = user.nombre || "Ciudadano";
  gameState.stars = user.estrellas || 0;
  updateLoaderStatus("Cargando perfil...", 50);

  try {
    const doc = await db.collection("ciudadano").doc(gameState.userId).collection("juego").doc("perfil").get();
    if (doc.exists) {
      const d = doc.data();
      gameState.clase = d.clase || null;
      gameState.nivel = d.nivel || 1;
      gameState.xp = d.xp || 0;
      gameState.currentZone = d.zona_actual || SPAWN_ZONE;
      gameState.charCol = d.charCol || 7;
      gameState.charRow = d.charRow || 10;
      if (d.charColors) gameState.charColors = d.charColors;
    }
  } catch(e) { console.error(e); }

  try {
    const mainDoc = await db.collection("ciudadano").doc(gameState.userId).get();
    if (mainDoc.exists) gameState.stars = mainDoc.data().estrellas || 0;
  } catch(e) {}

  updateLoaderStatus("¡Bienvenido a la Ciudad!", 100);
  gameState.charTargetCol = gameState.charCol;
  gameState.charTargetRow = gameState.charRow;
  gameState.charPrevCol = gameState.charCol;
  gameState.charPrevRow = gameState.charRow;

  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('touchend', handleCanvasTouchEnd);

  // Keyboard support
  document.addEventListener('keydown', function(e) {
    if (!gameState.gameReady) return;
    if (e.key === 'ArrowUp' || e.key === 'w') dpadMove('up');
    else if (e.key === 'ArrowDown' || e.key === 's') dpadMove('down');
    else if (e.key === 'ArrowLeft' || e.key === 'a') dpadMove('left');
    else if (e.key === 'ArrowRight' || e.key === 'd') dpadMove('right');
  });

  setTimeout(function() {
    document.getElementById('game-loader').classList.add('hidden');
    if (!gameState.clase) showCarousel();
    else startGame();
  }, 800);
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function createLoaderParticles() {
  const c = document.getElementById('loader-particles');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'loader-particle';
    p.style.left = Math.random()*100+'%';
    p.style.animationDelay = Math.random()*6+'s';
    p.style.animationDuration = (4+Math.random()*4)+'s';
    c.appendChild(p);
  }
}

function updateLoaderStatus(text, pct) {
  const el = document.getElementById('loader-status');
  const fill = document.getElementById('loader-fill');
  if (el) el.textContent = text;
  if (fill) fill.style.width = pct + '%';
}

// ===== CHARACTER CAROUSEL =====
function showCarousel() {
  document.getElementById('char-carousel').classList.remove('hidden');
  gameState.carouselIndex = 0;
  renderCarousel();
}

function renderCarousel() {
  const cls = CLASSES[gameState.carouselIndex];
  const excl = cls.exclusive;
  const screen = document.getElementById('char-carousel');

  // Background
  const bgEl = document.getElementById('role-bg');
  if (cls.bg) {
    bgEl.style.backgroundImage = 'url(' + cls.bg + ')';
    bgEl.style.opacity = '1';
  } else {
    bgEl.style.backgroundImage = 'none';
    bgEl.style.opacity = '0';
  }
  bgEl.style.setProperty('--role-color', cls.color);

  // Character image
  const charEl = document.getElementById('role-char-img');
  if (cls.charImg) {
    charEl.src = cls.charImg;
    charEl.style.display = 'block';
    document.getElementById('carousel-avatar').style.display = 'none';
  } else {
    charEl.style.display = 'none';
    document.getElementById('carousel-avatar').style.display = 'block';
    drawCarouselAvatar(cls);
  }

  // Info panel
  document.getElementById('role-emblem').innerHTML = '<span class="material-symbols-rounded">' + cls.matIcon + '</span>';
  document.getElementById('role-emblem').style.background = cls.color + '22';
  document.getElementById('role-emblem').style.borderColor = cls.color;
  document.getElementById('role-name').textContent = cls.name;
  document.getElementById('role-name').style.color = cls.color;
  document.getElementById('role-subtitle').textContent = cls.subtitle || cls.skill;
  document.getElementById('role-desc').textContent = cls.desc;

  // Skills
  const skillsEl = document.getElementById('role-skills');
  if (cls.skills) {
    skillsEl.innerHTML = cls.skills.map(function(s) {
      return '<div class="rs-item"><div class="rs-icon" style="color:' + cls.color + '"><span class="material-symbols-rounded">' + s.icon + '</span></div><div class="rs-info"><strong>' + s.name + '</strong><p>' + s.desc + '</p></div></div>';
    }).join('');
  }

  // Impact
  document.getElementById('role-impact').textContent = cls.impact || '';

  // Select button
  const btn = document.getElementById('carousel-select-btn');
  btn.textContent = cls.btnText || (excl ? 'Solo por Voto Popular' : 'Elegir este Rol');
  btn.style.background = excl ? 'rgba(100,100,100,0.5)' : 'linear-gradient(135deg, ' + cls.color + ', ' + cls.color + 'cc)';
  btn.style.borderColor = cls.color;
  btn.disabled = !!excl;
  btn.style.opacity = excl ? '0.5' : '1';

  // Bottom carousel strip
  const strip = document.getElementById('role-strip');
  strip.innerHTML = CLASSES.map(function(c, i) {
    const active = i === gameState.carouselIndex;
    return '<div class="strip-icon' + (active ? ' strip-active' : '') + '" style="' + (active ? 'border-color:' + c.color + ';box-shadow:0 0 12px ' + c.color + '55' : '') + '" onclick="goToCarousel(' + i + ')"><span class="material-symbols-rounded">' + c.matIcon + '</span></div>';
  }).join('');
}

function drawCarouselAvatar(cls) {
  const cv = document.getElementById('carousel-avatar');
  const c = cv.getContext('2d');
  const w = cv.width, h = cv.height;
  c.clearRect(0, 0, w, h);
  const cx = w/2, baseY = h - 30;
  c.beginPath(); c.ellipse(cx, baseY+5, 35, 12, 0, 0, Math.PI*2);
  c.fillStyle = 'rgba(0,0,0,0.2)'; c.fill();
  c.fillStyle = gameState.charColors.shoes;
  c.fillRect(cx-18, baseY-5, 14, 8); c.fillRect(cx+4, baseY-5, 14, 8);
  c.fillStyle = gameState.charColors.pants;
  c.beginPath(); c.moveTo(cx-20,baseY-5); c.lineTo(cx-15,baseY-40); c.lineTo(cx+15,baseY-40); c.lineTo(cx+20,baseY-5); c.closePath(); c.fill();
  c.fillStyle = cls.color;
  c.beginPath(); c.moveTo(cx-22,baseY-38); c.lineTo(cx-18,baseY-75); c.lineTo(cx+18,baseY-75); c.lineTo(cx+22,baseY-38); c.closePath(); c.fill();
  c.strokeStyle = cls.color; c.lineWidth = 8; c.lineCap = 'round';
  c.beginPath(); c.moveTo(cx-22,baseY-65); c.lineTo(cx-35,baseY-45); c.stroke();
  c.beginPath(); c.moveTo(cx+22,baseY-65); c.lineTo(cx+35,baseY-45); c.stroke();
  c.fillStyle = '#ffcc80';
  c.beginPath(); c.arc(cx-35,baseY-43,6,0,Math.PI*2); c.fill();
  c.beginPath(); c.arc(cx+35,baseY-43,6,0,Math.PI*2); c.fill();
  c.beginPath(); c.arc(cx,baseY-90,22,0,Math.PI*2); c.fillStyle='#ffcc80'; c.fill();
  c.fillStyle='#333'; c.fillRect(cx-8,baseY-93,4,5); c.fillRect(cx+4,baseY-93,4,5);
  c.beginPath(); c.arc(cx,baseY-82,5,0,Math.PI); c.strokeStyle='#333'; c.lineWidth=2; c.stroke();
  c.font='28px serif'; c.textAlign='center'; c.fillText(cls.icon, cx, baseY-118);
  if (cls.hat==='helmet') { c.fillStyle='#FFC107'; c.beginPath(); c.arc(cx,baseY-100,24,Math.PI,0); c.fill(); }
  else if (cls.hat==='beret') { c.fillStyle=cls.color; c.beginPath(); c.ellipse(cx-5,baseY-108,20,8,-0.2,0,Math.PI*2); c.fill(); }
  else if (cls.hat==='headband') { c.fillStyle=cls.color; c.fillRect(cx-24,baseY-102,48,6); }
  else if (cls.hat==='laurel') { c.font='20px serif'; c.fillText('🌿',cx-18,baseY-105); c.fillText('🌿',cx+18,baseY-105); }
}

function carouselNext() {
  gameState.carouselIndex = (gameState.carouselIndex + 1) % CLASSES.length;
  document.getElementById('char-carousel').classList.add('transitioning');
  setTimeout(function() { renderCarousel(); document.getElementById('char-carousel').classList.remove('transitioning'); }, 200);
}
function carouselPrev() {
  gameState.carouselIndex = (gameState.carouselIndex - 1 + CLASSES.length) % CLASSES.length;
  document.getElementById('char-carousel').classList.add('transitioning');
  setTimeout(function() { renderCarousel(); document.getElementById('char-carousel').classList.remove('transitioning'); }, 200);
}
function goToCarousel(i) {
  gameState.carouselIndex = i;
  document.getElementById('char-carousel').classList.add('transitioning');
  setTimeout(function() { renderCarousel(); document.getElementById('char-carousel').classList.remove('transitioning'); }, 200);
}

function selectFromCarousel() {
  const cls = CLASSES[gameState.carouselIndex];
  if (cls.exclusive) return;
  gameState.clase = cls.id;
  gameState.charColors.shirt = cls.color;
  
  // Ocultar UI colateral, mantener el escenario y el personaje
  document.querySelector('.role-info-panel:not(#color-custom)').classList.add('hidden');
  document.querySelector('.role-strip-container').classList.add('hidden');
  document.querySelectorAll('.nav-arrow').forEach(el => el.classList.add('hidden'));
  document.querySelector('#role-selector > .role-select-btn').classList.add('hidden');
  
  showColorCustomization();
}

// ===== COLOR CUSTOMIZATION =====
function showColorCustomization() {
  document.getElementById('color-custom').classList.remove('hidden');
  renderColorPalette('shirt-colors', SHIRT_COLORS, 'shirt');
  renderColorPalette('pants-colors', PANTS_COLORS, 'pants');
  renderColorPalette('shoes-colors', SHOES_COLORS, 'shoes');
  updateCustomPreview();
}

function renderColorPalette(containerId, colors, part) {
  const el = document.getElementById(containerId);
  el.innerHTML = colors.map(function(c) {
    const sel = gameState.charColors[part] === c ? ' selected' : '';
    return '<div class="color-swatch' + sel + '" style="background:' + c + '" onclick="pickColor(\'' + part + '\',\'' + c + '\')"></div>';
  }).join('');
}

function pickColor(part, color) {
  gameState.charColors[part] = color;
  renderColorPalette(part === 'shirt' ? 'shirt-colors' : part === 'pants' ? 'pants-colors' : 'shoes-colors',
    part === 'shirt' ? SHIRT_COLORS : part === 'pants' ? PANTS_COLORS : SHOES_COLORS, part);
  updateCustomPreview();
}

function updateCustomPreview() {
  const cls = CLASSES.find(function(c) { return c.id === gameState.clase; }) || CLASSES[0];
  
  if (cls.pngImage) {
    // Es un avatar PNG de alta calidad. Aplicaremos un cambio de tono aproximativo usando CSS hue-rotate.
    const img = document.querySelector('.role-char-img');
    if (img) {
      // Mapeo básico de color hexadecimal a grados de rotación (aprox)
      let hex = gameState.charColors.shirt;
      let rot = 0;
      if (hex === '#F44336' || hex === '#E53935') rot = 115; // Rojo
      if (hex === '#FF9800' || hex === '#F57C00') rot = 75; // Naranja
      if (hex === '#2196F3' || hex === '#1E88E5') rot = -100; // Azul
      if (hex === '#9C27B0' || hex === '#8E24AA') rot = -150; // Morado
      if (hex === '#00BCD4' || hex === '#0097A7') rot = -50;  // Cyan
      if (hex === '#607D8B' || hex === '#455A64') rot = 180; // Gris azulado
      // El verde no requiere rotación porque el original es verde
      
      img.style.filter = 'drop-shadow(0 8px 24px rgba(0,0,0,.5)) hue-rotate(' + rot + 'deg)';
    }
  } else {
    // Es un avatar Canvas. Re-dibujamos el canvas del carrusel directamente.
    renderCarousel();
  }
}

async function confirmCustomization() {
  document.getElementById('color-custom').classList.add('hidden');
  try {
    await db.collection("ciudadano").doc(gameState.userId).collection("juego").doc("perfil").set({
      clase: gameState.clase, nivel: 1, xp: 0,
      zona_actual: SPAWN_ZONE, charCol: 7, charRow: 10,
      charColors: gameState.charColors,
      creado: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(e) { console.error(e); }
  startGame();
}

// ===== START GAME =====
function startGame() {
  gameState.gameReady = true;
  document.getElementById('game-hud').classList.remove('hidden');
  document.getElementById('mobile-dpad').classList.remove('hidden');
  updateHUD();
  lastTime = performance.now();
  requestAnimationFrame(gameLoop);
}

// ===== GAME LOOP =====
function gameLoop(ts) {
  if (!gameState.gameReady) return;
  const dt = Math.min((ts - lastTime) / 1000, 0.1);
  lastTime = ts;
  animTime += dt;
  update(dt);
  render();
  requestAnimationFrame(gameLoop);
}

function update(dt) {
  // Move along path
  if (gameState.charPath.length > 0 && !gameState.charMoving) {
    const next = gameState.charPath.shift();
    gameState.charPrevCol = gameState.charCol;
    gameState.charPrevRow = gameState.charRow;
    gameState.charTargetCol = next.col;
    gameState.charTargetRow = next.row;
    gameState.charMoving = true;
    gameState.charMoveProgress = 0;
    const dc = next.col - gameState.charPrevCol, dr = next.row - gameState.charPrevRow;
    if (dc > 0) gameState.charDirection = "e";
    else if (dc < 0) gameState.charDirection = "w";
    else if (dr > 0) gameState.charDirection = "s";
    else gameState.charDirection = "n";
  }

  if (gameState.charMoving) {
    gameState.charMoveProgress += dt * CHAR_SPEED;
    if (gameState.charMoveProgress >= 1) {
      gameState.charMoveProgress = 1;
      gameState.charCol = gameState.charTargetCol;
      gameState.charRow = gameState.charTargetRow;
      gameState.charMoving = false;
      checkBuildingAt(gameState.charCol, gameState.charRow);
      checkEdgeTransition();
      checkPortalPad();
    }
  }

  // Camera follow
  const charScreen = tileToScreen(
    lerp(gameState.charPrevCol, gameState.charTargetCol, gameState.charMoving ? gameState.charMoveProgress : 1),
    lerp(gameState.charPrevRow, gameState.charTargetRow, gameState.charMoving ? gameState.charMoveProgress : 1)
  );
  camera.targetX = window.innerWidth / 2 - charScreen.x;
  camera.targetY = window.innerHeight / 2 - charScreen.y;
  camera.x += (camera.targetX - camera.x) * 0.08;
  camera.y += (camera.targetY - camera.y) * 0.08;
}

// ===== EDGE TRANSITIONS (DOFUS-style) =====
function checkEdgeTransition() {
  const col = gameState.charCol, row = gameState.charRow;
  const conns = getConnections(gameState.currentZone);
  if (row <= 0 && conns.north) doZoneTransition(conns.north, 'north');
  else if (row >= MAP_H-1 && conns.south) doZoneTransition(conns.south, 'south');
  else if (col >= MAP_W-1 && conns.east) doZoneTransition(conns.east, 'east');
  else if (col <= 0 && conns.west) doZoneTransition(conns.west, 'west');
}

function doZoneTransition(targetZone, fromDir) {
  const info = ZONE_INFO[targetZone];
  if (!info) return;
  const transEl = document.getElementById('zone-transition');
  document.getElementById('transition-icon').textContent = info.i;
  document.getElementById('transition-text').textContent = info.n;
  transEl.classList.remove('hidden');
  gameState.gameReady = false;
  gameState.charPath = [];
  gameState.charMoving = false;

  setTimeout(function() {
    gameState.currentZone = targetZone;
    if (fromDir === 'north') { gameState.charRow = MAP_H - 2; gameState.charCol = Math.floor(MAP_W/2); }
    else if (fromDir === 'south') { gameState.charRow = 1; gameState.charCol = Math.floor(MAP_W/2); }
    else if (fromDir === 'east') { gameState.charCol = 1; gameState.charRow = Math.floor(MAP_H/2); }
    else if (fromDir === 'west') { gameState.charCol = MAP_W - 2; gameState.charRow = Math.floor(MAP_H/2); }
    gameState.charTargetCol = gameState.charCol;
    gameState.charTargetRow = gameState.charRow;
    gameState.charPrevCol = gameState.charCol;
    gameState.charPrevRow = gameState.charRow;
    updateHUD();
    saveProgress();
    gameState.gameReady = true;
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
    setTimeout(function() { transEl.classList.add('hidden'); }, 400);
  }, 500);
}

// ===== PORTAL FAST-TRAVEL =====
function checkPortalPad() {
  const map = ZONE_MAPS[gameState.currentZone];
  if (!map) return;
  if (map[gameState.charRow] && map[gameState.charRow][gameState.charCol] === 9) {
    showPortalMenu();
  }
}

function showPortalMenu() {
  const dests = getPortalDestinations(gameState.currentZone);
  let html = '<p style="text-align:center;margin-bottom:12px;color:#b388ff;">Portal activo. ¿A dónde viajar?</p>';
  dests.forEach(function(z) {
    const info = ZONE_INFO[z];
    html += '<button class="portal-dest-btn" onclick="portalTravel(' + z + ')">' + info.i + ' ' + info.n + '</button>';
  });
  document.getElementById('building-name').textContent = '🌀 Portal de Viaje';
  document.getElementById('building-desc').innerHTML = html;
  document.getElementById('building-icon').textContent = '🌀';
  document.getElementById('building-req').innerHTML = '';
  document.getElementById('building-enter-btn').style.display = 'none';
  document.getElementById('building-overlay').classList.remove('hidden');
  document.getElementById('building-panel').classList.remove('hidden');
}

function portalTravel(targetZone) {
  closeBuildingPanel();
  doZoneTransition(targetZone, 'south'); // spawn at top-center
}

// ===== RENDERING =====
function render() {
  const w = window.innerWidth, h = window.innerHeight;
  ctx.clearRect(0, 0, w, h);
  const zone = ZONE_INFO[gameState.currentZone];
  if (!zone) return;
  const map = ZONE_MAPS[gameState.currentZone];
  if (!map) return;

  ctx.fillStyle = zone.bg;
  ctx.fillRect(0, 0, w, h);
  ctx.save();
  ctx.translate(camera.x, camera.y);

  const objects = [];

  for (let row = 0; row < MAP_H; row++) {
    for (let col = 0; col < MAP_W; col++) {
      const tile = map[row][col];
      if (tile === 0) continue;
      const pos = tileToScreen(col, row);
      if (tile === 4) {
        drawDiamond(pos.x, pos.y, TILE_COLORS[1]);
        objects.push({type:"tree",x:pos.x,y:pos.y,depth:row+col});
      } else if (tile === 5) {
        drawDiamond(pos.x, pos.y, TILE_COLORS[5]);
        drawFountain(pos.x, pos.y);
      } else if (tile === 6) {
        drawDiamond(pos.x, pos.y, TILE_COLORS[1]);
        drawFlower(pos.x, pos.y, col+row);
      } else if (tile === 7) {
        drawWater(pos.x, pos.y);
      } else if (tile === 9) {
        drawDiamond(pos.x, pos.y, TILE_COLORS[9]);
        drawPortalEffect(pos.x, pos.y);
      } else {
        const colors = TILE_COLORS[tile];
        if (colors) drawDiamond(pos.x, pos.y, colors);
      }
    }
  }

  // Character
  const cCol = lerp(gameState.charPrevCol, gameState.charTargetCol, gameState.charMoving ? gameState.charMoveProgress : 1);
  const cRow = lerp(gameState.charPrevRow, gameState.charTargetRow, gameState.charMoving ? gameState.charMoveProgress : 1);
  const charPos = tileToScreen(cCol, cRow);
  objects.push({type:"char",x:charPos.x,y:charPos.y,depth:cRow+cCol});

  objects.sort(function(a,b){ return a.depth - b.depth; });
  objects.forEach(function(obj) {
    if (obj.type === "tree") drawTree(obj.x, obj.y);
    else if (obj.type === "char") drawCharacter(obj.x, obj.y);
  });

  // Building labels
  (zone.b || []).forEach(function(b) {
    const bx = b.c + b.w/2, by = b.r;
    const pos = tileToScreen(bx, by);
    drawBuildingLabel(pos.x, pos.y - 20, b.i, b.n, b.s, gameState.stars >= b.s);
  });

  ctx.restore();
}

// ===== ISOMETRIC MATH =====
function tileToScreen(col, row) {
  return { x: (col - row) * (TILE_W / 2), y: (col + row) * (TILE_H / 2) };
}
function screenToTile(sx, sy) {
  const x = sx - camera.x, y = sy - camera.y;
  const col = (x / (TILE_W/2) + y / (TILE_H/2)) / 2;
  const row = (y / (TILE_H/2) - x / (TILE_W/2)) / 2;
  return { col: Math.round(col), row: Math.round(row) };
}
function lerp(a, b, t) { return a + (b-a) * Math.min(1, Math.max(0, t)); }

// ===== DRAWING =====
function drawDiamond(x, y, colors) {
  const hw = TILE_W/2, hh = TILE_H/2;
  ctx.beginPath(); ctx.moveTo(x,y-hh); ctx.lineTo(x+hw,y); ctx.lineTo(x,y+hh); ctx.lineTo(x-hw,y); ctx.closePath();
  ctx.fillStyle = colors.top; ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.08)"; ctx.lineWidth = 0.5; ctx.stroke();
}
function drawWater(x, y) {
  const hw = TILE_W/2, hh = TILE_H/2, wave = Math.sin(animTime*2+x*0.01)*2;
  ctx.beginPath(); ctx.moveTo(x,y-hh+wave); ctx.lineTo(x+hw,y+wave*0.5); ctx.lineTo(x,y+hh+wave); ctx.lineTo(x-hw,y+wave*0.5); ctx.closePath();
  ctx.fillStyle = "#1565c0"; ctx.fill();
  ctx.fillStyle = "rgba(100,200,255,"+(0.15+Math.sin(animTime*3+x*0.05)*0.1)+")"; ctx.fill();
}
function drawTree(x, y) {
  ctx.fillStyle = "#5d4037"; ctx.fillRect(x-3, y-30, 6, 18);
  ctx.beginPath(); ctx.arc(x, y-36, 14, 0, Math.PI*2); ctx.fillStyle = "#2e7d32"; ctx.fill();
  ctx.beginPath(); ctx.arc(x-6, y-32, 10, 0, Math.PI*2); ctx.fillStyle = "#388e3c"; ctx.fill();
  ctx.beginPath(); ctx.arc(x+7, y-33, 11, 0, Math.PI*2); ctx.fillStyle = "#43a047"; ctx.fill();
  ctx.beginPath(); ctx.ellipse(x, y+2, 12, 5, 0, 0, Math.PI*2); ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.fill();
}
function drawFlower(x, y, seed) {
  const colors = ["#e91e63","#ff5722","#ffc107","#9c27b0","#2196f3"];
  const fx = x + Math.sin(seed*3)*8, fy = y + Math.cos(seed*5)*4;
  ctx.beginPath(); ctx.arc(fx, fy-6, 3, 0, Math.PI*2); ctx.fillStyle = colors[seed%5]; ctx.fill();
  ctx.fillStyle = "#4caf50"; ctx.fillRect(fx-0.5, fy-4, 1, 5);
}
function drawFountain(x, y) {
  ctx.beginPath(); ctx.ellipse(x, y, 14, 8, 0, 0, Math.PI*2); ctx.fillStyle = "#90a4ae"; ctx.fill();
  const sprayH = 8 + Math.sin(animTime*4)*3;
  ctx.beginPath(); ctx.moveTo(x, y-sprayH-10); ctx.lineTo(x-4, y-5); ctx.lineTo(x+4, y-5); ctx.closePath();
  ctx.fillStyle = "rgba(66,165,245,0.6)"; ctx.fill();
}
function drawPortalEffect(x, y) {
  const glow = 0.4 + Math.sin(animTime*3)*0.3;
  ctx.beginPath(); ctx.arc(x, y-8, 10+Math.sin(animTime*2)*3, 0, Math.PI*2);
  ctx.fillStyle = "rgba(124,77,255,"+glow+")"; ctx.fill();
  ctx.beginPath(); ctx.arc(x, y-8, 5, 0, Math.PI*2);
  ctx.fillStyle = "rgba(200,180,255,0.8)"; ctx.fill();
}
function drawCharacter(x, y) {
  const bob = gameState.charMoving ? Math.sin(animTime*12)*2 : 0;
  const cls = CLASSES.find(function(c){return c.id===gameState.clase;}) || CLASSES[0];
  // Shadow
  ctx.beginPath(); ctx.ellipse(x, y+3, 10, 5, 0, 0, Math.PI*2); ctx.fillStyle = "rgba(0,0,0,0.35)"; ctx.fill();
  const bodyY = y - 14 + bob;
  // Shoes
  ctx.fillStyle = gameState.charColors.shoes;
  ctx.fillRect(x-7, bodyY+9, 5, 3); ctx.fillRect(x+2, bodyY+9, 5, 3);
  // Pants
  ctx.fillStyle = gameState.charColors.pants;
  ctx.beginPath(); ctx.moveTo(x-8,bodyY+10); ctx.lineTo(x-7,bodyY+4); ctx.lineTo(x+7,bodyY+4); ctx.lineTo(x+8,bodyY+10); ctx.closePath(); ctx.fill();
  // Shirt
  ctx.fillStyle = gameState.charColors.shirt;
  ctx.beginPath(); ctx.moveTo(x-7,bodyY+5); ctx.lineTo(x-6,bodyY-2); ctx.lineTo(x+6,bodyY-2); ctx.lineTo(x+7,bodyY+5); ctx.closePath(); ctx.fill();
  // Head
  ctx.beginPath(); ctx.arc(x, bodyY-7, 7, 0, Math.PI*2); ctx.fillStyle = "#ffcc80"; ctx.fill();
  // Eyes
  ctx.fillStyle = "#333"; ctx.fillRect(x-3, bodyY-8, 2, 2); ctx.fillRect(x+1, bodyY-8, 2, 2);
  // Name
  ctx.font = "bold 9px Nunito"; ctx.textAlign = "center";
  ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillText(gameState.userName.split(',')[0].split(' ')[0], x, bodyY-18);
  ctx.fillStyle = "#fff"; ctx.fillText(gameState.userName.split(',')[0].split(' ')[0], x-0.5, bodyY-18.5);
  // Glow
  ctx.beginPath(); ctx.arc(x, bodyY-5, 12, 0, Math.PI*2);
  ctx.strokeStyle = cls.color + "44"; ctx.lineWidth = 2; ctx.stroke();
}
function drawBuildingLabel(x, y, icon, name, starsReq, unlocked) {
  ctx.font = "bold 10px Nunito";
  const tw = ctx.measureText(name).width;
  const totalW = tw + 40;
  ctx.fillStyle = unlocked ? "rgba(46,125,50,0.85)" : "rgba(50,50,60,0.85)";
  const rx = x - totalW/2, ry = y - 12;
  ctx.beginPath(); ctx.roundRect(rx, ry, totalW, 24, 6); ctx.fill();
  ctx.strokeStyle = unlocked ? "rgba(102,187,106,0.4)" : "rgba(255,255,255,0.12)"; ctx.lineWidth = 1; ctx.stroke();
  ctx.font = "12px serif"; ctx.textAlign = "left"; ctx.fillText(icon, rx+4, ry+17);
  ctx.font = "bold 10px Nunito"; ctx.fillStyle = "#fff"; ctx.fillText(name, rx+20, ry+16);
  ctx.font = "bold 9px Nunito"; ctx.textAlign = "right";
  ctx.fillStyle = unlocked ? "#ffd54f" : "#ef5350";
  ctx.fillText("★"+starsReq, rx+totalW-4, ry+16); ctx.textAlign = "left";
}

// ===== INPUT =====
function handleCanvasClick(e) { handleTap(e.clientX, e.clientY); }
function handleCanvasTouchEnd(e) {
  e.preventDefault();
  if (e.changedTouches.length > 0) handleTap(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
}
function handleTap(sx, sy) {
  const tile = screenToTile(sx, sy);
  const map = ZONE_MAPS[gameState.currentZone];
  if (!map) return;
  if (tile.row < 0 || tile.row >= MAP_H || tile.col < 0 || tile.col >= MAP_W) return;
  const t = map[tile.row][tile.col];
  if (WALKABLE.indexOf(t) === -1) return;
  const path = findPath(gameState.charCol, gameState.charRow, tile.col, tile.row, map);
  if (path && path.length > 0) gameState.charPath = path;
}
function dpadMove(dir) {
  let dc = 0, dr = 0;
  if (dir==='up') dr=-1; else if (dir==='down') dr=1;
  else if (dir==='left') dc=-1; else if (dir==='right') dc=1;
  const nc = gameState.charCol+dc, nr = gameState.charRow+dr;
  const map = ZONE_MAPS[gameState.currentZone];
  if (!map || nr<0 || nr>=MAP_H || nc<0 || nc>=MAP_W) return;
  if (WALKABLE.indexOf(map[nr][nc]) !== -1) gameState.charPath = [{col:nc,row:nr}];
}

// ===== PATHFINDING =====
function findPath(sc, sr, ec, er, map) {
  const rows = MAP_H, cols = MAP_W;
  const visited = Array.from({length:rows}, function(){return new Array(cols).fill(false);});
  const parent = Array.from({length:rows}, function(){return new Array(cols).fill(null);});
  const queue = [{col:sc,row:sr}];
  visited[sr][sc] = true;
  const dirs = [{dc:1,dr:0},{dc:-1,dr:0},{dc:0,dr:1},{dc:0,dr:-1}];
  while (queue.length > 0) {
    const cur = queue.shift();
    if (cur.col===ec && cur.row===er) {
      const path = []; let c = {col:ec,row:er};
      while (c && (c.col!==sc || c.row!==sr)) { path.unshift(c); c = parent[c.row][c.col]; }
      return path.slice(0, 40);
    }
    for (let d = 0; d < dirs.length; d++) {
      const nc = cur.col+dirs[d].dc, nr = cur.row+dirs[d].dr;
      if (nr<0||nr>=rows||nc<0||nc>=cols||visited[nr][nc]) continue;
      if (WALKABLE.indexOf(map[nr][nc])===-1) continue;
      visited[nr][nc] = true;
      parent[nr][nc] = {col:cur.col,row:cur.row};
      queue.push({col:nc,row:nr});
    }
  }
  return null;
}

// ===== BUILDING INTERACTION =====
function checkBuildingAt(col, row) {
  const zone = ZONE_INFO[gameState.currentZone];
  if (!zone || !zone.b) return;
  zone.b.forEach(function(b) {
    for (let r = b.r; r < b.r+b.h; r++)
      for (let c = b.c; c < b.c+b.w; c++)
        if (Math.abs(col-c)<=1 && Math.abs(row-r)<=1 && (col!==c||row!==r)) { showBuildingPanel(b); return; }
  });
}
function showBuildingPanel(b) {
  document.getElementById('building-icon').textContent = b.i;
  document.getElementById('building-name').textContent = b.n;
  document.getElementById('building-desc').textContent = b.d;
  const reqEl = document.getElementById('building-req');
  const btn = document.getElementById('building-enter-btn');
  btn.style.display = '';
  const unlocked = gameState.stars >= b.s;
  if (b.s === 0) { reqEl.className='building-req unlocked'; reqEl.innerHTML='<span class="material-symbols-rounded">lock_open</span> Acceso libre'; btn.className='panel-cta cta-gold'; btn.textContent='Explorar'; }
  else if (unlocked) { reqEl.className='building-req unlocked'; reqEl.innerHTML='<span class="material-symbols-rounded">lock_open</span> ★'+b.s+' — ¡Desbloqueado!'; btn.className='panel-cta cta-gold'; btn.textContent='Explorar'; }
  else { reqEl.className='building-req locked'; reqEl.innerHTML='<span class="material-symbols-rounded">lock</span> Necesitas ★'+b.s+' (tienes '+gameState.stars+')'; btn.className='panel-cta cta-locked'; btn.textContent='Bloqueado'; }
  document.getElementById('building-overlay').classList.remove('hidden');
  document.getElementById('building-panel').classList.remove('hidden');
}
function closeBuildingPanel() {
  document.getElementById('building-overlay').classList.add('hidden');
  document.getElementById('building-panel').classList.add('hidden');
}
function enterBuilding() { closeBuildingPanel(); }

// ===== HUD =====
function updateHUD() {
  const info = ZONE_INFO[gameState.currentZone];
  document.getElementById('hud-zone-name').textContent = (info ? info.n : 'Zona Desconocida');
  document.getElementById('hud-stars').textContent = gameState.stars;
  document.getElementById('hud-level').textContent = gameState.nivel;
}

// ===== PANELS =====
function openCharPanel() {
  const cls = CLASSES.find(function(c){return c.id===gameState.clase;}) || CLASSES[0];
  const fn = gameState.userName.includes(',') ? gameState.userName.split(',')[1].trim()+' '+gameState.userName.split(',')[0].trim() : gameState.userName;
  document.getElementById('char-info').innerHTML =
    '<div class="char-avatar-row"><div class="char-avatar-circle" style="background:'+cls.color+'22;border-color:'+cls.color+';">'+cls.icon+'</div><div><div class="char-name">'+fn+'</div><div class="char-class" style="color:'+cls.color+';">'+cls.name+'</div></div></div>'+
    '<div class="char-stat-grid"><div class="char-stat-card"><div class="char-stat-val" style="color:#ffd54f;">★ '+gameState.stars+'</div><div class="char-stat-label">Estrellas</div></div>'+
    '<div class="char-stat-card"><div class="char-stat-val" style="color:#66bb6a;">Nv '+gameState.nivel+'</div><div class="char-stat-label">Nivel</div></div>'+
    '<div class="char-stat-card"><div class="char-stat-val" style="color:'+cls.color+';">'+cls.icon+'</div><div class="char-stat-label">'+cls.skill+'</div></div></div>';
  document.getElementById('char-overlay').classList.remove('hidden');
  document.getElementById('char-panel').classList.remove('hidden');
}
function closeCharPanel() { document.getElementById('char-overlay').classList.add('hidden'); document.getElementById('char-panel').classList.add('hidden'); }
function openMissionsPanel() { document.getElementById('missions-overlay').classList.remove('hidden'); document.getElementById('missions-panel').classList.remove('hidden'); }
function closeMissionsPanel() { document.getElementById('missions-overlay').classList.add('hidden'); document.getElementById('missions-panel').classList.add('hidden'); }

// ===== WORLD MAP (Canvas-drawn, position only) =====
function openWorldMap() {
  document.getElementById('worldmap-overlay').classList.remove('hidden');
  document.getElementById('worldmap-panel').classList.remove('hidden');
  drawWorldMap();
}
function closeWorldMap() {
  document.getElementById('worldmap-overlay').classList.add('hidden');
  document.getElementById('worldmap-panel').classList.add('hidden');
}
function drawWorldMap() {
  const cv = document.getElementById('worldmap-canvas');
  if (!cv) return;
  const c = cv.getContext('2d');
  const cw = cv.width, ch = cv.height;
  c.clearRect(0, 0, cw, ch);
  const cellW = Math.floor(cw / 8), cellH = Math.floor(ch / 6);
  // Zone type colors
  const typeColors = {df:'#1b4a0e',lf:'#2d6a1e',cb:'#5a7a5a',sp:'#3a8a2e',pk:'#6a6a5a',gd:'#3a7a4a',pz:'#7a7a5a',mt:'#5a5a4a'};
  for (let i = 1; i <= 45; i++) {
    const info = ZONE_INFO[i]; if (!info) continue;
    const g = zoneToGrid(i);
    const x = g.col * cellW, y = g.row * cellH;
    c.fillStyle = typeColors[info.t] || '#444';
    c.fillRect(x+1, y+1, cellW-2, cellH-2);
    c.strokeStyle = 'rgba(255,255,255,0.15)'; c.lineWidth = 1;
    c.strokeRect(x+1, y+1, cellW-2, cellH-2);
    // Zone number
    c.font = 'bold 9px Nunito'; c.textAlign = 'center'; c.fillStyle = 'rgba(255,255,255,0.4)';
    c.fillText(i, x+cellW/2, y+cellH/2+3);
    // Portal indicator
    if (info.portal) {
      c.fillStyle = 'rgba(124,77,255,0.6)';
      c.beginPath(); c.arc(x+cellW-8, y+8, 4, 0, Math.PI*2); c.fill();
    }
  }
  // Current position
  const gCur = zoneToGrid(gameState.currentZone);
  const px = gCur.col * cellW + cellW/2, py = gCur.row * cellH + cellH/2;
  // Pulse
  const pulse = 6 + Math.sin(Date.now()*0.005)*3;
  c.beginPath(); c.arc(px, py, pulse, 0, Math.PI*2);
  c.fillStyle = 'rgba(255,82,82,0.3)'; c.fill();
  c.beginPath(); c.arc(px, py, 5, 0, Math.PI*2);
  c.fillStyle = '#ff5252'; c.fill();
  c.strokeStyle = '#fff'; c.lineWidth = 2; c.stroke();
}

// ===== NAVIGATION =====
function volverACaminos() { saveProgress(); window.location.href = 'index.html'; }

// ===== SAVE/LOAD =====
async function saveProgress() {
  if (!gameState.userId) return;
  try {
    await db.collection("ciudadano").doc(gameState.userId).collection("juego").doc("perfil").set({
      clase: gameState.clase, nivel: gameState.nivel, xp: gameState.xp,
      zona_actual: gameState.currentZone,
      charCol: gameState.charCol, charRow: gameState.charRow,
      charColors: gameState.charColors,
      ultimoAcceso: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  } catch(e) { console.error("Save error:", e); }
}
setInterval(saveProgress, 30000);

// Touch gesture for carousel swipe
let touchStartX = 0;
document.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; });
document.addEventListener('touchend', function(e) {
  if (!document.getElementById('char-carousel').classList.contains('hidden')) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 50) carouselPrev();
    else if (dx < -50) carouselNext();
  }
});

// ===== MODO MAESTRO (Dev Toolbar) =====
if (IS_MAESTRO) {
  window.addEventListener('load', function() {
    setTimeout(function() {
      const toolbar = document.createElement('div');
      toolbar.id = 'maestro-toolbar';
      toolbar.innerHTML = `
        <div class="maestro-title">🔧 MAESTRO</div>
        <button onclick="maestroResetChar()">🔄 Cambiar Personaje</button>
        <button onclick="maestroTeleport()">🌀 Teletransporte</button>
        <button onclick="maestroToggleStars()">⭐ Estrellas: <span id="maestro-stars">999</span></button>
        <button onclick="maestroZoneInfo()">📍 Info Zona</button>
        <button onclick="document.getElementById('maestro-toolbar').classList.toggle('collapsed')">✕</button>
      `;
      document.body.appendChild(toolbar);

      const style = document.createElement('style');
      style.textContent = `
        #maestro-toolbar {
          position:fixed; top:60px; right:10px; z-index:99999;
          background:rgba(20,20,40,0.92); border:1px solid #7c4dff;
          border-radius:12px; padding:8px; display:flex; flex-direction:column; gap:4px;
          backdrop-filter:blur(8px); box-shadow:0 4px 20px rgba(124,77,255,0.3);
          font-family:Nunito,sans-serif; max-width:180px;
        }
        #maestro-toolbar.collapsed { max-height:30px; overflow:hidden; }
        .maestro-title { color:#b388ff; font-size:11px; font-weight:900; text-align:center; letter-spacing:2px; }
        #maestro-toolbar button {
          background:rgba(124,77,255,0.15); border:1px solid rgba(124,77,255,0.3);
          color:#e0d0ff; padding:6px 10px; border-radius:8px; cursor:pointer;
          font-size:11px; font-weight:700; font-family:Nunito,sans-serif; text-align:left;
          transition:0.2s;
        }
        #maestro-toolbar button:hover { background:rgba(124,77,255,0.3); }
        #maestro-teleport-list {
          position:fixed; top:60px; right:200px; z-index:99999;
          background:rgba(20,20,40,0.95); border:1px solid #7c4dff;
          border-radius:12px; padding:10px; max-height:80vh; overflow-y:auto;
          display:none; width:280px; backdrop-filter:blur(8px);
        }
        #maestro-teleport-list button {
          display:block; width:100%; padding:6px 10px; margin-bottom:3px;
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
          color:#ddd; border-radius:6px; cursor:pointer; font-size:11px;
          font-family:Nunito,sans-serif; text-align:left;
        }
        #maestro-teleport-list button:hover { background:rgba(124,77,255,0.2); }
      `;
      document.head.appendChild(style);

      // Teleport panel
      const tp = document.createElement('div');
      tp.id = 'maestro-teleport-list';
      let btns = '<div style="color:#b388ff;font-weight:900;margin-bottom:6px;">Teletransporte a Zona:</div>';
      for (let i = 1; i <= 45; i++) {
        const info = ZONE_INFO[i];
        if (info) btns += '<button onclick="maestroGoZone('+i+')">' + i + '. ' + info.i + ' ' + info.n + '</button>';
      }
      tp.innerHTML = btns;
      document.body.appendChild(tp);
    }, 1200);
  });
}

function maestroResetChar() {
  gameState.clase = null;
  gameState.gameReady = false;
  document.getElementById('game-hud').classList.add('hidden');
  document.getElementById('mobile-dpad').classList.add('hidden');
  showCarousel();
}

function maestroTeleport() {
  const el = document.getElementById('maestro-teleport-list');
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function maestroGoZone(z) {
  document.getElementById('maestro-teleport-list').style.display = 'none';
  if (!gameState.gameReady) return;
  doZoneTransition(z, 'south');
}

function maestroToggleStars() {
  const vals = [0, 5, 10, 25, 50, 100, 999];
  const cur = vals.indexOf(gameState.stars);
  gameState.stars = vals[(cur + 1) % vals.length];
  updateHUD();
  const el = document.getElementById('maestro-stars');
  if (el) el.textContent = gameState.stars;
}

function maestroZoneInfo() {
  const info = ZONE_INFO[gameState.currentZone];
  const conns = getConnections(gameState.currentZone);
  alert('Zona ' + gameState.currentZone + ': ' + info.n +
    '\nTipo: ' + info.t +
    '\nNorte: ' + (conns.north || '—') +
    '\nSur: ' + (conns.south || '—') +
    '\nEste: ' + (conns.east || '—') +
    '\nOeste: ' + (conns.west || '—') +
    '\nPos: col=' + gameState.charCol + ' row=' + gameState.charRow);
}
