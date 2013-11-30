LFL = UILabel("Losing Focus...",ui.getWidth()/2+120,14);LFL.red = 1;LFL.blue = 0.25;LFL.green = 0.25
LFL.removeFromScreen()
timeE = []
shipResetTimer = 0
healTime = 0
sleepchoise = "none"
DoHideS = false
DoShowS = false
debug = false
sleepTimer = 0
afterSleepTimerRun = false
afterSleepTimer = 0
endSleep = true
sleepEffect = UISprite("sleepEffect.png",0,0,width,height,0,0);sleepEffect.alpha = 0;sleepEffect.blue = 1;sleepEffect.red = 1;sleepEffect.green = 1
player.setStunned(0)
sleeping = undefined
//keyboard.bindAllKeyScript("sculptKey.js")
//script.runScript("sculptingLoad-v2.js")
TPStoneInUse = false
showSleep = function showSleep()
{
if(sleepEffect.alpha == 1)
{
    DoShowS = false
}
else {sleepEffect.alpha = sleepEffect.alpha + 0.1}
}
hideSleep = function hideSleep()
{
if(sleepEffect.alpha == 0)
{
DoHideS = false
}
else {sleepEffect.alpha = sleepEffect.alpha - 0.1}
}
keyboard.bindKey(62,"Reset.js")
//Stacks above 64 Load(seprate)
time.sleep(1)
script.runScript("L_Stack.js")
spawn = function spawn(Name)
{
"Usage: spawn(\"ClassType\")"
random1 = Math.random() * 5
random3 = Math.random() * 5
var SpawnedEntity = world.spawnEntity(Name,pos.x + random1,pos.y,pos.z + random3)
chat.print(Name + " spawned!")
return SpawnedEntity
}
give = function give(id) {
player.dropItem(Item(id))
}
TPSP = new Vec3(-58,58,23)
Christian.drinkCoffeeTime = 0
//List of most Items (seprate)
script.runScript("AllItems.js")
effect.clearOverlay()
