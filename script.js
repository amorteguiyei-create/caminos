// Inicializar Firebase
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

const routeData = [
  {
    id: "colibri",
    title: "Ruta Colibrí",
    cta: "Iniciar Ruta Colibrí<br><small>Aprender desde lo cotidiano</small>",
    desc: "\"En la vida cotidiana, pequeñas acciones pueden afectar la convivencia. Aquí comienza el aprendizaje inmediato.\"",
    faltas: "<ol style='margin-left: 18px; display: flex; flex-direction: column; gap: 8px;'><li>Llegar a la Ciudad Educadora Espíritu Santo después de la hora señalada para el ingreso (7:30 am, inicio de la toma de contacto).</li><li>Promover el desorden o la indisciplina en los corredores o aulas de clase durante los cambios de clase.</li><li>Consumir alimentos en horas de clases, dentro del salón o ambientes de aprendizaje.</li><li>No cumplir con las normas de presentación personal: porte del uniforme correspondiente a la Ciudad Educadora Espíritu Santo.</li></ol>",
    reparaciones: "<p style='margin-bottom: 12px;'>Podrán ser reparadas con:</p><ol style='margin-left: 18px; display: flex; flex-direction: column; gap: 8px; font-size: 16px;'><li>Llamados de atención verbales y escritos y el establecimiento de acuerdos de no repetición.</li><li>Realización de trabajos específicos en horario extraescolar (después de la jornada de estudio, sábados o vacaciones).</li><li>Realización de tareas (carteleras, charlas a sus compañeros, etc.) que contribuyan a mejorar y a desarrollar las actividades de la institución o, si procede, dirigidas a reparar el daño causado a las instalaciones o al material de la institución o a las pertenencias de otros miembros de la comunidad educativa.</li><li>Desarrollo de cursos virtuales teóricos sobre normativas, con posterior socialización a sus compañeros.</li><li>Suspensión del derecho de asistir a clases hasta por dos días lectivos (con compromisos académicos formales en casa).</li><li>Suspensión de participación en actividades extraescolares o complementarias (deportivo, cultural, social) en caso de reiteración.</li><li>Cambio de grupo.</li></ol>",
    nodes: [
      { id: "c1", title: "Diálogo inicial", text: "Diálogo entre el Consejero de paz y el ciudadano (Consejo #1, #2 o #3).", icon: "forum" },
      { id: "c2", title: "Notificación", text: "Notificación a director de curso y/o a través del formulario dispuesto para la atención de la falta.", icon: "notification_important" },
      { id: "c3", title: "Seguimiento", text: "Seguimiento por parte del consejero y director de grupo.", icon: "fact_check" },
      { id: "c4", title: "Remisión", text: "Al llegar a tres consejos compartidos al ciudadano, el Consejero de Paz remite a la siguiente ruta de atención.", icon: "arrow_upward" }
    ],
    bridge: "Cuando las acciones se repiten, el aprendizaje necesita de otros."
  },
  {
    id: "abeja",
    title: "Ruta Abeja",
    cta: "Iniciar Ruta Abeja<br><small>Construir con otros</small>",
    desc: "\"Cuando las acciones se repiten, el aprendizaje se construye con otros.\"",
    faltas: "<ol style='margin-left: 18px; display: flex; flex-direction: column; gap: 8px;'><li>Utilizar apodos y/o bromas de mal gusto con compañeros o comunidad.</li><li>Interrumpir clases con chistes o gestos inoportunos.</li><li>Utilizar el celular en el aula sin autorización.</li><li>Pegar chicles o adhesivos en paredes, mobiliario o compañeros.</li><li>No entregar comunicaciones enviadas a los formadores.</li><li>Incumplir compromisos académicos previstos.</li><li>No tener textos y/o elementos solicitados para clases, y distraerse en otras actividades.</li></ol>",
    reparaciones: "<p style='margin-bottom: 12px;'>Podrán ser reparadas con:</p><ol style='margin-left: 18px; display: flex; flex-direction: column; gap: 8px; font-size: 16px;'><li>Llamados de atención verbales y escritos y establecimiento de acuerdos de no repetición.</li><li>Realización de trabajos específicos en horario extraescolar (después de jornada, sábados o vacaciones).</li><li>Realización de tareas (carteleras, charlas) que contribuyan a mejorar o reparar daños causados institucionales o a pertenencias de otros.</li><li>Desarrollo de cursos virtuales teóricos sobre normativas, con posterior socialización.</li><li>Suspensión del derecho de asistir a clases hasta por dos días lectivos (con compromisos en casa).</li><li>Suspensión de participación en actividades extraescolares o complementarias en caso de reiteración.</li><li>Cambio de grupo.</li></ol>",
    nodes: [
      { id: "a1", title: "Diálogo", text: "Diálogo entre el ciudadano inspirador y el ciudadano.", icon: "forum" },
      { id: "a2", title: "Acuerdos", text: "Establecer acuerdos equitativos, justos que prioricen acciones de reparación en caso de existir daños causados a terceros y el restablecer los derechos y la reconciliación.", icon: "handshake" },
      { id: "a3", title: "Información", text: "Información a los ciudadanos formadores mediante mensaje por Phidias.", icon: "mail" },
      { id: "a4", title: "Seguimiento", text: "Seguimiento a los acuerdos establecidos.", icon: "checklist" },
      { id: "a5", title: "Condición de avance", text: "Si se incumple algunos de los acuerdos establecidos se remite a la siguiente ruta de atención.", icon: "arrow_upward" }
    ],
    bridge: "La estructura se vuelve esencial cuando el diálogo pierde efectividad."
  },
  {
    id: "halcon",
    title: "Ruta Halcón",
    cta: "Iniciar Ruta Halcón<br><small>Asumir con claridad</small>",
    desc: "\"Cuando la situación requiere mayor atención, la comunidad actúa con mayor estructura.\"",
    faltas: "<ol style='margin-left: 18px; display: flex; flex-direction: column; gap: 8px;'><li>No asistir a clase de manera injustificada y sin previo aviso al director.</li><li>Quedarse por fuera de clase evadiendo compromisos académicos.</li><li>Realizar grafitis sobre paredes, tableros, espejos y mobiliario.</li><li>Expresarse de manera descortés con cualquier miembro de comunidad.</li><li>Comercializar elementos o alimentos sin autorización.</li><li>No acatar las indicaciones formativas dadas por directivos.</li><li>No asistir a clase sábados señalados (grados diez y once).</li><li>Cometer actos vandálicos en baños, zonas verdes, restaurante o campos.</li><li>Permanecer en espacios no autorizados.</li><li>Pretextar enfermedad o exagerar dolencia para eludir responsabilidades.</li><li>Negarse a realizar experiencias de aprendizaje programadas en clase.</li></ol>",
    reparaciones: "<p style='margin-bottom: 12px;'>Podrán ser reparadas con:</p><ol style='margin-left: 18px; display: flex; flex-direction: column; gap: 8px; font-size: 16px;'><li>Llamados de atención verbales y escritos y establecimiento de acuerdos de no repetición.</li><li>Realización de trabajos específicos en horario extraescolar (después de jornada, sábados o vacaciones).</li><li>Realización de tareas (carteleras, charlas) que contribuyan a mejorar o reparar daños causados.</li><li>Desarrollo de cursos virtuales teóricos sobre normativas, con posterior socialización.</li><li>Suspensión del derecho de asistir a clases hasta por dos días lectivos (con compromisos en casa).</li><li>Suspensión de participación en actividades extraescolares o complementarias.</li><li>Cambio de grupo.</li></ol>",
    nodes: [
      { id: "h1", title: "Diálogo", text: "Diálogo entre el coordinador de ciclo, el Consejero de Paz (según consideración de coordinación de ciclo) y el ciudadano.", icon: "forum" },
      { id: "h2", title: "Acuerdos", text: "Establecer acuerdos equitativos, justos que prioricen acciones de reparación en caso de existir daños causados a terceros y el restablecer los derechos y la reconciliación.", icon: "handshake" },
      { id: "h3", title: "Información", text: "Informar a los ciudadanos formadores mediante mensaje por Phidias.", icon: "mail" },
      { id: "h4", title: "Seguimiento", text: "Seguimiento a los acuerdos establecidos.", icon: "checklist" },
      { id: "h5", title: "Condición de avance", text: "Si se incumple algunos de los acuerdos establecidos se remite a la siguiente ruta de atención.", icon: "arrow_upward" }
    ],
    bridge: "Las situaciones profundas demandan reflexión y transformación."
  },
  {
    id: "mariposa",
    title: "Ruta Mariposa",
    cta: "Iniciar Ruta Mariposa<br><small>Transformar para avanzar</small>",
    desc: "\"Algunas situaciones requieren detenerse, reflexionar y transformar.\"",
    faltas: "<ol style='margin-left: 18px; display: flex; flex-direction: column; gap: 8px;'><li>Reincidencia en faltas menores por Consejero de Paz.</li><li>Excesivas demostraciones de afecto corporal en el campus.</li><li>Esconder elementos de ciudadanos en casilleros.</li><li>Injuria, difamación u ofensas graves contra comunidad.</li><li>Agresión moral severa contra miembros institucionales.</li><li>Discriminación injustificada de un integrante social.</li><li>Daños intencionales a instalaciones o documentos clave.</li><li>Incumplimiento a compromisos de actas firmadas antes.</li><li>Amenazas directas/indirectas contra cualquier persona.</li><li>Evadirse del campus escolar en jornada académica y fuga de ceremonias.</li><li>Destrucción de útiles o elementos escolares de acompañantes.</li><li>Comportamiento de carácter inmoral o vocabulario soez persistente.</li><li>Reiterado uso rebelde y no aceptado de prendas no escolares.</li><li>Obscenidades, grafitis o calumnias graficas esparcidas.</li><li>Altivez, insolencia y agresividad contra llamadas formativas directivas.</li><li>Fraudes de carácter académico (suplantación, copias, plagios).</li><li>Exposición reiterativa a burlas o saboteos durante eventos culturales.</li><li>Poseer, traer o propagar materiales que afecten fuertemente el intelecto grupal.</li></ol>",
    reparaciones: "<ol style='margin-left: 18px; display: flex; flex-direction: column; gap: 8px;'><li>Prestar servicio comunitario donde asigne el Comité de Convivencia.</li><li>Asistir a desarrollo de formación humana en sabatinos designados.</li><li>Suspensión absoluta del sistema extraescolar deportivo representativo.</li><li>Suspensión del derecho a clases intraescolares por un ciclo entre tres a siete días (notificación documentada).</li><li>Tramitación a matrícula condicional ante el Consejo Directivo de la institución.</li><li>Solicitud y efectivización de la cancelación definitiva del cupo para siguiente periodo.</li></ol>",
    nodes: [
      { id: "m1", title: "Atención inmediata", text: "Brindar atención inmediata de salud física y mental de los afectados.", icon: "medical_services" },
      { id: "m2", title: "Descargos", text: "Escuchar al ciudadano para que haga los descargos que considere necesarios por la falta cometida bajo remisión del docente (director de grupo) en la coordinación de ciclo correspondiente.", icon: "record_voice_over" },
      { id: "m3", title: "Citación familiar", text: "Citar a los padres de familia y al ciudadano en reunión para informar de la falta cometida y se haga reconocimiento de esta.", icon: "family_restroom" },
      { id: "m4", title: "Medidas y actas", text: "Determinar con la familia medidas de protección, acciones restaurativas, de restablecimiento de los derechos, de conciliación y de compromiso de no repetición en acta firmada por los asistentes.", icon: "contract" },
      { id: "m5", title: "Comité de Convivencia", text: "El Comité Escolar de convivencia realizará el análisis del caso y seguimiento de las soluciones propuestas.", icon: "account_tree" }
    ],
    bridge: "La más alta complejidad exige protección y decisiones mayores."
  },
  {
    id: "albatros",
    title: "Ruta Albatros",
    cta: "Iniciar Ruta Albatros<br><small>Responder con responsabilidad</small>",
    desc: "\"En situaciones de alta complejidad, la comunidad protege, actúa y decide.\"",
    faltas: "<ol style='margin-left: 18px; display: flex; flex-direction: column; gap: 8px;'><li>Práctica reincidente, sistematizada y deliberada de faltas de gran vulneración de la integridad del prójimo o ecosistema educativo.</li><li>Venta y/o porte de armas e instrumentos punzocortantes letales o material explosivo contra la comunidad.</li><li>Hurto tipificado con apropiación deliberada y engañosa de activos o enceres propios institucionales de gran valía.</li><li>Completar o favorecer una escala de destrucción de tipo estructural grave y vandálica.</li><li>Conllevo de drogas o psicotrópicos, posesión explícita o ingreso al campus bajo enajenamiento de índole psicomotriz.</li><li>Comisión, extorsión fraudulenta, hackeo y ataques cibernéticos a plataforma de institución o alteración directa de puntajes oficiales calificados.</li><li>Conformación clandestina de grupos promotores de agresiones corporales colectivas pandilleras, mafias intrainstitucionales de cualquier tipología y soborno.</li><li>Actos sexuales abusivos, extorsión personal o material explícito extorsivo.</li><li>Bullying extremo sistemático validado agravando integridad de género, racismo agresivo perjudicial y crónico.</li><li>Accionar autolesivo desmedido e inductor frente al alumnado.</li><li>Fuga durante viajes extraescolares prolongados sin monitoreo oficial y falsedad legal confirmada.</li></ol>",
    reparaciones: "<ol style='margin-left: 18px; display: flex; flex-direction: column; gap: 8px;'><li>Asignación final irreversible de cancelación absoluta de matrícula y posterior separación documentada con traslado de registros al cuerpo sancionatorio estatal o nacional correspondiente, si aplica para menores infractores.</li><li>Negación administrativa definitiva del cupo en admisiones de consiguientes fases lectivas.</li></ol>",
    nodes: [
      { id: "al1", title: "Atención inmediata", text: "Brindar atención inmediata de salud física y mental de los afectados.", icon: "medical_services" },
      { id: "al2", title: "Citación urgente", text: "Informar y citar de carácter urgente a las familias o acudientes (coordinación de ciclo).", icon: "emergency" },
      { id: "al3", title: "Autoridades", text: "Poner en conocimiento de la policía, bienestar familiar o autoridad competente según corresponda.", icon: "local_police" },
      { id: "al4", title: "Comité Escolar", text: "Citar a los integrantes del Comité Escolar de Convivencia y ponerlos en conocimiento del caso.", icon: "groups" },
      { id: "al5", title: "Protección", text: "Adoptar medidas propias para proteger a la víctima, a quien se le atribuye la agresión y a las personas que hayan informado o hagan parte de la situación.", icon: "health_and_safety" },
      { id: "al6", title: "Reporte SIUCE", text: "Realizar el reporte en el Sistema de Información Unificado de Convivencia Escolar (SIUCE)", icon: "upload_file" },
      { id: "al7", title: "Seguimiento institucional", text: "Realizar seguimiento por parte del Comité Escolar de Convivencia, de la autoridad que asuma el conocimiento y el comité municipal de convivencia escolar.", icon: "query_stats" },
      { id: "al8", title: "Consejo Directivo", text: "Reunir al Consejo Directivo informarle la situación para que tome las determinaciones pertinentes. (El alcalde mayor acompañará como garante).", icon: "gavel" }
    ]
  }
];

window.onload = function() {
  renderUnits();
  initObservers();
  
  var codeInput = document.getElementById('student-code');
  var passInput = document.getElementById('student-password');
  
  if (codeInput) {
      codeInput.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') verificarLogin();
      });
  }
  if (passInput) {
      passInput.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') verificarLogin();
      });
  }
};

let currentUser = null;

function verificarLogin() {
  var user = document.getElementById('student-code').value.trim();
  var pass = document.getElementById('student-password').value.trim();
  var errorEl = document.getElementById('login-error');
  var btnEnter = document.querySelector('#login-screen .btn-enter');
  var originalBtnText = btnEnter.innerHTML;
  
  if(!user || !pass) {
    errorEl.textContent = "Por favor ingresa tu código y contraseña.";
    errorEl.style.display = 'block';
    return;
  }
  
  if(user.toUpperCase() === 'ADMIN' && (pass === '911124' || pass === 'Alexander.91*')) {
      sessionStorage.setItem('adminAutoLogin', pass);
      window.location.href = 'admin.html';
      return;
  }
  
  errorEl.style.display = 'none';
  const loader = document.getElementById('global-loader');
  if(loader) loader.style.display = 'flex';
  
  // Normalización técnica para Android/iOS (espacios, mayúsculas, ceros)
  const normalizedUser = user.toLowerCase().replace(/\s/g, '');
  
  db.collection("ciudadano").doc(normalizedUser).get().then(function(doc) {
    if (!doc.exists && !isNaN(normalizedUser)) {
       // Si no existe, intentar sin ceros a la izquierda o viceversa si es un número
       return db.collection("ciudadano").doc(String(parseInt(normalizedUser))).get();
    }
    return doc;
  }).then(function(doc) {
    if (doc.exists) {
      var studentInfo = doc.data();
      studentInfo.id = doc.id;
      if (studentInfo.contraseña === pass || studentInfo.password === pass) {
        currentUser = studentInfo;
        errorEl.style.display = 'none';
        
        if (studentInfo.contraseña === doc.id || !studentInfo.cambioContrasena) {
           if(loader) loader.style.display = 'none';
           mostrarPantallaCambioContrasena();
        } else {
           iniciarApp(true);
        }
      } else {
        if(loader) loader.style.display = 'none';
        errorEl.textContent = "Contraseña incorrecta.";
        errorEl.style.display = 'block';
        btnEnter.innerHTML = originalBtnText;
      }
    } else {
      if(loader) loader.style.display = 'none';
      errorEl.textContent = "Usuario no encontrado en la Base de Datos.";
      errorEl.style.display = 'block';
      btnEnter.innerHTML = originalBtnText;
    }
  }).catch(function(error) {
    if(loader) loader.style.display = 'none';
    console.error("Error consultando Firebase:", error);
    errorEl.textContent = "Error de conexión. Inténtalo de nuevo.";
    errorEl.style.display = 'block';
    btnEnter.innerHTML = originalBtnText;
  });
}

function mostrarPantallaCambioContrasena() {
  var loginScreen = document.getElementById('login-screen');
  var pwdScreen = document.getElementById('password-change-screen');
  
  if(loginScreen) loginScreen.classList.add('hidden');
  if(pwdScreen) {
    pwdScreen.classList.remove('hidden');
    pwdScreen.style.pointerEvents = 'auto';
    setTimeout(() => { pwdScreen.style.opacity = '1'; }, 100);
  }
}

function cambiarContrasenaObligatoria() {
  var newPass = document.getElementById('new-password').value.trim();
  var confPass = document.getElementById('confirm-password').value.trim();
  var errorEl = document.getElementById('pwd-change-error');
  var btn = document.querySelector('#password-change-screen .btn-enter');
  
  if(!newPass || !confPass) {
    errorEl.textContent = "Por favor llena ambos campos.";
    errorEl.style.display = 'block';
    return;
  }
  if(newPass !== confPass) {
    errorEl.textContent = "Las contraseñas no coinciden.";
    errorEl.style.display = 'block';
    return;
  }
  if(newPass.length < 6) {
    errorEl.textContent = "La contraseña debe tener al menos 6 caracteres.";
    errorEl.style.display = 'block';
    return;
  }
  
  errorEl.style.display = 'none';
  btn.textContent = "Guardando...";
  btn.disabled = true;
  
  db.collection("ciudadano").doc(currentUser.id).update({
    contraseña: newPass,
    cambioContrasena: true
  }).then(() => {
    currentUser.contraseña = newPass;
    currentUser.cambioContrasena = true;
    
    var pwdScreen = document.getElementById('password-change-screen');
    pwdScreen.style.opacity = '0';
    setTimeout(() => { 
      pwdScreen.classList.add('hidden'); 
      iniciarApp(true);
    }, 500);
  }).catch(err => {
    errorEl.textContent = "Error al guardar: " + err.message;
    errorEl.style.display = 'block';
    btn.textContent = "Guardar y Continuar";
    btn.disabled = false;
  });
}

function entrarComoInvitado() {
  currentUser = null;
  document.getElementById('login-error').style.display = 'none';
  iniciarApp(false);
}

function getFormattedName(rawName) {
  if(!rawName) return "Invitado";
  let parts = rawName.split(',');
  if(parts.length > 1) {
    return parts[1].trim() + " " + parts[0].trim();
  }
  return rawName.trim();
}

function iniciarApp(isLogged) {
  document.getElementById('login-screen').classList.add('hidden');
  
  // ASEGURAR QUE SE OCULTE EL LOADER AL INICIAR
  var loader = document.getElementById('global-loader');
  if(loader) loader.style.display = 'none';
  
  var intro = document.getElementById('intro-logo-screen');
  if (intro) {
      intro.style.visibility = '';
      intro.style.opacity = '';
      intro.classList.remove('hidden');
  }
  
  if (isLogged) {
    var fn = getFormattedName(currentUser.nombre);
    document.getElementById('user-greeting').textContent = "Hola, " + fn;
    
    var statsContainer = document.getElementById('star-counter-container');
    var warnContainer = document.getElementById('warning-counter-container');
    var starCountEl = document.getElementById('star-count');
    if(statsContainer && starCountEl && warnContainer) {
      statsContainer.style.display = 'flex';
      warnContainer.style.display = 'flex';
      starCountEl.textContent = currentUser.estrellas || 0;
    }
    
    // Inicializar Jhoncito inmediatamente para aprovechar el gesto del clic como permiso de audio
    initJhoncito();
    
    var faseStr = currentUser.fase || "sin ruta";
    var faseParts = faseStr.split('-'); 
    if (faseParts.length === 2) {
      setTimeout(function() {
        var targetBtn = document.getElementById('btn-' + faseParts[1]);
        if (targetBtn) {
          targetBtn.classList.add('pulsing-node');
          var wrapper = targetBtn.closest('.node-wrapper');
          if (wrapper) {
             wrapper.style.zIndex = "40"; 
             
             var pin = document.createElement('div');
             pin.className = 'location-pin fade-in-up';
             pin.innerHTML = '<span class="material-symbols-rounded" style="color:#d32f2f; font-size: 32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">location_on</span><div style="background:#d32f2f; color:white; font-size:12px; padding:4px 10px; border-radius:12px; font-weight:900; white-space:nowrap; transform:translateY(-8px); box-shadow: 0 2px 5px rgba(0,0,0,0.2);">Tú estás aquí</div>';
             pin.style.position = 'absolute';
             pin.style.top = '-60px';
             pin.style.left = '50%';
             pin.style.transform = 'translateX(-50%)';
             pin.style.display = 'flex';
             pin.style.flexDirection = 'column';
             pin.style.alignItems = 'center';
             pin.style.pointerEvents = 'none';
             wrapper.appendChild(pin);
             
             setTimeout(() => pin.classList.add('visible'), 300);
          }
          
          var rect = targetBtn.getBoundingClientRect();
          var offset = rect.top + window.scrollY - (window.innerHeight / 2);
          window.scrollTo({ top: offset, behavior: 'smooth' });
          
          var unitEl = document.querySelector('.unit-' + faseParts[0]);
          if (unitEl) unitEl.classList.add('route-active');

          var btnRuta = document.createElement('button');
          btnRuta.innerHTML = '<span class="material-symbols-rounded" style="font-size: 28px;">my_location</span>';
          btnRuta.style.cssText = "position: fixed; bottom: 105px; left: 30px; z-index: 9991; background: #fff; color: #1b5e20; width: 60px; height: 60px; border-radius: 30px; border: 3px solid #1b5e20; box-shadow: 0 4px 15px rgba(0,0,0,0.3); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s;";
          btnRuta.onclick = function() {
             var r = targetBtn.getBoundingClientRect();
             window.scrollTo({ top: r.top + window.scrollY - (window.innerHeight / 2), behavior: 'smooth' });
          };
          btnRuta.onmouseover = () => btnRuta.style.background = '#e8f5e9';
          btnRuta.onmouseout = () => btnRuta.style.background = '#fff';
          document.body.appendChild(btnRuta);

          // BOTÓN DE CERRAR SESIÓN (PUERTA)
          var btnLogout = document.createElement('button');
          btnLogout.id = "btn-logout-estudiante";
          btnLogout.innerHTML = '<span class="material-symbols-rounded" style="font-size: 28px;">logout</span>';
          btnLogout.style.cssText = "position: fixed; bottom: 180px; left: 30px; z-index: 9991; background: #fff; color: #d32f2f; width: 60px; height: 60px; border-radius: 30px; border: 3px solid #d32f2f; box-shadow: 0 4px 15px rgba(0,0,0,0.3); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s;";
          btnLogout.onclick = cerrarSesionEstudiante;
          btnLogout.onmouseover = () => btnLogout.style.background = '#ffebee';
          btnLogout.onmouseout = () => btnLogout.style.background = '#fff';
          document.body.appendChild(btnLogout);

          // BOTÓN DE ACCESO A RECOMPENSAS (CIUDAD DE LOS NIÑOS)
          var btnRecompensas = document.createElement('button');
          btnRecompensas.id = "btn-recompensas-estudiante";
          btnRecompensas.innerHTML = '<span class="material-symbols-rounded" style="font-size: 28px;">castle</span>';
          btnRecompensas.style.cssText = "position: fixed; bottom: 255px; left: 30px; z-index: 9991; background: linear-gradient(135deg,#1a237e,#0d47a1); color: #ffd54f; width: 60px; height: 60px; border-radius: 30px; border: 2px solid #ffd54f55; box-shadow: 0 4px 15px rgba(13,71,161,0.5); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s;";
          btnRecompensas.title = "Explorar La Ciudad de los Niños";
          btnRecompensas.onclick = abrirCiudadNinos;
          btnRecompensas.onmouseover = () => btnRecompensas.style.transform = 'scale(1.1)';
          btnRecompensas.onmouseout = () => btnRecompensas.style.transform = 'scale(1)';
          document.body.appendChild(btnRecompensas);

          var globalOrder = ['colibri', 'abeja', 'halcon', 'mariposa', 'albatros'];
          var currentUnitIndex = globalOrder.indexOf(faseParts[0]);
          
          if (currentUnitIndex !== -1) {
             for (var i = 0; i < globalOrder.length; i++) {
                 var uId = globalOrder[i];
                 var pathEl = document.getElementById('path-' + uId);
                 
                 if (pathEl) {
                     if (i < currentUnitIndex) {
                         pathEl.setAttribute('stroke', '#81c784');
                         pathEl.style.opacity = '0.9';
                     } else if (i === currentUnitIndex) {
                         if (wrapper && wrapper.style.top) {
                             var percentYStr = wrapper.style.top; 
                             pathEl.setAttribute('stroke', 'url(#grad-' + uId + ')');
                             pathEl.style.opacity = '0.9';
                             var stop1 = document.getElementById('stop1-' + uId);
                             var stop2 = document.getElementById('stop2-' + uId);
                             if (stop1 && stop2) {
                                 stop1.setAttribute('offset', percentYStr);
                                 stop2.setAttribute('offset', percentYStr);
                             }
                         }
                     }
                 }
             }
          }
        }
      }, 1500); 
    }
  } else {
    document.getElementById('user-greeting').textContent = "Convivencia Escolar";
    setTimeout(function() { window.scrollTo(0, document.body.scrollHeight); }, 1500);
  }

  if (intro) {
    setTimeout(function() { intro.classList.add('hidden'); }, 1200);
  }
}

function cerrarSesionEstudiante() {
  if(!confirm("¿Deseas cerrar tu sesión actual?")) return;
  
  // Limpiar datos
  currentUser = null;
  jhoncitoInitialGreetingDone = false;
  
  // Resetear UI
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('student-code').value = '';
  document.getElementById('student-password').value = '';
  
  // Remover botones dinámicos
  const rBtn = document.querySelector('button[style*="bottom: 105px"]');
  const lBtn = document.getElementById('btn-logout-estudiante');
  const rcBtn = document.getElementById('btn-recompensas-estudiante');
  if(rBtn) rBtn.remove();
  if(lBtn) lBtn.remove();
  if(rcBtn) rcBtn.remove();
  
  // Resetear otros elementos
  document.getElementById('user-greeting').textContent = "Convivencia Escolar";
  document.getElementById('star-counter-container').style.display = 'none';
  document.getElementById('warning-counter-container').style.display = 'none';
  
  // Recargar para limpiar estados complejos
  window.location.reload(); 
}

function hideIntroScreen() {
  var intro = document.getElementById('intro-logo-screen');
  if (intro) intro.classList.add('hidden');
}

function jumpToActiveRoute() {
  if (currentUser && currentUser.fase) {
      var faseParts = currentUser.fase.split('-');
      if (faseParts.length === 2) {
          var targetBtn = document.getElementById('btn-' + faseParts[1]);
          if (targetBtn) {
              var r = targetBtn.getBoundingClientRect();
              window.scrollTo({ top: r.top + window.scrollY - (window.innerHeight / 2), behavior: 'smooth' });
              return;
          }
      }
  }
  window.scrollBy({ top: -700, behavior: 'smooth' });
}

function enterRoute(unitId) {
  var unitEl = document.querySelector('.unit-' + unitId);
  if (unitEl) {
    unitEl.classList.add('route-active');
    window.scrollBy({ top: -650, behavior: 'smooth' });
  }
}

function renderUnits() {
  var container = document.getElementById('units-container');
  var allHTML = "";
  
  var ACTIVATOR_HEIGHT = window.innerHeight || 800; 
  var HEIGHT_PER_NODE = 220;
  
  for (var i = routeData.length - 1; i >= 0; i--) {
     var unit = routeData[i];
     var numNodes = unit.nodes.length;
     var TOP_PADDING = (unit.id === 'albatros') ? 250 : 150; 
     
     var unitHeight = (numNodes * HEIGHT_PER_NODE) + ACTIVATOR_HEIGHT + TOP_PADDING;
     
     var pathD = "M 250 " + unitHeight;
     var nodesStartY = unitHeight - ACTIVATOR_HEIGHT;
     
     pathD += " L 250 " + nodesStartY; 
     
     var nodesHTML = "";
     var prevX = 250;
     var prevY = nodesStartY;
     
     var availableHeightForNodes = nodesStartY - TOP_PADDING;
     
     unit.nodes.forEach(function(node, nodeIdx) {
         var yPos = nodesStartY - ((nodeIdx + 1) * (availableHeightForNodes / (numNodes + 1)));
         var isLeft = ((nodeIdx + i) % 2 === 0);
         var xPos = isLeft ? 80 : 330;
         
         if (unit.id === 'colibri') {
             var cpY = prevY - (prevY - yPos) / 2;
             pathD += " C " + prevX + " " + cpY + ", " + xPos + " " + cpY + ", " + xPos + " " + yPos;
         } else if (unit.id === 'abeja') {
             var midY = prevY - (prevY - yPos) / 2;
             pathD += " Q " + (isLeft ? -50 : 550) + " " + midY + ", " + xPos + " " + yPos;
         } else if (unit.id === 'halcon') {
             var cpY1 = prevY - (prevY - yPos) * 0.2;
             var cpY2 = prevY - (prevY - yPos) * 0.8;
             pathD += " C " + prevX + " " + cpY1 + ", " + xPos + " " + cpY2 + ", " + xPos + " " + yPos;
         } else if (unit.id === 'mariposa') {
             var cpY = prevY - (prevY - yPos) / 2;
             pathD += " C 250 " + prevY + ", 250 " + yPos + ", " + xPos + " " + yPos;
         } else if (unit.id === 'albatros') {
             var cpY = prevY - (prevY - yPos) / 2;
             pathD += " C " + (isLeft ? 500 : 0) + " " + cpY + ", " + (isLeft ? 0 : 500) + " " + cpY + ", " + xPos + " " + yPos;
         } else {
             var cpY = prevY - (prevY - yPos) / 2;
             pathD += " C " + prevX + " " + cpY + ", " + xPos + " " + cpY + ", " + xPos + " " + yPos;
         }
         
         var textClass = (unit.id === 'mariposa' || unit.id === 'albatros' || unit.id === 'halcon') ? ' text-light-mode' : '';
         var percentX = (xPos / 500) * 100;
         var percentY = (yPos / unitHeight) * 100;
         
         nodesHTML += "<div class='node-wrapper fade-in-up' id='wrapper-" + node.id + "' style='left: " + percentX + "%; top: " + percentY + "%;'>" +
            "<button id='btn-" + node.id + "' class='node theme-" + unit.id + "' onclick='openNode(\"" + unit.id + "\", " + nodeIdx + ")' title='" + node.title + "'>" +
            "<span class='material-symbols-rounded icon'>" + node.icon + "</span>" +
            "</button>" +
            "<span class='node-label" + textClass + "'>" + node.title + "</span>" +
            "</div>";
         
         prevX = xPos;
         prevY = yPos;
     });
     
     var cpYFinish = prevY - (prevY - 0) / 2;
     pathD += " C " + prevX + " " + cpYFinish + ", 250 " + cpYFinish + ", 250 0";
     
     var activatorHTML = "<div class='activator fade-in' style='height: " + ACTIVATOR_HEIGHT + "px;'>" +
        "<button class='activator-cta' onclick='enterRoute(\"" + unit.id + "\")'>" + unit.cta + "</button>" +
        "<div class='activator-desc'>" + unit.desc + "</div>" +
        "</div>";
        
     var cierreHTML = "";
     if (unit.id === 'albatros') {
        cierreHTML = "<div class='cierre-recorrido fade-in'>" +
           "<h3>Cada acción abre un camino.<br>Cada camino forma ciudadanos.</h3>" +
           "<p>La convivencia no se impone. Se construye.</p>" +
           "</div>";
     }
     
     var bridgeHTML = "";
     if (unit.bridge) {
         bridgeHTML = "<div class='bridge-text fade-in' style='position: absolute; top: " + (TOP_PADDING/2) + "px; width: 100%; text-align: center; z-index: 10; padding: 0 40px;'>" + unit.bridge + "</div>";
     }
     
     var sideButtonsHTML = "<div class='board-actions'>" +
        "<button class='btn-side faltas' onclick='openSideModal(\"faltas\", \"" + unit.id + "\")'><span class='material-symbols-rounded'>warning</span> Faltas</button>" +
        "<button class='btn-side reparacion' onclick='openSideModal(\"reparaciones\", \"" + unit.id + "\")'><span class='material-symbols-rounded'>healing</span> Reparación</button>" +
        "<button class='btn-side' onclick='openActosModal()' style='border-left: 6px solid #fbc02d;'><span class='material-symbols-rounded' style='color:#fbc02d'>star</span> Logros</button>" +
        "</div>";
     
     allHTML += "<div class='unit unit-" + unit.id + "' style='height: " + unitHeight + "px;'>" +
        "<div class='unit-bg'></div>" +
        cierreHTML +
        bridgeHTML +
        sideButtonsHTML +
        "<div class='path-layer' style='height: 100%; width: 100%; top: 0; left: 0;'>" +
        "<svg id='svg-" + unit.id + "' class='path-svg' viewBox='0 0 500 " + unitHeight + "' preserveAspectRatio='none'>" +
         "<defs><linearGradient id='grad-" + unit.id + "' x1='0' y1='0' x2='0' y2='1'>" +
         "<stop id='stop1-" + unit.id + "' offset='100%' stop-color='rgba(255,255,255,0.7)' />" +
         "<stop id='stop2-" + unit.id + "' offset='100%' stop-color='#81c784' />" +
         "</linearGradient></defs>" +
        "<path d='" + pathD + "' fill='none' class='track-bg' stroke='rgba(255,255,255,0.4)' stroke-width='40' stroke-linecap='round' />" +
        "<path id='path-" + unit.id + "' d='" + pathD + "' fill='none' class='track-fg' stroke='rgba(255,255,255,0.9)' stroke-width='15' stroke-dasharray='10 20' stroke-linecap='round' />" +
        "</svg>" +
        nodesHTML +
        "</div>" +
        activatorHTML +
        "</div>";
  }
  container.innerHTML = allHTML;
}

function initObservers() {
  var elements = document.querySelectorAll('.fade-in-up, .fade-in');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(function(el) {
    observer.observe(el);
  });
}

function openNode(unitId, nodeIdx) {
  var unit = null;
  for(var i=0; i<routeData.length; i++) {
    if(routeData[i].id === unitId) unit = routeData[i];
  }
  if (!unit) return;
  var node = unit.nodes[nodeIdx];
  if (!node) return;

  document.getElementById('sheet-title').textContent = node.title;
  document.getElementById('sheet-desc').innerHTML = node.text;
  document.getElementById('sheet-badge').textContent = unit.title;
  
  var btnColor = '#3c3c3c';
  var animalEmoji = '';
  if(unit.id === 'colibri') { btnColor = '#4caf50'; animalEmoji = '🐦'; }
  if(unit.id === 'abeja') { btnColor = '#f57f17'; animalEmoji = '🐝'; }
  if(unit.id === 'halcon') { btnColor = '#0288d1'; animalEmoji = '🦅'; }
  if(unit.id === 'mariposa') { btnColor = '#7b1fa2'; animalEmoji = '🦋'; }
  if(unit.id === 'albatros') { btnColor = '#303f9f'; animalEmoji = '🦢'; }
  
  var animalIconEl = document.getElementById('sheet-animal-icon');
  if (animalIconEl) animalIconEl.textContent = animalEmoji;
  
  var btnClose = document.getElementById('btn-close');
  btnClose.style.background = btnColor;
  btnClose.style.boxShadow = "0 5px 0 " + btnColor;
  btnClose.style.color = "#ffffff";

  document.getElementById('overlay').classList.add('active');
  document.getElementById('bottom-sheet').classList.add('active');
  document.body.style.overflow = 'hidden';
}

document.getElementById('btn-close').addEventListener('click', function() {
  document.getElementById('overlay').classList.remove('active');
  document.getElementById('bottom-sheet').classList.remove('active');
  document.body.style.overflow = '';
});

document.getElementById('overlay').addEventListener('click', function() {
  document.getElementById('overlay').classList.remove('active');
  document.getElementById('bottom-sheet').classList.remove('active');
  document.body.style.overflow = '';
});

function openSideModal(type, unitId) {
  var unit = null;
  for(var i=0; i<routeData.length; i++) {
    if(routeData[i].id === unitId) unit = routeData[i];
  }
  if (!unit) return;

  var btnColor = '#3c3c3c';
  var animalEmoji = '';
  if(unit.id === 'colibri') { btnColor = '#4caf50'; animalEmoji = '🐦'; }
  if(unit.id === 'abeja') { btnColor = '#f57f17'; animalEmoji = '🐝'; }
  if(unit.id === 'halcon') { btnColor = '#0288d1'; animalEmoji = '🦅'; }
  if(unit.id === 'mariposa') { btnColor = '#7b1fa2'; animalEmoji = '🦋'; }
  if(unit.id === 'albatros') { btnColor = '#303f9f'; animalEmoji = '🦢'; }

  document.getElementById('sheet-title').textContent = (type === 'faltas') ? 'Faltas (' + unit.title + ')' : 'Reparación (' + unit.title + ')';
  document.getElementById('sheet-desc').innerHTML = unit[type];
  document.getElementById('sheet-badge').textContent = type === 'faltas' ? 'Faltas' : 'Acción Restaurativa';
  
  var animalIconEl = document.getElementById('sheet-animal-icon');
  if (animalIconEl) animalIconEl.textContent = animalEmoji;
  
  var btnClose = document.getElementById('btn-close');
  btnClose.style.background = btnColor;
  btnClose.style.boxShadow = "0 5px 0 " + btnColor;
  btnClose.style.color = "#ffffff";

  document.getElementById('overlay').classList.add('active');
  document.getElementById('bottom-sheet').classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* =======================================
   HISTORIAL DE ESTRELLAS Y FALTAS
   ======================================= */
function abrirHistorial(tipoStr) {
  if(!currentUser) return;
  const isEstrella = tipoStr === 'Acto';
  document.getElementById('sheet-title').textContent = isEstrella ? 'Mis Actos de Ciudadanía' : 'Mis Faltas';
  document.getElementById('sheet-badge').textContent = isEstrella ? 'Logros' : 'Advertencias';
  var animalIconEl = document.getElementById('sheet-animal-icon');
  if (animalIconEl) animalIconEl.textContent = isEstrella ? '🌟' : '⚠️';
  
  // Botón de acceso a La Ciudad de los Niños
  let ciudadBtn = '';
  if (isEstrella) {
    ciudadBtn = `<div style="text-align:center;margin-bottom:18px;">
      <button onclick="abrirCiudadNinos()" style="
        background:linear-gradient(135deg,#1a237e,#0d47a1);
        color:#ffd54f;border:2px solid #ffd54f33;border-radius:16px;
        padding:14px 28px;font-size:15px;font-weight:900;cursor:pointer;
        font-family:Nunito,sans-serif;letter-spacing:1px;width:100%;
        box-shadow:0 4px 20px rgba(13,71,161,0.4);
        display:flex;align-items:center;justify-content:center;gap:10px;">
        🏰 Explorar La Ciudad de los Niños
      </button>
    </div>`;
  }

  document.getElementById('sheet-desc').innerHTML = ciudadBtn + '<p style="text-align:center;">Cargando historial...</p>';
  
  db.collection('ciudadano').doc(currentUser.id).collection('historial')
    .get().then(snap => {
       let historyData = [];
       snap.forEach(doc => {
           let data = doc.data();
           if(data.tipo === tipoStr) historyData.push(data);
       });
       
       if(historyData.length === 0) {
           document.getElementById('sheet-desc').innerHTML = '<p style="text-align:center; color:#777; margin-top: 20px;">No tienes registros de este tipo aún.</p>';
           return;
       }
       
       historyData.sort((a,b) => {
           let tA = a.timestamp ? a.timestamp.toMillis() : 0;
           let tB = b.timestamp ? b.timestamp.toMillis() : 0;
           return tB - tA;
       });

       let html = '';
       let count = 0;
       historyData.forEach(data => {
           if(count >= 20) return;
           count++;
           let dateStr = data.fecha ? data.fecha : new Date(data.timestamp?.toDate()).toLocaleDateString();
           let cssClass = isEstrella ? 'acto' : 'falta';
           html += `<div class="history-item ${cssClass}">
               <div class="history-date">${dateStr}</div>
               <div class="history-desc">${data.descripcion}</div>
           </div>`;
       });
       document.getElementById('sheet-desc').innerHTML = html;
    }).catch(err => {
       document.getElementById('sheet-desc').innerHTML = '<p style="color:red; text-align:center;">Error al cargar: ' + err.message + '</p>';
    });
    
  var btnClose = document.getElementById('btn-close');
  btnClose.style.background = isEstrella ? '#fbc02d' : '#d32f2f';
  btnClose.style.boxShadow = isEstrella ? "0 5px 0 #f9a825" : "0 5px 0 #b71c1c";
  btnClose.style.color = isEstrella ? "#333" : "#fff";

  document.getElementById('overlay').classList.add('active');
  document.getElementById('bottom-sheet').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function abrirHistorialEstrellas() { abrirHistorial('Acto'); }
function abrirHistorialFaltas() { abrirHistorial('Falta'); }

// ==== ACCESO A LA CIUDAD DE LOS NIÑOS (RPG) ====
function abrirCiudadNinos() {
  if (!currentUser) return;
  sessionStorage.setItem('ciudadanoJuego', JSON.stringify({
    id: currentUser.id,
    nombre: currentUser.nombre || currentUser.id,
    estrellas: currentUser.estrellas || 0
  }));
  window.location.href = 'recompensas.html';
}

// ==== INTEGRACION RECONOCIMIENTO DE VOZ ====
function hablarConJhoncito() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        agregarMensajeChat('Jhoncito', 'Tu navegador no soporta el reconocimiento de voz. Escríbeme, por favor.');
        return;
    }
    
    const rec = new SpeechRecognition();
    rec.lang = 'es-CO';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    
    const inputEl = document.getElementById('jhoncito-input');
    const micBtn = document.getElementById('btn-jhoncito-mic');
    
    if (micBtn) {
        micBtn.style.color = '#e53935'; 
        micBtn.innerHTML = '<span class="material-symbols-rounded">graphic_eq</span>';
    }
    
    try { rec.start(); } catch(e) { console.error('mic err', e); }
    
    rec.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        inputEl.value = transcript;
        enviarMensajeJhoncito();
    };
    
    rec.onerror = function(event) {
        console.error("Error de voz: ", event.error);
    };
    
    rec.onend = function() {
        if (micBtn) {
            micBtn.style.color = '#0288d1';
            micBtn.innerHTML = '<span class="material-symbols-rounded">mic</span>';
            micBtn.style.display = 'inline-block'; // Asegurar visibilidad
        }
    };
}

/* =======================================
   JHONCITO CHATBOT & SYNTHESIS LOGIC
   ======================================= */
let currentDiagnosticText = "";
let jhoncitoActive = false;
let sintesis = window.speechSynthesis;
let jhoncitoVoces = [];

function initJhoncito() {
  if (!sintesis) return;
  jhoncitoVoces = sintesis.getVoices();
  if(jhoncitoVoces.length === 0) {
     speechSynthesis.onvoiceschanged = () => { jhoncitoVoces = sintesis.getVoices(); };
  }
  generarDiagnostico();
}

function generarDiagnostico() {
  if(!currentUser) return;
  
  const fn = getFormattedName(currentUser.nombre);
  const firstName = fn.split(' ')[0];
  let intro = `Hola ${firstName}, soy Jhoncito, tu acompañante de ruta. `;
  
  db.collection("ciudadano").doc(currentUser.id).collection("historial")
    .orderBy("timestamp", "desc").limit(1).get().then(snap => {
      if(!snap.empty) {
        let lastRecord = snap.docs[0].data();
        let tipoContexto = lastRecord.tipo === 'Falta' ? 'He notado que recientemente tuviste una dificultad, específicamente: ' : '¡Quiero felicitarte! Recientemente tuviste una gran acción: ';
        currentDiagnosticText = intro + tipoContexto + lastRecord.descripcion + ". Estoy aquí para apoyarte en tu proceso y que juntos sigamos construyendo convivencia.";
      } else {
        currentDiagnosticText = intro + "Actualmente estás en " + parseNombreFase(currentUser.fase) + ". Recuerda que cada paso es una oportunidad para aprender y mejorar.";
      }
      hablarJhoncito(currentDiagnosticText);
      jhoncitoInitialGreetingDone = true;
    }).catch(e => {
      console.log("Error historial Jhoncito:", e);
      currentDiagnosticText = intro + "Estoy aquí para guiarte en los Caminos de Convivencia.";
      hablarJhoncito(currentDiagnosticText);
      jhoncitoInitialGreetingDone = true;
    });
}

function parseNombreFase(faseStr) {
  if(!faseStr) return "el inicio de tu camino";
  let parts = faseStr.split('-');
  let rutas = { "colibri": "la Ruta Colibrí", "abeja": "la Ruta Abeja", "halcon": "la Ruta Halcón", "mariposa": "la Ruta Mariposa", "albatros": "la Ruta Albatros" };
  return rutas[parts[0]] || "tu ruta actual";
}

function hablarJhoncito(texto) {
  if(!sintesis) return;
  sintesis.cancel();
  
  let textoParaHablar = texto.replace(/Jhoncito/gi, "Yoncito");

  let utterance = new SpeechSynthesisUtterance(textoParaHablar);
  utterance.lang = 'es-ES'; 
  utterance.rate = 1.0;
  
  let vocesEspanol = jhoncitoVoces.filter(v => v.lang.startsWith('es'));
  let vozMasculina = vocesEspanol.find(v => 
      v.name.toLowerCase().includes('male') || 
      v.name.toLowerCase().includes('masculino') || 
      v.name.toLowerCase().includes('jorge') || 
      v.name.toLowerCase().includes('juan') || 
      v.name.toLowerCase().includes('carlos') ||
      v.name.toLowerCase().includes('pablo') ||
      v.name.toLowerCase().includes('raul') ||
      v.name.toLowerCase().includes('diego')
  );
  
  let vozFallBack = vocesEspanol.find(v => v.lang === 'es-CO') || vocesEspanol.find(v => v.lang.startsWith('es-MX')) || vocesEspanol[0];
  
  utterance.voice = vozMasculina || vozFallBack;
  
  // Asegurar volumen al máximo para dispositivos móviles
  utterance.volume = 1;

  // Si es el saludo inicial, forzamos que jhoncitoInitialGreetingDone solo se marque si el audio empieza.
  utterance.onstart = () => { 
    jhoncitoActive = true; 
    jhoncitoInitialGreetingDone = true; // El saludo realmente sonó
    let btnRipple = document.getElementById('jhoncito-ripple');
    if(btnRipple) btnRipple.style.display = 'block'; 
  };
  utterance.onend = () => { 
    jhoncitoActive = false; 
    if(btnRipple) btnRipple.style.display = 'none'; 
  };
  
  sintesis.speak(utterance);
}

function toggleJhoncitoChat() {
  const chatWin = document.getElementById('jhoncito-chat-window');
  if(chatWin.classList.contains('hidden')) {
     chatWin.classList.remove('hidden');
     if(document.getElementById('jhoncito-messages').innerHTML.trim() === '') {
         agregarMensajeChat('Jhoncito', currentDiagnosticText || '¡Hola! Hazme cualquier pregunta sobre convivencia.');
         // Si por alguna razón el audio inicial fue bloqueado por el navegador al entrar,
         // lo intentamos de nuevo cuando el usuario abre el chat por primera vez.
         if(!jhoncitoInitialGreetingDone) {
            hablarJhoncito(currentDiagnosticText);
         }
     }
  } else {
     chatWin.classList.add('hidden');
  }
}

function agregarMensajeChat(emisor, texto) {
  const div = document.createElement('div');
  div.className = 'msg-bubble ' + (emisor === 'Jhoncito' ? 'msg-jhoncito' : 'msg-user');
  div.textContent = texto;
  const container = document.getElementById('jhoncito-messages');
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function enviarMensajeJhoncito() {
  const input = document.getElementById('jhoncito-input');
  const msg = input.value.trim();
  if(!msg) return;
  agregarMensajeChat('Tú', msg);
  input.value = '';
  
  const typingDiv = document.createElement('div');
  typingDiv.id = 'jhoncito-typing';
  typingDiv.className = 'msg-bubble msg-jhoncito';
  typingDiv.innerHTML = '<em>Escribiendo...</em>';
  document.getElementById('jhoncito-messages').appendChild(typingDiv);
  
  // Guardamos el último mensaje del usuario para pasarlo a la IA y guardarlo luego en BD
  window.lastUserMsg = msg;
  
  setTimeout(() => {
     responderJhoncito(msg);
  }, 1000);
}

// ==== LLM INTEGRATION ====
const GEMINI_API_KEY = "AIzaSyD49-ug3TXPLYaKoj312nGrEfEf0TvXwBk"; 

const REGLAS_JHONCITO = `Eres “Jhoncito”, un asistente virtual de ciudadanía (Jhon Ramos) de la Ciudad Educadora Espíritu Santo (CEES). Representas a un líder de ciudadanía: cercano, reflexivo, justo y formativo. Tu propósito es orientar a los ciudadanos (estudiantes) en sus situaciones de convivencia, ayudándoles a comprender, mejorar y actuar con criterio.

Tu base de conocimiento principal es el Manual de Convivencia de la CEES. Todas tus respuestas deben estar alineadas con este manual, pero NO debes citarlo de forma rígida ni normativa. Interpreta sus principios y tradúcelos a un lenguaje claro, cercano y comprensible para niños y jóvenes.

FORMA DE RESPONDER:
Inicia siempre destacando un aspecto positivo de la situación o de la intención del estudiante. Incluso en casos difíciles, reconoce algo valioso (honestidad al contar, intención de mejorar, preocupación por otros, etc.).
Luego, analiza la situación de forma clara y concreta. No des respuestas genéricas. Personaliza cada respuesta según lo que el estudiante cuenta. Haz inferencias prudentes, sin asumir de más.
Orienta con criterio:
Explica por qué la situación es importante en términos de convivencia y ciudadanía.
Relaciona la situación con valores como respeto, responsabilidad, empatía, autonomía y construcción de comunidad.
Si es necesario, señala con firmeza pero sin alarmismo cuando una acción no es adecuada.
Ofrece caminos de acción:
Sugiere qué podría hacer el estudiante para mejorar la situación.
Propón alternativas realistas, alcanzables y formativas.
Invita a la reflexión más que a la obediencia.
Mantén un tono equilibrado:
Cercano pero no informal en exceso.
Sincero pero cuidadoso.
Formativo pero no moralista.
Nunca amenazante, nunca punitivo.
Evita completamente:
Respuestas genéricas o plantillas.
Juicios fuertes o etiquetas (como “está mal”, “eres problemático”).
Generar miedo o ansiedad.
Sustituir el rol de un adulto responsable en casos graves.
En situaciones sensibles (conflictos fuertes, daño a otros, posibles faltas graves):
Mantén la calma en el lenguaje.
Señala la importancia de actuar correctamente.
Sugiere buscar apoyo en un adulto (docente, consejero, líder de ciudadanía (Jhon Ramos)).
No tomes decisiones disciplinarias, solo orienta.
Haz preguntas cuando sea necesario para comprender mejor la situación, pero no conviertas la conversación en un interrogatorio.
Refuerza siempre la idea de ciudadanía CEES:
Las acciones construyen la ciudad.
Cada decisión tiene impacto en otros.
La convivencia se basa en decisiones conscientes, no solo en normas.

ESTILO DE CIERRE:
Cierra tus respuestas con una invitación breve a la reflexión o a la acción. Ejemplo:
“¿Cómo crees que podrías manejar esto la próxima vez para que construya mejor tu ciudad?”

OBJETIVO FINAL:
No eres un sistema de control ni de sanción. Eres un acompañante que ayuda a formar criterio, fortalecer el carácter y construir convivencia real.
Actúa siempre como un “Jhoncito”: alguien que escucha, comprende, orienta y forma ciudadanos.

Además de orientar, debes identificar el tipo de situación que el estudiante describe y clasificarla internamente en una de las siguientes rutas de ciudadanía:
RUTA MARIPOSA (transformación personal positiva)
RUTA COLIBRÍ (situaciones leves, resolubles con reflexión)
RUTA ABEJA (situaciones que requieren acompañamiento)
RUTA HALCÓN (situaciones que requieren intervención directa)
RUTA ALBATROS (situaciones críticas que requieren atención institucional y restaurativa)

No debes decir explícitamente el nombre de la ruta, pero tu respuesta debe reflejar claramente su enfoque.

CRITERIOS DE CALIFICACION:
RUTA COLIBRÍ: Conflictos leves o malentendidos. Situaciones puntuales sin daño significativo.
RUTA ABEJA: Conflictos repetitivos. Afectación emocional a otros.
RUTA HALCÓN: Agresiones físicas o verbales importantes. Exclusión, intimidación o faltas relevantes.
RUTA MARIPOSA: Reconocimiento de errores con intención genuina de cambio.
RUTA ALBATROS: Situaciones críticas o graves. Daño significativo. Posibles vulneraciones de derechos.

FORMA DE RESPONDER SEGÚN LA RUTA:
RUTA COLIBRÍ (enfoque: autonomía y reflexión) -> Refuerza la capacidad del estudiante. Promueve análisis. Sugiere acciones concretas. Intención: “Esta es una oportunidad para que tomes una mejor decisión por ti mismo.”
RUTA ABEJA (enfoque: acompañamiento y mediación) -> Valida la dificultad. Sugiere apoyo de otros. Propone diálogo. Intención: “No tienes que manejar esto solo, es válido apoyarte en otros.”
RUTA HALCÓN (enfoque: firmeza y responsabilidad) -> Mantiene un tono claro y serio. Señala la importancia. Promueve acciones responsables inmediatas. Intención: “Esto es importante y necesita manejarse de forma responsable para evitar más daño.”
RUTA MARIPOSA (enfoque: reconocimiento y fortalecimiento) -> Valida el proceso de cambio. Refuerza la conciencia. Nombra la transformación como valiosa. Intención: “Lo que estás haciendo muestra que estás creciendo como ciudadano.”
RUTA ALBATROS (enfoque: protección y enfoque restaurativo) -> Prioriza cuidado. Evita juicios, pero no minimiza la gravedad. Indica claramente la necesidad de intervención institucional. Intención: “Lo más importante aquí es cuidar a todos los involucrados, y esto necesita apoyo de adultos para resolverse bien.”

REGLAS TRANSVERSALES:
Siempre inicia con un aspecto positivo. Nunca generes miedo ni culpa excesiva. No tomes decisiones disciplinarias.
CAPA DE CIUDADANÍA CEES: En todas las rutas, conecta la situación con impacto en otros y construcción de comunidad.
CAPA DE HUELLA: Si detectas transformación, resáltalo como una acción que construye ciudad ("huella positiva").
LENGUAJE INSTITUCIONAL OBLIGATORIO: Nunca uses la palabra "profesor", "profesora", "maestro" o "docente". Debes referirte a ellos estrictamente como "Ciudadanos Inspiradores" o "Ciudadano Inspirador".
REGLA DE VIDA O MUERTE (ALERTA): Si determinas que la situación del estudiante es extremadamente grave, involucra peligro de vida, autolesión, abuso, drogas, violencia extrema, o requiere la RUTA ALBATROS inminente, DEBES incluir obligatoriamente la etiqueta exacta "[ALERTA-ALBATROS]" al puro final de tu respuesta (no la uses para problemas comunes o peleas leves). Esto activará una alarma silenciosa de protección infantil para las directivas.
REGLA DE LONGITUD (¡MÁXIMA PRIORIDAD!): Tus respuestas deben ser EXTREMADAMENTE BREVES. MÁXIMO 2 ORACIONES O 2 LÍNEAS POR RESPUESTA. No te extiendas en explicaciones largas. Estás hablando con niños y jóvenes; ve al grano inmediatamente con un lenguaje mágico pero muy conciso. Si la respuesta es larga, los niños no la leerán.`;

let jhoncitoInitialGreetingDone = false;

async function responderJhoncito(msg) {
  const typingDiv = document.getElementById('jhoncito-typing');

  if (GEMINI_API_KEY) {
     try {
       const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
       
       let systemPrompt = REGLAS_JHONCITO + "\n\nEl estudiante dice: " + msg;
       
       if (typeof MANUAL_CONVIVENCIA !== 'undefined') {
           systemPrompt += "\n\nAquí tienes el Manual de Convivencia oficial de la institución para basar cualquier regla o respuesta si te están preguntando sobre ello:\n" + MANUAL_CONVIVENCIA;
       }
       
       const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
             contents: [{ parts: [{ text: systemPrompt }] }]
          })
       });
       
       const data = await response.json();
       
       if(!response.ok) {
           throw new Error("HTTP " + response.status + " - " + JSON.stringify(data));
       }
       
       if(data.candidates && data.candidates[0].content.parts.length > 0) {
          let respuestaGen = data.candidates[0].content.parts[0].text.replace(/\*/g, '');
          
          let alertFlag = false;
          if (respuestaGen.includes('[ALERTA-ALBATROS]')) {
             alertFlag = true;
             respuestaGen = respuestaGen.replace('[ALERTA-ALBATROS]', '').trim();
          }
          
          let resumenTxt = "";
          if (respuestaGen.includes('[RESUMEN:')) {
             let match = respuestaGen.match(/\[RESUMEN:\s*(.*?)\]/);
             if(match) {
                 resumenTxt = match[1];
                 respuestaGen = respuestaGen.replace(/\[RESUMEN:.*?\]/g, "").trim();
             }
          }
          
          if(typingDiv) typingDiv.remove();
          agregarMensajeChat('Jhoncito', respuestaGen);
          
          // Privacidad: Solo hablar si es el saludo inicial, las respuestas de chat son texto
          if(!jhoncitoInitialGreetingDone) {
             hablarJhoncito(respuestaGen);
             jhoncitoInitialGreetingDone = true;
          }
          
          if(currentUser && window.lastUserMsg) {
              let docRef = db.collection("ciudadano").doc(currentUser.id);
              docRef.collection("chats").add({
                  mensajeUsuario: window.lastUserMsg,
                  respuestaIA: respuestaGen,
                  alertaRoja: alertFlag,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp()
              }).catch(e => console.error(e));
              
              const updatePayload = { tieneChat: true, chatNuevo: true };
              if(alertFlag) {
                  updatePayload.alertaRoja = true;
              }
              if(resumenTxt) {
                  updatePayload.resumenSituacion = resumenTxt;
              }
              docRef.update(updatePayload).catch(e => console.error(e));
              
              window.lastUserMsg = "";
          }
          
          return;
       }
     } catch(e) {
       console.error("Error conectando con Gemini:", e);
       agregarMensajeChat('Jhoncito', "(Error en conexión IA, me usaré en modo estándar).");
       // Fallback a lógico local
     }
  }
  
  // Respaldo lógico local sin API (Keywords Semánticas)
  fallbackJhoncito(msg);
}

function fallbackJhoncito(msg) {
  let respuesta = "Sigo aprendiendo. Por el momento hablo solo de rutas, faltas y estrellitas. ¿En qué te ayudo?";
  let msgLower = msg.toLowerCase();
  
  if(msgLower.includes('ruta') || msgLower.includes('camino') || msgLower.includes('fase') || msgLower.includes('dónde estoy')) {
      respuesta = "Las rutas son caminos guiados. Actualmente estás en " + parseNombreFase(currentUser?.fase) + ". Superaremos esto paso a paso.";
  } else if (msgLower.includes('falta') || msgLower.includes('castigo') || msgLower.includes('malo')) {
      respuesta = "Las faltas son acciones que rompen la convivencia. No las veas como un castigo, sino como una oportunidad de reparación y aprendizaje.";
  } else if (msgLower.includes('estrella') || msgLower.includes('logro') || msgLower.includes('ciudadania') || msgLower.includes('acto') || msgLower.includes('felicita')) {
      respuesta = "¡Las estrellas son geniales! Las ganas realizando Actos de Ciudadanía que apoyan a tus compañeros e inspiran a la Ciudad Educadora.";
  } else if (msgLower.includes('hola') || msgLower.includes('saludo') || msgLower.includes('buenos') || msgLower.includes('buenas')) {
      respuesta = "¡Hola de nuevo! Estoy súper feliz de acompañarte. Dime qué te gustaría saber sobre tu proceso de convivencia.";
  } else if (msgLower.includes('quien eres') || msgLower.includes('quién eres') || msgLower.includes('jhoncito')) {
      respuesta = "Soy Jhoncito, tu asistente inteligente de la Ciudad Educadora. ¡Acá estoy para ayudarte a resolver tus dudas sobre convivencia!";
  } else if (msgLower.includes('gracias')) {
      respuesta = "¡Con muchísimo gusto! Aquí estoy cuando me necesites para seguir creciendo juntos.";
  }
  
  agregarMensajeChat('Jhoncito', respuesta);
  hablarJhoncito(respuesta);
}

function toggleJhoncito() {
  if(jhoncitoActive) {
    sintesis.cancel();
    jhoncitoActive = false;
    document.getElementById('jhoncito-ripple').style.display = 'none';
  } else {
    toggleJhoncitoChat();
  }
}

/* =======================================
   RECOMPENSAS - ACTOS DE CIUDADANÍA
   ======================================= */
function openActosModal() {
  document.getElementById('sheet-title').textContent = 'Actos de Ciudadanía';
  document.getElementById('sheet-badge').textContent = 'Estrellas: ' + (currentUser ? currentUser.estrellas || 0 : 0);
  
  var animalIconEl = document.getElementById('sheet-animal-icon');
  if (animalIconEl) animalIconEl.textContent = '🌟';
  
  var HTML = `
    <p style="margin-bottom: 20px; font-size: 16px; color: #546e7a;">Suma estrellas realizando estas acciones de valor cotidiano que nutren nuestra comunidad escolar. ¡Tu actuar positivo marca la diferencia!</p>
    
    <div style="display: flex; flex-direction: column; gap: 15px;">
      <div style="background: #f1f8e9; padding: 15px; border-radius: 12px; border-left: 4px solid #7cb342;">
        <h4 style="color: #33691e; margin-bottom: 8px;">1. Cuidado del otro (Convivencia real)</h4>
        <ul style="margin-left: 20px; font-size: 15px; color: #555;">
          <li>Defender a un compañero en situación de burla o exclusión.</li>
          <li>Acompañar emocionalmente a alguien sin que se lo pidan.</li>
          <li>Mediar un conflicto de forma autónoma y efectiva.</li>
          <li>Incluir activamente a alguien nuevo o aislado en dinámicas del grupo.</li>
        </ul>
      </div>

      <div style="background: #fff3e0; padding: 15px; border-radius: 12px; border-left: 4px solid #f57c00;">
        <h4 style="color: #e65100; margin-bottom: 8px;">2. Honestidad e integridad</h4>
        <ul style="margin-left: 20px; font-size: 15px; color: #555;">
          <li>Devolver objetos perdidos sin buscar reconocimiento.</li>
          <li>Admitir un error propio que afectaba a otros.</li>
          <li>Rechazar participar en una acción negativa del grupo.</li>
          <li>Denunciar una situación injusta de forma responsable.</li>
        </ul>
      </div>

      <div style="background: #e3f2fd; padding: 15px; border-radius: 12px; border-left: 4px solid #1e88e5;">
        <h4 style="color: #0d47a1; margin-bottom: 8px;">3. Impacto en la comunidad</h4>
        <ul style="margin-left: 20px; font-size: 15px; color: #555;">
          <li>Proponer y ejecutar una mejora en el salón o colegio.</li>
          <li>Liderar una iniciativa ambiental o social.</li>
          <li>Organizar ayuda colectiva ante una necesidad concreta.</li>
          <li>Generar acuerdos que mejoren la convivencia del grupo.</li>
        </ul>
      </div>

      <div style="background: #fce4ec; padding: 15px; border-radius: 12px; border-left: 4px solid #d81b60;">
        <h4 style="color: #880e4f; margin-bottom: 8px;">4. Cultura de respeto activo</h4>
        <ul style="margin-left: 20px; font-size: 15px; color: #555;">
          <li>Promover el uso de lenguaje adecuado en el grupo.</li>
          <li>Reconocer públicamente el trabajo de otros.</li>
          <li>Evitar conflictos escalando desde la palabra.</li>
        </ul>
      </div>

      <div style="background: #ede7f6; padding: 15px; border-radius: 12px; border-left: 4px solid #5e35b1;">
        <h4 style="color: #311b92; margin-bottom: 8px;">5. Coherencia con el proyecto CEES</h4>
        <ul style="margin-left: 20px; font-size: 15px; color: #555;">
          <li>Persistir en una dificultad sin abandonar.</li>
          <li>Participar activamente en procesos democráticos argumentando inteligentemente.</li>
          <li>Proponer mejoras en las dinámicas del Gobierno de la Ciudad.</li>
          <li>Actuar de forma sostenible de manera visible e inspiradora.</li>
        </ul>
      </div>

      <div style="background: #e0f2f1; padding: 15px; border-radius: 12px; border-left: 4px solid #00897b;">
        <h4 style="color: #004d40; margin-bottom: 8px;">6. Transformación personal visible</h4>
        <ul style="margin-left: 20px; font-size: 15px; color: #555;">
          <li>Superar una dificultad conductual con evidencia.</li>
          <li>Mostrar crecimiento en autocontrol o respeto.</li>
          <li>Mantener un promedio académico superior a 8.0.</li>
        </ul>
      </div>
    </div>
  `;
  document.getElementById('sheet-desc').innerHTML = HTML;
  
  var btnClose = document.getElementById('btn-close');
  btnClose.style.background = '#fbc02d';
  btnClose.style.boxShadow = "0 5px 0 #f9a825";
  btnClose.style.color = "#333";

  document.getElementById('overlay').classList.add('active');
  document.getElementById('bottom-sheet').classList.add('active');
  document.body.style.overflow = 'hidden';
}

