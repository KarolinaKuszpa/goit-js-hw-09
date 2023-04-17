function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // generowanie losowego numeru większy od 0.3 w zmiennej shouldResolve = resolve
      // jesl nie jest większy = reject
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

const formElement = document.querySelector('.form');

// Nasłuchiwanie zdarzenia submit i zapobieganie domyślnej akcji formularza (prev.def)
formElement.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  //pętla for wykonuje się tyle razy, ile wpiszemy do pola amount
  for (let i = 1; i <= amount; i++) {
    //wartość początkowa pozycji Promise, pierwszy promis w pętli
    const position = i;
    //obliczanie czasu opóźnienia dla każdego kolejnego promisa
    const currentDelay = delay + (i - 1) * step;
    // currentDelay- czas opóźnienia dla tworzonej Promise.
    createPromise(position, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
