// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('[datetime-picker]');
const btnEl = document.querySelector('[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] < currentDate) {
      // Notify.failure("Please choose a date in the future")
      Notiflix.Notify.failure('Please choose a date in the future');
      btnEl.disabled = true;
    } else {
      btnEl.disabled = false;
      console.log(selectedDates[0]);
    }
    selectedDay = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);
let selectedDay = 0;

btnEl.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  const btnClick = setInterval(() => {
    const ms = selectedDay.getTime() - Date.now();
    if (ms <= 0) {
      clearInterval(btnClick);
      return;
    }
    const time = convertMs(ms);
    addLeadingZero(time);
  }, 1000);
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  day.innerHTML = padStart(days);
  hour.innerHTML = padStart(hours);
  minute.innerHTML = padStart(minutes);
  second.innerHTML = padStart(seconds);
}

function padStart(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
