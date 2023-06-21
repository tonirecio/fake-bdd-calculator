const setDisplay = (value) => {
  display.innerHTML = value
}
// Limpia la pantalla
const clean = () => {
  setDisplay('0')
}
// Cambia el signo
const negate = () => {
  const currentValue = display.innerHTML
  setDisplay(parseFloat(currentValue) * -1)
}

const handleButtonPress = (buttonValue) => {
  const currentValue = display.innerHTML

  if (buttonValue === 'C' || buttonValue === 'Escape') {
    clean()
  } else if (buttonValue === ',' && !currentValue.includes(',')) {
    setDisplay(currentValue + buttonValue)
  } else if (buttonValue === '+-') {
    negate()
  } else if (currentValue === '0') {
    setDisplay(buttonValue)
  } else {
    setDisplay(currentValue + buttonValue)
  }
}

const handleKeyPress = (event) => {
  const key = event.key
  const currentValue = display.innerHTML

  if (key === 'Escape') {
    clean()
  } else if (key === 'Control') {
    negate()
  } else if (key === ',') {
    if (!currentValue.includes(',')) {
      setDisplay(currentValue + ',')
    }
  } else if (/[0-9]/.test(key)) {
    setDisplay(currentValue === '0' ? key : currentValue + key)
  }
}

const display = document.querySelector('div[name="display"] span')

document.querySelectorAll('[data-testid]').forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent
    handleButtonPress(buttonValue)
  })
})

document.getElementsByName('clean')[0].addEventListener('click', clean)
document.getElementsByName('negate')[0].addEventListener('click', negate)

document.addEventListener('keydown', handleKeyPress)

// const reset = () => {
// setDisplay('0')
// }
