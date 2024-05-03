import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const timerRef = {
    button: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

let userSelectedDate = null;

function buttonOff() {
  timerRef.button.classList.add('off');
  timerRef.button.off = true;
}

function buttonOn() {
  timerRef.button.classList.remove('off');
  timerRef.button.off = false;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: 'red',
        color: '#ffffff',
        position: 'topRight',
      });
      buttonOff();
    } else {
      userSelectedDate = selectedDates[0];
      buttonOn();
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

buttonOff();
timerRef.button.addEventListener('click', () => {
  const interval = setInterval(() => {
    const timer = userSelectedDate - new Date();
    const time = convertMs(timer);
    if (
      time.seconds === 0 &&
      time.minutes === 0 &&
      time.hours === 0 &&
      time.days === 0
    ) {
      clearInterval(interval);
      timerRef.input.off = false;
      buttonOn();
    }
    timerRef.days.textContent = addLeadingZero(time.days);
    timerRef.hours.textContent = addLeadingZero(time.hours);
    timerRef.minutes.textContent = addLeadingZero(time.minutes);
    timerRef.seconds.textContent = addLeadingZero(time.seconds);
    buttonOff();
    timerRef.input.off = true;
  }, 1000);
});
flatpickr('input', options);