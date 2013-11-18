spawningPos = pos.add(player.lookVec)
fireball = world.spawnEntity("Fireball",spawningPos.x,spawningPos.y,spawningPos.z)
spawnlookVec = Vec3(player.lookVec.x / 4,player.lookVec.y / 4,player.lookVec.z / 4)
fireball.setVelocity(spawnlookVec)