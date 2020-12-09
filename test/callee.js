const UP = 'up';
const DOWN = 'down';
const CORRECT = 'correct';
const ERROR = 'error';

const Callee = function (begin = 0, end = 100) {
    var that = {};

    const _answer = begin + Math.floor(Math.random() * (end - begin + 1));

    that.guess = function (number) {
        if (number < _answer) return UP;
        else if (number === _answer) return CORRECT;
        else if (number > _answer) return DOWN;
        else return ERROR;
    }

    return that;
}

module.exports = Callee;

module.exports.UP = UP;
module.exports.DOWN = DOWN;
module.exports.CORRECT = CORRECT;
module.exports.ERROR = ERROR;