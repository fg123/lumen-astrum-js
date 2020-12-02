const { eloCalculate } = require('./elo');
const Constants = require('./constants');

const queues = [
    {
        name: '1v1 - Ranked Solo',
        key: '2pRanked',
        description: 'Play a ranked, 1v1 on a variety of maps.',
        playerCount: 2,
        maps: ['2p-duel', '2p-anchor', '2p-cornucopia'],
        eloCalculation: eloCalculate
    },
    {
        name: '1v1 - Unranked Solo',
        key: '2pUnranked',
        description: 'Play an unranked, 1v1 on experimental maps.',
        playerCount: 2,
        maps: ['2p-coliseum'],
        eloCalculation: undefined
    },
    {
        name: 'Raid Boss',
        key: '3p',
        description: 'Play the 2v1 Raidboss mode!',
        playerCount: 3,
        maps: ['3p'],
        eloCalculation: undefined
    },
    {
        name: '2v2 - Ranked Duo',
        key: '2v2',
        description: 'Play a ranked, 2v2!',
        playerCount: 4,
        maps: ['2v2'],
        eloCalculation: eloCalculate
    },
    {
        name: 'FFA - Unranked',
        key: '4p',
        description: 'Play an unranked, 4 player map! Everyone for themselves.',
        playerCount: 4,
        maps: ['4p'],
        eloCalculation: undefined
    }
];

if (!Constants.IS_PRODUCTION) {
    queues.push( {
        name: 'TestMap',
        key: 'testmap',
        description: 'TESTMAP',
        playerCount: 2,
        maps: ['2p-anchor-ghost'],
        eloCalculation: undefined
    });
}
module.exports = queues;