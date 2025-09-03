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
  
  // push-to-talk mic button
  const micButton = document.getElementById("micButton");
function blowOutCandles() {
  if (isBlowing()) {
    candles.forEach((candle) => {
      if (!candle.classList.contains("out") && Math.random() > 0.5) {
        candle.classList.add("out");
      }
    });

    // ✅ Check if all candles are blown
    let allOut = candles.every(candle => candle.classList.contains("out"));
    if (allOut) {
       var audio = new Audio("cheer.mp3");
      audio.play();
       setTimeout(function(){
         micButton.classList.add("hide-but");
      cake.classList.add("moveaS");
      console.log("🎉 All candles are blown out!");
      },3000)
   

      setTimeout(function(){
        let containerG=document.querySelector(".container")
        containerG.classList.add("show-gift");
      },3000)
      // You can trigger something here, e.g.:
      // show a message, play an animation, etc.
    }
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
    //m.textContent = "ON";
  });

  micButton.addEventListener("mouseup", () => {
    release();
    listening = false;
    console.log("🎤 Mic OFF");
    //m.textContent = "OFF";
  });

  micButton.addEventListener("mouseleave", () => {
    release();
    listening = false;
    //m.textContent = "OFF";
  });

  // Mobile
  micButton.addEventListener("touchstart", async (e) => {
    e.preventDefault();
    pressDown();
    await initMic();
    listening = true;
    console.log("🎤 Mic ON (touch)");
    //m.textContent = "ON";
  });

  micButton.addEventListener("touchend", () => {
    release();
    listening = false;
    console.log("🎤 Mic OFF (touch)");
    //m.textContent = "OFF";
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
        },
       //1000 TESTING 
      18000//18 secs
      )

    },
    // 1000 TESTING
    67500//1minute and 9sec
  ); 

  
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
let pass=false;
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
let containerR = document.querySelector(".containerR");
let cover = document.querySelector(".cover");

document.querySelector(".gift").addEventListener("click", function () {
  cover.style.pointerEvents = "none";
  cover.classList.add("open");

  setTimeout(function () {
    containerR.style.display = "block";
    containerR.style.pointerEvents = "auto";
    containerR.classList.add("gr"); // grow animation

    setTimeout(function () {
      console.log("PWEDE NA CLICK LETTER");

      containerR.addEventListener("click", handleContainerClick, { once: true });

    }, 1000);

  }, 500);
});
const images = document.querySelectorAll(".last");

function handleContainerClick(event) {
  event.stopPropagation(); // ⬅️ Stop click from reaching cover
  var audio = new Audio("songCut.mp3");

  
  // Wait until the audio metadata (like duration) is loaded
  audio.addEventListener("loadedmetadata", function () {
    if(pass==false){
    audio.currentTime = 5.5; // Start at 5.5 seconds
    audio.loop = true;
    audio.play();
    }
    pass=true;
  
    

    // Add entry animation class
    setTimeout(function(){
  images.forEach(element => {
       if (element === "cat/dance1.gif" || element === "cat/d1.gif" || element === "cat/dance5.gif") {
    element.classList.add("comeL"); // fixed class name
    } else {
     element.classList.add("comeR"); // fixed class name
    }
     
    });
    },1000)
  
  });

  containerR.classList.remove("gr");
  containerR.classList.add("sr");

  // Re-enable cover clicks if needed
  cover.style.pointerEvents = "auto";

  setTimeout(function () {
    containerR.style.display = "none";
    containerR.classList.remove("sr");

    // Start close animation
    cover.classList.add("close");
    cover.classList.remove("open");

    // Remove 'close' after animation ends
    setTimeout(function () {
      cover.classList.remove("close");
    }, 2000); // match CSS animation duration

  }, 500);
}

function danceSide() {
  const gifs = [
    "cat/dance1.gif",
    "cat/dance2.gif",
    "cat/d1.gif",
    "cat/dance4.gif",
    "cat/dance5.gif",
    "cat/dance6.gif"
  ];

  for (var i = 0; i < images.length; i++) {
    // pick gif by looping through gifs array
    var gifIndex = i % gifs.length;
    var gif = gifs[gifIndex];

    // apply gif to image
    images[i].src = gif;

    // add top spacing
    images[i].style.top = (i * 20) + "vh"; // adjust spacing

    // add left + class for selected gifs
    if (gif === "cat/dance1.gif" || gif === "cat/d1.gif" || gif === "cat/dance5.gif") {
      images[i].classList.add("f3");
      images[i].style.left = "-20vw"; // offscreen left
    } else {
      images[i].classList.add("s3");
      images[i].style.right = "-15vw"; // offscreen right
    }
  }
}

danceSide();
