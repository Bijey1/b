document.addEventListener("DOMContentLoaded", function () {
  const cake = document.querySelector(".cake");
  const candleCountDisplay = document.getElementById("candleCount");
  let candles = [];
  let audioContext;
  let analyser;
  let microphone;

  function updateCandleCount() {
    const activeCandles = candles.filter(
      (candle) => !candle.classList.contains("out")
    ).length;
    candleCountDisplay.textContent = activeCandles;
  }
const topLayer = document.querySelector(".top-layer-click-area");
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
    updateCandleCount();
  }

  topLayer.addEventListener("click", function (event) {
    console.log("camndel")
    const rect = topLayer.getBoundingClientRect();
    const left = event.clientX - rect.left;
    const top = event.clientY - rect.top;
    addCandle(left, top);
  });

  function isBlowing() {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i];
    }
    let average = sum / bufferLength;

    return average > 40; //
  }

  function blowOutCandles() {
    let blownOut = 0;

    if (isBlowing()) {
      candles.forEach((candle) => {
        if (!candle.classList.contains("out") && Math.random() > 0.5) {
          candle.classList.add("out");
          blownOut++;
        }
      });
    }

    if (blownOut > 0) {
      updateCandleCount();
    }
  }

  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        setInterval(blowOutCandles, 200);
      })
      .catch(function (err) {
        console.log("Unable to access microphone: " + err);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
});



//RANDOM DROPS
 const snowContent = ["&#128218", "&#9999", "&#128214"];
      const random = (num) => {
        return Math.floor(Math.random() * num);
      };

      const getRandomStyles = () => {
        const top = random(100);
        const left = random(100);
        const dur = random(10) + 8;
        const size = random(25) + 25;
        return ` 
        top: -${top}%; 
        left: ${left}%; 
        font-size: ${size}px; 
        animation-duration: ${dur}s; `;
      };

      const createSnow = (num) => {
        const snowContainer = document.getElementById("snow-container"); // Reference the snow-container
        for (let i = 0; i < num; i++) {
          let snow = document.createElement("div");
          snow.className = "snow";
          snow.style.cssText = getRandomStyles();
          snow.innerHTML = snowContent[random(3)]; // Randomly select snowflakes
          snowContainer.appendChild(snow);
        }
      };

/* window.addEventListener("load", () => {
        createSnow(25); // Create 30 snowflakes
      });*/