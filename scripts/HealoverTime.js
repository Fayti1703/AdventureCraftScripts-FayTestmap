if(player.health != player.maxHealth) {
healTime++;
if(healTime == NaN) {healTime = 1}
if(healTime == 40) {
player.heal(1)
healTime = 0
}
}