const RESULT = {
  WIN: 1,
  LOSS: 0,
};

const SYMBOLS = ["🍒", "💵", "🍇"];

let balance = 5;

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
    li.textContent = SYMBOLS[reel];
    fragment.append(li);
  }
  target.replaceChildren(fragment);
}

function message(message) {
  const target = document.querySelector("h2");
  target.textContent = message;
}

function credits(amount) {
  const target = document.querySelector("h3");
  target.textContent = `${amount} credits remaining`;
} // try mdn -intl for formating the s

function result(reels) {
  const win = reels.every((x, _, arr) => x === arr.at(0));
  return win ? RESULT.WIN : RESULT.LOSS;
}

function calculateBalance(amount, result) {
  if (amount === 0) {
    return 0;
  }
  switch (result) {
    case RESULT.WIN:
      return amount * 2;
    case RESULT.LOSS:
      return amount - 1;
    default:
      return amount;
  }
}

function play() {
  const reels = game();
  const res = result(reels);
  switch (res) {
    case RESULT.WIN:
      message("WINNER WINNER WINNER!!!!!");
      break;
    default:
      message("Sorry, better luck next time");
  }
  balance = calculateBalance(balance, res);
  render(reels);
  credits(balance);
  if (balance === 0) {
    document.querySelector("button").disabled = true;
  }
}

function main() {
  document.querySelector("button").addEventListener("click", play);
  credits(balance);
}

main();
