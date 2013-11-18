try {
itemID = 287
Sandposx = -64
Sandposy = 5
Sandposz = 71
if(hitBlock.x == Sandposx && hitBlock.y == Sandposy && hitBlock.z == Sandposz)
{
world.triggerBlock(-62,6,70)
if(inv.getCurrentItem().itemID == 287) {swingRHand()}
if(inv.getOffhandItem().itemID == 287) {swingLHand()}
}
} catch(e) {}