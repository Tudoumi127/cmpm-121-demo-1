import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

let width = document.documentElement.clientWidth;

const gameName = "Mm Rocks";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//thank you to Katrina for help with formatting

//step 9 thing for refactoring
interface Items {
  name: string;
  button: HTMLButtonElement;
  cost: number;
  level: number;
  auto: number;
}
const upgradeButtons: Items[] = [];

//button for the actual click thing
const moaiClick = document.createElement("button");
moaiClick.textContent = "🗿";

let counter = 0;
moaiClick.addEventListener("click", () => addCounter(1));
app.appendChild(moaiClick);

let autoAdd = 0;
let isRunning = false;

const curAuto = document.createElement("div");
curAuto.innerHTML = `${autoAdd.toFixed(2)} moais/sec`;
app.append(curAuto);

//auto counting
const automoaiClick = document.createElement("button");
automoaiClick.innerHTML = "Start appraising (0.1/s) <br>--10 moais--";

//upgrades
const rockPolishing = document.createElement("button");
makeUpgrade("Rock Polishing", rockPolishing, 10, 0.1);

const mineralEnhancement = document.createElement("button");
makeUpgrade("Mineral Enhancement", mineralEnhancement, 100, 2);

const clearCoat = document.createElement("button");
makeUpgrade("Clear Coat", clearCoat, 1000, 50);

const showLevel = document.createElement("div");
showLevels();
showLevel.style.position = "absolute";
app.appendChild(showLevel);
position();

//show counter
const showCounter = document.createElement("div");
showCounter.textContent = counter.toFixed(2) + " moais";
app.appendChild(showCounter);

position();

//functions--------------------------------------------------

function addCounter(x: number) {
  counter += x;
  showCounter.textContent = counter.toFixed(2) + " moais";

  for (const upgrade of upgradeButtons) {
    if (counter >= upgrade.cost) {
      enableButton(upgrade.button);
    }
  }
}

let previousFrame = 0;
let elapsedTime = 0;

function intervalCounter(timestamp: DOMHighResTimeStamp) {
  if (previousFrame == 0) {
    previousFrame = timestamp;
  }

  elapsedTime = timestamp - previousFrame;
  previousFrame = timestamp;

  if (elapsedTime > 0) {
    const fps = 1000 / elapsedTime;
    addCounter(autoAdd / fps);
  }
  requestAnimationFrame(intervalCounter);
}

setInterval(() => {
  console.log("second");
}, 1000);

function position() {
  rockPolishing.style.left = `${width / 2 - mineralEnhancement.offsetWidth / 2 - rockPolishing.offsetWidth}px`;
  mineralEnhancement.style.left = `${width / 2 - mineralEnhancement.offsetWidth / 2}px`;
  clearCoat.style.left = `${width / 2 + mineralEnhancement.offsetWidth / 2}px`;

  let rect = moaiClick.getBoundingClientRect();

  rockPolishing.style.top = `${rect.top + moaiClick.offsetHeight * 2.5}px`;
  mineralEnhancement.style.top = `${rect.top + moaiClick.offsetHeight * 2.5}px`;
  clearCoat.style.top = `${rect.top + moaiClick.offsetHeight * 2.5}px`;

  rect = rockPolishing.getBoundingClientRect();
  showLevel.style.top = `${width / 2 - showLevel.offsetWidth / 2}px`;
  showLevel.style.left = `${width / 2 - showLevel.offsetWidth / 2}px`;
}

window.addEventListener("resize", () => {
  width = document.documentElement.clientWidth;
  position();
});

function enableButton(button: HTMLButtonElement) {
  button.style.backgroundColor = "#7f7f7f";
  button.style.color = "#ffffff";
  button.style.cursor = "pointer";
}

function disableButton(button: HTMLButtonElement) {
  button.style.backgroundColor = "#d8d8d8";
  button.style.color = "#c2c2c2";
  button.style.cursor = "not-allowed";
}

function findUpgrade(button: HTMLButtonElement) {
  return upgradeButtons.find((upgrade) => upgrade.button === button);
}

function purchaseUpgrade(upgrade: Items) {
  if (counter < upgrade.cost) {
    return;
  }

  addCounter(-upgrade.cost);
  upgrade.level++;
  console.log(`Level upgraded to: ${upgrade.level}`);
  autoAdd += upgrade.auto;
  curAuto.innerHTML = `${autoAdd.toFixed(2)} moais/sec`;

  if (!isRunning) {
    isRunning = true;
    requestAnimationFrame(intervalCounter);
  }

  upgrade.cost *= upgrade.level * 1.15;
  //console.log(`Level upgraded to: ${upgrade.level}`);
  upgrade.button.innerHTML = `${upgrade.name} (${upgrade.auto.toFixed(2)}/s) <br>Costs ${upgrade.cost.toFixed(2)} moais`;

  if (counter < upgrade.cost) {
    disableButton(upgrade.button);
    showLevels();
    position();
  }
}

function showLevels() {
  for (const upgrade of upgradeButtons) {
    showLevel.textContent += `- ${upgrade.level} ${upgrade.name} - `;
  }
}

function makeUpgrade(
  name: string,
  button: HTMLButtonElement,
  cost: number,
  auto: number,
) {
  button.innerHTML = `${name} (${auto}/s) <br>Costs ${cost} moais`;

  upgradeButtons.push({
    name: name,
    button: button,
    cost: cost,
    level: 0,
    auto: auto,
  });
  const upgrade = findUpgrade(button);
  if (upgrade) {
    button.addEventListener("click", () => purchaseUpgrade(upgrade));
  }

  app.appendChild(button);
  button.style.position = "absolute";
  disableButton(button);
}
