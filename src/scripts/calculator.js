const MAX_DIGITS_IN_DISPLAY = 10

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

const getDisplay = () => {
    const num = display.innerHTML
    return (Number(num.replace(',', '.')))
}

const setDisplay = (value) => {
    let displayValue
    if (value === 'ERROR') {
        displayValue = value
    } else {
        value = round(value)
        displayValue = String(value).replace('.', ',')
        if (hasPoint && !displayValue.includes(',')) {
            displayValue = displayValue.concat(',')
        }
    }

    display.innerHTML = displayValue
}

const reset = () => {
    operator = false
    accumulatedNumber = false
    actualNumber = true
    hasPoint = false
    setDisplay(0)
}

const addNum = (value) => {
    const number = getDisplay()
    value = Number(value)
    if ((number === 0 && !hasPoint) || actualNumber) {
        setDisplay(value)
    } else {
        if (lenNumber(number) < MAX_DIGITS_IN_DISPLAY) {
            let result
            if (hasPoint) {
                const numDecimals = lenNumber(number) - lenNumber(Math.round(number)) + 1
                result = number + (value * (Math.pow(0.1, numDecimals)))
            } else {
                result = number * 10 + value
            }
            setDisplay(Number(result))
        }
    }
    actualNumber = false
}

const negateNum = () => {
    const number = getDisplay()
    if (number !== 0) {
        setDisplay(number * -1)
    }
}

const addPoint = () => {
    const number = getDisplay()
    if (!hasPoint && lenNumber(number) < MAX_DIGITS_IN_DISPLAY) {
        hasPoint = true
        setDisplay(number)
    }
}

const addOperation = (operation) => {
    if (operator !== false && !actualNumber) {
        accumulatedNumber = operate()
    } else {
        accumulatedNumber = getDisplay()
    }
    operator = operation
    actualNumber = true
    hasPoint = false
}

const operate = () => {
    if (actualNumber) {
        setDisplay('ERROR')
        return
    }
    const number = getDisplay()
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
    hasPoint = false
    if (result === 'ERROR' || lenNumber(Math.round(result)) > MAX_DIGITS_IN_DISPLAY) {
        setDisplay('ERROR')
    } else {
        setDisplay(result)
    }
    actualNumber = true
    operator = false
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
    document.getElementsByName('negate')[0].addEventListener('click', () => negateNum())
    document.getElementsByName('point')[0].addEventListener('click', () => addPoint())
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
                negateNum()
            } else if (key.key === 'Escape') {
                reset()
            } else if (key.key === ',') {
                addPoint()
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

const display = document.querySelector('div[name="display"] span')
let operator = false
let accumulatedNumber = false
let actualNumber = true
let hasPoint = false

reset()
getEventsListenersButtons()
getEventsListenersKeyboard()
