var callAfterTimeout;

function timeout() {
    callAfterTimeout = setTimeout(checkIfEmpty, 3000);
}

function checkIfEmpty() {
	$('#billboard').load(function() {
console.log("hi")		
		if($.trim($(this).contents().find("body").html()) == "") {
			$(this).hide();
		}
	});
}