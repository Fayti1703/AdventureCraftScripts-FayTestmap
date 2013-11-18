hitBlock = player.rayTrace(pos,player.lookVec.scale(4).add(pos))[1]
if(newuse == true) {
newuse = false
if(hitBlock == null)
{
hitBlockID = 0
}
else
{
hitBlockID = world.getBlockID(hitBlock.x,hitBlock.y,hitBlock.z)
}
if(hitBlockID != 0 && hitBlockID == 3) {
world.setBlockID(hitBlock.x,hitBlock.y,hitBlock.z,2)
for(var i=0; i<8; i++)
{
var red = baseRed+0.1*Math.random()-0.05;
var green = baseGreen+0.1*Math.random()-0.05;
var blue = baseBlue+0.1*Math.random()-0.05;
effect.spawnParticle("reddust", hitBlock.x+0.5*Math.random()+0.5, hitBlock.y+1+0.25*Math.random(), hitBlock.z+0.5*Math.random()+0.5, red, green, blue);
}
}
else if(hitBlockID != 0) {
chat.print("Steve: \"I guess I should use it on dirt...\"")
}
time.sleep(0.5)
newuse = true
}