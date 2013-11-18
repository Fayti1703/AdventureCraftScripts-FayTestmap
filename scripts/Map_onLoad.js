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
function ShowTPStoneLabels() {
if(typeof saveLocation == "undefined")
{
YouwantQuestion = UILabel("What do you want to do?",width / 2 - 10,height / 2 - 35);YouwantQuestion.centered = true;
YouwantQuestion.blue = 0.75;YouwantQuestion.red = 0.25;YouwantQuestion.green = 0.25;
TeleportQuestion = UILabel("Press T to go the the Teleport Station",width / 2 - 10,height / 2 - 15);TeleportQuestion.centered = true;
TeleportQuestion.blue = 0.75;TeleportQuestion.red = 0.25;TeleportQuestion.green = 0.25;
saveQuestion = UILabel("Press S to save the current Location",width / 2 - 10,height / 2 + 15);saveQuestion.centered = true;
saveQuestion.blue = 0.75; saveQuestion.red = 0.25; saveQuestion.green = 0.25;
}
if(typeof saveLocation != "undefined")
{
YouwantQuestion = UILabel("What do you want to do?",width / 2 - 10,height / 2 - 30);YouwantQuestion.centered = true;
YouwantQuestion.blue = 0.75;YouwantQuestion.red = 0.25;YouwantQuestion.green = 0.25;
TeleportQuestion = UILabel("Press T to go the the Teleport Station",width / 2 - 10,height / 2 - 10);TeleportQuestion.centered = true;
TeleportQuestion.blue = 0.75;TeleportQuestion.red = 0.25;TeleportQuestion.green = 0.25;
saveQuestion = UILabel("Press S to save the current Location",width / 2 - 10,height / 2 + 10);saveQuestion.centered = true;
saveQuestion.blue = 0.75; saveQuestion.red = 0.25; saveQuestion.green = 0.25;
loadQuestion = UILabel("Press L to load the prior saved Location",width / 2 - 10,height / 2 + 25);loadQuestion.centered = true;
loadQuestion.blue = 0.75; loadQuestion.red = 0.25; loadQuestion.green = 0.25;
}
}
Christian.drinkCoffeeTime = 0
//List of most Items (seprate)
script.runScript("AllItems.js")
effect.clearOverlay()
