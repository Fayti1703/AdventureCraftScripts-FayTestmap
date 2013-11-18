if(hitBlock == null)
{
hitBlockID = 0
}
else
{
hitBlockID = world.getBlockID(hitBlock.x,hitBlock.y,hitBlock.z)
}
if(!debug && hitBlockID != 69 && hitBlockID != 77 && hitBlockID != 54 && hitBlockID != 64 && hitEntity == null)
{
sound.playSoundUI("sound.sword_swing")
}
else if(debug && hitBlockID == 0 && hitEntity == null)
{
sound.playSoundUI("sound.sword_swing")
}
try {
if(inv.getCurrentItem().itemID == 267) {swingRHand()}
if(inv.getOffhandItem().itemID == 267) {swingLHand()}
} catch(e) {}