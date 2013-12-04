

// Date: 03.12.2013 18:26:12
// Adventurecraft javascript exported from Techne
// If you find any problems with this template feel free to edit it
// but I'd appreciate it if you'd tell me about it so everyone can benefit :)
// - ZeuX
status[entity.entityID] = ["ArrayStatusEntity"]
status[entity.entityID].Body = new Model();
status[entity.entityID].Body.addBox("Body", -8, 28, 0, 16, 16, 1, -1, -1);
status[entity.entityID].Body.setPosition(0, 0, 0);
status[entity.entityID].Body.setRotation(0, 0, 0);

status[entity.entityID].Body.texture = "customEntity/target.png"
status[entity.entityID].Body.attachedTo = entity