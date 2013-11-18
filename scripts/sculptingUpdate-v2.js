//Constant variable changer. This should be the only place to grab attributes at a continuous rate.
var vec = player.getLookVec();
var pos = player.getPosition();
var main = 0;
var offhand = 0;
var offMeta = 0;
try { 
	main = pInv.getCurrentItem().getItemID();
	offhand = pInv.getOffhandItem().getItemID(); 
	offMeta = pInv.getOffhandItem().getDamage(); 
} catch(e) {}

if (main == S_bITEM) {
	//Re-establish UI that only gets updated when holding down keys as soon as the tool is on hand.
	if (UIClear) {
		sUI_tab.text = "*";
		sUI_sBlockID.text = "Selective Block ID: " + selBlockID;
		sUI_pBrushType.text = "Brush Type: " + pBrushType[pBrushType[0]+1];
		sUI_pBrushMode.text = "Brush Mode: " + pBrushMode[pBrushMode[0]+1];
		sUI_pBrushOpacity.text = "Brush Opacity: " + pBrushOpacity[0];
		sUI_pBrushDistance.text = "Brush Distance: " + pBrushDistance[0];
		t2 = (pBrushSize[pBrushType[0]].length - 1) / 3;
		tS = "Brush Size:";
		for(i=0;i<t2;i++) {
			tS += up(pBrushSize[pBrushType[0]][i+t2+1],i,0) + pBrushSize[pBrushType[0]][i+1];
		}
		sUI_pBrushSize.text = tS;
		tS = "Brush Offset:";
		for(i=0;i<3;i++) {
			tS += up(pBrushOffset[i+4],i,1) + pBrushOffset[i+1];
		}
		sUI_pBrushOffset.text = tS;
		UIClear = false;
	}
	
	//Continuous lookAt position checker that stores position of block that's being looked at
	//on the fly.
	for (i = 0; i <= mPaintDist + S_rCHECK; i += S_rINCREMENT) {
		mPaintDist = i
		mPaintPos[0] = Math.floor(vec.x*i+pos.x);
		mPaintPos[1] = Math.floor(vec.y*i+pos.y);
		mPaintPos[2] = Math.floor(vec.z*i+pos.z);
		if (i >= pBrushDistance[0]) { break; }
		if (world.getBlockID(mPaintPos[0],mPaintPos[1],mPaintPos[2]) != 0 ) { break; }
	}
	mPaintPos[0] += pBrushOffset[1];
	mPaintPos[1] += pBrushOffset[2];
	mPaintPos[2] += pBrushOffset[3];
	if ((sKey & 2) != 0 && (sKeyInit & 2) != 0) { mPaintPos[1] = holdY; } //Gotta keep y pos when holding down ctrl.
	
	//Draw the brush shape the player has loaded.
	switch(pBrushType[0]) {
	case 0: //Square
		tT = pBrushSize[0][4] / 1000.0;
		tXL = [	pBrushSize[0][1],
				flerp(pBrushSize[0][1],1,clamp(tT,0,1,false)),
				flerp(pBrushSize[0][1],1,clamp(tT,-1,0,false))];
		tYL = [	pBrushSize[0][2],
				flerp(pBrushSize[0][2],1,clamp(tT,0,1,false)),
				flerp(pBrushSize[0][2],1,clamp(tT,-1,0,false))];
		tZL = [	pBrushSize[0][3],
				flerp(pBrushSize[0][3],1,clamp(tT,0,1,false)),
				flerp(pBrushSize[0][3],1,clamp(tT,-1,0,false))];
		tX = [	mPaintPos[0] - Math.floor(tXL[0]*0.5),
				mPaintPos[0] - Math.floor(tXL[1]*0.5),
				mPaintPos[0] - Math.floor(tXL[2]*0.5)];
		tY = [	mPaintPos[1] - Math.floor(tYL[0]*0.5),
				mPaintPos[1] - Math.floor(tYL[1]*0.5),
				mPaintPos[1] - Math.floor(tYL[2]*0.5)];
		tZ = [	mPaintPos[2] - Math.floor(tZL[0]*0.5),
				mPaintPos[2] - Math.floor(tZL[1]*0.5),
				mPaintPos[2] - Math.floor(tZL[2]*0.5)];
		tXSub = [Math.floor(tXL[0]/S_pSUBDIV[0]),
				Math.floor(tXL[1]/S_pSUBDIV[0]),
				Math.floor(tXL[2]/S_pSUBDIV[0])];
		tYSub = [Math.floor(tYL[0]/S_pSUBDIV[0]),
				Math.floor(tYL[1]/S_pSUBDIV[0]),
				Math.floor(tYL[2]/S_pSUBDIV[0])];
		tZSub = [Math.floor(tZL[0]/S_pSUBDIV[0]),
				Math.floor(tZL[1]/S_pSUBDIV[0]),
				Math.floor(tZL[2]/S_pSUBDIV[0])];
		
		switch(pBrushSize[0][5]) {
		case 0: //X dir
			for(i=0;i<=tZSub[1];i++) {
				effect.spawnParticle(S_PARTICLE,tX[0]+tXL[0],tY[1],tZ[1]+tZL[1]*i/(tZSub[1]+1.0),0,0,0);
				effect.spawnParticle(S_PARTICLE,tX[0]+tXL[0],tY[1]+tYL[1],tZ[1]+tZL[1]*i/(tZSub[1]+1.0),0,0,0);
			}
			for(i=0;i<=tZSub[2];i++) {
				effect.spawnParticle(S_PARTICLE,tX[0],tY[2],tZ[2]+tZL[2]*i/(tZSub[2]+1.0),0,0,0);
				effect.spawnParticle(S_PARTICLE,tX[0],tY[2]+tYL[2],tZ[2]+tZL[2]*i/(tZSub[2]+1.0),0,0,0);
			}
			for(i=0;i<=tYSub[1];i++) {
				effect.spawnParticle(S_PARTICLE,tX[0]+tXL[0],tY[1]+tYL[1]*i/(tYSub[1]+1.0),tZ[1]+tZL[1],0,0,0);
				if (i == 0) { continue; }
				effect.spawnParticle(S_PARTICLE,tX[0]+tXL[0],tY[1]+tYL[1]*i/(tYSub[1]+1.0),tZ[1],0,0,0);
			}
			for(i=0;i<=tYSub[2];i++) {
				effect.spawnParticle(S_PARTICLE,tX[0],tY[2]+tYL[2]*i/(tYSub[2]+1.0),tZ[2]+tZL[2],0,0,0);
				if (i == 0) { continue; }
				effect.spawnParticle(S_PARTICLE,tX[0],tY[2]+tYL[2]*i/(tYSub[2]+1.0),tZ[2],0,0,0);
			}
			for(i=0;i<=tXSub[0];i++) {
				effect.spawnParticle(S_PARTICLE,tX[0]+tXL[0]*i/(tXSub[0]+1.0),flerp(tY[2]+tYL[2],tY[1]+tYL[1],i/(tXSub[0]+1.0)),flerp(tZ[2]+tZL[2],tZ[1]+tZL[1],i/(tXSub[0]+1.0)),0,0,0);
				if (i == 0) {
					effect.spawnParticle(S_PARTICLE,tX[0]+tXL[0],tY[1]+tYL[1],tZ[1]+tZL[1],0,0,0);
					continue;
				}
				effect.spawnParticle(S_PARTICLE,tX[0]+tXL[0]*i/(tXSub[0]+1.0),flerp(tY[2]+tYL[2],tY[1]+tYL[1],i/(tXSub[0]+1.0)),flerp(tZ[2],tZ[1],i/(tXSub[0]+1.0)),0,0,0);
				effect.spawnParticle(S_PARTICLE,tX[0]+tXL[0]*i/(tXSub[0]+1.0),flerp(tY[2],tY[1],i/(tXSub[0]+1.0)),flerp(tZ[2]+tZL[2],tZ[1]+tZL[1],i/(tXSub[0]+1.0)),0,0,0);
				effect.spawnParticle(S_PARTICLE,tX[0]+tXL[0]*i/(tXSub[0]+1.0),flerp(tY[2],tY[1],i/(tXSub[0]+1.0)),flerp(tZ[2],tZ[1],i/(tXSub[0]+1.0)),0,0,0);
			}
			break;
		case 1: //Y dir
			for(i=0;i<=tZSub[1];i++) {
				effect.spawnParticle(S_PARTICLE,tX[1]+tXL[1],tY[0]+tYL[0],tZ[1]+tZL[1]*i/(tZSub[1]+1.0),0,0,0);
				effect.spawnParticle(S_PARTICLE,tX[1],tY[0]+tYL[0],tZ[1]+tZL[1]*i/(tZSub[1]+1.0),0,0,0);
			}
			for(i=0;i<=tZSub[2];i++) {
				effect.spawnParticle(S_PARTICLE,tX[2]+tXL[2],tY[0],tZ[2]+tZL[2]*i/(tZSub[2]+1.0),0,0,0);
				effect.spawnParticle(S_PARTICLE,tX[2],tY[0],tZ[2]+tZL[2]*i/(tZSub[2]+1.0),0,0,0);
			}
			for(i=0;i<=tXSub[1];i++) {
				effect.spawnParticle(S_PARTICLE,tX[1]+tXL[1]*i/(tXSub[1]+1.0),tY[0]+tYL[0],tZ[1]+tZL[1],0,0,0);
				if (i == 0) { continue; }
				effect.spawnParticle(S_PARTICLE,tX[1]+tXL[1]*i/(tXSub[1]+1.0),tY[0]+tYL[0],tZ[1],0,0,0);
			}
			for(i=0;i<=tXSub[2];i++) {
				effect.spawnParticle(S_PARTICLE,tX[2]+tXL[2]*i/(tXSub[2]+1.0),tY[0],tZ[2]+tZL[2],0,0,0);
				if (i == 0) { continue; }
				effect.spawnParticle(S_PARTICLE,tX[2]+tXL[2]*i/(tXSub[2]+1.0),tY[0],tZ[2],0,0,0);
			}
			for(i=0;i<=tYSub[0];i++) {
				effect.spawnParticle(S_PARTICLE,flerp(tX[2]+tXL[2],tX[1]+tXL[1],i/(tYSub[0]+1.0)),tY[0]+tYL[0]*i/(tYSub[0]+1.0),flerp(tZ[2]+tZL[2],tZ[1]+tZL[1],i/(tYSub[0]+1.0)),0,0,0);
				if (i == 0) {
					effect.spawnParticle(S_PARTICLE,tX[1]+tXL[1],tY[0]+tYL[0],tZ[1]+tZL[1],0,0,0);
					continue;
				}
				effect.spawnParticle(S_PARTICLE,flerp(tX[2],tX[1],i/(tYSub[0]+1.0)),tY[0]+tYL[0]*i/(tYSub[0]+1.0),flerp(tZ[2]+tZL[2],tZ[1]+tZL[1],i/(tYSub[0]+1.0)),0,0,0);
				effect.spawnParticle(S_PARTICLE,flerp(tX[2]+tXL[2],tX[1]+tXL[1],i/(tYSub[0]+1.0)),tY[0]+tYL[0]*i/(tYSub[0]+1.0),flerp(tZ[2],tZ[1],i/(tYSub[0]+1.0)),0,0,0);
				effect.spawnParticle(S_PARTICLE,flerp(tX[2],tX[1],i/(tYSub[0]+1.0)),tY[0]+tYL[0]*i/(tYSub[0]+1.0),flerp(tZ[2],tZ[1],i/(tYSub[0]+1.0)),0,0,0);
			}
			break;
		case 2: //Z dir
			for(i=0;i<=tXSub[1];i++) {
				effect.spawnParticle(S_PARTICLE,tX[1]+tXL[1]*i/(tXSub[1]+1.0),tY[1],tZ[0]+tZL[0],0,0,0);
				effect.spawnParticle(S_PARTICLE,tX[1]+tXL[1]*i/(tXSub[1]+1.0),tY[1]+tYL[1],tZ[0]+tZL[0],0,0,0);
			}
			for(i=0;i<=tXSub[2];i++) {
				effect.spawnParticle(S_PARTICLE,tX[2]+tXL[2]*i/(tXSub[2]+1.0),tY[2],tZ[0],0,0,0);
				effect.spawnParticle(S_PARTICLE,tX[2]+tXL[2]*i/(tXSub[2]+1.0),tY[2]+tYL[2],tZ[0],0,0,0);
			}
			for(i=0;i<=tYSub[1];i++) {
				effect.spawnParticle(S_PARTICLE,tX[1]+tXL[1],tY[1]+tYL[1]*i/(tYSub[1]+1.0),tZ[0]+tZL[0],0,0,0);
				if (i == 0) { continue; }
				effect.spawnParticle(S_PARTICLE,tX[1],tY[1]+tYL[1]*i/(tYSub[1]+1.0),tZ[0]+tZL[0],0,0,0);
			}
			for(i=0;i<=tYSub[2];i++) {
				effect.spawnParticle(S_PARTICLE,tX[2]+tXL[2],tY[2]+tYL[2]*i/(tYSub[2]+1.0),tZ[0],0,0,0);
				if (i == 0) { continue; }
				effect.spawnParticle(S_PARTICLE,tX[2],tY[2]+tYL[2]*i/(tYSub[2]+1.0),tZ[0],0,0,0);
			}
			for(i=0;i<=tZSub[0];i++) {
				effect.spawnParticle(S_PARTICLE,flerp(tX[2]+tXL[2],tX[1]+tXL[1],i/(tZSub[0]+1.0)),flerp(tY[2]+tYL[2],tY[1]+tYL[1],i/(tZSub[0]+1.0)),tZ[0]+tZL[0]*i/(tZSub[0]+1.0),0,0,0);
				if (i == 0) {
					effect.spawnParticle(S_PARTICLE,tX[1]+tXL[1],tY[1]+tYL[1],tZ[0]+tZL[0],0,0,0);
					continue;
				}
				effect.spawnParticle(S_PARTICLE,flerp(tX[2],tX[1],i/(tZSub[0]+1.0)),flerp(tY[2]+tYL[2],tY[1]+tYL[1],i/(tZSub[0]+1.0)),tZ[0]+tZL[0]*i/(tZSub[0]+1.0),0,0,0);
				effect.spawnParticle(S_PARTICLE,flerp(tX[2]+tXL[2],tX[1]+tXL[1],i/(tZSub[0]+1.0)),flerp(tY[2],tY[1],i/(tZSub[0]+1.0)),tZ[0]+tZL[0]*i/(tZSub[0]+1.0),0,0,0);
				effect.spawnParticle(S_PARTICLE,flerp(tX[2],tX[1],i/(tZSub[0]+1.0)),flerp(tY[2],tY[1],i/(tZSub[0]+1.0)),tZ[0]+tZL[0]*i/(tZSub[0]+1.0),0,0,0);
			}
			break;
		}
		break;
	case 1: //Cylinder
		tT = pBrushSize[1][3] / 1000.0;
		tR = [	lerp(pBrushSize[1][1],0,clamp(tT,0,1,false)),
				lerp(pBrushSize[1][1],0,clamp(tT,-1,0,false))];
		tRSub = [4 + Math.floor(tR[0]/S_pSUBDIV[1]) * 4,
				4 + Math.floor(tR[1]/S_pSUBDIV[1]) * 4];
		tH = pBrushSize[1][2];
		tHSub = Math.floor(tH/S_pSUBDIV[0]);
		tPI = Math.PI * 2;
		switch(pBrushSize[1][4]) {
		case 0: //X dir
			tX = mPaintPos[0] - Math.floor(tH*0.5);
			tY = mPaintPos[1] + 1;
			tZ = mPaintPos[2] + 1;
			
			for(i=0;i<tRSub[0];i++) {
				effect.spawnParticle(S_PARTICLE,tX+tH,tY+tR[0]*Math.cos(tPI*i/tRSub[0]),tZ+tR[0]*Math.sin(tPI*i/tRSub[0]),0,0,0);
			}
			for(i=0;i<tRSub[1];i++) {
				effect.spawnParticle(S_PARTICLE,tX,tY+tR[1]*Math.cos(tPI*i/tRSub[1]),tZ+tR[1]*Math.sin(tPI*i/tRSub[1]),0,0,0);
			}
			for(i=1;i<=tHSub;i++) {
				effect.spawnParticle(S_PARTICLE,tX+tH*i/(tHSub+1.0),tY,lerp(tZ+tR[1],tZ+tR[0],i/(tHSub+1.0)),0,0,0);
				effect.spawnParticle(S_PARTICLE,tX+tH*i/(tHSub+1.0),tY,lerp(tZ-tR[1],tZ-tR[0],i/(tHSub+1.0)),0,0,0);
				effect.spawnParticle(S_PARTICLE,tX+tH*i/(tHSub+1.0),lerp(tY+tR[1],tY+tR[0],i/(tHSub+1.0)),tZ,0,0,0);
				effect.spawnParticle(S_PARTICLE,tX+tH*i/(tHSub+1.0),lerp(tY-tR[1],tY-tR[0],i/(tHSub+1.0)),tZ,0,0,0);
			}
			break;
		case 1: //Y dir
			tX = mPaintPos[0] + 1;
			tY = mPaintPos[1] - Math.floor(tH*0.5);
			tZ = mPaintPos[2] + 1;
			
			for(i=0;i<tRSub[0];i++) {
				effect.spawnParticle(S_PARTICLE,tX+tR[0]*Math.cos(tPI*i/tRSub[0]),tY+tH,tZ+tR[0]*Math.sin(tPI*i/tRSub[0]),0,0,0);
			}
			for(i=0;i<tRSub[1];i++) {
				effect.spawnParticle(S_PARTICLE,tX+tR[1]*Math.cos(tPI*i/tRSub[1]),tY,tZ+tR[1]*Math.sin(tPI*i/tRSub[1]),0,0,0);
			}
			for(i=1;i<=tHSub;i++) {
				effect.spawnParticle(S_PARTICLE,tX,tY+tH*i/(tHSub+1.0),lerp(tZ+tR[1],tZ+tR[0],i/(tHSub+1.0)),0,0,0);
				effect.spawnParticle(S_PARTICLE,tX,tY+tH*i/(tHSub+1.0),lerp(tZ-tR[1],tZ-tR[0],i/(tHSub+1.0)),0,0,0);
				effect.spawnParticle(S_PARTICLE,lerp(tX+tR[1],tX+tR[0],i/(tHSub+1.0)),tY+tH*i/(tHSub+1.0),tZ,0,0,0);
				effect.spawnParticle(S_PARTICLE,lerp(tX-tR[1],tX-tR[0],i/(tHSub+1.0)),tY+tH*i/(tHSub+1.0),tZ,0,0,0);
			}
			break;
		case 2: //Z dir
			tX = mPaintPos[0] + 1;
			tY = mPaintPos[1] + 1;
			tZ = mPaintPos[2] - Math.floor(tH*0.5);
			
			for(i=0;i<tRSub[0];i++) {
				effect.spawnParticle(S_PARTICLE,tX+tR[0]*Math.cos(tPI*i/tRSub[0]),tY+tR[0]*Math.sin(tPI*i/tRSub[0]),tZ+tH,0,0,0);
			}
			for(i=0;i<tRSub[1];i++) {
				effect.spawnParticle(S_PARTICLE,tX+tR[1]*Math.cos(tPI*i/tRSub[1]),tY+tR[1]*Math.sin(tPI*i/tRSub[1]),tZ,0,0,0);
			}
			for(i=1;i<=tHSub;i++) {
				effect.spawnParticle(S_PARTICLE,lerp(tX+tR[1],tX+tR[0],i/(tHSub+1.0)),tY,tZ+tH*i/(tHSub+1.0),0,0,0);
				effect.spawnParticle(S_PARTICLE,lerp(tX-tR[1],tX-tR[0],i/(tHSub+1.0)),tY,tZ+tH*i/(tHSub+1.0),0,0,0);
				effect.spawnParticle(S_PARTICLE,tX,lerp(tY+tR[1],tY+tR[0],i/(tHSub+1.0)),tZ+tH*i/(tHSub+1.0),0,0,0);
				effect.spawnParticle(S_PARTICLE,tX,lerp(tY-tR[1],tY-tR[0],i/(tHSub+1.0)),tZ+tH*i/(tHSub+1.0),0,0,0);
			}
			break;
		}
		break;
	case 2: //Sphere
		tX = mPaintPos[0]+0.5;
		tY = mPaintPos[1]+0.5;
		tZ = mPaintPos[2]+0.5;
		tR = pBrushSize[2][1];
		tRSub = 4 + Math.floor(tR/S_pSUBDIV[1]) * 4;
		tPI = Math.PI * 2;
		
		for(i=0;i<tRSub;i++) {
			effect.spawnParticle(S_PARTICLE,tX+tR*Math.cos(tPI*i/tRSub),tY,tZ+tR*Math.sin(tPI*i/tRSub),0,0,0);
			if (i/tRSub != 0.5) {
				effect.spawnParticle(S_PARTICLE,tX+tR*Math.cos(tPI*i/tRSub),tY+tR*Math.sin(tPI*i/tRSub),tZ,0,0,0);
				effect.spawnParticle(S_PARTICLE,tX,tY+tR*Math.sin(tPI*i/tRSub),tZ+tR*Math.cos(tPI*i/tRSub),0,0,0);
			}
		}
		break;
	}

	//Check and execute any actions based on the keys pressed
	//if (sKey != 0) { chat.print(sKey); }
	if (updateTick == 0) {
		if ((sKey & 1) != 0 && (sKeyInit & 1) == 0) {	//Is shift (paint) initially pressed?
			lPPos = [pos.x,pos.y,pos.z];
			lBPos = mPaintPos;
			lLVec = [vec.x,vec.y,vec.z];
			sKeyInit = sKeyInit | 1;
			sculptStart(offhand,offMeta);
		}
		
		if ((sKey & 1) != 0 && (sKeyInit & 1) != 0) {	//All continuous hold steps go here.
			if ((angleCompare(lPPos,[pos.x,pos.y,pos.z],lBPos) > S_ANGLECHANGE) || (angleCompare(lLVec,[vec.x,vec.y,vec.z],[0,0,0]) > S_ANGLECHANGE)) {
				lPPos = [pos.x,pos.y,pos.z];
				lBPos = mPaintPos;
				lLVec = [vec.x,vec.y,vec.z];
				sculptStart(offhand,offMeta);
			}
		}
		
		if ((sKey & 2) != 0 && (sKeyInit & 2) == 0) { 	//Is ctrl held?
			holdY = mPaintPos[1];
			sKeyInit = sKeyInit | 2;
		}
		
		if ((sKey & 4) == 4) { 	//Is tab pressed?
			tabSlot = (tabSlot + 1) % 6;
			sUI_tab.y = 36 + tabSlot * 12;
			//chat.print("Tab slot is " + tabSlot);
		}
		
		if ((sKey & 24) != 0) { 	//Are any of the bracket buttons pressed?
			t = 1;
			if ((sKey & 8) == 8) { t = -1; }
			switch(tabSlot){
			case 0:
				t2 = pBrushType.length - 1;
				pBrushType[0] = (t2 + pBrushType[0] + t) % t2;
				sUI_pBrushType.text = "Brush Type: " + pBrushType[pBrushType[0]+1];
				break;
			case 1:
				t2 = pBrushMode.length - 1;
				pBrushMode[0] = (t2 + pBrushMode[0] + t) % t2;
				sUI_pBrushMode.text = "Brush Mode: " + pBrushMode[pBrushMode[0]+1];
				break;
			case 2:
				t2 = (pBrushSize[pBrushType[0]].length - 1) / 3;
				pBrushSize[pBrushType[0]][0] = (t2 + pBrushSize[pBrushType[0]][0] + t) % t2;
				break;
			case 3:
				pBrushOffset[0] = (3 + pBrushOffset[0] + t) % 3;
				break;
			}
			t3 = (pBrushSize[pBrushType[0]].length - 1) / 3;
			tS = "Brush Size:";
			for(i=0;i<t3;i++) {
				tS += up(pBrushSize[pBrushType[0]][i+t3+1],i,0) + pBrushSize[pBrushType[0]][i+1];
			}
			sUI_pBrushSize.text = tS;
			tS = "Brush Offset:";
			for(i=0;i<3;i++) {
				tS += up(pBrushOffset[i+4],i,1) + pBrushOffset[i+1];
			}
			sUI_pBrushOffset.text = tS;
		}
		
		if ((sKey & 1920) != 0) { //Any of the add/subtract keys pressed? (takes note of both sets)
			t = 1;
			if ((sKey & 256) == 256 || (sKey & 1024) == 1024) { t = -1; }
			t2 = (pBrushSize[pBrushType[0]].length - 1) / 3;
			switch(tabSlot){
			case 2:
				t3 = pBrushSize[pBrushType[0]][0];
				rate = pBrushSize[pBrushType[0]][t2+t2+t3+1][2];
				if ((sKey & 2) == 2) { rate = pBrushSize[pBrushType[0]][t2+t2+t3+1][3]; }
				tMin = pBrushSize[pBrushType[0]][t2+t2+t3+1][0];
				tMax = pBrushSize[pBrushType[0]][t2+t2+t3+1][1];
				tBOOL = pBrushSize[pBrushType[0]][t2+t2+t3+1][4];
				pBrushSize[pBrushType[0]][t3+1] = clamp(pBrushSize[pBrushType[0]][t3+1] + rate * t,tMin,tMax,tBOOL);
				break;
			case 3:
				rate = pBrushOffset[7+pBrushOffset[0]][2];
				if ((sKey & 2) == 2) { rate = pBrushOffset[7+pBrushOffset[0]][3]; }
				tMin = pBrushOffset[7+pBrushOffset[0]][0];
				tMax = pBrushOffset[7+pBrushOffset[0]][1];
				tBOOL = pBrushOffset[7+pBrushOffset[0]][4];
				pBrushOffset[1+pBrushOffset[0]] = clamp(pBrushOffset[1+pBrushOffset[0]] + rate * t,tMin,tMax,tBOOL);
				break;
			case 4:
				rate = pBrushOpacity[3];
				if ((sKey & 2) == 2) { rate = pBrushOpacity[4]; }
				pBrushOpacity[0] = clamp(pBrushOpacity[0] + rate * t,pBrushOpacity[1],pBrushOpacity[2],false);
				break;
			case 5:
				rate = pBrushDistance[3];
				if ((sKey & 2) == 2) { rate = pBrushDistance[4]; }
				pBrushDistance[0] = clamp(pBrushDistance[0] + rate * t,pBrushDistance[1],pBrushDistance[2],false);
				break;
			}
			tS = "Brush Size:";
			for(i=0;i<t2;i++) {
				tS += up(pBrushSize[pBrushType[0]][i+t2+1],i,0) + pBrushSize[pBrushType[0]][i+1];
			}
			sUI_pBrushSize.text = tS;
			tS = "Brush Offset:";
			for(i=0;i<3;i++) {
				tS += up(pBrushOffset[i+4],i,1) + pBrushOffset[i+1];
			}
			sUI_pBrushOffset.text = tS;
			sUI_pBrushOpacity.text = "Brush Opacity: " + pBrushOpacity[0];
			sUI_pBrushDistance.text = "Brush Distance: " + pBrushDistance[0];
			updateTick++;
		}
		if ((sKey & 32) == 32 && !((sKeyInit & 32) == 32)) {
			selBlockID = world.getBlockID(mPaintPos[0]-pBrushOffset[1],mPaintPos[1]-pBrushOffset[2],mPaintPos[2]-pBrushOffset[3]);
			sKeyInit = sKeyInit | 32;
			sUI_sBlockID.text = "Selective Block ID: " + selBlockID;
		}
	}
	if (sKey != 0) { updateTick = (updateTick + 1) % S_UPDATEFACTOR; } else { updateTick = 0; }
	
	//If any keys are pressed, this loop will iterate through keys that are held and check per
	//update if they are not held. If so, remove them from the list and set the corresponding
	//bit to false.
	for (i=0; i<keyHoldCheck.length; i++) {
		if (!keyboard.isKeyDown(keyHoldCheck[i][0])) {
			sKey = sKey ^ keyHoldCheck[i][1];
			sKeyInit = sKeyInit ^ keyHoldCheck[i][1];
			//chat.print(keyboard.getKeyName(keyHoldCheck[i][0]) + " (" + keyHoldCheck[i][0] + ") is RELEASED.");
			keyHoldCheck.splice(i,1);
			if (dataCheck) {
				dataCheck = false;
				setData();
			}
			break;
		}
	}
	//chat.print(sKey);
	
	//UI Update
	// sUI_mPaintPos.text = "mPaintPos: " + mPaintPos[0] + "," + mPaintPos[1] + "," + mPaintPos[2];
	// sUI_mPaintDist.text = "mPaintDist: " + mPaintDist;
	
} else if (!UIClear) {	//Clears UI once you stop holding the tool.
	// sUI_mPaintPos.text = "";
	// sUI_mPaintDist.text = "";
	sUI_pBrushMode.text = "";
	sUI_pBrushType.text = "";
	sUI_pBrushSize.text = "";
	sUI_pBrushOpacity.text = "";
	sUI_pBrushDistance.text = "";
	sUI_pBrushOffset.text = "";
	sUI_tab.text = "";
	sUI_sBlockID.text = "";
	UIClear = true;
}