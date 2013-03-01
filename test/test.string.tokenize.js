var chai = require ('../node_modules/chai/chai');
var assert = chai.assert;
tokenize = require ('../src/string/tokenize');

suite('tokenize >', function(){
  suite('string template >', function(){
    suite('object values', function(){
      test('shoud replace token at beginning of string', function(){
        var src = '{token} static';
        var ctl = 'value static';
        var res = tokenize(src, {token:'value'});
        assert.equal(ctl, res);
      });

      test('shoud replace token in the middle of string', function(){
        var src = 'static {token} static';
        var ctl = 'static value static';
        var res = tokenize(src, {token:'value'});
        assert.equal(ctl, res);
      });

      test('shoud replace token at the end of string', function(){
        var src = 'static {token}';
        var ctl = 'static value';
        var res = tokenize(src, {token:'value'});
        assert.equal(ctl, res);
      });

      test('shoud choose correct value for token', function(){
        var src = 'static {token}';
        var ctl = 'static value';
        var res = tokenize(src, {token:'value', other:'notneeded'});
        assert.equal(ctl, res);
      });

      test('shoud handle multiple tokens', function(){
        var src = 'static {foo} static {bar}s';
        var ctl = 'static value1 static value2s';
        var res = tokenize(src, {foo:'value1', bar:'value2'});
        assert.equal(ctl, res);
      });

      test('shoud handle multiple tokens', function(){
        var src = 'static {foo} static {bar}s';
        var ctl = 'static value1 static value2s';
        var res = tokenize(src, {foo:'value1', bar:'value2'});
        assert.equal(ctl, res);
      });

      test('shoud leave token in place when no value is found', function(){
        var src = 'static {token}';
        var ctl = 'static {token}';
        var res = tokenize(src, {foo:'bar'});
        assert.equal(ctl, res);
      });
    });
    suite('string splat values >', function(){
      test('shoud replace one token', function(){
        var src = '{token} static';
        var ctl = 'value static';
        var res = tokenize(src, 'value');
        assert.equal(ctl, res);
      });
      test('shoud replace two tokens', function(){
        var src = '{token} static {baken}';
        var ctl = 'foo static bar';
        var res = tokenize(src, 'foo', 'bar');
        assert.equal(ctl, res);
      });
      test('shoud replace many tokens', function(){
        var src = '{token1} static {token2} {token3} static {token4}';
        var ctl = 'foo static bar lorem static ipsum';
        var res = tokenize(src, 'foo', 'bar', 'lorem', 'ipsum');
        assert.equal(ctl, res);
      });
    });
  });
  suite('object template >', function(){
    suite('object values', function(){
      test('shoud replace token in both props', function(){
        var src = { string1 : '{token} static', string2 : '{token} static' };
        var ctl = { string1 : 'value static', string2 : 'value static' };
        var res = tokenize(src, {token:'value'});
        assert.deepEqual(ctl, res);
      });
    });
    suite('string splat values >', function(){
      test('shoud replace token in both props', function(){
        var src = { string1 : '{1} static', string2 : '{2} static' };
        var ctl = { string1 : 'foo static', string2 : 'bar static' };
        var res = tokenize(src, 'foo', 'bar');
        assert.deepEqual(ctl, res);
      });
    });
  });
});