const board = document.querySelector('#board');
const startBtn = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');
const timeListBtns = document.querySelector('.time-list');
const colors = ['#FF5733', '#33FF57', '#FF3342', '#16D9E3'];
let timer = document.querySelector('#time');
let time = 0;
let score = 0;



startBtn.addEventListener('click', (e) => {
	e.preventDefault();
	screens[0].classList.add('up');
});

timeListBtns.addEventListener('click', (e) => {
	if(e.target.classList.contains('time-btn')) {
		time = parseInt(e.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame();
	}
});

board.addEventListener('click', (e) => {
	if(e.target.classList.contains('circle')) {
		score++;
		e.target.remove();
		createRandomBall();
	}
});

function startGame() {
	setInterval(() => {
		decreaseTime()
	}, 1000);
	createRandomBall();
	setTime(time);
}

function decreaseTime() {
	if(time === 0) {
		finishGame();
	} else {
		let current = --time;

		if(current < 10) {
			current = `0${current}`;
		}

		setTime(current);
	}
}

function setTime(val) {
	timer.innerHTML = `00:${val}`;
}

function finishGame() {
	timer.parentNode.classList.add('hide');
	board.innerHTML = `<h1>Cчет: <span class="primary">${score}</psan></h1>`;
}

function createRandomBall() {
	const ball = document.createElement('div');
	const size = getNumberRandom(10, 60);
	const {width, height} = board.getBoundingClientRect();
	const x = getNumberRandom(0, width - size);
	const y = getNumberRandom(0, height - size);

	ball.classList.add('circle');
	ball.style.width = `${size}px`;
	ball.style.height = `${size}px`;
	ball.style.top=`${y}px`
	ball.style.left=`${x}px`
	ball.style.background = colors[Math.floor(Math.random() * colors.length)];

	board.append(ball);
}

function getNumberRandom(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}