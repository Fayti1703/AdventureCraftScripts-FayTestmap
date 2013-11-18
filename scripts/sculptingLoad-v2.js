//GLOBAL VARIABLES

var S_rCHECK = 4; // How far you want to check (new content wise in loop) from current brush pos
var S_rINCREMENT = 0.25; // How broad or finely you want to check in increments (Higher may skip blocks)
var S_bITEM = 285; // Item that must be held in hand to activate all sculpt tool stuff.
var S_kSCRIPT = "sculptKey.js"; // The bind all key script name that is integral with the sculpt tool.
var S_bMAXSIZE = 128; // Maximum size any brush can go distance wise in one direction from center.
var S_UPDATEFACTOR = 4; // Used to slow down update time for individual key actions (will not slow down
						// things like checking which keys are held and the lookAt vector calculation)
var S_PARTICLE = "reddust"; // Particle display name
var S_pSUBDIV = [1,1]; // Number of particle subdivisions to draw for each brush shape.
var S_ANGLECHANGE = 0.01745329251994329576923690768489;	//Amt of change angle needs to be in order to
														//continue painting.
var S_METALIST = [	35, 	//Wool		Will we be using damage value?
					205,
					206,
					207,
					208,
					209,
					210,
					211,
					212,
					213,
					214,
					215,
					216,
					217,
					218,
					230,
					231,
					232,
					233];
					
//CORE CHANGING VARIABLES (Variables that are changed within the UI interface)

pBrushType = [0,"Square","Cylinder","Sphere"];	//Intial value (game changes this), 
												//Text display for each type (also sets length)
pBrushMode = [0,"Paint|Normal","Paint|Ignore air","Paint|Only air",
				"Paint|Only on selected blocks", "Paint|Shift mode",
				"Paint|Shift mode/Ignore air"];
pBrushSize = [[0,	//Used as an indicator of which subselection is selected.
				1,1,1,0,0,	//The actual numerical values for calculation
				" x: "," y: "," z: "," taper: "," dir: ",	//Their respective display text
				[1,S_bMAXSIZE,1,4,false],[1,S_bMAXSIZE,1,4,false],[1,S_bMAXSIZE,1,4,false],[-1000,1000,25,100,false],[0,2,1,1,true]],	//[min,max,increment,speedUp increment,wrap]
			[0,
				1,1,0,0,
				" r: "," h: "," taper: "," dir: ",
				[1,S_bMAXSIZE,1,4,false],[1,S_bMAXSIZE,1,4,false],[-1000,1000,25,100,false],[0,2,1,1,true]],
			[0,
				1,
				" r: ",
				[1,S_bMAXSIZE,1,4,false]]];
pBrushOffset = [0,
				0,0,0,
				" x: "," y: "," z: ",
				[-S_bMAXSIZE,S_bMAXSIZE,1,4,false],[-S_bMAXSIZE,S_bMAXSIZE,1,4,false],[-S_bMAXSIZE,S_bMAXSIZE,1,4,false]];
pBrushOpacity = [10000,0,10000,25,1000]; // [Cur. value, min, max, increase, super increase]
pBrushDistance = [75,4,128,1,4];

if (inMemory) {
	pBrushType[0] = data01;
	pBrushMode[0] = data02;
	pBrushSize[0][1] = data03;
	pBrushSize[0][2] = data04;
	pBrushSize[0][3] = data05;
	pBrushSize[0][4] = data06;
	pBrushSize[0][5] = data07;
	pBrushSize[1][1] = data08;
	pBrushSize[1][2] = data09;
	pBrushSize[1][3] = data10;
	pBrushSize[1][4] = data11;
	pBrushSize[2][1] = data12;
	pBrushOffset[1] = data13;
	pBrushOffset[2] = data14;
	pBrushOffset[3] = data15;
	pBrushOpacity[0] = data16;
	pBrushDistance[0] = data17;
}

//KEYCODE VALUES FOR KEYS (Set these to diff. values to your liking IF YOU KNOW WHAT YOU'RE DOING)
//  Note - Position of these numbers are important. The sculpt relies on that to determine what is
//         pressed, and the array slots coorespond to the 2^n number on the right hand side.

var sKEYLIST = [42, //L-shift				1
				29, //L-ctrl				2
				15, //Tab					4
				44, //Z						8
				45, //X						16
				19, //R						32
				28, //Enter					64
				47, //V						128
				46, //C						256
				78, //add					512
				74  //subtract				1024
				];


//UI VARIABLES

// var sUI_mPaintDist = UILabel("",2,36);
// var sUI_mPaintPos = UILabel("",2,48);
var sUI_pBrushType = UILabel("",14,36);
var sUI_pBrushMode = UILabel("",14,48);
var sUI_pBrushSize = UILabel("",14,60);
var sUI_pBrushOffset = UILabel("",14,72);
var sUI_pBrushOpacity = UILabel("",14,84);
var sUI_pBrushDistance = UILabel("",14,96);
var sUI_sBlockID = UILabel("",14,120);
var sUI_tab = UILabel("",8,36);

//INTERNAL CODE VARIABLES

var mPaintPos = [0,0,0];
var mPaintDist = 0;
var sKey = 0; 
var sKeyInit = 0;
var keyHoldCheck = new Array();
var pInv = player.getInventory();
var UIClear = true;
var tabSlot = 0;
var updateTick = 0;
var dataCheck = false;
inMemory = true;
keyboard.bindAllKeyScript(S_kSCRIPT);
chat.print("Sculpt Tool v2.0 Initialized!");

function setData() {
	data01 = pBrushType[0];
	data02 = pBrushMode[0];
	data03 = pBrushSize[0][1];
	data04 = pBrushSize[0][2];
	data05 = pBrushSize[0][3];
	data06 = pBrushSize[0][4];
	data07 = pBrushSize[0][5];
	data08 = pBrushSize[1][1];
	data09 = pBrushSize[1][2];
	data10 = pBrushSize[1][3];
	data11 = pBrushSize[1][4];
	data12 = pBrushSize[2][1];
	data13 = pBrushOffset[1];
	data14 = pBrushOffset[2];
	data15 = pBrushOffset[3];
	data16 = pBrushOpacity[0];
	data17 = pBrushDistance[0];
}

function clamp(n,min,max,wrap) {
	if (wrap) {
		if (n < min) { return max; }
		if (n > max) { return min; }
	} else {
		if (n < min) { return min; }
		if (n > max) { return max; }
	}
	return n;
}

function up(text,slot,type) {
	if (slot == pBrushSize[pBrushType[0]][0] && type == 0) { return text.toUpperCase(); }
	if (slot == pBrushOffset[0] && type == 1) { return text.toUpperCase(); }
	return text;
}

function lerp(a,b,lrp) {
	lrp = clamp(lrp,-1,1,false);
	if (lrp < 0) {return a+lrp*(a-b);}
	return a-lrp*(a-b);
}

function flerp(a,b,lrp) {
	lrp = clamp(lrp,-1,1,false);
	if (lrp < 0) {return Math.floor(a+lrp*(a-b));}
	return Math.floor(a-lrp*(a-b));
}

function f(a) {
	return Math.floor(a);
}

function rF(a) {
	return Math.round(a);
}

function metaCheck(ID) {
	for(i=0;i<S_METALIST.length;i++) {
		if (ID == S_METALIST[i]) { return true; }
	}
	return false;
}

function vecSqrDist(x1,y1,z1,x2,y2,z2) {
	var cX = x2 - x1;
	var cY = y2 - y1;
	var cZ = z2 - z1;
	return (cX*cX)+(cY*cY)+(cZ*cZ);
}

function angleCompare(pos1,pos2,cen) {
	var d = (pos1[0]-cen[0])*(pos2[0]-cen[0]) + (pos1[1]-cen[1])*(pos2[1]-cen[1]) + (pos1[2]-cen[2])*(pos2[2]-cen[2]);
	return Math.acos(d/Math.sqrt(vecSqrDist(pos1[0],pos1[1],pos1[2],cen[0],cen[1],cen[2])*vecSqrDist(pos2[0],pos2[1],pos2[2],cen[0],cen[1],cen[2])));
}

function modeCheck(mX,mY,mZ) {
	if (Math.random() > pBrushOpacity[0]/10000.0) { return false; }
	if (mY < 0 || mY > 127) { return false; }
	switch(pBrushMode[0]) {
	case 1:
		if (world.getBlockID(mX,mY,mZ) == 0) { return false; }
		break;
	case 2:
		if (world.getBlockID(mX,mY,mZ) != 0) { return false; }
		break;
	case 3:
		if (world.getBlockID(mX,mY,mZ) != selBlockID) { return false; }
		break;
	case 5:
		if (world.getBlockID(mX,mY,mZ) == 0) { return false; }
		break;
	}
	return true;
}

function shift(sX,sY,sZ) {
	if (pBrushMode[0] == 4 || pBrushMode[0] == 5) {
		var s = 0;
		while(world.getBlockID(sX,sY+s,sZ) != 0) { s++; }
		return s;
	}
	return 0;
}

function sculptStart(off,offM) {

	var block = 0;
	var blockMeta = 0;
	if (off < 255) {
		block = off;
		if (metaCheck(block)) { blockMeta = offM; }
		else if (block == 121) { blockMeta = 15; }
	} else if (off != 558) {
		chat.print("ERROR: Offhand not set to block, eraser, or empty hand!");
		return;
	}
	
	switch(pBrushType[0]) {
		case 1:
			sculptCyl(block,blockMeta);
			break;
		case 2:
			sculptSphere(block,blockMeta);
			break;
		case 0:
			sculptRect(block,blockMeta);
			break;
	}
}

function sculptRect(block,blockMeta) {
	
	var taper = pBrushSize[0][4] / 1000.0;
	var even = [pBrushSize[0][1]%2==0?1:0,
				pBrushSize[0][2]%2==0?1:0,
				pBrushSize[0][3]%2==0?1:0];
	var Xlen = [pBrushSize[0][1],
				lerp(pBrushSize[0][1]-even[0],0,clamp(taper,0,1,false)),
				lerp(pBrushSize[0][1]-even[0],0,clamp(taper,-1,0,false))];
	var Ylen = [pBrushSize[0][2],
				lerp(pBrushSize[0][2]-even[1],0,clamp(taper,0,1,false)),
				lerp(pBrushSize[0][2]-even[1],0,clamp(taper,-1,0,false))];
	var Zlen = [pBrushSize[0][3],
				lerp(pBrushSize[0][3]-even[2],0,clamp(taper,0,1,false)),
				lerp(pBrushSize[0][3]-even[2],0,clamp(taper,-1,0,false))];
	var minX = [mPaintPos[0] - f(Xlen[0]*0.5),
				mPaintPos[0] - (Xlen[1]*0.5),
				mPaintPos[0] - (Xlen[2]*0.5)];
	var minY = [mPaintPos[1] - f(Ylen[0]*0.5),
				mPaintPos[1] - (Ylen[1]*0.5),
				mPaintPos[1] - (Ylen[2]*0.5)];
	var minZ = [mPaintPos[2] - f(Zlen[0]*0.5),
				mPaintPos[2] - (Zlen[1]*0.5),
				mPaintPos[2] - (Zlen[2]*0.5)];
	
	
	switch(pBrushSize[0][5]) {
	case 0:
		for (x = minX[0]; x < minX[0] + Xlen[0]; x++) {
			var t = Xlen[0]-1==0?1:(x-minX[0])/(Xlen[0]-1);
			var l1 = [lerp(minY[2],minY[1],t) + 1 - even[1],
						lerp(minZ[2],minZ[1],t) + 1 - even[2]];
			var l2 = [lerp(minY[2]+Ylen[2],minY[1]+Ylen[1],t) + 1 - even[1],
						lerp(minZ[2]+Zlen[2],minZ[1]+Zlen[1],t) + 1 - even[2]];
			if (l1[0] == f(l1[0]) && l2[0] == f(l2[0])) {l1[0]--;}
			if (l1[1] == f(l1[1]) && l2[1] == f(l2[1])) {l1[1]--;}
			for (y = f(l1[0]); y < f(l2[0])+even[1]; y++) {
				if ((y < 0) || (y > 127)) {continue;}
				for (z = f(l1[1]); z < f(l2[1])+even[2]; z++) {
					if (!modeCheck(x,y,z)) { continue; }
					world.setBlockIDAndMetadata(x,y+shift(x,y,z),z,block,blockMeta);
				}
			}
		}
		break;
	case 1:
		for (y = minY[0]; y < minY[0] + Ylen[0]; y++) {
			if (y < 0 || y > 127) {continue;}
			var t = Ylen[0]-1==0?1:(y-minY[0])/(Ylen[0]-1);
			var l1 = [lerp(minX[2],minX[1],t) + 1 - even[0],
						lerp(minZ[2],minZ[1],t) + 1 - even[2]];
			var l2 = [lerp(minX[2]+Xlen[2],minX[1]+Xlen[1],t) + 1 - even[0],
						lerp(minZ[2]+Zlen[2],minZ[1]+Zlen[1],t) + 1 - even[2]];
			if (l1[0] == f(l1[0]) && l2[0] == f(l2[0])) {l1[0]--;}
			if (l1[1] == f(l1[1]) && l2[1] == f(l2[1])) {l1[1]--;}
			for (x = f(l1[0]); x < f(l2[0])+even[0]; x++) {
				for (z = f(l1[1]); z < f(l2[1])+even[2]; z++) {
					if (!modeCheck(x,y,z)) { continue; }
					world.setBlockIDAndMetadata(x,y+shift(x,y,z),z,block,blockMeta);
				}
			}
		}
		break;
	case 2:
		for (z = minZ[0]; z < minZ[0] + Zlen[0]; z++) {
			var t = Zlen[0]-1==0?1:(z-minZ[0])/(Zlen[0]-1);
			var l1 = [lerp(minY[2],minY[1],t) + 1 - even[1],
						lerp(minX[2],minX[1],t) + 1 - even[0]];
			var l2 = [lerp(minY[2]+Ylen[2],minY[1]+Ylen[1],t) + 1 - even[1],
						lerp(minX[2]+Xlen[2],minX[1]+Xlen[1],t) + 1 - even[0]];
			if (l1[0] == f(l1[0]) && l2[0] == f(l2[0])) {l1[0]--;}
			if (l1[1] == f(l1[1]) && l2[1] == f(l2[1])) {l1[1]--;}
			for (y = f(l1[0]); y < f(l2[0])+even[1]; y++) {
				if (y < 0 || y > 127) {continue;}
				for (x = f(l1[1]); x < f(l2[1])+even[0]; x++) {
					if (!modeCheck(x,y,z)) { continue; }
					world.setBlockIDAndMetadata(x,y+shift(x,y,z),z,block,blockMeta);
				}
			}
		}
		break;
	}
}

function sculptCyl(block,blockMeta) {
	var taper = pBrushSize[1][3] / 1000.0;
	var r = [lerp(pBrushSize[1][1],0,clamp(tT,0,1,false)),
			lerp(pBrushSize[1][1],0,clamp(tT,-1,0,false))];
	var h = pBrushSize[1][2];
	var tX = 0;
	
	switch (pBrushSize[1][4]) {
	case 0:
		var minX = mPaintPos[0] - Math.floor(h*0.5);
		var minY = mPaintPos[1];
		var minZ = mPaintPos[2];
	
		for (x = minX; x < minX + h; x++) {
			var tR = lerp(r[1],r[0],(x-minX)/h);
			var tY = tR;
			var tP = 3 - 2 * tR;
			if (modeCheck(x,minY,minZ)) {world.setBlockIDAndMetadata(x,minY+shift(x,minY,minZ),minZ,block,blockMeta);}
			while (tY >= tX) {
				for (tY2 = rF(tY); tY2 > 0; tY2--) {
					if (tX == 0) {
						if (modeCheck(x,minY+tY2,minZ)) {world.setBlockIDAndMetadata(x,minY+tY2+shift(x,minY+tY2,minZ),minZ,block,blockMeta);}
						if (modeCheck(x,minY-tY2,minZ)) {world.setBlockIDAndMetadata(x,minY-tY2+shift(x,minY-tY2,minZ),minZ,block,blockMeta);}
						if (modeCheck(x,minY,minZ+tY2)) {world.setBlockIDAndMetadata(x,minY+shift(x,minY,minZ+tY2),minZ+tY2,block,blockMeta);}
						if (modeCheck(x,minY,minZ-tY2)) {world.setBlockIDAndMetadata(x,minY+shift(x,minY,minZ-tY2),minZ-tY2,block,blockMeta);}
					} else {
						if (modeCheck(x,minY+tY2,minZ+tX)) {world.setBlockIDAndMetadata(x,minY+tY2+shift(x,minY+tY2,minZ+tX),minZ+tX,block,blockMeta);}
						if (modeCheck(x,minY+tY2,minZ-tX)) {world.setBlockIDAndMetadata(x,minY+tY2+shift(x,minY+tY2,minZ-tX),minZ-tX,block,blockMeta);}
						if (modeCheck(x,minY-tY2,minZ+tX)) {world.setBlockIDAndMetadata(x,minY-tY2+shift(x,minY-tY2,minZ+tX),minZ+tX,block,blockMeta);}
						if (modeCheck(x,minY-tY2,minZ-tX)) {world.setBlockIDAndMetadata(x,minY-tY2+shift(x,minY-tY2,minZ-tX),minZ-tX,block,blockMeta);}
						if (modeCheck(x,minY+tX,minZ+tY2)) {world.setBlockIDAndMetadata(x,minY+tX+shift(x,minY+tX,minZ+tY2),minZ+tY2,block,blockMeta);}
						if (modeCheck(x,minY+tX,minZ-tY2)) {world.setBlockIDAndMetadata(x,minY+tX+shift(x,minY+tX,minZ-tY2),minZ-tY2,block,blockMeta);}
						if (modeCheck(x,minY-tX,minZ+tY2)) {world.setBlockIDAndMetadata(x,minY-tX+shift(x,minY-tX,minZ+tY2),minZ+tY2,block,blockMeta);}
						if (modeCheck(x,minY-tX,minZ-tY2)) {world.setBlockIDAndMetadata(x,minY-tX+shift(x,minY-tX,minZ-tY2),minZ-tY2,block,blockMeta);}
					}
				}
				if (tP < 0) {tP += 4*tX++ + 6;}
				else {tP += 4*(tX++ - tY--) + 10;}
			}
			tX = 0;
		}
		break;
	case 1:
		var minX = mPaintPos[0];
		var minY = mPaintPos[1] - Math.floor(h*0.5);
		var minZ = mPaintPos[2];
	
		for (y = minY; y < minY + h; y++) {
			if (y < 0 || y > 127) {continue;}
			var tR = lerp(r[1],r[0],(y-minY)/h);
			var tY = tR;
			var tP = 3 - 2 * tR;
			if (modeCheck(minX,y,minZ)) {world.setBlockIDAndMetadata(minX,y+shift(minX,y,minZ),minZ,block,blockMeta);}
			while (tY >= tX) {
				for (tY2 = rF(tY); tY2 > 0; tY2--) {
					if (tX == 0) {
						if (modeCheck(minX+tY2,y,minZ)) {world.setBlockIDAndMetadata(minX+tY2,y+shift(minX+tY2,y,minZ),minZ,block,blockMeta);}
						if (modeCheck(minX-tY2,y,minZ)) {world.setBlockIDAndMetadata(minX-tY2,y+shift(minX-tY2,y,minZ),minZ,block,blockMeta);}
						if (modeCheck(minX,y,minZ+tY2)) {world.setBlockIDAndMetadata(minX,y+shift(minX,y,minZ+tY2),minZ+tY2,block,blockMeta);}
						if (modeCheck(minX,y,minZ-tY2)) {world.setBlockIDAndMetadata(minX,y+shift(minX,y,minZ-tY2),minZ-tY2,block,blockMeta);}
					} else {
						if (modeCheck(minX+tY2,y,minZ+tX)) {world.setBlockIDAndMetadata(minX+tY2,y+shift(minX+tY2,y,minZ+tX),minZ+tX,block,blockMeta);}
						if (modeCheck(minX+tY2,y,minZ-tX)) {world.setBlockIDAndMetadata(minX+tY2,y+shift(minX+tY2,y,minZ-tX),minZ-tX,block,blockMeta);}
						if (modeCheck(minX-tY2,y,minZ+tX)) {world.setBlockIDAndMetadata(minX-tY2,y+shift(minX-tY2,y,minZ+tX),minZ+tX,block,blockMeta);}
						if (modeCheck(minX-tY2,y,minZ-tX)) {world.setBlockIDAndMetadata(minX-tY2,y+shift(minX-tY2,y,minZ-tX),minZ-tX,block,blockMeta);}
						if (modeCheck(minX+tX,y,minZ+tY2)) {world.setBlockIDAndMetadata(minX+tX,y+shift(minX+tX,y,minZ+tY2),minZ+tY2,block,blockMeta);}
						if (modeCheck(minX+tX,y,minZ-tY2)) {world.setBlockIDAndMetadata(minX+tX,y+shift(minX+tX,y,minZ-tY2),minZ-tY2,block,blockMeta);}
						if (modeCheck(minX-tX,y,minZ+tY2)) {world.setBlockIDAndMetadata(minX-tX,y+shift(minX-tX,y,minZ+tY2),minZ+tY2,block,blockMeta);}
						if (modeCheck(minX-tX,y,minZ-tY2)) {world.setBlockIDAndMetadata(minX-tX,y+shift(minX-tX,y,minZ-tY2),minZ-tY2,block,blockMeta);}
					}
				}
				if (tP < 0) {tP += 4*tX++ + 6;}
				else {tP += 4*(tX++ - tY--) + 10;}
			}
			tX = 0;
		}
		break;
	case 2:
		var minX = mPaintPos[0];
		var minY = mPaintPos[1];
		var minZ = mPaintPos[2] - Math.floor(h*0.5);
	
		for (z = minZ; z < minZ + h; z++) {
			var tR = lerp(r[1],r[0],(z-minZ)/h);
			var tY = tR;
			var tP = 3 - 2 * tR;
			if (modeCheck(minX,minY,z)) {world.setBlockIDAndMetadata(minX,minY+shift(minX,minY,z),z,block,blockMeta);}
			while (tY >= tX) {
				for (tY2 = rF(tY); tY2 > 0; tY2--) {
					if (tX == 0) {
						if (modeCheck(minX+tY2,minY,z)) {world.setBlockIDAndMetadata(minX+tY2,minY+shift(minX+tY2,minY,z),z,block,blockMeta);}
						if (modeCheck(minX-tY2,minY,z)) {world.setBlockIDAndMetadata(minX-tY2,minY+shift(minX-tY2,minY,z),z,block,blockMeta);}
						if (modeCheck(minX,minY+tY2,z)) {world.setBlockIDAndMetadata(minX,minY+tY2+shift(minX,minY+tY2,z),z,block,blockMeta);}
						if (modeCheck(minX,minY-tY2,z)) {world.setBlockIDAndMetadata(minX,minY-tY2+shift(minX,minY-tY2,z),z,block,blockMeta);}
					} else {
						if (modeCheck(minX+tY2,minY+tX,z)) {world.setBlockIDAndMetadata(minX+tY2,minY+tX+shift(minX+tY2,minY+tX,z),z,block,blockMeta);}
						if (modeCheck(minX+tY2,minY-tX,z)) {world.setBlockIDAndMetadata(minX+tY2,minY-tX+shift(minX+tY2,minY-tX,z),z,block,blockMeta);}
						if (modeCheck(minX-tY2,minY+tX,z)) {world.setBlockIDAndMetadata(minX-tY2,minY+tX+shift(minX-tY2,minY+tX,z),z,block,blockMeta);}
						if (modeCheck(minX-tY2,minY-tX,z)) {world.setBlockIDAndMetadata(minX-tY2,minY-tX+shift(minX-tY2,minY-tX,z),z,block,blockMeta);}
						if (modeCheck(minX+tX,minY+tY2,z)) {world.setBlockIDAndMetadata(minX+tX,minY+tY2+shift(minX+tX,minY+tY2,z),z,block,blockMeta);}
						if (modeCheck(minX+tX,minY-tY2,z)) {world.setBlockIDAndMetadata(minX+tX,minY-tY2+shift(minX+tX,minY-tY2,z),z,block,blockMeta);}
						if (modeCheck(minX-tX,minY+tY2,z)) {world.setBlockIDAndMetadata(minX-tX,minY+tY2+shift(minX-tX,minY+tY2,z),z,block,blockMeta);}
						if (modeCheck(minX-tX,minY-tY2,z)) {world.setBlockIDAndMetadata(minX-tX,minY-tY2+shift(minX-tX,minY-tY2,z),z,block,blockMeta);}
					}
				}
				if (tP < 0) {tP += 4*tX++ + 6;}
				else {tP += 4*(tX++ - tY--) + 10;}
			}
			tX = 0;
		}
		break;
	}
		
}

function sculptSphere(block,blockMeta) {
	var r = pBrushSize[2][1];
	var minX = mPaintPos[0]+0.5-r;
	var minY = mPaintPos[1]+0.5-r;
	var minZ = mPaintPos[2]+0.5-r;
	
	for (x = minX; x <= minX + r*2; x++) {
		for (y = minY; y <= minY + r*2; y++) {
			if (y < 0 || y > 127) {continue;}
			for (z = minZ; z <= minZ + r*2; z++) { 
				if (!modeCheck(f(x),f(y),f(z))
				|| (vecSqrDist(minX+r,minY+r,minZ+r,x,y,z) >= r*r)) { continue; }
				world.setBlockIDAndMetadata(f(x),f(y)+shift(f(x),f(y),f(z)),f(z),block,blockMeta);
			}
		}
	}

}