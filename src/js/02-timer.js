import Notiflix from 'notiflix';
// Importujemy bibliotekę flatpickr
import flatpickr from 'flatpickr';
// Importujemy styl CSS biblioteki flatpickr
import 'flatpickr/dist/flatpickr.min.css';

// Przypisanie zmiennych do el.HTML
const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
//// Zmienna przechowująca identyfikator interwału odliczania
let countdownIntervalId;
//konfiguracja flatpicr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    // Sprawdzenie czy wybrana data jest w przyszłości
    if (selectedDate <= now) {
      window.alert('Wybierz datę w przyszłości!');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      startButton.addEventListener('click', () => {
        startCountdown(selectedDate);
      });
    }
  },
};
//Inicjalizacja flatpickr
flatpickr(datetimePicker, options);

//odliczanie czasu
function startCountdown(endDate) {
  clearInterval(countdownIntervalId);
  //nowy interwał odliczania czasu
  countdownIntervalId = setInterval(() => {
    const timeRemaining = convertMs(endDate - new Date());
    if (timeRemaining < 0) {
      clearInterval(countdownIntervalId);
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
    } else {
      daysElement.textContent = timeRemaining.days;
      hoursElement.textContent = timeRemaining.hours;
      minutesElement.textContent = timeRemaining.minutes;
      secondsElement.textContent = timeRemaining.seconds;
    }
  }, 1000);
}
//Funkcja konwertująca milisekundy na obiekt z pozostałym czasem
function convertMs(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    days: formatTime(days),
    hours: formatTime(hours % 24),
    minutes: formatTime(minutes % 60),
    seconds: formatTime(seconds % 60),
  };
}
// Funkcja formatująca czas
function formatTime(time) {
  return time.toString().padStart(2, '0');
}
//metoda padStart dodaje zero przed jednocyfrowymi liczbami
