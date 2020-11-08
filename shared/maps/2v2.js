const map = JSON.parse(JSON.stringify(require('./redesign')));
map.teams = [1, 2, 1, 2];
map.percentageClaimToWin = 0.6;

module.exports = map;