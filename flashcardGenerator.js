var inquirer = require("inquirer");

var clozeArray = [];

var basic = [];

function practiceBasic(count) {
	if (count < basic.length) {
		basic[count].practice();
	} else {
		basicCount = 0;
		mainMenu();
	}
}
var basicCount = 0;

function practiceCloze(count) {
	if (basicCount < clozeArray.length) {
		clozeArray[basicCount].practice();
	} else {
		clozeCount = 0
		mainMenu();
	}
}

ClozeCard.prototype.practice = function () {
	correctAnswer = this.cloze;
	var cFront = this.partial();
	var me = this;
	inquirer.prompt({
		type: "input",
		message: cFront,
		name: "reply"
	}).then(function (answer) {
		if (answer.reply === correctAnswer) {
			console.log("correct!");
		} else {
			console.log("incorrect, the answer is " + me.cloze);
		}
		basicCount++;
		practiceCloze(basicCount);
	});
};

function BasicCard(front, back) {
	this.front = front;
	this.back = back;
	console.log("success! a basic flash card was created.");
	basic.push(this);
}

var correctAnswer;

BasicCard.prototype.practice = function () {
	correctAnswer = this.back;
	var me = this;
	inquirer.prompt({
		type: "input",
		message: this.front,
		name: "reply"
	}).then(function (answer) {
		if (answer.reply === correctAnswer) {
			console.log("correct!");
		} else {
			console.log("incorrect, the answer is " + me.back);
		}
		basicCount++;
		practiceBasic(basicCount);
	});
};

function ClozeCard(fullText, cloze) {
	// if cloze is not contained within fullText, log an error.
	if (!fullText.includes(cloze)) {
		console.log("error! that won't work! " + fullText + " does not contain " + cloze + ".");
	} else {
		this.fullText = fullText;
		this.cloze = cloze;
		console.log("success! a new cloze card was created.");
	}
	clozeArray.push(this);
	console.log(clozeArray);
}

ClozeCard.prototype.cloze = function () {
	return (this.cloze);
};

ClozeCard.prototype.fullText = function () {
	return (this.fullText);
};

ClozeCard.prototype.partial = function () {
	return (this.fullText.replace((this.cloze + " "), "... "));
};

ClozeCard.prototype.errText = function () {
	console.log("Error: " + "is not part of " + this.fullText);
};

var createType = {
	type: "list",
	message: "\nWhich type of FlashCard would you like to create?",
	name: "createType",
	choices: ["Standard FlashCard", "Cloze Card"]
};

var doneCreating = {
	type: "list",
	message: "\nMake another flash card or return to the main menu",
	name: "createType",
	choices: ["Make another flash card", "Return to the main menu"]
};

var createWhich = function () {
	inquirer.prompt(createType).then(function (response) {
		switch (response.createType) {
			case "Standard FlashCard":
				createStandard();
				break;
			case "Cloze Card":
				createCloze();
				break;
		}
	});
};

var standardFront = {
	type: "input",
	message: "\nPlease write out what you would like to be on the front of this flash card\n",
	name: "standardFrontInput"
};

var standardBack = {
	type: "input",
	message: "\nWhat is the answer to this flashcard? i.e.: Please write out what you would like to be on the back of the card?\n",
	name: "standardBackInput"
};
var getStandardBack = function (standardFrontAnswer) {
	inquirer.prompt(standardBack).then(function (response) {
		var standardBackAnswer = response.standardBackInput;
		new BasicCard(standardFrontAnswer, standardBackAnswer);
		NotherCardOrMainMenu();
	}).catch(function (err) {
		console.log(err);
	});
};

var createStandard = function () {
	inquirer.prompt(standardFront).then(function (result) {
		getStandardBack(result.standardFrontInput);
	});
};

var clozePrompt = {
	type: "input",
	message: "\nPlease write out what you would like to be on the front of this flash card\n",
	name: "clozeCardInput"
};
var secondClozePrompt = {
	type: "input",
	message: "\nNow, please write out what you would like to be on the back of this Cloze Card. Note that what is on the back of the card must be part of the statement that is on the front.\n",
	name: "secondPromptInput"
};

function createCloze() {
	inquirer.prompt(clozePrompt).then(function (result) {
		var clozeFront;
		clozeFront = result.clozeCardInput;
		console.log(clozeFront);
		getClozeBackInput(clozeFront);
		// new ClozeCard(clozeFront, clozeBack);
	});
}

function getClozeBackInput(clozeFront) {
	inquirer.prompt(secondClozePrompt).then(function (result) {
		var clozeBack = result.secondPromptInput;
		console.log("close back: " + clozeBack);
		new ClozeCard(clozeFront, clozeBack);
		NotherCardOrMainMenu();
	}).catch(function (err) {
		console.log(err);
	});
}

var NotherCardOrMainMenu = function () {
	inquirer.prompt(doneCreating).then(function (response) {
		if (response.createType === "Make another flash card") {
			createWhich();
		} else if (response.createType === "Return to the main menu") {
			playWhich();
		}
	});
};

function playWhich() {
	inquirer.prompt(question).then(function (response) {
		switch (response.choice) {
			case "Create a FlashCards":
				createWhich();
				break;
			case "Practice FlashCards":
				whatType();
				break;
		}
	});
}

var question = {
	type: "list",
	message: "\nWhat would you like to do?",
	name: "choice",
	choices: ["Create a FlashCards", "Practice FlashCards"]
};

var mainMenu = function () {
	inquirer.prompt(question).then(function (response) {
		switch (response.choice) {
			case "Create a FlashCards":
				createWhich();
				break;
			case "Practice FlashCards":
				whatType();
				break;
		}
	});
};

mainMenu();
var clozeCount = 0;

function whatType() {
	inquirer.prompt(questionWhatType).then(function (reply) {
		if (reply.questionWhatType === "Standard Flash Cards") {
			practiceBasic(basicCount);
		} else if (reply.questionWhatType === "Cloze Cards") {
			practiceCloze(clozeCount);
		}
	});
}

var questionWhatType = {
	type: "list",
	name: "questionWhatType",
	choices: ["Standard Flash Cards", "Cloze Cards"],
	message: "\nWhich type of cards would you like to practice?"
};
// console.log(firstPresident.front);

// console.log(firstPresident.back);

// console.log(firstPresidentCloze.cloze);

// console.log(firstPresidentCloze.partial());

// console.log(firstPresidentCloze.fullText);