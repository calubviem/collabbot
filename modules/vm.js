/*
 * ir0nBot:
 * 		VM connection handler, initalizes connection to VM.
 */

const logger = require('./logger');
const guacutils = require('./guacutils');
const WebSocket = require('ws');
const { spawn } = require('child_process');
var prefix = "!"
var execopts = { "shell":true, "windowsHide":true }
var ws = 0;
function send(data) {
	ws.send(guacutils.encodeGuac(data));
}

module.exports = {
	connect: (vmip, name, deniedcommands, asshats, whitelist) => {
		logger.logMessage("Connecting to VM IP " + vmip + "...",0);
		ws = new WebSocket('ws://'+vmip, 'guacamole');
		ws.on('open', function open() {
			send(['connect']);
			send(['rename', 'fuckbot']);
		});
		ws.on('message', function incoming(data) {
				var guacmessage = guacutils.decodeResponse(data)
				if 		(guacmessage[0] == "nop") 	return ws.send('3.nop;');
				else if (guacmessage[0] != "chat")	console.log(guacmessage);
				else {
					var split = guacmessage[2].toLowerCase().split(' ');
					console.log(guacmessage[1]+">", guacmessage[2]);
					if (split[0] == prefix + "cmd") {
					
						for (var i=0; i<asshats.length; i++)
							if (guacmessage[1].indexOf(asshats[i]) != -1)
								return send(['chat', 'no autism allowed dipshit']);

						if (guacmessage[1].includes("guest"))
							return send(['chat', 'lol are all guests retarded?']);
						else if (!whitelist.includes(guacmessage[1]))
							return send(['chat', 'sorry, not whitelisted']);

						var cmd = [];
						for (var i = 1; i < split.length; i++) cmd.push(split[i]);

						for (var e = 0; e < deniedcommands.length; e++) {
							guacmessage[2] = guacmessage[2].replace(prefix+"cmd", "")
							if(guacmessage[2].toLowerCase().indexOf(deniedcommands[e]) > -1)
								return send(['chat', 'nope']);
						}
						spawn("cmd /c", cmd, execopts);
						console.log("ran: cmd /c "+guacmessage[2]);
						send(['chat', 'executed ' + cmd.toString().replace(',', ' ')]);
					}
				}
		});
	}
}