// Game state
let money = 0;
let factories = 0;
let machines = 0;

// Get saved game state from local storage
const savedGame = localStorage.getItem("idleFactoryClickerSave");
if (savedGame) {
  const gameData = JSON.parse(savedGame);
  money = gameData.money;
  factories = gameData.factories;
  machines = gameData.machines;
}

// Update the game state on the screen
function updateGameState() {
  document.getElementById("money").textContent = money;
  document.getElementById("factories").innerHTML = "";
  for (let i = 0; i < factories; i++) {
    document.getElementById("factories").innerHTML += `<div class="factory">Factory ${i + 1}</div>`;
  }
  document.getElementById("machines").innerHTML = "";
  for (let i = 0; i < machines; i++) {
    document.getElementById("machines").innerHTML += `<div class="machine">Machine ${i + 1}</div>`;
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
    updateGameState();
  } else {
    alert("Not enough money to buy a machine!");
  }
}

// Function to save the game state to local storage
function saveGame() {
  const gameData = {
    money: money,
    factories: factories,
    machines: machines
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
    updateGameState();
    alert("Game loaded!");
  } else {
    alert("No saved game found!");
  }
}

// Initial update of the game state
updateGameState();
