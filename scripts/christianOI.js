if(debugStuff){chat.print("INTERACTING")} //Just in case to know if you are even interacting because it prints nothing
//STORY

//Normal talk
if(Christian.isAtTable == true && Christian.drunkCoffee == true) {
chat.print("<Christian> \"Hello and Welcome")
chat.print("to my house.\"")
}
else if(Christian.isAtTable == false && Christian.isInBed == false && Christian.went == "bed") {
chat.print("<Christian> yawns : \"So sleepy...\"")
}
else if(Christian.isAtTable == false && Christian.isInBed == false && Christian.went == "table") {
chat.print("<Christian> yawns: \"Hello and Welcome...\"")
}
else if(Christian.isInBed == true) {
chat.print("<Christian> is sleeping")
}
else if(Christian.isAtTable == true && Christian.drunkCoffee == false) {
chat.print("<Christian> is drinking Coffee")
}