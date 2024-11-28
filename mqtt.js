// Conexión al broker MQTT
const client = mqtt.connect('ws://broker.mqttdashboard.com:8000/mqtt', {
  clientId: 'ESP32-19' // ID único del cliente
});

// Tópicos configurados en el ESP32
const TOPICO_ADELANTE = "roman";
const TOPICO_ATRAS = "geo";
const TOPICO_IZQUIERDA = "izq";
const TOPICO_DERECHA = "der";
const TOPICO_SERVO_IZQUIERDO = "servo_izquierdo";
const TOPICO_SERVO_DERECHO = "servo_derecho";
const TOPICO_SERVO_RECTO = "servo_recto";

// Conexión exitosa
client.on('connect', () => {
  console.log('Conectado al broker MQTT');
  alert('Conectado al broker MQTT');
});

// Manejo de errores
client.on('error', (err) => {
  console.error('Error de conexión:', err);
  alert('Error de conexión al broker MQTT');
});

// Función para enviar mensajes
function enviarMensaje(topico, mensaje) {
  client.publish(topico, mensaje, (err) => {
      if (err) {
          console.error('Error al enviar mensaje:', err);
      } else {
          console.log(`Mensaje enviado al tópico ${topico}: ${mensaje}`);
      }
  });
}

// Asignar eventos a los botones de movimiento
document.getElementById('btn-adelante').addEventListener('click', () => {
  enviarMensaje(TOPICO_ADELANTE, 'on');
});

document.getElementById('btn-atras').addEventListener('click', () => {
  enviarMensaje(TOPICO_ATRAS, 'on');
});

document.getElementById('btn-izquierda').addEventListener('click', () => {
  enviarMensaje(TOPICO_IZQUIERDA, 'on');
});

document.getElementById('btn-derecha').addEventListener('click', () => {
  enviarMensaje(TOPICO_DERECHA, 'on');
});

document.getElementById('btn-detener').addEventListener('click', () => {
  // Publicar "off" a todos los tópicos para detener los motores
  enviarMensaje(TOPICO_ADELANTE, 'off');
  enviarMensaje(TOPICO_ATRAS, 'off');
  enviarMensaje(TOPICO_IZQUIERDA, 'off');
  enviarMensaje(TOPICO_DERECHA, 'off');
});

// Asignar eventos a los botones del servomotor
document.getElementById('btn-servo-izquierdo').addEventListener('click', () => {
  enviarMensaje(TOPICO_SERVO_IZQUIERDO, 'on');
  // Detiene el movimiento tras 1s
});

document.getElementById('btn-servo-derecho').addEventListener('click', () => {
  enviarMensaje(TOPICO_SERVO_DERECHO, 'on');
   // Detiene el movimiento tras 1s
});

document.getElementById('btn-servo-recto').addEventListener('click', () => {
  enviarMensaje(TOPICO_SERVO_RECTO, 'on');
});
