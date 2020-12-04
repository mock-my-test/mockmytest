// const test = require(process.argv[2]);
const Game = require('./caller');

const game = new Game();
const play = (game, target_score = 5) => {
    let play_count = 0;
    let upper_bound = 100;
    let lower_bound = 0;
    while (game.score() < target_score) {
        let number = Math.ceil((upper_bound + lower_bound) / 2);
        const result = game.guess(number);
        console.log('guess number:', number, 'result:', result);
        switch (result) {
            case Game.UP:
                lower_bound = number + 1;
                break;
            case Game.DOWN:
                upper_bound = number - 1;
                break;
            case Game.CORRECT:
                console.log('current score:', game.score());
                upper_bound = 100;
                lower_bound = 0;
                play_count++
                game.newGame();
                break;
        }
    }
    console.log('target score:', target_score, 'final score:', game.score(), 'play count:', play_count, 'games');
};

play(game);