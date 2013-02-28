var chai = require ('../node_modules/chai/chai');
var assert = chai.assert;
tokenize = require ('../src/string/tokenize');

describe('tokenize', function(){
  describe('string template', function(){
    describe('object values', function(){

      it('shoud replace token at beginning of string', function(){
        var src = '{token} static';
        var ctl = 'value static';
        var res = tokenize(src, {token:'value'});
        assert.equal(ctl, res);
      });

      it('shoud replace token in the middle of string', function(){
        var src = 'static {token} static';
        var ctl = 'static value static';
        var res = tokenize(src, {token:'value'});
        assert.equal(ctl, res);
      });

      it('shoud replace token at the end of string', function(){
        var src = 'static {token}';
        var ctl = 'static value';
        var res = tokenize(src, {token:'value'});
        assert.equal(ctl, res);
      });

      it('shoud choose correct value for token', function(){
        var src = 'static {token}';
        var ctl = 'static value';
        var res = tokenize(src, {token:'value', other:'notneeded'});
        assert.equal(ctl, res);
      });

      it('shoud handle multiple tokens', function(){
        var src = 'static {foo} static {bar}s';
        var ctl = 'static value1 static value2s';
        var res = tokenize(src, {foo:'value1', bar:'value2'});
        assert.equal(ctl, res);
      });

      it('shoud handle multiple tokens', function(){
        var src = 'static {foo} static {bar}s';
        var ctl = 'static value1 static value2s';
        var res = tokenize(src, {foo:'value1', bar:'value2'});
        assert.equal(ctl, res);
      });

      it('shoud leave token in place when no value is found', function(){
        var src = 'static {token}';
        var ctl = 'static {token}';
        var res = tokenize(src, {foo:'bar'});
        assert.equal(ctl, res);
      });
    });
  });
});