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