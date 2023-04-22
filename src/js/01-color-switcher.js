const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId;

let changeElement;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

//zmiana koloru co sekundę:

function changeColor() {
  changeElement = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  //   blokada przycisku start
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function colorStop() {
  clearInterval(changeElement);
  console.log('Przycisk Zatrzymaj został kliknięty');
  console.log('Właściwość disabled dla przycisku start:', startBtn.disabled);
  console.log('Właściwość disabled dla przycisku stop:', stopBtn.disabled);
  //   blokada przycisku stop
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
// zdarzenia
startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', colorStop);
