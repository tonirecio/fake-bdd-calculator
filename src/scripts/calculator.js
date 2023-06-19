const MAX_DIGITS_IN_DISPLAY = 10

// function setDisplay (value) { [...] }
const setDisplay = (value) => {
  display.innerHTML = value
}

const sayHello = () => {
  console.log('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
  // window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.')
}

const reset = () => {
  setDisplay(0)
}

const display = document.querySelector('div[name="display"] span')
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  sayHello()
})

console.log('Test')
const keypad = document.querySelectorAll('div[name="keypad"] button')
console.log('keypad')

keypad.forEach(element => {
  const buttonContent = parseInt(element.innerHTML)

  if (isNaN(buttonContent)) {
    if (element.getAttribute('name') === 'clean') {
      element.addEventListener('click', () => {
        setDisplay(0)
      })
    } else if (element.getAttribute('name') === 'negate') {
      element.addEventListener('click', () => {
        let displayNum = display.innerHTML.replace(',', '.')
        displayNum = -1 * displayNum
        displayNum = displayNum.toString().replace('.', ',')
        setDisplay(displayNum)
      })
    } else if (element.getAttribute('name') === 'point') {
      element.addEventListener('click', () => {
        const displayNum = display.innerHTML
        const pointType = element.innerHTML
        if (!displayNum.includes(pointType)) {
          setDisplay(displayNum + pointType)
        }
      })
    }
  } else {
    element.addEventListener('click', () => {
      let displayNum = display.innerHTML

      if (displayNum !== '0') {
        displayNum += buttonContent
      } else {
        displayNum = buttonContent
      }

      setDisplay(displayNum)
    })
  }
})

reset()
