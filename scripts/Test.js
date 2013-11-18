PosofSword = inv.getSlotContainingItem(267)
if(PosofSword == undefined)
{
}
else
{
    if(PosofSword != 0)
    {
        try {
        inv.emptySlot(PosofSword)
        inv.setSlot(0, Item(267))
        } catch(e) {}
    }
}