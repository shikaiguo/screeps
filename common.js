/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing'
 *
 * You can import it from another modules like this:
 * let mod = require('role.builder')
 * mod.thing == 'a thing'; // true
 */
let common = {
    freeMemory: function(){
        // creeps
        for(let name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name]
                console.log('Clearing non-existing creep memory:', name)
            }
        }
    }
}

module.exports = common;