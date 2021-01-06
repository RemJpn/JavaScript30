const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = () => {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
      console.log(localMediaStream);
      // video.src = window.URL.createObjectURL(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => console.error('OH NO!', err));
}

const paintToCanvas = () => {
  const width = video.videoWidth;
  const height = video.videoHeight;
  console.log(width, height);
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    // pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);
    pixels = greenScreen(pixels);
    ctx.globalAlpha = 0.1;
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

const takePhoto = () => {
  // play the shutter sound
  snap.currentTime = 0;
  snap.play();

  //take data out of canvas
  const data = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = data;
  // link.textContent = 'Download Image';
  link.innerHTML = `<img src="${data}" alt="Handsome man">`;
  link.setAttribute('download', 'handsome');
  strip.insertBefore(link, strip.firstChild);
}

const redEffect = (pixels) => {
  for(let i = 0; i < pixels.data.length; i += 4){
    pixels.data[i + 0] += 200;
    pixels.data[i + 1] -= 50;
    pixels.data[i + 2] *= 0.5 ;
  }
  return pixels;
}

const rgbSplit = (pixels) => {
  for(let i = 0; i < pixels.data.length; i += 4){
    pixels.data[i - 150] = pixels.data[i + 0];
    pixels.data[i + 500] = pixels.data[i + 1];
    pixels.data[i - 500] = pixels.data[i + 2] ;
  }
  return pixels;
}

const greenScreen = (pixels) => {
  const levels = {};
  document.querySelectorAll('.rgb input').forEach(input => {
    levels[input.name] = input.value;
  });

  for(let i = 0; i < pixels.data.length; i += 4){
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2] ;
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin && red <= levels.rmax
      && green >= levels.gmin && green <= levels.gmax
      && blue >= levels.bmin && blue <= levels.bmax){
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}




getVideo();

video.addEventListener('canplay', paintToCanvas);


