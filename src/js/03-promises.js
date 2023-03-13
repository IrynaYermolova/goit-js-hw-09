import Notiflix from 'notiflix';

const formSubmit = document.querySelector('.form');

formSubmit.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  // const amount = event.currentTarget.amount.value;
  // const step = event.currentTarget.step.value;
  // let delay = event.currentTarget.delay.value;

  let delay = Number(event.currentTarget.delay.value);
  let step = Number(event.currentTarget.step.value);
  let amount = Number(event.currentTarget.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms` 
        );
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }

  function createPromise(position, delay) {
    
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }

  event.currentTarget.reset;
}

