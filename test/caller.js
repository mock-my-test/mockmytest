const Callee = require('./callee');

module.exports = class Caller {
    static UP = Callee.UP;
    static DOWN = Callee.DOWN;
    static ERROR = Callee.ERROR;
    static NEXTGAME = 'next_game';
    static FINISHED = 'finished';

    _callee; // random answer generator
    _begin; // first number of random number
    _end; // last number of random number
    _algorithm; // programmed by the player
    _score; // an array of _remain_guess_count for each game to find the answer
    _game_count; // the limitation of start a new game to earn the score
    _limit_guess_count; // the limitation of guess method can be called for each game
    _guess_count; // the number of guess method is called
    constructor(game_count = 5, limit_guess_count = 10, begin = 0, end = 100) {
        this._begin = begin;
        this._end = end;
        this._score = [];
        this._game_count = game_count;
        this._limit_guess_count = limit_guess_count;
        this.newGame();
    };
    newGame() {
        this._callee = new Callee(this._begin, this._end);
        this._guess_count = 0;
    };
    guess(number) {
        if (this._score.length >= this._game_count) return Caller.FINISHED;

        this._guess_count++;
        if (this._guess_count > this._limit_guess_count) {
            this._score.push(0);
            this.newGame();
            return Caller.NEXTGAME;
        }

        switch (this._callee.guess(number)) {
            case Callee.UP:
                return Caller.UP;
            case Callee.DOWN:
                return Caller.DOWN;
            case Callee.CORRECT:
                this._score.push(this._guess_count);
                this.newGame();
                return Caller.NEXTGAME;
            default:
                return Caller.ERROR;
        }
    };
    program(algorithm) {
        this._algorithm = algorithm;
    }
    score() {
        while (this._score.length < this._game_count) {
            this._algorithm(this._begin, this._end);
        }
        return this._score;
    }
};