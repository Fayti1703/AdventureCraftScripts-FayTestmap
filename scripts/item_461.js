newuse = true
if(inv.getCurrentItem().itemID == 461)
{
    swingRHand()
    if(newuse == true)
    {
        if(shield_used == 0 && hitEntity == null)
        {
            player.heal(4)
            shield_used = 1
            chat.print("You have been healed by 1 Heart (4 Life)")
            time.sleep(10)
            shield_used = 0
        }
        else{chat.print("Cooling down!!")}
    }
}
else if(inv.getOffhandItem().itemID == 461)
{

    swingLHand()
    if(newuse == true)
    {
        if(shield_used == 0 && hitEntity == null)
        {
            player.heal(4)
            shield_used = 1
            chat.print("You have been healed by 1 Heart (4 Life)")
            time.sleep(10)
            shield_used = 0
        }
        else{chat.print("Cooling down!!")}
    }
}
