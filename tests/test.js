const testFolder = __dirname;
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const splitargs = require('splitargs');
const Constants = require('../shared/constants');
const Game = require('../server/game');
const { setupMap } = require('../shared/map');
const { PhaseChangeStateChange, BuildStructureStateChange } = require('../shared/state-change');
const { Tuple } = require('../shared/coordinates');

function log(...args) {
    console.log(chalk.blue('[TEST]'), ...args);
}

function pass(...args) {
    console.log(chalk.green('[PASS]'), ...args);
}

function error(...args) {
    console.log(chalk.red('[ERROR]'), ...args);
}

const testsToRun = [];
const verboseMode = false;
for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === '-v') {
        verboseMode = true;
    }
    else {
        testsToRun.push(process.argv[i]);
    }
}
if (testsToRun.length === 0) {
    fs.readdirSync(testFolder).forEach(fileName => {
        if (fileName.endsWith('.test')) {
            testsToRun.push(fileName);
        }
    });
}

testsToRun.forEach(f => {
    const fileData = fs.readFileSync(path.join(testFolder, f));
    
    const lines = fileData.toString().split(/\r\n|\r|\n/)
        .map(t => t.trim())
        .filter(t => t.length > 0 && !t.startsWith('#'));

    const game = new Game({
        'A': undefined,
        'B': undefined
    }, Date.now(), () => {}, 'testMap', {
        testMode: true,
        verboseMode: verboseMode
    });

    const state = game.state;

    // Every line should start with a command:
    //   TEST, PLAN, BUILD, ACTION, CHECK
    for (let i = 0; i < lines.length; i++) {
        const parts = splitargs(lines[i]);
        const rest = lines[i].slice(parts[0].length).trim();

        if (parts[0] === 'TEST') {
            log(rest);
        }
        else if (parts[0] === 'PLAN') {
            if (state.phase === Constants.PHASE_ACTION) {
                game.processStateChange(PhaseChangeStateChange.create(state, undefined));
            }
        }
        else if (parts[0] === 'ACTION') {
            if (state.phase === Constants.PHASE_PLANNING) {
                game.processStateChange(PhaseChangeStateChange.create(state, undefined));
            }
        }
        else if (parts[0] === 'BUILD') {
            const player = parts[1];
            const x = parseInt(parts[2]);
            const y = parseInt(parts[3]);
            const structure = parts[4];
            game.processStateChange(BuildStructureStateChange.create(state,
                player, structure, new Tuple(x, y), state.getCommandBase(player)));
        }
        else if (parts[0] === 'CHECK') {
            const fn = new Function('state', 'objAt', `return ${rest};`);
            if (!fn(state, (x, y) => { return state.mapObjects[y][x]; })) {
                error('Condition failed:', rest);
                break;
            }
            else {
                pass(rest);
            }
        }
        else if (parts[0] === 'PRINT') {
            const fn = new Function('state', 'objAt', `return ${rest};`);
            log(fn(state, (x, y) => { return state.mapObjects[y][x]; }));
        }
    }
});