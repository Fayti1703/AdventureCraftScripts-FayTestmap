if (inv.getSlotContainingItem(600) != -1)
{
    if (inv.getSlotContainingItem(600) == 35)
    {
        if (inv.getItemInSlot(35).getDamage() <= -1)
        {
            inv.getItemInSlot(35).setDamage(inv.getItemInSlot(35).getDamage() + 65536);
        }
        inv.getItemInSlot(35).setQuantity(inv.getItemInSlot(35).getDamage());
    }
}