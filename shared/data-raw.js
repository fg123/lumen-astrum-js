module.exports.structures = {
    "Command Base": {
        "description": "Main Base. Used to spawn Scouts, Engineers and to construct upgrade modules. Cannot be destroyed.",
        "health": 2500,
        "shield": 0,
        "width": 1,
        "turnsToBuild": 0,
        "sightRange": 4,
        "options": [
            {
                "title": "Spawn Scout",
                "cost": 100,
                "prereq": [],
                "type": "Unit",
                "description": "{Scout}",
                "icon": "icons/scoutIcon.png",
                "command": "spawn-Scout"
            },
            {
                "title": "Spawn Engineer",
                "cost": 400,
                "prereq": [],
                "type": "Unit",
                "description": "{Engineer}",
                "icon": "icons/combatEngineerIcon.png",
                "command": "spawn-Engineer"
            },
            {
                "title": "Build Automation Factory",
                "cost": 200,
                "prereq": [],
                "type": "Structure",
                "description": "{Automation Factory}",
                "icon": "icons/automationFactoryIcon.png",
                "command": "build-Automation Factory"
            },
            {
                "title": "Build Stim Lab",
                "cost": 1500,
                "prereq": [],
                "type": "Structure",
                "description": "{Stim Lab}",
                "icon": "icons/stimLabIcon.png",
                "command": "build-Stim Lab"
            },
            {
                "title": "Build Artillery Bay",
                "cost": 1500,
                "prereq": [],
                "type": "Structure",
                "description": "{Artillery Bay}",
                "icon": "icons/artilleryBayIcon.png",
                "command": "build-Artillery Bay"
            },
            {
                "title": "Build Cloud Gate",
                "cost": 1500,
                "prereq": [],
                "type": "Structure",
                "description": "{Cloud Gate}",
                "icon": "icons/cloudGateIcon.png",
                "command": "build-Cloud Gate"
            },
            {
                "title": "Build Vitality Fountain",
                "cost": 1500,
                "prereq": [],
                "type": "Structure",
                "description": "{Vitality Fountain}",
                "icon": "icons/vitalityIcon.png",
                "command": "build-Vitality Fountain"
            }
        ],
        "targetable": false,
        "custom": {},
        "icon": "icons/commandBaseIcon.png",
        "texture": "structures/commandbase.png"
    },
    "Barracks": {
        "description": "Unit production building, trains combat units.",
        "health": 1000,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 1,
        "sightRange": 1,
        "targetable": true,
        "options": [
            {
                "title": "Spawn Marine",
                "cost": 250,
                "prereq": [],
                "type": "Unit",
                "description": "{Marine}",
                "icon": "icons/marineIcon.png",
                "command": "spawn-Marine"
            },
            {
                "title": "Spawn Golem",
                "cost": 250,
                "prereq": [],
                "type": "Unit",
                "description": "{Golem}",
                "icon": "icons/golemIcon.png",
                "command": "spawn-Golem"
            },
            {
                "title": "Spawn Reaver",
                "cost": 300,
                "prereq": [
                    "Automation Factory"
                ],
                "type": "Unit",
                "description": "{Reaver}",
                "icon": "icons/reaverIcon.png",
                "command": "spawn-Reaver"
            },
            {
                "title": "Build Thieves' Cave",
                "cost": 750,
                "prereq": [],
                "type": "Structure",
                "description": "{Thieves' Cave}",
                "icon": "icons/thievesCaveIcon.png",
                "command": "build-Thieves' Cave"
            },
            {
                "title": "Build Vampiric Lair",
                "cost": 750,
                "prereq": [],
                "type": "Structure",
                "description": "{Vampiric Lair}",
                "icon": "icons/vampiricLairIcon.png",
                "command": "build-Vampiric Lair"
            },
            {
                "title": "Build Shauna's Forge",
                "cost": 750,
                "prereq": [],
                "type": "Structure",
                "description": "{Shauna's Forge}",
                "icon": "icons/shaunaForgeIcon.png",
                "command": "build-Shauna's Forge"
            },
            {
                "title": "Build Flash Point",
                "cost": 750,
                "prereq": [],
                "type": "Structure",
                "description": "{Flash Point}",
                "icon": "icons/flashPointIcon.png",
                "command": "build-Flash Point"
            },
            {
                "title": "Build Argoyle's Tower",
                "cost": 750,
                "prereq": [],
                "type": "Structure",
                "description": "{Argoyle's Tower}",
                "icon": "icons/argoylesTower.png",
                "command": "build-Argoyle's Tower"
            },
            {
                "title": "Build Static Amplifier",
                "cost": 750,
                "prereq": [],
                "type": "Structure",
                "description": "{Static Amplifier}",
                "icon": "icons/staticAmplifierIcon.png",
                "command": "build-Static Amplifier"
            },
            {
                "title": "Build Armory",
                "cost": 750,
                "prereq": [],
                "type": "Structure",
                "description": "{Armory}",
                "icon": "icons/armoryIcon.png",
                "command": "build-Armory"
            },
            {
                "title": "Build Oracle Module",
                "cost": 750,
                "prereq": [],
                "type": "Structure",
                "description": "{Oracle Module}",
                "icon": "icons/oracleModuleIcon.png",
                "command": "build-Oracle Module"
            }
        ],
        "custom": {},
        "icon": "icons/barracksIcon.png",
        "texture": "structures/barracks.png"
    },
    "Automation Factory": {
        "description": "Support facility, required for building turrets and reavers.",
        "health": 250,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 1,
        "sightRange": 1,
        "targetable": true,
        "options": [],
        "custom": {},
        "icon": "icons/automationFactoryIcon.png",
        "texture": "structures/automationfactory.png"
    },
    "Deployment Outpost": {
        "description": "Claims territory and allows expansion of building area. Heals nearby, out of combat ally units on ally territory.",
        "health": 1000,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 1,
        "sightRange": 4,
        "targetable": true,
        "options": [],
        "icon": "icons/deploymentOutpostIcon.png",
        "texture": "structures/deploymentoutpost.png",
        "custom": {
            "healPercentagePerTick": 0.03
        }
    },
    "Ether Harvester": {
        "description": "Standard resource harvester. Construct a Deployment Outpost nearby to claim.",
        "health": 10000,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 0,
        "sightRange": 1,
        "options": [],
        "custom": {
            "value": 100
        },
        "targetable": false,
        "icon": "icons/harvesterIcon.png",
        "texture": "structures/etherharvester.png"
    },
    "Gem Harvester": {
        "description": "Upgraded resource harvester. Kill the building to claim it.",
        "health": 1000,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 0,
        "sightRange": 2,
        "options": [],
        "targetable": true,
        "custom": {
            "value": 150
        },
        "icon": "icons/harvesterIcon.png",
        "texture": "structures/gemharvester.png"
    },
    "Stim Lab": {
        "description": "Takes 2 turns to build. Enhances attack speed of allies by 28%.",
        "health": 1200,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 2,
        "options": [],
        "sightRange": 1,
        "targetable": true,
        "custom": {
            "attackSpeedMultiplier": 1.28
        },
        "icon": "icons/stimLabIcon.png",
        "texture": "structures/stimlab.png"
    },
    "Thieves' Cave": {
        "description": "Takes 2 turns to build. Produced unit's attacks generate gold equal to 20% of damage dealt.",
        "health": 1200,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 2,
        "options": [],
        "sightRange": 1,
        "targetable": true,
        "custom": {
            "attackGoldGen": 0.2
        },
        "icon": "icons/thievesCaveIcon.png",
        "texture": "structures/thievescave.png"
    },
    "Artillery Bay": {
        "description": "Takes 2 turns to build. Enhances attack damage of allies by 30%.",
        "health": 1200,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 2,
        "options": [],
        "sightRange": 1,
        "targetable": true,
        "custom": {
            "attackDamageMultiplier": 1.3
        },
        "icon": "icons/artilleryBayIcon.png",
        "texture": "structures/artillerybay.png"
    },
    "Cloud Gate": {
        "description": "Takes 2 turns to build. Enhances movement range of allies by 2.",
        "health": 1200,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 2,
        "options": [],
        "sightRange": 1,
        "targetable": true,
        "custom": {
            "moveRangeDelta": 2
        },
        "icon": "icons/cloudGateIcon.png",
        "texture": "structures/cloudgate.png"
    },
    "Vitality Fountain": {
        "description": "Takes 2 turns to build. Enhances health of allies by 35%.",
        "health": 1200,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 2,
        "options": [],
        "sightRange": 1,
        "targetable": true,
        "custom": {
            "healthMultiplier": 1.35
        },
        "icon": "icons/vitalityIcon.png",
        "texture": "structures/vitalityfountain.png"
    },
    "Turret": {
        "description": "Requires Automation Factory. Stationary, single-target ranged turret.",
        "health": 750,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 1,
        "sightRange": 1,
        "targetable": true,
        "options": [],
        "custom": {},
        "icon": "icons/turretIcon.png",
        "texture": "units/armedturret.png"
    },
    "Vampiric Lair": {
        "description": "Takes 2 turns to build. Produced units heal for 5% of damage dealt.",
        "health": 1000,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 2,
        "options": [],
        "sightRange": 1,
        "targetable": true,
        "custom": {
            "healMultiplier": 0.05
        },
        "icon": "icons/vampiricLairIcon.png",
        "texture": "structures/vampiriclair.png"
    },
    "Shauna's Forge": {
        "description": "Takes 2 turns to build. Produced unit's attacks deal 1% of enemy's total health as extra damage.",
        "health": 1000,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 2,
        "options": [],
        "sightRange": 1,
        "targetable": true,
        "custom": {
            "healthMultiplier": 0.01
        },
        "icon": "icons/shaunaForgeIcon.png",
        "texture": "structures/shaunasforge.png"
    },
    "Flash Point": {
        "description": "Takes 2 turns to build. Produced units blink to their target location if within move range.",
        "health": 1000,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 2,
        "sightRange": 1,
        "targetable": true,
        "options": [],
        "icon": "icons/flashPointIcon.png",
        "texture": "structures/flashpoint.png",
        "custom": {}
    },
    "Arctic Tower": {
        "description": "Takes 2 turns to build. Produced units stun enemies hit for 0.2s.",
        "health": 1000,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 2,
        "sightRange": 1,
        "options": [],
        "targetable": true,
        "custom": {
            "stunDuration": 200
        },
        "icon": "icons/arcticTowerIcon.png",
        "texture": "structures/arctictower.png"
    },
    "Static Amplifier": {
        "description": "Takes 2 turns to build. Produced unit's attacks hit an additional enemy for 15% of attack damage.",
        "health": 1000,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 2,
        "options": [],
        "sightRange": 1,
        "targetable": true,
        "custom": {
            "bonusDamageModifier": 0.15
        },
        "icon": "icons/staticAmplifierIcon.png",
        "texture": "structures/staticAmplifier.png"
    },
    "Armory": {
        "description": "Takes 2 turns to build. Produced unit gains an armor plate which blocks the first attack of every turn.",
        "health": 1000,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 2,
        "options": [],
        "sightRange": 1,
        "targetable": true,
        "custom": {
            "armorModifier": 1,
            "armorMultiplier": 1
        },
        "icon": "icons/armoryIcon.png",
        "texture": "structures/armory.png"
    },
    "Oracle Module": {
        "description": "Takes 2 turns to build. Produced unit gains +1 sight range.",
        "health": 1000,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 2,
        "options": [],
        "sightRange": 1,
        "targetable": true,
        "custom": {
            "sightRangeDelta": 1
        },
        "icon": "icons/oracleModuleIcon.png",
        "texture": "structures/oraclemodule.png"
    },
    "Argoyle's Tower": {
        "description": "Takes 2 turns to build. Produced units gain 2 attack damage per attack (resets each action phase).",
        "health": 1000,
        "shield": 0,
        "width": 0,
        "turnsToBuild": 2,
        "sightRange": 1,
        "options": [],
        "targetable": true,
        "custom": {
            "damageGain": 2
        },
        "icon": "icons/argoylesTower.png",
        "texture": "structures/argoylesTower.png"
    }
};
module.exports.units = {
    "Scout": {
        "attackRange": 0,
        "attackSpeed": 0,
        "damage": 0,
        "description": "Scouting unit, high movement range, cannot attack.",
        "health": 100,
        "moveRange": 8,
        "shield": 0,
        "sightRange": 4,
        "tier": 1,
        "turnsToBuild": 1,
        "targetable": true,
        "options": [],
        "icon": "icons/scoutIcon.png",
        "texture": "units/scout.png",
        "custom": {},
        "animation": {
            "baseLayer": "",
            "attackAnimation": ""
        }
    },
    "Marine": {
        "attackRange": 2,
        "attackSpeed": 0.8,
        "damage": 25,
        "description": "Sturdy and cheap-to-produce infantry unit.",
        "health": 200,
        "moveRange": 5,
        "shield": 0,
        "sightRange": 2,
        "tier": 1,
        "turnsToBuild": 1,
        "targetable": true,
        "options": [],
        "custom": {
            "muzzleX": 0,
            "muzzleY": -75
        },
        "icon": "icons/marineIcon.png",
        "texture": "units/marine.png",
        "animation": {
            "baseLayer": "units/marine/layers.json",
            "attackAnimation": "units/marine/shoot.json",
            "deathAnimation": "units/marine/die.json"
        }
    },
    "Engineer": {
        "attackRange": 0,
        "attackSpeed": 0,
        "damage": 0,
        "description": "Constructs buildings during the planning phase.",
        "health": 100,
        "moveRange": 3,
        "shield": 0,
        "sightRange": 2,
        "tier": 1,
        "turnsToBuild": 1,
        "targetable": true,
        "options": [
            {
                "title": "Build Deployment Outpost",
                "cost": 500,
                "prereq": [],
                "type": "Structure",
                "description": "{Deployment Outpost}",
                "icon": "icons/deploymentOutpostIcon.png",
                "command": "build-Deployment Outpost"
            },
            {
                "title": "Build Barracks",
                "cost": 400,
                "prereq": [],
                "type": "Structure",
                "description": "{Barracks}",
                "icon": "icons/barracksIcon.png",
                "command": "build-Barracks"
            },
            {
                "title": "Build Turret",
                "cost": 500,
                "prereq": [
                    "Automation Factory"
                ],
                "type": "Structure",
                "description": "{Turret}",
                "icon": "icons/turretIcon.png",
                "command": "build-Turret"
            }
        ],
        "custom": {},
        "icon": "icons/combatEngineerIcon.png",
        "texture": "units/combatengineer.png",
        "animation": {
            "baseLayer": "",
            "attackAnimation": ""
        }
    },
    "Reaver": {
        "attackRange": 0,
        "attackSpeed": 0,
        "damage": 0,
        "description": "Requires Automation Factory. The Reaver explodes when dying, dealing 50 damage to all units range 1, and 25 range 2.",
        "health": 100,
        "moveRange": 3,
        "shield": 0,
        "sightRange": 2,
        "squadsize": 1,
        "tier": 1,
        "turnsToBuild": 1,
        "options": [],
        "targetable": true,
        "custom": {
            "explodeDamage1": 250,
            "explodeDamage2": 150
        },
        "icon": "icons/reaverIcon.png",
        "texture": "units/reaver.png",
        "animation": {
            "baseLayer": "",
            "attackAnimation": ""
        }
    },
    "Armed Turret": {
        "attackRange": 3,
        "attackSpeed": 2,
        "damage": 10,
        "description": "This is constructed by the Turret building.",
        "health": 750,
        "moveRange": 0,
        "shield": 0,
        "sightRange": 3,
        "squadsize": 1,
        "tier": 1,
        "turnsToBuild": 0,
        "targetable": true,
        "options": [],
        "custom": {},
        "icon": "icons/turretIcon.png",
        "texture": "units/armedturret.png",
        "animation": {
            "baseLayer": "",
            "attackAnimation": ""
        }
    },
    "Golem": {
        "attackRange": 1,
        "attackSpeed": 0.5,
        "damage": 50,
        "description": "Slow-moving melee unit.",
        "health": 600,
        "moveRange": 3,
        "shield": 0,
        "sightRange": 1,
        "squadsize": 1,
        "tier": 1,
        "turnsToBuild": 1,
        "targetable": true,
        "options": [],
        "icon": "icons/golemIcon.png",
        "texture": "units/golem.png",
        "custom": {},
        "animation": {
            "baseLayer": "units/golem/layers.json",
            "attackAnimation": "units/golem/punch.json"
        }
    },
    "Raider": {
        "attackRange": 2,
        "attackSpeed": 1,
        "damage": 500,
        "description": "Strong infantry unit. High in health and damage.",
        "health": 15000,
        "moveRange": 3,
        "shield": 0,
        "sightRange": 3,
        "tier": 4,
        "turnsToBuild": 1,
        "targetable": true,
        "options": [],
        "custom": {},
        "icon": "icons/placeholderBig.png",
        "texture": "units/raider.png",
        "animation": {
            "baseLayer": "",
            "attackAnimation": "",
            "deathAnimation": ""
        }
    },
    "Praetorian": {
        "attackRange": 3,
        "attackSpeed": 2,
        "damage": 150,
        "description": "Strong infantry unit. High in health and damage.",
        "health": 15000,
        "moveRange": 3,
        "shield": 0,
        "sightRange": 5,
        "tier": 4,
        "turnsToBuild": 1,
        "targetable": true,
        "options": [],
        "custom": {},
        "icon": "icons/placeholderBig.png",
        "texture": "units/praetorian.png",
        "animation": {
            "baseLayer": "",
            "attackAnimation": ""
        }
    }
};