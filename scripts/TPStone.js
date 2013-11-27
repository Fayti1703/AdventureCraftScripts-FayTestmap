if(used == false)
{
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
player.setStunned(999999)
used = true
if(typeof saveLocation != "undefined") {keyboard.bindKey(keyboard.getKeyID("L"),"loadLocation.js")}
keyboard.bindKey(20,"ToTPStation.js")
keyboard.bindKey(keyboard.getKeyID("S"),"saveLocation.js")
keyboard.bindKey(keyboard.getKeyID("E"),"exit.js")
}