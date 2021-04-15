/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing'
 *
 * You can import it from another modules like this:
 * let mod = require('role.harvester')
 * mod.thing == 'a thing'; // true
 */
let creepAction = require('creep.action')
module.exports = {
    run: function (creep) {
        if (!creepAction.transfer(creep)) {
            creepAction.pickup(creep) || creepAction.harvest(creep)
        }
    }
};