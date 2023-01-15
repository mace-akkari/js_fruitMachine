const RESULT = {
  WIN: 1,
  LOSS: 0,
};

// found on mdn
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function game() {
  return Array.from(new Array(3), () => getRandomIntInclusive(0, 2));
}

function render(reels) {
  const target = document.querySelector("ol");
  const fragment = document.createDocumentFragment();
  for (const reel of reels) {
    const li = document.createElement("li");
    li.textContent = reel;
    fragment.append(li);
    console.log(li);
  }
}

function message(message) {
  const target = document.querySelector("h2");
  target.textContent = message;
}

function result(reels) {
  const win = reels.every((x, _, arr) => x === arr.at(0));
  return win ? RESULT.WIN : RESULT.LOSS;
}

function play() {
  const reels = game();
  switch (result(reels)) {
    case RESULT.WIN:
      message("WINNER WINNER WINNER!!!!!");
      break;
    default:
      message("Sorry, better luck next time");
  }
  render(reels);
}

function main() {
  document.querySelector("button").addEventListener("click", play);
}

main();
