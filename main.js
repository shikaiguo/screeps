global._ = require('lodash4')

let info   = require('info')
let common = require('common')

let roleHarvester = require('role.harvester')
let roleUpgrader  = require('role.upgrader')
let roleBuilder   = require('role.builder')
let spawnMain     = require('spawn.main')

module.exports.loop = function () {
    // info.print()
    
    common.freeMemory()

    spawnMain.run()
    
    for(let name in Game.creeps) {
        let creep = Game.creeps[name]
        
        creep.say(creep.memory.sign)
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep)
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep)
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep)
        }
    }
}