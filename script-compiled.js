"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Square = function (_React$Component) {
    _inherits(Square, _React$Component);

    function Square() {
        _classCallCheck(this, Square);

        return _possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).apply(this, arguments));
    }

    _createClass(Square, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            //        console.log(this.props.owners);
            return React.createElement(
                "button",
                { className: "square", onClick: function onClick() {
                        return _this2.props.handleClick(_this2);
                    } },
                this.props.owners[this.props.id]
            );
        }
    }]);

    return Square;
}(React.Component);

var Board = function (_React$Component2) {
    _inherits(Board, _React$Component2);

    function Board() {
        _classCallCheck(this, Board);

        return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
    }

    _createClass(Board, [{
        key: "renderSquare",
        value: function renderSquare(i) {
            return React.createElement(Square, { id: i, handleClick: this.props.handleClick, owners: this.props.owners });
        }
    }, {
        key: "render",
        value: function render() {
            var status = 'Next player: ' + this.props.nextPlayer;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "status" },
                    status
                ),
                React.createElement(
                    "div",
                    { className: "board-row" },
                    this.renderSquare(0),
                    this.renderSquare(1),
                    this.renderSquare(2)
                ),
                React.createElement(
                    "div",
                    { className: "board-row" },
                    this.renderSquare(3),
                    this.renderSquare(4),
                    this.renderSquare(5)
                ),
                React.createElement(
                    "div",
                    { className: "board-row" },
                    this.renderSquare(6),
                    this.renderSquare(7),
                    this.renderSquare(8)
                )
            );
        }
    }]);

    return Board;
}(React.Component);

var Game = function (_React$Component3) {
    _inherits(Game, _React$Component3);

    function Game(props) {
        _classCallCheck(this, Game);

        var _this4 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

        _this4.state = {
            nextPlayer: "X",
            owners: ['', '', '', '', '', '', '', '', ''],
            clickCount: 0
        };
        _this4.handleClick = _this4.handleClick.bind(_this4);
        return _this4;
    }

    _createClass(Game, [{
        key: "handleClick",
        value: function handleClick(square) {
            var _this5 = this;

            if (this.state.owners[square.props.id] !== '') {
                return;
            }
            this.setState(function (prevState, props) {
                var prevPlayer = prevState.nextPlayer;
                var nextPlayer = prevPlayer === "X" ? "O" : "X";
                var arr = prevState.owners;
                arr[square.props.id] = prevPlayer;
                return { nextPlayer: nextPlayer, owners: arr, clickCount: prevState.clickCount + 1 };
            }, function () {
                var winner = calculateWinner(_this5.state.owners);
                if (winner) {
                    alert(winner + " has won!");
                } else {
                    if (_this5.state.clickCount === 9) {
                        alert("You suck!!");
                    }
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "game" },
                React.createElement(
                    "div",
                    { className: "game-board" },
                    React.createElement(Board, { nextPlayer: this.state.nextPlayer, handleClick: this.handleClick, owners: this.state.owners })
                ),
                React.createElement(
                    "div",
                    { className: "game-info" },
                    React.createElement("div", null),
                    React.createElement("ol", null)
                )
            );
        }
    }]);

    return Game;
}(React.Component);

// ========================================

ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));

function calculateWinner(squares) {
    var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (var i = 0; i < lines.length; i++) {
        var _lines$i = _slicedToArray(lines[i], 3),
            a = _lines$i[0],
            b = _lines$i[1],
            c = _lines$i[2];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
