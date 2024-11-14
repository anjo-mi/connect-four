

document.querySelectorAll('.column').forEach(column => {
    column.addEventListener('click', (e) => {
        let number = e.currentTarget.classList[0]
        console.log(number);
    })
})

class ConnectFour{
    constructor(){
        this.board = document.querySelectorAll('.column')
        this.currentPlayer = 'red';
        this.fillBoard()
    }

    fillBoard(){
        this.board.forEach(column => {
            column.querySelectorAll('.cell').forEach(cell => {
                cell.classList.remove('red-chip', 'yellow-chip')
            })
        })
    }
}

const game = new ConnectFour();