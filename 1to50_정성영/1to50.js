const map = document.body.querySelector('.map');
const timer = document.body.querySelector('.timer');

const date = new Date();
const SIZE = 25;
const front = [];
const back = [];
let next = 1;
let start = false;
let thread = null;

//front
for (let i = 0; i < SIZE; i++) {
    const rn = Math.floor((Math.random() * SIZE) + 1);
    let check = true;
    for (let j = 0; j < i; j++) {
        if (front[j] === rn) {
            check = false;
        }
    }
    if (check) {
        front.push(rn);
    } else {
        i--;
    }
}
//back
for (let i = 0; i < SIZE; i++) {
    const rn = Math.floor((Math.random() * SIZE) + 1 + SIZE);
    let check = true;
    for (let j = 0; j < i; j++) {
        if (back[j] === rn) {
            check = false;
        }
    }
    if (check) {
        back.push(rn);
    } else {
        i--;
    }
}

// set map
for (let i = 0; i < SIZE; i++) {
    const box = document.createElement('div');
    box.setAttribute('class', 'box');
    box.setAttribute('style', 'background-color : rgb(95, 103, 211)');
    box.innerHTML = front[i];

    box.addEventListener('click', e => {
        if (box.innerHTML === (next + '')) {
            setInterval(getTime,10);
            if (next <= SIZE) {
                box.innerHTML = back[0];
                back.shift();
                box.setAttribute('style', 'background-color : rgb(58, 64, 159)');
            } else {
                box.style.visibility = 'hidden';
            }
            next++;
        }
        if (next === 51) {
            alert(`GAME CLEAR!!!`);
            location.reload();
        }
    });

    map.append(box);
}

function getTime(){
    const now = new Date();
    const record = now - date;

    ms = record % 1000;
    s = Math.floor(record / 1000);
    timer.innerHTML = `${s}.${ms}`;

}