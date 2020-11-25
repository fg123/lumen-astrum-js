const { eloCalculate } = require('../shared/elo');

function TEST_CASE(label, teamMap, winners, eloMap) {
    console.log('================');
    console.log(label);
    console.log(eloCalculate(teamMap, winners, eloMap));
    console.log('================');
}
TEST_CASE("1v1 Same Elo",
{
    1: ['A'],
    2: ['B']
}, ['A'], {'A': 1000, 'B': 1000});

TEST_CASE("1v1 Different Elo High Win",
{
    1: ['A'],
    2: ['B']
}, ['A'], {'A': 2000, 'B': 1000});

TEST_CASE("1v1 Different Elo Low Win",
{
    1: ['A'],
    2: ['B']
}, ['B'], {'A': 2000, 'B': 1000});

TEST_CASE("1v1 Similar Elo High Win",
{
    1: ['A'],
    2: ['B']
}, ['A'], {'A': 2020, 'B': 2000});

TEST_CASE("1v1 Similar Elo Low Win",
{
    1: ['A'],
    2: ['B']
}, ['B'], {'A': 2020, 'B': 2000});

TEST_CASE("2v2 Similar Elo High Win",
{
    1: ['A', 'B'],
    2: ['C', 'D']
}, ['A', 'B'], {'A': 2020, 'B': 2010, 'C': 2000, 'D': 1900});

TEST_CASE("2v2 Similar Elo Low Win",
{
    1: ['A', 'B'],
    2: ['C', 'D']
}, ['C', 'D'], {'A': 2020, 'B': 2010, 'C': 2000, 'D': 1900});

TEST_CASE("2v2 One Carry Elo High Win",
{
    1: ['A', 'B'],
    2: ['C', 'D']
}, ['A', 'B'], {'A': 3000, 'B': 1000, 'C': 3000, 'D': 1000});

TEST_CASE("2v2 One FFed No Gain",
{
    1: ['A', 'B'],
    2: ['C', 'D']
}, ['A'], {'A': 2000, 'B': 2000, 'C': 2000, 'D': 2000});

