import "./style.css";

let desire: number = 0.0;
let growthRate = 0;
let breaths = 0;
let waterCount = 0;
let waterPrice = 10;
let fridgeCount = 0;
let fridgePrice = 100;
let crackerCount = 0;
let crackerPrice = 1000;

document.body.innerHTML = `
  <div>Gluttonous Desire: <span id="desire">${desire}</span></div>
  <div>Hunger Grows at <span id="growth">${growthRate}</span> units/sec</div>
  <button id="clicker">Breathe 💨</button> (free!)
  <div>Took <span id="breath count">${breaths}</span> Breaths</div>
  <div><button id="upgradeWater">Drink Water</button> to satiate desire by <span id="water price">${waterPrice}</span></div>
  <div>Downed <span id="water count">${waterCount}</span> Bottles of Water</div>
  <div><button id="upgradeFridge">Check the Fridge</button> to satiate desire by 100</div>
  <div>Fridge Checked <span id="fridge count">${fridgeCount}</span> Times</div>
  <div><button id="upgradeCracker">Eat a Cracker</button> to satiate desire by 1000</div>
  <div>Eaten <span id="cracker count">${crackerCount}</span> Crackers</div>
`;

const counter = document.getElementById("desire")! as HTMLElement;
const growth = document.getElementById("growth")! as HTMLElement;
const clicker = document.getElementById("clicker")! as HTMLButtonElement;
const breathCountLabel = document.getElementById(
  "breath count",
)! as HTMLElement;
const waterCountLabel = document.getElementById("water count")! as HTMLElement;
const waterPriceLabel = document.getElementById("water price")! as HTMLElement;
const fridgeCountLabel = document.getElementById(
  "fridge count",
)! as HTMLElement;
const fridgePriceLabel = document.getElementById(
  "fridge price",
)! as HTMLElement;
const crackerCountLabel = document.getElementById(
  "cracker count",
)! as HTMLElement;
const crackerPriceLabel = document.getElementById(
  "cracker price",
)! as HTMLElement;
const upgradeWater = document.getElementById(
  "upgradeWater",
)! as HTMLButtonElement;
const upgradeFridge = document.getElementById(
  "upgradeFridge",
)! as HTMLButtonElement;
const upgradeCracker = document.getElementById(
  "upgradeCracker",
)! as HTMLButtonElement;
upgradeWater.disabled = true;
upgradeFridge.disabled = true;
upgradeCracker.disabled = true;

let lastFrame = performance.now();

function everySec(perf: number) {
  console.log(growthRate);
  const currTime = perf;
  const deltaTime = currTime - lastFrame;
  lastFrame = currTime;
  const fps = 1000 / deltaTime;

  desire = desire + (growthRate / fps);
  counter.textContent = desire.toFixed(2);

  if (desire >= waterPrice) upgradeWater.disabled = false;
  else upgradeWater.disabled = true;
  if (desire >= fridgePrice) upgradeFridge.disabled = false;
  else upgradeFridge.disabled = true;
  if (desire >= crackerPrice) upgradeCracker.disabled = false;
  else upgradeCracker.disabled = true;

  requestAnimationFrame(everySec);
}
requestAnimationFrame(everySec);

clicker.addEventListener("click", () => {
  desire = desire + 1;
  counter.textContent = desire.toFixed(2);
  breaths += 1;
  breathCountLabel.textContent = breaths.toFixed(2);
});

upgradeWater.addEventListener("click", () => {
  growthRate = growthRate + .1;
  growth.textContent = growthRate.toFixed(2);
  desire = desire - 10;
  counter.textContent = desire.toFixed(2);
  waterCount += 1;
  waterPrice *= 1.15;
  waterCountLabel.textContent = waterCount.toFixed(2);
  waterPriceLabel.textContent = waterPrice.toFixed(2);
});

upgradeFridge.addEventListener("click", () => {
  growthRate = growthRate + 2;
  growth.textContent = growthRate.toFixed(2);
  desire = desire - 100;
  counter.textContent = desire.toFixed(2);
  fridgeCount += 1;
  fridgePrice *= 1.15;
  fridgeCountLabel.textContent = fridgeCount.toFixed(2);
  fridgePriceLabel.textContent = fridgePrice.toFixed(2);
});

upgradeCracker.addEventListener("click", () => {
  growthRate = growthRate + 50;
  growth.textContent = growthRate.toFixed(2);
  desire = desire - 1000;
  counter.textContent = desire.toFixed(2);
  crackerCount += 1;
  crackerPrice *= 1.15;
  crackerCountLabel.textContent = crackerCount.toFixed(2);
  crackerPriceLabel.textContent = crackerPrice.toFixed(2);
});
