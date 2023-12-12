const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const colors = [
  "blue",
  "purple",
  "pink",
  "yellow",
  "brown",
  "gray",
  "blue",
  "purple",
  "pink",
  "yellow",
  "brown",
  "gray"
]

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    [array[index], array[counter]] = [array[counter], array[index]];

  }
  return array;
}


let shuffledColors = shuffle(colors);
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.onclick = handleCardClick
    gameContainer.append(newDiv);
  }
}


function handleCardClick(e) {
if (noClicking || e.target.classList.contains("flipped")) return;
let currentCard = e.target;
currentCard.style.backgroundColor = currentCard.classList[0];


if (!card1 || !card2) {
  currentCard.classList.add("flipped");
  card1 = card1 || currentCard;
  if(currentCard === card1){
    card2 = null;
  }
  else{
  card2 = currentCard
  }
}

if (card1 && card2) {
  noClicking = true;
  let gif1 = card1.className;
  let gif2 = card2.className;

if (gif1 === gif2) {
  cardsFlipped += 2;
  card1.removeEventListener("click", handleCardClick);
  card2.removeEventListener("click", handleCardClick);
  card1 = card2 = null;
  noClicking = false;
} 
  else {
    setTimeout(function() {
      card1.style.backgroundColor = "";
      card2.style.backgroundColor = "";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1 = null;
      card2 = null;
      noClicking = false;
    }, 1000);
  }
}

if (cardsFlipped === colors.length) alert("YOU WIN!");
}

createDivsForColors(shuffledColors);


function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function changeTitleColors() {
  const title = document.getElementById("theTitle");
  const titleText = title.textContent;
  const coloredText = [];

  for (let i = 0; i < titleText.length; i++) {
    const letter = titleText.charAt(i);
    const coloredLetter = `<span style="color: ${getRandomColor()}">${letter}</span>`;
    coloredText.push(coloredLetter);
  }

  title.innerHTML = coloredText.join("");
}

changeTitleColors();

setInterval(changeTitleColors, 1000);



