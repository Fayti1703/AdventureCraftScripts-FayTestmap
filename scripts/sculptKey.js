if (main == S_bITEM) {
	for (i=0;i<sKEYLIST.length;i++) {
		if (keyID == sKEYLIST[i]) {
			bit = Math.pow(2,i);
			sKey = sKey | bit;
			keyHoldCheck.push([sKEYLIST[i],bit]);
			dataCheck = true;
			//chat.print(keyboard.getKeyName(sKEYLIST[i]) + " (" + sKEYLIST[i] + ") is PRESSED.");
			break;
		}
	}
	//chat.print(keyID + ": " + keyboard.getKeyName(keyID));
}