import "./style.css";

let desire: number = 0.0;
let growthRate = 0;

interface Purchase {
  label: string;
  price: number;
  count: number;
  rate: number;
}

const allPurchases: Purchase[] = [
  { label: "breath", price: -1, count: 0, rate: 0 }, // price is -1 in order to add 1 to desire
  { label: "water", price: 10, count: 0, rate: 0.1 },
  { label: "fridge", price: 100, count: 0, rate: 2.0 },
  { label: "cracker", price: 1000, count: 0, rate: 50.0 },
];

document.body.innerHTML = `
  <div><span id="desire">${desire}</span> Foods in mind...</div>
  <div>Gluttonous Desire Grows at <span id="growth">${growthRate}</span> Foods/sec</div>
  <button id="breath button">Breathe 💨</button>
  <div>Took <span id="breath count">${allPurchases[0].count}</span> Breaths</div>
  <div><button id="water button">Drink Water</button> to satiate Desire by <span id="water price">${allPurchases[1].price}</span> Foods</div>
  <div>Downed <span id="water count">${allPurchases[1].count}</span> Bottles of Water</div>
  <div><button id="fridge button">Check the Fridge</button> to satiate Desire by <span id="fridge price">${allPurchases[2].price}</span> Foods</div>
  <div>Checked Fridge <span id="fridge count">${allPurchases[2].count}</span> Times</div>
  <div><button id="cracker button">Eat a Cracker</button> to satiate Desire by <span id="cracker price">${allPurchases[3].price}</span> Foods</div>
  <div>Eaten <span id="cracker count">${allPurchases[3].count}</span> Crackers</div>
`;

const counter = document.getElementById("desire")! as HTMLElement;
const growth = document.getElementById("growth")! as HTMLElement;

let lastFrame = performance.now();

function everySec(perf: number) {
  console.log(growthRate);
  const currTime = perf;
  const deltaTime = currTime - lastFrame;
  lastFrame = currTime;
  const fps = 1000 / deltaTime;

  desire = desire + (growthRate / fps);
  counter.textContent = desire.toFixed(2);

  for (const purchase of allPurchases) {
    const button = document.getElementById(purchase.label + " button")! as HTMLButtonElement;
    if (desire >= purchase.price) {
      button.disabled = false;
    }
    else button.disabled = true;
  }

  requestAnimationFrame(everySec);
}
requestAnimationFrame(everySec);

for (const purchase of allPurchases) {
  const button = document.getElementById(purchase.label + " button")! as HTMLButtonElement;
  const countLabel = document.getElementById(purchase.label + " count")! as HTMLElement;
  const priceLabel = document.getElementById(purchase.label + " price")! as HTMLElement;
  button.addEventListener("click", () => {
    desire -= purchase.price;
    counter.textContent = desire.toFixed(2);
    growthRate += purchase.rate;
    growth.textContent = growthRate.toFixed(2);
    purchase.count += 1;
    countLabel.textContent = purchase.count.toFixed(2);
    if (purchase.label != "breath") {
      purchase.price *= 1.15;
      priceLabel.textContent = purchase.price.toFixed(2);
    }
  });
}
