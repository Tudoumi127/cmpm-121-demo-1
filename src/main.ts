import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "I am so confused rn you dont even know";
document.title = gameName;

const header = document.createElement("h1");
const button = document.createElement("button");

button.textContent = "🗿";

header.innerHTML = gameName;
app.append(header);
app.append(button);
