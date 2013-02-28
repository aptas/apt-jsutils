module.exports = function(template, values) {
	var wasObj, tmpl;
	if (typeof template !== 'string') {
			wasObj = true;
			tmpl = JSON.stringify(template);
	}
	else tmpl = template;

	var result = tmpl.replace(/\{\w+\}/g, function (match, group, offset, string) {
		var prop = match.match(/\w+/)[0];
		return values[prop] || match;
	});

	if (wasObj) result = JSON.parse(result);
	return result;
};