var chai = require ('../node_modules/chai/chai');
var assert = chai.assert;
var ConsoleGate = require ('../src/log/consolegate');

suite('consolegate >', function(){

  setup(function(){
    this.win = {
      location : {
        host : 'apt-domain.com'
      }
    };

    this.noop = function(){};
    this.doop = function(){return true;};
    this.ctl = {
      log : this.noop,
      trace : this.noop,
      debug : this.noop,
      info : this.noop,
      warn : this.noop,
      error : this.noop,
      count : this.noop,
      group : this.noop,
      groupEnd : this.noop
    };
    this.cgate = new ConsoleGate(this.win, this.noop);
  });

  teardown(function(){
    this.cgate = null;
    this.win = null;
    this.doop = null;
    this.noop = null;
    this.ctl = null;
  });

  test('shoud disable all log methods', function(){
    this.cgate.denyAll();
    assert.deepEqual(this.win.console, this.ctl);
  });

  test('shoud disable all log methods for non-allowed domain', function(){
    this.cgate.allowHosts('apt.no');
    assert.deepEqual(this.win.console, this.ctl);
  });

  test('shoud not disable log methods for allowed domain', function(){
    this.win.console = {
      log : this.doop
    };
    this.cgate.allowHosts('apt-domain.com');
    assert.notEqual(this.win.console.log, this.noop);
  });

  test('shoud not override defined log methods', function(){
    this.win.console = {
      log : this.doop
    };
    this.cgate.polyfill();
    assert.equal(this.win.console.log, this.doop);
  });

  test('shoud fill in missing log methods', function(){
    this.cgate.polyfill();
    assert.isDefined(this.win.console);
    assert.isDefined(this.win.console.log);
    assert.equal(this.win.console.log, this.noop);
  });
});