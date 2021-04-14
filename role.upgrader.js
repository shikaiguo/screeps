/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing'
 *
 * You can import it from another modules like this:
 * let mod = require('role.upgrader')
 * mod.thing == 'a thing'; // true
 */

let creepAction = require('creep.action')
module.exports = {
    run: function (creep) {

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true
        }
        
        if (creep.memory.upgrading) {
            creepAction.upgrade(creep)
        }else {
            creepAction.withdraw(creep)
        }
    }
};