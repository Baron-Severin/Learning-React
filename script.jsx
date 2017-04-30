class Square extends React.Component {
    render() {
        //        console.log(this.props.owners);
        return (
            <button className="square" onClick={()=>this.props.handleClick(this)}>
                {this.props.owners[this.props.id]}
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square id={i} handleClick={this.props.handleClick} owners={this.props.owners}/>;
    }
    render() {
        const status = 'Next player: ' + this.props.nextPlayer;
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nextPlayer : "X",
            owners : ['','','','','','','','',''],
            clickCount : 0
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(square) {
        if (this.state.owners[square.props.id] !== '') { return;}
        this.setState((prevState, props) => {
            let prevPlayer = prevState.nextPlayer;
            let nextPlayer = prevPlayer === "X" ? "O" : "X";
            let arr = prevState.owners;
            arr[square.props.id] = prevPlayer;
            return {nextPlayer : nextPlayer, owners : arr, clickCount : prevState.clickCount + 1};
        }, () => {
            let winner = calculateWinner(this.state.owners);
            if (winner) {
                alert(winner + " has won!");
            } else {
                if (this.state.clickCount === 9) {
                    alert("You suck!!");
                }
            }
        });
    }
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board nextPlayer={this.state.nextPlayer} handleClick={this.handleClick}  owners={this.state.owners}/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
