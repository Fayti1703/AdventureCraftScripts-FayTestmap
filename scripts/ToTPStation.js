player.setPosition(TPSP)
effect.spawnParticle("portal",pos.x + 2,pos.y - 2,pos.z + 2,0,0,0)
keyboard.unbindKey(20)
keyboard.unbindKey(keyboard.getKeyID("L"))
keyboard.unbindKey(keyboard.getKeyID("L"))
keyboard.unbindKey(keyboard.getKeyID("S"))
effect.spawnParticle("portal",pos.x + 2,pos.y - 2,pos.z + 2,0,0,0)
effect.spawnParticle("portal",pos.x + 2,pos.y - 2,pos.z + 2,0,0,0)
effect.spawnParticle("portal",pos.x + 2,pos.y - 2,pos.z + 2,0,0,0)
effect.spawnParticle("portal",pos.x + 2,pos.y - 2,pos.z + 2,0,0,0)
player.setStunned(0)
used = false
YouwantQuestion.removeFromScreen()
TeleportQuestion.removeFromScreen()
saveQuestion.removeFromScreen()
try {
  loadQuestion.removeFromScreen()
} catch(e) {}
sound.playSoundUI("sound.warp")