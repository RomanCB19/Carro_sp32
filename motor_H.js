// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDAb3NxYjmDejgYhEiRFlJCteds6D7T30o",
  authDomain: "carrito-sp32.firebaseapp.com",
  databaseURL: "https://carrito-sp32-default-rtdb.firebaseio.com",
  projectId: "carrito-sp32",
  storageBucket: "carrito-sp32.firebasestorage.app",
  messagingSenderId: "147852451770",
  appId: "1:147852451770:web:1585f0baab2d6d3a22c783",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referencia al campo `video` en Firebase
const videoRef = ref(database, "/video");

// Elemento HTML donde se mostrará el video
const videoFrame = document.getElementById("videoFrame");

// Escuchar cambios en el valor del campo `video`
onValue(videoRef, (snapshot) => {
  const data = snapshot.val();
  if (data && data.video) {
    // Actualizar la imagen en la página con datos Base64
    const base64Image = `data:image/jpeg;base64,${data.video}`;
    videoFrame.src = base64Image;
  } else {
    console.error("No se encontró el dato 'video' en Firebase o está vacío.");
  }
});
