class PendingAction {
    onTick(state, map) {
        return this._onTick(state, map);
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
const Constants = require('../shared/constants');

class PlaceUnitPendingAction extends PendingAction {
    constructor(unitName, cost) {
        super();
        this.isValid = false;
        this.unitName = unitName;
        this.cost = cost;
    }

    _onTick(state, mapCanvas) {
        const gameMap = state.getMap();
        this.isValid = SpawnUnitStateChange.create(
            mapCanvas.state.gameState,
            mapCanvas.state.player,
            this.unitName,
            mapCanvas.state.inputManager.mouseState.tile,
            mapCanvas.state.selectedObject
        ).verifyStateChange(mapCanvas.state.gameState);

        if (gameMap.withinMap(mapCanvas.inputManager.mouseState.tile)) {
            if (this.isValid) {
                mapCanvas.state.cursorMessage = `Spawn ${this.unitName}: Ø${this.cost}`;
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
            if (gameMap.withinMap(surrounding[i]) &&
                !mapCanvas.state.gameState.occupied[surrounding[i].y][surrounding[i].x] &&
                gameMap.data[surrounding[i].y][surrounding[i].x].displayType != 2) {
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
                    state.gameState,
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
    constructor(structureName, cost) {
        super();
        this.isValid = false;
        this.structureName = structureName;
        this.cost = cost;
    }

    _onTick(state, mapCanvas) {
        const gameMap = state.getMap();
        this.isValid = BuildStructureStateChange.create(
            mapCanvas.state.gameState,
            mapCanvas.state.player,
            this.structureName,
            mapCanvas.state.inputManager.mouseState.tile,
            mapCanvas.state.selectedObject.position
        ).verifyStateChange(mapCanvas.state.gameState);

        // Draw Building Range
        surrounding = getSurrounding(mapCanvas.state.selectedObject.position, mapCanvas.state.selectedObject.width + 1);
        for (let i = 0; i < surrounding.length; i++) {
            if (gameMap.withinMap(surrounding[i]) &&
                !mapCanvas.state.gameState.occupied[surrounding[i].y][surrounding[i].x] &&
                gameMap.data[surrounding[i].y][surrounding[i].x].displayType != 2) {
                const drawn = toDrawCoord(surrounding[i]);
                mapCanvas.drawImage(mapCanvas.resourceManager.get(Resource.GREEN_OVERLAY),
                    drawn.x, drawn.y);
            }
        }

        // Draw Object to be Placed
        let baseObj = getBaseObject(this.structureName);
        const oldOpacity = mapCanvas.context.globalAlpha;
        if (!this.isValid) {
            mapCanvas.context.globalAlpha = 0.5;
        }
        else {
            mapCanvas.context.globalAlpha = 0.9;
        }

        const drawn = toDrawCoord(mapCanvas.inputManager.mouseState.tile);
        const resourceManager = mapCanvas.resourceManager;
        mapCanvas.drawImage(resourceManager.get(baseObj.texture), drawn.x, drawn.y);
        mapCanvas.context.globalAlpha = oldOpacity;
        
        let isDeployment = false;
        let width = baseObj.width;
        if (this.structureName === 'Deployment Outpost') {
            width += Constants.BUILD_RANGE;
            isDeployment = true;
        }

        let surrounding = getSurrounding(mapCanvas.inputManager.mouseState.tile, width);
        for (let i = 0; i < surrounding.length; i++) {
            if (gameMap.withinMap(surrounding[i])) {
                if (this.isValid) {
                    mapCanvas.state.cursorMessage = `Build ${this.structureName}: Ø${this.cost}`;
                }
                else {
                    mapCanvas.state.cursorMessage = 'Cannot build there!';
                }
                const drawn = toDrawCoord(surrounding[i]);
                
                if (!this.isValid) {
                    mapCanvas.drawImage(mapCanvas.resourceManager.get(
                        Resource.RED_OVERLAY),
                        drawn.x, drawn.y);
                }
                else if (isDeployment) {
                    // Draw potential territorial claim
                    mapCanvas.drawImage(mapCanvas.resourceManager.get(
                        Resource.BLUE_OVERLAY),
                        drawn.x, drawn.y);
                }
            }
        }        
    }

    _onClick(state) {
        if (this.isValid) {
            state.sendStateChange(
                BuildStructureStateChange.create(
                    state.gameState,
                    state.player,
                    this.structureName,
                    state.inputManager.mouseState.tile,
                    state.selectedObject.position
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
