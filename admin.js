// Configuración de Firebase
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

let currentStudentId = null;
let currentStudentData = null;
let allStudents = [];

// Listas de Opciones con etiquetas asociativas (tags) para búsqueda semántica
const faltasList = [
  { text: "Llegar a la institución después de la hora señalada (7:30 am).", tags: "tarde retraso hora llegar impuntualidad" },
  { text: "Promover el desorden o indisciplina en corredores o aulas.", tags: "desorden bulla ruido indisciplina molestar" },
  { text: "Consumir alimentos en horas de clases o ambientes de aprendizaje.", tags: "comer alimentos comida masticar dulce" },
  { text: "No cumplir con normas de presentación personal o uniforme.", tags: "uniforme camisa ropa presentacion desaliñado" },
  { text: "Utilizar apodos y/o bromas de mal gusto con compañeros.", tags: "apodos bromas bullying burlas molestar ofender" },
  { text: "Interrumpir clases con chistes o gestos inoportunos.", tags: "interrumpir chistes payaso gestos clase" },
  { text: "Utilizar el celular en el aula sin autorización.", tags: "celular telefono movil jugar pantalla" },
  { text: "Pegar chicles o adhesivos en paredes, mobiliario o compañeros.", tags: "chicle basura pegar ensuciar" },
  { text: "No entregar comunicaciones enviadas a los formadores.", tags: "comunicacion nota circular firmar esconder" },
  { text: "Incumplir compromisos académicos previstos.", tags: "tarea tarea academico compromiso deberes olvidar" },
  { text: "No asistir a clase injustificadamente o evadir compromisos.", tags: "evadir escapar fuga saltar clase capar" },
  { text: "Realizar grafitis sobre paredes, tableros o mobiliario.", tags: "dibujar rayar grafiti pared mesa dañar" },
  { text: "Expresarse de manera descortés con cualquier miembro.", tags: "groseria descortes insolencia falta respeto" },
  { text: "Comercializar elementos sin autorización.", tags: "vender negocio comercializar comprar dulces" },
  { text: "No acatar indicaciones formativas de directivos.", tags: "desobedecer rebeldia rebelde ignorar" },
  { text: "Cometer actos vandálicos o daños intencionales a instalaciones.", tags: "daño romper destrozar vandalismo dañar" },
  { text: "Permanecer en espacios no autorizados.", tags: "esconderse zona prohibida lugar" },
  { text: "Pretextar enfermedad exagerada para eludir responsabilidades.", tags: "mentir excusa fingir enfermo" },
  { text: "Negarse a realizar experiencias de aprendizaje.", tags: "pereza negarse trabajar no hacer nada" },
  { text: "Excesivas demostraciones de afecto corporal.", tags: "besos abrazos novios exhibicionismo" },
  { text: "Esconder elementos en casilleros.", tags: "esconder robar broma maleta guardar" },
  { text: "Injuria, difamación u ofensas graves.", tags: "insulto chisme rumor ofensa grave" },
  { text: "Discriminación injustificada (racismo, bullying, exclusión).", tags: "racismo exclusion apartar discriminar acoso" },
  { text: "Incumplimiento a compromisos de actas firmadas.", tags: "acta compromiso repetir reincidir" },
  { text: "Amenazas directas/indirectas contra cualquier persona.", tags: "amenaza asustar amedrentar miedo" },
  { text: "Comportamiento de carácter inmoral o vocabulario soez.", tags: "groserias madrazo vulgaridad" },
  { text: "Altivez, insolencia y agresividad contra la autoridad.", tags: "gritar profesor altanero agresividad" },
  { text: "Fraudes académicos (suplantación, copias, plagios).", tags: "copia trampa pastel plagio trampa" },
  { text: "Porte, venta de armas, explosivos o drogas.", tags: "droga cuchillo arma fumar vapeador vaper" },
  { text: "Hurto, hackeo, extorsión, o ataques a la plataforma.", tags: "robar robo hurto llevarse dinero extorsion hackear" },
  { text: "Conformación de pandillas, sobornos o abusos sexuales.", tags: "abuso acoso banda pandilla soborno" }
];

const actosList = [
  { text: "[Cuidado] Defender a un compañero en situación de burla o exclusión.", tags: "defender proteger ayuda consolar llorar abogar aliado" },
  { text: "[Cuidado] Acompañar emocionalmente a alguien sin que se lo pidan.", tags: "consolar llorar abrazo acompañar amigos tristeza" },
  { text: "[Cuidado] Mediar un conflicto de forma autónoma y efectiva.", tags: "pelea mediar separar reconciliar paz arbitro" },
  { text: "[Cuidado] Incluir activamente a alguien nuevo o aislado.", tags: "nuevo incluir jugar solo integrar" },
  { text: "[Honestidad] Devolver objetos perdidos sin buscar reconocimiento.", tags: "devolver encontrar robar perder honrado" },
  { text: "[Honestidad] Admitir un error propio que afectaba a otros.", tags: "culpa perdon aceptar disculpa error reconocer" },
  { text: "[Honestidad] Rechazar participar en una acción negativa del grupo.", tags: "rechazar negativo presion decir no valiente" },
  { text: "[Honestidad] Denunciar una situación injusta responsablemente.", tags: "denunciar avisar avisarle profesor justicia verdad" },
  { text: "[Impacto] Proponer y ejecutar una mejora en el salón o colegio.", tags: "idea proyecto proponer mejorar salon clase" },
  { text: "[Impacto] Liderar una iniciativa ambiental o social.", tags: "basura ambiente social reciclar liderar" },
  { text: "[Impacto] Organizar ayuda colectiva ante una necesidad concreta.", tags: "recolecta donacion ayuda cooperacion solidario" },
  { text: "[Impacto] Generar acuerdos que mejoren la convivencia del grupo.", tags: "acuerdos proponer union curso representante" },
  { text: "[Respeto] Promover el uso de lenguaje adecuado en el grupo.", tags: "vocabulario groserias corregir palabras respeto" },
  { text: "[Respeto] Reconocer públicamente el trabajo de otros.", tags: "felicitar aplaudir merito reconocer trabajo" },
  { text: "[Respeto] Evitar conflictos escalando desde la palabra.", tags: "calmar dialogo conversar respirar inteligencia" },
  { text: "[CEES] Persistir en una dificultad sin abandonar.", tags: "esfuerzo persistir intentar resiliencia duro" },
  { text: "[CEES] Participar en procesos democráticos argumentando.", tags: "votar debate consejo opinar argumento" },
  { text: "[CEES] Proponer mejoras en dinámicas de Gobierno de Ciudad.", tags: "gobierno ciudad propuestas alcalde" },
  { text: "[CEES] Actuar de forma sostenible e inspiradora.", tags: "ejemplo ecologico cuidar modelar" },
  { text: "[Transformación] Superar una dificultad conductual con evidencia.", tags: "mejorar cambio portarse bien superacion progreso" },
  { text: "[Transformación] Mostrar crecimiento en autocontrol o respeto.", tags: "calmado rabia manejo emociones paciencia" },
  { text: "[Transformación] Mantener un promedio académico superior a 8.0.", tags: "notas academico estudio excelencia inteligente" }
];

function filterDescOptions() {
  const type = document.getElementById('reg-type').value;
  const inputEl = document.getElementById('reg-desc-search');
  const resultsEl = document.getElementById('desc-search-results');
  
  if(!inputEl) return;
  const query = inputEl.value.toLowerCase();
  
  let options = type === 'Falta' ? faltasList : actosList;
  let filtered = options.filter(o => 
     o.text.toLowerCase().includes(query) || o.tags.toLowerCase().includes(query)
  );
  
  if(filtered.length === 0 || query.length === 0 && type === 'Falta') {
     // Si está en foco pero sin texto, mostrar unas pocas opciones por defecto.
     filtered = options.slice(0, 10);
  }
  
  if(filtered.length === 0) {
      resultsEl.style.display = 'none';
      return;
  }
  
  resultsEl.innerHTML = filtered.map(opt => {
      let safeOpt = opt.text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
      return `<div style="padding: 10px; border-bottom: 1px solid #eee; cursor: pointer; font-size: 13px; font-weight: 600;" 
                onmouseover="this.style.background='#f1f8e9'" onmouseout="this.style.background='#fff'"
                onclick="selectDescOption('${safeOpt}')">${opt.text}</div>`;
  }).join('');
  
  resultsEl.style.display = 'block';
}

function selectDescOption(val) {
  document.getElementById('reg-desc-search').value = val;
  document.getElementById('desc-search-results').style.display = 'none';
}

function updateDescOptions() {
  document.getElementById('reg-desc-search').value = '';
  document.getElementById('reg-desc').value = '';
}

// Close the autocomplete when clicking outside
document.addEventListener('click', function(e) {
  if (e.target.id !== 'reg-desc-search' && e.target.id !== 'desc-search-results') {
    let el = document.getElementById('desc-search-results');
    if(el) el.style.display = 'none';
  }
});

// Rellenar fecha de hoy
document.getElementById('reg-date').valueAsDate = new Date();

let firstLoadDone = false;

window.addEventListener('load', () => {
   const token = sessionStorage.getItem('adminAutoLogin');
   if(token) {
       document.getElementById('admin-pass').value = token;
       loginAdmin();
       sessionStorage.removeItem('adminAutoLogin');
   }
});

function loginAdmin() {
  const pass = document.getElementById('admin-pass').value;
  if(pass === "Alexander.91*" || pass === "911124") {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    
    // SUSCRIPCIÓN EN TIEMPO REAL (onSnapshot)
    db.collection("ciudadano").onSnapshot(snap => {
       allStudents = snap.docs.map(doc => ({id: doc.id, ...doc.data()}));
       
       // Actualizar UI automáticamente
       actualizarContadorAlarmas();
       if(document.getElementById('database-view').style.display === 'block') {
         renderDatabaseView();
       }
       
       // --- INYECCIÓN DE CURSOS AUTOMÁTICA (UNA SOLA EJECUCIÓN AL INICIO) ---
       if(!firstLoadDone) {
           firstLoadDone = true;
           if(window.cursosMap) {
               let mapa = window.cursosMap;
               let actualizaciones = 0;
               let batchArray = [db.batch()];
               let bIndex = 0;
               let bCount = 0;
               for(let s of allStudents){
                  let limpio = s.nombre ? s.nombre.trim() : "";
                  if(mapa[limpio] && s.curso !== mapa[limpio]) {
                     batchArray[bIndex].update(db.collection('ciudadano').doc(s.id), {curso: mapa[limpio]});
                     s.curso = mapa[limpio];
                     actualizaciones++;
                     bCount++;
                     if(bCount >= 400){ batchArray.push(db.batch()); bIndex++; bCount=0; }
                  }
               }
               if(actualizaciones > 0){
                  (async () => {
                     try {
                        for(let b of batchArray) { await b.commit(); }
                        console.log("Cursos sincronizados con éxito.");
                        document.getElementById('search-status').innerHTML = `<span style="color:#388e3c">✓ ${actualizaciones} cursos cargados con éxito.</span>`;
                     } catch(e) { console.error("Error al actualizar firebase:", e); }
                  })();
               }
           }
       }
    });
  } else {
    document.getElementById('admin-error').style.display = 'block';
  }
}


function logoutAdmin() {
  document.getElementById('admin-login').style.display = 'flex';
  document.getElementById('admin-dashboard').style.display = 'none';
  document.getElementById('admin-pass').value = '';
  document.getElementById('admin-error').style.display = 'none';
  document.getElementById('student-panel').style.display = 'none';
}

function filterStudents() {
  const query = document.getElementById('search-name').value.toLowerCase();
  const resultsEl = document.getElementById('search-results');
  
  if(query.length < 2) {
     resultsEl.style.display = 'none';
     return;
  }
  
  const filtered = allStudents.filter(s => s.nombre && s.nombre.toLowerCase().includes(query)).slice(0, 15);
  
  if(filtered.length === 0) {
     resultsEl.innerHTML = '<div style="padding: 10px; color: #777;">No se encontraron resultados.</div>';
     resultsEl.style.display = 'block';
     return;
  }
  
  resultsEl.innerHTML = filtered.map(s => 
     `<div style="padding: 10px; border-bottom: 1px solid #eee; cursor: pointer;" onclick="searchStudent('${s.id}')" onmouseover="this.style.background='#f1f8e9'" onmouseout="this.style.background='#fff'">
        <strong>${s.nombre}</strong> <span style="color: #777; font-size: 12px;">(Cód: ${s.id})</span>
      </div>`
  ).join('');
  resultsEl.style.display = 'block';
}

function searchStudent(code) {
  const statusEl = document.getElementById('search-status');
  const panel = document.getElementById('student-panel');
  const resultsEl = document.getElementById('search-results');
  
  // Limpiar busqueda
  document.getElementById('search-name').value = '';
  resultsEl.style.display = 'none';
  
  if(!code) return;
  
  statusEl.textContent = "Cargando...";
  panel.style.display = 'none';
  
  db.collection("ciudadano").doc(code).get().then(doc => {
    if(doc.exists) {
      currentStudentId = code;
      currentStudentData = doc.data();
      statusEl.textContent = "";
      
      document.getElementById('st-name').textContent = currentStudentData.nombre || "Sin Nombre";
      document.getElementById('st-fase').value = currentStudentData.fase || "colibri-c1";
      document.getElementById('st-estrellas').textContent = currentStudentData.estrellas || 0;
      
      panel.style.display = 'block';
      loadHistory(code);
    } else {
      statusEl.textContent = "Estudiante no encontrado en la base de datos.";
    }
  }).catch(err => {
    statusEl.textContent = "Error al buscar: " + err.message;
  });
}

function updateFase() {
  if(!currentStudentId) return;
  const newFase = document.getElementById('st-fase').value;
  const statusEl = document.getElementById('fase-update-status');
  
  db.collection("ciudadano").doc(currentStudentId).update({ fase: newFase }).then(() => {
     currentStudentData.fase = newFase;
     statusEl.style.display = 'inline-block';
     setTimeout(() => { statusEl.style.display = 'none'; }, 3000);
     
     // Update cache too
     const studentInCache = allStudents.find(s => s.id === currentStudentId);
     if(studentInCache) studentInCache.fase = newFase;
  }).catch(err => {
     alert("Error actualizando fase: " + err.message);
  });
}

function parseFase(faseStr) {
  if(!faseStr) return "Sin ruta asignada";
  const parts = faseStr.split('-');
  if(parts.length !== 2) return faseStr;
  const rutas = { "colibri": "Ruta Colibrí", "abeja": "Ruta Abeja", "halcon": "Ruta Halcón", "mariposa": "Ruta Mariposa", "albatros": "Ruta Albatros" };
  return `${rutas[parts[0]] || parts[0]} (Nodo ${parts[1].toUpperCase()})`;
}

function loadHistory(studentId) {
  const container = document.getElementById('history-container');
  container.innerHTML = '<p style="color: #78909c;">Cargando historial...</p>';
  
  db.collection("ciudadano").doc(studentId).collection("historial")
    .orderBy("timestamp", "desc")
    .get().then(snapshot => {
      container.innerHTML = '';
      if(snapshot.empty) {
        container.innerHTML = '<p style="color: #78909c;">No hay registros previos.</p>';
        return;
      }
      
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement('div');
        div.className = `history-item ${data.tipo === 'Falta' ? 'falta' : 'acto'}`;
        div.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <span class="badge ${data.tipo === 'Falta' ? 'falta' : 'acto'}">${data.tipo}</span>
              <span class="date">${data.fecha}</span>
            </div>
            <button onclick="deleteRecord('${doc.id}', '${data.tipo}')" style="width: auto; padding: 4px 8px; background: transparent; color: #e53935; border: none; box-shadow: none;" title="Borrar Registro (Clave: 1023)"><span class="material-symbols-rounded">delete</span></button>
          </div>
          <p style="margin: 0; font-size: 15px;">${data.descripcion}</p>
        `;
        container.appendChild(div);
      });
    }).catch(err => {
      container.innerHTML = `<p style="color: red;">Error al cargar historial: ${err.message}</p>`;
    });
}

function addRecord() {
  if(!currentStudentId) return;
  
  const tipo = document.getElementById('reg-type').value;
  const fecha = document.getElementById('reg-date').value;
  const selectVal = document.getElementById('reg-desc-search').value.trim();
  const descripcion = document.getElementById('reg-desc').value.trim();
  const status = document.getElementById('save-status');
  
  let finalDesc = descripcion;
  if(selectVal) {
     finalDesc = selectVal + (descripcion ? " - Observación: " + descripcion : "");
  }
  
  if(!fecha || !finalDesc) {
    alert("Por favor completa la fecha y la descripción o selecciona una opción.");
    return;
  }
  
  status.style.display = 'block';
  status.style.color = '#78909c';
  status.textContent = "Guardando...";
  
  const record = {
    tipo: tipo,
    fecha: fecha,
    descripcion: finalDesc,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  };
  
  // Batch para guardar historial y actualizar estrellas si es acto
  const batch = db.batch();
  
  const historyRef = db.collection("ciudadano").doc(currentStudentId).collection("historial").doc();
  batch.set(historyRef, record);
  
  if(tipo === 'Acto') {
    const studentRef = db.collection("ciudadano").doc(currentStudentId);
    batch.update(studentRef, {
      estrellas: firebase.firestore.FieldValue.increment(1)
    });
  }
  
  batch.commit().then(() => {
    status.style.color = '#2e7d32';
    status.textContent = "Registro guardado exitosamente.";
    document.getElementById('reg-desc').value = '';
    document.getElementById('reg-desc-search').value = '';
    
    // Update local data if acto
    if(tipo === 'Acto') {
       let currentStars = parseInt(document.getElementById('st-estrellas').textContent) || 0;
       document.getElementById('st-estrellas').textContent = currentStars + 1;
    }
    
    loadHistory(currentStudentId);
    
    setTimeout(() => { status.style.display = 'none'; }, 3000);
  }).catch(err => {
    status.style.color = 'red';
    status.textContent = "Error al guardar: " + err.message;
  });
}

function deleteRecord(recordId, tipo) {
  const pin = window.prompt("Ingrese el código de acceso (1023) para eliminar este registro permanentemente:");
  if (pin !== "1023") {
    if(pin !== null) alert("Código incorrecto. Operación cancelada.");
    return;
  }
  
  if(!currentStudentId) return;
  
  const recordRef = db.collection("ciudadano").doc(currentStudentId).collection("historial").doc(recordId);
  const batch = db.batch();
  batch.delete(recordRef);
  
  if (tipo === 'Acto') {
    const studentRef = db.collection("ciudadano").doc(currentStudentId);
    batch.update(studentRef, {
      estrellas: firebase.firestore.FieldValue.increment(-1)
    });
  }
  
  batch.commit().then(() => {
    if (tipo === 'Acto') {
      let currentStars = parseInt(document.getElementById('st-estrellas').textContent) || 0;
      document.getElementById('st-estrellas').textContent = Math.max(0, currentStars - 1);
    }
    loadHistory(currentStudentId);
  }).catch(err => {
    alert("Error al borrar: " + err.message);
  });
}

function showCrearModal() { document.getElementById('modal-nuevo').style.display = 'flex'; }
function hideCrearModal() { document.getElementById('modal-nuevo').style.display = 'none'; }

function crearCiudadanoBaseDatos() {
  const cod = document.getElementById('new-cod').value.trim();
  const ape = document.getElementById('new-ape').value.trim().toUpperCase();
  const nom = document.getElementById('new-nom').value.trim().toUpperCase();
  const curso = document.getElementById('new-curso').value;
  
  if(!cod || !ape || !nom) return alert("Completa los campos principales.");
  
  const nombreCompleto = ape + ", " + nom;
  const data = {
    nombre: nombreCompleto,
    curso: curso,
    fase: "sin ruta",
    estrellas: 0,
    contraseña: cod,
    cambioContrasena: false,
    creadoManual: true
  };
  
  db.collection("ciudadano").doc(cod).set(data).then(() => {
    alert("Ciudadano creado exitosamente.");
    hideCrearModal();
    document.getElementById('new-cod').value = '';
    document.getElementById('new-ape').value = '';
    document.getElementById('new-nom').value = '';
    
    // update cache
    data.id = cod;
    allStudents.push(data);
    if(document.getElementById('database-view').style.display === 'block') {
      renderDatabaseView();
    }
  }).catch(err => alert("Error: " + err.message));
}

function showDatabaseView(skipReset = false) {
  document.getElementById('search-card').style.display = 'none';
  document.getElementById('student-panel').style.display = 'none';
  document.getElementById('database-view').style.display = 'block';
  
  // Resetear filtros exclusivos SOLO si no venimos del botón de alarmas directo
  if(!skipReset) {
    filteringOnlyAlarms = false;
    const btn = document.getElementById('btn-alarmas-global');
    if(btn) {
      btn.style.border = "2px solid white";
      btn.style.boxShadow = "0 0 10px rgba(229, 57, 53, 0.4)";
    }
  }
  renderDatabaseView();
}

function hideDatabaseView() {
  document.getElementById('database-view').style.display = 'none';
  document.getElementById('search-card').style.display = 'block';
  document.getElementById('search-results').style.display = 'none';
  // Resetear filtros exclusivos al volver al buscador principal
  filteringOnlyAlarms = false;
  const btn = document.getElementById('btn-alarmas-global');
  if(btn) {
    btn.style.border = "2px solid white";
    btn.style.boxShadow = "0 0 10px rgba(229, 57, 53, 0.4)";
  }
}

let filteringOnlyAlarms = false;

function actualizarContadorAlarmas() {
  const count = allStudents.filter(s => s.alertaRoja).length;
  const btn = document.getElementById('btn-alarmas-global');
  const badge = document.getElementById('alarm-count-badge');
  if(count > 0) {
    btn.style.display = 'inline-block';
    badge.textContent = count;
  } else {
    btn.style.display = 'none';
  }
}

function filtrarSoloAlarmas() {
  filteringOnlyAlarms = !filteringOnlyAlarms;
  const btn = document.getElementById('btn-alarmas-global');
  if(filteringOnlyAlarms) {
    btn.style.border = "3px solid #ffeb3b";
    btn.style.boxShadow = "0 0 20px rgba(255, 235, 59, 0.6)";
    showDatabaseView(true); // Pasar true para que NO resetee el filtro que acabamos de poner
  } else {
    btn.style.border = "2px solid white";
    btn.style.boxShadow = "0 0 10px rgba(229, 57, 53, 0.4)";
    renderDatabaseView();
  }
}

function renderDatabaseView() {
  const query = document.getElementById('db-search').value.toLowerCase();
  const cursoQuery = document.getElementById('db-curso-filter').value.toLowerCase();
  const faseFilter = document.getElementById('db-fase-filter').value;
  const sortOption = document.getElementById('db-sort').value;
  const tbody = document.getElementById('db-table-body');
  
  let result = [...allStudents];
  
  // Si hay búsqueda manual, desactivar el filtro exclusivo de alarmas automáticamente
  if(query) {
    if(filteringOnlyAlarms) {
      filteringOnlyAlarms = false;
      const btn = document.getElementById('btn-alarmas-global');
      if(btn) {
        btn.style.border = "2px solid white";
        btn.style.boxShadow = "0 0 10px rgba(229, 57, 53, 0.4)";
      }
    }
  }

  if(filteringOnlyAlarms) {
    result = result.filter(s => s.alertaRoja);
    const statusDiv = document.getElementById('alarm-filter-status');
    if(statusDiv) statusDiv.style.display = 'flex';
  } else {
    const statusDiv = document.getElementById('alarm-filter-status');
    if(statusDiv) statusDiv.style.display = 'none';
  }
  
  if (query) {
    result = result.filter(s => (s.nombre && s.nombre.toLowerCase().includes(query)) || (s.id && s.id.toLowerCase().includes(query)));
  }
  
  if (cursoQuery) {
    if (cursoQuery === "ciclo_preescolar") {
       const pre = ["infants", "toddlers", "prekinder", "kinder", "transition"];
       result = result.filter(s => s.curso && pre.some(p => s.curso.toLowerCase().includes(p)));
    } else if (cursoQuery === "ciclo_elementary") {
       const ele = ["primero", "segundo", "tercero", "cuarto"];
       result = result.filter(s => s.curso && ele.some(p => s.curso.toLowerCase().includes(p)));
    } else if (cursoQuery === "ciclo_junior") {
       const jun = ["quinto", "sexto", "séptimo", "octavo"];
       result = result.filter(s => s.curso && jun.some(p => s.curso.toLowerCase().includes(p)));
    } else if (cursoQuery === "ciclo_high") {
       const hig = ["noveno", "décimo", "undécimo"];
       result = result.filter(s => s.curso && hig.some(p => s.curso.toLowerCase().includes(p)));
    } else {
       result = result.filter(s => (s.curso && s.curso.toLowerCase().includes(cursoQuery)));
    }
  }
  
  if (faseFilter !== 'todas') {
    result = result.filter(s => {
      let f = s.fase || "sin ruta";
      return f.startsWith(faseFilter);
    });
  }
  
  result.sort((a,b) => {
    // 1. PRIORIDAD: Alerta Roja siempre arriba
    if(a.alertaRoja !== b.alertaRoja) return (a.alertaRoja ? -1 : 1);
    
    // 2. PRIORIDAD: Chat Nuevo (NEW) después de alertas
    if(a.chatNuevo !== b.chatNuevo) return (a.chatNuevo ? -1 : 1);
    
    // 3. Ordenamiento secundario seleccionado por el usuario
    if(sortOption === 'nombre-asc') return (a.nombre || "").localeCompare(b.nombre || "");
    if(sortOption === 'estrellas-desc') return (b.estrellas || 0) - (a.estrellas || 0);
    if(sortOption === 'estrellas-asc') return (a.estrellas || 0) - (b.estrellas || 0);
    if(sortOption === 'codigo-asc') {
       let numA = parseInt(a.id); let numB = parseInt(b.id);
       if(!isNaN(numA) && !isNaN(numB)) return numA - numB;
       return a.id.localeCompare(b.id);
    }
  });
  
  tbody.innerHTML = result.map(s => {
    let mark = (s.creadoManual || s.id.startsWith("NUEVO-")) ? '<span style="color:#e53935; font-weight:bold;" title="Creado Manualmente o sin ID en Excel">*</span>' : '';
    let curs = s.curso ? s.curso : '<span style="color:#9e9e9e;">N/A</span>';
    let safeName = s.nombre ? s.nombre.replace(/'/g, "\\'") : "";
    
    // Semaforo de Chat
    let chatColor = "#0288d1"; // Azul (Default)
    if(s.alertaRoja) chatColor = "#e53935"; // Rojo (Alerta)
    else if(s.tieneChat) chatColor = "#2e7d32"; // Verde (Interactuó)
    
    let chatBadge = s.chatNuevo ? `<span class="chat-new-badge">NEW</span>` : "";
    
    let chatBtn = `<div style="position:relative; display:inline-block;">
      ${chatBadge}
      <button onclick="abrirBitacora('${s.id}', '${safeName}')" style="background:${chatColor}; color:white; border:none; border-radius:15px; padding: 4px 10px; cursor:pointer; min-width: 40px;">
        ${s.alertaRoja ? '🚨' : '<span class="material-symbols-rounded" style="font-size:16px; vertical-align:middle;">forum</span>'}
      </button>
    </div>`;
    
    return `<tr style="border-bottom: 1px solid #eee; background: ${s.alertaRoja ? '#ffebee' : 'transparent'};">
      <td style="padding: 10px; font-weight: 800;">${s.id} ${mark}</td>
      <td style="padding: 10px; font-weight: bold; color: #455a64;">${curs}</td>
      <td style="padding: 10px;">${s.nombre}</td>
      <td style="padding: 10px; text-align: center;">${parseFase(s.fase)}</td>
      <td style="padding: 10px; color:#fbc02d; font-weight:900; text-align: center;">★ ${s.estrellas || 0}</td>
      <td style="padding: 10px; text-align: center;">${chatBtn}</td>
      <td style="padding: 10px; text-align: right;">
        <button onclick="showEditarModal('${s.id}')" style="background:#4CAF50; padding:6px; font-size:12px; border:none; border-radius:4px; color:white; cursor:pointer;">Editar</button>
      </td>
    </tr>`;
  }).join('');
}

function showEditarModal(cod) {
  const student = allStudents.find(s => s.id === cod);
  if(!student) return;
  document.getElementById('edit-old-cod').value = cod;
  document.getElementById('edit-cod').value = cod;
  document.getElementById('edit-nom').value = student.nombre;
  
  // Seleccionar curso en el select (asegurando coincidencia de mayúsculas)
  const cursoVal = (student.curso || "SIN ASIGNAR").toUpperCase();
  document.getElementById('edit-curso').value = cursoVal;
  
  document.getElementById('edit-pass').value = student.contraseña || student.password || "";
  document.getElementById('modal-editar').style.display = 'flex';
}

function hideEditarModal() { document.getElementById('modal-editar').style.display = 'none'; }

async function guardarEdicionCiudadano() {
  const oldCod = document.getElementById('edit-old-cod').value;
  const newCod = document.getElementById('edit-cod').value.trim();
  const newNom = document.getElementById('edit-nom').value.trim().toUpperCase();
  const newCurso = document.getElementById('edit-curso').value;
  const newPass = document.getElementById('edit-pass').value.trim();
  
  if(!newCod || !newNom || !newPass) return alert("Los campos principales no pueden estar vacíos.");
  
  const btn = document.querySelector('#modal-editar button:nth-child(2)');
  btn.textContent = "Trabajando...";
  btn.disabled = true;
  
  try {
    if(oldCod === newCod) {
        // Solo editar nombre, curso o pass
        let updateData = { nombre: newNom, curso: newCurso, contraseña: newPass };
        // Si la clave es el código, obligamos al cambio al entrar
        if(newPass === newCod) {
            updateData.cambioContrasena = false;
        }
        await db.collection("ciudadano").doc(oldCod).update(updateData);
        const s = allStudents.find(x => x.id === oldCod);
        if(s) {
            s.nombre = newNom;
            s.curso = newCurso;
            s.contraseña = newPass;
            if(newPass === newCod) s.cambioContrasena = false;
        }
    } else {
       // Operación compleja: migración a nuevo ID
       const oldRef = db.collection("ciudadano").doc(oldCod);
       const newRef = db.collection("ciudadano").doc(newCod);
       
       const docSnap = await oldRef.get();
       if(!docSnap.exists) throw new Error("Documento viejo no existe.");
       
       const data = docSnap.data();
       data.nombre = newNom;
       data.curso = newCurso;
       data.contraseña = newPass; 
       if(newPass === newCod) data.cambioContrasena = false;
       
       const histSnap = await oldRef.collection("historial").get();
       const batch = db.batch();
       
       // Grabar en nuevo REF
       batch.set(newRef, data);
       
       histSnap.forEach(hdoc => {
         const newHRef = newRef.collection("historial").doc(hdoc.id);
         batch.set(newHRef, hdoc.data());
         batch.delete(oldRef.collection("historial").doc(hdoc.id));
       });
       
       batch.delete(oldRef);
       await batch.commit();
       
       // Actualizar caché
       const index = allStudents.findIndex(x => x.id === oldCod);
       if(index !== -1) {
           data.id = newCod;
           allStudents[index] = data;
       }
    }
    
    alert("Edición y/o migración exitosa.");
    hideEditarModal();
    renderDatabaseView();
  } catch(e) {
    alert("Error crítico durante guardado: " + e.message);
  } finally {
    btn.textContent = "Guardar Cambios";
    btn.disabled = false;
  }
}

async function borrarBaseDeDatosCompleta() {
  const pin = window.prompt("⚠️ CUIDADO: Estás a punto de borrar absolutamente toda la base de datos de ciudadanos. Ingresa el PIN (1023) maestro para proceder:");
  if(pin !== "1023") {
    if(pin !== null) alert("PIN incorrecto. Operación abortada.");
    return;
  }
  
  const confirm = window.confirm("¿Estás COMPLETAMENTE SEGURO? Esta acción es irreversible y tu panel quedará vacío.");
  if(!confirm) return;
  
  document.body.style.cursor = "wait";
  alert("Iniciando borrado maestro. Por favor NO cierres la ventana hasta terminar.");
  
  try {
     const snapshot = await db.collection("ciudadano").get();
     let batches = [];
     let currentBatch = db.batch();
     let opsCount = 0;
     
     for (const doc of snapshot.docs) {
         const histSnap = await doc.ref.collection("historial").get();
         for (const hDoc of histSnap.docs) {
             currentBatch.delete(hDoc.ref);
             opsCount++;
             if(opsCount === 400) { batches.push(currentBatch); currentBatch = db.batch(); opsCount = 0; }
         }
         currentBatch.delete(doc.ref);
         opsCount++;
         if(opsCount === 400) { batches.push(currentBatch); currentBatch = db.batch(); opsCount = 0; }
     }
     
     if (opsCount > 0) batches.push(currentBatch);
     
     for (const b of batches) {
        await b.commit();
     }
     
     allStudents = [];
     renderDatabaseView();
     alert("Base de datos borrada con éxito. La plataforma está limpia.");
  } catch(e) {
     alert("Error crítico durante el borrado: " + e.message);
  } finally {
     document.body.style.cursor = "default";
  }
}

async function eliminarCiudadanoIndividual() {
  const cod = document.getElementById('edit-old-cod').value;
  if(!cod) return;
  
  const pin = window.prompt("Ingrese PIN (1023) para eliminar permanentemente al estudiante con código: " + cod);
  if (pin !== "1023") {
      if(pin !== null) alert("PIN incorrecto.");
      return;
  }
  
  const btn = document.querySelector('#modal-editar button:last-child');
  const originalText = btn.textContent;
  btn.textContent = "Borrando...";
  btn.disabled = true;
  
  try {
     const ref = db.collection("ciudadano").doc(cod);
     const histSnap = await ref.collection("historial").get();
     const batch = db.batch();
     histSnap.forEach(d => batch.delete(d.ref));
     batch.delete(ref);
     await batch.commit();
     
     allStudents = allStudents.filter(s => s.id !== cod);
     alert("Estudiante eliminado correctamente.");
     hideEditarModal();
     renderDatabaseView();
  } catch (e) {
     alert("Error eliminando estudiante: " + e.message);
  } finally {
     btn.textContent = originalText;
     btn.disabled = false;
  }
}

// Escuchar enter en el admin pass
document.getElementById('admin-pass').addEventListener('keypress', function(e) {
  if(e.key === 'Enter') loginAdmin();
});

// Inicializar opciones de descripcion al cargar
setTimeout(() => {
  if(document.getElementById('reg-type')) updateDescOptions();
}, 500);

// ==========================================
// VISOR DE BITÁCORA Y ALERTAS ALBATROS
// ==========================================
let currentChatStudent = null;

function abrirBitacora(studentId, studentName) {
   currentChatStudent = studentId;
   document.getElementById('chat-student-name').textContent = studentName;
   document.getElementById('admin-chat-modal').style.display = 'flex';
   document.getElementById('chat-alerta-banner').style.display = 'none';
   document.getElementById('chat-summary-area').style.display = 'none';
   document.getElementById('chat-log-container').innerHTML = '<p style="text-align:center; color:#888;">Cargando transcripción oculta...</p>';
   
   db.collection("ciudadano").doc(studentId).get().then(doc => {
       const data = doc.data();
       if(doc.exists && data.alertaRoja) document.getElementById('chat-alerta-banner').style.display = 'block';
       
       if(doc.exists && data.resumenSituacion) {
           document.getElementById('chat-summary-area').style.display = 'block';
           document.getElementById('chat-summary-text').textContent = data.resumenSituacion;
       }

       if(doc.exists && data.chatNuevo) {
           db.collection("ciudadano").doc(studentId).update({chatNuevo: false});
           let s = allStudents.find(x => x.id === studentId);
           if(s) s.chatNuevo = false;
           renderDatabaseView();
       }
   });
   
   db.collection("ciudadano").doc(studentId).collection('chats').orderBy('timestamp', 'asc').get().then(snap => {
       let container = document.getElementById('chat-log-container');
       if(snap.empty) {
           container.innerHTML = '<p style="text-align:center; color:#888;"><br><br><span class="material-symbols-rounded" style="font-size:48px; color:#ddd;">chat_bubble_outline</span><br><br>Este ciudadano aún no ha interactuado con Jhoncito.</p>';
           return;
       }
       
       let html = '';
       snap.forEach(doc => {
           let d = doc.data();
           let dateStr = d.timestamp ? d.timestamp.toDate().toLocaleString() : 'Reciente';
           let bgClass = d.alertaRoja ? 'border-left: 5px solid #c62828; background: #fff1f0; outline: 1px solid #ffa39e;' : 'border-left: 5px solid #00acc1; background: #fff;';
           
           html += `<div style="padding:12px; border-radius:8px; margin-bottom:12px; box-shadow:0 1px 4px rgba(0,0,0,0.08); ${bgClass}">
              <div style="font-size:11px; color:#888; margin-bottom: 7px; font-weight: bold;">🕒 ${dateStr}</div>
              <div style="margin-bottom:10px; line-height: 1.4;"><strong>🧑 Estudiante:</strong> ${d.mensajeUsuario}</div>
              <div style="background:rgba(255,255,255,0.7); padding:10px; border-radius:6px; border: 1px dashed #b2ebf2; line-height: 1.4;">
                <strong style="color:#007c91;">🤖 Jhoncito:</strong> ${d.respuestaIA}
              </div>
           </div>`;
       });
       container.innerHTML = html;
       setTimeout(() => { container.scrollTop = container.scrollHeight; }, 100);
   });
}

function limpiarAlertaAlbatros() {
    if(!currentChatStudent) return;
    if(confirm("¿Confirmas que esta Alerta de Vida/Peligro ya fue revisada, intervenida por psicorientación, y quieres remover la bandera roja del sistema?")) {
        db.collection("ciudadano").doc(currentChatStudent).update({alertaRoja: firebase.firestore.FieldValue.delete()}).then(() => {
            alert("✓ Alerta resuelta operativamente.");
            document.getElementById('chat-alerta-banner').style.display = 'none';
            let st = allStudents.find(s => s.id === currentChatStudent);
            if(st) st.alertaRoja = false;
            renderDatabaseView();
        });
    }
}

function restablecerContrasena() {
    const newCod = document.getElementById('edit-cod').value.trim();
    if(!newCod) return alert("Primero asigna un código al estudiante.");
    
    if(confirm("¿Seguro que quieres restaurar la contraseña? El nuevo acceso será su propio código (" + newCod + ") y el sistema le obligará a crear una nueva contraseña en su próximo ingreso.")) {
        document.getElementById('edit-pass').value = newCod;
        // Marcamos para que pida cambio (esto se guarda al dar Guardar Cambios)
        // En el guardado nos aseguramos que si pass === id, pida cambio.
    }
}
