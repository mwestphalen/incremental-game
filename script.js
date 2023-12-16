
//*** THE NUMBER: make this go up ***//
let number = 0;

//** Resources ***//

// # of packets collected per click
let clickIncrement = 1;

// Increase the counter by this much on each button click
let codeOptimizers = 0;
let codeOptimizerCost = 30;

// Increase amount of data that can be collected
let dataCompressors = 0;
let dataCompressorCost = 150;

// Automatically increment by this much every second
let aiCompanions = 0;
let aiCompanionCost = 500;

// Temporarily increase data collection rate
let overclockingCost = 1000;
let overclockingEnabled = false;
let overclockingTimer = 0;

// Fight agaisnt threats that may take data packets
let firewallShields = 0;
let firewallShieldsCost = 800;

// Automatically increment by this much every second
let quantumBits = 0;
let quantumBitsCost = 2500;

// Prerequisite for introducing new upgrade and features
let hackersEnabled = false;
let numOfAttacks = 0;
let attackingTimer = 0;

// Final Upgrade tracker (1,000,000,000 packets needed)
let finalUpgrade = false;
let gameover = false;

//*** Achievement object ***//
achievements = { bitByBit: false, kiloByteKid: false, megaByteMarvel: false, gigaByteGuru: false, teraByteTitan: false, dataPioneer: false, firstScript: false, crunchingNumbers: false, mindsOfOurOwn: false, baptismByte: false, unbreachable: false, pushingLimits: false, quantumCommander: false, masterOfMatrix: false };


//*** Change function ***//
//
// Called by any action that changes the number
//
// amount: the amount to increment or decrement
function changeNumber(amount, increment) {
  // If data compressors were bought
  if (dataCompressors > 0 && increment) {
    amount += Math.round(dataCompressors * Math.pow(1.5, dataCompressors));
  }

  // If quantum bits have been deployed
  if (quantumBits > 0 && increment) {
    amount *= 1.5;
  }
  // If overclocking option is ON, double data packets collected
  if (overclockingEnabled && increment) {
    amount *= 2;
  }

  number += amount;

  // Update the number field
  updateElementValue("number", formatNumber(number));
  //document.getElementById("number").innerHTML = formatNumber(number);
}

//*** Number Format function ***//
// Cookie Clicker's code had a way of doing this but it was waaaaay
// too complicated and old legacy code. Resulted to ChatGPT to help
function formatNumber(num) {
  if (Math.abs(num) >= 1e24) { // Septillion
    return (num / 1e24).toLocaleString('en-US') + ' septillion';
  } else if (Math.abs(num) >= 1e21) {  // Sextillion
    return (num / 1e21).toLocaleString('en-US') + ' sextillion';
  } else if (Math.abs(num) >= 1e18) {  // Quintillion
    return (num / 1e18).toLocaleString('en-US') + ' quintillion';
  } else if (Math.abs(num) >= 1e15) {  // Quadrillion
    return (num / 1e15).toLocaleString('en-US') + ' quadrillion';
  } else if (Math.abs(num) >= 1e12) {  // Trillion
    return (num / 1e12).toLocaleString('en-US') + ' trillion';
  } else if (Math.abs(num) >= 1e9) {  // Billion
    return (num / 1e9).toLocaleString('en-US') + ' billion';
  } else if (Math.abs(num) >= 1e6) {  // Million
    return (num / 1e6).toLocaleString('en-US') + ' million';
  } else {
    return num.toLocaleString('en-US');  // For numbers less than a million
  }
}

//*** Upgrade purchase functions ***//
//
// Each of these is triggered by clicking on its relevant
// name in the Upgrades menu

//*** Helper function to update upgrade UI components **///
function updateElementValue(elementId, value) {
  document.getElementById(elementId).innerHTML = formatNumber(value);
}

//*** Buy upgrade helper function ***//
function buyUpgrade(costOfUpgrade, costFactor, costElementId, valueOfUpgrade, valueIncrementFunction, valueElementId) {
  // Check that the number is big enough to purchase upgrade
  if (number < costOfUpgrade) {
    return;
  }

  // Reduce the number to pay for the upgrade
  changeNumber(-costOfUpgrade, false);

  // Update # of acquired/purchased upgrade
  valueOfUpgrade = valueIncrementFunction(valueOfUpgrade);
  updateElementValue(valueElementId, valueOfUpgrade);
  switch (valueElementId) {
    case "num-code-optimizers":
      codeOptimizers = valueOfUpgrade;
      break;
    case "num-data-compressors":
      dataCompressors = valueOfUpgrade;
      break;
    case "num-ai-companions":
      aiCompanions = valueOfUpgrade;
      break;
    case "num-firewall-shields":
      firewallShields = valueOfUpgrade;
      break;
    case "num-quantum-bits":
      quantumBits = valueOfUpgrade;
  }

  // Update cost of upgrade
  costOfUpgrade = Math.round(Math.pow(costOfUpgrade, costFactor));
  updateElementValue(costElementId, costOfUpgrade);
  switch (costElementId) {
    case "optimize-code-cost":
      codeOptimizerCost = costOfUpgrade;
      break;
    case "data-compressor-cost":
      dataCompressorCost = costOfUpgrade;
      break;
    case "ai-companion-cost":
      aiCompanionCost = costOfUpgrade;
      break;
    case "firewall_shields-cost":
      firewallShieldsCost = costOfUpgrade;
    case "quantum-bits-cost":
      quantumBitsCost = costOfUpgrade;
      break;
  }
}

//*** Increase packets collected per click with a code optimizer ***//
function buyCodeOptimizer() {
  // Add upgrade
  clickIncrement = Math.round(1.5 * Math.pow(1.5, codeOptimizers)); // exponential growth

  // Update UI components (cost, value, etc)
  buyUpgrade(codeOptimizerCost,
    1.1,
    "optimize-code-cost",
    codeOptimizers,
    (value) => value + 1,
    "num-code-optimizers");
}

//*** Increase value of each data packet collected by enhancing storage efficiency ***//
function buyDataCompressor() {
  // Update UI components (cost, value, etc)
  buyUpgrade(dataCompressorCost,
    1.1,
    "data-compressor-cost",
    dataCompressors,
    (value) => value + 1,
    "num-data-compressors");
}

//*** Automate data collection per second ***//
function buyAICompanions() {
  buyUpgrade(aiCompanionCost,
    1.1,
    "ai-companion-cost",
    aiCompanions,
    (value) => value + 1,
    "num-ai-companions");
}

//*** Fight against threats that may take away data packets
function buyFirewall() {
  buyUpgrade(firewallShieldsCost,
    1.1,
    "firewall-shields-cost",
    firewallShields,
    (value) => value + 1,
    "num-firewall-shields");
}

/*** Increase data packet collection rate temporarily ***/
function buyOverclock() {
  if (!overclockingEnabled) {
    // Update UI
    overclockingEnabled = true;
    document.getElementById("overclock-option").innerHTML = "ON";
    document.getElementById("upgrade4").classList.remove("can-purchase");
    document.getElementById("upgrade4").classList.add("greyed-out");

    // Update cost
    overclockingCost = Math.round(Math.pow(overclockingCost, 1.1));
    updateElementValue("overclocking-cost", overclockingCost);
  } else {
    return;
  }
}

/*** Increase data packet collecion rate ***/
function buyQuantumBits() {
  buyUpgrade(quantumBitsCost,
    1.1,
    "quantum-bits-cost",
    quantumBits,
    (value) => value + 1,
    "num-quantum-bits");
}

/*** Final Upgrade ***/
function buyFinalUpgrade() {
  // Stop window.setInterval
  gameover = true;

  // Tell user they won
  showFinalAlert();

  // Hide other upgrades
  document.getElementById("all-upgrades").classList.remove("can-purchase");
  document.getElementById("all-upgrades").classList.add("hidden");

  // Set new background
  document.body.style.backgroundImage = "url('images/gameover.png')";
}

/*** Introduce Final Upgrade ***/
function introduceFinalUpgrade() {
  document.getElementById("upgrade7").classList.remove("hidden");
  document.getElementById("upgrade7").classList.add("can-purchase");
}

/*** Unlock Firewall + Introduce hackers ***/
function introduceHackers() {
  // Update UI
  document.getElementById("upgrade5").classList.remove("hidden");
  document.getElementById("upgrade5").classList.add("can-purchase");
  document.getElementById("firewall").classList.remove("hidden");

  // Throw first attack 
  numOfAttacks++;
}

/*** Throw hacker attacks ***/
function throwAttack() {
  // Ability to defend agaisnt them if Firewall shields were bought
  if (firewallShields == 0) {
    // Decrease data packets
    number -= Math.round(1.5 * Math.pow(1.5, numOfAttacks * 0.08333)); // exponential growth
  }

  numOfAttacks -= firewallShields * 0.5;
  // Decrease data packets
  number -= Math.round(1.5 * Math.pow(1.5, numOfAttacks * 0.08333)); // exponential growth

}

//*** Check achievements ***//
//
// Runs every cycle and posts any new achievements to the log
function checkAchievements() {
  // Collect 100 data packets
  if (number >= 100 && !achievements.bitByBit) {
    achievements.bitByBit = true;

    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Bit by Bit</b>: Collect your first 100 data packets.";
  }
  // Collect 1,000 data packets
  if (number >= 1000 && !achievements.kiloByteKid) {
    achievements.kiloByteKid = true;

    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Kilobyte Kid</b>: Accumulate 1,000 data packets.";
  }
  // Collect 100,000 data packets
  if (number >= 100000 && !achievements.megaByteMarvel) {
    achievements.megaByteMarvel = true;

    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Megabyte Marvel</b>: Gather 100,000 data packets.";
  }
  // Collect 1,000,000 data packets
  if (number >= 1000000 && !achievements.gigaByteGuru) {
    achievements.gigaByteGuru = true;

    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Gigabyte Guru</b>: Amass 1,000,000 data packets.";
  }

  // Collect 1 billion data packets
  if (number >= 1000000000 && !achievements.teraByteTitan) {
    achievements.teraByteTitan = true;

    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Terabyte Titan</b>: Reach 1 billion data packets.";
  }

  // Collect +1 billion data packets
  if (number > 1000000005 && !achievements.dataPioneer) {
    achievements.dataPioneer = true;

    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Data Pioneer</b>: Surpass 1 billion data packets.";
  }

  // Buy first upgrade
  if (codeOptimizers >= 1 && !achievements.firstScript) {
    achievements.firstScript = true;

    document.getElementById("achievements").innerHTML +=
      "<br/> <b>First Script</b>: For evolving beyond the basic level.";
  }

  // Buy second upgrade
  if (dataCompressors >= 1 && !achievements.crunchingNumbers) {
    achievements.crunchingNumbers = true;

    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Crunching the Numbers</b>: Making more out of less in the digital realm.";
  }

  // Buy third upgrade
  if (dataCompressors >= 1 && !achievements.mindsOfOurOwn) {
    achievements.mindsOfOurOwn = true;

    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Minds of Our Own</b>: From mere lines of code to sentient thought, you've crafted an AI marvel.";
  }

  // Buy fourth upgrade
  if (overclockingEnabled && !achievements.pushingLimits) {
    achievements.pushingLimits = true;

    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Pushing the Limits</b>: Some see boundaries; you see challenges. Your system can run at unprecedented speeds.";
  }

  // Buy fifth upgrade
  if (numOfAttacks > 0 && !achievements.baptismByte) {
    achievements.baptismByte = true;

    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Baptism Byte</b>: You've faced your first intrusion, a rite of passage in the cyber realm.";
  }

  // Buy sixth upgrade
  if (firewallShields >= 1 && !achievements.unbreachable) {
    achievements.unbreachable = true;

    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Unbreachable</b>: With defenses like yours, threats are mere illusions against the fortress you've built.";
  }

  // Buy seventh upgrade
  if (quantumBits >= 1 && !achievements.quantumCommander) {
    achievements.quantumCommander = true;

    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Quantum Commander</b>:  In the realm of possibilities, you've harnessed the power of both the 'here' and the 'there'.";
  }

  // Buy eighth upgrade
  if (gameover && !achievements.masterOfMatrix) {
    achievements.masterOfMatrix = true;

    document.getElementById("achievements").innerHTML +=
      "<br/> <b>Master of the Matrix</b>: Conquer the digital realm and reach the endgame scenario ";
  }

}

//*** Update Upgrades (greyed out -> available) ***//
// Note: Too much overhead? Probably a better way to do this? 
function updateUpgrades() {
  document.querySelectorAll(".upgrade-block").forEach(upgrade => {
    let upgradeCost = parseInt(upgrade.querySelector('[id$="-cost"]').textContent);
    if (number >= upgradeCost) { // If user has enough money
      if (upgrade.id === "upgrade4" && overclockingEnabled) {
        // Do nothing if overclock is on... could be better but this will do for now
      } else {
        upgrade.classList.remove("greyed-out");
        upgrade.classList.add("can-purchase");
      }
    } else {
      upgrade.classList.remove("can-purchase"); // If user doesn't have enough money
      upgrade.classList.add("greyed-out");
    }
  })
}

//*** Custom Alert functions ***/
function showHackerAlert() {
  document.getElementById('hackerAlert').style.display = 'flex';
}

function closeHackerAlert() {
  document.getElementById('hackerAlert').style.display = 'none';
}

function showFinalAlert() {
  document.getElementById('finalAlert').style.display = 'flex';
}

function closeFinalAlert() {
  document.getElementById('finalAlert').style.display = 'none';
}

//*** Main loop ***//
//
// Function runs every 500 ms
let game = window.setInterval(function() {
  // Update number count (score)
  updateElementValue("number", formatNumber(number));

  // "Unlock" buyable upgrades
  updateUpgrades();

  // If AI companions are on
  if (aiCompanions > 0) {
    changeNumber(aiCompanions, true);
  }

  // If overclock has been turned on, start its timer for 6 seconds
  if (overclockingEnabled) {
    overclockingTimer += 1;

    if (overclockingTimer >= 12) {
      overclockingTimer = 0;
      overclockingEnabled = false;
      document.getElementById("overclock-option").innerHTML = "OFF";
      document.getElementById("upgrade4").classList.add("can-purchase");
    }
  }

  // Introduce hackers/attacks/virus
  if (number >= 1500 && !hackersEnabled) {
    hackersEnabled = true;
    introduceHackers();
    showHackerAlert();
  }

  // Throw attacks with some frequency
  if (hackersEnabled) { attackingTimer++; }
  // If 240 intervals (2 min) have passed, attack for 6 seconds
  if ((attackingTimer % 240) >= 1 && (attackingTimer % 240) <= 12) {
    throwAttack();            // Throw attack
    numOfAttacks++;   // Increase # of attacks recorded
  }

  // Show Final Upgrade
  if (number >= 1000000000 && !finalUpgrade) {
    finalUpgrade = true;
    introduceFinalUpgrade();
  }

  // Update Achievements
  checkAchievements();

  // Final Upgrade was bought (end game)
  if (gameover) {
    // Update number
    updateElementValue("number", "Infinite");
    // Stop interval
    clearInterval(game);
  }
}, 500);
