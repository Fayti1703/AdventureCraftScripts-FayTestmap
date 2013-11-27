unuseable = true
if(world.getBlockID(pos.x,pos.y,pos.z) == 0 || world.getBlockID(pos.x,pos.y,pos.z) == 8 || world.getBlockID(pos.x,pos.y,pos.z) == 9) {
if(world.getBlockID(pos.x,pos.y + 1,pos.z) == 0 || world.getBlockID(pos.x,pos.y,pos.z) == 8 || world.getBlockID(pos.x,pos.y,pos.z) == 9) {
saveLocation = new Vec3(pos.x,pos.y + 1,pos.z)
keyboard.unbindKey(20)
keyboard.unbindKey(keyboard.getKeyID("L"))
keyboard.unbindKey(keyboard.getKeyID("S"))
player.setStunned(0)
used = false
YouwantQuestion.removeFromScreen()
TeleportQuestion.removeFromScreen()
saveQuestion.removeFromScreen()
try {
  loadQuestion.removeFromScreen()
} catch(e) {}
unuseable = false
}
}
if(unuseable) {
  chat.print("You can't save this location!")
}
