h = ui.getHeight()
pinv = player.getInventory()
function clear() {
try {
Sprite.removeFromScreen()
Sprite = undefined
Label.removeFromScreen()
Label = undefined
} catch(e) {}
}
try
{
	if (pinv.getSlotContainingItem(600) == -1)
	{
		var rup = 0
		clear()
		var Sprite = UISprite("gui/items.png",5,h-20,15,15,128,175)
		var Label = UILabel(rup,23,h-15)
	}
	else
	{
		try 
		{
			rup = pinv.getItemInSlot(35).getQuantity()
		}
		catch(e) {}
		clear()
		var Sprite = UISprite("gui/items.png",5,h-20,15,15,128,175)
		var Label = UILabel(rup,23,h-15)
	}
}
catch(e) {}