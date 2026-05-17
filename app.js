
const recetasDB = [
  {nombre:"Omelette", ing:["huevo","queso"]},
  {nombre:"Quesadillas", ing:["tortilla","queso"]},
  {nombre:"Tacos de pollo", ing:["tortilla","pollo"]},
  {nombre:"Arroz con pollo", ing:["arroz","pollo"]},
  {nombre:"Sandwich", ing:["pan","jamon"]},
  {nombre:"Huevos revueltos", ing:["huevo"]},
  {nombre:"Ensalada", ing:["lechuga","tomate"]},
  {nombre:"Pasta con queso", ing:["pasta","queso"]},
  {nombre:"Pasta con pollo", ing:["pasta","pollo"]},
  {nombre:"Hot cakes", ing:["harina","huevo","leche"]},
  {nombre:"Molletes", ing:["pan","frijoles","queso"]},
  {nombre:"Tostadas", ing:["tostada","pollo"]},
  {nombre:"Hamburguesa", ing:["pan","carne"]},
  {nombre:"Pizza casera", ing:["harina","queso"]},
  {nombre:"Sopa de verduras", ing:["zanahoria","papa"]},
  {nombre:"Tacos de carne", ing:["tortilla","carne"]},
  {nombre:"Burritos", ing:["tortilla","frijoles"]},
  {nombre:"Chilaquiles", ing:["tortilla","salsa"]},
  {nombre:"Enchiladas", ing:["tortilla","pollo","salsa"]},
  {nombre:"Arroz blanco", ing:["arroz"]},
  {nombre:"Arroz rojo", ing:["arroz","tomate"]},
  {nombre:"Frijoles refritos", ing:["frijoles"]},
  {nombre:"Pan con mantequilla", ing:["pan","mantequilla"]},
  {nombre:"Leche con cereal", ing:["leche","cereal"]},
  {nombre:"Tacos dorados", ing:["tortilla","pollo"]},
  {nombre:"Flautas", ing:["tortilla","pollo"]},
  {nombre:"Nachos", ing:["totopos","queso"]},
  {nombre:"Queso fundido", ing:["queso"]},
  {nombre:"Papas fritas", ing:["papa"]},
  {nombre:"Puré de papa", ing:["papa","leche"]},
  {nombre:"Caldo de pollo", ing:["pollo","agua"]},
  {nombre:"Sopa de fideos", ing:["pasta"]},
  {nombre:"Torta", ing:["pan","jamon"]},
  {nombre:"Torta de pollo", ing:["pan","pollo"]},
  {nombre:"Wrap de pollo", ing:["tortilla","pollo"]},
  {nombre:"Wrap vegetariano", ing:["tortilla","lechuga"]},
  {nombre:"Ensalada de pollo", ing:["pollo","lechuga"]},
  {nombre:"Ensalada de atún", ing:["atun","mayonesa"]},
  {nombre:"Atún con galletas", ing:["atun","galletas"]},
  {nombre:"Huevos con jamón", ing:["huevo","jamon"]},
  {nombre:"Huevos rancheros", ing:["huevo","salsa"]},
  {nombre:"Pan francés", ing:["pan","huevo"]},
  {nombre:"Crepas", ing:["harina","huevo","leche"]},
  {nombre:"Gelatina", ing:["gelatina"]},
  {nombre:"Licuado", ing:["leche","fruta"]},
  {nombre:"Batido de plátano", ing:["leche","platano"]},
  {nombre:"Batido de fresa", ing:["leche","fresa"]},
  {nombre:"Fruta picada", ing:["fruta"]},
  {nombre:"Yogur con fruta", ing:["yogur","fruta"]},
  {nombre:"Avena", ing:["avena","leche"]},
  {nombre:"Avena con fruta", ing:["avena","fruta"]},
  {nombre:"Ramen", ing:["fideos","pollo"]},
{nombre:"Sushi", ing:["arroz","atun"]},
{nombre:"Yakimeshi", ing:["arroz","huevo"]},
{nombre:"Teriyaki", ing:["pollo","arroz"]},
{nombre:"Tonkatsu", ing:["pollo","pan"]},
{nombre:"Spaghetti", ing:["pasta","tomate"]},
{nombre:"Macarrones", ing:["pasta","queso"]},
{nombre:"Cereal", ing:["leche","cereal"]},
{nombre:"Molletes", ing:["pan","frijoles","queso"]},
{nombre:"Sincronizadas", ing:["tortilla","jamon","queso"]},
{nombre:"Burritos", ing:["tortilla","frijoles"]},
{nombre:"Chilaquiles", ing:["tortilla","salsa"]},
{nombre:"Hot Cakes", ing:["harina","huevo","leche"]},
{nombre:"Ensalada César", ing:["lechuga","pollo"]},
{nombre:"Wrap de pollo", ing:["tortilla","pollo"]},
{nombre:"Pizza casera", ing:["harina","queso"]},
{nombre:"Puré de papa", ing:["papa","leche"]},
{nombre:"Sopa de verduras", ing:["zanahoria","papa"]},
{nombre:"Licuado de plátano", ing:["platano","leche"]},
{nombre:"Yogurt con fruta", ing:["yogur","fruta"]}
];

function obtenerImagen(nombre){
  const query = nombre.toLowerCase().replaceAll(" ", ",");
  return `https://source.unsplash.com/400x300/?${query},food`;
}
async function obtenerImagenReceta(nombre){
  const API_KEY = "06c349a67e0d4edb902ac5fdfb6c5594";

  try{
    const res = await fetch(`https://api.pexels.com/v1/search?query=${nombre} comida&per_page=1`, {
      headers: {
        Authorization: API_KEY
      }
    });
function obtenerRecetasInteligentes(){
  const disponibles = alimentos.map(a => a.nombre.toLowerCase());

  const urgentes = [...alimentos]
    .sort((a,b)=> new Date(a.fecha) - new Date(b.fecha))
    .map(a => a.nombre.toLowerCase());

  return recetasDB.map(r=>{
    const coincidencias = r.ing.filter(i => disponibles.includes(i)).length;
    const usaUrgente = r.ing.some(i => urgentes.includes(i));

    return {
      ...r,
      score: (coincidencias / r.ing.length) + (usaUrgente ? 0.7 : 0)
    };
  })
  .filter(r => r.score > 0)
  .sort((a,b)=> b.score - a.score);
}
function generarMenuSemanal(){
  const mejores = obtenerRecetasInteligentes();

  const dias = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];

  let html = "<h3>📅 Menú semanal</h3>";

  dias.forEach((dia, i)=>{
    if(mejores[i]){
      html += `<p>${dia}: 🍳 ${mejores[i].nombre}</p>`;
    }
  });

  document.getElementById("recetas").innerHTML = html;
}

    const data = await res.json();

    if(data.photos && data.photos.length > 0){
      return data.photos[0].src.medium;
    }

  }catch(e){
    console.log("Error imagen:", e);
  }

  return "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg";
}
const imagenesRecetas = {
  "omelette": "https://cdn.pixabay.com/photo/2017/04/23/21/36/omelette-2259243_1280.jpg",
  "quesadillas": "https://cdn.pixabay.com/photo/2018/06/18/16/05/quesadilla-3482749_1280.jpg",
  "tacos": "https://cdn.pixabay.com/photo/2017/06/02/18/24/taco-2367026_1280.jpg",
  "arroz con pollo": "https://cdn.pixabay.com/photo/2017/01/22/19/20/fried-rice-2001236_1280.jpg",
  "sandwich": "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg"
};
function obtenerImagen(nombre){
  const clave = nombre.toLowerCase();
  return imagenesRecetas[clave] || "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg";
}
let alimentos = JSON.parse(localStorage.getItem("alimentos")) || [];
let historial = JSON.parse(localStorage.getItem("historial")) || [];
let grafica;
let db;

const request = indexedDB.open("FoodLoopDB", 1);

request.onupgradeneeded = function(event) {
  db = event.target.result;

  if (!db.objectStoreNames.contains("alimentos")) {
    db.createObjectStore("alimentos", {
      keyPath: "id",
      autoIncrement: true
    });
  }
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log("✅ Base de datos FOOD LOOP conectada");
};

request.onerror = function() {
  console.log("❌ Error al conectar IndexedDB");
};
// 🔑 API
const API_KEY = "06c349a67e0d4edb902ac5fdfb6c5594";

// INPUTS
const nombreInput = document.getElementById("nombre");
const cantidadInput = document.getElementById("cantidad");
const fechaInput = document.getElementById("fecha");
const buscador = document.getElementById("buscador");
const filtroEstadoSelect = document.getElementById("filtroEstado");
const ordenFechaSelect = document.getElementById("ordenFecha");
const contador = document.getElementById("contador");

// 🔔 NOTIFICACIONES
if ("Notification" in window) Notification.requestPermission();

let notificados = JSON.parse(localStorage.getItem("notificados")) || {};

function guardarNotificados(){
  localStorage.setItem("notificados", JSON.stringify(notificados));
}

function notificar(titulo, mensaje){
  if(Notification.permission === "granted"){
    new Notification(titulo, {
      body: mensaje,
      icon: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
    });
  }
}

// 🧠 UTILIDADES
function guardarLocal(){
  localStorage.setItem("alimentos", JSON.stringify(alimentos));
}

function diasRestantes(fecha){
  const hoy = new Date();
  const f = new Date(fecha);
  hoy.setHours(0,0,0,0);
  f.setHours(0,0,0,0);
  return Math.ceil((f-hoy)/(1000*60*60*24));
}

function toggleDarkMode(){
  document.body.classList.toggle("dark");
}

// ➕ AGREGAR
function agregarAlimento(){
  const nombre = nombreInput.value.trim();
  const cantidad = cantidadInput.value;
  const fecha = fechaInput.value;

  if(!nombre || !cantidad || !fecha){
    alert("Completa todos los campos");
    return;
  }

  alimentos.push({nombre,cantidad,fecha});
  guardarLocal();
  renderizar();

  nombreInput.value="";
  cantidadInput.value="";
  fechaInput.value="";
}

// 🗑️ BORRAR
function borrarAlimento(i,btn){
  if(!confirm("¿Eliminar?")) return;

  btn.parentElement.classList.add("fade-out");

  setTimeout(()=>{
    alimentos.splice(i,1);
    guardarLocal();
    renderizar();
  },300);
}

// ✏️ EDITAR
function editarAlimento(i){
  const a = alimentos[i];
  nombreInput.value=a.nombre;
  cantidadInput.value=a.cantidad;
  fechaInput.value=a.fecha;

  alimentos.splice(i,1);
  guardarLocal();
  renderizar();
}

// 🍽️ USAR INGREDIENTES
function usarIngredientes(ingredientes){
  ingredientes.forEach(ing=>{
    const i = alimentos.findIndex(a=>a.nombre.toLowerCase()===ing);

    if(i!==-1){
      historial.push({
        nombre: alimentos[i].nombre,
        fechaUso: new Date().toLocaleDateString(),
        accion: "Usado en receta"
      });

      alimentos.splice(i,1);
    }
  });

  localStorage.setItem("historial", JSON.stringify(historial));
  guardarLocal();
  renderizar();
}

// 🍳 SUGERENCIAS (TU SISTEMA ORIGINAL)
function sugerirRecetas(){
  const cont = document.getElementById("recetas");
  const disponibles = alimentos.map(a=>a.nombre.toLowerCase());

  const recetas = [
    {nombre:"Quesadillas",ing:["tortilla","queso"]},
    {nombre:"Omelette",ing:["huevo","queso"]},
    {nombre:"Arroz con pollo",ing:["arroz","pollo"]},
    {nombre:"Sandwich",ing:["pan","jamon"]}
  ];

  let html="<h3>🍳 Sugerencias:</h3>";

  recetas.forEach(r=>{
    const faltan = r.ing.filter(i=>!disponibles.includes(i));

    if(faltan.length===0){
      html+=`<p>🔥 ${r.nombre}</p>
      <button onclick='usarIngredientes(${JSON.stringify(r.ing)})'>🍽️ Usar</button>`;
    }
    else if(faltan.length===1){
      html+=`<p>🟡 ${r.nombre} (falta ${faltan[0]})</p>`;
    }
  });

  cont.innerHTML=html;
}

// 🌎 API RECETAS
async function obtenerRecetasAPI(ingredientes){
  try{
    const res = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientes.join(",")}&number=5&apiKey=${API_KEY}`
    );
    return await res.json();
  }catch{
    return [];
  }
}

function renderizar(){
  actualizarGrafica();
  const lista = document.getElementById("lista");
  lista.innerHTML="";

  alimentos.forEach((a,i)=>{
    const dias = diasRestantes(a.fecha);
const idNoti = a.nombre + a.fecha;

if(dias === 1 && !notificados[idNoti + "_1"]){
  notificar(
    "⚠️ FOOD LOOP - Alimento por vencer",
    `${a.nombre} vence mañana. Úsalo en una receta para evitar desperdicio.`
  );

  notificados[idNoti + "_1"] = true;
  guardarNotificados();
}

if(dias === 0 && !notificados[idNoti + "_0"]){
  notificar(
    "🚨 FOOD LOOP - Úsalo hoy",
    `${a.nombre} vence hoy. Revisa tus recetas recomendadas.`
  );

  notificados[idNoti + "_0"] = true;
  guardarNotificados();
}
    const item=document.createElement("div");
    item.className="item";

    if(dias<0) item.classList.add("vencido");
    else if(dias<=3) item.classList.add("por-vencer");

    item.innerHTML=`
      <strong>${a.nombre}</strong><br>
      Cantidad: ${a.cantidad}<br>
      ${dias<0?"⚠️ Vencido":dias<=3?"⏰ "+dias+" días":""}
      <br>
      <button onclick="editarAlimento(${i})">Editar</button>
      <button onclick="borrarAlimento(${i},this)">Borrar</button>
    `;

    lista.appendChild(item);
  });

  contador.innerText="Total: "+alimentos.length;
  mostrarEstadisticasPro();
  mostrarHistorial();
 mostrarUrgente();
 mostrarIARecetas();
  sugerirRecetas();
}

// 🔊 VOZ
function hablarTexto(texto){
  const voz=new SpeechSynthesisUtterance(texto);
  voz.lang="es-MX";
  speechSynthesis.speak(voz);
}
const imagenesLocales = {

  "omelette":"img/omelette.jpg",

  "quesadillas":"img/quesadillas.jpg",

  "tacos de pollo":"img/tacos-pollo.jpg",

  "arroz con pollo":"img/arroz-pollo.jpg",

  "sandwich":"img/sandwich.jpg",

  "pizza":"img/pizza.jpg",

  "hamburguesa":"img/hamburguesa.jpg",

  "pasta":"img/pasta.jpg",

  "ensalada":"img/ensalada.jpg",

  "ramen":"img/ramen.jpg",

  "sushi":"img/sushi.jpg"
};

// 💬 CHAT INTELIGENTE
function enviarMensaje(){

  const input = document.getElementById("chatInput");
  const cont = document.getElementById("chatMensajes");

  const mensaje = input.value.toLowerCase().trim();
  if(!mensaje) return;

  cont.innerHTML += `<div class="msg user">${input.value}</div>`;

  const disponibles = alimentos.map(a => a.nombre.toLowerCase());

  // 🍳 RECETAS INTELIGENTES (SIN API)
  if(mensaje.includes("receta") || mensaje.includes("cocinar")){

    const recetas = [
      {nombre:"Omelette", ing:["huevo","queso"]},
      {nombre:"Quesadillas", ing:["tortilla","queso"]},
      {nombre:"Tacos de pollo", ing:["tortilla","pollo"]},
      {nombre:"Arroz con pollo", ing:["arroz","pollo"]},
      {nombre:"Sandwich", ing:["pan","jamon"]}
    ];

    const evaluadas = recetas.map(r=>{
      const coincidencias = r.ing.filter(i => disponibles.includes(i)).length;
      return {...r, score: coincidencias / r.ing.length};
    });

    const mejores = evaluadas
      .filter(r => r.score > 0)
      .sort((a,b)=> b.score - a.score);

    if(mejores.length > 0){

      cont.innerHTML += `<div class="msg bot">🧠 Te recomiendo 👇</div>`;

      mejores.slice(0,3).forEach(r=>{
        cont.innerHTML += `
          <div class="msg bot">
            🍳 ${r.nombre}
            <br>
            ${r.score === 1 ? "✅ Puedes hacerla" : "⚠️ Te faltan ingredientes"}
          </div>
        `;
      });

      hablarTexto("Te recomendé recetas");
    } else {
      cont.innerHTML += `<div class="msg bot">Agrega más alimentos 😅</div>`;
    }

    input.value="";
    return;
  }

  // 🛒 COMPRAS
  if(mensaje.includes("comprar")){
    const base = ["huevo","queso","pollo","pan","tortilla","arroz"];
    const faltan = base.filter(i => !disponibles.includes(i));

    const respuesta = "Te recomiendo comprar: " + faltan.join(", ");

    cont.innerHTML += `<div class="msg bot">${respuesta}</div>`;
    hablarTexto(respuesta);

    input.value="";
    return;
  }

  // ⏰ URGENTE
  if(mensaje.includes("vencer") || mensaje.includes("urgente")){
    const urgente = [...alimentos]
      .sort((a,b)=> new Date(a.fecha) - new Date(b.fecha))[0];

    if(urgente){
      const respuesta = `Usa primero ${urgente.nombre}`;
      cont.innerHTML += `<div class="msg bot">${respuesta}</div>`;
      hablarTexto(respuesta);
    } else {
      cont.innerHTML += `<div class="msg bot">No tienes alimentos</div>`;
    }

    input.value="";
    return;
  }
src="${imagenesLocales[r.nombre.toLowerCase()] || 'img/default.jpg'}"
  // 👋 SALUDO
  if(mensaje.includes("hola")){
    const respuesta = "Hola 👩‍🍳 dime qué tienes";
    cont.innerHTML += `<div class="msg bot">${respuesta}</div>`;
    hablarTexto(respuesta);

    input.value="";
    return;
  }

  // DEFAULT
  const respuesta = "Puedo ayudarte con recetas 😊";
  cont.innerHTML += `<div class="msg bot">${respuesta}</div>`;
  hablarTexto(respuesta);

  input.value="";
}
function actualizarGrafica() {
  const ctx = document.getElementById("grafica");

  const vencidos = alimentos.filter(a => diasRestantes(a.fecha) < 0).length;
  const porVencer = alimentos.filter(a => {
    const d = diasRestantes(a.fecha);
    return d >= 0 && d <= 3;
  }).length;
  const buenos = alimentos.length - vencidos - porVencer;

  if (grafica) grafica.destroy();

  grafica = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Vencidos", "Por vencer", "En buen estado"],
      datasets: [{
        data: [vencidos, porVencer, buenos],
        backgroundColor: ["#e53935", "#ff9800", "#4CAF50"]
      }]
    }
  });
}
function generarListaSuper(){

  const cont = document.getElementById("super");

  if(alimentos.length === 0){
    cont.innerHTML = `
      <div class="item">
        No tienes alimentos registrados
      </div>
    `;
    return;
  }

  const disponibles = alimentos.map(a =>
    a.nombre.toLowerCase()
  );

  let faltantes = [];

  recetasDB.forEach(r=>{

    const coincidencias = r.ing.filter(i =>
      disponibles.includes(i)
    ).length;

    // si tienes al menos 1 ingrediente
    if(coincidencias > 0){

      r.ing.forEach(i=>{

        if(!disponibles.includes(i)){
          faltantes.push(i);
        }

      });

    }

  });

  // quitar repetidos
  faltantes = [...new Set(faltantes)];

  let html = `
    <h3>🛒 Lista inteligente</h3>
  `;

  if(faltantes.length === 0){

    html += `
      <div class="item">
        😎 Ya tienes todo
      </div>
    `;

  } else {

    faltantes.forEach(i=>{

      html += `
        <div class="item">
          • ${i}
        </div>
      `;

    });

  }

  cont.innerHTML = html;
}
function generarMenuSemanal(){
const cont = document.getElementById("recetas");

if(alimentos.length === 0){

  cont.innerHTML = `
    <div class="item">
      Agrega alimentos primero 😅
    </div>
  `;

  return;
}

const disponibles = alimentos.map(a =>
  a.nombre.toLowerCase()
);

// 🧠 evaluar recetas
const evaluadas = recetasDB.map(r=>{

  const coincidencias = r.ing.filter(i =>
    disponibles.includes(i)
  ).length;

  return {
    ...r,
    score: coincidencias / r.ing.length
  };

});

// 🔥 mejores recetas
const mejores = evaluadas
  .filter(r => r.score > 0)
  .sort((a,b)=> b.score - a.score);

// 📅 estructura semanal
const dias = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo"
];

let html = `
  <h3>📅 Menú semanal</h3>
`;

dias.forEach((dia, i)=>{

  const desayuno = mejores[i];
  const comida = mejores[i+1];
  const cena = mejores[i+2];

  html += `
    <div class="item">

      <strong style="font-size:18px;">
        ${dia}
      </strong>

      <br><br>

      🌅 Desayuno:
      ${
        desayuno
        ? desayuno.nombre
        : "Libre"
      }

      <br><br>

      🍛 Comida:
      ${
        comida
        ? comida.nombre
        : "Libre"
      }

      <br><br>

      🌙 Cena:
      ${
        cena
        ? cena.nombre
        : "Libre"
      }

    </div>
  `;
});

cont.innerHTML = html;
}
// 🔎 BUSCADOR
buscador.addEventListener("input", renderizar);

// 🚀 INICIO
generarListaSuper();
function mostrarUrgente(){

  const cont = document.getElementById("urgente");

  if(alimentos.length === 0){

    cont.innerHTML = "";
    return;
  }

  const ordenados = [...alimentos]
    .sort((a,b)=>
      new Date(a.fecha) - new Date(b.fecha)
    );

  const urgente = ordenados[0];

  const dias = diasRestantes(urgente.fecha);

  let mensaje = "";

  if(dias < 0){

    mensaje = `
      ⚠️ ${urgente.nombre} está vencido
    `;

  }

  else if(dias <= 2){

    mensaje = `
      ⏰ Usa pronto:
      ${urgente.nombre}
      (${dias} días)
    `;

  }

  else{

    mensaje = `
      ✅ Todo va bien
    `;
  }

  cont.innerHTML = `
    <div class="item">
      <h3>🧠 Prioridad</h3>
      <p>${mensaje}</p>
    </div>
  `;
}
function mostrarIARecetas(){

  const cont = document.getElementById("iaRecetas");

  if(alimentos.length === 0){

    cont.innerHTML = "";
    return;
  }

  const disponibles = alimentos.map(a =>
    a.nombre.toLowerCase()
  );

  const evaluadas = recetasDB.map(r=>{

    const coincidencias = r.ing.filter(i =>
      disponibles.includes(i)
    ).length;

    return {
      ...r,
      score: coincidencias / r.ing.length
    };

  });

  const posibles = evaluadas.filter(r =>
    r.score > 0
  );

  const mejor = posibles.sort((a,b)=>
    b.score - a.score
  )[0];

  let html = `
    <div class="item">

      <h3>🍳 Cocina inteligente</h3>

      <p>
        Puedes cocinar
        <strong>${posibles.length}</strong>
        recetas
      </p>
  `;

  if(mejor){

    html += `
      <p>
        🔥 Mejor opción:
        <strong>${mejor.nombre}</strong>
      </p>

      <p>
        📊 Compatibilidad:
        ${Math.round(mejor.score*100)}%
      </p>
    `;
  }

  html += `</div>`;

  cont.innerHTML = html;
}
function iniciarBaseDatos(){
  const request = indexedDB.open("FoodLoopDB", 1);

  request.onupgradeneeded = function(event){
    const db = event.target.result;

    if(!db.objectStoreNames.contains("alimentos")){
      db.createObjectStore("alimentos", {
        keyPath: "id",
        autoIncrement: true
      });
    }
  };

  request.onsuccess = function(){
    console.log("Base de datos FOOD LOOP lista");
  };

  request.onerror = function(){
    console.log("Error con la base de datos");
  };
}
iniciarBaseDatos();
function guardarListaPDF(){

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const fecha = new Date().toLocaleDateString();

  const disponibles = alimentos.map(a => a.nombre.toLowerCase());

  let faltantes = [];

  recetasDB.forEach(r => {
    const coincidencias = r.ing.filter(i => disponibles.includes(i)).length;

    if(coincidencias > 0){
      r.ing.forEach(i => {
        if(!disponibles.includes(i)){
          faltantes.push(i);
        }
      });
    }
  });

  faltantes = [...new Set(faltantes)];

  doc.setFillColor(76, 175, 80);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255,255,255);
  doc.setFontSize(20);
  doc.text("FOOD LOOP", 20, 18);

  doc.setFontSize(12);
  doc.text("Lista inteligente de compras", 20, 26);

  doc.setTextColor(0,0,0);
  doc.setFontSize(11);
  doc.text("Fecha: " + fecha, 20, 42);
  doc.text("Generada automáticamente según tu despensa.", 20, 50);

  let y = 65;

  if(faltantes.length === 0){
    doc.text("No hay ingredientes faltantes.", 20, y);
  } else {
    doc.setFontSize(14);
    doc.text("Ingredientes faltantes:", 20, y);
    y += 10;

    doc.setFontSize(11);

    faltantes.forEach((item, index) => {
      doc.text(`${index + 1}. ${item}`, 25, y);
      y += 9;

      if(y > 280){
        doc.addPage();
        y = 20;
      }
    });
  }

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("FOOD LOOP - Aprovecha tus alimentos y evita desperdicios.", 20, 290);

  doc.save("lista_super_food_loop.pdf");
}
function mostrarEstadisticasPro(){

  const cont = document.getElementById("estadisticasPro");
  if(!cont) return;

  const total = alimentos.length;

  const vencidos = alimentos.filter(a => diasRestantes(a.fecha) < 0).length;

  const porVencer = alimentos.filter(a => {
    const d = diasRestantes(a.fecha);
    return d >= 0 && d <= 3;
  }).length;

  const buenos = total - vencidos - porVencer;

  const recetasPosibles = recetasDB.filter(r => {
    const disponibles = alimentos.map(a => a.nombre.toLowerCase());
    return r.ing.some(i => disponibles.includes(i));
  }).length;

  const desperdicio = total === 0 ? 0 : Math.round((vencidos / total) * 100);

  cont.innerHTML = `
    <div class="item">
      <h3>📊 Estadísticas</h3>
      <p>🥫 Total de alimentos: <strong>${total}</strong></p>
      <p>✅ En buen estado: <strong>${buenos}</strong></p>
      <p>⏰ Por vencer: <strong>${porVencer}</strong></p>
      <p>⚠️ Vencidos: <strong>${vencidos}</strong></p>
      <p>🍳 Recetas posibles: <strong>${recetasPosibles}</strong></p>
      <p>🗑️ Riesgo de desperdicio: <strong>${desperdicio}%</strong></p>
    </div>
  `;
}
function mostrarHistorial(){
  const cont = document.getElementById("historial");
  if(!cont) return;

  if(historial.length === 0){
    cont.innerHTML = "";
    return;
  }

  let html = `
    <div class="item">
      <h3>📜 Historial</h3>
  `;

  historial.slice(-5).reverse().forEach(h=>{
    html += `<p>🍽️ ${h.nombre} - ${h.accion} (${h.fechaUso})</p>`;
  });

  html += `</div>`;

  cont.innerHTML = html;
}
function cerrarSplash(){
  document.getElementById("splash").style.display = "none";
}
document.addEventListener("DOMContentLoaded", function(){

  const btnEntrar = document.getElementById("btnEntrar");
  const splash = document.getElementById("splash");

  if(btnEntrar && splash){
    btnEntrar.addEventListener("click", function(){
      splash.remove();
    });
  }

});
renderizar();