MathJaxDx.Timelines = (function() {

var content = [
'<table class="timeline">',
'	<col class="label" />',
'	<col class="data" style="width: 100%;" />',
'	<thead>',
'		<tr>',
'			<th><button type="button">Task</button></th>',
'			<th><button type="button">Timeline (ms)</button></th>',
'		</tr>',
'	</thead>',
'	<tbody>',
'		<tr class="template">',
'			<td class="label">',
'				<input readonly class="type" name="type" />',
'				<input readonly class="task" name="name" />',
'			</td>',
'			<td class="data">',
'				<input readonly class="duration" name="start" />',
'				<input readonly class="duration" name="duration" />',
'				<input readonly class="number" name="stop" />',
'			</td>',
'		</tr>',
'	</tbody> ',
'</table>'
].join("\n");


var displayElement, taskUI;

var init = function(el) {
	displayElement = el;
	el.innerHTML = content;
	taskUI = new mui.DataTable(el.firstChild);	
}

var beginTime, endTime, performance = {};	
var actionNames = "Config Cookie Styles Jax Extensions PreProcess Process".split(/\s+/);
var root, script = "MathJax.js";

var signalHandler = function(message) {
	var now = endTime = Date.now();
	var m = message.toString().split(/\s+|\s*,\s*/);
	var task = m[1], ph = m[0];
	if (actionNames.indexOf(task) >= 0) {
		if (ph == "Begin") performance[task] = { type: "Action", name: task, begin: now }
		if (ph == "End") performance[task].end = now;
	}
	if (task == "Load") {
		var url = message.url;
		var name = url.replace(root + "/", "");
		if (ph == "Begin") performance[name] = { type: "Script", name: name, url: url, begin: now };
		if (ph == "End") performance[name].end = now;
	}
	if (task == "Font") {
		var name = message.fontName;
		if (ph == "Begin") performance[name] = { type: "Font", name: name, url: url, begin: now };
		if (ph == "End") performance[name].end = now;			
	}
}



var onPageStart = function(context) {
	beginTime = endTime = Date.now();
}

var onMathJaxReady = function(context, MathJax) {

root = MathJax.Hub.config.root;
performance[script] = {
	type: "Script",
	name: script,
	url: root + "/" + script,
	begin: beginTime,
	end: Date.now()
};

// intercept Font loading
MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function() {
	var FONT = MathJax.OutputJax["HTML-CSS"].Font;
	FONT._loadComplete = FONT.loadComplete;
	FONT.loadComplete = function(font, n, done, status) {
		MathJax.Hub.Startup.signal.Post({ name: "End Font", fontName: font.directory, toString: function() { return this.name; } });
		return this._loadComplete(font, n, done, status);
	}
	FONT._loadWebFont = FONT.loadWebFont;
	FONT.loadWebFont = function(font) {
		MathJax.Hub.Startup.signal.Post({ name: "Begin Font", fontName: font.directory, toString: function() { return this.name; } });
		return this._loadWebFont(font);
	}
});

// intercept Ajax.Load
MathJax.Ajax._Load = MathJax.Ajax.Load;
MathJax.Ajax.Load = function(file, callback) {
	var url = file.JS;
	var callback = MathJax.Callback(callback);
	var hook = callback.hook;
	callback.hook = function() {
		if (url) MathJax.Hub.Startup.signal.Post({ name: "End Load", url: url, toString: function() { return this.name; } });
		return hook.apply(this, arguments);
	}
	if (url) MathJax.Hub.Startup.signal.Post({ name: "Begin Load", url: url, toString: function() { return this.name; } });
	return this._Load(file, callback);
}


MathJax.Hub.Startup.signal.Interest(signalHandler);
MathJax.Hub.signal.Interest(signalHandler);

// NOTE Firefox doesn't complete these actions when called as MathJax.Hub.queue.Push(function() { MathJax.Hub.Reprocess(); })
// TODO Why not??
// MathJax.Hub.queue.Push("MathJax.Hub.PreProcess();");
// MathJax.Hub.queue.Push("MathJax.Hub.Process();");
// MathJax.Hub.queue.Push("MathJax.Hub.Reprocess();");

MathJax.Hub.queue.Push(function() {
	var totalTime = endTime - beginTime;
	taskUI.scale = 90 / totalTime;
	Object.each(performance, function(taskName, t) {
		var start = t.begin - beginTime, stop = t.end - beginTime, duration = t.end - t.begin;
		var timeline = "start: " + start + " / duration: " + duration + " / stop: " + stop;
		taskUI.addRow({
			type: { value: t.type.charAt(0).toUpperCase(), title: t.type, "class": t.type },
			name: { value: t.name, title: t.name },
			start: { value: start, title: timeline },
			duration: { value: duration, title: timeline, "class": t.type },
			stop: { value: stop, title: timeline }
		});
	});
});

}

return {
	init: init,
	onPageStart: onPageStart,
	onMathJaxReady: onMathJaxReady
}

})();

