const Constants = require('./constants');

const structures = {
    'Command Base': {
        'description': 'Main Base. Used to spawn Scouts, Engineers and to construct upgrade modules. Cannot be destroyed.',
        'health': 250,
        'shield': 0,
        'width': 1,
        'turnsToBuild': 0,
        'sightRange': 4,
        'options':
            [
                {
                    'title': 'Spawn Scout',
                    'cost': 100,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Scout}',
                    'icon': '{Scout}',
                    'command': 'spawn-Scout'
                },
                {
                    'title': 'Spawn Engineer',
                    'cost': 400,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Engineer}',
                    'icon': '{Engineer}',
                    'command': 'spawn-Engineer'
                },
                {
                    'title': 'Build Stim Lab',
                    'cost': 2000,
                    'prereq': [],
                    'type': 'Structure',
                    'description': '{Stim Lab}',
                    'icon': '{Stim Lab}',
                    'command': 'build-Stim Lab'
                },
                {
                    'title': 'Build Artillery Bay',
                    'cost': 2000,
                    'prereq': [],
                    'type': 'Structure',
                    'description': '{Artillery Bay}',
                    'icon': '{Artillery Bay}',
                    'command': 'build-Artillery Bay'
                },
                {
                    'title': 'Build Cloud Gate',
                    'cost': 2000,
                    'prereq': [],
                    'type': 'Structure',
                    'description': '{Cloud Gate}',
                    'icon': '{Cloud Gate}',
                    'command': 'build-Cloud Gate'
                },
                {
                    'title': 'Build Vitality Fountain',
                    'cost': 2000,
                    'prereq': [],
                    'type': 'Structure',
                    'description': '{Vitality Fountain}',
                    'icon': '{Vitality Fountain}',
                    'command': 'build-Vitality Fountain'
                },
            ],
        'targetable': false
    },
    'Barracks': {
        'description': 'Unit production building, trains combat units.',
        'health': 200,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'sightRange': 1,
        'options':
            [
                {
                    'title': 'Spawn Marine',
                    'cost': 250,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Marine}',
                    'icon': '{Marine}',
                    'command': 'spawn-Marine'
                },
                {
                    'title': 'Spawn Golem',
                    'cost': 250,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Golem}',
                    'icon': '{Golem}',
                    'command': 'spawn-Golem'
                },
                {
                    'title': 'Spawn Reaver',
                    'cost': 300,
                    'prereq': ['Automation Factory'],
                    'type': 'Unit',
                    'description': '{Reaver}',
                    'icon': '{Reaver}',
                    'command': 'spawn-Reaver'
                },
                {
                    'title': "Build Thieves' Cave",
                    'cost': 1000,
                    'prereq': [],
                    'type': 'Structure',
                    'description': "{Thieves' Cave}",
                    'icon': "{Thieves' Cave}",
                    'command': "build-Thieves' Cave"
                },
                {
                    'title': 'Build Vampiric Lair',
                    'cost': 1000,
                    'prereq': [],
                    'type': 'Structure',
                    'description': '{Vampiric Lair}',
                    'icon': '{Vampiric Lair}',
                    'command': 'build-Vampiric Lair'
                },
                {
                    'title': "Build Shauna's Forge",
                    'cost': 1000,
                    'prereq': [],
                    'type': 'Structure',
                    'description': "{Shauna's Forge}",
                    'icon': "{Shauna's Forge}",
                    'command': "build-Shauna's Forge"
                },
                {
                    'title': "Build Flash Point",
                    'cost': 1000,
                    'prereq': [],
                    'type': 'Structure',
                    'description': "{Flash Point}",
                    'icon': "{Flash Point}",
                    'command': "build-Flash Point"
                },
                {
                    'title': "Build Arctic Tower",
                    'cost': 1000,
                    'prereq': [],
                    'type': 'Structure',
                    'description': "{Arctic Tower}",
                    'icon': "{Arctic Tower}",
                    'command': "build-Arctic Tower"
                }
            ]
    },
    'Automation Factory': {
        'description': 'Support facility, required for building turrets and reavers.',
        'health': 75,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'sightRange': 1,
        'options': []
    },
    'Tech Lab': {
        'description': 'Support facility, used for accessing tier 3 units.',
        'health': 100,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'sightRange': 1,
        'options': [],
    },
    'Military Academy': {
        'description': 'Support facility, used for accessing tier 4 units.',
        'health': 100,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'sightRange': 1,
        'options': [],
    },
    'Deployment Outpost': {
        'description': 'Claims territory and allows expansion of buildings away from the command center.',
        'health': 200,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'sightRange': 4,
        'options': [],
    },
    'Ether Harvester': {
        // The harvester health represents amount of gold provided.
        'description': 'Standard resource harvester. Construct a Deployment Outpost nearby to claim.',
        'health': 10000,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 0,
        'sightRange': 1,
        'options': [],
        'custom': {
            'value': 100
        },
        'targetable': false
    },
    'Gem Harvester': {
        'description': 'Upgraded resource harvester. Construct a Deployment Outpost nearby to claim.',
        'health': 100,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 0,
        'sightRange': 1,
        'options': [],
        'custom': {
            'value': 150
        }
    },
    'Stim Lab': {
        'description': 'Takes 2 turns to build. Enhances attack speed of allies by 25%.',
        'health': 250,
        'shield': 0,
        'width': 0,
        'turnsToBuild': Constants.IS_PRODUCTION ? 2 : 1,
        'options': [],
        'sightRange': 1,
        'custom': {
            'attackSpeedMultiplier': 1.25
        }
    },
    "Thieves' Cave": {
        'description': "Takes 2 turns to build. Produced unit's attacks generate gold equal to 75% of damage dealt.",
        'health': 250,
        'shield': 0,
        'width': 0,
        'turnsToBuild': Constants.IS_PRODUCTION ? 2 : 1,
        'options': [],
        'sightRange': 1,
        'custom': {
            'attackGoldGen': 0.75,
        }
    },
    "Artillery Bay": {
        'description': 'Takes 2 turns to build. Enhances attack damage of allies by 30%.',
        'health': 250,
        'shield': 0,
        'width': 0,
        'turnsToBuild': Constants.IS_PRODUCTION ? 2 : 1,
        'options': [],
        'sightRange': 1,
        'custom': {
            'attackDamageMultiplier': 1.3,
        }
    },
    "Cloud Gate": {
        'description': 'Takes 2 turns to build. Enhances movement range of allies by 2.',
        'health': 250,
        'shield': 0,
        'width': 0,
        'turnsToBuild': Constants.IS_PRODUCTION ? 2 : 1,
        'options': [],
        'sightRange': 1,
        'custom': {
            'moveRangeDelta': 2,
        }
    },
    "Vitality Fountain": {
        'description': 'Takes 2 turns to build. Enhances health of allies by 50%.',
        'health': 250,
        'shield': 0,
        'width': 0,
        'turnsToBuild': Constants.IS_PRODUCTION ? 2 : 1,
        'options': [],
        'sightRange': 1,
        'custom': {
            'healthMultiplier': 1.50,
        }
    },
    "Turret": {
        'description': 'Requires Automation Factory. Stationary, single-target ranged turret.',
        'health': 100,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'sightRange': 1,
        'options': []
    },
    "Vampiric Lair": {
        'description': 'Takes 2 turns to build. Produced units heal for 10% of damage dealt.',
        'health': 250,
        'shield': 0,
        'width': 0,
        'turnsToBuild': Constants.IS_PRODUCTION ? 2 : 1,
        'options': [],
        'sightRange': 1,
        'custom': {
            'healMultiplier': 0.10,
        }
    },
    "Shauna's Forge": {
        'description': "Takes 2 turns to build. Produced unit's attacks deal 2% of enemy's total health as extra damage.",
        'health': 250,
        'shield': 0,
        'width': 0,
        'turnsToBuild': Constants.IS_PRODUCTION ? 2 : 1,
        'options': [],
        'sightRange': 1,
        'custom': {
            'healthMultiplier': 0.02
        }
    },
    "Flash Point": {
        'description': "Takes 2 turns to build. Produced units blink to their target location if within move range.",
        'health': 250,
        'shield': 0,
        'width': 0,
        'turnsToBuild': Constants.IS_PRODUCTION ? 2 : 1,
        'sightRange': 1,
        'options': []
    },
    "Arctic Tower": {
        'description': "Takes 2 turns to build. Produced units stun enemies hit for 0.2s.",
        'health': 250,
        'shield': 0,
        'width': 0,
        'turnsToBuild': Constants.IS_PRODUCTION ? 2 : 1,
        'sightRange': 1,
        'options': [],
        'custom': {
            'stunDuration': 200
        }
    },
};

const units = {
    'Scout': {
        'attackRange': 0,
        'attackSpeed': 0,
        'damage': 0,
        'description': 'Scouting unit, high movement range, cannot attack.',
        'health': 15,
        'moveRange': 8,
        'shield': 0,
        'sightRange': 4,
        'tier': 1,
        'turnsToBuild': 1,
        'options': []
    },
    'Marine': {
        'attackRange': 2,
        'attackSpeed': 0.8,
        'damage': 5,
        'description': 'Sturdy and cheap-to-produce infantry unit.',
        'health': 40,
        'moveRange': 5,
        'shield': 0,
        'sightRange': 2,
        'tier': 1,
        'turnsToBuild': 1,
        'options': [],
        'custom': {
            'muzzle': {
                'x': 0,
                'y': -65
            }
        }
    },
    'Engineer': {
        'attackRange': 0,
        'attackSpeed': 0,
        'damage': 0,
        'description': 'Constructs buildings during the planning phase.',
        'health': 12,
        'moveRange': 3,
        'shield': 0,
        'sightRange': 2,
        'tier': 1,
        'turnsToBuild': 1,
        'options': [{
            'title': 'Build Deployment Outpost',
            'cost': 500,
            'prereq': [],
            'type': 'Structure',
            'description': '{Deployment Outpost}',
            'icon': '{Deployment Outpost}',
            'command': 'build-Deployment Outpost'
        },
        {
            'title': 'Build Barracks',
            'cost': 400,
            'prereq': [],
            'type': 'Structure',
            'description': '{Barracks}',
            'icon': '{Barracks}',
            'command': 'build-Barracks'
        },
        {
            'title': 'Build Automation Factory',
            'cost': 100,
            'prereq': [],
            'type': 'Structure',
            'description': '{Automation Factory}',
            'icon': '{Automation Factory}',
            'command': 'build-Automation Factory'
        },
        {
            'title': 'Build Turret',
            'cost': 400,
            'prereq': ['Automation Factory'],
            'type': 'Structure',
            'description': '{Turret}',
            'icon': '{Turret}',
            'command': 'build-Turret'
        }
    ]},
    'Reaver': {
        'attackRange': 0,
        'attackSpeed': 0,
        'damage': 0,
        'description': 'Requires Automation Factory. The Reaver explodes when dying, dealing 50 damage to all units range 1, and 25 range 2.',
        'health': 30,
        'moveRange': 3,
        'shield': 0,
        'sightRange': 2,
        'squadsize': 1,
        'tier': 1,
        'turnsToBuild': 1,
        'options': [],
        'custom': {
            'explodeDamage1': 50,
            'explodeDamage2': 25
        }
    },
    'Armed Turret': {
        'attackRange': 3,
        'attackSpeed': 1.5,
        'damage': 5,
        'description': 'This is constructed by the Turret building.',
        'health': 100,
        'moveRange': 0,
        'shield': 0,
        'sightRange': 3,
        'squadsize': 1,
        'tier': 1,
        'turnsToBuild': 0,
        'options': []
    },
    'Golem': {
        'attackRange': 1,
        'attackSpeed': 0.5,
        'damage': 10,
        'description': 'Slow-moving melee unit.',
        'health': 120,
        'moveRange': 3,
        'shield': 0,
        'sightRange': 1,
        'squadsize': 1,
        'tier': 1,
        'turnsToBuild': 1,
        'options': []
    }
};

module.exports.structures = structures;
module.exports.units = units;
module.exports.structureList = Object.keys(structures);
module.exports.unitList = Object.keys(units);
module.exports.getBaseObject = (name) => {
    if (name in structures) {
        return structures[name];
    }
    else if (name in units) {
        return units[name];
    }
    else {
        throw 'Cannot find map object ' + name;
    }
};
