// Variables
let timerInterval;
let timeInSeconds = 0;
let isRunning = false;
let isPaused = false; // Nueva variable para saber si el temporizador está pausado

// Botones 
const btnIniciar = document.getElementById('iniciar');
const btnPausar = document.getElementById('pausar');

// Cargar el sonido
const sonido = new Audio('./sound/despertador.mp3');

function startTimer() { // Boton Iniciar
  const timerDisplay = document.getElementById("timer");

  // Si el temporizador ya está corriendo, ignoramos el clic
  if (isRunning) return;

  if (!isPaused) {
    // Si no está pausado, tomamos los valores de los inputs
    // const hours = parseInt(document.getElementById("hoursInput").value) || 0; // Comentado para desactivar las horas
    const minutes = parseInt(document.getElementById("minutesInput").value) || 0;
    const seconds = parseInt(document.getElementById("secondsInput").value) || 0;

    if (minutes < 0 || seconds < 0 || seconds >= 60 || minutes >= 60 /* || hours < 0 */) {
      alert("Por favor, ingresa un tiempo válido.");
      return;
    }

    // timeInSeconds = hours * 3600 + minutes * 60 + seconds; //Comentado para desactivar las horas - Se elimina el cálculo con horas
    timeInSeconds = minutes * 60 + seconds; // Ahora solo usa minutos y segundos
  }

  isRunning = true;
  isPaused = false;
  btnPausar.classList.remove('disabled');
  btnIniciar.disabled = true;
  btnIniciar.classList.add('disabled');

  timerInterval = setInterval(() => {
    if (timeInSeconds < 0) {
      timerDisplay.classList.add("negative");
      sonido.play(); // Reproducir el sonido cuando el temporizador llegue a 0
    } else {
      timerDisplay.classList.remove("negative");
    }

    const absTime = Math.abs(timeInSeconds);
    // const displayHours = Math.floor(absTime / 3600).toString().padStart(2, "0"); // Comentado para desactivar las horas -  Comentado para omitir horas
    const displayMinutes = Math.floor((absTime % 3600) / 60).toString().padStart(2, "0");
    const displaySeconds = (absTime % 60).toString().padStart(2, "0");

    timerDisplay.textContent = `${timeInSeconds < 0 ? "-" : ""}${/* displayHours + ":" + */ displayMinutes}:${displaySeconds}`;

    timeInSeconds--;

  }, 1000);
}

function pauseTimer() { // Boton Pausa
  if (!isRunning) return;
  sonido.pause()
  clearInterval(timerInterval);
  isRunning = false;
  isPaused = true; // Marcamos que el temporizador está pausado
  btnIniciar.textContent = 'Reanudar'; // Cambia el texto del botón
  btnIniciar.disabled = false;
  btnIniciar.classList.remove('disabled');
  btnPausar.classList.add('disabled');
}

function clearTimer() { // Boton Limpiar
  clearInterval(timerInterval);
  sonido.pause()
  timeInSeconds = 0;
  isRunning = false;
  isPaused = false;
  btnIniciar.disabled = false;
  btnIniciar.classList.remove('disabled');
  btnPausar.classList.remove('disabled');
  btnIniciar.textContent = 'Iniciar';

  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = "00:00"; // Se ajusta el formato para quitar la hora
  timerDisplay.classList.remove("negative");

  // document.getElementById("hoursInput").value = ""; // Comentado porque ya no se usa
  document.getElementById("minutesInput").value = "";
  document.getElementById("secondsInput").value = "";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  // Guardar en localStorage
  if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
  } else {
      localStorage.setItem("darkMode", "disabled");
  }
}

document.addEventListener("keydown", (e) => {
  console.log(e)
  switch (e.code) {
    case "Space":
      e.preventDefault();
      pauseTimer();
      break;
    case "Enter":
      startTimer();
      break;
    case "AltRight":
      clearTimer();
      break; 
  }
});