try {
if(inv.getItemInSlot(35) != null)
{
        if(inv.getItemInSlot(35).getItemID() != 600)
        {
                for(i=0;i<35;i++)
                {
                        if(inv.getItemInSlot(i) == null)
                        {
                                inv.setSlot(i, inv.getItemInSlot(35));
                                inv.emptySlot(35)
                        }
                }
        }
}
} catch(e) {}
if (inv.getSlotContainingItem(600) != -1)
{
    if (inv.getSlotContainingItem(600) != 35)
    {
        try
        {
            var count = inv.getItemInSlot(35).getQuantity();
        }
        catch(e) { var count = 0; }
        var item = inv.getItemInSlot(inv.getSlotContainingItem(600))
        inv.emptySlot(inv.getSlotContainingItem(600));
        if (count < 65535)
        {
            if (item.getQuantity() + count <= 65535)
            {
                item.setQuantity(item.getQuantity() + count);
            }
            else
            {
                item.setQuantity(65535);
            }
        }
        else
        {
            item.setQuantity(65535);
        }
        inv.setSlot(35, item);
    }
    inv.getItemInSlot(35).setDamage(inv.getItemInSlot(35).getQuantity());
}