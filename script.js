document.addEventListener("DOMContentLoaded", function () {
  const cake = document.querySelector(".cake");
  let candles = [];
  let audioContext;
  let analyser;
  let microphone;
  let stream;
  let listening = false; // mic state

  const topLayer = document.querySelector(".top-layer-click-area");
  let les = [33.8, 63.8, 88.8, 115.8, 141.8, 162.8, 184.8, 203.8,97,135];
  let to = [3.57498, 8.57498, 15.575, 17.575, 15.575, 13.575, 8.57498, 6.57498,-70,-70];

  function can() {
    for (let i = 0; i < les.length; i++) {
      addCandle(les[i], to[i]);
    }
  }

  function addCandle(left, top) {
    const candle = document.createElement("div");
    candle.className = "candle";
    candle.style.left = left + "px";
    candle.style.top = top + "px";

    const flame = document.createElement("div");
    flame.className = "flame";
    candle.appendChild(flame);

    cake.appendChild(candle);
    candles.push(candle);
  }

  topLayer.addEventListener("click", function (event) {
    const rect = topLayer.getBoundingClientRect();
    const left = event.clientX - rect.left;
    const top = event.clientY - rect.top;
    addCandle(left, top);
  });

  function isBlowing() {
    if (!analyser || !listening) return false;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    let average = sum / bufferLength;

    return average > 40; // sensitivity threshold
  }

  function blowOutCandles() {
    if (isBlowing()) {
      candles.forEach((candle) => {
        if (!candle.classList.contains("out") && Math.random() > 0.5) {
          candle.classList.add("out");
        }
      });
    }
  }

  // mic setup
  async function initMic() {
    if (!stream) {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        setInterval(blowOutCandles, 200);
      } catch (err) {
        console.log("Unable to access microphone:", err);
      }
    }
  }

  // push-to-talk mic button
  const micButton = document.getElementById("micButton");

  function pressDown() {
    micButton.classList.add("pressed");
  }

  function release() {
    micButton.classList.remove("pressed");
  }

  // Desktop
  let m=document.getElementById("m")
  micButton.addEventListener("mousedown", async () => {
    pressDown();
    await initMic();
    listening = true;
    console.log("🎤 Mic ON");
  });

  micButton.addEventListener("mouseup", () => {
    release();
    listening = false;
    console.log("🎤 Mic OFF");
  });

  micButton.addEventListener("mouseleave", () => {
    release();
    listening = false;
  });

  // Mobile
  micButton.addEventListener("touchstart", async (e) => {
    e.preventDefault();
    pressDown();
    await initMic();
    listening = true;
    console.log("🎤 Mic ON (touch)");
    m.textContent="ONN"
  });

  micButton.addEventListener("touchend", () => {
    release();
    listening = false;
    console.log("🎤 Mic OFF (touch)");
     m.textContent="OFF"
  });

  // spawn candles + snow
  can();
  createSnow(25);
});

// RANDOM DROPS
const snowContent = [
  "blueS.svg",
  "yel1.svg",
  "yel2.svg",
  "pinkS.svg",
  "blueS.svg"
];

const random = (num) => Math.floor(Math.random() * num);

const getRandomStyles = () => {
  const top = random(100);
  const left = random(100);
  const dur = random(10) + 8;
  const size = random(25) + 25;
  return ` 
    top: -${top}%; 
    left: ${left}%; 
    width: ${size}px; 
    height: ${size}px; 
    animation-duration: ${dur}s; `;
};

const createSnow = (num) => {
  const snowContainer = document.getElementById("snow-container");
  for (let i = 0; i < num; i++) {
    let snow = document.createElement("img");
    snow.className = "snow";
    snow.style.cssText = getRandomStyles();
    snow.src = snowContent[random(snowContent.length)];
    snowContainer.appendChild(snow);
  }
};