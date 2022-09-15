// Fun facts:
// Classes are added / removed 18 times, which is nearly 15% of the code by itself

let questionHistory = [];
let answerHistory = [];

let answerContainer = document.createElement('div');
function ask() {
	const answers = [
		"It is certain",
		"Reply hazy, try again",
		"Don't count on it",
		"It is decidedly so",
		"Ask again later",
		"My reply is no",
		"Without a doubt",
		"Better not tell you now",
		"My sources say no",
		"Yes definitely",
		"Cannot predict now",
		"Outlook not so good",
		"You may rely on it",
		"Concentrate and ask again",
		"Very doubtful",
		"As I see it, yes",
		"Most likely",
		"Outlook good",
		"Yes",
		"Signs point to yes"
	]
	const random = Math.floor(Math.random() * answers.length);
	randomAnswer = answers[random];
	answerContainer.setAttribute('id', 'answers')
	answerContainer.innerHTML = randomAnswer;

	if (input.value !== '') {
		questionHistory.push(input.value);
		answerHistory.push(randomAnswer);
	}

	localStorage.setItem(`question`, JSON.stringify(questionHistory))
	localStorage.setItem(`answer`, JSON.stringify(answerHistory));

	document.querySelector('.innerBall').append(answerContainer);
	document.querySelector('.innerTriangle').classList.toggle('hide');
	document.querySelector('.innerNumber').classList.toggle('hide');
	document.querySelector('.questionContainer').classList.remove('hide');
	submit.classList.toggle('hide');
	
	const question = document.createElement('p');
	question.classList.add('question');
	if (input.value === '') {
		answerContainer.innerHTML = `I told you to ask a question.`;
		question.innerHTML = `&nbsp;`;
	} else {
		question.innerHTML = randomAnswer;
	}

	document.querySelector('.questionContainer').innerHTML = input.value;
	document.querySelector('.innerBall').classList.add('innerBallGrey');
	
	input.classList.add('hide');
	reset.classList.remove('hide');

}

const input = document.createElement('input');
input.placeholder = `Please ask a question.`;
document.querySelector('.magic8ballContainer').append(input);

const submit = document.createElement('button');
submit.type = 'submit';
submit.innerHTML = `Ask me anything!`;
document.querySelector('.magic8ballContainer').append(submit);
submit.addEventListener('click', function() {
	ask();
	renderList();
});


const reset = document.createElement('button');
reset.innerHTML = `Reset`;
reset.classList.add('hide');
document.querySelector('.magic8ballContainer').append(reset);
reset.addEventListener('click', function() {

	if (document.querySelector('#answers')) {
		document.querySelector('#answers').remove();
	}
	if (document.querySelector('.question')) {
		document.querySelector('.question').remove();
	}

	document.querySelector('.innerTriangle').classList.add('hide');
	document.querySelector('.innerNumber').classList.remove('hide');
	document.querySelector('.innerBall').classList.remove('innerBallGrey');
	input.classList.remove('hide');
	input.value = '';
	document.querySelector('.questionContainer').classList.add('hide');
	submit.classList.remove('hide');
	reset.classList.add('hide');
})

const clearStorage = document.createElement('button');
clearStorage.innerHTML = `Clear Storage`;
clearStorage.classList.add('clearStorage')
document.querySelector('.magic8ballContainer').append(clearStorage);
clearStorage.addEventListener('click', function() {
	
	localStorage.clear();
	questionHistory = [];
	answerHistory = [];
	clearList();
})

function clearList() {
	if (document.querySelector('.questionAnswerContainer')) {
		document.querySelector('.questionAnswerContainer').remove();
	}
}

function renderList() {
	
	questionHistory = JSON.parse(localStorage.getItem('question'))
	answerHistory = JSON.parse(localStorage.getItem('answer'))

	clearList();

	const questionAnswerContainer = document.createElement('div')
	questionAnswerContainer.classList.add('questionAnswerContainer');

	document.body.append(questionAnswerContainer);
	for (let i = 0; i < questionHistory.length; i++) {
		const QnA = document.createElement('p');
		QnA.innerHTML = `<strong>${questionHistory[i]}</strong> ${answerHistory[i]}`;
		questionAnswerContainer.append(QnA);
	}

}

// This is the wrong way to handle this problem...
if (localStorage.length > 0) {
	renderList();
}