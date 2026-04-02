/* ====================================================
   LA CIUDAD DE LOS NIÑOS — ZONE DATA (45 zonas CEES)
   ==================================================== */

// Grid: 8 cols x 6 rows (row 5 has only 5 cols)
const GRID_COLS = 8;
const GRID_ROWS = 6;
const MAP_W = 14;
const MAP_H = 14;

// Tile types: 0=void 1=grass 2=path 3=building 4=tree 5=water_feat 6=flower 7=water 8=turf 9=portal
const WALKABLE = [1,2,6,8,9];

// ===== ZONE INFO =====
// t: df=dense_forest lf=light_forest cb=campus sp=sports pk=parking gd=garden pz=plaza mt=mountain
const ZONE_INFO = [
  null, // index 0 unused
  // Row 0: zones 1-8
  {n:"Bosque PTAP",t:"df",i:"🌳",bg:"#1a3d12",
    b:[{c:4,r:4,w:3,h:2,n:"Planta PTAP",i:"💧",d:"Planta de Tratamiento de Agua Potable. De aquí sale el agua limpia del colegio.",s:0}]},
  {n:"Elementary — Heroes",t:"lf",i:"🦸",bg:"#2d4a1e",
    b:[{c:4,r:3,w:4,h:3,n:"Salón Heroes",i:"🦸",d:"Salones de grado 4to — Heroes. Donde se forman los héroes del mañana.",s:0}]},
  {n:"Neverland",t:"cb",i:"✨",bg:"#2d4a1e",
    b:[{c:3,r:3,w:5,h:3,n:"Salones Neverland",i:"✨",d:"Salones del proyecto Neverland. ODS 12: Producción y Consumo Responsable.",s:0}]},
  {n:"Pandora & Distopya",t:"cb",i:"🦋",bg:"#1e2a4a",
    b:[{c:1,r:3,w:3,h:3,n:"Salones Pandora",i:"🦋",d:"Proyecto Pandora. ODS 15: Vida de Ecosistemas Terrestres.",s:0},
       {c:8,r:3,w:3,h:3,n:"Salones Distopya",i:"🔮",d:"Proyecto Distopya. Visiones de un futuro por construir.",s:0}]},
  {n:"Bosque & High School",t:"lf",i:"🏫",bg:"#1e3a1e",
    b:[{c:8,r:5,w:4,h:3,n:"High School P.R. de Pardo",i:"🏫",d:"Edificio Paula Rodríguez de Pardo — Bachillerato.",s:0},
       {c:1,r:8,w:3,h:2,n:"Oficinas Administrativas",i:"🏢",d:"Oficinas administrativas del colegio.",s:0}]},
  {n:"High School & Voleibol",t:"cb",i:"🏐",bg:"#2d4a1e",
    b:[{c:2,r:2,w:5,h:3,n:"High School P.R. de Pardo",i:"🏫",d:"Continuación del edificio de Bachillerato.",s:0},
       {c:8,r:6,w:4,h:3,n:"Cancha de Voleibol",i:"🏐",d:"Cancha de voleibol en césped.",s:8}]},
  {n:"Reserva Hídrica Noreste",t:"df",i:"🌲",bg:"#0f2e0a",b:[]},
  {n:"Reserva Hídrica Este",t:"df",i:"🌲",bg:"#0d2808",b:[]},

  // Row 1: zones 9-16
  {n:"Huerta Escolar Norte",t:"gd",i:"🌱",bg:"#2d4a1e",
    b:[{c:3,r:3,w:4,h:3,n:"Huerta Escolar",i:"🌱",d:"Zona de proyectos y huerta escolar. Pacas digestoras y cultivos.",s:0}]},
  {n:"Bosque Central",t:"lf",i:"🌳",bg:"#1a3d12",b:[]},
  {n:"Elementary — Space Jumpers & Kintsugi",t:"cb",i:"🚀",bg:"#2d4a1e",
    b:[{c:1,r:3,w:3,h:3,n:"Salón Space Jumpers",i:"🚀",d:"Salones del proyecto Space Jumpers.",s:0},
       {c:8,r:3,w:3,h:3,n:"Salón Kintsugi",i:"🏺",d:"Salones del proyecto Kintsugi. El arte de reparar.",s:0}]},
  {n:"Pasillo Central & Atlantis",t:"cb",i:"🌊",bg:"#1e2a4a",
    b:[{c:4,r:4,w:4,h:3,n:"Salones Atlantis",i:"🌊",d:"Proyecto Atlantis. ODS 6: Agua Limpia y Saneamiento.",s:2}]},
  {n:"Rotonda & District 12",t:"pz",i:"⚖️",bg:"#2d4a1e",portal:true,
    b:[{c:1,r:4,w:3,h:3,n:"Salones District 12",i:"⚖️",d:"Proyecto District 12. ODS 10: Reducción de Desigualdades.",s:3},
       {c:6,r:6,w:2,h:2,n:"Rotonda Central",i:"⭕",d:"Rotonda que conecta Junior, Administración y High School.",s:0}]},
  {n:"High School Paula R. de Pardo",t:"cb",i:"🏫",bg:"#2d4a1e",
    b:[{c:3,r:2,w:6,h:4,n:"Edificio High School",i:"🏫",d:"Edificio Paula Rodríguez de Pardo — Sede principal de Bachillerato.",s:0}]},
  {n:"Reserva Hídrica Noreste 2",t:"df",i:"🌲",bg:"#0f2e0a",b:[]},
  {n:"Reserva Hídrica Este 2",t:"df",i:"🌲",bg:"#0d2808",b:[]},

  // Row 2: zones 17-24
  {n:"Huerta Escolar Sur",t:"gd",i:"🌿",bg:"#2d4a1e",
    b:[{c:3,r:3,w:4,h:3,n:"Zona de Proyectos",i:"🌿",d:"Proyectos productivos y huerta escolar sur.",s:0}]},
  {n:"Plaza del Reloj",t:"pz",i:"🕐",bg:"#1a3d12",
    b:[{c:5,r:5,w:3,h:2,n:"Plaza del Reloj",i:"🕐",d:"Plaza emblemática con el reloj del colegio. Un punto de encuentro histórico.",s:0}]},
  {n:"Deportes & Restaurante",t:"cb",i:"🍽️",bg:"#2d4a1e",
    b:[{c:1,r:3,w:3,h:2,n:"Contenedores Ed. Física",i:"🏋️",d:"Almacén de materiales deportivos.",s:0},
       {c:8,r:3,w:4,h:3,n:"Restaurante Escolar",i:"🍽️",d:"Restaurante y comedor de la comunidad educativa.",s:0}]},
  {n:"Edificio Central",t:"cb",i:"🏛️",bg:"#1e3a2e",
    b:[{c:2,r:3,w:8,h:3,n:"Edificio Central",i:"🏛️",d:"Comedor, Alcaldía, Fotocopiadora y Paneles Solares. El corazón administrativo.",s:0}]},
  {n:"Centro Cultural Elías Pardo García",t:"pz",i:"🎭",bg:"#3d3a1e",
    b:[{c:3,r:3,w:6,h:4,n:"Centro Cultural E.P.G.",i:"🎭",d:"Centro Cultural Elías Pardo García. Corazón artístico y cultural del CEES.",s:0}]},
  {n:"Montaña de Vuelo",t:"mt",i:"🏔️",bg:"#2e3d2e",
    b:[{c:4,r:2,w:5,h:5,n:"Montaña de Vuelo",i:"🏔️",d:"Una montaña con acceso. Mirador natural del campus.",s:5}]},
  {n:"Reserva Hídrica Central Este",t:"df",i:"🌲",bg:"#0f2e0a",b:[]},
  {n:"Reserva Hídrica Sureste 1",t:"df",i:"🌲",bg:"#0d2808",b:[]},

  // Row 3: zones 25-32
  {n:"Mariposario & Arco Sur",t:"gd",i:"🦋",bg:"#2d4a1e",portal:true,
    b:[{c:1,r:2,w:3,h:3,n:"Mariposario",i:"🦋",d:"Mariposario del colegio. Hogar de cientos de mariposas nativas.",s:2},
       {c:7,r:8,w:4,h:2,n:"Arco Sur Fútbol",i:"⚽",d:"Arco sur de la cancha de fútbol.",s:0}]},
  {n:"Cancha de Fútbol",t:"sp",i:"⚽",bg:"#1a4a0e",
    b:[{c:2,r:1,w:10,h:12,n:"Cancha de Fútbol",i:"⚽",d:"Cancha de fútbol principal del CEES.",s:0}]},
  {n:"Arco Norte & Tenis Sur",t:"sp",i:"🎾",bg:"#2d4a1e",
    b:[{c:2,r:1,w:4,h:3,n:"Arco Norte Fútbol",i:"⚽",d:"Arco norte de la cancha de fútbol.",s:0},
       {c:7,r:6,w:5,h:4,n:"Canchas Tenis/Voleibol Sur",i:"🎾",d:"Zona sur de canchas de voleibol y tenis.",s:0}]},
  {n:"Voleibol Norte & Sintética",t:"sp",i:"🏐",bg:"#2d4a1e",
    b:[{c:2,r:1,w:4,h:3,n:"Canchas Voleibol Norte",i:"🏐",d:"Zona norte de canchas de voleibol.",s:0},
       {c:7,r:1,w:5,h:3,n:"Cancha Sintética",i:"⚽",d:"Cancha de fútbol sintética.",s:0},
       {c:8,r:8,w:4,h:3,n:"Cafetería",i:"☕",d:"Cafetería del Edificio Central.",s:0}]},
  {n:"Plaza Cultural",t:"pz",i:"🎨",bg:"#3d3a1e",
    b:[{c:4,r:4,w:5,h:4,n:"Plaza Cultural",i:"🎨",d:"Plaza Cultural. Espacio de encuentro, arte y expresión ciudadana.",s:0}]},
  {n:"Oficinas Administrativas",t:"cb",i:"🏢",bg:"#2d3a3e",
    b:[{c:3,r:3,w:6,h:3,n:"Oficinas Admin.",i:"🏢",d:"Contabilidad, Talento Humano y Dirección Operativa.",s:0}]},
  {n:"Resguardo de Materiales",t:"cb",i:"📦",bg:"#3a3a2e",
    b:[{c:3,r:3,w:5,h:4,n:"Bodega de Materiales",i:"📦",d:"Zona de resguardo de materiales y escombros.",s:0}]},
  {n:"Reserva Hídrica Sur",t:"df",i:"🌲",bg:"#0d2808",b:[]},

  // Row 4: zones 33-40
  {n:"Jardín Zen",t:"gd",i:"🧘",bg:"#1a3d2e",
    b:[{c:4,r:4,w:4,h:3,n:"Jardín Zen",i:"🧘",d:"Espacio de meditación y paz. Un remanso de tranquilidad.",s:3}]},
  {n:"Cancha de Fútbol — Oriental",t:"sp",i:"⚽",bg:"#1a4a0e",
    b:[{c:2,r:1,w:10,h:12,n:"Cancha de Fútbol (Este)",i:"⚽",d:"Zona oriental de la cancha de fútbol.",s:0}]},
  {n:"Esquina NE Fútbol & SE Tenis",t:"sp",i:"🎾",bg:"#2d4a1e",
    b:[{c:1,r:1,w:4,h:3,n:"Esquina NE Fútbol",i:"⚽",d:"Esquina nororiental de la cancha de fútbol.",s:0},
       {c:7,r:1,w:4,h:3,n:"Esquina SE Tenis",i:"🎾",d:"Esquina suroriental de la cancha de tenis.",s:0}]},
  {n:"Sintética & Paneles Solares",t:"sp",i:"☀️",bg:"#2d4a1e",
    b:[{c:2,r:2,w:5,h:4,n:"Cancha Sintética",i:"⚽",d:"Parte de la cancha de fútbol sintética.",s:0},
       {c:8,r:2,w:4,h:2,n:"Paneles Solares",i:"☀️",d:"Paneles solares del colegio. Energía limpia.",s:0}]},
  {n:"Bodega & Zona Verde",t:"lf",i:"🏗️",bg:"#2d4a1e",
    b:[{c:3,r:3,w:4,h:3,n:"Bodega y Baños",i:"🏗️",d:"Bodega general y baños.",s:0}]},
  {n:"Pérgola & Estanques",t:"gd",i:"🐟",bg:"#1a3d2e",
    b:[{c:2,r:2,w:4,h:2,n:"Pérgola de Acceso",i:"🚪",d:"Pérgola de acceso al campus.",s:0},
       {c:8,r:8,w:3,h:3,n:"Estanques de Peces",i:"🐟",d:"Estanques con peces ornamentales.",s:0}]},
  {n:"Zona Verde Sur",t:"lf",i:"🌿",bg:"#1a3d12",b:[]},
  {n:"Reserva Hídrica Suroeste",t:"df",i:"🌲",bg:"#0d2808",b:[]},

  // Row 5: zones 41-45
  {n:"Zona PTAR",t:"df",i:"♻️",bg:"#0f2e1a",
    b:[{c:4,r:4,w:4,h:3,n:"Planta PTAR",i:"♻️",d:"Planta de Tratamiento de Aguas Residuales.",s:0}]},
  {n:"Parqueadero de Rutas",t:"pk",i:"🚌",bg:"#3a3a3a",
    b:[{c:2,r:3,w:8,h:4,n:"Parqueadero de Rutas",i:"🚌",d:"Parqueadero para las rutas escolares.",s:0}]},
  {n:"Parqueadero General",t:"pk",i:"🅿️",bg:"#3a3a3a",
    b:[{c:1,r:2,w:10,h:6,n:"Parqueadero General",i:"🅿️",d:"Parqueadero general del campus.",s:0}]},
  {n:"Parqueadero & Portal",t:"pk",i:"🅿️",bg:"#3a3a3a",portal:true,
    b:[{c:1,r:2,w:8,h:4,n:"Parqueadero",i:"🅿️",d:"Zona de parqueo.",s:0},
       {c:10,r:6,w:2,h:2,n:"Portal de Viaje",i:"🌀",d:"Portal mágico. Te conecta con otros portales del campus.",s:0}]},
  {n:"Portería — Entrada Principal",t:"pk",i:"🚪",bg:"#3a3a3e",
    b:[{c:3,r:2,w:6,h:3,n:"Portería",i:"🚪",d:"Entrada principal de la Ciudad Educadora Espíritu Santo.",s:0}]},
];

// ===== ZONE GRID HELPERS =====
function zoneToGrid(zoneNum) {
  if (zoneNum <= 40) return { row: Math.floor((zoneNum-1)/8), col: (zoneNum-1)%8 };
  return { row: 5, col: zoneNum - 41 };
}

function gridToZone(row, col) {
  if (row < 0 || col < 0) return null;
  if (row < 5 && col < 8) return row * 8 + col + 1;
  if (row === 5 && col < 5) return 41 + col;
  return null;
}

function getConnections(zoneNum) {
  const g = zoneToGrid(zoneNum);
  return {
    north: gridToZone(g.row - 1, g.col),
    south: gridToZone(g.row + 1, g.col),
    east:  gridToZone(g.row, g.col + 1),
    west:  gridToZone(g.row, g.col - 1)
  };
}

// ===== SEEDED RNG =====
function mkRng(seed) {
  let s = Math.abs(seed * 16807 + 7) % 2147483647 || 1;
  return function() { s = (s * 16807) % 2147483647; return (s & 0xffffff) / 0xffffff; };
}

// ===== MAP GENERATION =====
function generateZoneMap(zoneNum) {
  const info = ZONE_INFO[zoneNum];
  if (!info) return null;
  const conns = getConnections(zoneNum);
  const rng = mkRng(zoneNum * 31 + 17);
  const m = [];
  for (let r = 0; r < MAP_H; r++) { m[r] = []; for (let c = 0; c < MAP_W; c++) m[r][c] = 1; }

  // Apply base template
  const tpl = info.t;
  if (tpl === "df") fillDenseForest(m, rng, zoneNum);
  else if (tpl === "lf") fillLightForest(m, rng);
  else if (tpl === "cb") fillCampus(m, rng);
  else if (tpl === "sp") fillSports(m, rng);
  else if (tpl === "pk") fillParking(m, rng);
  else if (tpl === "gd") fillGarden(m, rng);
  else if (tpl === "pz") fillPlaza(m, rng);
  else if (tpl === "mt") fillMountain(m, rng);

  // Cut exit paths where connections exist
  if (conns.north) cutExit(m, "north");
  if (conns.south) cutExit(m, "south");
  if (conns.east)  cutExit(m, "east");
  if (conns.west)  cutExit(m, "west");

  // Connect exits through center
  connectPaths(m, conns);

  // Place buildings
  (info.b || []).forEach(function(b) {
    for (let r = b.r; r < b.r + b.h && r < MAP_H; r++)
      for (let c = b.c; c < b.c + b.w && c < MAP_W; c++)
        m[r][c] = 3;
  });

  // Place portal pad if zone has portals
  if (info.portal) {
    m[MAP_H - 3][MAP_W - 3] = 9;
    m[MAP_H - 3][MAP_W - 4] = 9;
    m[MAP_H - 4][MAP_W - 3] = 9;
    m[MAP_H - 4][MAP_W - 4] = 9;
  }

  return m;
}

function cutExit(m, dir) {
  const midC = Math.floor(MAP_W / 2);
  const midR = Math.floor(MAP_H / 2);
  if (dir === "north") { for (let c = midC-1; c <= midC+1; c++) { m[0][c] = 2; m[1][c] = 2; } }
  if (dir === "south") { for (let c = midC-1; c <= midC+1; c++) { m[MAP_H-1][c] = 2; m[MAP_H-2][c] = 2; } }
  if (dir === "east")  { for (let r = midR-1; r <= midR+1; r++) { m[r][MAP_W-1] = 2; m[r][MAP_W-2] = 2; } }
  if (dir === "west")  { for (let r = midR-1; r <= midR+1; r++) { m[r][0] = 2; m[r][1] = 2; } }
}

function connectPaths(m, conns) {
  const midC = Math.floor(MAP_W / 2);
  const midR = Math.floor(MAP_H / 2);
  // Always clear a small center area
  for (let r = midR-1; r <= midR+1; r++)
    for (let c = midC-1; c <= midC+1; c++) m[r][c] = 2;

  // Vertical paths
  if (conns.north || conns.south) {
    const startR = conns.north ? 0 : midR;
    const endR = conns.south ? MAP_H-1 : midR;
    for (let r = startR; r <= endR; r++) { m[r][midC] = 2; m[r][midC-1] = 2; }
  }
  // Horizontal paths
  if (conns.east || conns.west) {
    const startC = conns.west ? 0 : midC;
    const endC = conns.east ? MAP_W-1 : midC;
    for (let c = startC; c <= endC; c++) { m[midR][c] = 2; m[midR-1][c] = 2; }
  }
  // If no connections in a direction, still connect center
  if (!conns.north && !conns.south) {
    for (let r = midR-2; r <= midR+2; r++) { m[r][midC] = 2; }
  }
  if (!conns.east && !conns.west) {
    for (let c = midC-2; c <= midC+2; c++) { m[midR][c] = 2; }
  }
}

// ===== TEMPLATES =====
function fillDenseForest(m, rng, seed) {
  for (let r = 0; r < MAP_H; r++)
    for (let c = 0; c < MAP_W; c++) {
      const v = rng();
      if (v < 0.65) m[r][c] = 4;      // tree
      else if (v < 0.75) m[r][c] = 6;  // flower
      else if (v < 0.82) m[r][c] = 7;  // water puddle
      else m[r][c] = 1;                // grass clearing
    }
}

function fillLightForest(m, rng) {
  for (let r = 0; r < MAP_H; r++)
    for (let c = 0; c < MAP_W; c++) {
      const v = rng();
      if (v < 0.30) m[r][c] = 4;
      else if (v < 0.40) m[r][c] = 6;
      else m[r][c] = 1;
    }
}

function fillCampus(m, rng) {
  for (let r = 0; r < MAP_H; r++)
    for (let c = 0; c < MAP_W; c++) {
      const edge = r < 2 || r >= MAP_H-2 || c < 2 || c >= MAP_W-2;
      const v = rng();
      if (edge && v < 0.3) m[r][c] = 4;
      else if (v < 0.15) m[r][c] = 6;
      else m[r][c] = 1;
    }
}

function fillSports(m, rng) {
  for (let r = 0; r < MAP_H; r++)
    for (let c = 0; c < MAP_W; c++) {
      const edge = r < 1 || r >= MAP_H-1 || c < 1 || c >= MAP_W-1;
      if (edge) m[r][c] = rng() < 0.2 ? 4 : 1;
      else m[r][c] = 8; // turf
    }
}

function fillParking(m, rng) {
  for (let r = 0; r < MAP_H; r++)
    for (let c = 0; c < MAP_W; c++) {
      m[r][c] = rng() < 0.08 ? 4 : 2; // mostly path
    }
}

function fillGarden(m, rng) {
  for (let r = 0; r < MAP_H; r++)
    for (let c = 0; c < MAP_W; c++) {
      const v = rng();
      if (v < 0.20) m[r][c] = 6;      // flowers
      else if (v < 0.28) m[r][c] = 5;  // water features
      else if (v < 0.36) m[r][c] = 4;  // trees
      else if (v < 0.50) m[r][c] = 2;  // paths
      else m[r][c] = 1;
    }
}

function fillPlaza(m, rng) {
  for (let r = 0; r < MAP_H; r++)
    for (let c = 0; c < MAP_W; c++) {
      const distC = Math.abs(c - MAP_W/2);
      const distR = Math.abs(r - MAP_H/2);
      if (distC < 4 && distR < 4) m[r][c] = 2; // central plaza
      else if (rng() < 0.15) m[r][c] = 6;
      else if (rng() < 0.08) m[r][c] = 4;
      else m[r][c] = 1;
    }
}

function fillMountain(m, rng) {
  for (let r = 0; r < MAP_H; r++)
    for (let c = 0; c < MAP_W; c++) {
      const distCenter = Math.sqrt(Math.pow(c - MAP_W/2, 2) + Math.pow(r - MAP_H/2, 2));
      if (distCenter < 3) m[r][c] = 1;
      else if (rng() < 0.55) m[r][c] = 4;
      else if (rng() < 0.15) m[r][c] = 7;
      else m[r][c] = 1;
    }
}

// ===== BUILD ALL ZONE MAPS =====
const ZONE_MAPS = {};
function buildAllMaps() {
  for (let i = 1; i <= 45; i++) {
    if (ZONE_INFO[i]) ZONE_MAPS[i] = generateZoneMap(i);
  }
}

// ===== COLOR PALETTES FOR CUSTOMIZATION =====
const SHIRT_COLORS = ['#4CAF50','#F44336','#2196F3','#FF9800','#9C27B0','#E91E63','#FFC107','#00BCD4','#795548','#607D8B'];
const PANTS_COLORS = ['#37474F','#263238','#1B5E20','#1A237E','#4E342E','#212121','#0D47A1','#880E4F','#33691E','#455A64'];
const SHOES_COLORS = ['#212121','#37474F','#5D4037','#1B5E20','#0D47A1','#880E4F','#E65100','#4A148C'];

// ===== PORTAL NETWORK =====
const PORTAL_ZONES = [13, 25, 44];
function getPortalDestinations(currentZone) {
  return PORTAL_ZONES.filter(z => z !== currentZone);
}
