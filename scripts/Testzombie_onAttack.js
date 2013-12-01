if(entity.isAlive() && entity.getHurtTime() == 0)
{
try {
	if(entity.getHealth() - attackingDamage <= 0) {sound.playSound3D("sound.zombieDeath", entity.position.x, entity.position.y, entity.position.z);}
	else{sound.playSound3D("sound.zombieHit", entity.position.x, entity.position.y, entity.position.z);}
	entity.setHealth(entity.getHealth() - attackingDamage);
}
catch(e) {}
try {
chat.print(attackingEntity)
} catch(e) {if(e) chat.print("Generic")}
entity.setVelocity(player.lookVec.x / 2,0.4,player.lookVec.z / 2);
entity.setHurtTime(10)
}
false;