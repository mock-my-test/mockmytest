// const test = require(process.argv[2]);
const Game = require('./caller');

const game_count = 500;
const limit_guess_count = 10;
const begin = 0, end = 100;
const game = new Game(game_count, limit_guess_count, begin, end);

game.program((_begin, _end) => {
    let lower_bound = _begin;
    let upper_bound = _end;

    let result;
    while ((result != Game.NEXTGAME) && (result != Game.FINISHED)) {
        let number = Math.ceil((upper_bound + lower_bound) / 2);
        // let number = begin + Math.floor(Math.random() * (upper_bound - lower_bound + 1));
        // let number = lower_bound;
        result = game.guess(number);
        console.log('guess', number, 'lower_bound:', lower_bound, 'upper_bound:', upper_bound, 'result:', result);
        switch (result) {
            case Game.UP:
                lower_bound = number + 1;
                break;
            case Game.DOWN:
                upper_bound = number - 1;
                break;
            default:
                lower_bound = begin;
                upper_bound = end;
                break;
        }
    }
});
console.log('score:', game.score());
console.log('success:', game.score().filter(a => !!a).length, 'failed:', game.score().filter(a => !!!a).length)
console.log('average:', game.score().reduce((a, b) => a + b, 0) / game.score().filter(a => a).length);