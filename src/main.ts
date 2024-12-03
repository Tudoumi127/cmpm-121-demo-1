import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
app.style.backgroundColor = "#006666";

const gameName = "Mm Rocks";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//animate title
header.classList.add("bounceTitle");

let autoAdd = 0;
let isRunning = false;
let purchaseCost = 5;
let rate = 0.5;
const increase = 1.5;

const curAuto = document.createElement("div");
curAuto.innerHTML = `${autoAdd.toFixed(2)} moais/sec`;
app.append(curAuto);

//thank you to Katrina for help with formatting

//upgrades
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

//style change referenced from lorclau's code https://github.com/lorclau/cmpm-121-demo-1/blob/main/src/main.ts
moaiClick.style.cssText = `
position: absolute;
  top: 22%; 
  left: 50%;
  background: #ffff;
  transform: translate(-50%, -50%) scale(1.5);
  width: 90px; 
  height: 80px;
  border-radius: 20px; 
  font-size: 30px; 
  display: flex;        
  justify-content: center;   
`;

app.appendChild(moaiClick);

//show counter
const showCounter = document.createElement("div");
showCounter.textContent = counter.toFixed(2) + " moais";
showCounter.style.fontSize = "25px";
app.appendChild(showCounter);

//show upgrade levels
const showLevel = document.createElement("div");
showLevels();
app.appendChild(showLevel);

function addCounter(x: number) {
  counter += x;
  showCounter.textContent = counter.toFixed(2) + " moais";

  for (const upgrade of upgradeButtons) {
    if (counter >= upgrade.cost) {
      enableButton(upgrade.button);
    } else {
      disableButton(upgrade.button);
    }
  }
}

function purchaseUpgrade(upgrade: Items) {
  if (counter < upgrade.cost) {
    return;
  }

  addCounter(-upgrade.cost);
  autoAdd += upgrade.auto;
  curAuto.innerHTML = `${autoAdd.toFixed(2)} moais/sec`;

  levelUpgrade(upgrade);

  if (!isRunning) {
    isRunning = true;
    requestAnimationFrame(intervalCounter);
  }
}

function makeUpgrade(name: string) {
  const button = document.createElement("button");
  button.innerHTML = `${name} (${rate}/s) <br>${purchaseCost} moais`;

  const upgrade = {
    name: name,
    button: button,
    cost: purchaseCost,
    level: 0,
    auto: rate,
  };

  upgradeButtons.push(upgrade);
  button.addEventListener("click", () => purchaseUpgrade(upgrade));

  purchaseCost = purchaseCost * 2;
  rate = rate * 3;
  app.appendChild(button);
  disableButton(button);
}

//make upgrade buttons
makeUpgrade("Polish");
makeUpgrade("Mineral Enhance");
makeUpgrade("Clear Coat");
makeUpgrade("Bejewel");
makeUpgrade("Make into Jewelry");

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

function showLevels() {
  showLevel.textContent = "";
  for (const upgrade of upgradeButtons) {
    showLevel.textContent += ` ${upgrade.level} ${upgrade.name} `;
  }
}

function levelUpgrade(upgrade: Items) {
  upgrade.level++;
  //fixed logic for step 8 commit
  upgrade.cost += upgrade.cost * increase;

  upgrade.button.innerHTML = `${upgrade.name} (${upgrade.auto}/s) <br>--${upgrade.cost.toFixed(2)} moais--`;

  if (counter < upgrade.cost) {
    disableButton(upgrade.button);
  }

  showLevels();
}

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