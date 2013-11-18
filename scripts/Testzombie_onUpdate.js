if(timeE == undefined)
{
timeE = []
}
if(timeE[entity.entityID] == undefined)
{
timeE[entity.entityID] = 0
}
timeE[entity.entityID] = timeE[entity.entityID] + 1

if(entity.health == 0) {entity.setDead();}
if(entity.isAlive())
{
if(timeE[entity.entityID] == 60)
{
entity.pathToEntity(player)
timeE[entity.entityID] = 0
}
for(i=0;i<entity.getEntitiesWithinRange(2).length;i++)
{
if(entity.getEntitiesWithinRange(2)[i] != undefined && entity.getEntitiesWithinRange(2)[i].getClassType() == "Player")
{
player.attackEntityFrom(entity,2)
}
}
}
false
