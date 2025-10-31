import "./style.css";

document.title = "Greedy So Feed Me :(";

let desire: number = 0.0;
let growthRate = 0;

interface Purchase {
  label: string;
  desc: string;
  price: number;
  count: number;
  rate: number;
}

const allPurchases: Purchase[] = [
  {
    label: "breath",
    desc: "To breathe is to hunger...",
    price: -1,
    count: 0,
    rate: 0,
  }, // price is -1 in order to add 1 to desire
  {
    label: "water",
    desc: "Maybe drinking water will help?",
    price: 10,
    count: 0,
    rate: 0.1,
  },
  {
    label: "fridge",
    desc: "Maybe there will be food in the fridge...",
    price: 100,
    count: 0,
    rate: 2.0,
  },
  {
    label: "cracker",
    desc: "Maybe eating a cracker would help?",
    price: 1000,
    count: 0,
    rate: 50.0,
  },
  {
    label: "recipe",
    desc: "Maybe reading some recipes will help...",
    price: 10000,
    count: 0,
    rate: 100.0,
  },
  {
    label: "video",
    desc: "Maybe watching cooking would help?",
    price: 100000,
    count: 0,
    rate: 500.0,
  },
];

function renderUI() {
  document.body.innerHTML = `
  <h2><span id="desire">${desire}</span> Foods in mind...</h2>
  <h2>Gluttonous Desire Grows at <span id="growth">${
    growthRate.toFixed(2)
  }</span> Foods/sec</h2>

  <h1>${allPurchases[0].desc}</h1>
  <button id="breath button">Breathe 💨</button>
  <div>Took <span id="breath count">${
    allPurchases[0].count
  }</span> Breaths</div>
    <p>
    <h1>${allPurchases[1].desc}</h1>
    <div><button id="water button">Drink Water 🥛</button> to satiate Desire by <span id="water price">${
    allPurchases[1].price
  }</span> Foods</div>
    <div>Downed <span id="water count">${
    allPurchases[1].count
  }</span> Bottles of Water</div>
    <p>
    <h1>${allPurchases[2].desc}</h1>
    <div><button id="fridge button">Check the Fridge 🧊</button> to satiate Desire by <span id="fridge price">${
    allPurchases[2].price
  }</span> Foods</div>
    <div>Checked Fridge <span id="fridge count">${
    allPurchases[2].count
  }</span> Times</div>
    <p>
    <h1>${allPurchases[3].desc}</h1>
    <div><button id="cracker button">Eat a Cracker 🍘</button> to satiate Desire by <span id="cracker price">${
    allPurchases[3].price
  }</span> Foods</div>
    <div>Eaten <span id="cracker count">${
    allPurchases[3].count
  }</span> Crackers</div>
    <p>
    <h1>${allPurchases[4].desc}</h1>
    <div><button id="recipe button">Read a Recipe Online 📖</button> to satiate Desire by <span id="recipe price">${
    allPurchases[4].price
  }</span> Foods</div>
    <div>Read <span id="recipe count">${
    allPurchases[4].count
  }</span> Recipes</div>
    <p>
    <h1>${allPurchases[5].desc}</h1>
    <div><button id="video button">Watch a Cooking Video ▶️</button> to satiate Desire by <span id="video price">${
    allPurchases[5].price
  }</span> Foods</div>
    <div>Watched <span id="video count">${
    allPurchases[5].count
  }</span> Videos</div>
  `;
}

renderUI();

const counter = document.getElementById("desire")! as HTMLElement;
const growth = document.getElementById("growth")! as HTMLElement;

let lastFrame = performance.now();

function everySec(perf: number) {
  const currTime = perf;
  const elapsedMillis = currTime - lastFrame;
  lastFrame = currTime;
  const estimatedFPS = 1000 / elapsedMillis;

  desire = desire + (growthRate / estimatedFPS);
  counter.textContent = desire.toFixed(2);

  for (const purchase of allPurchases) {
    const button = document.getElementById(
      purchase.label + " button",
    )! as HTMLButtonElement;
    if (desire >= purchase.price) {
      button.disabled = false;
    } else button.disabled = true;
  }

  requestAnimationFrame(everySec);
}
requestAnimationFrame(everySec);

for (const purchase of allPurchases) {
  const button = document.getElementById(
    purchase.label + " button",
  )! as HTMLButtonElement;
  const countLabel = document.getElementById(
    purchase.label + " count",
  )! as HTMLElement;
  const priceLabel = document.getElementById(
    purchase.label + " price",
  )! as HTMLElement;
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
