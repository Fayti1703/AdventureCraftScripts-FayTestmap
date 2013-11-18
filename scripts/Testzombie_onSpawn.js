texture = "mob/zombie.png"
entity.maxHealth = 20

entity.health = entity.maxHealth
entity.setTexture(texture)
entity.setHeldItem(Item(268)) //Wooden Sword
entity.pathToEntity(player)