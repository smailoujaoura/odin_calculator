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
	EXPRESSION_PANEL.textContent = (operation.first ? operation.first + " " : "") + (operation.operator ? operation.operator + " " : "") + (operation.second ? operation.second + " " : "");
	if (operation.first && operation.second) {
		RESULT_PANEL.textContent = "= " + doOperation(operation.first, operation.second, operation.operator);
	}
	else if (operation.first) {
		RESULT_PANEL.textContent = "= " + operation.first;
	}
	console.log(EXPRESSION_PANEL.textContent);
}

function clearInputs() {
	EXPRESSION_PANEL.textContent = "";
	RESULT_PANEL.textContent = "";
	operation.first = null;
	operation.second = null;
	operation.operator = null;
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