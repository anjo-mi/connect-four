

class ConnectFour{
    constructor(first){
        this.board = document.querySelectorAll('.column')
        this.currentPlayer = first || 'yellow-chip';
        this.fillBoard()
        this.colConverter = {
            'zero': 0,
            'one': 1,
            'two': 2,
            'three': 3,
            'four': 4,
            'five': 5,
            'six': 6
        }
    }

    fillBoard(){
        console.log(this.board)
        this.board.forEach(column => {
            column.querySelectorAll('.cell').forEach(cell => {
                cell.classList.remove('red-chip', 'yellow-chip')
            })
            column.addEventListener('click', (e) => {
                const number = this.colConverter[e.currentTarget.classList[0]]
                console.log(number)
                this.checkSpace(number)
            })
        })
        this.board = Array.from(this.board)
    }

    checkSpace(num){
        let i = 5
        const column = this.board[num].querySelectorAll('div')
        console.log(column)

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
            }
        }, 150)
    }
}

const game = new ConnectFour();