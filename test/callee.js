module.exports = class Callee {
    static UP = 'up';
    static DOWN = 'down';
    static CORRECT = 'correct';
    static ERROR = 'error';

    _answer;
    constructor(begin = 0, end = 100) {
        this._answer = begin + Math.floor(Math.random() * (end - begin + 1));
    };
    guess(number) {
        if (number < this._answer) return Callee.UP;
        else if (number === this._answer) return Callee.CORRECT;
        else if (number > this._answer) return Callee.DOWN;
        else return Callee.ERROR;
    };
};