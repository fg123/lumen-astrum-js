// State Handler
var state = {
    camera: createCamera(),
    side: "",
    gameState: {},
    currentTurn: "",
    lastTurnTime: undefined,
    selectedObject: null,
    bigMessage: "",
};

function createCamera() {
    return { position: createTuple(500, 500), delta: createTuple(0, 0), scale: 1 };
}


