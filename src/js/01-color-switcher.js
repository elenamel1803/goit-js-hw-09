const btnStart = document.querySelector ('button[data-start]')
const btnStop = document.querySelector('button[data-stop]')
const bodyEl = document.querySelector(`body`)

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', () => {
  btnStart.disabled = true;
  btnStop.disabled = false;
  timerId = setInterval(() => bodyEl.style.backgroundColor = getRandomHexColor(), 1000);
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStart.disabled = false;
  btnStop.disabled = true;
});