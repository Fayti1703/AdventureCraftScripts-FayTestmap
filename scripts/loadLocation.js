player.setPosition(saveLocation)
effect.spawnParticle("portal",pos.x + 2,pos.y - 2,pos.z + 2,0,0,0)
keyboard.unbindKey(20)
keyboard.unbindKey(keyboard.getKeyID("L"))
keyboard.unbindKey(keyboard.getKeyID("E"))
keyboard.unbindKey(keyboard.getKeyID("S"))
player.setStunned(0)
used = false
YouwantQuestion.removeFromScreen()
TeleportQuestion.removeFromScreen()
saveQuestion.removeFromScreen()
sound.playSoundUI("sound.warp")
var pos = player.getPosition()
for(var j=0;j<20;j++) {
effect.spawnParticle("portal",pos.x - (Math.random * 1.5),pos.y + (Math.random * 1.5),pos.z - (Math.random * 1.5),0,1,0)
effect.spawnParticle("portal",pos.x + (Math.random * 1.5),pos.y + (Math.random * 1.5),pos.z + (Math.random * 1.5),0,1,0)
}