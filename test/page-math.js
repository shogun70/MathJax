MathJaxDx.Math = (function() {
	
var content = [
'<table class="timeline">',
'	<col class="label" style="width: 10em;" />',
'	<col class="data" />',
'	<thead>',
'		<tr>',
'			<th><button type="button">Math</button></th>',
'			<th><button type="button">Process (ms)</button></th>',
'		</tr>',
'	</thead>',
'	<tbody>',
'		<tr class="template">',
'			<td class="label">',
'				<input readonly class="task" name="name" />',
'			</td>',
'			<td class="data"><input readonly class="duration" name="process" /></td>',
'		</tr>',
'	</tbody> ',
'</table>',
].join("\n");

var displayElement, mathUI;

var init = function(el) {
	displayElement = el;
	el.innerHTML = content;
	mathUI = new mui.DataTable(el.firstChild);
}

var math = {
	count: 0,
	lastTime: 0,
	maxDuration: 0,
	samples: []
}


var onMathJaxReady = function(context, MathJax) {

MathJax.Hub.Register.MessageHook("New Math", function(message) {
	var now = Date.now();
	var duration = (math.lastTime) ? now - math.lastTime : 0;
	math.lastTime = now;
	if (duration > math.maxDuration) math.maxDuration = duration;
	var data = math.samples[math.count];
	if (!data) data = math.samples[math.count] = {};
	math.count++;
	data.name = message[1];
	data.process = duration;
});

MathJax.Hub.queue.Push(function() {
	mathUI.scale = 95 / math.maxDuration;
	Array.forEach(math.samples, function(t) {
		mathUI.addRow({
			name: { value: t.name, title: t.title },
			process: { value: t.process, "class": "Process" }
		});
	});
});

}

return {
	init: init,
	onMathJaxReady: onMathJaxReady
}

})();

