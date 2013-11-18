if(used == false)
{
TPStoneInUse = true
player.setStunned(999999)
used = true
if(typeof saveLocation != "undefined") {keyboard.bindKey(keyboard.getKeyID("L"),"loadLocation.js")}
keyboard.bindKey(20,"ToTPStation.js")
keyboard.bindKey(keyboard.getKeyID("S"),"saveLocation.js")
keyboard.bindKey(keyboard.getKeyID("E"),"exit.js")
}