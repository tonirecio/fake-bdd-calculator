let value = '0'
const display = document.querySelector('div[name="display"] span')

const setDisplay = () => {
  display.innerHTML = value
}

const clean = () => {
  value = '0'
  setDisplay()
}

const negate = () => {
  if (value === '0' || value === '0,') {
    return
  }

  if (value.startsWith('-')) {
    value = value.slice(1)
  } else {
    value = `-${value}`// Añade delante el simbolo -
  }

  setDisplay()
}

const handleButtonPress = (buttonValue) => {
  switch (buttonValue) {
    case 'C':
    case 'Escape':
      clean()
      break
    case ',':
      if (!value.includes(',')) {
        value += buttonValue
        setDisplay()
      }
      break
    case '+-':
      if (value !== '0') {
        negate()
      }
      break
    default:
      if (/^[0-9]$/.test(buttonValue)) { // Si se presiona un boton del 0 al 9
        if (value === '0') {
          value = buttonValue
        } else {
          value += buttonValue
        }
        setDisplay()
      }
      break
  }
}

const handleKeyPress = (event) => {
  const key = event.key

  switch (key) {
    case 'Escape':
      clean()
      break
    case 'Control':
      if (value !== '0') {
        negate()
      }
      break
    case ',':
      if (!value.includes(',')) {
        value += key
        setDisplay()
      }
      break
    default:
      if (/^[0-9]$/.test(key)) { // Si se presiona una tecla del 0 al 9
        if (value === '0') {
          value = key
        } else {
          value += key
        }
        setDisplay()
        setDisplay()
      }
      break
  }
}

document.querySelectorAll('[data-testid]').forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent
    handleButtonPress(buttonValue)
  })
})

document.getElementsByName('clean')[0].addEventListener('click', clean)
document.getElementsByName('negate')[0].addEventListener('click', negate)

document.addEventListener('keydown', handleKeyPress)
