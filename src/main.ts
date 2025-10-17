import "./style.css";

let age: number = 1;

document.body.innerHTML = `
  <div>Age: <span id = "age">${age}</span></div>
  <button id = "clicker">Gluttonous Desire 🍴</button>
  <button id = "upgradeFriends">Eat a Fry</button>
`;

const counter = document.getElementById("age")!;
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

  age = age + growthRate / fps;
  counter.textContent = age.toString();

  if (age >= 10) upgradeFriends.disabled = false;
  else upgradeFriends.disabled = true;

  requestAnimationFrame(everySec);
}
requestAnimationFrame(everySec);

clicker.addEventListener("click", () => {
  age = age + 1;
  counter.textContent = age.toString();
});

upgradeFriends.addEventListener("click", () => {
  growthRate = growthRate + 1;
  age = age - 10;
  counter.textContent = age.toString();
});
