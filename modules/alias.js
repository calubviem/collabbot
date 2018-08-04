function send(data) {
	ws.send(guacutils.encodeGuac(data));
}