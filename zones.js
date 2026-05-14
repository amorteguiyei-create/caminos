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
    b:[{c:4,r:4,w:3,h:2,n:"Planta PTAP",i:"💧",d:"Aqui se potabiliza el agua extraida del pozo para toda la Ciudad Educadora Espiritu Santo.",s:0, ix:6, iy:6}]},
  {n:"Elementary — Heroes",t:"lf",i:"🦸",bg:"#2d4a1e",
    b:[{c:10,r:3,w:4,h:6,n:"Heroes",i:"🦸",shape:"heroes_triangle",d:"La historia de los Héroes demuestra que cada persona, con sus talentos únicos, puede marcar la diferencia y contribuir a un futuro más sostenible y compasivo.",s:0, ix:9, iy:6}]},
  {n:"Neverland",t:"cb",i:"✨",bg:"#2d4a1e",
    b:[
      {c:0,r:1,w:7,h:4,n:"Neverland",i:"✨",shape:"neverland_triangle",d:"Que la magia y la armonía perduren para siempre en cada rincón del universo.",s:0, ix:3, iy:5},
      {c:0,r:7,w:4,h:4,n:"",i:"✨",shape:"neverland_triangle_2",s:0}
    ]},
  {n:"Atelier, Pandora & Distopya",t:"cb",i:"🦋",bg:"#1e2a4a",
    b:[
       {c:4,r:0,w:7,h:4,n:"Atelier",i:"🎨",shape:"atelier_triangle",d:"Un espacio donde el arte, la innovación y las tradiciones se entrelazan para crear nuevas formas de expresión.",s:0, ix:7, iy:4},
       {c:0,r:3,w:4,h:7,n:"Pandora",i:"🦋",shape:"pandora_triangle",d:"ODS 15. Que su historia inspire a todos a cuidar nuestro hogar común, la Tierra, y a velar por el bienestar y la libertad de todas las criaturas que la habitan.",s:0, ix:4, iy:6},
       {c:10,r:3,w:4,h:7,n:"Distopya",i:"🔮",shape:"dystopia_triangle",d:"ODS 11. En este nuevo hogar, encontraron un remanso de paz, donde podían vivir juntos en armonía. Ecovita se convirtió en un símbolo de esperanza y resiliencia, un lugar donde la humanidad podía florecer y construir un futuro brillante, aprendiendo del pasado pero sin estar atada a él. Así, el héroe de esta historia no fue solo un individuo, sino toda una comunidad, unida en su lucha por un futuro mejor.",s:0, ix:9, iy:6}]},
  {n:"Oficinas & Distopya",t:"lf",i:"🏢",bg:"#1e3a1e",
    b:[
       {c:0,r:0,w:4,h:4,n:"Dystopia Triangle",i:"🔮",shape:"dystopia_triangle_2",d:"ODS 11. Espacio de construcción de un nuevo futuro sostenible.",s:0, ix:1, iy:4},
       {c:6,r:11,w:3,h:3,n:"Direccion Academica",i:"🏢",d:"El lugar donde construimos la pedagogia de la Ciudad Educadora.",s:0, ix:9, iy:12},
       {c:11,r:11,w:3,h:3,n:"Rectoria",i:"🏢",d:"Rectoria de la Ciudad Educadora",s:0, ix:10, iy:12}
    ]},
  {n:"High School & Voleibol",t:"lf",nopaths:true,i:"🏐",bg:"#2d4a1e",
    b:[{c:8,r:3,w:5,h:3,n:"Cancha de Voleibol",i:"🏐",shape:"volleyball_court",d:"Cancha de voleibol en césped.",s:8, ix:8, iy:3},
       {c:1,r:10,w:5,h:4,n:"Edificio High School Paula Rodriguez de Pardo",i:"🏫",shape:"hs_wing",d:"Infraestructura de Bachillerato.",s:0, ix:6, iy:12, hideMarker:true},
       {c:9,r:10,w:5,h:4,n:"",i:"🏫",shape:"hs_wing",d:"",s:0},
       {c:5,r:12,w:5,h:2,n:"",i:"🏫",shape:"hs_bridge",d:"",s:0}]},
  {n:"Reserva Hídrica Noreste",t:"df",i:"🌲",bg:"#0f2e0a",b:[]},
  {n:"Reserva Hídrica Este",t:"df",i:"🌲",bg:"#0d2808",b:[]},

  // Row 1: zones 9-16
  {n:"Bosque del Río Norte",t:"lf",nopaths:true,i:"🌳",bg:"#1a3d12",b:[]},
  {n:"Bosque Central",t:"lf",i:"🌳",bg:"#1a3d12",b:[]},
  {n:"Elementary - Space Jumpers & Kintsugi",t:"cb",i:"🚀",bg:"#2d4a1e",
    b:[{c:0,r:1,w:6,h:5,n:"",i:"🚀",shape:"sj_upper",d:"",s:0},
       {c:0,r:8,w:4,h:4,n:"Salones Space Jumpers",i:"🚀",shape:"sj_lower",d:"Proyecto Space Jumpers. ODS 2: Hambre Cero.",s:0, ix:4, iy:8},
       {c:10,r:2,w:4,h:4,n:"Salones Kintsugi",i:"🏺",shape:"kin_upper",d:"Proyecto Kintsugi. ODS 3: Salud y Bienestar.",s:0, ix:9, iy:5},
       {c:8,r:8,w:6,h:5,n:"",i:"🏺",shape:"kin_lower",d:"",s:0}]},
  {n:"Pasillo Central & Atlantis",t:"cb",i:"🌊",bg:"#1e2a4a",
    b:[{c:5,r:1,w:7,h:4,n:"",i:"🌊",shape:"atlantis_upper",d:"",s:0},
       {c:5,r:7,w:4,h:4,n:"Salones Atlantis",i:"🌊",shape:"atlantis_lower",d:"Proyecto Atlantis. ODS 6: Agua Limpia y Saneamiento.",s:2, ix:9, iy:9}]},
  {n:"Rotonda & District 12",t:"lf",i:"⚖️",bg:"#2d4a1e",portal:true,
    b:[{c:0,r:1,w:5,h:4,n:"",i:"⚖️",shape:"district12_upper",d:"",s:0},
       {c:0,r:8,w:5,h:6,n:"Salones District 12",i:"⚖️",shape:"district12_lower",d:"Proyecto District 12. ODS 10: Reducción de Desigualdades.",s:3, ix:5, iy:10},
       {c:4,r:4,w:6,h:6,n:"",i:"⭕",shape:"rotonda",d:"Rotonda que conecta Junior, Administración y High School.",s:0, ix:7, iy:7, hideMarker:true}]},
  {n:"High School Paula R. de Pardo",t:"lf",nopaths:true,bg:"#2d4a1e",
    b:[{c:5,r:0,w:5,h:7,n:"Hall de ciclo High",i:"🏫",shape:"hs_bridge",d:"Primer piso del edificio de high Paula Rodriguez de Pardo",s:0, ix:7, iy:4, hideMarker:true},
       {c:5,r:7,w:5,h:4,n:"",i:"🏫",shape:"hs_wing",d:"",s:0},
       {c:10,r:1,w:4,h:7,n:"Cancha Auxiliar",i:"⚽",shape:"aux_football_court",d:"Cancha auxiliar para fútbol.",s:0, ix:12, iy:4}]},
  {n:"Reserva Hídrica Noreste 2",t:"df",i:"🌲",bg:"#0f2e0a",b:[]},
  {n:"Reserva Hídrica Este 2",t:"df",i:"🌲",bg:"#0d2808",b:[]},

  // Row 2: zones 17-24
  {n:"Huerta Escolar Sur",t:"gd",i:"🌱",bg:"#2d4a1e",
    b:[
       {c:5,r:2,w:3,h:5,n:"Huerta 1",i:"🌱",shape:"crops",d:"Primera zona de cultivos.",s:0, ix:4, iy:4},
       {c:10,r:2,w:3,h:5,n:"Huerta 2",i:"🌱",shape:"crops",d:"Segunda zona de cultivos.",s:0, ix:9, iy:4},
       {c:4,r:9,w:3,h:5,n:"Casa de la Biodiversidad",i:"🏡",shape:"biodiversity_house",d:"Espacio dedicado a la biodiversidad.",s:0, ix:7, iy:11}
    ]},
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
    b:[{c:1,r:2,w:8,h:4,n:"Parqueadero",i:"🅿️",d:"Zona de parqueo.",s:0}]},
  {n:"Portería — Entrada Principal",t:"pk",i:"🚪",bg:"#3a3a3e",
    b:[{c:3,r:2,w:6,h:3,n:"Portería",i:"🚪",d:"Entrada principal de la Ciudad Educadora Espíritu Santo.",s:0}]},
];

// ===== ZONE GRID HELPERS =====
function zoneToGrid(zoneNum) {
  if (zoneNum <= 40) return { row: Math.floor((zoneNum-1)/8), col: (zoneNum-1)%8 };
  // Zonas 41-45 se conectan bajo las columnas 3 a 7 (36 a 40)
  return { row: 5, col: (zoneNum - 41) + 3 };
}

function gridToZone(row, col) {
  if (row < 0 || col < 0 || col >= 8) return null;
  if (row < 5) return row * 8 + col + 1;
  // Fila 5 (sexta fila) solo tiene casillas en columnas 3 a 7
  if (row === 5 && col >= 3 && col <= 7) return 41 + (col - 3);
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

  // Zonas de bosque denso (Reserva hídrica): limpiar caminos de hierba secretos
  if (info.t === "df") {
    info.nopaths = true; // Forzar que no haya caminos de tierra para que sea virgen
    const midC = Math.floor(MAP_W / 2);
    const midR = Math.floor(MAP_H / 2);
    let curC = midC;
    for (let r = 0; r < MAP_H; r++) {
       if (r > 2 && r < MAP_H - 2 && rng() > 0.4) curC += (rng() > 0.5 ? 1 : -1);
       if (curC < midC - 3) curC = midC - 3;
       if (curC > midC + 3) curC = midC + 3;
       if (r <= 1 || r >= MAP_H - 2) curC = midC; 
       m[r][curC] = 1;
       if (curC + 1 < MAP_W) m[r][curC + 1] = 1; 
    }
    let curR = midR;
    for (let c = 0; c < MAP_W; c++) {
       if (c > 2 && c < MAP_W - 2 && rng() > 0.4) curR += (rng() > 0.5 ? 1 : -1);
       if (curR < midR - 3) curR = midR - 3;
       if (curR > midR + 3) curR = midR + 3;
       if (c <= 1 || c >= MAP_W - 2) curR = midR;
       m[curR][c] = 1;
       if (curR + 1 < MAP_H) m[curR + 1][c] = 1;
    }
  }

  // Cut exit paths where connections exist
  if (!info.nopaths) {
    if (conns.north) cutExit(m, "north");
    if (conns.south) cutExit(m, "south");
    if (conns.east)  cutExit(m, "east");
    if (conns.west)  cutExit(m, "west");
    // Connect exits through center
    connectPaths(m, conns);
  }

  // Place buildings
  (info.b || []).forEach(function(b) {
    if (b.shape === "heroes_triangle") {
      // Custom triangular shape pointing left
      // Bounding box: c:10, r:3, w:4, h:6
      const cells = [
        [3, 13],
        [4, 12], [4, 13],
        [5, 11], [5, 12], [5, 13],
        [6, 10], [6, 11], [6, 12], [6, 13], // Punta centrada
        [7, 11], [7, 12], [7, 13],
        [8, 12], [8, 13]
      ];
      cells.forEach(pos => {
        if (pos[0] < MAP_H && pos[1] < MAP_W) m[pos[0]][pos[1]] = 3;
      });
    } else if (b.shape === "neverland_triangle") {
      // Triángulo apuntando hacia arriba, base en r=4, c=0..6
      const cells = [
        [1, 3], // Punta
        [2, 2], [2, 3], [2, 4],
        [3, 1], [3, 2], [3, 3], [3, 4], [3, 5],
        [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6] // Base
      ];
      cells.forEach(pos => {
        if (pos[0] >= 0 && pos[0] < MAP_H && pos[1] >= 0 && pos[1] < MAP_W) m[pos[0]][pos[1]] = 3;
      });
    } else if (b.shape === "neverland_triangle_2") {
      // Triángulo rectángulo plano arriba, plano a la derecha. 
      for (let relR = 0; relR < b.h; relR++) {
        for (let relC = relR; relC < b.w; relC++) {
           const nr = b.r + relR;
           const nc = b.c + relC;
           if (nr < MAP_H && nc < MAP_W) m[nr][nc] = 3;
        }
      }
    } else if (b.shape === "dystopia_triangle_2") {
      // Triángulo inferior izquierdo
      for (let relR = 0; relR < b.h; relR++) {
        for (let relC = 0; relC <= relR; relC++) {
           const nr = b.r + relR;
           const nc = b.c + relC;
           if (nr < MAP_H && nc < MAP_W) m[nr][nc] = 3;
        }
      }
    } else if (b.shape === "district12_upper") {
      // Triángulo ODS 10 apuntando a la derecha (r:1-4, c:0-4)
      const cells = [
        [1, 0], [1, 1],
        [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
        [3, 0], [3, 1], [3, 2], [3, 3], [3, 4],
        [4, 0], [4, 1]
      ];
      cells.forEach(pos => {
        if (pos[0] < MAP_H && pos[1] < MAP_W) m[pos[0]][pos[1]] = 3;
      });
    } else if (b.shape === "district12_lower") {
      // Triángulo ODS 10 inferior apuntando a la derecha (r:8-13, c:0-4)
      const cells = [
        [8, 0],
        [9, 0], [9, 1],
        [10, 0], [10, 1], [10, 2], [10, 3], [10, 4],
        [11, 0], [11, 1], [11, 2], [11, 3], [11, 4],
        [12, 0], [12, 1],
        [13, 0]
      ];
      cells.forEach(pos => {
        if (pos[0] < MAP_H && pos[1] < MAP_W) m[pos[0]][pos[1]] = 3;
      });
    } else if (b.shape === "sj_upper") {
      // Isósceles UP (r:1-5, c:1-6). Base en r:5
      const cells = [
        [1, 3], [1, 4],
        [2, 2], [2, 3], [2, 4], [2, 5],
        [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
        [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6],
        [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6]
      ];
      cells.forEach(pos => {
        if (pos[0] < MAP_H && pos[1] < MAP_W) m[pos[0]][pos[1]] = 3;
      });
    } else if (b.shape === "sj_lower") {
      // Triángulo rectángulo plano arriba, plano DERECHA. (Top-Right right angle)
      // w:4, h:4 -> r:8-11, c:1-4
      for (let relR = 0; relR < b.h; relR++) {
        for (let relC = relR; relC < b.w; relC++) {
           const nr = b.r + relR;
           const nc = b.c + relC;
           if (nr < MAP_H && nc < MAP_W) m[nr][nc] = 3;
        }
      }
    } else if (b.shape === "kin_upper") {
      // Triángulo rectángulo plano abajo, plano izquierda. (Bottom-Left right angle)
      // w:4, h:4 -> r:2-5, c:9-12
      for (let relR = 0; relR < b.h; relR++) {
        for (let relC = 0; relC <= relR; relC++) {
           const nr = b.r + relR;
           const nc = b.c + relC;
           if (nr < MAP_H && nc < MAP_W) m[nr][nc] = 3;
        }
      }
    } else if (b.shape === "kin_lower") {
      // Isósceles DOWN (r:8-12, c:8-13). Base en r:8
      const cells = [
        [8, 8], [8, 9], [8, 10], [8, 11], [8, 12], [8, 13],
        [9, 8], [9, 9], [9, 10], [9, 11], [9, 12], [9, 13],
        [10, 9], [10, 10], [10, 11], [10, 12],
        [11, 10], [11, 11]
      ];
      cells.forEach(pos => {
        if (pos[0] < MAP_H && pos[1] < MAP_W) m[pos[0]][pos[1]] = 3;
      });
    } else if (b.shape === "atlantis_upper") {
      // Triángulo ODS 6 apuntando hacia arriba, punta en c=8, base en r=4, c=5..11
      const cells = [
        [1, 8], // Punta
        [2, 7], [2, 8], [2, 9],
        [3, 6], [3, 7], [3, 8], [3, 9], [3, 10],
        [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10], [4, 11] // Base
      ];
      cells.forEach(pos => {
        if (pos[0] < MAP_H && pos[1] < MAP_W) m[pos[0]][pos[1]] = 3;
      });
    } else if (b.shape === "atlantis_lower") {
      // Triángulo rectángulo plano arriba, plano a la derecha (como Neverland 2)
      for (let relR = 0; relR < b.h; relR++) {
        for (let relC = relR; relC < b.w; relC++) {
           const nr = b.r + relR;
           const nc = b.c + relC;
           if (nr < MAP_H && nc < MAP_W) m[nr][nc] = 3;
        }
      }
    } else if (b.shape === "rotonda") {
      // La rotonda NO bloquea el movimiento — tiles permanecen walkable
      // Solo se dibuja visualmente encima
    } else if (b.shape === "atelier_triangle") {
      const cells = [
        [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10],
        [1, 5], [1, 6], [1, 7], [1, 8], [1, 9],
        [2, 6], [2, 7], [2, 8],
        [3, 7]
      ];
      cells.forEach(pos => {
        if (pos[0] >= 0 && pos[0] < MAP_H && pos[1] >= 0 && pos[1] < MAP_W) m[pos[0]][pos[1]] = 3;
      });
    } else if (b.shape === "volleyball_court") {
      for (let r = b.r; r < b.r + b.h && r < MAP_H; r++) {
         for (let c = b.c; c < b.c + b.w && c < MAP_W; c++) {
            if (m[r][c] !== 1) m[r][c] = 1; 
         }
         m[r][b.c + Math.floor(b.w/2)] = 3;
      }
    } else if (b.shape === "aux_football_court") {
      // Limpiar área pero no agregar bloqueos físicos
      for (let r = b.r; r < b.r + b.h && r < MAP_H; r++) {
         for (let c = b.c; c < b.c + b.w && c < MAP_W; c++) {
            if (m[r][c] !== 1) m[r][c] = 1; 
         }
      }
    } else if (b.shape === "hs_bridge") {
      // Remover árboles de la ruta del puente
      for (let r = b.r; r < b.r + b.h && r < MAP_H; r++) {
         for (let c = b.c; c < b.c + b.w && c < MAP_W; c++) {
            if (m[r][c] === 4) m[r][c] = 1; // 4 es árbol
         }
      }
      // El puente es aéreo, por lo que el jugador puede caminar por debajo sin colisión sólida
    } else if (b.shape === "pandora_triangle") {
      const cells = [
        [3, 0],
        [4, 0], [4, 1],
        [5, 0], [5, 1], [5, 2],
        [6, 0], [6, 1], [6, 2], [6, 3],
        [7, 0], [7, 1], [7, 2],
        [8, 0], [8, 1],
        [9, 0]
      ];
      cells.forEach(pos => { if (pos[0] < MAP_H && pos[1] < MAP_W) m[pos[0]][pos[1]] = 3; });
    } else if (b.shape === "dystopia_triangle") {
      const cells = [
        [3, 13],
        [4, 12], [4, 13],
        [5, 11], [5, 12], [5, 13],
        [6, 10], [6, 11], [6, 12], [6, 13],
        [7, 11], [7, 12], [7, 13],
        [8, 12], [8, 13],
        [9, 13]
      ];
      cells.forEach(pos => { if (pos[0] < MAP_H && pos[1] < MAP_W) m[pos[0]][pos[1]] = 3; });
    } else {
      for (let r = b.r; r < b.r + b.h && r < MAP_H; r++)
        for (let c = b.c; c < b.c + b.w && c < MAP_W; c++)
          m[r][c] = 3;
    }
  });

  // Place portal pad if zone has portals (single 2x2 pad)
  if (info.portal) {
    m[MAP_H - 3][MAP_W - 3] = 9;
    m[MAP_H - 3][MAP_W - 2] = 9;
    m[MAP_H - 2][MAP_W - 3] = 9;
    m[MAP_H - 2][MAP_W - 2] = 9;
  }

  // Manual Map Overrides (Limpieza específica)
  if (zoneNum === 9) { // Mapa 9: Bosque del Río
    // Caño de agua a la izquierda
    for (let r = 0; r < MAP_H; r++) {
      m[r][0] = 7; 
      m[r][1] = 7;
    }
    // Barrera de árboles en col 2 y 3 para que no pasen al río
    for (let r = 0; r < MAP_H; r++) {
      m[r][2] = 4;
      if (r % 2 === 0) m[r][3] = 4;
    }
    
    for (let r = 10; r < MAP_H; r++) {
      for (let c = 6; c <= 8; c++) m[r][c] = 1; 
    }
  }

  if (zoneNum === 17) { // Mapa 17: Huerta Escolar Sur
    // Limpiar zona de árboles
    for (let r = 0; r < MAP_H; r++) {
      for (let c = 0; c < MAP_W; c++) {
        if (m[r][c] === 4 || m[r][c] === 5 || m[r][c] === 6) m[r][c] = 1;
      }
    }
    // Caño de agua a la izquierda (continuación del río)
    for (let r = 0; r < MAP_H; r++) {
      m[r][0] = 7; 
      m[r][1] = 7;
    }
    // Barrera de árboles en col 2 y 3 para que no pasen al río
    for (let r = 0; r < MAP_H; r++) {
      m[r][2] = 4;
      if (r % 2 === 0) m[r][3] = 4;
    }
    m[12][8] = 1; // Forzar limpieza explícita de arbusto
  }

  if (zoneNum === 1) { // Mapa 1: Bosque PTAP
    // Liberar árbol limitante al lado este
    m[8][11] = 1;
  }
  
  if (zoneNum === 2) { // Mapa 2: Heroes
    // Remover árbol en col 12, filas 4 y 5 (índices 0-based: c=11, r=3,4)
    m[3][11] = 1;
    m[4][11] = 1;
  }
  
  if (zoneNum === 16 || zoneNum === 24) {
    // Liberar camino atascado por un árbol
    m[12][6] = 1;
  }
  
  if (zoneNum === 11) { // Mapa 11: Space Jumpers & Kintsugi
    // Limpiar TODO el mapa de flores y árboles
    for (let r = 0; r < MAP_H; r++) {
      for (let c = 0; c < MAP_W; c++) {
        if (m[r][c] === 6 || m[r][c] === 5 || m[r][c] === 4) m[r][c] = 1;
      }
    }
    // Camino horizontal (r:6, 7)
    for (let c = 0; c < MAP_W; c++) {
      m[6][c] = 2; m[7][c] = 2;
    }
    // Camino vertical entre edificios (c:7, 8)
    for (let r = 0; r < MAP_H; r++) {
      m[r][7] = 2; m[r][8] = 2;
    }
  }
  
  if (zoneNum === 13) { // Mapa 13: Rotonda & District 12
    // Limpiar TODO el mapa de flores y elementos del template que generen sombras
    for (let r = 0; r < MAP_H; r++) {
      for (let c = 0; c < MAP_W; c++) {
        if (m[r][c] === 6 || m[r][c] === 5) m[r][c] = 1; // Quitar flores y fuentes
      }
    }
    // Zigzag path desde col 13, fila 6-7 hacia la rotonda (col 10)
    m[6][13] = 2; m[7][13] = 2;
    m[6][12] = 2; m[7][12] = 2;
    m[5][11] = 2; m[6][11] = 2;
    m[6][10] = 2; m[7][10] = 2;
    // Rotonda area 6x6 — asegurar que todo sea walkable (grass)
    for (let r = 4; r <= 9; r++) {
      for (let c = 4; c <= 9; c++) {
        if (m[r][c] === 4 || m[r][c] === 3) m[r][c] = 1;
      }
    }
    // Limpiar árboles alrededor de la rotonda
    for (let r = 3; r <= 10; r++) {
      for (let c = 3; c <= 10; c++) {
        if (m[r][c] === 4) m[r][c] = 1;
      }
    }
  }
  
  if (zoneNum === 14) { // Mapa 14: High School Extension
    // Quitar todos los árboles del lado izquierdo y derecho limitantes
    for (let r = 0; r < MAP_H; r++) {
       for (let c = 0; c < 5; c++) {
          if (m[r][c] === 4) m[r][c] = 1; // 4 es árbol
       }
       for (let c = 10; c < MAP_W; c++) {
          if (m[r][c] === 4) m[r][c] = 1;
       }
    }

    // Trazar un camino en diagonal (zigzag suave con conexión horizontal)
    m[0][4] = 2; m[1][4] = 2; // Fila 1 y 2, Col 5 (index 4)
    m[1][3] = 2; m[2][3] = 2; // Fila 2 y 3, Col 4 (index 3)
    m[2][2] = 2; m[3][2] = 2; // Fila 3 y 4, Col 3 (index 2)
    m[3][1] = 2; m[4][1] = 2; // Fila 4 y 5, Col 2 (index 1)
    m[4][0] = 2; m[5][0] = 2; // Fila 5 y 6, Col 1 (index 0)
    
    // Y un camino recto hacia abajo en la columna 5 desde la fila 7 a la 14
    for (let r = 6; r < MAP_H; r++) {
       m[r][4] = 2;
    }
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
