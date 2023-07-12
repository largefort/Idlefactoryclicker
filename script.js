// Game state
let money = 0;
let factories = 0;
let machines = 0;
let factoryProduction = 1;
let machineProduction = 10;

// Factory and machine names
let factoryNames = [];
let machineNames = [];

// Get saved game state from local storage
const savedGame = localStorage.getItem("idleFactoryClickerSave");
if (savedGame) {
  const gameData = JSON.parse(savedGame);
  money = gameData.money;
  factories = gameData.factories;
  machines = gameData.machines;
  factoryNames = gameData.factoryNames || [];
  machineNames = gameData.machineNames || [];
}

// Update the game state on the screen
function updateGameState() {
  document.getElementById("money").textContent = money;
  document.getElementById("factories").innerHTML = "";
  for (let i = 0; i < factories; i++) {
    const factoryName = factoryNames[i] || `Factory ${i + 1}`;
    document.getElementById("factories").innerHTML += `<div class="factory">${factoryName}</div>`;
  }
  document.getElementById("machines").innerHTML = "";
  for (let i = 0; i < machines; i++) {
    const machineName = machineNames[i] || `Machine ${i + 1}`;
    document.getElementById("machines").innerHTML += `<div class="machine">${machineName}</div>`;
  }
}

// Function to earn money by clicking
function clickMoney() {
  money += 1;
  updateGameState();
}

// Function to buy a factory
function buyFactory() {
  if (money >= 10) {
    money -= 10;
    factories += 1;
    factoryNames.push(prompt("Enter a name for the factory:") || `Factory ${factories}`);
    updateGameState();
  } else {
    alert("Not enough money to buy a factory!");
  }
}

// Function to buy a machine
function buyMachine() {
  if (money >= 100) {
    money -= 100;
    machines += 1;
    machineNames.push(prompt("Enter a name for the machine:") || `Machine ${machines}`);
    updateGameState();
  } else {
    alert("Not enough money to buy a machine!");
  }
}

// Function to automate factory production
function automateFactory() {
  money += factories * factoryProduction;
  updateGameState();
}

// Function to automate machine production
function automateMachine() {
  money += machines * machineProduction;
  updateGameState();
}

// Function to save the game state to local storage
function saveGame() {
  const gameData = {
    money: money,
    factories: factories,
    machines: machines,
    factoryNames: factoryNames,
    machineNames: machineNames
  };
  localStorage.setItem("idleFactoryClickerSave", JSON.stringify(gameData));
  alert("Game saved!");
}

// Function to load the game state from local storage
function loadGame() {
  const savedGame = localStorage.getItem("idleFactoryClickerSave");
  if (savedGame) {
    const gameData = JSON.parse(savedGame);
    money = gameData.money;
    factories = gameData.factories;
    machines = gameData.machines;
    factoryNames = gameData.factoryNames || [];
    machineNames = gameData.machineNames || [];
    updateGameState();
    alert("Game loaded!");
  } else {
    alert("No saved game found!");
  }
}

// Set intervals for automated production
setInterval(automateFactory, 1000); // Automate factory production every 1 second
setInterval(automateMachine, 100); // Automate machine production every 100 milliseconds

// Initial update of the game state
updateGameState();
