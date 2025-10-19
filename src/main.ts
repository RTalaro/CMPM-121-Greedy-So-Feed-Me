import "./style.css";

let desire: number = 1;
let growthRate = 0;
let breaths = 0;
let upgradeACount = 0;
let upgradeBCount = 0;
let upgradeCCount = 0;

document.body.innerHTML = `
  <div>Gluttonous Desire: <span id = "desire">${desire}</span></div>
  <div>Hunger Grows at <span id = "growth">${growthRate} units/sec</span></div>
  <button id = "clicker">Breathe 💨</button>
  <div>Took <span id = "breath count">${breaths}</span> Breaths</div>
  <div><button id = "upgradeDrinkWater">Drink Water</button></div>
  <div>Downed <span id = "water count">${upgradeACount}</span> Bottles of Water</div>
  <div><button id = "upgradeCheckFridge">Check the Fridge</button></div>
  <div>Fridge Checked <span id = "fridge count">${upgradeBCount}</span> Times</div>
  <div><button id = "upgradeEatCracker">Eat a Cracker</button></div>
  <div>Eaten <span id = "cracker count">${upgradeCCount}</span> Crackers</div>
`;

const counter = document.getElementById("desire")! as HTMLElement;
const clicker = document.getElementById("clicker")! as HTMLButtonElement;
const breathCount = document.getElementById("breath count")! as HTMLElement;
const waterCount = document.getElementById("water count")! as HTMLElement;
const fridgeCount = document.getElementById("fridge count")! as HTMLElement;
const crackerCount = document.getElementById("cracker count")! as HTMLElement;
const upgradeA = document.getElementById(
  "upgradeDrinkWater",
)! as HTMLButtonElement;
const upgradeB = document.getElementById(
  "upgradeCheckFridge",
)! as HTMLButtonElement;
const upgradeC = document.getElementById(
  "upgradeEatCracker",
)! as HTMLButtonElement;
upgradeA.disabled = true;
upgradeB.disabled = true;
upgradeC.disabled = true;

let lastFrame = performance.now();

function everySec(perf: number) {
  console.log(growthRate);
  const currTime = perf;
  const deltaTime = currTime - lastFrame;
  lastFrame = currTime;
  const fps = 1000 / deltaTime;

  desire = desire + (growthRate / fps);
  counter.textContent = desire.toString();

  if (desire >= 10) upgradeA.disabled = false;
  else upgradeA.disabled = true;
  if (desire >= 100) upgradeB.disabled = false;
  else upgradeB.disabled = true;
  if (desire >= 1000) upgradeC.disabled = false;
  else upgradeC.disabled = true;

  requestAnimationFrame(everySec);
}
requestAnimationFrame(everySec);

clicker.addEventListener("click", () => {
  desire = desire + 1;
  counter.textContent = desire.toString();
  breaths += 1;
  breathCount.textContent = breaths.toString();
});

upgradeA.addEventListener("click", () => {
  growthRate = growthRate + .1;
  desire = desire - 10;
  counter.textContent = desire.toString();
  upgradeACount += 1;
  waterCount.textContent = upgradeACount.toString();
});

upgradeB.addEventListener("click", () => {
  growthRate = growthRate + 2;
  desire = desire - 100;
  counter.textContent = desire.toString();
  upgradeBCount += 1;
  fridgeCount.textContent = upgradeBCount.toString();
});

upgradeC.addEventListener("click", () => {
  growthRate = growthRate + 50;
  desire = desire - 1000;
  counter.textContent = desire.toString();
  upgradeCCount += 1;
  crackerCount.textContent = upgradeCCount.toString();
});
