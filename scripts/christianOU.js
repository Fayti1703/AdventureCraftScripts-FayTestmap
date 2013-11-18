if(typeof Christian == "undefined") {Christian = ["net.minecraft.script.ScriptHumanChristian"]}
Christian.entity = entity
entity.fov = 330
if(time.getTime() >= 14000 && Christian.isInBed == false || Christian.isAtTable == false && time.getTime() <= 14000) {world.triggerBlock(8,33,-9);Christian.doorClosed = false} else if(Christian.doorClosed == false) {world.triggerBlock(8,33,-10);Christian.doorClosed = true}
if(Christian.isAtTable == true && Christian.drunkCoffee != true) {
Christian.drinkCoffeeTime = Christian.drinkCoffeeTime + 1
if(Christian.drinkCoffeeTime >= 200) {
Christian.drunkCoffee = true
}
}
if(time.getTime() >= 13000)
{
Christian.drinkCoffeeTime = 0
Christian.drunkCoffee = false
Christian.went = "bed"
Christian.isAtTable = false
entity.pathToBlock(11,37,-6)
}
else {
Christian.went = "table"
Christian.isInBed = false
entity.pathToBlock(4,36,-8)
}
if(keyboard.isKeyDown(keyboard.getKeyID("F9"))) {chat.print(entity.position.x + " , " + entity.position.y + " , " + entity.position.z) }