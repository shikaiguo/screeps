/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing'
 *
 * You can import it from another modules like this:
 * let mod = require('config')
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    skillMap:   [MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, HEAL, CLAIM, TOUGH],
    skillValue: [50,   100,  50,    80,     150,           250,  60,    10],
    creepMap: {
        upgrader: {
            n: 7,
            skill: [5,2,2],
            sign:'🔧'
        },
        builder: {
            n: 5,
            skill: [5,2,2],
            sign: '🔨'
        },
        harvester: {
            n: 5,
            skill: [5,2,2],
            sign: '⛏'
        },
    },
};