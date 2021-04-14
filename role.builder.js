/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing'
 *
 * You can import it from another modules like this:
 * let mod = require('role.builder')
 * mod.thing == 'a thing'; // true
 */
let creepAction = require('creep.action')
let common = require('common')
module.exports = {
	run: function (creep) {
        if(!creep.memory.building && creep.store.getFreeCapacity() > 0){
            creepAction.harvest(creep)
        }else{
            creepAction.build(creep)
        }
	}
};