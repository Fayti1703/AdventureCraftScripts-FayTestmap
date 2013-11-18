//**********************************//
//  Start of Code for               //
//  Sleeping day/night 1.0          //
//                                  //
//**********************************//
if(sleepchoise == "day") { //If you choised to sleep to day
if(sleeping == true) //And Sleeping is enabled
{
    player.setStunned(1000) //Stun the player
    ui.hudEnabled = false //Turn off HUD
    sleepTimer++; //Adding one to sleeptimer per tick
}
if(sleeping == false) //If Sleeping is completed
{
    time.setRate(1) //Time rate is normal
    ui.hudEnabled = true // Turn on HUD
    sleeping = undefined //Undefine Sleeping Status (so won´t run again)
}
if(sleeping != undefined && time.get() >= 500 && time.get() <= 600) //If the time is ready 
{
sleeping = false //Sleeping Status = completed !
}
if(sleeping == undefined && endSleep == false) { //After Sleep
sleepTimer = 0 //SleepTimer reset
effect.setOverlay("sleepingawoke.png") //You awoke overlay
afterSleepTimerRun = true //afterSleepTimer does run now
time.setRate(1) //Time rate normal
endSleep = true //So runs only once per sleep
afterSleepTimer = 0 //afterSleepTimer reset
}
//After ... Second(s) means from Start!!
if(sleepTimer == 1) { //Just after Start
effect.setOverlay("sleepingstarted.png")//Started Sleep overlay
}
if(sleepTimer == 21) { //After 1 Second
effect.setOverlay("sleepingafter1.png") //New Overlay!
}
if(sleepTimer == 41) { //After 2 Seconds
effect.setOverlay("sleepingafter2.png") //New Overlay!
}
if(sleepTimer == 61) { //After 3 Seconds
effect.setOverlay("sleepingafter3.png") //New Overlay!
}
if(sleepTimer == 81) { //After 4 Seconds
effect.setOverlay("sleepingafter4.png") //New Overlay!
}
if(sleepTimer == 101 && endSleepTimer == false) { //After 5 Seconds and if not done already
effect.setOverlay("sleepingdone.png") //Final Sleep overlay
time.setRate(60) //Time rate to 60 (Time is racing!!)
endSleepTimer = true //It´s done so don´t run again
}
}
if(afterSleepTimerRun == true) { //If aftersleepTimer is running
afterSleepTimer = afterSleepTimer + 1; //afterSleepTimer is afterSleepTimer + 1
if(afterSleepTimer >= 60) { //After 3 Seconds
effect.clearOverlay() //Remove overlay
player.setStunned(0) //Remove Stun
afterSleepTimerRun = false //afterSleepTimer doesn´t run anymore.
}
}
if(sleepchoise == "night") { //If you choised to sleep to night
//For comments look at day part
if(sleeping == true)
{
    player.setStunned(1000)
    ui.hudEnabled = false
    sleepTimer++;
}
if(sleeping == false)
{
    time.setRate(1)
    ui.hudEnabled = true
    sleeping = undefined
}
if(sleeping != undefined && time.get() >= 15000 && time.get() <= 15100 )
{
sleeping = false
}
if(sleeping == undefined && endSleep == false) {
sleepTimer = 0
effect.setOverlay("sleepingawoke.png")
afterSleepTimerRun = true
time.setRate(1)
endSleep = true
}
if(sleepTimer == 1) {
effect.setOverlay("sleepingstarted.png")
}
if(sleepTimer == 21) {
effect.setOverlay("sleepingafter1.png")
}
if(sleepTimer == 41) {
effect.setOverlay("sleepingafter2.png")
}
if(sleepTimer == 61) {
effect.setOverlay("sleepingafter3.png")
}
if(sleepTimer == 81) {
effect.setOverlay("sleepingafter4.png")
}
if(sleepTimer == 101 && endSleepTimer == false) {
effect.setOverlay("sleepingdone.png")
time.setRate(60)
endSleepTimer = true
}
}
if(afterSleepTimerRun == true) {
afterSleepTimer++;
if(afterSleepTimer >= 60) {
effect.clearOverlay()
player.setStunned(0)
afterSleepTimerRun = false
}
}