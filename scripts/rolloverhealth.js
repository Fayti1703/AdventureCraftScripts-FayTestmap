//*******************************//
//  Start of Code for            //
//  Rollover Health 1.0          //
//                               //
//*******************************//
if(typeof doStuffLF == undefined) {doStuffLF = false}
if(typeof debugStuff == undefined) {debugStuff = false}
function clear() {
try {
var currentLine = 0
display1.removeFromScreen()
var currentLine = 1
display2.removeFromScreen()
var currentLine = 2
display3.removeFromScreen()
var currentLine = 3
display4.removeFromScreen()
var currentLine = 4
display5.removeFromScreen()
var currentLine = 5
LFL.removeFromScreen()
var currentLine = 6
LFTL.removeFromScreen()
var currentLine = 7
} catch(e) {if(debugStuff){chat.print(e);chat.print("at "+ currentLine)}}
uiO = false
}
if(typeof timeing == undefined)
{
timeing = 0
}

try {
LFTL.removeFromScreen()
LFL.removeFromScreen()
} catch(e){if(debugStuff){chat.print(e)}}

//Say the hitted Entity is normal
Normal = true

//and not Stunned
Stunned = false

// How far should the mob before we ignore them
var mobDistance = 30;

// Calculate the target position by using the look vector plus player's position
var lookVec = player.lookVec
var target = player.lookVec.scale(mobDistance).add(pos);

// Ray trace to find out if we hit anything
var results = player.rayTrace(pos, target);
hitPos = results[0];
blockCoords = results[1];
entityHit = results[2];

if(entityHit != null) {
var alive = entityHit.isAlive()
timeing = 0
}
//if(entityHit != null && !alive) {clear()}
//if( entityHit == null ||
 //   entityHit.getClassType() == "NPC"  || // Remove this line if you want to display NPC health aswell
//	entityHit.getClassType() == "Painting" ||
	//entityHit.getClassType() == "FallingSand" ||
	//entityHit.getClassType() == "Mob" ||
	//entityHit.getClassType() == "Minecart" ||
	//entityHit.getClassType() == "Boat" )
//{
if( timeing > 100)
{
clear();
}
//}

if(entityHit != null && alive)
{
clear();
}

if(	entityHit != null &&
	entityHit.getClassType() != "NPC"  && // Remove this line if you want to display NPC health aswell
	entityHit.getClassType() != "Painting" &&
	entityHit.getClassType() != "FallingSand" &&
	entityHit.getClassType() != "Mob" &&
	entityHit.getClassType() != "Minecart" &&
	entityHit.getClassType() != "Boat" )
{
    timeing = 0
    uiO = true
    var currentLine = 0
	// To fix a weird bug where some mobs have more health then they should
	// Should look into that more
	if(entityHit.health > entityHit.maxHealth)
		entityHit.maxHealth = entityHit.health;
	
	// Now we draw the display
	HealthPcnt = entityHit.health/entityHit.maxHealth;
    clear()
	display1 = UIRect((ui.getWidth()/2)-(104),4,208,32,(0.0 + (1.0-HealthPcnt))*0.1,1.0*HealthPcnt*0.1,0.0,0.6)
	display2 = UIRect((ui.getWidth()/2)-(100),18,200,14,0.0,0.0,0.0,0.5)
	display3 = UIRect((ui.getWidth()/2)-(100),18,200*HealthPcnt,14,(0.0 + (1.0-HealthPcnt)),1.0*HealthPcnt,0.0,0.5);
	DaString = Math.max(Math.round(100*HealthPcnt),0)+"%";
	DaClass = entityHit.getClassType();
	DaName = DaClass
	if(DaClass == "Script" && entityHit.getHeldItem().itemID == 268)
	{
	DaName = "Human Zombie" //It's a Human Zombie!
	Normal = false
	}
	if(DaClass == "SkeletonSword")
	{
	Normal = false
	DaName = "Skeleton with Sword" //It's a Skeleton with a Sword!
	}
    if(DaClass == "SkeletonBoss")
    {
    Normal = false
    DaName = "Skeleton Boss" //It's a Skeleton Boss!
    }
	if(entityHit.stunned > 0)
	{
	DaDisplay = "Stunned " + DaName //So its Stunned,display that.
	Normal = false
	Stunned = true
	}
	if(Stunned == false)
	{
	DaDisplay = DaName
	}
	display4 = UILabel(DaDisplay,(ui.getWidth()/2)-(ui.getStringWidth(DaDisplay)/2),8)
	display5 = UILabel(DaString,(ui.getWidth()/2)-(ui.getStringWidth(DaString)/2),21)
    clear = false
}
else if(timeing < 100) {
    LFTL = UILabel(Math.round((100 - timeing) / 20)+" s",ui.getWidth()/2+120+45,22);LFL.red = 1;LFL.blue = 0.25;LFL.green = 0.25
    LFL = UILabel("Losing Focus...",ui.getWidth()/2+120,14);LFL.red = 1;LFL.blue = 0.25;LFL.green = 0.25
}
    timeing = timeing + 1
//*******************************//
//  End of Code for              //
//  Rollover Health 1.0          //
//                               //
//*******************************//

