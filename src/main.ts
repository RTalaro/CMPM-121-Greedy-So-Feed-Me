import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

let age: number = 1;

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <div>Age: <span id = "age">${age}</span></div>
  <button id = "clicker">Happy Birthday!🎉</button>
`;

const button = document.getElementById("clicker")!;
const counter = document.getElementById("age")!;

button.addEventListener("click", () => {
  age = age + 1;
  counter.textContent = age.toString();
});

//const everySec: number = setInterval(() => {
//  age = age + 1;
//  counter.textContent = age.toString();
//  console.log(everySec); //provides ID of this timer to remove squiggly
//}, 1000);

let lastFrame = performance.now();

function everySec(perf: number) {
  const currTime = perf;
  const deltaTime = currTime - lastFrame;
  lastFrame = currTime;
  const fps = 1000 / deltaTime;

  age = age + 1 / fps;
  counter.textContent = age.toString();
  requestAnimationFrame(everySec);
}

requestAnimationFrame(everySec);
