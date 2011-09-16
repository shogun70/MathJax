/*************************************************************
 *  Copyright (c) 2010-2011 Design Science, Inc.
 * 
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/* 
This javascript snippet facilitates converting a HTML page to JS which is 
required for cross-domain download.  After stringifying the HTML and prefixing 
with this snippet the resulting script can be imported into an iframe, 
probably with:
	var doc = iframe.contentDocument;
	doc.open();
	doc.write('<script src="' + scriptURL + '"></script>');
	doc.close();

WARN it is assumed that all src href's (for script or img) are relative to the 
scriptURL, and that all inline scripts have no attributes and are of the form:
	<script>...</script>

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

