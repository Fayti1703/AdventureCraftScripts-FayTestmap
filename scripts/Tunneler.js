itemID = 287
try {
if(hitBlock.x == 64 && hitBlock.y == 5 && hitBlock.z == 71)
{
world.setBlockID(64,5,71,0)
if(inv.getCurrentItem().itemID == 287) {swingRHand()}
if(inv.getOffhandItem().itemID == 287) {swingLHand()}
}
} catch(e) {}