if(entity.isAlive() && entity.getHurtTime() == 0)
{
try {
	if(entity.getHealth() - attackingDamage <= 0) {sound.playSound3D("sound.zombieDeath", entity.position.x, entity.position.y, entity.position.z);}
	else{sound.playSound3D("sound.zombieHit", entity.position.x, entity.position.y, entity.position.z);}
	entity.setHealth(entity.getHealth() - attackingDamage);
}
catch(e) {}
try {
entity.setVelocity(attackingEntity.lookVec.x / 2,0.4,attackingEntity.lookVec.z / 2);
} catch(e) {}
entity.setHurtTime(10)
}
false;