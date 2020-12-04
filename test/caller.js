const Callee = require('./callee');
module.exports = class Caller {
    static UP = Callee.UP;
    static DOWN = Callee.DOWN;
    static CORRECT = Callee.CORRECT;
    static READY = 'READY';
    static END = 'END'

    _score;
    _try_count;
    _max_try_count;
    _callee;
    _state;
    constructor(answer, max_try_count = 4) {
        this.reset(answer, max_try_count);
    };
    reset(answer, max_try_count) {
        this._score = 0;
        this._max_try_count = max_try_count;
        this.newGame(answer);
    };
    newGame(answer) {
        this._try_count = 0;
        this._callee = new Callee(answer);
        this._state = Caller.READY;
    };
    guess(number) {
        this._try_count++;
        if (this._try_count > this._max_try_count) this._state = Caller.END;
        const result = this._callee.guessAnswer(number);
        if (result === Callee.CORRECT && this._state === Caller.READY) {
            this._score++;
            this._state = Callee.END;
        }
        return result;
    };
    score() {
        return this._score;
    }
};