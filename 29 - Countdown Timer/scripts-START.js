const timerButtons = document.querySelectorAll('[data-time]');
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
let countdown;

const timer = (seconds) => {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayEndTime(then);

  updateTimer(seconds);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    updateTimer(secondsLeft);
  },1000);
}

const updateTimer = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
  document.title = display;
  timeLeft.innerText = display;
}

const displayEndTime = (timestamp) => {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  const display = `Be back at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  endTime.innerText = display;
}

timerButtons.forEach(button => button.addEventListener('click', (e) => timer(e.currentTarget.dataset.time)));
document.customForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const mins = e.currentTarget.minutes.value;
  timer(mins * 60);
  e.currentTarget.reset();
});
