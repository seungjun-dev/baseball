//초기 변수 설정
var numbers=[0,1,2,3,4,5,6,7,8,9],
    balls=[], tries=1,
    el = document.getElementById('board');

//숫자만을 받기 위해 ASCII코드 값이 숫자 패드 이외의 값이 눌릴 경우 입력이 되지 않도록 설정
//ASCII코드 값에 한글 문자는 없기 때문에 해당 부분은 추후 업데이트 필요
function inNumber(){
    if(event.keyCode<48 || event.keyCode>57){
        event.returnValue=false;
    }
}

//게임의 진행 상황을 볼 수 있도록 게임 보드에 기록 추가
function recordToBoard(tags, state) {
    el.innerHTML += "<span>"+tags[0].value+""+tags[1].value+""+tags[2].value+""+tags[3].value+"</span>\t\t<span><b>"+state+"</b></span><br>";
}

//플레이어가 추측한 숫자 중에 볼이 있는지 확인
function checkBall(tags) {
    var ball=0;
    for(var i=0; i<tags.length; i++) {
        for(var j=0; j<balls.length; j++) {
            if(i!=j) {
                if(tags[i].value==balls[j]) {
                    ball++;
                }
            }
        }
    }
    return ball;
}

//게임이 종료 되면 플레이어가 추측한 횟수에 따라 다른 메세지를 보여줌
function showResult() {
    var pitches = document.getElementById('pitches');
    
    if(tries==1) {
        tries = "You are Genius!"
    } else if(tries<=5) {
        tries = "Only " + tries + " Pitches!";                
    } else {
        tries = tries + "Pitches!";
    }
    pitches.innerHTML = tries;
}

function emptyInputTag() {
    for(var i=0; i<tags.length; i++) {
        tags[i].value='';
    }
}

//플레이어가 숫자를 입력 후 pitch 버튼을 누르면 실행되는 함수
function pitch() {
    var tags = document.getElementsByClassName('inputTag');
    var state;
    var strike, cnt=0;

    for(var i=0; i<tags.length; i++) {
        if(balls[i]==tags[i].value) {
            cnt++;
        } 
    }

    if(cnt==4){
        state = "You Win!";        
        recordToBoard(tags, state);
        alert(state);
        showResult();
    } else {
        strike=cnt;
        state = cnt + "Strike, " + checkBall(tags) + "Ball";
        recordToBoard(tags, state);
    }
    emptyInputTag();
    tries++;
}

//init 함수. 야구게임 시작 전 숫자를 세팅한다.
function init() {
    var idx;
    for(var i=0; i<4; i++){
        idx=Math.floor(Math.random() * numbers.length);
        balls.push(numbers[idx]);
        numbers.splice(idx,1);
    }
    //showNumbers();
}

/*function showNumbers(){
    for(var i=0; i<balls.length; i++) {
        console.log("balls["+i+"]: "+balls[i]+"\n");
    }
}*/

//init 함수 실행
init();