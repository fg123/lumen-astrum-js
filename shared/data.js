const structures = {
    'Command Base': {
        'description': 'Main Base. Defend yours while destroying opponent\'s.',
        'health': 250,
        'shield': 0,
        'width': 1,
        'turnsToBuild': 0,
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
                    'cost': 300,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Engineer}',
                    'icon': '{Engineer}',
                    'command': 'spawn-Engineer'
                }
            ]
    },
    'Barracks': {
        'description': 'Unit production building, trains tier 2 units.',
        'health': 60,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
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
                    'cost': 850,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Golem}',
                    'icon': '{Golem}',
                    'command': 'spawn-Golem'
                }
            ]
    },
    'Automation Factory': {
        'description': 'Support facility, required for building turrets.',
        'health': 75,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'options': [],
    },
    'Tech Lab': {
        'description': 'Support facility, used for accessing tier 3 units.',
        'health': 100,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'options': [],
    },
    'Military Academy': {
        'description': 'Support facility, used for accessing tier 4 units.',
        'health': 100,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'options': [],
    },
    'Deployment Outpost': {
        'description': 'Claims territory and allows expansion of buildings away from the command center.',
        'health': 50,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'options': [],
    }
};

const units = {
    'Scout': {
        'attackrange': 0,
        'damage': 0,
        'description': 'Scouting unit, high movement range, cannot attack.',
        'health': 15,
        'moverange': 5,
        'shield': 0,
        'sightrange': 5,
        'tier': 1,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Light, Biological'
    },
    'Marine': {
        'advantagedamage': 0,
        'attackrange': 2,
        'damage': 10,
        'description': 'Sturdy and cheap-to-produce infantry unit.',
        'health': 30,
        'moverange': 4,
        'shield': 0,
        'sightrange': 3,
        'tier': 1,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Light, Biological',
        'custom': {
            'muzzle': {
                'x': 0,
                'y': -65
            }
        }
    },
    'Engineer': {
        'advantagedamage': 0,
        'attackrange': 0,
        'damage': 0,
        'description': 'Constructs buildings during the planning phase.',
        'health': 12,
        'moverange': 3,
        'shield': 0,
        'sightrange': 3,
        'tier': 1,
        'turnsToBuild': 1,
        'unitclass': 'Biological',
        'options': [{
            'title': 'Build Deployment Outpost',
            'cost': 400,
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
        }]
    },
    'Reaver': {
        'advantagedamage': 0,
        'attackrange': 0,
        'damage': 0,
        'description': 'Kamakazi unit. One time use, high damage.',
        'health': 5,
        'moverange': 4,
        'shield': 20,
        'sightrange': 1,
        'special': 'Splash',
        'squadsize': 1,
        'tier': 2,
        'turnsToBuild': 1,
        'unitclass': 'Light, Mechanical',
        'options':
            [
                {
                    'title': 'Detonate',
                    'cost': 0,
                    'prereq': [],
                    'type': 'Action',
                    'description': 'Explodes in a circle, dealing damage and killing itself.',
                    'icon': '{2,2}',
                    'command': 'custom-detonateReaver'
                }
            ],
        'custom': {
            'explodeDamage': 50
        }
    },
    'Turret': {
        'advantagedamage': 0,
        'attackrange': 3,
        'damage': 15,
        'description': 'Stationary, single-target ranged turret. (Only available through Biological tech branch)',
        'health': 30,
        'moverange': 0,
        'shield': 0,
        'sightrange': 4,
        'squadsize': 1,
        'tier': 1,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Light, Mechanical'
    },
    'Golem': {
        'advantagedamage': 0,
        'attackrange': 1,
        'damage': 25,
        'description': 'Slow-moving medium artillery unit. Bombards with long-range attacks',
        'health': 5,
        'moverange': 2,
        'shield': 25,
        'sightrange': 1,
        'squadsize': 1,
        'tier': 1,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Mechanical',
        'custom': {
            'attackCooldown': 2
        }
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
