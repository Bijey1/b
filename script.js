document.addEventListener("DOMContentLoaded", function () {
  window.play = play;
  let cake = document.querySelector(".cake");
  let candles = [];
  let audioContext;
  let analyser;
  let microphone;
  let stream;
  let listening = false; // mic state

  const topLayer = document.querySelector(".top-layer-click-area");
  let les = [33.8, 63.8, 88.8, 115.8, 141.8, 162.8, 184.8, 203.8, 97, 135];
  let to = [3.57498, 8.57498, 15.575, 17.575, 15.575, 13.575, 8.57498, 6.57498, -70, -70];

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

    console.log("Mic average:", average); // debug log
    return average > 25; // lowered threshold for mobile
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

        if (audioContext.state === "suspended") {
          await audioContext.resume(); // mobile fix
        }

        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        setInterval(blowOutCandles, 200);
      } catch (err) {
        console.log("Unable to access microphone:", err);
      }
    } else if (audioContext.state === "suspended") {
      await audioContext.resume(); // resume if paused
    }
  }

  // push-to-talk mic button
  const micButton = document.getElementById("micButton");
  let m = document.getElementById("m");

  function pressDown() {
    micButton.classList.add("pressed");
  }

  function release() {
    micButton.classList.remove("pressed");
  }

  // Desktop
  micButton.addEventListener("mousedown", async () => {
    pressDown();
    
    listening = true;
    console.log("🎤 Mic ON");
    m.textContent = "ON";
  });

  micButton.addEventListener("mouseup", () => {
    release();
    listening = false;
    console.log("🎤 Mic OFF");
    m.textContent = "OFF";
  });

  micButton.addEventListener("mouseleave", () => {
    release();
    listening = false;
    m.textContent = "OFF";
  });

  // Mobile
  micButton.addEventListener("touchstart", async (e) => {
    e.preventDefault();
    pressDown();
    await initMic();
    listening = true;
    console.log("🎤 Mic ON (touch)");
    m.textContent = "ON";
  });

  micButton.addEventListener("touchend", () => {
    release();
    listening = false;
    console.log("🎤 Mic OFF (touch)");
    m.textContent = "OFF";
  });

  // spawn candles + snow
  can();//MAKE THE CANDELS IN THE CAKE
  
let dark=document.querySelector(".dark");
let light=document.querySelector(".containerL")

  let dance=document.querySelector(".dance")
let dance2=document.querySelector(".dance2")
//PRESSED THE LIGHT
async function play() {
  await initMic();
  light.remove();
  dark.remove();

  createSnow(25);
  
  setTimeout(function () {
  
   dances();

    //SHOW CAKE
     setTimeout(function(){
        cake.classList.add("show-cake")
        dance2.remove();
         dance.remove();


        setTimeout(function(){
            micButton.classList.add("show-but")
        },18000)//18 secs

    },67500); //1minute and 9sec

  
    var audio = new Audio("songCut.mp3");
  audio.play();
  console.log("This runs after 2 seconds");
}, 500); 
 
};


function dances() {
  const gifs1 = ["cat/dance2.gif", "cat/dance3.gif", "cat/d1.gif", "cat/dance4.gif", "cat/dance5.gif", "cat/dance6.gif"];
  const gifs2 = ["cat/dance2.gif", "cat/dance3.gif", "cat/d1.gif", "cat/dance4.gif", "cat/dance5.gif", "cat/dance6.gif"];
  let index = 0;

  setTimeout(function () {
    dance.classList.add("hide-catL");
    dance2.classList.add("hide-catR");

    setTimeout(function () {
      dance.classList.add("outL");
      dance2.classList.add("outR");
    }, 7500);

    // 🔹 Store interval in a variable
    let danceInterval = setInterval(function () {
      setTimeout(function () {
        dance.classList.add("outL");
        dance2.classList.add("outR");
      }, 7500);

      // Reset classes
      dance.classList.remove("hide-catL");
      dance2.classList.remove("hide-catR");
      dance.classList.remove("outL");
      dance2.classList.remove("outR");

      // Swap GIFs
      dance.src = gifs1[index];
      dance2.src = gifs2[index];

      // Restart animation
      void dance.offsetWidth;
      void dance2.offsetWidth;

      dance.classList.add("hide-catL");
      dance2.classList.add("hide-catR");

      index++;

      // 🔹 Stop interval after last gif
      if (index > gifs1.length) {
        dance2.remove();
         dance.remove();
        clearInterval(danceInterval);
        console.log("Dance interval ended");
      }
    }, 8500);
  }, 6500);
}


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

let containerR=document.querySelector(".containerR")
let cover=document.querySelector(".cover")
document.querySelector(".gift").addEventListener("click", function () {

cover.classList.add("open");
setTimeout(function(){
containerR.classList.add("gr");
},500) 
cover.classList.add("open");

});

