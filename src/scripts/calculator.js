/* eslint-disable no-alert */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable default-case */

const MAX_DIGITS_IN_DISPLAY = 10;

let display;

function setDisplay(value) {
	display.innerHTML = '0,';
}

function sayHello() {
	window.alert('Hello');
}

function reset() {
	setDisplay(0);
}

function inicialize() {
	display = document.querySelector('div[name="display"] span');
	document.getElementsByName('multiply')[0].addEventListener('click', () => {
		sayHello();
	});
	reset();
}
