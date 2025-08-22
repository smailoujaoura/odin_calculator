let RESULT_PANEL = document.querySelector(".result-panel");
let EXPRESSION_PANEL = document.querySelector(".expression-panel");
let BUTTONS = document.querySelector(".buttons");

// let OPERATIONS = {
// 	division: '/'
// };

let operation = {
	first: null,
	second: null,
	operator: null,
	result: null
}

function makeOperation(token) {
	if (typeof token === "number")
	{
		console.log("number");
		if (operation.first === null)
			operation.first = `${token}`;
		else if (operation.second === null && operation.operator === null)
			operation.first += `${token}`;
		else if (operation.second === null)
			operation.second = `${token}`;
		else
			operation.second += `${token}`;
	}
	else
	{
		if (operation.first === null)
			operation.first = '-';
		
	}
}

function eventDelegator(e) {
	let targetClass = e.target.classList[1];

	if (targetClass.startsWith("digit-")) {
		makeOperation(parseInt(targetClass.split('-')[1]));
	}
	else {
		makeOperation(targetClass.split('-')[1]);
	}

	console.log(e);
}

function registerButtonsEvents() {
	// register a an event delegator for all buttons: digits and operators
	BUTTONS.addEventListener('click', eventDelegator);
}

registerButtonsEvents();