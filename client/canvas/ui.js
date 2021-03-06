/* Dynamic Parts of the UI */
const { Resource } = require('../resources');
const { map } = require('../../shared/map');
const Constants = require('../../shared/constants');

module.exports = class UICanvas {
    constructor(canvas, state, inputManager, ui, resourceManager, camera) {
        this.canvas = canvas;
        this.state = state;
        this.inputManager = inputManager;
        this.camera = camera;
        this.resourceManager = resourceManager;

        this.ui = ui;
        this.context = canvas.getContext('2d');

        this.cursorResource = resourceManager.get(Resource.CURSOR);
        const tick = () => {
            this.redraw();
            window.requestAnimationFrame(tick);
        };
        tick();

        this.lastCursorMessage = '';
        this.lastCursorMessageCanvas = undefined;

        this.lastGold = 0;
        this.lastGoldCanvas = undefined;
    }

    cacheTextToCanvas(text, color, font, canvas) {
        const context = canvas.getContext('2d');
        context.font = font;
        const measure = context.measureText(text);
        canvas.width = measure.width;
        canvas.height = parseInt(font.replace(/\D/g, ''));
        context.font = font;
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text,
            canvas.width / 2,
            canvas.height / 2);
    }

    redrawCursorMessageCanvas() {
        this.lastCursorMessageCanvas = document.createElement('canvas');
        const context = this.lastCursorMessageCanvas.getContext('2d');

        context.font = 'bold 14px Asap';
        const measure = context.measureText(this.state.cursorMessage);
        const width = measure.width + 8;
        const height = 20;
        this.lastCursorMessageCanvas.width = width;
        this.lastCursorMessageCanvas.height = height;
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);
        context.fillStyle = 'white';
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.font = 'bold 14px Asap';
        context.fillText(this.state.cursorMessage,
            width / 2,
            height / 2
        );
        this.lastCursorMessage = this.state.cursorMessage;
    }

    redraw() {
        if (this.ui.currentScreen === this.ui.Screen.GAME) {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            this.canvas.width = screenWidth;
            this.canvas.height = screenHeight;

            this.drawGoldAndTurnControls(screenWidth, screenHeight);
            this.drawMinimap(screenWidth, screenHeight);
            this.drawTerritoryClaims(screenWidth, screenHeight);
            this.context.drawImage(this.cursorResource, this.inputManager.mouseState.position.x - this.cursorResource.width / 2,
                this.inputManager.mouseState.position.y - this.cursorResource.height / 2);

            if (this.state.cursorMessage) {
                if (this.state.cursorMessage !== this.lastCursorMessage) {
                    // Not Cached
                    this.redrawCursorMessageCanvas();
                }
                this.context.drawImage(this.lastCursorMessageCanvas,
                    this.inputManager.mouseState.position.x,
                    this.inputManager.mouseState.position.y - 30);
            }
        }
    }

    drawTerritoryClaims(screenWidth, screenHeight) {
        const gameState = this.state.gameState;
        this.context.textBaseline = 'alphabetic';
        this.context.font = 'bold 13px Prompt'

        this.context.fillStyle = 'white';
        
        this.context.textAlign = 'left';
        this.context.fillText(`${gameState.getUsername(this.state.player)}`, screenWidth - 262, 125);

        this.context.textAlign = 'right';
        this.context.fillText(`Territory to Win: ${this.state.getMap().percentageClaimToWin * 100}%`, screenWidth - 12, 125);

        // Draw Bar Graphs
        const startX = screenWidth - 266;
        const startY = 10;
        const endX = startX + 215;
        const endY = startY + 100;
        this.context.fillRect(endX, startY, 1, endY - startY);
        
        const playerStateMap = this.state.gameState.players;
        const teams = Object.keys(this.state.gameState.teamMap);
        // Move my own team to the front
        for (let i = 0; i < teams.length; i++) {
            const team = teams[i];
            if (team === playerStateMap[this.state.player].team) {
                teams.splice(i, 1);
                teams.unshift(team);
                break;
            }
        }
        const spacingHeight = (endY - startY) / (teams.length * 4 + 1);
        const barHeight = spacingHeight * 3;

        let y = startY + spacingHeight;
        
        const totalTiles = this.state.getMap().territorialTiles;
        const mousePos = this.state.inputManager.mouseState.position;

        for (let i = 0; i < teams.length; i++) {
            const teammates = gameState.teamMap[teams[i]];
            let x = startX;
            for (let j = 0; j < teammates.length; j++) {
                const territory = playerStateMap[teammates[j]].calculateTerritorySize();
                const percentage = territory / totalTiles;
                const barWidth = Math.round((percentage / this.state.getMap().percentageClaimToWin)
                    * (endX - startX));

                if (teammates[j] === this.state.player) {
                    this.context.fillStyle = '#1D91F0';
                }
                else {
                    this.context.fillStyle = this.state.getEnemyColor(teammates[j]);
                }
                this.context.fillRect(x, y, barWidth, barHeight);

                // Mouse Position
                
                if (mousePos.x >= x && mousePos.x <= x + barWidth &&
                    mousePos.y >= y && mousePos.y <= y + barHeight) {
                    this.state.cursorMessage = `${gameState.getUsername(teammates[j])}: ${territory} / ${totalTiles} [${(percentage * 100).toFixed(2)}%]`;
                }
                x += barWidth;
            }
            this.context.fillStyle = 'white';
            this.context.textBaseline = 'middle';
            this.context.fillText(`${((gameState.getTeamTerritorySize(teams[i]) / totalTiles) * 100).toFixed(0)}%`, screenWidth - 12, y + barHeight / 2);

            y += barHeight + spacingHeight;
        }

        this.context.textBaseline = 'left';
        this.context.textAlign = 'left';
        

        // const myTeam = playerStateMap[this.state.player].team;

        
        // this.context.fillRect(screenWidth - 266, 10, 220, 100);

        

        // const playerStateMap = this.state.gameState.players;
        // const myOwn = playerStateMap[this.state.player].calculateTerritorySize();
        // this.drawOneClaim(myOwn, total, this.state.player, screenWidth - 230, 32);

        // const players = Object.keys(playerStateMap);

        // let j = 1;
        // for (let i = 0; i < players.length; i++) {
        //     if (players[i] !== this.state.player) {
        //         this.drawOneClaim(playerStateMap[players[i]].calculateTerritorySize(),
        //             total, players[i], screenWidth - 230, 32 + (j) * 17);
        //         j++;
        //     }
        // }
    }

    drawGoldAndTurnControls(screenWidth, screenHeight) {
        // Gold
        this.context.textBaseline = 'middle';
        this.context.fillStyle = 'white';
        this.context.font = 'bold 32px Prompt';
        const gold = this.state.hasForfeited() ? "FORFEIT" : this.state.getGold();
        this.context.fillText(gold, screenWidth - 205, screenHeight - 179);

        const count = this.state.getHarvesterCount();
        const values = this.state.getHarvesterGoldValues();

        this.context.fillText(gold, screenWidth - 205, screenHeight - 179);

        this.context.font = '15px Prompt';
        this.context.fillText(`+${200 + (count.gem * values.gem + count.ether * values.ether)}`,
            screenWidth - 60, screenHeight - 182);
        
    
        this.context.textBaseline = 'alphabetic';
        
        // Show Timer
        this.context.fillStyle = 'black';
        this.context.font = 'bold 18px Prompt';
        
        this.context.fillText('∣ ' + this.state.gameTimer, screenWidth / 2 + 55, 60);

        const timerBar = this.resourceManager.get(Resource.UI_TIMER_BAR);
        
        this.context.drawImage(timerBar,
            0, 0, timerBar.width * this.state.topProgressBar, timerBar.height,
            (screenWidth - timerBar.width) / 2, 8,
            timerBar.width * this.state.topProgressBar, timerBar.height);

        // Show Phase Text
        this.context.fillStyle = 'black';
        this.context.font = 'bold 18px Prompt';
        this.context.fillText(this.state.phaseText, screenWidth / 2 - 90, 60);
    }

    drawMinimap(screenWidth, screenHeight) {
        /* We grab a default tile to cache the calculation */
        this.context.drawImage(this.camera.minimapCanvas, screenWidth - 266, screenHeight - 154);
        this.context.drawImage(this.camera.minimapFOWCanvas, screenWidth - 266, screenHeight - 154);
        this.context.strokeStyle = 'white';
        this.context.lineWidth = '1.5';
        this.context.rect(screenWidth - 266 + this.camera.minimapRectPosition.x,
            screenHeight - 154 + this.camera.minimapRectPosition.y,
            this.camera.minimapRectSize.x, this.camera.minimapRectSize.y);
        this.context.stroke();
    }
};
