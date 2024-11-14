

class ConnectFour{
    #board
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
    }

    setBoard(){
        this.#board = Array.from({length: 7}, () => Array.from({length: 6}, () => null))
    }

    handleClick(event){
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
        this.board = Array.from(this.board)
        console.log('board filt')
    }

    checkSpace(num){
        let i = 5
        const column = this.board[num].querySelectorAll('div')

        if (column[i].classList.contains('red-chip') || column[i].classList.contains('yellow-chip')) {
            return
        }else{
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
            }
        }, 150)
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
                this.winner = color === 'red-chip' ? 'Red' : 'Yellow'
                this.gameOver = true
                console.log(this.winner, this.gameOver)
            }else{
                this.currentPlayer = color === 'red-chip' ? 'yellow-chip' : 'red-chip'
            }
        }
    }
}

const game = new ConnectFour().setBoard();