import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "I am so Confused rn You Dont Even Know";
document.title = gameName;

let moais: number = 0;
let moaiUpgrades: number = 0;

const header = document.createElement("h1");
const button = document.createElement("button");
const purchase = document.createElement("button");
const division = document.createElement("div");
const upgrades = document.createElement("div");
let previousTime = 0;

button.textContent = "🗿";
purchase.textContent = "Maimaimai (costs 10 moais)";

/*
setInterval(() => {
  moais++;
  //console.log(`Counter is now: ${moais}`);
  division.textContent = `${moais} moais`;
}, 1000);
*/

function updateButton() {
  purchase.disabled = moais < 10;
}

function update(timestamp: number) {
  // Calculate the time difference since the last recorded time
  const elapsed = timestamp - previousTime;

  if (elapsed >= 1000 / moaiUpgrades) {
    moais++;
    division.textContent = `${moais} moais`;
    updateButton();

    // Reset the previousTime to the current timestamp
    previousTime = timestamp;
  }

  // Continue the animation loop
  requestAnimationFrame(update);
}

button.addEventListener("click", () => {
  //console.log('aaaaaaaaa');
  moais++;
  division.textContent = `${moais} moais`;
  updateButton();
});

purchase.addEventListener("click", () => {
  moais -= 10;
  updateButton();
  moaiUpgrades++;
  if (moaiUpgrades >= 1) {
    requestAnimationFrame(update);
  }
  division.textContent = `${moais} moais`;
  upgrades.textContent = `${moaiUpgrades} moai upgrade(s)`;
});

header.innerHTML = gameName;

updateButton();
app.append(header);
app.append(button);
app.append(purchase);
app.append(division);
app.append(upgrades);
