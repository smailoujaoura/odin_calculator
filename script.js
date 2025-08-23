const EXPRESSION_PANEL = document.querySelector(".expression-panel");
const RESULT_PANEL = document.querySelector(".result-panel");
const BUTTONS = document.querySelector(".buttons");

const operation = {
	first: null,
	second: null,
	operator: null,
};

const OPERATORS = {
	'division': '/',
	'multiplication': '*',
	'subtraction': '-',
	'addition': '+',
	'result': '='
};

function doOperation(a, b, op) {
	a = parseInt(a);
	b = parseInt(b);
	if (b === 0 && op === '/') {
		alert("Division by Zero");
		clearInputs();
	}
	const ops = {
		'+': (a, b) => a + b,
		'-': (a, b) => a - b,
		'*': (a, b) => a * b,
		'/': (a, b) => a / b
	};
	return ops[op](a, b);
}

// function redisplayExpAndRes() { // one place to handle redisplaying but potentially be really good with OOP and classes and templates

// }

function makeOperation(token) {
	if (typeof token === "number")
	{
		if (operation.first === null)
			operation.first = `${token}`;
		else if (operation.second === null && operation.operator === null)
			operation.first += `${token}`;
		else if (operation.second === null)
			operation.second = `${token}`;
		else
			operation.second += `${token}`;
	}
	else if (token === '-' || token === '+' || token === '/' || token === '*')
	{
		if (operation.first === null)
			operation.first = token;
		else if (operation.second === null)
			operation.operator = token;
		else
		{
			operation.first = doOperation(operation.first, operation.second, operation.operator);
			operation.second = null;
			operation.operator = token;
		}
	}
	else if (token === '=') {
		if (operation.first && operation.second)
		{
			operation.first = doOperation(operation.first, operation.second, operation.operator);
			operation.second = null;
			operation.operator = null;
		}
	}
	EXPRESSION_PANEL.textContent = (operation.first ? operation.first : "") + (operation.operator ? operation.operator : "") + (operation.second ? operation.second : "");
	if (operation.first && operation.second) {
		RESULT_PANEL.textContent = "= " + doOperation(operation.first, operation.second, operation.operator);
	}
	else if (operation.first) {
		RESULT_PANEL.textContent = "= " + operation.first;
	}
}

function clearInputs() {
	EXPRESSION_PANEL.textContent = "";
	RESULT_PANEL.textContent = "";
	operation.first = null;
	operation.second = null;
	operation.operator = null;
}

function undoInput() {
	let oldCont = EXPRESSION_PANEL.textContent;
	if (operation.second) {
		operation.second = operation.second.slice(0, -1);
		if (operation.second.length === 0)
			operation.second = null;
	}
	else if (operation.operator) {
		operation.operator = null;
	}
	else if (operation.first) {
		operation.first = operation.first.toString();
		operation.first = operation.first.slice(0, -1);
		if (operation.first.length === 0)
				operation.first = null;
	}
	EXPRESSION_PANEL.textContent = oldCont.slice(0, -1);
}

function eventDelegator(e) {
	let targetClass = e.target.classList[1];

	if (targetClass.startsWith("digit-")) {
		makeOperation(parseInt(targetClass.split('-')[1]));
	}
	else if (targetClass.endsWith("-clear")) {
		clearInputs();
	}
	else if (targetClass.endsWith("-undo")) {
		undoInput();
	}
	else {
		makeOperation(OPERATORS[targetClass.split('-')[1]]);
	}
}

function registerButtonsEvents() {
	// register a an event delegator for all buttons: digits and operators
	BUTTONS.addEventListener('click', eventDelegator);
}

registerButtonsEvents();