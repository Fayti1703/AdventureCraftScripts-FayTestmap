for (var i = 0; i < spawnedEntities.length; i++) {
    var ent = spawnedEntities[i];
    if (!ent.isAlive()) {
        if (k[i] < 10) {
            var drops = ent.getEntitiesWithinRange(1);
            for (var j = 0; j < drops.length; j++) {
                if (drops[j].getClassType() == "Item") {
                    drops[j].setDead();
            }   }
            k[i]++;
        }
        else {
            drop(ent);
            ent.spawnExplosionParticle();
            ent.setDead();
            k.splice(i, 1);
}   }   }