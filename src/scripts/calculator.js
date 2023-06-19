const MAX_DIGITS_IN_DISPLAY = 10;
let isNegative = false;
let hasDecimal = false;

const setDisplay = (value) => {
  display.innerHTML = value;
};

const reset = () => {
  setDisplay(0);
  hasDecimal = false;
};

const DisplayAcu = (value) => {
  const currentValue = display.innerHTML;

  if (value === "+-") {
    isNegative = !isNegative;
    const sign = isNegative ? "-" : "";
    display.innerHTML = sign + currentValue;
  } else if (value === ",") {
    if (!hasDecimal && currentValue.indexOf(",") === -1) {
      const newValue = currentValue === "0" ? "0" + value : currentValue + value;
      display.innerHTML = newValue;
      hasDecimal = true;
    }
  } else {
    const newValue = currentValue === "0" && value !== "," ? value : currentValue + value;
    if (newValue.length <= MAX_DIGITS_IN_DISPLAY) {
      display.innerHTML = newValue;
    } else {
      window.alert('Hello. The maximum number of digits in the display is ' + MAX_DIGITS_IN_DISPLAY + '.');
      reset();
    }
  }
};

document.getElementsByName('clean')[0].addEventListener('click', () => {
  setDisplay("0");
  hasDecimal = false;
});

const display = document.querySelector('div[name="display"] span');
document.getElementsByName('multiply')[0].addEventListener('click', () => {
  DisplayAcu("x");
});

const displaysum = document.querySelector('div[name="display"] span');
document.getElementsByName('sum')[0].addEventListener('click', () => {
  DisplayAcu("+");
});

const displaysubtract = document.querySelector('div[name="display"] span');
document.getElementsByName('subtract')[0].addEventListener('click', () => {
  DisplayAcu("-");
});

const displaydivide = document.querySelector('div[name="display"] span');
document.getElementsByName('divide')[0].addEventListener('click', () => {
  DisplayAcu("÷");
});

const displaypoint = document.querySelector('div[name="display"] span');
document.getElementsByName('point')[0].addEventListener('click', () => {
  if (!hasDecimal) {
    DisplayAcu(",");
  }
});

const displaynegate = document.querySelector('div[name="display"] span');
document.getElementsByName('negate')[0].addEventListener('click', () => {
  const currentValue = display.innerHTML;
  const newValue = parseFloat(currentValue) * -1;
  display.innerHTML = newValue.toString();
});

document.getElementsByName('zero')[0].addEventListener('click', () => {
  DisplayAcu("0");
});
document.getElementsByName('one')[0].addEventListener('click', () => {
  DisplayAcu("1");
});

document.getElementsByName('two')[0].addEventListener('click', () => {
  DisplayAcu("2");
});

document.getElementsByName('three')[0].addEventListener('click', () => {
  DisplayAcu("3");
});

document.getElementsByName('four')[0].addEventListener('click', () => {
  DisplayAcu("4");
});

document.getElementsByName('five')[0].addEventListener('click', () => {
  DisplayAcu("5");
});

document.getElementsByName('six')[0].addEventListener('click', () => {
  DisplayAcu("6");
});

document.getElementsByName('seven')[0].addEventListener('click', () => {
  DisplayAcu("7");
});

document.getElementsByName('eight')[0].addEventListener('click', () => {
  DisplayAcu("8");
});

document.getElementsByName('nine')[0].addEventListener('click', () => {
  DisplayAcu("9");
});
