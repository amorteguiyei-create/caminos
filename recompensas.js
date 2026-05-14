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
const BASE_TILE_W = 60;
const BASE_TILE_H = 60;
let TILE_W = 60;
let TILE_H = 60;
const CHAR_SPEED = 5;
const SPAWN_ZONE = 45;
const IS_MAESTRO = new URLSearchParams(window.location.search).get('maestro') === '1';

// ===== CHAT MODERATION =====
const BAD_WORDS = ['pendejo', 'estupido', 'idiota', 'maricon', 'hijo de puta', 'malparido', 'gonorrea', 'perra', 'pirobo', 'carechimba', 'hpta', 'puta', 'mierda', 'culiao', 'perra', 'zorra', 'maldito', 'bastardo', 'hp', 'gonone', 'chimba', 'guevon', 'weon'];

// ===== CLASSES (Rich Role Data) =====
const CLASSES = [
  {id:"eco_maker",name:"Eco Maker",icon:"🛠️",color:"#4CAF50",skill:"Construir y Crear",
    subtitle:"Constructor sostenible de la ciudad",
    desc:"Transforma el entorno mediante acciones responsables que cuidan y restauran el planeta.",
    hat:"helmet",matIcon:"construction",
    bg:"assets/roles/eco_maker_bg.png",
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
    btnText:"Solo por Voto Popular",
    bg:"assets/roles/peace_counselor_bg.png"
  }
];

// Update other BG paths
CLASSES[1].bg = "assets/roles/eco_trader_bg.png";
CLASSES[2].bg = "assets/roles/message_crafter_bg.png";
CLASSES[3].bg = "assets/roles/ecofit_bg.png";
CLASSES[4].bg = "assets/roles/smart_citizen_bg.png";
CLASSES[5].bg = "assets/roles/dream_maker_bg.png";
CLASSES[6].bg = "assets/roles/global_citizen_bg.png";
CLASSES[7].bg = "assets/roles/civic_minded_bg.png";

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

// ===== COLOR PALETTES ALREADY IN zones.js =====

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
  carouselIndex: 0,
  lastMessage: "",
  messageTime: 0
};

let otherPlayers = {}; // Real-time sync
let syncUnsubscribe = null;

// ===== SESSION DEDUP: cada pestaña genera un ID único =====
const SESSION_ID = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
const INACTIVE_TIMEOUT_MS = 2 * 60 * 1000; // 2 minutos de inactividad = jugador fantasma

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
      
      // Validación robusta de zona (asegura que sea número y esté en rango 1-45)
      let savedZone = parseInt(d.zona_actual);
      if (isNaN(savedZone) || savedZone < 1 || savedZone > 45) {
        gameState.currentZone = SPAWN_ZONE;
      } else {
        gameState.currentZone = savedZone;
      }

      gameState.charCol = d.charCol || 7;
      gameState.charRow = d.charRow || 10;
      
      // Auto-corrección si el jugador carga la partida encima de una pared (ej: por edición de mapas)
      const m = ZONE_MAPS[gameState.currentZone];
      function getFreeTile(sc, sr) {
        if (m && m[sr] !== undefined && m[sr][sc] !== undefined && WALKABLE.indexOf(m[sr][sc]) !== -1) return {c: sc, r: sr};
        let q = [{c:sc, r:sr}];
        let vis = {};
        vis[sc+','+sr] = true;
        const dirs = [[0,-1],[0,1],[-1,0],[1,0],[-1,-1],[1,1],[-1,1],[1,-1]];
        while(q.length > 0) {
          let cur = q.shift();
          if (m && m[cur.r] !== undefined && m[cur.r][cur.c] !== undefined && WALKABLE.indexOf(m[cur.r][cur.c]) !== -1) return cur;
          for(let idx=0; idx<dirs.length; idx++) {
            let nc = cur.c + dirs[idx][0], nr = cur.r + dirs[idx][1];
            if(nc>=0 && nc<MAP_W && nr>=0 && nr<MAP_H) {
              let key = nc+','+nr;
              if(!vis[key]) { vis[key] = true; q.push({c:nc, r:nr}); }
            }
          }
        }
        return {c:sc, r:sr};
      }
      
      const safeSpawn = getFreeTile(gameState.charCol, gameState.charRow);
      gameState.charCol = safeSpawn.c;
      gameState.charRow = safeSpawn.r;

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
  
  // Prevenir doble-tap zoom en TODA la página del juego (cubre canvas, D-pad y cualquier zona)
  document.addEventListener('dblclick', function(e) { e.preventDefault(); });
  let lastTapTime = 0;
  document.addEventListener('touchstart', function(e) {
    const now = Date.now();
    if (now - lastTapTime < 300) { e.preventDefault(); }
    lastTapTime = now;
  }, { passive: false });

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

function stopPlayerSync() {
  if (syncUnsubscribe) syncUnsubscribe();
  syncUnsubscribe = null;
}

function initPlayerSync() {
  stopPlayerSync();
  otherPlayers = {}; // Limpiar jugadores del mapa anterior
  syncUnsubscribe = db.collection("ciudadano")
    .where("zona_actual", "==", gameState.currentZone)
    .onSnapshot(snap => {
      snap.docChanges().forEach(change => {
        const data = change.doc.data();
        const id = change.doc.id;
        if (id === gameState.userId) return;

        if (change.type === "removed") {
          delete otherPlayers[id];
          return;
        }

        // --- FILTRO 1: Jugadores inactivos (fantasma) ---
        // Si el jugador no tiene lastActive o tiene más de 2 min de inactividad, ignorarlo
        if (data.lastActive) {
          const lastActiveMs = data.lastActive.toMillis ? data.lastActive.toMillis() : data.lastActive;
          if (Date.now() - lastActiveMs > INACTIVE_TIMEOUT_MS) {
            delete otherPlayers[id]; // Remover si ya estaba
            return;
          }
        } else {
          // No tiene lastActive → jugador viejo, no mostrarlo
          delete otherPlayers[id];
          return;
        }

        // Si el jugador ya existía, interpolar. Si no, teletransportar.
        const prev = otherPlayers[id] || { col: data.charCol, row: data.charRow };
        otherPlayers[id] = {
          id: id,
          name: data.nombre || "Ciudadano",
          clase: data.clase || "eco_maker",
          col: data.charCol,
          row: data.charRow,
          prevCol: prev.col,
          prevRow: prev.row,
          colors: data.charColors || {shirt:"#4CAF50",pants:"#37474F",shoes:"#212121"},
          lastMessage: data.lastMessage || "",
          messageTime: data.messageTime || 0,
          moveProgress: 0,
          lastActiveMs: data.lastActive ? (data.lastActive.toMillis ? data.lastActive.toMillis() : data.lastActive) : 0
        };
        if (otherPlayers[id].col !== otherPlayers[id].prevCol || otherPlayers[id].row !== otherPlayers[id].prevRow) {
           otherPlayers[id].isMoving = true;
        }
      });
    });
}

// Limpieza periódica de jugadores fantasma (cada 15 seg revisa y elimina inactivos)
setInterval(function() {
  const now = Date.now();
  for (let id in otherPlayers) {
    if (otherPlayers[id].lastActiveMs && (now - otherPlayers[id].lastActiveMs > INACTIVE_TIMEOUT_MS)) {
      delete otherPlayers[id];
    }
  }
}, 15000);

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  
  // Ajustar tamaño de tiles para que el mapa completo quepa en la pantalla
  // Calculamos el tile más pequeño que permita ver todo el mapa
  const maxTileW = Math.floor(window.innerWidth / MAP_W);
  const maxTileH = Math.floor(window.innerHeight / MAP_H);
  const fitTile = Math.min(maxTileW, maxTileH);
  // En móvil landscape, usar tiles más pequeños; en desktop, usar el base
  if (window.innerWidth < 1024 || window.innerHeight < 500) {
    TILE_W = Math.max(30, Math.min(fitTile, BASE_TILE_W));
    TILE_H = Math.max(30, Math.min(fitTile, BASE_TILE_H));
  } else {
    TILE_W = BASE_TILE_W;
    TILE_H = BASE_TILE_H;
  }
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
  
  // Ocultar UI colateral de manera segura 
  const infoPanel = document.querySelector('.role-info-panel:not(#color-custom)');
  if (infoPanel) infoPanel.classList.add('hidden');
  
  const strip = document.querySelector('.role-strip-container');
  if (strip) strip.classList.add('hidden');
  
  document.querySelectorAll('.nav-arrow').forEach(el => el.classList.add('hidden'));
  
  const selectBtn = document.getElementById('carousel-select-btn');
  if (selectBtn) selectBtn.classList.add('hidden');
  
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
  
  if (cls.charImg) {
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
  // Debemos ocultar toda la pantalla de selección para revelar el canvas del juego
  document.getElementById('char-carousel').classList.add('hidden');
  
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
async function startGame() {
  gameState.gameReady = true;
  document.getElementById('game-hud').classList.remove('hidden');
  document.getElementById('mobile-dpad').classList.remove('hidden');
  initPlayerSync();
  await saveProgress(); // PRIMERO registrar SESSION_ID en Firestore
  initSessionGuard(); // DESPUÉS activar el guard (ya tiene nuestro sessionId)
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
      saveProgress(); // Actualizar posición en servidor
      checkBuildingAt(gameState.charCol, gameState.charRow);
      checkEdgeTransition();
      checkPortalPad();
    }
  }

  // Update other players move progress
  for (let id in otherPlayers) {
    let p = otherPlayers[id];
    if (p.isMoving) {
      p.moveProgress += dt * CHAR_SPEED;
      if (p.moveProgress >= 1) {
        p.moveProgress = 1;
        p.isMoving = false;
        p.prevCol = p.col;
        p.prevRow = p.row;
      }
    }
  }

  // Fade out messages
  if (gameState.messageTime > 0) gameState.messageTime -= dt;

  // Camera follow
  const charScreen = tileToScreen(
    lerp(gameState.charPrevCol, gameState.charTargetCol, gameState.charMoving ? gameState.charMoveProgress : 1),
    lerp(gameState.charPrevRow, gameState.charTargetRow, gameState.charMoving ? gameState.charMoveProgress : 1)
  );
  camera.targetX = window.innerWidth / 2 - charScreen.x;
  camera.targetY = window.innerHeight / 2 - charScreen.y;
  
  // Centrar o clamp cámara según si el mapa cabe en pantalla
  const mapPixelW = MAP_W * TILE_W;
  const mapPixelH = MAP_H * TILE_H;
  
  // Si el mapa cabe horizontalmente en la pantalla, centrarlo
  if (mapPixelW <= window.innerWidth) {
    camera.targetX = (window.innerWidth - mapPixelW) / 2;
  } else {
    // Si el mapa es más ancho que la pantalla, clamp para no salirse
    camera.targetX = Math.max(window.innerWidth - mapPixelW, Math.min(0, camera.targetX));
  }
  
  // Si el mapa cabe verticalmente en la pantalla, centrarlo
  if (mapPixelH <= window.innerHeight) {
    camera.targetY = (window.innerHeight - mapPixelH) / 2;
  } else {
    camera.targetY = Math.max(window.innerHeight - mapPixelH, Math.min(0, camera.targetY));
  }
  
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
  stopPlayerSync();

  setTimeout(function() {
    gameState.currentZone = targetZone;
    let tryCol = Math.floor(MAP_W/2);
    let tryRow = Math.floor(MAP_H/2);
    
    if (fromDir === 'north') { tryRow = MAP_H - 2; }
    else if (fromDir === 'south') { tryRow = 1; }
    else if (fromDir === 'east') { tryCol = 1; }
    else if (fromDir === 'west') { tryCol = MAP_W - 2; }
    
    // Auto-corrección de casilla (Buscar la casilla libre más cercana si spawn está bloqueado)
    const m = ZONE_MAPS[targetZone];
    function getFreeTile(sc, sr) {
      if (m && m[sr] !== undefined && m[sr][sc] !== undefined && WALKABLE.indexOf(m[sr][sc]) !== -1) return {c: sc, r: sr};
      let q = [{c:sc, r:sr}];
      let vis = {};
      vis[sc+','+sr] = true;
      const dirs = [[0,-1],[0,1],[-1,0],[1,0],[-1,-1],[1,1],[-1,1],[1,-1]];
      while(q.length > 0) {
        let cur = q.shift();
        if (m && m[cur.r] !== undefined && m[cur.r][cur.c] !== undefined && WALKABLE.indexOf(m[cur.r][cur.c]) !== -1) return cur;
        for(let idx=0; idx<dirs.length; idx++) {
          let nc = cur.c + dirs[idx][0], nr = cur.r + dirs[idx][1];
          if(nc>=0 && nc<MAP_W && nr>=0 && nr<MAP_H) {
            let key = nc+','+nr;
            if(!vis[key]) { vis[key] = true; q.push({c:nc, r:nr}); }
          }
        }
      }
      return {c:sc, r:sr};
    }
    
    const safeSpawn = getFreeTile(tryCol, tryRow);
    gameState.charCol = safeSpawn.c;
    gameState.charRow = safeSpawn.r;

    gameState.charTargetCol = gameState.charCol;
    gameState.charTargetRow = gameState.charRow;
    gameState.charPrevCol = gameState.charCol;
    gameState.charPrevRow = gameState.charRow;
    updateHUD();
    saveProgress();
    initPlayerSync();
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

  // Agregar siempre todos los edificios primero, sin requerir que su colisión sea tile===3
  if (zone.b) {
    for (let i = 0; i < zone.b.length; i++) {
        const b = zone.b[i];
        let d = (b.r + b.h * 0.7) * 100 + b.c;
        if (b.shape === "volleyball_court" || b.shape === "aux_football_court") d = 0; // Render behind characters
        if (b.shape === "hs_bridge") d = (b.r + b.h + 5) * 100 + b.c + 1000; // Render above characters
        objects.push({type: "building", b: b, depth: d});
    }
  }

  for (let row = 0; row < MAP_H; row++) {
    for (let col = 0; col < MAP_W; col++) {
      const tile = map[row][col];
      if (tile === 0) continue;
      const pos = tileToScreen(col, row);
      if (tile === 3) {
        // No dibujar cesped bajo los edificios compactos

      } else if (tile === 4) {
        drawSquare(pos.x, pos.y, TILE_COLORS[1]);
        objects.push({type:"tree",x:pos.x,y:pos.y,depth:row*100+col});
      } else if (tile === 5) {
        drawSquare(pos.x, pos.y, TILE_COLORS[5]);
        drawFountain(pos.x, pos.y);
      } else if (tile === 6) {
        drawSquare(pos.x, pos.y, TILE_COLORS[1]);
        drawFlower(pos.x, pos.y, col+row);
      } else if (tile === 7) {
        drawWater(pos.x, pos.y);
      } else if (tile === 9) {
        drawSquare(pos.x, pos.y, TILE_COLORS[9]);
        drawPortalEffect(pos.x, pos.y);
      } else {
        const colors = TILE_COLORS[tile];
        if (colors) drawSquare(pos.x, pos.y, colors);
      }
    }
  }

  // Other Players
  for (let id in otherPlayers) {
    let p = otherPlayers[id];
    const pCol = lerp(p.prevCol, p.col, p.moveProgress);
    const pRow = lerp(p.prevRow, p.row, p.moveProgress);
    const pPos = tileToScreen(pCol, pRow);
    objects.push({type:"other",x:pPos.x,y:pPos.y,depth:pRow*100+pCol, player:p});
  }

  // Local Character
  const cCol = lerp(gameState.charPrevCol, gameState.charTargetCol, gameState.charMoving ? gameState.charMoveProgress : 1);
  const cRow = lerp(gameState.charPrevRow, gameState.charTargetRow, gameState.charMoving ? gameState.charMoveProgress : 1);
  const charPos = tileToScreen(cCol, cRow);
  objects.push({type:"char",x:charPos.x,y:charPos.y,depth:cRow*100+cCol});

  objects.sort(function(a,b){ return a.depth - b.depth; });
  objects.forEach(function(obj) {
    if (obj.type === "building") drawBuilding2D(obj.b);
    else if (obj.type === "tree") drawTree(obj.x, obj.y);
    else if (obj.type === "char") {
       drawCharacter(obj.x, obj.y, {name: gameState.userName, colors: gameState.charColors, clase: gameState.clase, msg: gameState.lastMessage, msgTime: gameState.messageTime});
    } else if (obj.type === "other") {
       drawCharacter(obj.x, obj.y, {name: obj.player.name, colors: obj.player.colors, clase: obj.player.clase, msg: obj.player.lastMessage, msgTime: obj.player.messageTime});
    }
  });

  // Building labels and Interaction points
  (zone.b || []).forEach(function(b) {
    // Si el edificio tiene un punto exacto de interacción y no está oculto
    if (b.ix !== undefined && b.iy !== undefined && !b.hideMarker) {
      const p = tileToScreen(b.ix, b.iy);
      drawInteractionMarker(p.x + TILE_W/2, p.y + TILE_H/2);
    }
    const bx = b.c + b.w/2, by = b.r;
    const pos = tileToScreen(bx, by);
    if (b.n) drawBuildingLabel(pos.x, pos.y - 20, b.i, b.n, b.s, gameState.stars >= b.s);
  });

  ctx.restore();
}

function drawInteractionMarker(x, y) {
  // Círculo pequeño rojo que palpita para indicar punto de interacción
  const pulse = 4 + Math.sin(Date.now()*0.008)*2;
  ctx.beginPath();
  ctx.arc(x, y, pulse + 2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(229, 57, 53, 0.4)";
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#e53935"; // Rojo intenso
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1;
  ctx.stroke();
}

// ===== ISOMETRIC MATH =====
function tileToScreen(col, row) {
  return { x: col * TILE_W, y: row * TILE_H };
}
function screenToTile(sx, sy) {
  const x = sx - camera.x, y = sy - camera.y;
  return { col: Math.floor(x / TILE_W), row: Math.floor(y / TILE_H) };
}
function lerp(a, b, t) { return a + (b-a) * Math.min(1, Math.max(0, t)); }

// ===== DRAWING =====
function drawSquare(x, y, colors) {
  ctx.fillStyle = colors.top;
  ctx.fillRect(x, y, TILE_W, TILE_H);
  ctx.strokeStyle = "rgba(0,0,0,0.1)";
  ctx.lineWidth = 0.5;
  ctx.strokeRect(x, y, TILE_W, TILE_H);
}

// ===== 2D BUILDING SYSTEM =====
// Cache para saber si ya dibujamos un edificio en este frame
// Legacy building dispatch removed because buildings are now natively iterated over in render()

function drawBuilding2D(b) {
  const pos = tileToScreen(b.c, b.r);
  const bw = b.w * TILE_W;
  const bh = b.h * TILE_H;
  const x = pos.x;
  const y = pos.y;

  // Seleccionar estilo según el icono/tipo del edificio
  // Primero evaluar forma (shape) personalizada
  if (b.shape === "heroes_triangle") drawHeroesBuilding(x, y, bw, bh, b);
  else if (b.shape === "neverland_triangle") drawNeverlandBuilding(x, y, bw, bh, b);
  else if (b.shape === "neverland_triangle_2") drawNeverlandBuilding2(x, y, bw, bh, b);
  else if (b.shape === "atelier_triangle") drawAtelierBuilding(x, y, bw, bh, b);
  else if (b.shape === "pandora_triangle") drawPandoraBuilding(x, y, bw, bh, b);
  else if (b.shape === "dystopia_triangle") drawDystopiaBuilding(x, y, bw, bh, b);
  else if (b.shape === "dystopia_triangle_2") drawDystopiaTriangle2Building(x, y, bw, bh, b);
  else if (b.shape === "volleyball_court") drawVolleyballCourt(x, y, bw, bh, b);
  else if (b.shape === "aux_football_court") drawAuxFootballCourt(x, y, bw, bh, b);
  else if (b.shape === "hs_wing") drawHighSchoolWing(x, y, bw, bh, b);
  else if (b.shape === "hs_bridge") drawHighSchoolBridge(x, y, bw, bh, b);
  else {
    // Si no tiene shape específica, seleccionar estilo según el icono/tipo del edificio
    const icon = b.i || "🏢";
    if (icon === "🎭") drawCentroCultural(x, y, bw, bh, b);
    else if (icon === "🏫") drawSchoolBuilding(x, y, bw, bh, b);
    else if (icon === "🏛️") drawEdificioCentral(x, y, bw, bh, b);
    else if (icon === "🍽️" || icon === "☕") drawRestaurante(x, y, bw, bh, b);
    else if (icon === "💧" || icon === "♻️") drawPlantaAgua(x, y, bw, bh, b);
    else if (icon === "🏢") drawOficinas(x, y, bw, bh, b);
    else if (icon === "🚌" || icon === "🅿️") drawParqueadero(x, y, bw, bh, b);
    else if (icon === "🚪") drawPorteria(x, y, bw, bh, b);
    else if (icon === "🏔️") drawMontana(x, y, bw, bh, b);
    else if (icon === "📦" || icon === "🏗️") drawBodega(x, y, bw, bh, b);
    else if (icon === "🌀") drawPortalBuilding(x, y, bw, bh, b);
    else drawGenericBuilding(x, y, bw, bh, b);
  }
}

// ===== EDIFICIO ATELIER (TRIÁNGULAR HACIA ABAJO) =====
function drawAtelierBuilding(x, y, bw, bh, b) {
  // Sombra
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.moveTo(x - 5, y + 10);
  ctx.lineTo(x + bw + 5, y + 10);
  ctx.lineTo(x + bw/2, y + bh + 10);
  ctx.fill();

  // Cuerpo principal Verde Teja
  ctx.fillStyle = "#388e3c";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + bw, y);
  ctx.lineTo(x + bw/2, y + bh);
  ctx.closePath();
  ctx.fill();

  // Mitad sombreada
  ctx.fillStyle = "#1b5e20";
  ctx.beginPath();
  ctx.moveTo(x + bw/2, y);
  ctx.lineTo(x + bw, y);
  ctx.lineTo(x + bw/2, y + bh);
  ctx.closePath();
  ctx.fill();

  // Tiras decorativas
  ctx.strokeStyle = "#81c784";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + 15, y + 15);
  ctx.lineTo(x + bw - 15, y + 15);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x + 10, y + 25);
  ctx.lineTo(x + bw/2, y + bh - 10);
  ctx.stroke();

  // Logo / Arte
  ctx.save();
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.font = "bold " + Math.floor(TILE_W * 0.4) + "px Arial";
  ctx.fillText("🎨", x + bw/2, y + bh/2 - 5);
  
  ctx.font = "bold " + Math.floor(TILE_W * 0.16) + "px Arial";
  ctx.fillText("ATELIER", x + bw/2, y + bh/2 + 12);
  ctx.fillText("ARTE & INN", x + bw/2, y + bh/2 + 24);
  ctx.restore();
}

// ===== EDIFICIO PANDORA (TRIANGULAR ODS 15 HACIA DERECHA) =====
function drawPandoraBuilding(x, y, bw, bh, b) {
  // Sombra
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.moveTo(x - 5, y - 5);
  ctx.lineTo(x + bw + 10, y + bh/2 + 5);
  ctx.lineTo(x - 5, y + bh + 10);
  ctx.fill();

  // Cuerpo principal Verde ODS 15
  ctx.fillStyle = "#56c02b";
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + bw, y + bh/2);
  ctx.lineTo(x, y + bh);
  ctx.closePath();
  ctx.fill();

  // Mitad sombreada
  ctx.fillStyle = "#3e8c1f";
  ctx.beginPath();
  ctx.moveTo(x, y + bh/2);
  ctx.lineTo(x + bw, y + bh/2);
  ctx.lineTo(x, y + bh);
  ctx.closePath();
  ctx.fill();

  // Tiras protectoras
  ctx.strokeStyle = "#a2eb83";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + 15, y + 15);
  ctx.lineTo(x + bw - 15, y + bh/2);
  ctx.lineTo(x + 15, y + bh - 15);
  ctx.stroke();

  // Logo ODS 15
  ctx.save();
  ctx.fillStyle = "#fff";
  
  // "15" Text
  ctx.font = "bold " + Math.floor(TILE_W * 0.7) + "px Arial";
  ctx.textAlign = "left";
  ctx.fillText("15", x + TILE_W * 0.4, y + bh/2 + 8);
  
  // Text
  ctx.font = "bold " + Math.floor(TILE_W * 0.16) + "px Arial";
  ctx.fillText("LIFE", x + TILE_W * 1.5, y + bh/2 - 10);
  ctx.fillText("ON LAND", x + TILE_W * 1.5, y + bh/2 + 5);
  
  // Arbol / pajaros icon simple
  ctx.beginPath();
  ctx.arc(x + TILE_W * 2, y + bh/2 + 18, 5, 0, Math.PI*2);
  ctx.fill();
  ctx.fillRect(x + TILE_W * 1.9, y + bh/2 + 18, 4, 10);
  ctx.restore();
}

// ===== EDIFICIO DYSTOPIA (TRIANGULAR ODS 11 HACIA IZQUIERDA) =====
function drawDystopiaBuilding(x, y, bw, bh, b) {
  // Sombra
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.moveTo(x + bw, y - 5);
  ctx.lineTo(x - 5, y + bh/2 + 5);
  ctx.lineTo(x + bw, y + bh + 10);
  ctx.fill();

  // Cuerpo principal Naranja ODS 11
  ctx.fillStyle = "#fd9d24";
  ctx.beginPath();
  ctx.moveTo(x + bw, y);
  ctx.lineTo(x, y + bh/2);
  ctx.lineTo(x + bw, y + bh);
  ctx.closePath();
  ctx.fill();

  // Mitad sombreada
  ctx.fillStyle = "#d17b11";
  ctx.beginPath();
  ctx.moveTo(x + bw, y + bh/2);
  ctx.lineTo(x + 5, y + bh/2);
  ctx.lineTo(x + bw, y + bh);
  ctx.closePath();
  ctx.fill();

  // Tiras protectoras
  ctx.strokeStyle = "#ffcca1";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + bw - 15, y + 15);
  ctx.lineTo(x + 15, y + bh/2);
  ctx.lineTo(x + bw - 15, y + bh - 15);
  ctx.stroke();

  // Logo ODS 11
  ctx.save();
  ctx.fillStyle = "#fff";
  
  // "11" Text
  ctx.font = "bold " + Math.floor(TILE_W * 0.7) + "px Arial";
  ctx.textAlign = "right";
  ctx.fillText("11", x + bw - TILE_W * 2.5, y + bh/2 + 8);
  
  // Text
  ctx.textAlign = "left";
  ctx.font = "bold " + Math.floor(TILE_W * 0.14) + "px Arial";
  ctx.fillText("SUSTAINABLE", x + bw - TILE_W * 2.3, y + bh/2 - 10);
  ctx.fillText("CITIES AND", x + bw - TILE_W * 2.3, y + bh/2 + 2);
  ctx.fillText("COMMUNITIES", x + bw - TILE_W * 2.3, y + bh/2 + 14);
  
  // Icono casitas ODS 11
  ctx.fillRect(x + bw - TILE_W * 1.2, y + bh/2 + 20, 8, 12);
  ctx.fillRect(x + bw - TILE_W * 1.5, y + bh/2 + 14, 8, 18);
  ctx.restore();
}

// ===== CANCHA DE VOLEIBOL =====
function drawVolleyballCourt(x, y, bw, bh, b) {
  // Borde verde exterior
  ctx.fillStyle = "#4caf50";
  ctx.fillRect(x, y, bw, bh);

  const paddingX = TILE_W * 0.2;
  const paddingY = TILE_H * 0.2;
  const innerX = x + paddingX;
  const innerY = y + paddingY;
  const innerW = bw - paddingX * 2;
  const innerH = bh - paddingY * 2;

  // Zona de juego naranja/roja suave
  ctx.fillStyle = "#e57373"; 
  ctx.fillRect(innerX, innerY, innerW, innerH);

  // Líneas blancas y malla
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 3;
  ctx.strokeRect(innerX, innerY, innerW, innerH);

  const midX = x + bw / 2;
  // Malla central (línea)
  ctx.beginPath();
  ctx.moveTo(midX, innerY);
  ctx.lineTo(midX, innerY + innerH);
  ctx.stroke();
  
  // Líneas de ataque (1/3 de cada lado)
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(midX - innerW * 0.16, innerY);
  ctx.lineTo(midX - innerW * 0.16, innerY + innerH);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(midX + innerW * 0.16, innerY);
  ctx.lineTo(midX + innerW * 0.16, innerY + innerH);
  ctx.stroke();

  // Postes de la malla
  ctx.fillStyle = "#424242";
  ctx.fillRect(midX - 2, innerY - 6, 4, 10);
  ctx.fillRect(midX - 2, innerY + innerH - 4, 4, 10);
}

// ===== ALAS DE HIGH SCHOOL (ROCA/CEMENTO) =====
function drawHighSchoolWing(x, y, bw, bh, b) {
  // Sombra proyectada
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(x + 5, y + 8, bw, bh);

  // Muro frontal
  ctx.fillStyle = "#555555";
  ctx.fillRect(x, y + bh * 0.2, bw, bh * 0.8);

  // Techo sólido sin movimiento (color gris roca)
  ctx.fillStyle = "#8a8a8a";
  ctx.fillRect(x, y, bw, bh);
  
  // Agregar un patrón de roca pero de forma ESTÁTICA y sutil
  ctx.fillStyle = "#636363";
  // Usamos una cuadrícula fija para pintar puntitos rocosos
  const divX = bw / (TILE_W * 0.5);
  const divY = bh / (TILE_H * 0.5);
  const sX = bw / divX;
  const sY = bh / divY;
  for (let r=0; r<divY; r++) {
    for (let c=0; c<divX; c++) {
      if ((r + c) % 3 === 0) {
        ctx.fillRect(x + c * sX + 2, y + r * sY + 2, 4, 4);
      } else if ((r + c) % 5 === 0) {
        ctx.fillStyle = "#aaaaaa";
        ctx.fillRect(x + c * sX + 1, y + r * sY + 5, 2, 2);
        ctx.fillStyle = "#636363"; // Reset
      }
    }
  }
}

// ===== SUPER ESTRUCTURA (MALLA ROJA SÓLIDA) =====
function drawHighSchoolBridge(x, y, bw, bh, b) {
  // Dibujamos un bloque rojo sólido directamente. 
  // La profundidad (z-index) está configurada muy alta, así que el jugador
  // pasará naturalmente por debajo del cuadro pintado aquí.
  
  ctx.fillStyle = "#b71c1c"; // Rojo oscuro sólido
  ctx.fillRect(x, y, bw, bh);
  
  // Patrón perforado estático y sutil (malla)
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  const rows = 8;
  const cols = Math.floor(bw / (TILE_W * 0.3));
  const spacX = bw / cols;
  const spacY = bh / rows;
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const offsetX = (r % 2 === 0) ? spacX * 0.5 : 0;
      ctx.beginPath();
      ctx.arc(x + c * spacX + offsetX + spacX * 0.2, y + r * spacY + spacY * 0.5, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Pequeño marco oscuro en los bordes derecho e izquierdo (columnas soporte visuales)
  ctx.fillStyle = "#2c2c2c";
  ctx.fillRect(x, y, TILE_W * 0.3, bh);
  ctx.fillRect(x + bw - TILE_W * 0.3, y, TILE_W * 0.3, bh);
}

// ===== EDIFICIO DYSTOPIA (TRIANGULO TIPO 2 ODS 11) =====
function drawDystopiaTriangle2Building(x, y, bw, bh, b) {
  // Sombra
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.moveTo(x - 5, y - 5);
  ctx.lineTo(x - 5, y + bh + 10);
  ctx.lineTo(x + bw + 10, y + bh + 10);
  ctx.fill();

  // Cuerpo principal Naranja ODS 11
  ctx.fillStyle = "#fd9d24";
  ctx.beginPath();
  ctx.moveTo(x, y); // Top left
  ctx.lineTo(x, y + bh); // Bottom left
  ctx.lineTo(x + bw, y + bh); // Bottom right
  ctx.closePath();
  ctx.fill();

  // Color secundario (Tiras oscuras simulando ventanas/estructura del ODS 11)
  ctx.fillStyle = "#d17b11";
  ctx.beginPath();
  ctx.moveTo(x, y + bh * 0.3);
  ctx.lineTo(x + bw * 0.5, y + bh * 0.8);
  ctx.lineTo(x, y + bh * 0.8);
  ctx.closePath();
  ctx.fill();

  // Borde arquitectónico para darle volumen
  ctx.strokeStyle = "#ffcca1";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + 2, y + 2);
  ctx.lineTo(x + 2, y + bh - 2);
  ctx.lineTo(x + bw - 2, y + bh - 2);
  ctx.closePath();
  ctx.stroke();
}

// ===== EDIFICIO NEVERLAND 2 (TRIÁNGULO RECTÁNGULO ODS 12) =====
function drawNeverlandBuilding2(x, y, bw, bh, b) {
  // Sombra
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.moveTo(x - 5, y + 10);
  ctx.lineTo(x + bw + 10, y + 10);
  ctx.lineTo(x + bw + 10, y + bh + 10);
  ctx.fill();

  // Cuerpo principal Mostaza ODS 12
  ctx.fillStyle = "#bf8b2e"; // Color oro/mostaza
  ctx.beginPath();
  ctx.moveTo(x, y); // Top left
  ctx.lineTo(x + bw, y); // Top right
  ctx.lineTo(x + bw, y + bh); // Bottom right
  ctx.closePath();
  ctx.fill();

  // Borde arquitectónico para darle volumen
  ctx.strokeStyle = "#e2b868"; // Oro brillante
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + bw, y);
  ctx.lineTo(x + bw, y + bh);
  ctx.closePath();
  ctx.stroke();
}

// ===== EDIFICIO NEVERLAND (TRIANGULAR ODS 12) =====
function drawNeverlandBuilding(x, y, bw, bh, b) {
  // Triángulo que apunta hacia arriba
  // Sombra
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.moveTo(x + bw/2, y + 10);
  ctx.lineTo(x - 5, y + bh + 10);
  ctx.lineTo(x + bw + 5, y + bh + 10);
  ctx.fill();

  // Cuerpo principal Mostaza ODS 12
  ctx.fillStyle = "#bf8b2e"; // Color oro/mostaza
  ctx.beginPath();
  ctx.moveTo(x + bw/2, y); // Punta arriba
  ctx.lineTo(x, y + bh); // Abajo izq
  ctx.lineTo(x + bw, y + bh); // Abajo der
  ctx.closePath();
  ctx.fill();

  // Techo / Relieve oscuro
  ctx.fillStyle = "#9c7126"; // Oro oscuro
  ctx.beginPath();
  ctx.moveTo(x + bw/2, y);
  ctx.lineTo(x + bw/2, y + bh);
  ctx.lineTo(x + bw, y + bh); // Lado derecho más oscuro para profundidad
  ctx.closePath();
  ctx.fill();

  // Tiras decorativas
  ctx.strokeStyle = "#e2b868"; // Oro brillante
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + bw/2, y + 15);
  ctx.lineTo(x + 15, y + bh - 10);
  ctx.lineTo(x + bw - 15, y + bh - 10);
  ctx.closePath();
  ctx.stroke();

  // Logo ODS 12
  ctx.save();
  ctx.fillStyle = "#fff";
  
  // Texto "12" a la izquierda
  ctx.font = "bold " + Math.floor(TILE_W * 0.7) + "px Arial";
  ctx.textAlign = "right";
  ctx.fillText("12", x + bw/2 - TILE_W * 0.8, y + bh - 18);
  
  // Textos ODS 12
  ctx.textAlign = "left";
  ctx.font = "bold " + Math.floor(TILE_W * 0.16) + "px Arial";
  ctx.fillText("RESPONSIBLE", x + bw/2 - TILE_W * 0.6, y + bh - 34);
  ctx.fillText("CONSUMPTION", x + bw/2 - TILE_W * 0.6, y + bh - 24);
  ctx.fillText("AND PRODUCTION", x + bw/2 - TILE_W * 0.6, y + bh - 14);
  
  // Símbolo infinito abstracto ODS 12
  const ix = x + bw/2 + TILE_W * 1.5;
  const iy = y + bh - 23;
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  // Curvas de infinito simuladas por arcos / bezier
  ctx.moveTo(ix, iy);
  ctx.bezierCurveTo(ix - 16, iy - 12, ix - 16, iy + 12, ix, iy);
  ctx.bezierCurveTo(ix + 16, iy - 12, ix + 16, iy + 12, ix, iy);
  ctx.stroke();
  
  // Flechita final del infinito (abajo al centro apuntando a la derecha)
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(ix - 1, iy + 5);
  ctx.lineTo(ix + 7, iy + 8);
  ctx.lineTo(ix - 1, iy + 11);
  ctx.fill();

  ctx.restore();
}

// ===== EDIFICIO HEROES (TRIANGULAR ODS 1) =====
function drawHeroesBuilding(x, y, bw, bh, b) {
  // Triángulo que apunta hacia la izquierda
  
  // Sombra
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.moveTo(x + bw, y + 10); // Arriba derecha
  ctx.lineTo(x - 5, y + bh/2 + 5); // Punta izquierda
  ctx.lineTo(x + bw, y + bh + 10); // Abajo derecha
  ctx.fill();

  // Cuerpo principal Rojo ODS 1
  ctx.fillStyle = "#e53935"; // Rojo intenso
  ctx.beginPath();
  ctx.moveTo(x + bw, y); 
  ctx.lineTo(x, y + bh / 2); // Punta perfectamente centrada
  ctx.lineTo(x + bw, y + bh); 
  ctx.closePath();
  ctx.fill();

  // Techo / Relieve oscuro
  ctx.fillStyle = "#c62828"; // Rojo oscuro
  ctx.beginPath();
  ctx.moveTo(x + bw, y + bh/2);
  ctx.lineTo(x + 5, y + bh / 2);
  ctx.lineTo(x + bw, y + bh);
  ctx.closePath();
  ctx.fill();

  // Tiras protectoras o líneas arquitectónicas (borde brillante blanco/rojo claro)
  ctx.strokeStyle = "#ffcdd2";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + bw - 15, y + 15);
  ctx.lineTo(x + 15, y + bh / 2);
  ctx.lineTo(x + bw - 15, y + bh - 15);
  ctx.stroke();

  // Logo ODS 1 en el centro del edificio
  ctx.save();
  ctx.fillStyle = "#fff";
  
  // "1" Text
  ctx.font = "bold " + Math.floor(TILE_W * 0.7) + "px Arial";
  ctx.textAlign = "right";
  ctx.fillText("1", x + bw - TILE_W * 2.3, y + bh/2 + 3);
  
  // "NO POVERTY" Text apilado
  ctx.textAlign = "left";
  ctx.font = "bold " + Math.floor(TILE_W * 0.18) + "px Arial";
  ctx.fillText("NO", x + bw - TILE_W * 2.1, y + bh/2 - 6);
  ctx.fillText("POVERTY", x + bw - TILE_W * 2.1, y + bh/2 + 4);
  
  // Siluetas de la familia ODS 1 (abstracción geométrica)
  const tx = x + bw - TILE_W * 1.5;
  const ty = y + bh/2 + 10;
  
  // Línea gruesa que representa las "manos unidas"
  ctx.fillRect(tx - 10, ty + 12, 36, 1.5);
  
  // Dibujar 5 siluetas (Adulto - Niño - Adulto - Adulto - Niño)
  const sizes = [
    {x: tx - 5, h: 10, w: 5, y: 14}, // Adulto
    {x: tx + 3, h: 6, w: 3, y: 16}, // Niño
    {x: tx + 10, h: 10, w: 5, y: 14, skirt: true}, // Mujer
    {x: tx + 17, h: 10, w: 5, y: 14, skirt: true}, // Mujer
    {x: tx + 25, h: 6, w: 3, y: 16} // Niño
  ];
  
  sizes.forEach(p => {
    // Cabeza
    ctx.beginPath();
    ctx.arc(p.x, ty + p.y - p.h - 2, p.w/1.8, 0, Math.PI*2);
    ctx.fill();
    // Cuerpo
    ctx.beginPath();
    if (p.skirt) {
      // Falda (triángulo) para silueta femenina en ODS
      ctx.moveTo(p.x, ty + p.y - p.h + 1); // Cuello
      ctx.lineTo(p.x - p.w/1.2, ty + p.y); // Pie izq
      ctx.lineTo(p.x + p.w/1.2, ty + p.y); // Pie der
      ctx.fill();
    } else {
      ctx.fillRect(p.x - p.w/2, ty + p.y - p.h, p.w, p.h);
    }
  });

  ctx.restore();
}

// ===== CENTRO CULTURAL ELÍAS PARDO GARCÍA =====
function drawCentroCultural(x, y, bw, bh, b) {
  const cx = x + bw/2;
  
  // Sombra del edificio
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.beginPath();
  ctx.roundRect(x + 6, y + 8, bw, bh - 4, 4);
  ctx.fill();
  
  // Pared principal (crema/beige elegante)
  const wallGrad = ctx.createLinearGradient(x, y, x, y + bh);
  wallGrad.addColorStop(0, "#f5e6c8");
  wallGrad.addColorStop(1, "#d4b896");
  ctx.fillStyle = wallGrad;
  ctx.beginPath();
  ctx.roundRect(x + 2, y + bh * 0.2, bw - 4, bh * 0.8, [0, 0, 4, 4]);
  ctx.fill();
  
  // Techo tipo teatro (rojo oscuro con forma triangular)
  ctx.fillStyle = "#8b1a1a";
  ctx.beginPath();
  ctx.moveTo(x - 4, y + bh * 0.22);
  ctx.lineTo(cx, y - bh * 0.08);
  ctx.lineTo(x + bw + 4, y + bh * 0.22);
  ctx.closePath();
  ctx.fill();
  
  // Detalle del techo — franja dorada
  ctx.strokeStyle = "#daa520";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 2, y + bh * 0.21);
  ctx.lineTo(x + bw + 2, y + bh * 0.21);
  ctx.stroke();
  
  // Columnas clásicas
  const numCols = Math.max(4, Math.floor(bw / (TILE_W * 0.8)));
  const colSpacing = (bw - 20) / (numCols - 1);
  ctx.fillStyle = "#e8dcc8";
  for (let i = 0; i < numCols; i++) {
    const cx2 = x + 10 + i * colSpacing;
    const colW = Math.max(4, TILE_W * 0.1);
    // Columna
    ctx.fillStyle = "#e8dcc8";
    ctx.fillRect(cx2 - colW/2, y + bh * 0.22, colW, bh * 0.65);
    // Capitel (parte superior)
    ctx.fillStyle = "#daa520";
    ctx.fillRect(cx2 - colW/2 - 2, y + bh * 0.22, colW + 4, 3);
    // Base
    ctx.fillRect(cx2 - colW/2 - 1, y + bh * 0.85, colW + 2, 3);
  }
  
  // Entrada central con arco
  const doorW = bw * 0.22;
  const doorH = bh * 0.4;
  const doorX = cx - doorW / 2;
  const doorY = y + bh - doorH - 4;
  
  // Arco de la entrada
  ctx.fillStyle = "#3e2723";
  ctx.beginPath();
  ctx.moveTo(doorX, doorY + doorH);
  ctx.lineTo(doorX, doorY + doorH * 0.3);
  ctx.arc(cx, doorY + doorH * 0.3, doorW / 2, Math.PI, 0);
  ctx.lineTo(doorX + doorW, doorY + doorH);
  ctx.closePath();
  ctx.fill();
  
  // Interior oscuro del arco
  ctx.fillStyle = "#1a0e0a";
  ctx.beginPath();
  ctx.moveTo(doorX + 3, doorY + doorH);
  ctx.lineTo(doorX + 3, doorY + doorH * 0.35);
  ctx.arc(cx, doorY + doorH * 0.35, doorW / 2 - 3, Math.PI, 0);
  ctx.lineTo(doorX + doorW - 3, doorY + doorH);
  ctx.closePath();
  ctx.fill();
  
  // Cortinas de teatro (detalles rojos en la puerta)
  ctx.fillStyle = "rgba(139,26,26,0.6)";
  ctx.beginPath();
  ctx.moveTo(doorX + 3, doorY + doorH * 0.35);
  ctx.quadraticCurveTo(cx - doorW * 0.1, doorY + doorH * 0.5, doorX + 3, doorY + doorH * 0.7);
  ctx.lineTo(doorX + 3, doorY + doorH * 0.35);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(doorX + doorW - 3, doorY + doorH * 0.35);
  ctx.quadraticCurveTo(cx + doorW * 0.1, doorY + doorH * 0.5, doorX + doorW - 3, doorY + doorH * 0.7);
  ctx.lineTo(doorX + doorW - 3, doorY + doorH * 0.35);
  ctx.fill();
  
  // Ventanas laterales (vitrales)
  const winW = TILE_W * 0.3;
  const winH = bh * 0.25;
  const winsLeft = Math.floor((cx - doorW/2 - x - 20) / (winW + 8));
  const winsRight = winsLeft;
  
  for (let i = 0; i < winsLeft; i++) {
    const wx = x + 12 + i * (winW + 8);
    drawStainedWindow(wx, y + bh * 0.35, winW, winH);
  }
  for (let i = 0; i < winsRight; i++) {
    const wx = cx + doorW/2 + 8 + i * (winW + 8);
    drawStainedWindow(wx, y + bh * 0.35, winW, winH);
  }
  
  // Letrero "CENTRO CULTURAL"
  ctx.font = "bold " + Math.max(8, TILE_W * 0.18) + "px Nunito";
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#3e2723";
  ctx.lineWidth = 2;
  ctx.strokeText("CENTRO CULTURAL", cx, y + bh * 0.17);
  ctx.fillText("CENTRO CULTURAL", cx, y + bh * 0.17);
  
  // Escalones de la entrada
  for (let s = 0; s < 3; s++) {
    ctx.fillStyle = s % 2 === 0 ? "#b0a090" : "#c4b8a0";
    const sw = doorW + 8 + s * 10;
    ctx.fillRect(cx - sw/2, y + bh - 4 + s * 3, sw, 3);
  }
}

function drawStainedWindow(x, y, w, h) {
  // Marco
  ctx.fillStyle = "#5d4037";
  ctx.fillRect(x - 1, y - 1, w + 2, h + 2);
  // Vitral colores
  const colors = ["#1565c0", "#e65100", "#2e7d32", "#6a1b9a"];
  const segH = h / colors.length;
  for (let i = 0; i < colors.length; i++) {
    ctx.fillStyle = colors[i] + "88";
    ctx.fillRect(x, y + i * segH, w, segH);
  }
  // Brillo
  ctx.fillStyle = "rgba(255,255,200,0.15)";
  ctx.fillRect(x + 1, y + 1, w * 0.4, h - 2);
  // Cruz del vitral
  ctx.strokeStyle = "#5d4037";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + w/2, y); ctx.lineTo(x + w/2, y + h);
  ctx.moveTo(x, y + h/2); ctx.lineTo(x + w, y + h/2);
  ctx.stroke();
}

// ===== EDIFICIO ESCOLAR =====
function drawSchoolBuilding(x, y, bw, bh, b) {
  // Sombra
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath(); ctx.roundRect(x + 4, y + 6, bw, bh - 2, 3); ctx.fill();
  
  // Pared principal (ladrillo suave)
  const wallGrad = ctx.createLinearGradient(x, y, x, y + bh);
  wallGrad.addColorStop(0, "#e8d5b7");
  wallGrad.addColorStop(1, "#c4a882");
  ctx.fillStyle = wallGrad;
  ctx.beginPath(); ctx.roundRect(x + 2, y + bh * 0.15, bw - 4, bh * 0.85, [0, 0, 3, 3]); ctx.fill();
  
  // Techo
  ctx.fillStyle = "#5d4037";
  ctx.fillRect(x - 2, y + bh * 0.13, bw + 4, bh * 0.06);
  ctx.fillStyle = "#4e342e";
  ctx.fillRect(x, y + bh * 0.08, bw, bh * 0.07);
  
  // Ventanas en cuadrícula
  const cols = Math.max(3, Math.floor(bw / (TILE_W * 0.6)));
  const rows = Math.max(1, Math.floor(bh / (TILE_H * 1.2)));
  const winW = TILE_W * 0.28;
  const winH = TILE_H * 0.3;
  const spacingX = (bw - 16) / cols;
  const spacingY = (bh * 0.6) / (rows + 1);
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = x + 12 + c * spacingX;
      const wy = y + bh * 0.25 + (r + 1) * spacingY - winH/2;
      ctx.fillStyle = "#81d4fa";
      ctx.fillRect(wx, wy, winW, winH);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.strokeRect(wx, wy, winW, winH);
      ctx.beginPath();
      ctx.moveTo(wx + winW/2, wy); ctx.lineTo(wx + winW/2, wy + winH);
      ctx.stroke();
    }
  }
  
  // Puerta principal
  const doorW = bw * 0.12;
  const doorH = bh * 0.3;
  ctx.fillStyle = "#5d4037";
  ctx.fillRect(x + bw/2 - doorW/2, y + bh - doorH, doorW, doorH);
  ctx.fillStyle = "#3e2723";
  ctx.fillRect(x + bw/2 - doorW/2 + 2, y + bh - doorH + 2, doorW - 4, doorH - 2);
}

// ===== EDIFICIO CENTRAL (Administración) =====
function drawEdificioCentral(x, y, bw, bh, b) {
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath(); ctx.roundRect(x + 4, y + 6, bw, bh - 2, 3); ctx.fill();
  
  const wallGrad = ctx.createLinearGradient(x, y, x, y + bh);
  wallGrad.addColorStop(0, "#eceff1");
  wallGrad.addColorStop(1, "#b0bec5");
  ctx.fillStyle = wallGrad;
  ctx.beginPath(); ctx.roundRect(x + 2, y + bh * 0.12, bw - 4, bh * 0.88, [0, 0, 3, 3]); ctx.fill();
  
  // Techo plano con parapeto
  ctx.fillStyle = "#455a64";
  ctx.fillRect(x - 2, y + bh * 0.10, bw + 4, bh * 0.05);
  
  // Paneles solares en el techo
  for (let i = 0; i < Math.floor(bw / (TILE_W * 0.5)); i++) {
    ctx.fillStyle = "#1a237e";
    ctx.fillRect(x + 8 + i * TILE_W * 0.5, y + bh * 0.02, TILE_W * 0.35, bh * 0.07);
    ctx.strokeStyle = "#42a5f5";
    ctx.lineWidth = 0.5;
    ctx.strokeRect(x + 8 + i * TILE_W * 0.5, y + bh * 0.02, TILE_W * 0.35, bh * 0.07);
  }
  
  // Ventanas modernas
  const cols = Math.max(4, Math.floor(bw / (TILE_W * 0.5)));
  const winW = TILE_W * 0.25;
  const winH = bh * 0.28;
  const spacingX = (bw - 12) / cols;
  for (let c = 0; c < cols; c++) {
    const wx = x + 8 + c * spacingX;
    ctx.fillStyle = "#4fc3f7";
    ctx.fillRect(wx, y + bh * 0.3, winW, winH);
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.fillRect(wx, y + bh * 0.3, winW * 0.3, winH);
    ctx.strokeStyle = "#78909c";
    ctx.lineWidth = 1;
    ctx.strokeRect(wx, y + bh * 0.3, winW, winH);
  }
  
  // Puerta doble
  const doorW = bw * 0.14;
  ctx.fillStyle = "#37474f";
  ctx.fillRect(x + bw/2 - doorW/2, y + bh * 0.7, doorW, bh * 0.3);
  ctx.strokeStyle = "#90a4ae";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + bw/2, y + bh * 0.7); ctx.lineTo(x + bw/2, y + bh);
  ctx.stroke();
}

// ===== RESTAURANTE / CAFETERÍA =====
function drawRestaurante(x, y, bw, bh, b) {
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.beginPath(); ctx.roundRect(x + 4, y + 5, bw, bh - 2, 3); ctx.fill();
  
  const wallGrad = ctx.createLinearGradient(x, y, x, y + bh);
  wallGrad.addColorStop(0, "#fff3e0");
  wallGrad.addColorStop(1, "#ffe0b2");
  ctx.fillStyle = wallGrad;
  ctx.beginPath(); ctx.roundRect(x + 2, y + bh * 0.18, bw - 4, bh * 0.82, [0, 0, 3, 3]); ctx.fill();
  
  // Techo con toldo
  ctx.fillStyle = "#e65100";
  ctx.fillRect(x - 3, y + bh * 0.15, bw + 6, bh * 0.06);
  // Franjas del toldo
  const stripes = Math.floor(bw / 10);
  for (let i = 0; i < stripes; i++) {
    ctx.fillStyle = i % 2 === 0 ? "#bf360c" : "#ff8f00";
    ctx.beginPath();
    ctx.moveTo(x + i * 10, y + bh * 0.21);
    ctx.lineTo(x + i * 10 + 5, y + bh * 0.28);
    ctx.lineTo(x + (i + 1) * 10, y + bh * 0.21);
    ctx.fill();
  }
  
  // Ventana grande tipo vitrina
  ctx.fillStyle = "#fff9c4";
  ctx.fillRect(x + 8, y + bh * 0.35, bw - 16, bh * 0.3);
  ctx.strokeStyle = "#8d6e63";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x + 8, y + bh * 0.35, bw - 16, bh * 0.3);
  
  // Puerta
  ctx.fillStyle = "#5d4037";
  ctx.fillRect(x + bw/2 - bw * 0.08, y + bh * 0.72, bw * 0.16, bh * 0.28);
}

// ===== PLANTA DE AGUA =====
function drawPlantaAgua(x, y, bw, bh, b) {
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.beginPath(); ctx.roundRect(x + 3, y + 4, bw, bh - 2, 3); ctx.fill();
  
  ctx.fillStyle = "#78909c";
  ctx.beginPath(); ctx.roundRect(x + 2, y + bh * 0.2, bw - 4, bh * 0.8, [0, 0, 3, 3]); ctx.fill();
  
  // Techo industrial
  ctx.fillStyle = "#546e7a";
  ctx.fillRect(x - 2, y + bh * 0.15, bw + 4, bh * 0.08);
  
  // Tanques de agua
  const tanks = Math.max(2, Math.floor(bw / (TILE_W * 0.8)));
  const tankW = (bw - 16) / tanks * 0.7;
  for (let i = 0; i < tanks; i++) {
    const tx = x + 8 + i * ((bw - 16) / tanks);
    ctx.fillStyle = "#0277bd";
    ctx.beginPath(); ctx.roundRect(tx, y + bh * 0.3, tankW, bh * 0.5, 6); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.fillRect(tx + 2, y + bh * 0.32, tankW * 0.3, bh * 0.46);
    // Indicador de nivel
    ctx.fillStyle = "#4fc3f7";
    const level = 0.5 + Math.sin(animTime + i) * 0.2;
    ctx.fillRect(tx + 3, y + bh * 0.3 + bh * 0.5 * (1 - level), tankW - 6, bh * 0.5 * level - 4);
  }
}

// ===== OFICINAS =====
function drawOficinas(x, y, bw, bh, b) {
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.beginPath(); ctx.roundRect(x + 4, y + 5, bw, bh - 2, 3); ctx.fill();
  
  ctx.fillStyle = "#cfd8dc";
  ctx.beginPath(); ctx.roundRect(x + 2, y + bh * 0.12, bw - 4, bh * 0.88, [0, 0, 3, 3]); ctx.fill();
  ctx.fillStyle = "#607d8b";
  ctx.fillRect(x - 2, y + bh * 0.10, bw + 4, bh * 0.05);
  
  const cols = Math.max(3, Math.floor(bw / (TILE_W * 0.6)));
  const winW = TILE_W * 0.22;
  const winH = bh * 0.22;
  const sp = (bw - 12) / cols;
  for (let c = 0; c < cols; c++) {
    ctx.fillStyle = "#90caf9";
    ctx.fillRect(x + 8 + c * sp, y + bh * 0.25, winW, winH);
    ctx.fillRect(x + 8 + c * sp, y + bh * 0.55, winW, winH);
    ctx.strokeStyle = "#b0bec5";
    ctx.lineWidth = 0.5;
    ctx.strokeRect(x + 8 + c * sp, y + bh * 0.25, winW, winH);
    ctx.strokeRect(x + 8 + c * sp, y + bh * 0.55, winW, winH);
  }
  
  ctx.fillStyle = "#455a64";
  ctx.fillRect(x + bw/2 - bw * 0.07, y + bh * 0.75, bw * 0.14, bh * 0.25);
}

// ===== PARQUEADERO =====
function drawParqueadero(x, y, bw, bh, b) {
  // Asfalto
  ctx.fillStyle = "#424242";
  ctx.fillRect(x, y, bw, bh);
  // Líneas de parqueo
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1;
  const spots = Math.floor(bw / (TILE_W * 0.7));
  for (let i = 0; i <= spots; i++) {
    const lx = x + 8 + i * ((bw - 16) / spots);
    ctx.beginPath();
    ctx.moveTo(lx, y + bh * 0.3);
    ctx.lineTo(lx, y + bh * 0.8);
    ctx.stroke();
  }
  // Línea horizontal
  ctx.beginPath();
  ctx.moveTo(x + 8, y + bh * 0.3);
  ctx.lineTo(x + bw - 8, y + bh * 0.3);
  ctx.stroke();
}

// ===== PORTERÍA =====
function drawPorteria(x, y, bw, bh, b) {
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.beginPath(); ctx.roundRect(x + 3, y + 4, bw, bh - 2, 3); ctx.fill();
  
  // Caseta
  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.roundRect(x + 4, y + bh * 0.25, bw * 0.35, bh * 0.75, 3); ctx.fill();
  ctx.strokeStyle = "#1565c0";
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 4, y + bh * 0.25, bw * 0.35, bh * 0.75);
  
  // Barrera
  ctx.fillStyle = "#f44336";
  ctx.fillRect(x + bw * 0.4, y + bh * 0.45, bw * 0.55, 4);
  ctx.fillStyle = "#fff";
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(x + bw * 0.4 + i * bw * 0.12, y + bh * 0.45, bw * 0.06, 4);
  }
  
  // Poste de la barrera
  ctx.fillStyle = "#616161";
  ctx.fillRect(x + bw * 0.38, y + bh * 0.4, 6, bh * 0.6);
  
  // Letrero CEES
  ctx.font = "bold " + Math.max(7, TILE_W * 0.15) + "px Nunito";
  ctx.textAlign = "center";
  ctx.fillStyle = "#1565c0";
  ctx.fillText("CEES", x + bw * 0.2, y + bh * 0.2);
}

// ===== MONTAÑA =====
function drawMontana(x, y, bw, bh, b) {
  const cx = x + bw / 2;
  // Montaña principal
  ctx.fillStyle = "#5d4037";
  ctx.beginPath();
  ctx.moveTo(x + bw * 0.1, y + bh);
  ctx.lineTo(cx, y + bh * 0.1);
  ctx.lineTo(x + bw * 0.9, y + bh);
  ctx.closePath();
  ctx.fill();
  // Nieve en la cima
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(cx - bw * 0.08, y + bh * 0.25);
  ctx.lineTo(cx, y + bh * 0.1);
  ctx.lineTo(cx + bw * 0.08, y + bh * 0.25);
  ctx.closePath();
  ctx.fill();
  // Montaña menor
  ctx.fillStyle = "#795548";
  ctx.beginPath();
  ctx.moveTo(x, y + bh);
  ctx.lineTo(x + bw * 0.3, y + bh * 0.4);
  ctx.lineTo(x + bw * 0.55, y + bh);
  ctx.closePath();
  ctx.fill();
}

// ===== BODEGA =====
function drawBodega(x, y, bw, bh, b) {
  ctx.fillStyle = "rgba(0,0,0,0.12)";
  ctx.fillRect(x + 3, y + 4, bw, bh - 2);
  ctx.fillStyle = "#8d6e63";
  ctx.fillRect(x + 2, y + bh * 0.2, bw - 4, bh * 0.8);
  // Techo metálico corrugado
  ctx.fillStyle = "#78909c";
  ctx.beginPath();
  ctx.moveTo(x - 2, y + bh * 0.22);
  ctx.lineTo(x + bw/2, y + bh * 0.05);
  ctx.lineTo(x + bw + 2, y + bh * 0.22);
  ctx.closePath();
  ctx.fill();
  // Puerta de garage
  ctx.fillStyle = "#546e7a";
  ctx.fillRect(x + bw * 0.2, y + bh * 0.4, bw * 0.6, bh * 0.6);
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = "#455a64";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + bw * 0.2, y + bh * 0.4 + i * bh * 0.15);
    ctx.lineTo(x + bw * 0.8, y + bh * 0.4 + i * bh * 0.15);
    ctx.stroke();
  }
}

// ===== PORTAL BUILDING =====
function drawPortalBuilding(x, y, bw, bh, b) {
  const cx = x + bw/2, cy = y + bh/2;
  // Plataforma circular
  ctx.beginPath();
  ctx.ellipse(cx, cy + bh * 0.15, bw * 0.4, bh * 0.25, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#311b92";
  ctx.fill();
  // Anillos del portal
  const glow = 0.5 + Math.sin(animTime * 3) * 0.3;
  ctx.strokeStyle = "rgba(124,77,255," + glow + ")";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(cx, cy, bw * 0.3, bh * 0.2, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(179,136,255," + glow + ")";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(cx, cy, bw * 0.2, bh * 0.12, 0, 0, Math.PI * 2);
  ctx.stroke();
  // Centro brillante
  ctx.fillStyle = "rgba(200,180,255," + (0.6 + Math.sin(animTime * 4) * 0.3) + ")";
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.fill();
}

// ===== CANCHA DE FUTBOL AUXILIAR =====
function drawAuxFootballCourt(x, y, bw, bh, b) {
  // Grama sintética lisa ligeramente más verde que el fondo
  ctx.fillStyle = "#388e3c";
  ctx.fillRect(x, y, bw, bh);

  const mX = TILE_W * 0.2;
  const mY = TILE_H * 0.2;
  const innerX = x + mX;
  const innerY = y + mY;
  const innerW = bw - mX * 2;
  const innerH = bh - mY * 2;

  // Líneas de cancha
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 3;
  ctx.strokeRect(innerX, innerY, innerW, innerH);

  // Línea de medio campo (cancha dispuesta verticalmente)
  const midY = innerY + innerH / 2;
  ctx.beginPath();
  ctx.moveTo(innerX, midY);
  ctx.lineTo(innerX + innerW, midY);
  ctx.stroke();

  // Círculo central
  ctx.beginPath();
  ctx.arc(innerX + innerW / 2, midY, innerW * 0.25, 0, Math.PI * 2);
  ctx.stroke();
  
  // Punto central
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(innerX + innerW / 2, midY, 3, 0, Math.PI * 2);
  ctx.fill();

  // Áreas
  const areaH = innerH * 0.15;
  const areaW = innerW * 0.5;
  const areaX = innerX + (innerW - areaW) / 2;
  ctx.strokeRect(areaX, innerY, areaW, areaH); // Area superior
  ctx.strokeRect(areaX, innerY + innerH - areaH, areaW, areaH); // Area inferior

  // Arcos principales (Porterías)
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fillRect(areaX + areaW * 0.1, innerY - 6, areaW * 0.8, 6);
  ctx.fillRect(areaX + areaW * 0.1, innerY + innerH, areaW * 0.8, 6);
  
  // Postes
  ctx.fillStyle = "#fff";
  ctx.fillRect(areaX + areaW * 0.1 - 2, innerY - 6, 2, 6);
  ctx.fillRect(areaX + areaW * 0.9, innerY - 6, 2, 6);
  ctx.fillRect(areaX + areaW * 0.1 - 2, innerY + innerH, 2, 6);
  ctx.fillRect(areaX + areaW * 0.9, innerY + innerH, 2, 6);
}

// ===== EDIFICIO GENÉRICO (fallback) =====
function drawGenericBuilding(x, y, bw, bh, b) {
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.beginPath(); ctx.roundRect(x + 3, y + 4, bw, bh - 2, 3); ctx.fill();
  
  const wallGrad = ctx.createLinearGradient(x, y, x, y + bh);
  wallGrad.addColorStop(0, "#e0e0e0");
  wallGrad.addColorStop(1, "#bdbdbd");
  ctx.fillStyle = wallGrad;
  ctx.beginPath(); ctx.roundRect(x + 2, y + bh * 0.15, bw - 4, bh * 0.85, [0, 0, 3, 3]); ctx.fill();
  
  ctx.fillStyle = "#757575";
  ctx.fillRect(x - 1, y + bh * 0.13, bw + 2, bh * 0.04);
  
  // Ventanas
  const cols = Math.max(2, Math.floor(bw / (TILE_W * 0.7)));
  const winW = TILE_W * 0.25;
  const winH = bh * 0.22;
  const sp = (bw - 12) / cols;
  for (let c = 0; c < cols; c++) {
    ctx.fillStyle = "#90caf9";
    ctx.fillRect(x + 8 + c * sp, y + bh * 0.3, winW, winH);
    ctx.fillRect(x + 8 + c * sp, y + bh * 0.6, winW, winH);
  }
  
  ctx.fillStyle = "#5d4037";
  ctx.fillRect(x + bw/2 - bw * 0.06, y + bh * 0.75, bw * 0.12, bh * 0.25);
}
function drawWater(x, y) {
  const wave = Math.sin(animTime*2+x*0.01)*3;
  ctx.fillStyle = "#1565c0";
  ctx.fillRect(x, y+wave, TILE_W, TILE_H);
  ctx.fillStyle = "rgba(100,200,255,"+(0.15+Math.sin(animTime*3+x*0.05)*0.1)+")";
  ctx.fillRect(x, y+wave, TILE_W, TILE_H);
}
function drawTree(x, y) {
  // Generar variaciones según la coordenada estática del árbol
  const tType = (Math.floor(x * 1.3) + Math.floor(y * 0.7)) % 4; // 0, 1, 2, 3
  
  // Sombra base para todos los árboles
  ctx.beginPath(); ctx.ellipse(x+TILE_W/2, y+TILE_H-5, 18, 6, 0, 0, Math.PI*2); ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.fill();

  // Tronco base 
  ctx.fillStyle = "#5d4037"; ctx.fillRect(x+TILE_W/2-4, y+TILE_H-25, 8, 20);

  if (tType === 0) {
    // Árbol clásico redondeado
    ctx.beginPath(); ctx.arc(x+TILE_W/2, y+TILE_H-45, 20, 0, Math.PI*2); ctx.fillStyle = "#2e7d32"; ctx.fill();
    ctx.beginPath(); ctx.arc(x+TILE_W/2-10, y+TILE_H-35, 15, 0, Math.PI*2); ctx.fillStyle = "#388e3c"; ctx.fill();
    ctx.beginPath(); ctx.arc(x+TILE_W/2+12, y+TILE_H-38, 16, 0, Math.PI*2); ctx.fillStyle = "#43a047"; ctx.fill();
  } else if (tType === 1) {
    // Pino esbelto / Conífera
    ctx.beginPath(); ctx.moveTo(x+TILE_W/2, y+TILE_H-55); ctx.lineTo(x+TILE_W/2-18, y+TILE_H-20); ctx.lineTo(x+TILE_W/2+18, y+TILE_H-20); ctx.fillStyle = "#1b5e20"; ctx.fill();
    ctx.beginPath(); ctx.moveTo(x+TILE_W/2, y+TILE_H-40); ctx.lineTo(x+TILE_W/2-24, y+TILE_H - 8); ctx.lineTo(x+TILE_W/2+24, y+TILE_H - 8); ctx.fillStyle = "#2e7d32"; ctx.fill();
  } else if (tType === 2) {
    // Arbusto gigante / Árbol achaparrado
    ctx.beginPath(); ctx.arc(x+TILE_W/2, y+TILE_H-30, 22, 0, Math.PI*2); ctx.fillStyle = "#4caf50"; ctx.fill();
    ctx.beginPath(); ctx.arc(x+TILE_W/2-12, y+TILE_H-22, 18, 0, Math.PI*2); ctx.fillStyle = "#66bb6a"; ctx.fill();
    ctx.beginPath(); ctx.arc(x+TILE_W/2+15, y+TILE_H-25, 16, 0, Math.PI*2); ctx.fillStyle = "#388e3c"; ctx.fill();
  } else if (tType === 3) {
    // Árbol frondoso ovalado
    ctx.beginPath(); ctx.ellipse(x+TILE_W/2, y+TILE_H-40, 14, 28, 0, 0, Math.PI*2); ctx.fillStyle = "#2e7d32"; ctx.fill();
    ctx.beginPath(); ctx.ellipse(x+TILE_W/2-4, y+TILE_H-45, 10, 22, 0, 0, Math.PI*2); ctx.fillStyle = "#43a047"; ctx.fill();
  }
}
function drawFlower(x, y, seed) {
  const colors = ["#e91e63","#ff5722","#ffc107","#9c27b0","#2196f3"];
  const fx = x + TILE_W/2 + (seed%5 - 2)*5;
  const fy = y + TILE_H/2 + (seed%7 - 3)*5;
  ctx.beginPath(); ctx.arc(fx, fy-6, 3, 0, Math.PI*2); ctx.fillStyle = colors[seed%5]; ctx.fill();
  ctx.fillStyle = "#4caf50"; ctx.fillRect(fx-0.5, fy-4, 1, 5);
}
function drawFountain(x, y) {
  ctx.beginPath(); ctx.ellipse(x+TILE_W/2, y+TILE_H/2, 22, 12, 0, 0, Math.PI*2); ctx.fillStyle = "#90a4ae"; ctx.fill();
  const sprayH = 12 + Math.sin(animTime*4)*4;
  ctx.beginPath(); ctx.moveTo(x+TILE_W/2, y+TILE_H/2-sprayH-15); ctx.lineTo(x+TILE_W/2-6, y+TILE_H/2-8); ctx.lineTo(x+TILE_W/2+6, y+TILE_H/2-8); ctx.closePath();
  ctx.fillStyle = "rgba(66,165,245,0.6)"; ctx.fill();
}
function drawPortalEffect(x, y) {
  const glow = 0.4 + Math.sin(animTime*3)*0.3;
  ctx.beginPath(); ctx.arc(x+TILE_W/2, y+TILE_H/2, 15+Math.sin(animTime*2)*4, 0, Math.PI*2);
  ctx.fillStyle = "rgba(124,77,255,"+glow+")"; ctx.fill();
  ctx.beginPath(); ctx.arc(x+TILE_W/2, y+TILE_H/2, 8, 0, Math.PI*2);
  ctx.fillStyle = "rgba(200,180,255,0.8)"; ctx.fill();
}
function drawCharacter(x, y, data) {
  const cx = x + TILE_W/2;
  const cy = y + TILE_H/2;
  const animOffset = Math.sin(animTime * 2) * 2;
  const bob = (data.name === gameState.userName && gameState.charMoving) ? Math.sin(animTime*12)*3 : 0;
  const cls = CLASSES.find(function(c){return c.id===data.clase;}) || CLASSES[0];
  
  // Role Glow
  const gradient = ctx.createRadialGradient(cx, cy, 2, cx, cy, 25);
  gradient.addColorStop(0, cls.color + "66");
  gradient.addColorStop(1, "transparent");
  ctx.fillStyle = gradient;
  ctx.fillRect(cx-30, cy-30, 60, 60);

  // Shadow
  ctx.beginPath(); ctx.ellipse(cx, cy+8, 14, 6, 0, 0, Math.PI*2); ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.fill();
  
  const bodyY = cy - 18 + bob;
  // Shoes
  ctx.fillStyle = data.colors.shoes;
  ctx.fillRect(cx-9, bodyY+14, 6, 4); ctx.fillRect(cx+3, bodyY+14, 6, 4);
  // Pants
  ctx.fillStyle = data.colors.pants;
  ctx.beginPath(); ctx.roundRect(cx-10, bodyY+6, 20, 10, 4); ctx.fill();
  // Shirt
  ctx.fillStyle = data.colors.shirt;
  ctx.beginPath(); ctx.roundRect(cx-10, bodyY-4, 20, 11, 5); ctx.fill();
  // Hands
  ctx.fillStyle = "#ffcc80";
  ctx.beginPath(); ctx.arc(cx-13, bodyY+5 + (gameState.charMoving?Math.sin(animTime*10)*3:0), 3.5, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+13, bodyY+5 - (gameState.charMoving?Math.sin(animTime*10)*3:0), 3.5, 0, Math.PI*2); ctx.fill();
  // Head
  ctx.beginPath(); ctx.arc(cx, bodyY-12, 10, 0, Math.PI*2); ctx.fillStyle = "#ffcc80"; ctx.fill();
  // Eyes
  ctx.fillStyle = "#222"; ctx.fillRect(cx-4, bodyY-14, 2.5, 2.5); ctx.fillRect(cx+1.5, bodyY-14, 2.5, 2.5);
  // Smile
  ctx.beginPath(); ctx.arc(cx, bodyY-10.5, 4, 0.5, Math.PI-0.5); ctx.strokeStyle="#222"; ctx.lineWidth=1.5; ctx.stroke();
  
  // Floating Role Icon
  ctx.font = '16px serif'; ctx.textAlign = 'center';
  ctx.fillText(cls.icon, cx, bodyY - 26 + animOffset);
  
  // Name Tag (Premium Look)
  const displayName = data.name.split(',')[0].split(' ')[0];
  ctx.font = "bold 11px 'Nunito', sans-serif";
  const nameW = ctx.measureText(displayName).width;
  ctx.fillStyle = "rgba(10,10,25,0.75)";
  ctx.beginPath(); ctx.roundRect(cx - (nameW+10)/2, bodyY-46, nameW+10, 16, 8); ctx.fill();
  ctx.strokeStyle = cls.color + "88"; ctx.lineWidth = 1; ctx.stroke();
  ctx.fillStyle = data.name === gameState.userName ? "#ffd54f" : "#fff";
  ctx.fillText(displayName, cx, bodyY-34);

  // Chat Bubble
  if (data.msg && data.msgTime > 0) {
    drawChatBubble(cx, bodyY - 60, data.msg);
  }
}

function drawChatBubble(x, y, msg) {
  ctx.font = "bold 12px Nunito";
  const tw = ctx.measureText(msg).width;
  const bw = tw + 20, bh = 24;
  ctx.fillStyle = "white";
  ctx.beginPath(); ctx.roundRect(x - bw/2, y - bh, bw, bh, 10); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x-5, y); ctx.lineTo(x+5, y); ctx.lineTo(x, y+5); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.fillText(msg, x, y - 8);
}
function drawBuildingLabel(x, y, icon, name, starsReq, unlocked) {
  ctx.font = "bold 10px Nunito";
  const tw = ctx.measureText(name).width;
  const totalW = tw + 40;
  ctx.fillStyle = unlocked ? "rgba(46,125,50,0.9)" : "rgba(50,50,60,0.9)";
  const rx = x - 5, ry = y - 25;
  ctx.beginPath(); ctx.roundRect(rx, ry, totalW, 24, 6); ctx.fill();
  ctx.font = "14px serif"; ctx.textAlign = "left"; ctx.fillText(icon, rx+5, ry+17);
  ctx.font = "bold 11px Nunito"; ctx.fillStyle = "#fff"; ctx.fillText(name, rx+24, ry+16);
  ctx.font = "bold 10px Nunito"; ctx.textAlign = "right";
  ctx.fillStyle = unlocked ? "#ffd54f" : "#ef5350";
  ctx.fillText("★"+starsReq, rx+totalW-4, ry+16);
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
    // Si el edificio no tiene nombre ni descripción (como los Triángulos 2 anexos), ignorar por completo.
    if (!b.n && !b.d) return; 
    
    if (b.ix !== undefined && b.iy !== undefined) {
      // Interacción solo en la casilla exacta designada
      if (col === b.ix && row === b.iy) { showBuildingPanel(b); return; }
    } else {
      // Modo antiguo (interactúa con cualquier casilla adyacente del bloque)
      // Se irá reemplazando a medida que mapemos los ix e iy de todo el colegio
      for (let r = b.r; r < b.r+b.h; r++)
        for (let c = b.c; c < b.c+b.w; c++)
          if (Math.abs(col-c)<=1 && Math.abs(row-r)<=1 && (col!==c||row!==r)) { showBuildingPanel(b); return; }
    }
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
  let info = ZONE_INFO[gameState.currentZone];
  
  // Recuperación automática: si la zona no existe, forzar retorno a Portería (45)
  if (!info && gameState.userId) {
    console.warn("Zona inválida detectada para " + gameState.userId + ". Reubicando...");
    gameState.currentZone = SPAWN_ZONE;
    info = ZONE_INFO[SPAWN_ZONE];
    saveProgress();
  }

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
      lastMessage: gameState.lastMessage,
      messageTime: gameState.messageTime,
      ultimoAcceso: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    
    // Sincronizar también con el documento principal para el multijugador eficiente (onSnapshot)
    await db.collection("ciudadano").doc(gameState.userId).update({
      zona_actual: gameState.currentZone,
      charCol: gameState.charCol,
      charRow: gameState.charRow,
      clase: gameState.clase,
      charColors: gameState.charColors,
      lastMessage: gameState.lastMessage,
      messageTime: gameState.messageTime,
      lastActive: firebase.firestore.FieldValue.serverTimestamp(),
      sessionId: SESSION_ID
    });
  } catch(e) { console.error("Save error:", e); }
}

// ===== LIMPIEZA AL CERRAR PESTAÑA =====
// Cuando el jugador cierra la página, limpiar su zona para que no aparezca como fantasma
window.addEventListener('beforeunload', function() {
  if (!gameState.userId) return;
  // Usar sendBeacon para garantizar que se envíe aunque se cierre la pestaña
  // Firestore no soporta sendBeacon directamente, pero podemos hacer el update síncrono
  try {
    // Marcar zona_actual = 0 para que el jugador desaparezca del mapa
    db.collection("ciudadano").doc(gameState.userId).update({
      zona_actual: 0,
      lastActive: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(e) { /* silently fail */ }
});

// ===== DETECCIÓN DE PESTAÑA DUPLICADA =====
// Escuchar cambios en el sessionId del documento del jugador
// Si otro tab actualiza el sessionId, este tab se desactiva
function initSessionGuard() {
  if (!gameState.userId) return;
  let isFirstSnapshot = true; // Ignorar el primer snapshot (datos previos)
  db.collection("ciudadano").doc(gameState.userId).onSnapshot(function(doc) {
    if (!doc.exists) return;
    // Ignorar el primer snapshot: siempre trae datos que acabamos de escribir
    if (isFirstSnapshot) {
      isFirstSnapshot = false;
      return;
    }
    const data = doc.data();
    // Si el sessionId en Firestore es diferente al nuestro, otro tab tomó el control
    if (data.sessionId && data.sessionId !== SESSION_ID && gameState.gameReady) {
      gameState.gameReady = false;
      stopPlayerSync();
      // Mostrar mensaje al usuario
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;font-family:Nunito,sans-serif;text-align:center;padding:20px;';
      overlay.innerHTML = '<div style="font-size:48px;margin-bottom:20px;">\u26A0\uFE0F</div><h2 style="font-size:20px;margin-bottom:12px;">Sesi\u00F3n activa en otra pesta\u00F1a</h2><p style="color:#aaa;font-size:14px;margin-bottom:20px;">Tu personaje est\u00E1 jugando en otra ventana.<br>Solo puedes tener una sesi\u00F3n activa a la vez.</p><button onclick="location.reload()" style="padding:12px 32px;background:#7c4dff;color:white;border:none;border-radius:8px;font-size:16px;cursor:pointer;font-family:Nunito,sans-serif;">Usar esta pesta\u00F1a</button>';
      document.body.appendChild(overlay);
    }
  });
}

// ===== CHAT SYSTEM =====
function openChatMenu() {
  const existing = document.getElementById('chat-panel');
  if (existing) { existing.remove(); return; }

  const chat = document.createElement('div');
  chat.id = 'chat-panel';
  chat.innerHTML = `
    <div class="chat-head">💬 Chat Social</div>
    <div class="chat-emojis">
      <button onclick="sendEmoji('😊')">😊</button><button onclick="sendEmoji('👋')">👋</button>
      <button onclick="sendEmoji('😮')">😮</button><button onclick="sendEmoji('🙌')">🙌</button>
      <button onclick="sendEmoji('⭐')">⭐</button><button onclick="sendEmoji('❤️')">❤️</button>
    </div>
    <div class="chat-input-row">
      <input type="text" id="chat-text" placeholder="Escribe algo..." maxlength="25">
      <button onclick="sendTextMessage()">Enviar</button>
    </div>
  `;
  document.body.appendChild(chat);
  document.getElementById('chat-text').focus();
  document.getElementById('chat-text').onkeydown = e => { if (e.key === 'Enter') sendTextMessage(); };
}

function sendEmoji(emoji) {
  gameState.lastMessage = emoji;
  gameState.messageTime = 5;
  saveProgress();
  const panel = document.getElementById('chat-panel');
  if (panel) panel.remove();
}

async function sendTextMessage() {
  const input = document.getElementById('chat-text');
  let txt = input.value.trim();
  if (!txt) return;

  // Moderación
  const hasBadWord = BAD_WORDS.some(w => txt.toLowerCase().includes(w));
  if (hasBadWord) {
    alert("🛑 ¡Atención Ciudadano! El lenguaje inapropiado no está permitido. Se te ha restado 1 estrella por mal uso del chat.");
    gameState.stars = Math.max(0, gameState.stars - 1);
    updateHUD();
    txt = "****";
    // Sanción en base de datos
    await db.collection("ciudadano").doc(gameState.userId).update({
      estrellas: gameState.stars
    });
  }

  gameState.lastMessage = txt;
  gameState.messageTime = 8;
  saveProgress();
  const panel = document.getElementById('chat-panel');
  if (panel) panel.remove();
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
