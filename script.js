let timerInterval;
let timeInSeconds = 0;
let isRunning = false;

function startTimer() {
  const hours = parseInt(document.getElementById("hoursInput").value) || 0;
  const minutes = parseInt(document.getElementById("minutesInput").value) || 0;
  const seconds = parseInt(document.getElementById("secondsInput").value) || 0;
  const timerDisplay = document.getElementById("timer");

  if (!isRunning) {
    if (minutes < 0 || seconds < 0 || seconds >= 60 || minutes >= 60 || hours < 0) {
      alert("Por favor, ingresa un tiempo válido.");
      return;
    }
    timeInSeconds = hours * 3600 + minutes * 60 + seconds;
  }

  isRunning = true;
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    const absTime = Math.abs(timeInSeconds);
    const displayHours = Math.floor(absTime / 3600).toString().padStart(2, "0");
    const displayMinutes = Math.floor((absTime % 3600) / 60).toString().padStart(2, "0");
    const displaySeconds = (absTime % 60).toString().padStart(2, "0");

    // Mostrar el signo negativo si el tiempo es negativo
    const timePrefix = timeInSeconds < 0 ? "-" : "";
    timerDisplay.textContent = `${timePrefix}${displayHours}:${displayMinutes}:${displaySeconds}`;

    // Cambiar el color del texto cuando es negativo
    if (timeInSeconds < 0) {
      timerDisplay.classList.add("negative");
    } else {
      timerDisplay.classList.remove("negative");
    }

    timeInSeconds--;
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  timeInSeconds = 0;
  isRunning = false;

  // Restablecer el temporizador
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = "00:00:00";
  timerDisplay.classList.remove("negative");

  // Limpiar los campos de entrada
  document.getElementById("hoursInput").value = "";
  document.getElementById("minutesInput").value = "";
  document.getElementById("secondsInput").value = "";
}

function toggleFullscreen() {
  const elem = document.documentElement;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => {
      alert(`Error al activar pantalla completa: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

// Verificar si el usuario tiene modo oscuro activado en localStorage
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
});

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Guardar en localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}
