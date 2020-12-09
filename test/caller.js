const Callee = require('./callee');

const UP = Callee.UP;
const DOWN = Callee.DOWN;
const CORRECT = Callee.CORRECT;
const ERROR = Callee.ERROR;
const NEXTGAME = 'next_game';
const FINISHED = 'finished';

const Caller = function (algorithm, game_count = 5, limit_guess_count = 10, begin = 0, end = 100) {
    that = {};

    var _callee = Callee(begin, end);
    var _score = [];
    var _guess_count = 0;

    const newGame = function (score) {
        _score.push(score);
        _callee = Callee(begin, end);
        _guess_count = 0;
    }

    that.guess = function (number) {
        if (_score.length >= game_count) return FINISHED;

        _guess_count++;
        if (_guess_count > limit_guess_count) {
            newGame(0);
            return NEXTGAME;
        }

        switch (_callee.guess(number)) {
            case UP:
                return UP;
            case DOWN:
                return DOWN;
            case CORRECT:
                newGame(_guess_count);
                return NEXTGAME;
            default:
                return ERROR;
        }
    }

    that.score = function () {
        while (_score.length < game_count) {
            algorithm(begin, end);
        }
        return _score;
    }

    return that;
}

module.exports = Caller;
module.exports.UP = UP;
module.exports.DOWN = DOWN;
module.exports.ERROR = ERROR;
module.exports.NEXTGAME = NEXTGAME;
module.exports.FINISHED = FINISHED;