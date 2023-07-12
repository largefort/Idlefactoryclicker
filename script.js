// Get elements
const moneyElem = document.getElementById("money");
const factoriesElem = document.getElementById("factories");
const machinesElem = document.getElementById("machines");
const clickBtn = document.getElementById("clickBtn");
const buyFactoryBtn = document.getElementById("buyFactoryBtn");
const buyMachineBtn = document.getElementById("buyMachineBtn");

// Game state variables
let money = 0;
let factories = 0;
let machines = 0;

// Update the display
function updateDisplay() {
  moneyElem.textContent = money;
  factoriesElem.textContent = factories;
  machinesElem.textContent = machines;

  // Disable buttons if not enough money
  buyFactoryBtn.disabled = money < 100;
  buyMachineBtn.disabled = money < 10;
}

// Produce money when the click button is clicked
function produce() {
  money += 1;
  updateDisplay();

  // Create dollar effect element
  const dollar = document.createElement('span');
  dollar.className = 'dollar';
  dollar.textContent = '$';
  document.body.appendChild(dollar);

  // Remove the dollar effect element after the animation ends
  setTimeout(() => {
    dollar.remove();
  }, 1000);
}

// Automate factories and machines
function automateProduction() {
  setInterval(() => {
    money += factories * 10;
    money += machines * 1;
    updateDisplay();
  }, 1000);
}

// Buy a factory
function buyFactory() {
  if (money >= 100) {
    money -= 100;
    factories += 1;
    updateDisplay();
  }
}

// Buy a machine
function buyMachine() {
  if (money >= 10) {
    money -= 10;
    machines += 1;
    updateDisplay();
  }
}

// Save game progress to local storage
function saveGame() {
  const saveData = {
    money: money,
    factories: factories,
    machines: machines
  };
  localStorage.setItem("idleFactorySave", JSON.stringify(saveData));
}

// Load game progress from local storage
function loadGame() {
  const saveData = JSON.parse(localStorage.getItem("idleFactorySave"));
  if (saveData) {
    money = saveData.money;
    factories = saveData.factories;
    machines = saveData.machines;
    updateDisplay();
  }
}

// Event listeners for save and load buttons
window.addEventListener("beforeunload", saveGame);
window.addEventListener("load", loadGame);

// Start automating production
automateProduction();
