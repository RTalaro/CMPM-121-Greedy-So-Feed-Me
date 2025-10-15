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

let everySec = setInterval(() => {
  age = age + 1;
  counter.textContent = age.toString();
}, 1000);
