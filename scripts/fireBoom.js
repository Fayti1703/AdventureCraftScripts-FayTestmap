if(player.fireLevel <= 0) {
    if(inv.getCurrentItem().itemID == 466 || inv.getOffhandItem().itemID == 466) {
        Bomb = world.spawnEntity("Bomb",pos.x,pos.y,pos.z)
        Bomb.setFireLevel(100)
        inv.consumeItem(466)
    }
}