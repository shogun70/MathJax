
var checks = [
{
name: "Startup",
title: "MathJax Startup",
checks: [
	{
	name: "Script",
	title: "MathJax loaded successfully",
	test: function(context, MathJax) { return !!MathJax; }
	},
	{
	name: "Init",
	title: "MathJax initialization completed",
	test: function(context, MathJax) { return MathJax.Hub.Startup.signal.posted.indexOf("End Extensions") >= 0; }
	}
]
},
{
name: "Equations",
title: "Equations",
checks: [
	{
	name: "Found",
	title: "Equations were found",
	test: function(context, MathJax) { return MathJax.Hub.getAllJax().length > 0; }
	},
	{
	name: "TeX",
	title: "TeX Preprocessing enabled",
	test: function(context, MathJax) { return !!MathJax.Extension.tex2jax; }
	},
	{
	name: "MathML",
	title: "MathML Preprocessing enabled",
	test: function(context, MathJax) { return !!MathJax.Extension.mml2jax; }
	}
]
},
{
name: "General",
title: "General Recommendations",
checks: [
	{
	name: "Quirksmode",
	title: "Quirks Mode",
	test: function(context, MathJax) { return (!context.document.compatMode || context.document.compatMode == "BackCompat"); }
	},
	{
	name: "EmulateIE7",
	title: "Emulate IE7 meta tag",
	test: function(context, MathJax) {
		var elts = $$("meta", context.document);
		var meta;
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
