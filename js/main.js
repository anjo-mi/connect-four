

class ConnectFour{
    #board
    #disableMove = false
    constructor(first){
        this.gameOver = false
        this.winner = 'Draw'
        this.board = document.querySelectorAll('.column')
        this.currentPlayer = first || 'yellow-chip';
        this.colConverter = {
            'zero': 0,
            'one': 1,
            'two': 2,
            'three': 3,
            'four': 4,
            'five': 5,
            'six': 6
        }
        this.handleClick = this.handleClick.bind(this)
        this.fillBoard()
        this.setTurn()
    }

    setBoard(){
        this.#board = Array.from({length: 7}, () => Array.from({length: 6}, () => null))
    }

    handleClick(event){
        if (this.#disableMove || this.gameOver) return
        this.board.forEach(column => column.removeEventListener('click', this.handleClick))
        const number = (this.colConverter[event.currentTarget.classList[0]])
        this.checkSpace(number)
    }

    fillBoard(){
        console.log('board filling')
        this.board.forEach(column => {
            column.querySelectorAll('.cell').forEach(cell => {
                cell.classList.remove('red-chip', 'yellow-chip')
            })
            console.log(column)
            column.addEventListener('click', this.handleClick)
        })
        // this.board = Array.from(this.board)
        console.log('board filt')
    }

    setTurn(){
        if (this.currentPlayer === 'yellow-chip') {
            document.querySelector('.turn-indicator circle').style.fill = 'yellow'
        }else{
            document.querySelector('.turn-indicator circle').style.fill = 'red'
        }
    }

    checkSpace(num){
        let i = 5
        const column = this.board[num].querySelectorAll('div')

        if (column[i].classList.contains('red-chip') || column[i].classList.contains('yellow-chip')) {
            this.board.forEach(column => column.addEventListener('click', this.handleClick))
            return
        }else{
            this.#disableMove = true
            column[i].classList.add(this.currentPlayer)
        }
        
        const drop = setInterval(() => {
            if (i > 0 && !column[i-1].classList.contains('red-chip') && !column[i-1].classList.contains('yellow-chip')) {
                column[i].classList.remove(this.currentPlayer)
                column[--i].classList.add(this.currentPlayer)
            }else{
                clearInterval(drop)
                console.log(num,i)
                this.updateBoard(num,i)
                this.#disableMove = false
            }
        }, 150)
        this.board.forEach(column => column.addEventListener('click', this.handleClick))
    }

    updateBoard(num,i){
        this.#board[num][i] = this.currentPlayer
        this.checkWin(num, i , this.currentPlayer)
    }

    checkWin(x, y, color){
        const directions = [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, -1]
        ]

        for (let [dx, dy] of directions) {
            let count = 1

            for (let i = 1 ; i < 4; i++) {
                let nx = x + i * dx
                let ny = y + i * dy
                if (nx < 0 || nx >= 7 || ny < 0 || ny >= 6) break
                if (this.#board[nx][ny] !== color) break
                count++
            }

            for (let i = 1 ; i < 4; i++) {
                let nx = x - i * dx
                let ny = y - i * dy
                if (nx < 0 || nx >= 7 || ny < 0 || ny >= 6) break
                if (this.#board[nx][ny] !== color) break
                count++
            }

            if (count >= 4) {
                this.board.forEach(column => column.removeEventListener('click', this.handleClick))
                this.winner = color === 'red-chip' ? 'Red' : 'Yellow'
                this.winner === 'Red' ? score.redWin() : score.yellowWin()
                this.gameOver = true
                console.log(this.winner, this.gameOver)
                setTimeout(startGame, 5000)
            }else{
                this.currentPlayer = color === 'red-chip' ? 'yellow-chip' : 'red-chip'
                this.setTurn()
            }
        }
    }
}


class ScoreBoard{
    constructor(){
        this.redScore = document.querySelector('.red-score')
        this.yellowScore = document.querySelector('.yellow-score')
    }

    yellowWin(){
        this.yellowScore.textContent++
    }

    redWin(){
        this.redScore.textContent++
    }

}

function startGame(){
    const game = new ConnectFour().setBoard();
}

document.addEventListener('DOMContentLoaded', startGame)
const score = new ScoreBoard()