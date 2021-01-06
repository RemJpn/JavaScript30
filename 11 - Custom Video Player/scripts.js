// Get the elements
const viewer = document.querySelector('.player__video');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const playButton = document.querySelector('.toggle');
const playerButtons = document.querySelectorAll('[data-skip]');
const playerSliders = document.querySelectorAll('.player__slider');
let mousedown = false;
const fullScreen = document.querySelector('.fullscreen');

// Define functions
const playPause = (event) => {
  const method = viewer.paused ? 'play' : 'pause';
  viewer[method]();
}

const updateButton = (event) => {
  const icon = event.currentTarget.paused ? '►' : '❚ ❚';
  playButton.textContent = icon;
}

const rewindForward = (event) => {
  viewer.currentTime += Number(event.currentTarget.dataset.skip);
}

const handleProgress = (event) => {
  progressFilled.style.flexBasis = `${Math.round(viewer.currentTime / viewer.duration * 100)}%`;
}

const setTime = (event) => {
  viewer.currentTime = Math.round(event.offsetX / progress.offsetWidth * viewer.duration);
}

const handleSliderUpdate = (event) => {
  viewer[event.currentTarget.name] = event.currentTarget.value;
}

const toggleFullscreen = (event) => {
  viewer.requestFullscreen();
}

// Event listeners
viewer.addEventListener('click', playPause);
viewer.addEventListener('play', updateButton);
viewer.addEventListener('pause', updateButton);
viewer.addEventListener('timeupdate', handleProgress);
playButton.addEventListener('click', playPause);
playerButtons.forEach(button => button.addEventListener('click', rewindForward));
progress.addEventListener('click', setTime);
progress.addEventListener('mousemove', (e) => mousedown && setTime(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

playerSliders.forEach(slider => slider.addEventListener('change', handleSliderUpdate));

fullScreen.addEventListener('click', toggleFullscreen);
