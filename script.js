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

// Production rates
const factoryProductionRate = 1; // Money produced per second per factory
const machineProductionRate = 0.1; // Money produced per second per machine

// Update the display
const updateDisplay = () => {
  moneyElem.textContent = money.toFixed(2);
  factoriesElem.textContent = factories;
  machinesElem.textContent = machines;

  // Disable buttons if not enough money
  buyFactoryBtn.disabled = money < 100;
  buyMachineBtn.disabled = money < 10;
};

// Produce money when the click button is clicked
const produce = () => {
  money++;
  updateDisplay();
};

// Buy a factory
const buyFactory = () => {
  if (money >= 100) {
    money -= 100;
    factories++;
    updateDisplay();
  }
};

// Buy a machine
const buyMachine = () => {
  if (money >= 10) {
    money -= 10;
    machines++;
    updateDisplay();
  }
};

// Automate money production
const automateProduction = () => {
  const factoryIncome = factories * factoryProductionRate;
  const machineIncome = machines * machineProductionRate;
  money += factoryIncome + machineIncome;
  updateDisplay();
};

// Save game progress to local storage
const saveGame = () => {
  const saveData = { money, factories, machines };
  localStorage.setItem("idleFactorySave", JSON.stringify(saveData));
};

// Load game progress from local storage
const loadGame = () => {
  const saveData = JSON.parse(localStorage.getItem("idleFactorySave"));
  if (saveData) {
    money = saveData.money;
    factories = saveData.factories;
    machines = saveData.machines;
    updateDisplay();
  }
};

// Event listeners for button clicks
clickBtn.addEventListener("click", produce);
buyFactoryBtn.addEventListener("click", buyFactory);
buyMachineBtn.addEventListener("click", buyMachine);
window.addEventListener("beforeunload", saveGame);
window.addEventListener("load", loadGame);

// Automate money production every second
setInterval(automateProduction, 1000);

// Update the display initially
updateDisplay();
