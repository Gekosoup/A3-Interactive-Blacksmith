
// Assignment 3: Interactive Blacksmith — The Tiny Forge

// 1. Select the HTML elements
const $forge = document.getElementById('forge')
const $heatValue = document.getElementById('heat-value')
const $swordCount = document.getElementById('sword-count')
const $forgeStatus = document.getElementById('forge-status')
const $forgeImage = document.getElementById('forge-image')
const $actionMessage = document.getElementById('action-message')

const $heatInput = document.getElementById('heat-input')
const $addHeatButton = document.getElementById('add-heat-button')
const $makeSwordButton = document.getElementById('make-sword-button')
const $resetForgeButton = document.getElementById('reset-forge-button')

// 2. Create the game state
let heat = 20
let swords = 0

// 3. Get the forge status
function getForgeStatus(heatValue) {
  if (heatValue < 30) {
    return 'Too cold'
  } else if (heatValue < 70) {
    return 'Ready to forge'
  } else {
    return 'Roaring fire'
  }
}

// 4. Update the forge display
function updateForge() {
  $heatValue.textContent = heat
  $swordCount.textContent = swords

  const status = getForgeStatus(heat)
  $forgeStatus.textContent = status

  $forge.classList.remove('is-cold', 'is-ready', 'is-roaring')

  if (heat < 30) {
    $forge.classList.add('is-cold')
    $forgeImage.src = 'assets/forge-cold.svg'
    $forgeImage.alt = 'A stone forge with dark coals and no flames'
  } else if (heat < 70) {
    $forge.classList.add('is-ready')
    $forgeImage.src = 'assets/forge-ready.svg'
    $forgeImage.alt = 'A stone forge with glowing coals and a small flame'
  } else {
    $forge.classList.add('is-roaring')
    $forgeImage.src = 'assets/forge-roaring.svg'
    $forgeImage.alt = 'A stone forge with bright glowing coals and roaring flames'
  }
}

// 5. Reset the forge
function resetForge() {
  heat = 20
  swords = 0

  $heatInput.value = ''
  $actionMessage.textContent = ''

  updateForge()
}

// 6. Add heat
function heatForge(amount) {
  heat += amount

  if (heat > 100) {
    heat = 100
  }

  $actionMessage.textContent = `You added ${amount} heat.`

  updateForge()
}

// 7. Make a sword
function makeSword() {
  if (heat >= 30) {
    heat -= 30
    swords++

    $actionMessage.textContent =
      'Sword crafted! The blade is ready.'
  } else {
    $actionMessage.textContent =
      'Not enough heat. Add more heat to forge a sword.'
  }

  updateForge()
}

// 8. Add heat button
$addHeatButton.addEventListener('click', function() {
  const amountText = $heatInput.value
  const amount = Number(amountText)

  if (
    amountText === '' ||
    !Number.isFinite(amount) ||
    !Number.isInteger(amount) ||
    amount <= 0
  ) {
    $actionMessage.textContent =
      'Please enter a positive whole number.'
  } else {
    heatForge(amount)
    $heatInput.value = ''
  }
})

// 9. Make sword button
$makeSwordButton.addEventListener('click', function() {
  makeSword()
})

// 10. Reset button
$resetForgeButton.addEventListener('click', function() {
  resetForge()
})

// 11. Start the game
resetForge()
