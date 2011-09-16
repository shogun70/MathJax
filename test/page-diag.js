/*************************************************************
 *
 *  page-diag.js
 *  
 *  ---------------------------------------------------------------------
 *  
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

(function() {

// TODO this script detection could be more robust
var scripts = document.getElementsByTagName("head")[0]
	.getElementsByTagName("script"),
    script = scripts[scripts.length-1];

var onload = function() {

    var root = script.src.replace(/[^/]*$/, ""),
    workersURL = root + "page-diag-workers.js",
    height = 300,
    img = document.createElement("img");
img.src = root + "logo.gif";
img.title = "Click to show / hide MathJax Diagnostics";
img.width = "100";
img.height = "20";
img.style.cssText = "position: absolute; position: fixed; bottom: 0px; right: 10px; background-color: #fff; padding: 0.5em; border: 2px solid #ccc; " +
	"-webkit-border-radius: 4px 4px 0 0; -moz-border-radius: 4px 4px 0 0; border-radius: 4px 4px 0 0;";
document.body.appendChild(img);

var div = document.createElement("div");
div.style.height = "0px";
document.body.appendChild(div);

var iframe = document.createElement("iframe");
iframe.style.cssText = "position: fixed; bottom: 0px; left: 0px; width: 100%; height: 0px; overflow: " +
	"hidden; background-color: #fff; border: none; border-top: 2px solid #ccc;";

document.body.appendChild(iframe);
var diagWin = iframe.contentWindow;
var diagDoc = diagWin.document;

diagDoc.open();
diagDoc.write('<script src="' + workersURL + '"></script>');
diagDoc.close(); 

var poll = window.setInterval(function() {
	if (!diagWin.Init) return;
	window.clearInterval(poll);
	var tabLinks = diagDoc.getElementById("tabs").getElementsByTagName("a");
	for (var n=tabLinks.length, i=0; i<n; i++) {
		var a = tabLinks[i];
		if (a.href.match(/#(timelines|math)Panel$/)) a.parentNode.className = "disabled";
	}
	diagWin.Init(window);
}, 25);

img.onclick = function() {
	if (img.className == "checked") {
		img.className = "";
		img.style.bottom = "0px";
		div.style.height = "0px";
		iframe.style.height = "0px";
	}
	else {
		img.className = "checked";
		img.style.bottom = height + "px";
		div.style.height = height + "px";
		iframe.style.height = height + "px";
	}
}

}

if (document.readyState == "complete") onload();
else {
if (window.addEventListener) window.addEventListener("load", onload, true);
else window.attachEvent("onload", onload);
}

})();
