// Elo calculation needs to know:
//   - players / teams
//   - who forfeited
//   - team that won

function getOpponentElo(team, teamElos) {
    let total = 0;
    const teams = Object.keys(teamElos);
    teams.forEach(t => {
        if (t !== team) total += teamElos[t];
    });
    return total / (teams.length - 1);
}

const K_FACTOR = 15;

// Returns delta of elos 
function eloCalculate(teamMap, winners, eloMap) {
    // Each team gets assigned an average elo
    // Each team gets a delta of elo score depending on win or loss
    // Only one team can be the winner
    const teams = Object.keys(teamMap);
    const teamElos = {};
    teams.forEach(t => {
        const teammates = teamMap[t];
        const totalElo = teammates.map(id => eloMap[id]).reduce((t, n) => t + n, 0);
        teamElos[t] = totalElo / teammates.length;
    });
    console.log('Team', teamElos);
    // Each team has an opponent score (average of the other team's elos)
    const opponentElo = {};
    teams.forEach(t => {
        opponentElo[t] = getOpponentElo(t, teamElos);
    });
    console.log('Opponent', opponentElo);

    const teamEloDelta = {};
    teams.forEach(t => {
        let Q_a = Math.pow(10, teamElos[t] / 400);
        let Q_b = Math.pow(10, opponentElo[t] / 400);
        
        // let delta = Math.round(8 + Math.abs(teamElos[t] - opponentElo[t]) * 0.04);
        // if (delta > 31) delta = 31;
        // if (delta < 1) delta = 1;

        teamEloDelta[t] = Q_a / (Q_a + Q_b);
    });

    console.log('Delta', teamEloDelta);
    const winnersSet = new Set(winners);
    const newElos = {};
    teams.forEach(t => {
        const teammates = teamMap[t];
        teammates.forEach(id => {
            if (winnersSet.has(id)) {
                newElos[id] = Math.round(K_FACTOR * (1 - teamEloDelta[t]));
            }
            else {
                newElos[id] = -Math.round(K_FACTOR * (teamEloDelta[t]));
            }
        })
    });
    return newElos;
}

module.exports.eloCalculate = eloCalculate;