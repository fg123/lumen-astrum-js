<template>
    <div class="debugBox" ref="debugBox">
        <table>
            <tr>
                <td>
                    Selected: ({{ selectedLocation.x }},{{ selectedLocation.y }})
                    <button @click="cheatKill()">Kill</button>
                </td>
            </tr>
            <tr>
                <td>
                    <select v-model="selectedPlayer">
                        <option v-for="p in players" :key="p">
                            {{ p }}
                        </option>
                    </select>
                    <select v-model="selectedMapObject">
                        <option v-for="obj in mapObjectNames" :key="obj">
                            {{ obj }}
                        </option>
                    </select>
                    <button @click="cheatSpawn()">Spawn</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
const { Tuple } = require("../shared/coordinates");
const { DebugCheatStateChange, DealDamageStateChange, SpawnMapObject }=require("../shared/state-change");
const { Resource } = require("./resources");
const { toDrawCoord } = require("./utils");
const { structures, units } = require('../shared/data');

module.exports = {
    name: 'debug-box',
    data() {
        return {
            selectedLocation: new Tuple(0, 0),
            inputManager: undefined,
            socket: undefined,
            mouseOverDebugBox: false,
            clientState: undefined,
            selectedPlayer: "",
            selectedMapObject: "Deployment Outpost"
        };
    },
    computed: {
        players() {
            if (!this.clientState) return [];
            if (!this.clientState.gameState) return [];
            return Object.keys(this.clientState.gameState.players);
        },
        mapObjectNames() {
            return Object.keys(structures).concat(Object.keys(units));
        }
    },
    mounted() {
        this.$refs.debugBox.addEventListener('mouseenter', () => {
            this.mouseOverDebugBox = true;
        });
        this.$refs.debugBox.addEventListener('mouseleave', () => {
            this.mouseOverDebugBox = false;
        });
    },
    methods: {
        initialize(socket, inputManager, mapCanvas, clientState) {
            this.socket = socket;
            this.clientState = clientState;
            this.inputManager = inputManager;
            inputManager.attachMouseDownObserver((key) => {
                // Left button
                if (key === 1) {
                    this.selectedLocation = this.inputManager.mouseState.tile;
                }
                return false;
            });
            mapCanvas.postDrawHooks.push((context) => {
                const drawCoord = toDrawCoord(this.selectedLocation.x, this.selectedLocation.y);
                mapCanvas.drawImage(mapCanvas.resourceManager.get(Resource.DEBUG_RING),
                    drawCoord.x, drawCoord.y);
            });
        },
        cheatKill() {
            this.clientState.sendStateChange(
                DebugCheatStateChange.create(
                    this.clientState.player,
                    DealDamageStateChange.create(
                        this.clientState.player,
                        this.selectedLocation,
                        10000
                    )
                )
            );
        },
        cheatSpawn() {
            if (this.selectedMapObject) {
                let player = this.selectedPlayer;
                if (!player) {
                    player = this.clientState.player;
                }
                this.clientState.sendStateChange(
                    DebugCheatStateChange.create(
                        this.clientState.player,
                        SpawnMapObject.create(
                            this.clientState.player,
                            this.selectedLocation,
                            this.selectedMapObject,
                            player
                        )
                    )
                );
            }
        },
        isMouseOverDebugBox() {
            return this.mouseOverDebugBox;
        }
    }
};
</script>

<style>

div.debugBox {
    background: #666; 
    border-radius: 10px;
    padding: 10px;
    width: 400px;
    height: 150px;
    position: absolute;
    top: 100px;
    transform: translateX(-50%);
    left: 50%;
    font-family: 'Roboto Mono';
    color: #fff;
    border: 2px solid black;
    font-size: 13px;
}

</style>
