//Bindings
    //Debug Mode Switch Detector
        keyboard.bindKey(keyboard.getKeyID("F4"),"debugswitch.js")
    //Fireball (Debug stuff!)
        keyboard.bindKey(45,"fireball.js")
//Global Timers
    //Ship Reset (~~ SPOILER ALERT ~~)
    shipResetTimer = shipResetTimer + 1
    //Heal over Time
        //NOTE: EXTERNAL :P
if(keyboard.isKeyDown(keyboard.getKeyID("F10"))) {chat.print(debug)}
//Defining
    //Position
        pos = player.getPosition()
    //Inventory
        inv = player.getInventory()
    //Speed
        playerspeed = player.moveSpeed
    //Function "SwingRHand()"[Swings the Right Hand] and "SwingLHand()"[Swings the left hand]
        function swingRHand(){player.swingMainHand()}
        function swingLHand(){player.swingOffHand()}
    //Entities around the player[20 Blocks]
        pentities = player.getEntitiesWithinRange(20);
        for(var i=0; i<pentities.length; i++)
        {
            pent = pentities[i];
        }
    //Jump Velocity
    jumpVelocity = player.jumpVelocity
	//Width and Height of screen
        width = ui.getWidth()
        height = ui.getHeight()
    //Check if near... function
    isNear = function isNear(scriptPos,shouldpos)
    {
    aboutPos = Vec3(Math.round(scriptPos.x),Math.round(scriptPos.y),Math.round(scriptPos.z))
    if(aboutPos == shouldpos) {return true} else {return false}
    }
	//LookVec
	lookVec = player.lookVec
	//NULL
	printxyz = function printxyz(argVec) {
	chat.print(argVec.x)
	chat.print(argVec.y)
	chat.print(argVec.z)
	}
//Scripts
    //Sprint

        //Check if Sprint-Key is Pressed
        if(keyboard.isKeyDown(29) == true) //Here LControl
        {
            //Set into Sprint Speed
            player.moveSpeed = 1.7
            //Set into Sprint Jump Velocity
            player.jumpVelocity = 0.42 * 1.2
        }
        else
        {   //If its not already....
            if (player.moveSpeed >= 1.1)
            {   //Set to normal Speed
            player.moveSpeed = 1
            }
            //Also ...
            if(player.jumpVelocity >= 0.43)
            { //Set into normal Jumpvelocity
            player.jumpVelocity = 0.42
            }
        }
    //Item Manager
        //IronSword always in first Slot
            PosofSword = inv.getSlotContainingItem(267)
            if(PosofSword != -1)
            {
                if(PosofSword != 0)
                {
                    try
                    {
                        inv.emptySlot(PosofSword)
                        pitem = inv.getItemInSlot(0)
                        inv.setSlot(0, Item(267))
                        inv.setCursorItem(Item(pitem.getItemID(),pitem.getQuantity(),pitem.getDamage()));
                    }
                    catch(e) {}
                }
            }
        //Shield always in Second Slot
            PosofShield = inv.getSlotContainingItem(461)
            if(PosofShield != -1)
            {
                if(PosofShield != 1)
                    {
                        try
                        {
                            inv.emptySlot(PosofShield)
                            pitem = inv.getItemInSlot(1)
                            inv.setSlot(1, Item(461))
                            inv.setCursorItem(Item(pitem.getItemID(),pitem.getQuantity()));
                        }
                        catch(e) {}
                    }
            }
		//Feather Vanish
			inv.consumeItem(288)
    //Resets Sugar Canes after Death[Needed Due to AdventureCraft bug (Version: r1095)]
    if(player.isAlive() == 0)
    {
        world.triggerBlock(-98,64,-97)
    }
	//Sleep (seprate)
    script.runScript("sleeping.js")
	//Bugfix Sleep
	if(sleepEffect.alpha > 1)
	{
	sleepEffect.alpha = 1
	}
	if(sleepEffect.alpha < 0)
	{
	sleepEffect.alpha = 0
	}
	//Rolloverhealth(seprate)
    if(rollhealth) {
	script.runScript("rolloverhealth.js")
    }
	//Stacks above 64 update(seprate)
	script.runScript("U_Stack.js")
	//Fly up(debug only)
	if(keyboard.isKeyDown(keyboard.getKeyID("I")))
	{
		player.setVelocity(player.getVelocity().x,0.3,player.getVelocity().z)
	}
    if(TPStoneInUse)
    {
    ShowTPStoneLabels()
    }
    //Heal over time (seprate)
    script.runScript("healovertime.js")
    //sculpt Tool (seprate)
    //script.runScript("sculptingUpdate-v2.js")
	//Money GUI (seprate)
	script.runScript("Displaymoney.js")
    //Reseting Ship (~~ SPOILER ALERT ~~)
    if(shipResetTimer >= 60)
    {
    world.triggerBlock(-76,62,103)
    world.triggerBlock(-86,62,133)
    shipResetTimer = 0
    }
    //Health Pack (seprate)
    //script.runScript("healPack.js")
    