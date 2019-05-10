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
const { withinMap, map } = require('../shared/map');
const { getBaseObject } = require('../shared/data');
const { getSurrounding } = require('../shared/coordinates');
const { BuildStructureStateChange, SpawnUnitStateChange } = require('../shared/state-change');

class PlaceUnitPendingAction extends PendingAction {
    constructor(unitName) {
        super();
        this.isValid = false;
        this.unitName = unitName;
    }

    _onTick(mapCanvas) {
        this.isValid = SpawnUnitStateChange.create(
            mapCanvas.state.side,
            this.unitName,
            mapCanvas.state.inputManager.mouseState.tile,
            mapCanvas.state.selectedObject
        ).verifyStateChange(mapCanvas.state.gameState);

        if (withinMap(mapCanvas.inputManager.mouseState.tile)) {
            if (this.isValid) {
                mapCanvas.state.cursorMessage = 'Spawn ' + this.unitName;
            }
            else {
                mapCanvas.state.cursorMessage = 'Cannot spawn there!';
            }
            mapCanvas.drawImage(mapCanvas.resourceManager.get(
                this.isValid ? Resource.GREEN_OVERLAY : Resource.RED_OVERLAY),
            (mapCanvas.inputManager.mouseState.tile.x * 96),
            (mapCanvas.inputManager.mouseState.tile.y * 111) + (mapCanvas.inputManager.mouseState.tile.x % 2) * 55);
        }

        let baseObj = getBaseObject(mapCanvas.state.selectedObject.name);
        let surrounding = getSurrounding(mapCanvas.state.selectedObject.position,
            baseObj.width + 1);
        for (let i = 0; i < surrounding.length; i++) {
            if (withinMap(surrounding[i]) &&
                !mapCanvas.state.gameState.occupied[surrounding[i].y][surrounding[i].x] &&
                map.data[surrounding[i].y][surrounding[i].x].displayType != 2) {
                    mapCanvas.drawImage(mapCanvas.resourceManager.get(Resource.YELLOW_OVERLAY),
                    (surrounding[i].x * 96),
                    (surrounding[i].y * 111) + (surrounding[i].x % 2) * 55);
            }
        }
    }

    _onClick(state) {
        if (this.isValid) {
            state.sendStateChange(
                SpawnUnitStateChange.create(
                    state.side,
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
            mapCanvas.state.side,
            this.structureName,
            mapCanvas.state.inputManager.mouseState.tile,
            mapCanvas.state.selectedObject
        ).verifyStateChange(mapCanvas.state.gameState);

        let baseObj = getBaseObject(this.structureName);
        let surrounding = getSurrounding(mapCanvas.inputManager.mouseState.tile, baseObj.width);
        for (let i = 0; i < surrounding.length; i++) {
            if (withinMap(surrounding[i])) {
                if (this.isValid) {
                    mapCanvas.state.cursorMessage = 'Build ' + this.structureName;
                }
                else {
                    mapCanvas.state.cursorMessage = 'Cannot build there!';
                }
                mapCanvas.drawImage(mapCanvas.resourceManager.get(
                    this.isValid ? Resource.GREEN_OVERLAY : Resource.RED_OVERLAY),
                (surrounding[i].x * 96),
                (surrounding[i].y * 111) + (surrounding[i].x % 2) * 55);
            }
        }
    }

    _onClick(state) {
        if (this.isValid) {
            state.sendStateChange(
                BuildStructureStateChange.create(
                    state.side,
                    this.structureName,
                    state.inputManager.mouseState.tile,
                    state.selectedObject
                )
            );
        }
        return this.isValid;
    }
}

module.exports = {
    PlaceUnitPendingAction,
    PlaceStructurePendingAction
};