var inquirer = require('inquirer');

var closedDeleted = [];

var basic = [];

function practiceBasic(){
	for(var i = 0; i<basic.length; i++){
		basic[i].practice();
	}
};

function practiceCloze(){

};

function BasicCard (front, back){
	this.front = front;
	this.back = back;
	console.log('success! a basic flash card was created.');
	basic.push(this);
};

var correctAnswer;

BasicCard.prototype.practice = function (){
	correctAnswer = this.back;
	inquirer.prompt({
		type: 'input',
		message: this.front,
		name: 'reply'
	}).then(function(answer){
		if(answer.reply === correctAnswer){
			console.log('correct!');
		} else {
			console.log('incorrect, the answer is '+this.back);
		}
	})
}

function ClozeCard (fullText, cloze){
	// if cloze is not contained within fullText, log an error.
	if(!fullText.includes(cloze)){
		console.log('error! that won\'t work! '+fullText+' does not contain '+cloze+'.');
	} else {
		this.fullText = fullText;
		this.cloze = cloze;
		console.log('success! a new cloze card was created.');
	}
	closedDeleted.push(this);
};

ClozeCard.prototype.cloze = function(){
	return(this.cloze);
}

ClozeCard.prototype.fullText = function(){
	return(this.fullText);
}

ClozeCard.prototype.partial = function(){
	return(this.fullText.replace((this.cloze+' '), '... '));
}

ClozeCard.prototype.errText = function(){
	console.log('Error: '+ 'is not part of '+this.fullText);
}

var createType = {
	type: 'list',
	message: '\nWhich type of FlashCard would you like to create?',
	name: 'createType',
	choices: ['Standard FlashCard', 'Cloze Card']
};

var doneCreating = {
	type: 'list',
	message: '\nMake another flash card or return to the main menu',
	name: 'createType',
	choices: ['Make another flash card', 'Return to the main menu']
};

function createWhich(){
	inquirer.prompt(createType).then(function(response){
		switch (response.createType){
			case 'Standard FlashCard':
				createStandard();
			break;
			case 'Cloze Card':
				createCloze();
			break;
		}
	})
};

var standardFront = {
	type: 'input',
	message: '\nPlease write out what you would like to be on the front of this flash card\n',
	name: 'standardFrontInput'
};

var standardBack = {
	type: 'input',
	message: '\nWhat is the answer to this flashcard? i.e.: Please write out what you would like to be on the back of the card?\n',
	name: 'standardBackInput'
};
var getStandardBack = function () {
	inquirer.prompt(standardBack).then(function(response){
		standardBack = response.standardBackInput;
		new BasicCard (standardFront, standardBack);
		NotherCardOrMainMenu();
	}).catch(function(err){
		console.log(err);
	})
};

var standardFront;
var standardBack;
var clozeFront;
var clozeBack;

function createStandard(){
	console.log('got here');
	inquirer.prompt(standardFront).then(function(result){
		standardFront = result.standardFrontInput;
		getStandardBack();
	})
};

var clozePrompt = {
	type: 'input',
	message: '\nPlease write out what you would like to be on this flash card in the format [front, back] and make sure that whatever is on the back of the flash card is also written on the front of the flash card',
	name: 'clozeCardInput'
};

function createCloze(){
	inquirer.prompt(clozePrompt).then(function(result){
		var clozeFront = result.clozeCardInput[0];
		var clozeBack = result.clozeCardInput[1];
		console.log(clozeFront, clozeBack);
	})
};

var NotherCardOrMainMenu = function (){
	inquirer.prompt(doneCreating).then(function(response){
		if(response.createType === 'Make another flash card'){
			createWhich();
		} else if (response.createType === 'Return to the main menu'){
			playWhich();
		}
	})
};

function playWhich(){
	inquirer.prompt(question).then(function(response){
		switch (response.choice){
			case 'Create a FlashCards':
				createWhich();
			break;
			case 'Practice FlashCards':
				whatType();
			break;
		}
	})
};

var question = {
	type: 'list',
	message: '\nWhat would you like to do?',
	name: 'choice',
	choices: ['Create a FlashCards', 'Practice FlashCards']
};

var mainMenu = function() {
	inquirer.prompt(question).then(function(response){
		switch (response.choice){
			case 'Create a FlashCards':
				createWhich();
			break;
			case 'Practice FlashCards':
				playWhich();
			break;
		}
	})
};

mainMenu();

function whatType () {
	inquirer.prompt(questionWhatType).then(function(reply){
		if(reply.questionWhatType === 'Standard Flash Cards'){
			practiceBasic();
		} else if(reply.questionWhatType === 'Cloze Cards'){
			practiceCloze();
		}
	})
};

var questionWhatType = {
	type: 'list',
	name: 'questionWhatType',
	choices: ['Standard Flash Cards', 'Cloze Cards'],
	message: '\nWhich type of cards would you like to practice?'
};
// console.log(firstPresident.front);

// console.log(firstPresident.back);

// console.log(firstPresidentCloze.cloze);

// console.log(firstPresidentCloze.partial());

// console.log(firstPresidentCloze.fullText);



