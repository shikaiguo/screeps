const common = require("./common");

let action = {
    attack:function(){},
    pickup:function(creep){
        // 搜索所有掉落资源
        let targets = creep.room.find(FIND_DROPPED_RESOURCES, {
            filter: (o) => {
                // return Memory.resources[o.id] == null
            }
        });
        if(!targets.length){
            return false
        }
        targets = _.sortBy(targets, function(o){
            return -o.amount
        })
        switch(creep.pickup(targets[0])){
            case OK:
                break;
            case ERR_INVALID_TARGET:
                break;
            case ERR_NOT_IN_RANGE:
                this.moveTo(creep, targets[0])
                break;
        }
        return true
    },
    transfer:function(creep){
        delete(creep.memory.sourceId)
        let targets = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (o) => {
                return (o.structureType == STRUCTURE_EXTENSION ||
                    o.structureType == STRUCTURE_SPAWN ||
                    o.structureType == STRUCTURE_TOWER) &&
                    o.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            }
        })
        if(0 == targets.length){
            return
        }
        let priority = {
            [STRUCTURE_TOWER]: 100,
            [STRUCTURE_EXTENSION]: 200,
            [STRUCTURE_SPAWN]: 300
        }
        targets = _.sortBy(targets, function(o){
            return priority[o.structureType] + 
            100*parseInt(o.store.getUsedCapacity(RESOURCE_ENERGY)/o.store.getCapacity(RESOURCE_ENERGY))
        })
        let status = creep.transfer(targets[0], RESOURCE_ENERGY)
        switch(status){
            case ERR_NOT_IN_RANGE:
                this.moveTo(creep, targets[0], {stroke: '#ffff00'});
            default:
        }
    },
    build:function(creep){
        delete(creep.memory.sourceId)
        let targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES)
        if(!creep.memory.building && !targets.length){
            this.transfer(creep)
            return
        }
        targets = _.sortBy(targets, function(o){
            return o.progressTotal - o.progress
        })
        creep.memory.building = true
        switch(creep.build(targets[0])){
            case ERR_NOT_IN_RANGE:
                this.moveTo(creep, targets[0], {stroke: '#ff0000'})
                break
            case ERR_INVALID_TARGET:
            case ERR_NOT_ENOUGH_RESOURCES:
                creep.memory.building = false
                break
        }
    },
    upgrade:function(creep){
        delete(creep.memory.sourceId)
        switch(creep.upgradeController(creep.room.controller)){
            case ERR_NOT_IN_RANGE:
                this.moveTo(creep, creep.room.controller, {stroke: "#0000ff"})
        }
    },
    heal:function(){},
    repair:function(){},
    moveTo:function(creep, target, style){
        style = style || {}
        creep.moveTo(target, {
            visualizePathStyle: _.extend({
                opacity: .1,
                lineStyle: 'dotted'
            }, style)
        })
    },
    harvest:function(creep){
        if(typeof(creep.memory.sourceId) === "undefined"){
            creep.say('creep.memory.sourceId')
            let targets = creep.room.find(FIND_SOURCES_ACTIVE)
            if(!targets.length){
                return
            }
            targets = _.sortBy(targets, function(o){
                return _.filter(Game.creeps, (creep)=> {
                    return creep.memory.sourceId == o.id
                }).length
            })
            creep.memory.sourceId = targets[0].id
        }
        let source = Game.getObjectById(creep.memory.sourceId)
        let status = creep.harvest(source)
        switch(status){
            case ERR_NOT_IN_RANGE:
                this.moveTo(creep, source, {stroke: '#00ff00'})
            case ERR_NOT_ENOUGH_RESOURCES:
                delete(creep.memory.sourceId)
            default:
        }
    },
    pull:function(){},
    withdraw: function(creep){
        let targets = creep.room.find(FIND_TOMBSTONES, {
            filter: (o) => {
                return o.store.getFreeCapacity(RESOURCE_ENERGY)>0
            }
        })
        if(targets.length){
            switch(creep.withdraw(targets[0], RESOURCE_ENERGY)){
                case ERR_NOT_IN_RANGE:
                    this.moveTo(creep, targets[0]);
            }
            return
        }
        targets = creep.room.find(FIND_RUINS, {
            filter: (o)=> {
                return o.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            }
        })
        if(targets.length){
            switch(creep.withdraw(targets[0], RESOURCE_ENERGY)){
                case ERR_NOT_IN_RANGE:
                    this.moveTo(creep, targets[0]);
            }
            return
        }
        targets = creep.room.find(FIND_STRUCTURES, {
            filter: (o) => {
                return (o.structureType == STRUCTURE_EXTENSION ||
                    o.structureType == STRUCTURE_SPAWN) &&
                    o.store.getUsedCapacity(RESOURCE_ENERGY) > 0
            }
        })
        switch(creep.withdraw(targets[0], RESOURCE_ENERGY)){
            case ERR_NOT_IN_RANGE:
                this.moveTo(creep, targets[0]);
        }
    }
}

module.exports = action