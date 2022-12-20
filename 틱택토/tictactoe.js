const map = document.body.querySelector('.map');

const SIZE = 3;
const mark = [];
let win = 0;
let turn = 1;

// set map
for(let i=0; i<SIZE; i++){
    const row = [];
    const mapRow = document.createElement('div'); // for문 돌면서 3줄 생성
    mapRow.setAttribute('class','row');
    for(let j =0; j<SIZE; j++){
        row.push(0);
        const box = document.createElement('div'); // mapRow 각 줄에 3개의 박스 생성
        box.setAttribute('class','box');
        box.setAttribute('id',`y${i}x${j}`);

        box.addEventListener('click', e=>{
            const yx = box.getAttribute('id'); // y0x0
            const y = parseInt(yx.charAt(1));
            const x = parseInt(yx.charAt(3));
        
            if(mark[y][x] === 0){
                if(turn === 1){
                    box.setAttribute('style','background-color : red');
                }else{
                    box.setAttribute('style','background-color : blue');
                }
                mark[y][x] = turn;
                checkWin();
                turn = turn == 1 ? 2: 1;
            }
        });
        mapRow.append(box);
    }
    mark.push(row); // [3][3] 생성
    map.append(mapRow);
}

function checkWin(){
    let cnt = 0;
    // -
    for(let i=0; i<SIZE; i++){
        cnt = 0;
        for(let j=0; j<SIZE; j++){
            if(mark[i][j] === turn){
                cnt++;
            }
        }
        if(cnt === 3){
            win = turn;
        }
    }
    // l
    for(let i=0; i<SIZE; i++){
        cnt = 0;
        for(let j=0; j<SIZE; j++){
            if(mark[j][i] === turn){
                cnt++;
            }
        }
        if(cnt === 3){
            win = turn;
        }
    }
    // \
    cnt = 0;
    for(let i=0; i<SIZE; i++){
        if(mark[i][i] === turn){
            cnt++;
        }
        if(cnt === 3){
            win = turn;
        }
    }
    // / 
    cnt = 0;
    let k = 2;
    for(let i=0; i<SIZE; i++){
        if(mark[i][k] === turn){
            cnt++;
        }
        k--;
        if(cnt === 3){
            win = turn;
        }
    }
    if(win === turn) {
        alert(`P${win} is Win!!!`);
        location.reload(); // 페이지 새로고침
    }
}