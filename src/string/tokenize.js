/**
 * Flexible tokenizer util.
 *
 * Usage:
 *   Pass in a string or object of strings with tokens eclosed in curly braces {}
 *   and then the token values after that, either as an object with token names and
 *   values or as splats.
 *
 * @param {string|object} template Either a string or an object containing several strings.
 *                                 Internally objects will be JSON.stringify'ed, so passing
 *                                 objects with other primitive values is safe, however
 *                                 functions are not. Passing an object will make the return
 *                                 value an object as well.
 *
 * @param {object|string|number} values Can be a dictionary object containing keys matching the
 *                                      token names in the tempalte string where their defined values
 *                                      will be inserted in place of the tokens.
 *                                      Can also be splats of primitive values (...values)
 *                                      where tokens will be replaced by these values in order.
 *
 * Returns:
 *   Transformed string or object where tokens have been replaced by their
 *   respective values if found. For undefined token values, the token will
 *   be left in.
 *
 * Examples:
 *   tokenize('{myToken} token', {myToken: 'named'});         // returns 'named token'
 *   tokenize('{myToken} token', 'indexed');                  // returns 'indexed token'
 *   tokenize('{tok1} {tok2} tokens', 'multiple', 'indexed'); // returns 'multiple indexed tokens'
 *   tokenize({
 *     str1 : 'This is the {token1} string',
 *     str2 : 'This is the {token2} string',
 *   },{
 *     token1: 'first',
 *     token2: 'second'
 *   }); // returns {
 *     str1 : 'This is the first string',
 *     str2 : 'This is the second string',
 *   }
 *
 * @author: apt-on
 */
module.exports = function(template, values) {
  var wasObj, tmpl, res, p;

  if (typeof template !== 'string') {
    wasObj = true;
    tmpl = JSON.stringify(template);
  }
  else tmpl = template;

  if (typeof(arguments[1]) !== 'object') {
    var args = [].slice.call(arguments, 1);
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