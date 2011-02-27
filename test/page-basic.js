MathJaxDx.Basic.checks = [
{
name: "Startup",
title: "MathJax Startup",
checks: [
	{
	name: "Script",
	title: "MathJax loaded successfully",
	description: "If MathJax doesn't load then the MathJax script might be in an unexpected location or corrupted.",
	test: function(context, MathJax) { return !!MathJax; }
	},
	{
	name: "Init",
	title: "MathJax initialization completed",
	description: "If initialization doesn't complete there may be a configuration error.",
	test: function(context, MathJax) { return Array.indexOf(MathJax.Hub.Startup.signal.posted, "End Extensions") >= 0; } // FIXME is this correct??
	},
	{
	name: "Found",
	title: "Equations were found",
	description: "If equations are not found there could be a configuration error. ",
	test: function(context, MathJax) { return MathJax.Hub.getAllJax().length > 0; }
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
	test: function(context, MathJax) { return (context.document.compatMode && context.document.compatMode !== "BackCompat"); }
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
	}
	}
]
}
];

