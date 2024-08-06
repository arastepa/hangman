import data from './data/questions.json' with { type: "json" };

export const createKeyboard = (letters) => {
    for (let i = 0; i < 26; i++) {
        const letter = document.createElement('span');
        letter.classList.add('letter');
        letter.innerText = String.fromCharCode('A'.charCodeAt(0) + i);
        letters.append(letter);
        letter.style = "cursor: pointer";
    }
}

export const genQuestion = (question) => {
    const rand = Math.floor(Math.random() * (data['questions'].length));
    const picked = data.questions[rand];
    console.log(rand);
    const unknown = document.createElement('div');
    unknown.classList.add('unknown');
    question.append(unknown);
    for (let i = 0; i < picked.answer.length; i++) {
        const line = document.createElement('hr');
        const span = document.createElement('span');
        span.classList.add('ans');
        line.classList.add('line');
        span.append(line);
        unknown.append(span);
        const sp = document.createElement('span');
        sp.classList.add('sp');
        sp.style = "display: flex; width: 20px; height: 20px;"
        span.prepend(sp);
        unknown.style = `display: grid; grid-template-columns: repeat(${picked.answer.length}, 1fr);`;
    }
    const text = document.createElement('p');
    text.classList.add('text');
    text.innerText = picked.text;
    question.append(text);
    const info = document.createElement('p');
    info.classList.add('text');
    const guesses = document.createElement('span');
    guesses.classList.add('guesses');
    guesses.innerText = '0';
    info.innerText = "Incorrect guesses: "
    info.appendChild(guesses);
    const guess = document.createElement('span');
    guess.classList.add('guesses');
    guess.innerText = '/6';
    info.append(guess);
    question.append(info);
    logic(picked);
    return picked;
}

let count = 0;
let st = new Set();
const checkLetter = (picked, ev) => {
    let flag = 0;
    ev.stopImmediatePropagation();
    ev.currentTarget.onclick = function() {};
    ev.currentTarget.style = "background: grey;";
    picked.answer.split('').forEach((el, index) => {
        if (el.toUpperCase() === ev.currentTarget.innerText) {
            document.querySelectorAll('.unknown span').forEach((el, ind) => {
                if (index === ind) {
                    if (!st.has(index))
                    {
                        count++;
                        document.querySelectorAll('.sp')[ind].innerText = ev.currentTarget.innerText;
                    }
                    st.add(index);
                }
            })
            flag = 1;
        }
    });
    if (count === picked.answer.length)
    {
        document.querySelector('.lose').innerText = 'You Win';
        document.querySelector('.lose').style = "color: green";
        openModal(picked);
    }
    if (flag === 0) {
        console.log("bye");
        document.querySelector('.guesses').innerText = (+document.querySelector('.guesses').innerText + 1).toString();
        let num = +document.querySelector('.guesses').innerText;
        if (num === 1) {
            const img = document.createElement('img');
            img.src = './images/head.png';
            img.classList.add('head');
            img.classList.add('man');
            document.querySelector('.gdiv').append(img);
        }
        else if (num === 2) {
            const img = document.createElement('img');
            img.src = './images/body.png';
            img.classList.add('body');
            img.classList.add('man');
            document.querySelector('.gdiv').append(img);
        }
        else if (num === 3) {
            const img = document.createElement('img');
            img.src = './images/hand-one.png';
            img.classList.add('hand-one');
            img.classList.add('man');
            document.querySelector('.gdiv').append(img);
        }
        else if (num === 4) {
            const img = document.createElement('img');
            img.src = './images/hand-two.png';
            img.classList.add('hand-two');
            img.classList.add('man');
            document.querySelector('.gdiv').append(img);
        }
        else if (num === 5) {
            const img = document.createElement('img');
            img.src = './images/leg-one.png';
            img.classList.add('man');
            img.classList.add('leg-one');
            document.querySelector('.gdiv').append(img);
        }
        else if (num === 6) {
            const img = document.createElement('img');
            img.src = './images/leg-two.png';
            img.classList.add('man');
            img.classList.add('leg-two');
            document.querySelector('.gdiv').append(img);
            document.querySelector('.lose').innerText = 'You Lose';
            openModal(picked);
        }
    }
}
let keys = new Set();
const checkKeys = (picked, ev) => {
    if (keys.has(ev.key.toUpperCase()))
    {
        return ;
    }
    document.querySelectorAll('.letter').forEach(el => {
        if (el.innerText === ev.key.toUpperCase())
        {
            el.onclick = function (){};
            el.style = "background: grey";
        }
    });
    console.log("ev:", ev);
    let flag = 0;
    keys.add(ev.key.toUpperCase());
    picked.answer.split('').forEach((el, index) => {
        if (el.toUpperCase() === ev.key.toUpperCase()) {
            document.querySelectorAll('.unknown span').forEach((el, ind) => {
                if (index === ind) {
                    if (!st.has(index))
                    {
                        count++;
                        document.querySelectorAll('.sp')[ind].innerText = ev.key.toUpperCase();
                    }
                    st.add(index);
                }
            })
            flag = 1;
            console.log("hi");
        }
    });
    if (count === picked.answer.length)
    {
        document.querySelector('.lose').innerText = 'You Win';
        document.querySelector('.lose').style = "color: green";
        openModal(picked);
    }
    if (flag === 0) {
        console.log("bye");
        document.querySelector('.guesses').innerText = (+document.querySelector('.guesses').innerText + 1).toString();
        let num = +document.querySelector('.guesses').innerText;
        if (num === 1) {
            const img = document.createElement('img');
            img.src = './images/head.png';
            img.classList.add('head');
            img.classList.add('man');
            document.querySelector('.gdiv').append(img);
        }
        else if (num === 2) {
            const img = document.createElement('img');
            img.src = './images/body.png';
            img.classList.add('body');
            img.classList.add('man');
            document.querySelector('.gdiv').append(img);
        }
        else if (num === 3) {
            const img = document.createElement('img');
            img.src = './images/hand-one.png';
            img.classList.add('hand-one');
            img.classList.add('man');
            document.querySelector('.gdiv').append(img);
        }
        else if (num === 4) {
            const img = document.createElement('img');
            img.src = './images/hand-two.png';
            img.classList.add('hand-two');
            img.classList.add('man');
            document.querySelector('.gdiv').append(img);
        }
        else if (num === 5) {
            const img = document.createElement('img');
            img.src = './images/leg-one.png';
            img.classList.add('man');
            img.classList.add('leg-one');
            document.querySelector('.gdiv').append(img);
        }
        else if (num === 6) {
            const img = document.createElement('img');
            img.src = './images/leg-two.png';
            img.classList.add('man');
            img.classList.add('leg-two');
            document.querySelector('.gdiv').append(img);
            document.querySelector('.lose').innerText = 'You Lose';
            openModal(picked);
        }
    }
}


export const logic = (picked) => {
    document.querySelectorAll('.letter').forEach(el => (el.onclick = function(ev) { checkLetter(picked, ev)}));
    document.body.onkeydown = function(ev) {checkKeys(picked, ev)};
}

export const createModal = (picked) => {

    const modal = document.createElement('section');
    modal.classList.add('modal');
    modal.classList.add('hidden');
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.classList.add('hidden');
    const message = document.createElement('p');
    message.classList.add('lose');
    message.innerText = "You Lose";
    modal.append(message);
    const word = document.createElement('p');
    word.classList.add('secret-word');
    word.innerText = `The correct answer was ${picked.answer}`;
    modal.append(word);
    const btn = document.createElement('button');
    btn.classList.add('again');
    btn.innerText = "play again";
    modal.append(btn);
    document.body.append(modal);
    document.body.append(overlay);
    btn.addEventListener('click', playAgain);
}

const openModal = (picked)=>{
    document.querySelector('.secret-word').innerText = `The correct answer was ${picked.answer}`;
    document.body.onkeydown = function() {};
    document.querySelector('.modal').classList.remove("hidden");
    document.querySelector('.overlay').classList.remove("hidden");
}

const closeModal = ()=>{
    document.querySelector('.modal').classList.add("hidden");
    document.querySelector('.overlay').classList.add("hidden");
}

const playAgain = ()=>{
    closeModal();
    document.querySelector('.guesses').innerText = '0';
    document.querySelectorAll('.sp').forEach(el => (el.innerText = ''));
    document.querySelectorAll('.man').forEach(el => (el.parentNode.removeChild(el)));
    document.querySelectorAll('.letter').forEach(el => {el.style = ""});
    const quest = document.querySelector('.question');
    while (quest.firstChild)
        quest.removeChild(quest.firstChild);
    document.querySelector('.lose').style = '';
    count = 0;
    st = new Set();
    keys = new Set();
    genQuestion(document.querySelector('.question'));
}