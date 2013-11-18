ShootPower = 20
ShootPowery = 10
ShootVec = Vec3(player.lookVec.x * ShootPower,player.lookVec.y * ShootPowery,player.lookVec.z * ShootPower)
player.setVelocity(ShootVec)