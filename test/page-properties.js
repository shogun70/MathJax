
MathJaxDx.Properties = (function() {
	
var settings = {
	
document: {
	URL: "",
	compatMode: "",
	documentMode: "",
	charset: "",
	inputEncoding: "",
	lastModified: "",
	height: 0,
	width: 0	
},
navigator: {
	appCodeName: "",
	appName: "",
	appVersion: "",
	cookieEnabled: false,
	language: "",
	oscpu: "",
	platform: "",
	product: "",
	productSub: "",
	userAgent: "",
	vendor: "",
	vendorSub: ""
},
screenTop: 0,
screenLeft: 0,
innerHeight: 0,
innerWidth: 0,
outerHeight: 0,
outerWidth: 0,
screen: {
	availTop: 0,
	availLeft: 0,
	availHeight: 0,
	availWidth: 0,
	height: 0,
	width: 0,
	colorDepth: 0,
	pixelDepth: 0
},
MathJax: {
	isReady: false,
	version: "",
	Ajax: {
		rootPattern: "",
		styleDelay: 0,
		timeout: 0
	},
	Extension: {
		tex2jax: {
			version: "",
			config: {
				displayMath: [],
				element: "",
				ignoreClass: "",
				inlineMath: [],
				preview: "",
				processClass: "",
				processEnvironments: false,
				processEscapes: false,
				skipTags: []
			},
			ignoreClass: "",
			pattern: "",
			processClass: "",
			skipTags: "",
			start: ""
		},
		mml2jax: {
			MMLnamespace: "",
			version: "",
			config: {
				element: "",
				preview: ""
			}
		},
		jsMath2jax: {
			
		},
		MathZoom: {
			ffMMLcenterBug: false,
			ffMMLwidthBug: false,
			version: ""
		},
		MathMenu: {
			
		},
		FontWarnings: {
			
		}
	},
	HTML: {
		Cookie: {
			expires: 0,
			prefix: ""
		}
	},
	Hub: {
		processUpdateTime: 0,
		Browser: {
			name: "",
			version: 0,
			isChrome: false,
			isFirefox: false,
			isKonqueror: false,
			isMSIE: false,
			isMac: false,
			isOpera: false,
			isPC: false,
			isSafari: false
		},
		config: {
			delayStartupUntil: "",
			displayAlign: "",
			displayIndent: 0,
			errorSettings: {}, // FIXME
			extensions: [],
			inputJax: {}, // FIXME
			jax: [],
			messageStyle: "",
			outputJax: {}, // FIXME
			postJax: "",
			preJax: "",
			preRemoveClass: "",
			root: "",
			showProcessingMessages: false,
			skipStartupTypeset: false,
			styleSheets: [],
			styles: {}, // FIXME
			MMLorHTML: {
				prefer: {
					Firefox: "",
					MSIE: "",
					Opera: "",
					other: ""
				}
			},
			MathML: {
				useMathMLspacing: false
			},
			MathMenu: {
				delay: 0,
				helpURL: "",
				showContext: false,
				showFontMenu: false,
				showRenderer: false
			},
			NativeMML: {
				scale: 0,
				showMathMenu: false,
				showMathMenuMSIE: false
			},
			TeX: {
				MultiLineWidth: "",
				TagIndent: "",
				TagSide: ""
			},
			"HTML-CSS": {
				scale: 0
			},
			menuSettings: {
				ALT: false,
				CMD: false,
				CTRL: false,
				Shift: false,
				context: "",
				font: "",
				format: "",
				renderer: "",
				zoom: "",
				zscale: ""
			}
		}
	},
	ElementJax: {
		directory: "",
		extensionDir: "",
		version: ""			
	},
	InputJax: {
		directory: "",
		extensionDir: "",
		version: "",
		MathML: {}, // FIXME
		TeX: {}, // FIXME
		jsMath: {} // FIXME
	},
	OutputJax: {
		directory: "",
		extensionDir: "",
		fontDir: "",
		version: "",
		"HTML-CSS": {
			AccentBug: false,
			BIGDIMEN: 0,
			// FONTDATA: {}, // FIXME
			// Font: {}, // FIXME
			LEFTBUTTON: 0,
			NBSP: "",
			PLANE1: "",
			// TeX: {}, // FIXME
			allowWebFonts: "",
			autoLoadDir: "",
			directory: "",
			em: 0,
			extensionDir: "",
			ffVerticalAlignBug: false,
			fontDir: "",
			fontInUse: "",
			id: "",
			idPostfix: "",
			msieMarginScale: 0,
			outerEm: 0,
			pxPerInch: 0,
			require: [],
			rfuzz: 0,
			// settings: {}, // FIXME
			version: "",
			webFonts: false,
			webFontDir: "",
			config: {
				availableFonts: [],
				imageFont: "",
				preferredFont: "",
				preloadWebFonts: [],
				scale: 0,
				showMathMenu: false,
				// styles: {}, // FIXME
				useOldImageData: false,
				webFont: ""
			}
		},
		NativeMML: {
			LEFTBUTTON: 0,
			MENUKEY: "",
			MMLnamespace: "",
			directory: "",
			extensionDir: "",
			id: "",
			msieQuirks: false,
			noContextMenuBug: false,
			require: "",
			version: "",
			NAMEDSPACE: {
				negativemediummathspace: "",
				negativethickmathspace: "",
				negativethinmathspace: "",
				negativeverythickmathspace: "",
				negativeverythinmathspace: "",
				negativeveryverythickmathspace: "",
				negativeveryverythinmathspace: ""				
			},
			config: {
				scale: 0,
				showMathMenu: false,
				showMathMenuMSIE: false
			}
		}
	},
	Menu: {
		config: {
			delay: 0,
			helpURL: "",
			showContext: false,
			showFontMenu: false,
			showRenderer: false
		}
	}
}

}

var content = [
'<form action="mailto:" method="post" enctype="text/plain">',
'<table>',
'	<caption>Document and MathJax properties <button type="submit" title="Construct an email including these properties as content">Send email</button></caption>',
'	<col />',
'	<col width="10%" />',
'	<col width="20%" />',
'	<thead>',
'		<tr><th>Property Name</th><th>Type</th><th>Value</th></tr>',
'	</thead>',
'	<tbody>',
'		<tr class="template"><td></td><td></td><td></td></tr>',
'	</tbody>',
'</table>',
'</form>'
].join("\n");

var context, displayElement, $tBody, $template;

var init = function(el) {
	displayElement = el;
	var $display = $(el);
	$display.html(content);
	$tBody = $display.find("tbody");
	$template = $tBody.find(".template").remove().removeClass("template");
}


var createPropertyDisplay = function(name, sample) {
	var type, inp = "";
	switch (typeof sample) {
		case "object":
			if (sample.length != null) {
				type = "list";
				inp = '<input type="text" readonly />';
			}
			else {
				type = "object";
				inp = '<input type="radio" readonly />';
			}
			break;
		case "boolean":
			type = "boolean";
			inp = '<input type="checkbox" value="true" readonly /><input type="checkbox" value="false" readonly checked style="display: none;" />';
			break;
		case "number":
			type = "number";
			inp = '<input type="text" readonly />';
			break;
		case "string":
			type = "string";
			inp = '<input type="text" readonly />';
			break;
	}
	var $row = $template.clone(true);
	$tBody.append($row);
	var $cells = $row.find("td");
	var $nameCell = $cells.eq(0);
	var $typeCell = $cells.eq(1);
	var $valCell = $cells.eq(2);
	$nameCell.html(name);
	$typeCell.html(type);
	$valCell.html(inp);
	$valCell.find("input").attr("name", name);
	return $valCell.find("input")[0];
}

var showObject = function(object, path) {
	Object.each(object, function(name, val) {
		var fullName = (path) ? path + "." + name : name;
		var prop = context;
		Array.forEach (fullName.split("."), function(field) {
			if (prop) prop = prop[field];
		});
		
		var inpEl = createPropertyDisplay(fullName, val);
		if (prop == null) {
			inpEl.disabled = true;
			inpEl.title = "NOT PRESENT";
		}
		switch (typeof val) {
			case "object":
				if (val.length != null && prop) inpEl.value = prop.join(",");
				else {
					inpEl.disabled = true;
					if (prop) inpEl.checked = true;
					showObject(val, fullName);
				}
				break;
			case "boolean":
				if (prop) {
					inpEl.checked = true;
					inpEl.nextSibling.checked = false;
				}
				break;
			case "number":
				if (prop) inpEl.value = prop;
				break;
			case "string":
				if (prop) inpEl.value = prop;
				break;
		}
	});
}

return {

init: init,

onMathJaxReady: function(_window, MathJax) {
	context = _window;
	MathJax.Hub.Register.StartupHook("End", function() {	
		showObject(settings);
	});	
}

}

})();
