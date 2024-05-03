import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formItem = document.querySelector('.form');
const inputItem = document.querySelector('input[name="delay"]');
const fullfilledItem = document.querySelector('input[name="state"]');

function sendForm (event) {
  event.preventDefault();
  const isSuccess = fullfilledItem.checked ? true : false;
  const promice = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        resolve(inputItem.value);
      } else {
        reject(inputItem.value);
      }
    }, inputItem.value);
  });

  promice
    .then(delay => {
      iziToast.show({
        title: '✅',
        message: ` Fulfilled promise in ${delay}ms`,
        backgroundColor: 'green',
        color: 'white',
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.show({
        title: '❌',
        message: ` Rejected promise in ${delay}ms`,
        backgroundColor: 'red',
        color: 'white',
        position: 'topRight',
      });
    });
}
formItem.addEventListener('submit', sendForm);