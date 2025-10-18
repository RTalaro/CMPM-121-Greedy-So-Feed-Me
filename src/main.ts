import "./style.css";

let desire: number = 1;

document.body.innerHTML = `
  <div>Gluttonous Desire: <span id = "desire">${desire}</span></div>
  <button id = "clicker">Hungry... 🍴</button>
  <button id = "upgradeFriends">Eat a Fry</button>
`;

const counter = document.getElementById("desire")!;
const clicker = document.getElementById("clicker")! as HTMLButtonElement;
const upgradeFriends = document.getElementById(
  "upgradeFriends",
)! as HTMLButtonElement;
upgradeFriends.disabled = true;

let growthRate = 0;
let lastFrame = performance.now();

function everySec(perf: number) {
  const currTime = perf;
  const deltaTime = currTime - lastFrame;
  lastFrame = currTime;
  const fps = 1000 / deltaTime;

  desire = desire + growthRate / fps;
  counter.textContent = desire.toString();

  if (desire >= 10) upgradeFriends.disabled = false;
  else upgradeFriends.disabled = true;

  requestAnimationFrame(everySec);
}
requestAnimationFrame(everySec);

clicker.addEventListener("click", () => {
  desire = desire + 1;
  counter.textContent = desire.toString();
});

upgradeFriends.addEventListener("click", () => {
  growthRate = growthRate + 1;
  desire = desire - 10;
  counter.textContent = desire.toString();
});
