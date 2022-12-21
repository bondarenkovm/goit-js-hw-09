import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');

btnStart.disabled = true;
let timerId = null;
let inputDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 5,
  onClose(selectedDates) {
    inputDate = selectedDates[0].getTime();
    if (inputDate >= Date.now()) {
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

function onClickBtnStart() {
  btnStart.disabled = true;
  timerId = setInterval(addTimer, 1000);
  //   btnCleanTimer();
}

// console.log(qwe);

function addTimer() {
  //   const inputDate = new Date(input.value).getTime();
  //   console.log(inputDate);
  const readout = inputDate - Date.now();
  //   console.log(Date.now());
  //   console.log(readout);
  if (readout > 0) {
    // const converMS = convertMs(readout);
    // console.log(converMS);
    countdown(convertMs(readout));
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

// function btnCleanTimer() {
//   btnStart.insertAdjacentHTML(
//     'afterend',
//     `<button type="button" data-clean>Clean</button>`
//   );
//   const btnClean = document.querySelector('[data-clean]');
//   btnClean.addEventListener('click', onClickBtnCleanTimer);
// }

// function onClickBtnCleanTimer() {
//   input.value = '';
//   clearInterval(timerId);
//   timer.innerHTML = `<div class="timer">
//         <div class="field">
//           <span class="value" data-days>00</span>
//           <span class="label">Days</span>
//         </div>
//         <div class="field">
//           <span class="value" data-hours>00</span>
//           <span class="label">Hours</span>
//         </div>
//         <div class="field">
//           <span class="value" data-minutes>00</span>
//           <span class="label">Minutes</span>
//         </div>
//         <div class="field">
//           <span class="value" data-seconds>00</span>
//           <span class="label">Seconds</span>
//         </div>
//       </div>`;
//   btnClean.remove();
// }
