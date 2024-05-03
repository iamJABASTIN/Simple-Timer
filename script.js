const reset = document.getElementById("reset");
const play = document.getElementById("play");
const timerEl = document.getElementById("timer");
const root = document.querySelector(":root");

// initial setup

const totalSeconds = 60;
let playing = false;
let currentSeconds = totalSeconds;
timerEl.innerText = formatTime(totalSeconds);

// Run the run functions every seconds

const timerIntervel = setInterval(run, 1000);

// Event listeners

play.addEventListener("click", () => {
  playing = !playing;
  play.classList.toggle("play");
  play.classList.toggle("bg-green-500");
  const playIcon = play.querySelector("i");
  playIcon.classList.toggle("fa-play");
  playIcon.classList.toggle("fa-pause");
});

reset.addEventListener("click", resetAll);

// Run the timer

function run() {
  if (playing) {
    currentSeconds -= 1;
    if (currentSeconds <= 0) {
      clearInterval(timerIntervel);
      resetAll();
    }

    timerEl.innerText = formatTime(currentSeconds);
    root.style.setProperty("--degrees", calcDeg());
  }
}

// calculate degrees

function calcDeg() {
  return `${360 - (currentSeconds / totalSeconds) * 360}deg`;
}

// Reset the timer

function resetAll() {
  playing = false;
  play.classList.remove("play");
  play.classList.remove("bg-green-500");
  const playIcon = play.querySelector("i");
  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");
  currentSeconds = totalSeconds;
  timerEl.innerText = formatTime(totalSeconds);
  root.style.setProperty("--degrees", "0deg");
}

// Format time

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const newSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${newSeconds
    .toString()
    .padStart(2, "0")}`;
}
