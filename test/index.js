// const test = require(process.argv[2]);
const Game = require('./caller');

const game = Game((begin, end) => {
    let lower_bound = begin;
    let upper_bound = end;

    let result = Game.UP;
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