iter = 0;
setId = 0;
down = true;
up = false;
bouncingBall = (is.VER5) ? document.getElementById("ball").style
: (is.NS) ? document.layers["ball"]
: document.all["ball"].style;
stillBall = (is.VER5) ? document.getElementById("staticBall").style
: (is.NS) ? document.layers["staticBall"] : document.all["staticBall"].style;
winH = (is.NS) ? window.innerHeight - 300 : document.body.offsetHeight - 300;
document.onmouseup = buttonUp;
if (is.NS4)
document.captureEvents(Event.MOUSEUP);
function buttonUp(e) {
	if ( ((is.NS) ? e.which : event.button) != 1) return true;
	if (setId != 0) clearInterval(setId);
	bouncingBall.visibility="visible";
	stillBall.visibility="visible";
	bouncingBall.left = (is.NS) ? e.pageX - 15 : event.offsetX - 15;
	bouncingBall.top = (is.NS) ? e.pageY - 15 : event.offsetY - 15;
	iter = 0;
	setId = setInterval("generateGravity()", 20);
	return true;
}

function generateGravity() {
	if ((parseInt(bouncingBall.top)+iter < winH) && down) {
	bouncingBall.top = parseInt(bouncingBall.top) + iter;
	iter++;
	return;
	}
	else {
		if ((parseInt(bouncingBall.top)< winH) && down) {
		bouncingBall.top = winH + 5;
		return;
	}
	down = false;
	up = true;
	if (parseInt(bouncingBall.top) > 0 && up && iter >= 0) {
		bouncingBall.top = parseInt(bouncingBall.top) - iter;
		iter--;
		if (iter%3 == 0) iter--;
		return;
	}
	down = true;
	up = false;
}
}