module.exports = class Callee {
    static UP = 'up';
    static DOWN = 'down';
    static CORRECT = 'correct';

    _answer;
    constructor(answer) {
        if (answer) this._answer = answer;
        else this.resetAnswer();
    };
    resetAnswer = function () {
        this._answer = Math.floor(Math.random() * 101); // generate random number between 0 to 100
    };
    getAnswer = function () {
        return this._answer;
    };
    guessAnswer = function (number) {
        if (number < this._answer) return Callee.UP;
        else if (number === this._answer) return Callee.CORRECT;
        else return Callee.DOWN;
    };
};