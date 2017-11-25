// State Handler

var state = {
    camera: createCamera(),
    side: "",
    gameState: {},
    selectedObject: null,
    hoveredOption: null,
    bigMessage: "",
    smallAlert: { current: null, queue: [], lastShownTime: 0 },
    commandCenter: null,
    buildingStructure: null,
    spawningUnit: null,
    allowedToBuildOrSpawn: false,
    hoveringEndTurn: false,
    turnTimer: ""
};

function createCamera() {
    return {
        position: createTuple(500, 500),
        delta: createTuple(0, 0),
        scale: 1
    };
}

function getGold() {
    // GameState gold will not be guaranteed to reflect the correct amount
    //   of the opposite side.
    if (state.side == RED_SIDE) return state.gameState.redGold;
    else return state.gameState.blueGold;
}

function pushAlertMessage(message) {
    console.log("Pushed Alert Message");
    state.smallAlert.queue.push(message);
}

function selectObject(object) {
    state.buildingStructure = null;
    state.spawningUnit = null;
    state.selectedObject = object;
}