import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const textEL = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const secondsEl = document.querySelector('span[data-seconds]');
const minutesEl = document.querySelector('span[data-minutes]');
const hoursEl = document.querySelector('span[data-hours]');
const daysEl = document.querySelector('span[data-days]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] < new Date()) {
        Notiflix.Notify.failure('Please choose a date in the future');
        btnStart.disabled = true
      } else {
        btnStart.disabled = false
      }
    },
};

btnStart.addEventListener('click', () => {
  const timer = setInterval(() => {
    const onTimerStart = new Date(textEL.value) - new Date();
    if (onTimerStart >= 0) {
      const updateClock = convertMs(onTimerStart);
      daysEl.textContent = addLeadingZero(updateClock.days);
      hoursEl.textContent = addLeadingZero(updateClock.hours);
      minutesEl.textContent = addLeadingZero(updateClock.minutes);
      secondsEl.textContent = addLeadingZero(updateClock.seconds);
    } else {
      clearInterval(timer);
    }
  }, 1000);
});

flatpickr(textEL, options);

function addLeadingZero(value) {
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}