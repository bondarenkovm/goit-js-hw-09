import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');

let timerId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() >= Date.now()) {
      btnStart.disabled = false;
    } else {
      //   alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future');
    }
    // console.log(selectedDates[0]);
    // console.log(selectedDates[0].getTime());
    // console.log(Date.now());
  },
};

flatpickr(input, options);

btnStart.addEventListener('click', onClickBtnStart);
btnStart.disabled = true;

function onClickBtnStart() {
  btnStart.disabled = true;
  timerId = setInterval(addTimer, 1000);
}

function addTimer() {
  const inputDate = new Date(input.value).getTime();
  //   console.log(inputDate);
  const readout = inputDate - Date.now();
  //   console.log(Date.now());
  //   console.log(readout);
  if (readout > 0) {
    const convertedMS = convertMs(readout);
    // console.log(convertedMS);
    countdown(convertedMS);
  } else {
    clearInterval(timerId);
  }
}

function countdown({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = days;
  document.querySelector('[data-hours]').textContent = hours;
  document.querySelector('[data-minutes]').textContent = minutes;
  document.querySelector('[data-seconds]').textContent = seconds;
}

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
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
