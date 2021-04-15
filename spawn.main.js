let config = require('config')
let spawn = {
    run: function(){
        for(let i in config.creepMap){
            let creeps = _.filter(Game.creeps, (creep)=> creep.memory.role == i)
            if(creeps.length < config.creepMap[i].n){
                let skill     = this._skill(config.creepMap[i].skill||[3,1,1])
                let idleSpawn = this._idle(skill.energy)
                if(!idleSpawn){
                    continue
                }
                let status = idleSpawn.spawnCreep(skill.skill, `${i}_${Game.time}`, {
                    memory: {
                        role: i,
                        sign: config.creepMap[i].sign
                    }
                })
                switch(status){
                    case OK:
                        idleSpawn.memory.taskTime = Game.time
                        break;
                    default:
                        console.log(`create ${i} fail: ${status}`)
                }
            }
        }
    },
    _idle: function(skillValue){
        for(let i in Game.spawns){
            if(Game.spawns[i].spawning == null && Game.spawns[i].memory.taskTime != Game.time && skillValue <= Game.spawns[i].room.energyAvailable){
                return Game.spawns[i]
            }
        }
        return false
    },
    _skill: function(skillArr){
        let skill = []
        let total = 0
        for(let i in skillArr){
            let j = skillArr[i]
            while(j--){
                skill.push(config.skillMap[i])
                total += config.skillValue[i]
            }
        }
        return {
            skill: skill,
            energy: total,
        }
    },
}
module.exports = spawn