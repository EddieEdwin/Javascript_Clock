// DOM Elements
const clock = document.querySelector("#clock-grid");
const dots = document.querySelectorAll(".dot");
const cube = document.querySelector("#cube");
const clockSides = document.querySelectorAll(".clock-tile");
const clockColorBtns = document.querySelectorAll(".color-btn");
const sizeBtn = document.querySelector("#size-btn");

// Changing clock texture (color)
const changeClockTexture = function (n) {
  clockSides.forEach(function (side) {
    side.style.backgroundImage = `url('src/Color${n}_Texture.jpg')`;
  });
};

clockColorBtns.forEach(function (button, i) {
  button.addEventListener("click", function () {
    changeClockTexture(i + 1);
  });
});

// CHANGE THIS TO A CSS TRANSMISSION INSTEAD OF USING AN INTERVAL
// Changing clock size
let clockSize = 400;
let maxSize = 400;
let clockInterval = 0;

sizeBtn.addEventListener("click", function () {
  if (clockSize === 300) {
    maxSize = 400;
    sizeBtn.textContent = "Medium";
    clockInterval = setInterval(changeClockSize, 2);
  } else if (clockSize === 400) {
    maxSize = 500;
    sizeBtn.textContent = "Large";
    clockInterval = setInterval(changeClockSize, 2);
  } else if (clockSize === 500) {
    maxSize = 300;
    sizeBtn.textContent = "Small";
    clockInterval = setInterval(changeClockSize, 1);
  }
});

const changeClockSize = function () {
  if (clockSize === maxSize) {
    clearInterval(clockInterval);
    return;
  }

  if (clockSize < maxSize) {
    clockSize += 2;
  } else {
    clockSize -= 3;
  }

  console.log("hi");

  document.documentElement.style.setProperty("--clock-size", `${clockSize}px`);
};

// Converting text to array for CSS Grid
const [...letters] =
  "hetkisavijftienatzvoorovermekwarthalfspmovervoorthgeenstweeamcdrieviervijfzeszevenonegenachttienelftwaalfpmuur".toUpperCase();

// Insert each letter in HTML with unique id and a class, id matches array
letters.forEach(function (letter, i) {
  clock.insertAdjacentHTML(
    "beforeend",
    `<p id="letter-${i}" class="letter">${letter}</p>`
  );
});

// Selecting DOM letter array after initialization in previous forEach
const letterElements = document.querySelectorAll(".letter");

// Toggle letter classes on or off on an array of indexes
const toggleLetters = function (arr) {
  arr.forEach(function (letterIndex) {
    const letter = document.querySelector(`#letter-${letterIndex}`);
    letter.classList.contains("letter-active")
      ? letter.classList.remove("letter-active")
      : letter.classList.add("letter-active");
  });
};

// Switch case using minutes of actual time
const updateDots = function (minute) {
  // Slice last digit and convert back to number
  let lastDigit = String(minute).slice(-1);
  lastDigit = Number(lastDigit);

  // Check last digit if dot is needed else break and go back to main function
  switch (lastDigit) {
    case 6:
    case 1:
      activateDots(0);
      break;
    case 7:
    case 2:
      activateDots(0, 1);
      break;
    case 8:
    case 3:
      // Dot index 2 and 3 are swapped for more logical feeling (clockwise dots)
      activateDots(0, 1, 3);
      break;
    case 9:
    case 4:
      activateDots(0, 1, 2, 3);
      break;
    default:
      break;
  }
};

// Can take multiple arguments from 0 to 3 and enables each index of corrisponding dot
const activateDots = function (...args) {
  args.forEach((i) => dots[i].classList.add("dot-active"));
};

// Loop through letters and remove all active classes
const disableAll = function () {
  letterElements.forEach(function (letterIndex) {
    letterIndex.classList.remove("letter-active");
  });
  dots.forEach(function (dot) {
    dot.classList.remove("dot-active");
  });
};

// Mapping toggle functions for words matched to array index
const toggleHetIs = () => toggleLetters([0, 1, 2, 4, 5]);
const toggleMins5 = () => toggleLetters([7, 8, 9, 10]);
const toggleMins10 = () => toggleLetters([11, 12, 13, 14]);
const toggleVoor = () => toggleLetters([18, 19, 20, 21]);
const toggleOver = () => toggleLetters([22, 23, 24, 25]);
const toggleKwart = () => toggleLetters([28, 29, 30, 31, 32]);
const toggleKwartVoor = () =>
  toggleLetters([28, 29, 30, 31, 32, 44, 45, 46, 47]);
const toggleKwartOver = () =>
  toggleLetters([28, 29, 30, 31, 32, 40, 41, 42, 43]);
const toggleHalf = () => toggleLetters([33, 34, 35, 36]);
const toggleHour1 = () => toggleLetters([51, 52, 53]);
const toggleHour2 = () => toggleLetters([55, 56, 57, 58]);
const toggleHour3 = () => toggleLetters([62, 63, 64, 65]);
const toggleHour4 = () => toggleLetters([66, 67, 68, 69]);
const toggleHour5 = () => toggleLetters([70, 71, 72, 73]);
const toggleHour6 = () => toggleLetters([74, 75, 76]);
const toggleHour7 = () => toggleLetters([77, 78, 79, 80, 81]);
const toggleHour8 = () => toggleLetters([88, 89, 90, 91]);
const toggleHour9 = () => toggleLetters([83, 84, 85, 86, 87]);
const toggleHour10 = () => toggleLetters([92, 93, 94, 95]);
const toggleHour11 = () => toggleLetters([96, 97, 98]);
const toggleHour12 = () => toggleLetters([99, 100, 101, 102, 103, 104]);
const toggleHour = () => toggleLetters([107, 108, 109]);

// MAIN CLOCK UPDATE FUNCTION
const updateTime = function () {
  const date = new Date(); // Get actual time
  let hour = date.getHours();
  let min = date.getMinutes();

  // Hard coded time for test purposes
  // hour = 10;
  // min = 23;

  disableAll(); // Disable all letters and toggle on the correct ones
  toggleHetIs(); //'Het is' is always on
  updateDots(min); // Update dots

  // Full summary for minutes
  // 0-4: uur
  // 5-9: 5 over
  // 10-14: 10 over
  // 15-19: kwart over
  // 20-24: 10 voor half
  // 25-29: 5 voor half
  // 30-34: half
  // 35-39: 5 over half
  // 40-44: 10 over half
  // 45-49: kwart voor
  // 50-54: 10 voor
  // 55-59: 5 voor

  // Over1 is toggled on 5-14 35-44 for vijf, tien and kwartier
  if ((min >= 5 && min <= 14) || (min >= 35 && min <= 44)) {
    toggleOver();
  }

  // Voor1 is toggled on 20-29 50-59 for vijf, tien and kwartier
  if ((min >= 20 && min <= 29) || (min >= 50 && min <= 59)) {
    toggleVoor();
  }

  // Half is toggled on between 20-44
  if (min >= 20 && min <= 44) {
    toggleHalf();
  }

  // Switch for rest of the cases for better overview
  switch (true) {
    case min < 5:
      toggleHour();
      break;
    case min < 10:
      toggleMins5();
      break;
    case min < 15:
      toggleMins10();
      break;
    case min < 20:
      toggleKwartOver();
      break;
    case min < 25:
      toggleMins10();
      break;
    case min < 30:
      toggleMins5();
      break;
    case min < 35:
      break;
    case min < 40:
      toggleMins5();
      break;
    case min < 45:
      toggleMins10();
      break;
    case min < 50:
      toggleKwartVoor();
      break;
    case min < 55:
      toggleMins10();
      break;
    case min < 60:
      toggleMins5();
      break;
    default:
      break;
  }

  // Hours don't run at exact hours meaning 9 is enabled between 8:20-9:19
  // Hours * 60 + mins = full minutes
  // If fullMins value is between set value enable hour

  // Full day = 1440 mins
  const fullMins = hour * 60 + min;

  // 1: 20 - 79 && 740 - 799
  // 2: 80 - 139 && 800 - 859
  // 3: 140 - 199 && 860 - 919
  // 4: 200 - 259 && 920 - 979
  // 5: 260 - 319 && 980 - 1039
  // 6: 320 - 379 && 1040 - 1099
  // 7: 380 - 439 && 1100 - 1159
  // 8: 440 - 499 && 1160 - 1219
  // 9: 500 - 559 && 1220 - 1279
  // 10: 560 - 619 && 1280 - 1339
  // 11: 620 - 679 && 1340 - 1399
  // 12: 680 - 739 && 1400 - 1440 && 0 - 19

  if (
    (fullMins >= 20 && fullMins < 80) ||
    (fullMins >= 740 && fullMins < 800)
  ) {
    toggleHour1();
  } else if (
    (fullMins >= 80 && fullMins < 140) ||
    (fullMins >= 800 && fullMins < 860)
  ) {
    toggleHour2();
  } else if (
    (fullMins >= 140 && fullMins < 200) ||
    (fullMins >= 860 && fullMins < 920)
  ) {
    toggleHour3();
  } else if (
    (fullMins >= 200 && fullMins < 260) ||
    (fullMins >= 920 && fullMins < 980)
  ) {
    toggleHour4();
  } else if (
    (fullMins >= 260 && fullMins < 320) ||
    (fullMins >= 980 && fullMins < 1040)
  ) {
    toggleHour5();
  } else if (
    (fullMins >= 320 && fullMins < 380) ||
    (fullMins >= 1040 && fullMins < 1100)
  ) {
    toggleHour6();
  } else if (
    (fullMins >= 380 && fullMins < 440) ||
    (fullMins >= 1100 && fullMins < 1160)
  ) {
    toggleHour7();
  } else if (
    (fullMins >= 440 && fullMins < 500) ||
    (fullMins >= 1160 && fullMins < 1220)
  ) {
    toggleHour8();
  } else if (
    (fullMins >= 500 && fullMins < 560) ||
    (fullMins >= 1220 && fullMins < 1280)
  ) {
    toggleHour9();
  } else if (
    (fullMins >= 560 && fullMins < 620) ||
    (fullMins >= 1280 && fullMins < 1340)
  ) {
    toggleHour10();
  } else if (
    (fullMins >= 620 && fullMins < 680) ||
    (fullMins >= 1340 && fullMins < 1400)
  ) {
    toggleHour11();
  } else if (
    (fullMins >= 680 && fullMins < 740) ||
    (fullMins >= 1400 && fullMins < 1440) ||
    (fullMins >= 0 && fullMins < 20)
  ) {
    toggleHour12();
  }
};

// Run updated time at start then every x miliseconds
updateTime();
setInterval(updateTime, 1000);
