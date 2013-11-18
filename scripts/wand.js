var previousTarget;
var previousTime;
if(previousTarget == undefined)
{
previousTarget = null;
previousTime = 0;
}
 
// How far should this wand reach
var reachDistance = 32;
 
// Calculate the target position by using the look vector plus player's position
var pos = player.position
var lookVec = player.lookVec
var target = player.lookVec.scale(reachDistance).add(pos);
 
// Ray trace to find out if we hit anything
var results = player.rayTrace(pos, target);
var hitPos = results[0];
var blockCoords = results[1];
var entityHit = results[2];
 
// See if there is a previous target from the previous tick
var currentTime = time.getTickCount();
if(previousTarget != null && (currentTime-previousTime)==1)
{
entityHit = previousTarget;
}
previousTime = currentTime;
previousTarget = entityHit;
 
var baseRed = 0.8;
var baseGreen = 0.2;
var baseBlue = 0.2;
var addParticles = false;
var particleProbability = 0.2;
 
// Do we have an entity and energy left?
if(entityHit != null && itemUsed.damage<itemUsed.maxDamage)
{
// Calculate the target's new position
var targetPos = entityHit.position;
targetPos.y = targetPos.y+entityHit.height/2-entityHit.yOffset;
var dist = targetPos.distance(pos);
var newPos = player.lookVec.scale(dist).add(pos);	
// Make sure we can move the entity to this new position
var results = world.rayTraceBlocks(targetPos, newPos);
if(results[0] != null)
newPos = results[0];
// Set the new position
newPos.y = newPos.y-entityHit.height/2+entityHit.yOffset;
entityHit.setPosition(newPos.x, newPos.y, newPos.z);
hitPos = Vec3(newPos.x, newPos.y, newPos.z);
// Calculate the new velocity
newPos.subtract(targetPos);
dist = newPos.length();
if(dist>2)
{
newPos.scale(2/dist);
}
entityHit.setVelocity(newPos);
 
entityHit.stunned = 1; // Stun the target so it doesn't actually move
itemUsed.damage += 1; // Damage is the way we track usage
addParticles = true;
}
else if(blockCoords != null && itemUsed.damage>0)
{
// Convert grass to dirt and add 1 second of energy
if(world.getBlockID(blockCoords.x, blockCoords.y, blockCoords.z)==2)
{
// Subtract 20 damage from the item
itemUsed.damage = Math.max(itemUsed.damage-20, 0);
// Convert the block to dirt
world.setBlockID(blockCoords.x, blockCoords.y, blockCoords.z, 3);
baseRed = 0.2;
baseGreen = 0.8;
addParticles = true;
particleProbability = 1;
// Add some particles on top of the grass
for(var i=0; i<8; i++)
{
var red = baseRed+0.1*Math.random()-0.05;
var green = baseGreen+0.1*Math.random()-0.05;
var blue = baseBlue+0.1*Math.random()-0.05;
effect.spawnParticle("reddust", blockCoords.x+0.5*Math.random()+0.5, blockCoords.y+1+0.25*Math.random(), blockCoords.z+0.5*Math.random()+0.5, red, green, blue);
}
}
}
 
// Add particles if addParticles is set
if(addParticles)
{
var dist = hitPos.distance(pos);
for(var i=0; i<dist; i++)
{
if(Math.random()<=particleProbability)
{
pos.add(lookVec);
var red = baseRed+0.1*Math.random()-0.05;
var green = baseGreen+0.1*Math.random()-0.05;
var blue = baseBlue+0.1*Math.random()-0.05;
effect.spawnParticle("reddust", pos.x+0.5*Math.random()-0.25, pos.y+0.5*Math.random()-0.25, pos.z+0.5*Math.random()-0.25, red, green, blue);
}
}
}