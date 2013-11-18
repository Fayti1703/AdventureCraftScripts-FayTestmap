didT = false //Time correct? No,unchecked
didI = false //No item in hand? No,unchecked
if(time.getTime() > 13000)
{
rTime = true //Time correct? Yes,checked
}
else
{
rTime = false //Time correct? No,checked
}
if(inv.getCurrentItem() == null && inv.getOffhandItem() == null) //No items in hand, basically
{
rItems = true
}
else
{
rItems = false
}

if(rTime && rItems)
{
sleepchoise = "day"
endSleepTimer = false
endSleep = false
sleepTimer = 0
sleeping = true
}
if(!rTime)
{
chat.print("Steve:")
chat.print("\"It is too early");
chat.print("to sleep.\"");
}
else if(!rItems)
{
chat.print("Steve:");
chat.print("\"I should put my stuff away");
chat.print("before I sleep.\"");
}