MathJaxDx.Basic = (function() {	

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
	test: function(context, MathJax) { return Array.indexOf(MathJax.Hub.Startup.signal.posted, "End Extensions") >= 0; } // FIXME is this correct??
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

var content = [
'<table id="basic">',
'	<caption>Basic troubleshooting checks</caption>',
'	<col style="width: 4em;" />',
'	<col />',
'	<tbody class="template">',
'		<tr><th style="white-space: nowrap;"></th><td></td></tr>',
'		<tr><td></td><td></td></tr>',
'	</tbody>',
'</table>'
].join("\n");

var displayElement, $table, $tBodyTemplate;

var init = function(el) {
	displayElement = el;
	var $display = $(el);
	$display.html(content);
	$table = $display.find("table");
	$tBodyTemplate = $table.find("tbody.template");
	$tBodyTemplate.remove().removeClass("template");
}

var runChecks = function(context, MathJax) {
	Array.forEach(checks, function(checkGroup) {
		var $tBody = $tBodyTemplate.clone(true);
		$table.append($tBody);
		var $rows = $tBody.find("tr");
		var $titleRow = $rows.eq(0);
		var $template = $rows.eq(1);
		$template.remove();
		$titleRow.find("th, td").first().html(checkGroup.title);
		
		Array.forEach(checkGroup.checks, function(check) {
			var $row = $template.clone(true), $cells = $row.find("th, td");
			$cells.eq(1).html(check.title);
			$cells.eq(0).html('<input type="checkbox" name="check" readonly />')
				.find("input").each(function() {
					this.value = check.name;
					this.checked = check.test(context, MathJax);
				});
			$tBody.append($row);
		})
	});
}


return {

init: init,

onPageReady: function(context) {
	
},

onMathJaxReady: function(context, MathJax) {
	MathJax.Hub.Register.StartupHook("End", function() {	
		runChecks(context, MathJax);
	});	
}

}


})();

