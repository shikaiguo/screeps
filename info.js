let info = {
    print: function(){
        if(Game.time%5){
            return
        }
        for(let i in Game.rooms){
            let msg = []
            msg.push(`room ${Game.rooms[i].name} - ${Game.time}`)
            msg.push(this._energy(Game.rooms[i]))
            msg.push(this._source(Game.rooms[i]))
            msg.push(this._construction(Game.rooms[i]))
            console.log(msg.join('\n'))
        }
    },
    _energy: function(room){
        return `energy: ${room.energyAvailable} / ${room.energyCapacityAvailable}`
    },
    _source: function(room){
        let targets = room.find(FIND_SOURCES)
        if(!targets.length){
            return
        }
        let msg = ['[sources]:']
        for(let i in targets){
            let creeps = _.filter(Game.creeps, (creep) => {
                return creep.memory.sourceId == targets[i].id
            })
            msg.push(`  ${targets[i].id}: ${targets[i].energy}/${targets[i].energyCapacity} (${targets[i].ticksToRegeneration}s) - ${creeps.length}`)
        }
        return msg.join('\n')
    },
    _construction: function(room){
        let targets = room.find(FIND_MY_CONSTRUCTION_SITES)
        if(!targets.length){
            return
        }
        let msg = ['[contructions]:']
        for(let i in targets){
            msg.push(`  ${targets[i].structureType}(${targets[i].id}): ${targets[i].progress}/${targets[i].progressTotal}`)
        }
        return msg.join('\n')
    }
}

module.exports = info;