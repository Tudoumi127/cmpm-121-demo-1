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

let autoAddMoai = 0;
let isRunning = false;

const autoGenRate = document.createElement("div");
autoGenRate.innerHTML = `${autoAddMoai.toFixed(2)} moais/sec`;
app.append(autoGenRate);

//thank you to Katrina for help with formatting

//upgrade

interface UpgradeData {
  name: string;             // Name of the upgrade
  cost: number;             // Starting cost for the upgrade
  rate: number;             // Automatic generation rate
  multiplier: number;       // Cost multiplier for each level-up
  button: HTMLButtonElement; // DOM element for this upgrade's button
  level: number;
}


const upgradeButtons: UpgradeData[] = [];

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
const showUpgradeLevel = document.createElement("div");
showUpgradeLevels();
app.appendChild(showUpgradeLevel);

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

function purchaseUpgrade(upgrade: UpgradeData) {
  if (counter < upgrade.cost) {
    return;
  }

  addCounter(-upgrade.cost);
  autoAddMoai += upgrade.rate;
  autoGenRate.innerHTML = `${autoAddMoai.toFixed(2)} moais/sec`;

  levelUpgrade(upgrade);

  if (!isRunning) {
    isRunning = true;
    requestAnimationFrame(intervalCounter);
  }
}

function makeUpgrade(data: Omit<UpgradeData, 'button' | 'level'>): void {
  // Create the button dynamically
  const button = document.createElement("button");
  button.innerHTML = `${data.name} (${data.rate}/s) <br>${data.cost.toFixed(2)} moais`;

  // Construct the full Upgrade object
  const upgrade: UpgradeData = {
      ...data,      // Use all fields from the input data
      button: button, // Add the dynamically created button
      level: 0,     // Initialize the level to 0
  };

  upgradeButtons.push(upgrade);
  button.addEventListener("click", () => purchaseUpgrade(upgrade));
  app.appendChild(button);
  disableButton(button);
}

const upgradeData: Omit<UpgradeData, 'button' | 'level'>[] = [
  { name: "Polish", cost: 5, rate: 0.5, multiplier: 1.5 },
  { name: "Mineral Enhance", cost: 15, rate: 1.5, multiplier: 1.7 },
  { name: "Clear Coat", cost: 30, rate: 3.0, multiplier: 1.9 },
  { name: "Bejewel", cost: 50, rate: 4.5, multiplier: 2.1 },
  { name: "Make into Jewelry", cost: 100, rate: 6.0, multiplier: 2.5 },
];

// Dynamically create upgrades
upgradeData.forEach(makeUpgrade);

let previousFrame = 0;
let elapsedTime = 0;

function intervalCounter(timestamp: DOMHighResTimeStamp): void {
  if (previousFrame == 0) {
    previousFrame = timestamp;
  }

  // Calculate elapsed time since the last frame in seconds
  elapsedTime = (timestamp - previousFrame); // Convert ms to seconds
  previousFrame = timestamp;

  if (elapsedTime > 0) {
    const fps = 1000 / elapsedTime;
    addCounter(autoAddMoai / fps);
  }

  // Schedule the next animation frame
  requestAnimationFrame(intervalCounter);
}

function showUpgradeLevels() {
  showUpgradeLevel.textContent = "";
  for (const upgrade of upgradeButtons) {
    showUpgradeLevel.textContent += ` ${upgrade.level} ${upgrade.name} `;
  }
}

function levelUpgrade(upgrade: UpgradeData) {
  upgrade.level++;
  //fixed logic for step 8 commit
  upgrade.cost = upgrade.cost * upgrade.multiplier;

  upgrade.button.innerHTML = `${upgrade.name} (${upgrade.rate}/s) <br>--${upgrade.cost.toFixed(2)} moais--`;

  if (counter < upgrade.cost) {
    disableButton(upgrade.button);
  }

  showUpgradeLevels();
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
