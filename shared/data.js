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
                    'title': 'Spawn Recon Team',
                    'cost': 100,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Recon Team}',
                    'icon': '{Recon Team}',
                    'command': 'spawn-Recon Team'
                },
                {
                    'title': 'Spawn Combat Engineer',
                    'cost': 300,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Combat Engineer}',
                    'icon': '{Combat Engineer}',
                    'command': 'spawn-Combat Engineer'
                }
            ]
    },
    'Barracks': {
        'description': 'Unit production building, trains majority of the units.',
        'health': 60,
        'shield': 0,
        'width': 1,
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
                    'title': 'Spawn Lancer',
                    'cost': 850,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Lancer}',
                    'icon': '{Lancer}',
                    'command': 'spawn-Lancer'
                }
            ]
    },
    'Armory': {
        'description': 'Support facility, used for accessing tier 2 units.',
        'health': 100,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'options': [],
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
        'description': 'Allows expansion of buildings away from the command center.',
        'health': 50,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'options': [],
    }
};

const units = {
    'Recon Team': {
        'advantagedamage': 0,
        'attackrange': 2,
        'damage': 3,
        'description': 'Weak recon unit. Good for scouting out enemy units and providing basic harrasment.',
        'health': 15,
        'moverange': 5,
        'shield': 0,
        'sightrange': 5,
        'squadsize': 2,
        'tier': 1,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Light, Biological'
    },
    'Marine': {
        'advantagedamage': 0,
        'attackrange': 2,
        'damage': 10,
        'description': 'Sturdy and cheap-to-produce infantry unit. useful against early game units.',
        'health': 30,
        'moverange': 4,
        'shield': 0,
        'sightrange': 3,
        'squadsize': 4,
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
    'Combat Engineer': {
        'advantagedamage': 0,
        'attackrange': 0,
        'damage': 0,
        'description': 'Construction unit. Can build turrets, harvesters, deployment outposts and repair structures.',
        'health': 12,
        'moverange': 3,
        'shield': 0,
        'sightrange': 3,
        'special': 'Repair',
        'squadsize': 1,
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
        'tier': 2,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Light, Mechanical'
    },
    'Lancer': {
        'advantagedamage': 0,
        'attackrange': 4,
        'damage': 25,
        'description': 'Slow-moving medium artillery unit. Bombards with long-range attacks',
        'health': 5,
        'moverange': 2,
        'shield': 25,
        'sightrange': 1,
        'squadsize': 1,
        'tier': 3,
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
