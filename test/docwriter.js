/* 
NOTE we have to jump through hoops for IE because it doesn't execute sourced 
scripts in order when the page is created with document.write(),
This involves disabling inline scripts until well after window.onload,
when they are dynamically inserted.
 */
(function() {
	var scripts = document.getElementsByTagName("script"),
	    script = scripts[scripts.length-1],
	    base = script.src.replace(/[^/]*$/, "");
	var input = (arguments.length > 1) ?
		[].join.call(arguments, "") :
		arguments[0];
	var output = input.replace(/src="/gi, 'src="' + base); 
	if ("onpropertychange" in script) {
		// don't execute inline scripts (until later)
		output = [
			output.replace(/\<script\>/gi, '<script type="text/plain">'),
			'<script>window.onload = ', runner.toString(), '</script>'
		].join("");
	}
	
	window.onload = function() {
		document.open();
		document.write(output);
		document.close();
	}
	function runner() { window.setTimeout(function() {
		var head = document.getElementsByTagName("head")[0];
		var scripts = document.getElementsByTagName("script");
		for (var n=scripts.length, i=0; i<n; i++) {
			var oldscript = scripts[i];
			if (oldscript.type != "text/plain") continue;
			var newscript = document.createElement("script");
			if (oldscript.text) newscript.text = oldscript.text;
			else newscript.appendChild(document.createTextNode(oldscript.innerHTML));
			oldscript.parentNode.removeChild(oldscript);
			head.appendChild(newscript);
		}
	}, 100); }
})

