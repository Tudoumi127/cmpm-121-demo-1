import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "I am so confused rn you dont even know";
document.title = gameName;

let moais: number = 0;

const header = document.createElement("h1");
const button = document.createElement("button");
const division = document.createElement("div");
let previousTime = 0;

button.textContent = "🗿";

/*
setInterval(() => {
  moais++;
  //console.log(`Counter is now: ${moais}`);
  division.textContent = `${moais} moais`;
}, 1000);
*/

function update(timestamp: number) {
  // Calculate the time difference since the last recorded time
  const elapsed = timestamp - previousTime;

  if (elapsed >= 1000) {
    moais++;
    division.textContent = `${moais} moais`;

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
});

header.innerHTML = gameName;

app.append(header);
app.append(button);
app.append(division);
requestAnimationFrame(update);
