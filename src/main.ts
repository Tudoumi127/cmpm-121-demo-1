import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "I am so confused rn you dont even know";
document.title = gameName;

let moais: number = 0;

const header = document.createElement("h1");
const button = document.createElement("button");
const division = document.createElement("div");

button.textContent = "🗿";

setInterval(() => {
  moais++;
  //console.log(`Counter is now: ${moais}`);
  division.textContent = `${moais} moais`;
}, 1000);

button.addEventListener("click", () => {
  //console.log('aaaaaaaaa');
  moais++;
  division.textContent = `${moais} moais`;
});

header.innerHTML = gameName;

app.append(header);
app.append(button);
app.append(division);
