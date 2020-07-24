const Player1 = 'x'
const Player2 = 'O'

const Box = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const VictoryMessageInText = document.querySelector('[data-winner-text]')
const VictoryMessage = document.getElementById('winner')
const replayButton = document.getElementById('replay')
const Combo_for_Victory = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let oTurn

startgame()

replayButton.addEventListener('click',startgame)

function startgame() {
    oTurn=false
    Box.forEach( cell => {
        cell.classList.remove(Player1)
        cell.classList.remove(Player2)
        cell.removeEventListener('click',Move)
        cell.addEventListener('click',Move, { once: true})
    })
    setBoardHoverClass()
    VictoryMessage.classList.remove('dis')
}

function Move(e) {
    const cell = e.target
    const currClass = oTurn ? Player2:Player1
    placemark(cell, currClass)
    if(checkVictory(currClass)){
        endingthegame(false)
    }else if(isDraw()){
        endingthegame(true)
    }else{
        SwapTurn();
        setBoardHoverClass()
    }
}
function placemark(cell, currClass) {
    cell.classList.add(currClass)
}
function unplacemark(cell, currClass){
    cell.classList.remove(currClass)
}
function SwapTurn() {
    oTurn=!oTurn
}

function checkVictory(currClass){
    return Combo_for_Victory.some(Combi => {
        return Combi.every(idx => {
            return Box[idx].classList.contains(currClass)
        })
    })
}

function isDraw(){
    return [...Box].every(cell => {
        return cell.classList.contains(Player1)||cell.classList.contains(Player2)
    })
}



function setBoardHoverClass() {
    board.classList.remove(Player1)
    board.classList.remove(Player2)
    if(oTurn){
        board.classList.add(Player2)
    }else{
        board.classList.add(Player1)
    }
}

function endingthegame(draw){
    if(draw){
        VictoryMessageInText.innerText = 'The Game Draws'
    }else{
        VictoryMessageInText.innerText = `${oTurn ? "Player2" : "Player1"} Won the game!!! Congratulations!`
    }
    VictoryMessage.classList.add('dis')
}

function getoptimalcell(){
    var Player = (oTurn ? Player2:Player1)
    var opponent = (oTurn ? Player1:Player2)
    var BestVal=bestmove(Player,opponent)
    var row = Math.floor(BestVal/3)+1
    var col = (BestVal%3)+1
    alert("click on the row: "+row+" column: "+col)
}

function iscellempty(cell) {
    if(cell.classList.contains(Player1)||cell.classList.contains(Player2)){
        return false
    }
    else{
        return true
    }
}

function evaluate(Player, opponent) {
    if(checkVictory(Player)){
        return 10
    }
    if(checkVictory(opponent)){
        return -10
    }
    return 0
}

function minimaxalgo(Player, opponent, depth, isMax) {
    var score=evaluate(Player, opponent)

    if(score == 10){
        return score-depth
    }

    if(score == -10){
        return score+depth
    }

    if(isDraw()){
        return 0
    }

    if(isMax){
        var Best = -1000
        Box.forEach(cell => {
            if(iscellempty(cell)){
                placemark(cell, Player)
                Best=Math.max(Best,minimaxalgo(Player,opponent,depth+1,!isMax))
                unplacemark(cell, Player)
            }
        })
        return Best
    }
    else{
        var Best = 1000
        Box.forEach(cell=>{
            if(iscellempty(cell)){
                placemark(cell, opponent)
                Best=Math.min(Best,minimaxalgo(Player,opponent,depth+1,!isMax))
                unplacemark(cell, opponent)
            }
        })
        return Best
    }
}

function bestmove(Player,opponent) {
    var count = 0
    var ans = -1
    var BestVal = -1000
    Box.forEach(cell => {
        if(iscellempty(cell)){
            placemark(cell,Player)
            var moveval=minimaxalgo(Player,opponent,0,false)
            unplacemark(cell,Player)
            if(moveval>BestVal){
                ans = count
            }
        }
        count+=1
    })
    return ans
}

function scrollWin() {
    window.scrollTo(0,500)
} 