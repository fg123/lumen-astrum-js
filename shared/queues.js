function eloCalculate() {

}

module.exports = [
    {
        name: '1v1 - Ranked Solo',
        key: '2p',
        description: 'Play a ranked, 1v1 on a variety of maps.',
        playerCount: 2,
        maps: ['2p-duel', '2p-anchor', '2p-cornucopia'],
        eloCalculation: eloCalculate
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
    },
];