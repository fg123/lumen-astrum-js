class PendingAction {
    onTick(map) {
        return this._onTick(map);
    }

    onClick(state) {
        return this._onClick(state);
    }
}

// Helpers
const { Resource } = require('./resources');
const { map } = require('../shared/map');
const { getBaseObject } = require('../shared/data');
const { getSurrounding } = require('../shared/coordinates');
const { toDrawCoord } = require('./utils');
const {
    BuildStructureStateChange,
    SpawnUnitStateChange,
    HealUnitStateChange,
    RepairStructureStateChange,
    LaunchProbeStateChange } = require('../shared/state-change');

class PlaceUnitPendingAction extends PendingAction {
    constructor(unitName) {
        super();
        this.isValid = false;
        this.unitName = unitName;
    }

    _onTick(mapCanvas) {
        this.isValid = SpawnUnitStateChange.create(
            mapCanvas.state.player,
            this.unitName,
            mapCanvas.state.inputManager.mouseState.tile,
            mapCanvas.state.selectedObject
        ).verifyStateChange(mapCanvas.state.gameState);

        if (map.withinMap(mapCanvas.inputManager.mouseState.tile)) {
            if (this.isValid) {
                mapCanvas.state.cursorMessage = 'Spawn ' + this.unitName;
            }
            else {
                mapCanvas.state.cursorMessage = 'Cannot spawn there!';
            }
            const drawn = toDrawCoord(mapCanvas.inputManager.mouseState.tile);
            mapCanvas.drawImage(mapCanvas.resourceManager.get(
                this.isValid ? Resource.GREEN_OVERLAY : Resource.RED_OVERLAY),
                drawn.x, drawn.y);
        }

        let baseObj = getBaseObject(mapCanvas.state.selectedObject.name);
        let surrounding = getSurrounding(mapCanvas.state.selectedObject.position,
            baseObj.width + 1);
        for (let i = 0; i < surrounding.length; i++) {
            if (map.withinMap(surrounding[i]) &&
                !mapCanvas.state.gameState.occupied[surrounding[i].y][surrounding[i].x] &&
                map.data[surrounding[i].y][surrounding[i].x].displayType != 2) {
                const drawn = toDrawCoord(surrounding[i]);
                mapCanvas.drawImage(mapCanvas.resourceManager.get(Resource.YELLOW_OVERLAY),
                    drawn.x, drawn.y);
            }
        }
    }

    _onClick(state) {
        if (this.isValid) {
            state.sendStateChange(
                SpawnUnitStateChange.create(
                    state.player,
                    this.unitName,
                    state.inputManager.mouseState.tile,
                    state.selectedObject
                )
            );
        }
        return this.isValid;
    }
}

class PlaceStructurePendingAction extends PendingAction {
    constructor(structureName) {
        super();
        this.isValid = false;
        this.structureName = structureName;
    }

    _onTick(mapCanvas) {
        this.isValid = BuildStructureStateChange.create(
            mapCanvas.state.player,
            this.structureName,
            mapCanvas.state.inputManager.mouseState.tile,
            mapCanvas.state.selectedObject
        ).verifyStateChange(mapCanvas.state.gameState);

        // Draw Building Range
        if (mapCanvas.state.selectedObject.isUnit) {
            surrounding = getSurrounding(mapCanvas.state.selectedObject.position, 1);
            for (let i = 0; i < surrounding.length; i++) {
                if (map.withinMap(surrounding[i]) &&
                    !mapCanvas.state.gameState.occupied[surrounding[i].y][surrounding[i].x] &&
                    map.data[surrounding[i].y][surrounding[i].x].displayType != 2) {
                    const drawn = toDrawCoord(surrounding[i]);
                    mapCanvas.drawImage(mapCanvas.resourceManager.get(Resource.GREEN_OVERLAY),
                        drawn.x, drawn.y);
                }
            }
        }

        // Draw Object to be Placed
        let baseObj = getBaseObject(this.structureName);
        let surrounding = getSurrounding(mapCanvas.inputManager.mouseState.tile, baseObj.width);
        for (let i = 0; i < surrounding.length; i++) {
            if (map.withinMap(surrounding[i])) {
                if (this.isValid) {
                    mapCanvas.state.cursorMessage = 'Build ' + this.structureName;
                }
                else {
                    mapCanvas.state.cursorMessage = 'Cannot build there!';
                }
                const drawn = toDrawCoord(surrounding[i]);
                const oldOpacity = mapCanvas.context.globalAlpha;
                if (!this.isValid) {
                    mapCanvas.context.globalAlpha = 0.5;
                }
                else {
                    mapCanvas.context.globalAlpha = 0.9;
                }
                mapCanvas.drawImage(baseObj.image, drawn.x, drawn.y);
                mapCanvas.context.globalAlpha = oldOpacity;
                
                if (!this.isValid) {
                    mapCanvas.drawImage(mapCanvas.resourceManager.get(
                        Resource.RED_OVERLAY),
                        drawn.x, drawn.y);
                }
            }
        }

       
    }

    _onClick(state) {
        if (this.isValid) {
            state.sendStateChange(
                BuildStructureStateChange.create(
                    state.player,
                    this.structureName,
                    state.inputManager.mouseState.tile,
                    state.selectedObject
                )
            );
        }
        return this.isValid;
    }
}

class HealUnitPendingAction extends PendingAction {
    constructor() {
        super();
    }

    _onTick(mapCanvas) {
        mapCanvas.state.cursorMessage = 'Choose Friendly Unit to Heal';

        this.isValid = HealUnitStateChange.create(
            mapCanvas.state.player,
            mapCanvas.state.selectedObject.position,
            mapCanvas.state.inputManager.mouseState.tile
        ).verifyStateChange(mapCanvas.state.gameState);

        if (this.isValid) {
            mapCanvas.state.cursorMessage = 'Heal Unit';
        }

        let surrounding = getSurrounding(mapCanvas.state.selectedObject.position, 1);
        for (let i = 0; i < surrounding.length; i++) {
            if (map.withinMap(surrounding[i]) &&
                !mapCanvas.state.gameState.occupied[surrounding[i].y][surrounding[i].x] &&
                map.data[surrounding[i].y][surrounding[i].x].displayType !== 2) {
                const drawn = toDrawCoord(surrounding[i]);
                mapCanvas.drawImage(mapCanvas.resourceManager.get(Resource.GREEN_OVERLAY),
                    drawn.x, drawn.y);
            }
        }
    }

    _onClick(state) {
        if (this.isValid) {
            state.sendStateChange(
                HealUnitStateChange.create(
                    state.player,
                    state.selectedObject.position,
                    state.inputManager.mouseState.tile
                )
            );
        }
        return this.isValid;
    }
}

class RepairStructurePendingAction extends PendingAction {
    constructor() {
        super();
    }

    _onTick(mapCanvas) {
        mapCanvas.state.cursorMessage = 'Choose Friendly Structure to Repair';

        this.isValid = RepairStructureStateChange.create(
            mapCanvas.state.player,
            mapCanvas.state.selectedObject.position,
            mapCanvas.state.inputManager.mouseState.tile
        ).verifyStateChange(mapCanvas.state.gameState);

        if (this.isValid) {
            mapCanvas.state.cursorMessage = 'Repair Structure';
        }

        let surrounding = getSurrounding(mapCanvas.state.selectedObject.position, 1);
        for (let i = 0; i < surrounding.length; i++) {
            if (map.withinMap(surrounding[i]) &&
                !mapCanvas.state.gameState.occupied[surrounding[i].y][surrounding[i].x] &&
                map.data[surrounding[i].y][surrounding[i].x].displayType !== 2) {
                const drawn = toDrawCoord(surrounding[i]);
                mapCanvas.drawImage(mapCanvas.resourceManager.get(Resource.GREEN_OVERLAY),
                    drawn.x, drawn.y);
            }
        }
    }

    _onClick(state) {
        if (this.isValid) {
            state.sendStateChange(
                RepairStructureStateChange.create(
                    state.player,
                    state.selectedObject.position,
                    state.inputManager.mouseState.tile
                )
            );
        }
        return this.isValid;
    }
}

class LaunchProbePendingAction extends PendingAction {
    constructor() {
        super();
    }

    _onTick(mapCanvas) {
        mapCanvas.state.cursorMessage = 'Choose Area to Probe';

        this.isValid = LaunchProbeStateChange.create(
            mapCanvas.state.player,
            mapCanvas.state.selectedObject.position,
            mapCanvas.state.inputManager.mouseState.tile
        ).verifyStateChange(mapCanvas.state.gameState);

        if (this.isValid) {
            mapCanvas.state.cursorMessage = 'Probe Here';
        }
    }

    _onClick(state) {
        if (this.isValid) {
            state.sendStateChange(
                LaunchProbeStateChange.create(
                    state.player,
                    state.selectedObject.position,
                    state.inputManager.mouseState.tile
                )
            );
        }
        return this.isValid;
    }
}

module.exports = {
    PlaceUnitPendingAction,
    PlaceStructurePendingAction,
    HealUnitPendingAction,
    RepairStructurePendingAction,
    LaunchProbePendingAction
};
