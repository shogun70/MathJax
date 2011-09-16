var MathJaxBasicChecks = [
{
name: "Config",
title: "MathJax Configuration",
checks: [
{
	name: "Init",
	title: "MathJax initialization completed",
	description: "If initialization doesn't complete there may be a configuration error.",
	test: function(context, MathJax) { 
		if (!MathJax) return false; 
		return Array.indexOf(MathJax.Hub.Startup.signal.posted, "End Extensions") >= 0; // FIXME is this correct??
	}, 
	type: "error",
	getAll: function(context, MathJax) {
		var result = this.test(context, MathJax);
		return {
			result: result,
			type: this.type,
			stop: !result,
			name: this.name,
			title: this.title,
			description: this.description
		}
	}
},
{
	name: "Found",
	title: "Equations were found",
	description: "If equations are not found there could be a configuration error. ",
	test: function(context, MathJax) { 
		if (!MathJax) return false;
		return MathJax.Hub.getAllJax().length > 0; 
	},
	type: "warn",
	getAll: function(context, MathJax) {
		var tex2jax = MathJax && MathJax.Extension.tex2jax;
		var texDelimString = "";
		if (tex2jax) {
			var config = tex2jax.config;
			var texDelimString = "A common configuration issue is the choice of delimiters for TeX markup. The configured delimiters for this page are:" +
			"<dl>" +
			"<li><dt>display math</dt><dd>" + Array.map(config.displayMath, function(delims) { return "<code>" + delims.join("...") + "</code>"; }).join(" and ") + "</dd></li>" +
			"<li><dt>inline math</dt><dd>" + Array.map(config.inlineMath, function(delims) { return "<code>" + delims.join("...") + "</code>"; }).join(" and ") + "</dd></li>" +
		"</dl>";
		}
		return {
			result: this.test(context, MathJax),
			type: this.type,
			name: this.name,
			title: this.title,
			description: this.description + texDelimString
		}
	}
}

]
},
{
name: "General",
title: "General Recommendations",
checks: [
{
	name: "doctype",
	title: "Valid DOCTYPE",
	description: "If a valid DOCTYPE isn't present then the document will be in quirks mode. This doesn't effect MathJax, but is generally not recommended.",
	test: function(context, MathJax) { return (context.document.compatMode && context.document.compatMode !== "BackCompat"); },
	type: "warn"
},
{
	name: "EmulateIE7",
	title: "Emulate IE7 meta tag",
	description: 'This tag is recommended because MathJax is very slow under IE8. See <a href="http://www.mathjax.org/resources/faqs/#ie8-slow">the FAQ</a> for details. ',
	test: function(context, MathJax) {
		var elts = context.document.getElementsByTagName("meta"), meta;
		for (var n=elts.length, i=0; i<n; i++) {
			meta = elts[i];
			if (meta.httpEquiv === "X-UA-Compatible") break;
			meta = null;
		}
		if (!meta) return false;
		if (!/^IE=EmulateIE7$/.test(meta.content)) return false;
		for (var node=meta; node; node=node.previousSibling) {
			if (node.nodeType !== 1) continue;
			var nodeName = node.nodeName.toLowerCase();
			if (nodeName !== "title" && nodeName !== "meta") return false;
		}
		return true;
	},
	type: "warn"
}
]
}
];

