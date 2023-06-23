const lenNumber = (number) => {
    let stringNumber = String(number)
    stringNumber = stringNumber.replace('-', '')
    stringNumber = stringNumber.replace('.', '')
    return (stringNumber.length)
}

/* TODO: millorar(treure el *1) */
const round = (number) => {
    const maxDecimals = MAX_DIGITS_IN_DISPLAY - lenNumber(Math.round(number))
    number = number.toFixed(maxDecimals) * 1
    return (number)
}

const setDisplay = (value) => {
    let displayValue
    if (value === 'ERROR') {
        displayValue = value
    } else {
        displayValue = String(value).replace('.', ',')
        if (actualNumberHasPoint && !displayValue.includes(',')) {
            displayValue = displayValue.concat(',')
        }
    }
    display.innerHTML = displayValue
}

const reset = () => {
    operator = null
    accumulatedNumber = null
    actualNumber = null
    actualNumberHasPoint = false
    setDisplay(0)
}

const addNum = (value) => {
    const number = actualNumber
    value = Number(value)
    let result
    if ((number === 0 && !actualNumberHasPoint) || actualNumber === null) {
        result = value
    } else {
        if (lenNumber(number) < MAX_DIGITS_IN_DISPLAY) {
            if (actualNumberHasPoint) {
                const numDecimals = lenNumber(number) - lenNumber(Math.round(number)) + 1
                result = number + (value * Math.pow(0.1, numDecimals))
            } else {
                result = number * 10 + value
            }
        } else {
            result = actualNumber
        }
    }
    actualNumber = round(result)
    setDisplay(actualNumber)
}

const negateNum = (number) => {
    number *= -1
    return (number)
}

const pressingNegate = () => {
    actualNumber = negateNum(actualNumber)
    setDisplay(actualNumber)
}

const pressingPoint = () => {
    if (!actualNumberHasPoint && lenNumber(actualNumber) < MAX_DIGITS_IN_DISPLAY) {
        actualNumberHasPoint = true
    }
    setDisplay(actualNumber)
}

const addOperation = (operation) => {
    if (operator !== null && actualNumber !== null) {
        accumulatedNumber = operate()
    } else if (operator === null && accumulatedNumber === null) {
        accumulatedNumber = actualNumber
    }
    operator = operation
    actualNumber = null
    actualNumberHasPoint = false
}

const operate = () => {
    if (actualNumber === null) {
        setDisplay('ERROR')
        return
    }
    const number = actualNumber
    let result
    switch (operator) {
        case '+':
            result = accumulatedNumber + number
            break
        case '-':
            result = accumulatedNumber - number
            break
        case '*':
            result = accumulatedNumber * number
            break
        case '/':
            if (number === 0) {
                result = 'ERROR'
            } else {
                result = accumulatedNumber / number
            }
            break
    }
    actualNumberHasPoint = false
    if (result === 'ERROR' || lenNumber(Math.round(result)) > MAX_DIGITS_IN_DISPLAY) {
        setDisplay('ERROR')
    } else {
        accumulatedNumber = round(result)
        setDisplay(accumulatedNumber)
    }
    actualNumber = null
    operator = null
    return (result)
}

const getEventsListenersButtons = () => {
    document.getElementsByName('zero')[0].addEventListener('click', () => addNum(0))
    document.getElementsByName('one')[0].addEventListener('click', () => addNum(1))
    document.getElementsByName('two')[0].addEventListener('click', () => addNum(2))
    document.getElementsByName('three')[0].addEventListener('click', () => addNum(3))
    document.getElementsByName('four')[0].addEventListener('click', () => addNum(4))
    document.getElementsByName('five')[0].addEventListener('click', () => addNum(5))
    document.getElementsByName('six')[0].addEventListener('click', () => addNum(6))
    document.getElementsByName('seven')[0].addEventListener('click', () => addNum(7))
    document.getElementsByName('eight')[0].addEventListener('click', () => addNum(8))
    document.getElementsByName('nine')[0].addEventListener('click', () => addNum(9))
    document.getElementsByName('clean')[0].addEventListener('click', () => reset())
    document.getElementsByName('negate')[0].addEventListener('click', () => pressingNegate())
    document.getElementsByName('point')[0].addEventListener('click', () => pressingPoint())
    document.getElementsByName('divide')[0].addEventListener('click', () => addOperation('/'))
    document.getElementsByName('multiply')[0].addEventListener('click', () => addOperation('*'))
    document.getElementsByName('subtract')[0].addEventListener('click', () => addOperation('-'))
    document.getElementsByName('sum')[0].addEventListener('click', () => addOperation('+'))
    document.getElementsByName('equal')[0].addEventListener('click', () => operate())
}

const getEventsListenersKeyboard = () => {
    document.addEventListener('keyup', (key) => {
        if (!isNaN(key.key)) {
            addNum(key.key)
        } else {
            if (key.key === 'Control') {
                pressingNegate()
            } else if (key.key === 'Escape') {
                reset()
            } else if (key.key === ',') {
                pressingPoint()
            } else if (key.key === '-') {
                addOperation('-')
            } else if (key.key === '+') {
                addOperation('+')
            } else if (key.key === '*') {
                addOperation('*')
            } else if (key.key === '/') {
                addOperation('/')
            }
        }
    })
}

const MAX_DIGITS_IN_DISPLAY = 10
const display = document.querySelector('div[name="display"] span')
let operator = null
let accumulatedNumber = null
let actualNumber = null
let actualNumberHasPoint = false


reset()
getEventsListenersButtons()
getEventsListenersKeyboard()