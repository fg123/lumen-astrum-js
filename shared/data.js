const structures = {
    'Command Base': {
        'description': 'Main Base. Defend yours while destroying opponent\'s.',
        'health': 250,
        'shield': 0,
        'width': 2,
        'turnsToBuild': 0,
        'options':
            [
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
                    'title': 'Build AI Core',
                    'cost': 600,
                    'prereq': [],
                    'type': 'Structure',
                    'description': '{AI Core}',
                    'icon': '{AI Core}',
                    'command': 'build-AI Core'
                },
                {
                    'title': 'Build Factory',
                    'cost': 800,
                    'prereq': [],
                    'type': 'Structure',
                    'description': '{Factory}',
                    'icon': '{Factory}',
                    'command': 'build-Factory'
                },
                {
                    'title': 'Build Scouting Tower',
                    'cost': 400,
                    'prereq': [],
                    'type': 'Structure',
                    'description': '{Scouting Tower}',
                    'icon': '{Scouting Tower}',
                    'command': 'build-Scouting Tower'
                },
                {
                    'title': 'Build Artillery Bay',
                    'cost': 1100,
                    'prereq': [],
                    'type': 'Structure',
                    'description': '{Artillery Bay}',
                    'icon': '{Artillery Bay}',
                    'command': 'build-Artillery Bay'
                },
                {
                    'title': 'Build Automation Factory',
                    'cost': 750,
                    'prereq': [],
                    'type': 'Structure',
                    'description': '{Automation Factory}',
                    'icon': '{Automation Factory}',
                    'command': 'build-Automation Factory'
                },
                {
                    'title': 'Build Armory',
                    'cost': 1500,
                    'prereq': [],
                    'type': 'Structure',
                    'description': '{Armory}',
                    'icon': '{Armory}',
                    'command': 'build-Armory'
                },
                {
                    'title': 'Build Tech Lab',
                    'cost': 2500,
                    'prereq': ['Armory'],
                    'type': 'Structure',
                    'description': '{Tech Lab}',
                    'icon': '{Tech Lab}',
                    'command': 'build-Tech Lab'
                },
                {
                    'title': 'Build Military Academy',
                    'cost': 3500,
                    'prereq': ['Tech Lab'],
                    'type': 'Structure',
                    'description': '{Military Academy}',
                    'icon': '{Military Academy}',
                    'command': 'build-Military Academy'
                },
                {
                    'title': 'Build Mech Facility',
                    'cost': 1400,
                    'prereq': [],
                    'type': 'Structure',
                    'description': '{Mech Facility}',
                    'icon': '{Mech Facility}',
                    'command': 'build-Mech Facility'
                },
                {
                    'title': 'Build Spec Ops Facility',
                    'cost': 1500,
                    'prereq': [],
                    'type': 'Structure',
                    'description': '{Spec Ops Facility}',
                    'icon': '{Spec Ops Facility}',
                    'command': 'build-Spec Ops Facility'
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
                },
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
                    'title': 'Spawn Medic',
                    'cost': 250,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Medic}',
                    'icon': '{Medic}',
                    'command': 'spawn-Medic'
                },
                {
                    'title': 'Spawn Guardian',
                    'cost': 350,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Guardian}',
                    'icon': '{Guardian}',
                    'command': 'spawn-Guardian'
                },
                {
                    'title': 'Spawn RDS Trooper',
                    'cost': 600,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{RDS Trooper}',
                    'icon': '{RDS Trooper}',
                    'command': 'spawn-RDS Trooper'
                },
                {
                    'title': 'Spawn Praetorian',
                    'cost': 950,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Praetorian}',
                    'icon': '{Praetorian}',
                    'command': 'spawn-Praetorian'
                }
            ]
    },
    'AI Core': {
        'description': 'Production building, required for building and upgrading Pioneers, Legionnaire Squad, Maintenance Drones, and Reavers.',
        'health': 10,
        'shield': 40,
        'width': 1,
        'turnsToBuild': 1,
        'options':
            [
                {
                    'title': 'Spawn Pioneers',
                    'cost': 125,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Pioneers}',
                    'icon': '{Pioneers}',
                    'command': 'spawn-Pioneers'
                },
                {
                    'title': 'Spawn Maintenance Drone',
                    'cost': 275,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Maintenance Drone}',
                    'icon': '{Maintenance Drone}',
                    'command': 'spawn-Maintenance Drone'
                },
                {
                    'title': 'Spawn Legionnaires Squad',
                    'cost': 250,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Legionnaire Squad}',
                    'icon': '{Legionnaire Squad}',
                    'command': 'spawn-Legionnaire Squad'
                },
                {
                    'title': 'Spawn Reaver',
                    'cost': 550,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Reaver}',
                    'icon': '{Reaver}',
                    'command': 'spawn-Reaver'
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
    'Factory': {
        'description': 'Unit production building, trains Ocelot Teams, Golems, Mantis Swarm, and Lancers.',
        'health': 100,
        'shield': 0,
        'width': 1,
        'turnsToBuild': 1,
        'options':
            [
                {
                    'title': 'Spawn Ocelot Team',
                    'cost': 750,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Ocelot Team}',
                    'icon': '{Ocelot Team}',
                    'command': 'spawn-Ocelot Team'
                },
                {
                    'title': 'Spawn Mantis',
                    'cost': 700,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Mantis}',
                    'icon': '{Mantis}',
                    'command': 'spawn-Mantis'
                },
                {
                    'title': 'Spawn Golem',
                    'cost': 750,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Golem}',
                    'icon': '{Golem}',
                    'command': 'spawn-Golem'
                },
                {
                    'title': 'Spawn Lancer',
                    'cost': 850,
                    'prereq': ['Artillery Bay'],
                    'type': 'Unit',
                    'description': '{Lancer}',
                    'icon': '{Lancer}',
                    'command': 'spawn-Lancer'
                }
            ]
    },
    'Artillery Bay': {
        'description': 'Support facility, required for building and upgrading Lancers, and Dragons.',
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
    'Mech Facility': {
        'description': 'Unit production building, trains Annihilators and Dragons.',
        'health': 100,
        'shield': 0,
        'width': 1,
        'turnsToBuild': 1,
        'options':
            [
                {
                    'title': 'Spawn MZ-103 Annihilator',
                    'cost': 1200,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Annihilator}',
                    'icon': '{Annihilator}',
                    'command': 'spawn-Annihilator'
                },
                {
                    'title': 'Spawn Dragons',
                    'cost': 1300,
                    'prereq': ['Artillery Bay'],
                    'type': 'Unit',
                    'description': '{Dragons}',
                    'icon': '{Dragons}',
                    'command': 'spawn-Dragons'
                }
            ]
    },
    'Military Academy': {
        'description': 'Support facility, used for accessing tier 4 units.',
        'health': 100,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'options': [],
    },
    'Spec Ops Facility': {
        'description': 'Unit production building, trains Shadow Huntresses and Harbingers.',
        'health': 75,
        'shield': 0,
        'width': 1,
        'turnsToBuild': 1,
        'options':
            [
                {
                    'title': 'Spawn Shadow Huntress',
                    'cost': 1000,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Shadow Huntress}',
                    'icon': '{Shadow Huntress}',
                    'command': 'spawn-Shadow Huntress'
                },
                {
                    'title': 'Spawn Harbinger',
                    'cost': 1350,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Harbinger}',
                    'icon': '{Harbinger}',
                    'command': 'spawn-Harbinger'
                }
            ]
    },
    'Deployment Outpost': {
        'description': 'Allows expansion of buildings away from the command center.',
        'health': 50,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'options': [],
    },
    'Scouting Tower': {
        'description': 'Scouting facility. Can create probes or observers.',
        'health': 50,
        'shield': 0,
        'width': 0,
        'turnsToBuild': 1,
        'options':
            [
                {
                    'title': 'Launch a Probe',
                    'cost': 50,
                    'prereq': [],
                    'type': 'Action',
                    'description': 'Gains vision of a small area until the end of the turn.',
                    'icon': '{1,2}',
                    'command': 'custom-launchProbe'
                },
                {
                    'title': 'Spawn Observer',
                    'cost': 250,
                    'prereq': [],
                    'type': 'Unit',
                    'description': '{Observer}',
                    'icon': '{Observer}',
                    'command': 'spawn-Observer'
                }
            ]
    },
    'Harvester': {
        'description': 'Building that harvests minerals.',
        'health': 30,
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
    'Medic': {
        'advantagedamage': 0,
        'attackrange': 0,
        'damage': 0,
        'description': 'Support unit. Heals friendly units.',
        'health': 18,
        'moverange': 3,
        'shield': 0,
        'sightrange': 3,
        'special': 'Heal',
        'squadsize': 1,
        'tier': 1,
        'turnsToBuild': 1,
        'options': [{
            'title': 'Heal Unit',
            'cost': 0,
            'prereq': [],
            'type': 'Action',
            'description': 'Heal a Friendly Unit for 15 Health',
            'icon': '{Medic}',
            'command': 'custom-healUnit'
        }],
        'unitclass': 'Medical, Biological',
        'custom': {
            'healFor': 15
        }
    },
    'Pioneers': {
        'advantage': 'Biological',
        'advantagedamage': 0,
        'attackrange': 1,
        'damage': 5,
        'description': 'Weak scouting unit. More powerful than conventional scout, but uses a melee-only attack.',
        'health': 5,
        'moverange': 5,
        'shield': 10,
        'sightrange': 5,
        'squadsize': 5,
        'tier': 1,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Light, Mechanical'
    },
    'Maintenance Drone': {
        'advantagedamage': 0,
        'attackrange': 1,
        'damage': 0,
        'description': 'Slow-moving support unit. Creates an range 3 aura that regenerates shield twice in a turn.',
        'health': 5,
        'moverange': 3,
        'shield': 10,
        'sightrange': 3,
        'special': 'ShieldRegenerationAura',
        'squadsize': 1,
        'tier': 1,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Medical, Mechanical'
    },
    'Legionnaire Squad': {
        'advantagedamage': 0,
        'attackrange': 2,
        'damage': 10,
        'description': 'Reliable and cheap infantry. Shield protects against early-game ambushes.',
        'health': 1,
        'moverange': 4,
        'shield': 24,
        'sightrange': 3,
        'squadsize': 4,
        'tier': 1,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Mechanical'
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
            'title': 'Repair Structure',
            'cost': 0,
            'prereq': [],
            'type': 'Action',
            'description': 'Repair a Friendly Structure for 20 Health',
            'icon': '{Combat Engineer}',
            'command': 'custom-repairStructure'
        },
        {
            'title': 'Build Deployment Outpost',
            'cost': 400,
            'prereq': [],
            'type': 'Structure',
            'description': '{Deployment Outpost}',
            'icon': '{Deployment Outpost}',
            'command': 'build-Deployment Outpost'
        },
        {
            'title': 'Build Turret',
            'cost': 250,
            'prereq': ['Automation Factory'],
            'type': 'Unit',
            'description': '{Turret}',
            'icon': '{Turret}',
            'command': 'spawn-Turret'
        },
        {
            'title': 'Build Harvester',
            'cost': 300,
            'prereq': [],
            'type': 'Structure',
            'description': '{Harvester}',
            'icon': '{Harvester}',
            'command': 'build-Harvester'
        }],
        'custom': {
            'repairFor': 20
        }
    },
    'Guardian': {
        'advantagedamage': 0,
        'attackrange': 2,
        'damage': 20,
        'description': 'Ranged defensive unit. Strong when locked down.',
        'health': 45,
        'moverange': 3,
        'shield': 0,
        'sightrange': 4,
        'special': 'Lockdown',
        'squadsize': 2,
        'tier': 2,
        'turnsToBuild': 1,
        'unitclass': 'Light, Biological',
        'options':
            [
                {
                    'title': 'Lockdown',
                    'cost': 0,
                    'prereq': [],
                    'type': 'Action',
                    'description': 'Locks down the Guardian, increasing attack range to ' +
                                   '4 but reducing movement range to 0.',
                    'icon': '{0,2}',
                    'command': 'custom-guardianLockdown'
                }
            ],
        'custom': {
            'lockedDownMoveRange': 0,
            'lockedDownAttackRange': 4
        }
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
    'Ocelot Team': {
        'advantagedamage': 0,
        'attackrange': 2,
        'damage': 20,
        'description': 'Fast-moving hunter unit. Has a high move range for hit-and-run attacks.',
        'health': 25,
        'moverange': 5,
        'shield': 25,
        'sightrange': 3,
        'squadsize': 2,
        'tier': 3,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Light, Mechanical'
    },
    'Golem': {
        'advantagedamage': 0,
        'attackrange': 2,
        'damage': 25,
        'description': 'Slow-moving juggernaut that can take tremendous amounts of damage. Average against all.',
        'health': 20,
        'moverange': 3,
        'shield': 80,
        'sightrange': 3,
        'squadsize': 1,
        'tier': 3,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Heavy, Mechanical'
    },
    'Mantis': {
        'advantage': 'Heavy',
        'advantagedamage': 40,
        'attackrange': 3,
        'damage': 20,
        'description': 'Counter unit. Very effective against heavy units.',
        'health': 65,
        'moverange': 3,
        'shield': 0,
        'sightrange': 4,
        'squadsize': 1,
        'tier': 3,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Biological'
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
    },
    'RDS Trooper': {
        'advantagedamage': 0,
        'attackrange': 2,
        'damage': 30,
        'description': 'Well-balanced infantry unit. Average against all units.',
        'health': 60,
        'moverange': 4,
        'shield': 15,
        'sightrange': 3,
        'squadsize': 5,
        'tier': 3,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Biological'
    },
    'Praetorian': {
        'advantage': 'Cloaked',
        'advantagedamage': 50,
        'attackrange': 3,
        'damage': 15,
        'description': 'Fragile counter unit. Has large radius of vision and deals devastating damage to cloaked units.',
        'health': 50,
        'moverange': 3,
        'shield': 0,
        'sightrange': 5,
        'squadsize': 1,
        'tier': 3,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Biological, Detector'
    },
    'Shadow Huntress': {
        'advantage': 'Mechanical',
        'advantagedamage': 0,
        'attackrange': 3,
        'damage': 35,
        'description': 'Agile Infiltrator unit. Deals heavy ranged damage, especially effective against buildings.',
        'health': 50,
        'moverange': 3,
        'shield': 0,
        'sightrange': 3,
        'special': 'Stealth',
        'squadsize': 1,
        'tier': 4,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Light, Biological, Cloaked',
        'custom': {
            'stealth': 10000
        }
    },
    'Raider': {
        'advantagedamage': 0,
        'attackrange': 2,
        'damage': 50,
        'description': 'Strong infantry unit. High in health and damage.',
        'health': 75,
        'moverange': 3,
        'shield': 50,
        'sightrange': 3,
        'squadsize': 1,
        'tier': 4,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Heavy, Biological'
    },
    'Annihilator': {
        'advantagedamage': 0,
        'attackrange': 2,
        'damage': 40,
        'description': 'Slow-moving mechanical juggernaut. Strong against everything.',
        'health': 50,
        'moverange': 3,
        'shield': 125,
        'sightrange': 1,
        'squadsize': 1,
        'tier': 4,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Heavy, Mechanical'
    },
    'Dragon': {
        'advantagedamage': 0,
        'attackrange': 4,
        'damage': 50,
        'description': 'High-damage artillery unit. Very strong against single targets',
        'health': 5,
        'moverange': 1,
        'shield': 45,
        'sightrange': 1,
        'special': 'Recharge1',
        'squadsize': 1,
        'tier': 4,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Heavy, Mechanical',
        'custom': {
            'attackCooldown': 2
        }
    },
    'Harbinger': {
        'advantagedamage': 0,
        'attackrange': 4,
        'damage': 35,
        'description': 'AOE artillery unit. Deals heavy damage.',
        'health': 50,
        'moverange': 2,
        'shield': 0,
        'sightrange': 3,
        'special': 'Splash-16',
        'squadsize': 1,
        'tier': 4,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Heavy, Biological',
        'custom': {
            'splashDamage': 16,
            'splashRange': 1
        }
    },
    'Observer': {
        'advantagedamage': 0,
        'attackrange': 0,
        'damage': 0,
        'description': 'Far-sight recon unit capable of seeing stealthed units.',
        'health': 20,
        'moverange': 5,
        'shield': 0,
        'sightrange': 5,
        'squadsize': 1,
        'tier': 3,
        'turnsToBuild': 1,
        'options': [],
        'unitclass': 'Biological',
        'custom': {
            'superVision': 10000
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
