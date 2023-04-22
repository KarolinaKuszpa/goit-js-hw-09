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
//// Zmienna przechowująca identyfikator interwału który jest używany do zakończenia odliczania.
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
      startButton.disabled = true; // Zablokowanie przycisku uruchamiającego odliczanie
    } else {
      startButton.disabled = false; // Odblokowanie przycisku uruchamiającego odliczanie
      //uruchomienie odliczania po kliknięciu na przycisk
      startButton.addEventListener('click', () => {
        startCountdown(selectedDate); //rozpoczynanie odliczania
      });
    }
  },
};
//Inicjalizacja flatpickr
flatpickr(datetimePicker, options);

//rozpoczęcie odliczania i aktualizowanie wyświetlanej wartości czasu co sekundę.
function startCountdown(endDate) {
  clearInterval(countdownIntervalId); // W przypadku, gdy funkcja `startCountdown` została wywołana ponownie, wyczyścić poprzedni interwał
  countdownIntervalId = setInterval(() => {
    //uruchamianie funkcji przekazanej jako drugi argument co 1000ms (1s).
    const timeRemaining = convertMs(endDate - new Date()); // Obliczenie czasu, który pozostał między obecną datą, a datą końcową przekazaną jako argument funkcji.
    if (timeRemaining.days < 0) {
      // Jeśli odliczanie powinno się zakończyć, ponieważ wybrana data końcowa jest wcześniejsza niż obecna data, wyzeruj wyświetlanie czasu.
      clearInterval(countdownIntervalId);
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
    } else {
      // W przeciwnym razie, wyświetlaj czas w formacie dn., godz., sec., na podstawie pozostałego czasu.
      daysElement.textContent = formatTime(timeRemaining.days);
      hoursElement.textContent = formatTime(timeRemaining.hours % 24);
      minutesElement.textContent = formatTime(timeRemaining.minutes % 60);
      secondsElement.textContent = formatTime(timeRemaining.seconds % 60);
    }
  }, 1000); // Określenie granularności (1000ms = 1s), co oznacza, że funkcja przekazana jako drugi argument będzie wykonywana co 1 sekundę.
}

//Funkcja konwertująca milisekundy na obiekt z pozostałym czasem w formacie dni, godziny, min., sec.
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
