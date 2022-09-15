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
	answerContainer.setAttribute('id', 'answers')
	answerContainer.innerHTML = answers[random];
	document.getElementsByClassName('innerBall')[0].append(answerContainer);
	document.getElementsByClassName('innerTriangle')[0].classList.toggle('hide');
	document.getElementsByClassName('innerNumber')[0].classList.toggle('hide');
	submit.classList.toggle('hide');
	localStorage.setItem(`question`, input.value)
}


const input = document.createElement('input');
input.placeholder = `Please ask a question.`;
document.body.append(input);

const submit = document.createElement('button');
submit.innerHTML = `Ask me anything!`;
document.body.append(submit);
submit.addEventListener('click', function() {
	ask();
	const question = document.createElement('p');
	question.classList.add('question');
	question.innerHTML = localStorage.getItem('question');
	document.querySelector('.questionContainer').append(question);
	document.querySelector('.innerBall').classList.add('innerBallGrey');
	input.classList.add('hide');
});


const reset = document.createElement('button');
reset.innerHTML = `Reset`;
document.body.append(reset);
reset.addEventListener('click', function() {
	if (document.querySelector('#answers')) {
		document.querySelector('#answers').remove();
	}
	if (document.querySelector('.question')) {
		document.querySelector('.question').remove();
	}
	localStorage.clear();
	document.getElementsByClassName('innerTriangle')[0].classList.add('hide');
	document.getElementsByClassName('innerNumber')[0].classList.remove('hide');
	document.querySelector('.innerBall').classList.remove('innerBallGrey');
	input.classList.remove('hide');
	input.value = '';
	submit.classList.remove('hide');
})