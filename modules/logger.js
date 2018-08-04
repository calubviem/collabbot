/*
 * ir0nBot:
 * 		Unified logger utility
 */


module.exports = {
	logMessage: (message, sev) => {
		switch(sev){
			default:
				console.log("[?UNKSEV?] %s",message);
			break;

			case 0: // INFO
				console.log("[INFO] %s",message);
			break;

			case 1: // WARN
				console.log("\x1b[33m[WARNING] %s\x1b[0m",message);
			break;

			case 2: // ERR
				console.log("\x1b[31m[ERROR] %s\x1b[0m",message);
			break;
		}
	}

};
