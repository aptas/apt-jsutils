module.exports = function(template, values) {
  var wasObj, tmpl, res, p;

  if (typeof template !== 'string') {
    wasObj = true;
    tmpl = JSON.stringify(template);
  }
  else tmpl = template;

  if (typeof(arguments[1]) === 'string') {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    res = tmpl.replace(/\{\w+\}/g, function (match, group, offset, string) {
      return args.shift();
    });
  }
  else {
    res = tmpl.replace(/\{\w+\}/g, function (match, group, offset, string) {
      p = match.match(/\w+/)[0];
      return values[p] || match;
    });
  }

  if (wasObj) res = JSON.parse(res);
  return res;
};