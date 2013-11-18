didT = false
didI = false
if(time.getTime() < 20000)
{
rTime = true
}
else
{
rTime = false
}
if(inv.getCurrentItem() == null && inv.getOffhandItem() == null)
{
rItems = true
}
else
{
rItems = false
}

if(rTime && rItems)
{
sleepchoise = "night"
endSleepTimer = false
endSleep = false
sleepTimer = 0
sleeping = true
}
if(!rTime)
{
chat.print("Steve:")
chat.print("\"It is already night.\"");
}
else if(!rItems)
{
chat.print("Steve:");
chat.print("\"I should put my stuff away");
chat.print("before I sleep.\"");
}